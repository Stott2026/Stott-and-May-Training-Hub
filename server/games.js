// The Games Room (agreed with Ian, November 2026): "challenge May".
//
// "Handle the objection", the first game:
// 1. The browser shows a challenge from the game in Sanity: who May plays and what they say.
// 2. The learner types their answer and the browser sends it here, with the game, the challenge
//    and the level (friendly, tough or brutal).
// 3. The server looks up the challenge's words in the hub's training (the same search May uses),
//    and asks May to stay in character for one line, then step out and score the answer out of 10
//    against the training, as JSON: what worked, what to improve, a better line and what the
//    Playbook says, citing it.
//
// Each answer counts as one message towards May's daily limit. Nothing typed is stored.
import Anthropic from "@anthropic-ai/sdk";
import { Router } from "express";
import { sanity, queries, fullHubName } from "./sanity.js";
import { client, mayEnabled, MODEL, DAILY_LIMIT, instructions, searchForMay, useOne } from "./may.js";

const LEVELS = {
  friendly: "Level: Friendly. Play the part as a fair, open-minded person who can be won round. Mark kindly: a sensible answer that deals with the objection scores 6 or 7; save 9 and 10 for a really good one.",
  tough: "Level: Tough. Play the part as a busy, demanding person who pushes back. Mark like a good sales manager would: an average answer scores 5; 8 or more needs a clear, confident, specific answer that uses good technique.",
  brutal: "Level: Brutal. Play the part as the hardest buyer the learner will meet: sceptical, impatient and quick to end the call. Mark strictly: 8 or more only for an outstanding answer; vague, defensive or pushy answers score 3 or less.",
};

// What May sends back for each answer. Everything is required, so the page can always show it.
const SCORE_SCHEMA = {
  type: "object",
  properties: {
    reaction: { type: "string", description: "In character: how the person would really reply to the answer, one or two sentences." },
    score: { type: "integer", description: "The score out of 10." },
    verdict: { type: "string", description: "Two to four words summing up the answer, for example: Strong recovery, or Too defensive." },
    worked: { type: "array", items: { type: "string" }, description: "Up to three short points on what worked. Empty if nothing did." },
    improve: { type: "array", items: { type: "string" }, description: "One to three short, specific points on what to do better." },
    betterLine: { type: "string", description: "One thing the learner could have said instead, in the first person, ready to use." },
    playbook: { type: "string", description: "One or two sentences on what the hub's training says about this, citing it as [R1], [R2]. Empty if the hub has nothing on it." },
  },
  required: ["reaction", "score", "verdict", "worked", "improve", "betterLine", "playbook"],
  additionalProperties: false,
};

const gameRules = (title) => `You are running a game in the hub's Games Room called "${title}". The learner is practising handling objections, and has asked to be challenged.

How the game works: you played the person described below and said the objection below. The learner's message is their answer to it, as if they were speaking to that person. Then:
1. reaction: stay in character and say how that person would really reply to the answer, in one or two sentences. If the answer was good they soften; if it was weak they push back harder.
2. Step out of character and score the answer out of 10 at the level below, judging: did they acknowledge the concern, ask a question to understand it, answer it with something specific and credible, and move the conversation forward? Tone matters: confident and helpful beats defensive or pushy.
3. worked and improve: short, specific points, written to the learner as "you". Mark against the hub's training below where it covers this, otherwise against good recruitment practice.
4. betterLine: something they could have said instead, ready to use.
5. playbook: what the hub's training says, citing it. If the hub has nothing on it, leave it empty: never invent Stott and May specifics such as fees, rates, terms or policies.

If the answer is blank, off-topic or not a real attempt, score it 0 and say so kindly. If it contains real names or personal details of candidates, clients or colleagues, don't repeat them, and remind them in improve to keep examples fictional.

Keep every field short: this is a quick game, not an essay.`;

// The answer as the browser sends it.
function cleanAnswer(answer) {
  if (typeof answer !== "string") return null;
  const text = answer.trim();
  return text && text.length <= 1200 ? text : null;
}

export const games = Router();

games.post("/:slug/score", async (req, res) => {
  if (!mayEnabled) return res.status(404).json({ error: "May isn't switched on yet, so the games can't be played." });
  const answer = cleanAnswer(req.body?.answer);
  if (!answer) return res.status(400).json({ error: "Please type your answer (up to 1,200 characters)." });
  const level = LEVELS[req.body?.level] ? req.body.level : "tough";

  const game = await sanity.fetch(queries.gameForMay, { slug: req.params.slug });
  const scenario = game?.scenarios?.find((s) => s._key === req.body?.scenario);
  if (!game || game.comingSoon || game.kind !== "objection" || !scenario) return res.status(404).json({ error: "That challenge isn't available. Please start a new game." });
  if (!useOne(req.user)) return res.status(429).json({ error: `You've reached today's limit of ${DAILY_LIMIT} messages with May. She'll be back tomorrow.` });

  // What the hub's training says, found with the challenge's own words (or the objection itself).
  const sources = {};
  const lookUp = (scenario.lookUp || "").trim() || scenario.line.split(/\s+/).filter((w) => w.length > 4).slice(0, 2).join(" ");
  let training = "";
  try {
    training = lookUp ? await searchForMay(lookUp.slice(0, 40), sources) : "";
  } catch (error) {
    console.error("Games: couldn't search the hub:", error);
  }

  const challenge = [
    LEVELS[level],
    `Who you played: ${scenario.who}`,
    `What you said: "${scenario.line}"`,
    scenario.background ? `Background (the learner doesn't see this): ${scenario.background}` : "",
    training ? `What the hub's training says (cite as labelled):\n\n${training}` : "The hub's training has nothing on this objection, so mark against good recruitment practice and leave playbook empty.",
  ].filter(Boolean).join("\n\n");

  try {
    const reply = await client.messages.create({
      model: MODEL,
      max_tokens: 2000,
      output_config: { effort: "low", format: { type: "json_schema", schema: SCORE_SCHEMA } },
      system: [
        { type: "text", text: instructions(fullHubName()) },
        { type: "text", text: gameRules(game.title), cache_control: { type: "ephemeral" } },
        { type: "text", text: challenge },
      ],
      messages: [{ role: "user", content: answer }],
    });
    if (reply.stop_reason === "refusal") return res.status(422).json({ error: "May can't score that one. Please try another answer." });
    const text = reply.content.find((b) => b.type === "text")?.text ?? "";
    const result = JSON.parse(text);
    const list = (items, max) => (Array.isArray(items) ? items.filter((x) => typeof x === "string" && x.trim()).slice(0, max) : []);
    res.json({
      reaction: String(result.reaction ?? ""),
      score: Math.max(0, Math.min(10, Math.round(Number(result.score) || 0))),
      verdict: String(result.verdict ?? ""),
      worked: list(result.worked, 3),
      improve: list(result.improve, 3),
      betterLine: String(result.betterLine ?? ""),
      playbook: String(result.playbook ?? ""),
      sources,
    });
  } catch (error) {
    console.error("Games:", error);
    const busy = error instanceof Anthropic.RateLimitError || error instanceof Anthropic.InternalServerError || error instanceof Anthropic.APIConnectionError;
    res.status(busy ? 503 : 500).json({ error: busy ? "May is very busy right now. Please try again in a minute." : "Sorry, May couldn't score that. Please try again." });
  }
});
