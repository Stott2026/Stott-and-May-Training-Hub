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
// "Get the meeting", the second game: a cold call of up to five turns. May answers the phone as a
// decision-maker; each turn the learner speaks, she replies in character and says how warm she is
// (0 to 100) and whether the call goes on, she agrees to a meeting, or she hangs up. On the fifth
// turn she must decide. When the call ends she steps out and scores the whole call out of 10.
//
// "Rapid fire", the third game: questions from the hub's quiz bank against the clock
// (GET /api/games/:slug/questions). No call to May, so it's instant and free.
//
// Each answer (or turn) counts as one message towards May's daily limit. Nothing typed is stored.
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

// The same feedback for a whole call, without the in-character reply.
const FINAL_SCHEMA = {
  ...SCORE_SCHEMA,
  properties: Object.fromEntries(Object.entries(SCORE_SCHEMA.properties).filter(([k]) => k !== "reaction")),
  required: SCORE_SCHEMA.required.filter((k) => k !== "reaction"),
};

// One turn of a call.
const TURN_SCHEMA = {
  type: "object",
  properties: {
    reply: { type: "string", description: "What you say next, in character, as you'd say it on the phone: one to three short sentences." },
    warmth: { type: "integer", description: "How open you now are to a meeting, from 0 (about to hang up) to 100 (keen to meet)." },
    outcome: { type: "string", enum: ["talking", "meeting", "hangup"], description: "talking if the call goes on, meeting if you have just agreed to a meeting, hangup if you have just ended the call." },
  },
  required: ["reply", "warmth", "outcome"],
  additionalProperties: false,
};

const MAX_TURNS = 5;

const callRules = (title) => `You are running a game in the hub's Games Room called "${title}". The learner is practising cold calls to win a meeting, and has asked to be challenged.

How the game works: you play the person described below, who has just picked up the phone to the learner, a recruitment consultant at Stott and May calling out of the blue. The learner has at most ${MAX_TURNS} turns to win a meeting with you. Stay in character the whole time and talk as that person really would on the phone: short, busy, human.

Each turn, reply in character, then judge how the call is going:
- warmth: how open you now are to a meeting, from 0 to 100. Start from the level's starting point below and move it with each turn: up for a relevant, confident, curious approach that is about your world (good questions, a credible reason to talk, something specific); down for a generic pitch, talking about themselves, pushiness, waffle or ignoring what you said.
- outcome: "meeting" only once you have actually agreed to meet (a time or a clear yes), which should feel earned; "hangup" if they have lost you; otherwise "talking".
On the learner's last turn you must decide: "meeting" or "hangup".

Never invent Stott and May specifics such as fees or terms. If the learner uses real names or personal details of candidates, clients or colleagues, carry on but don't repeat them.`;

const callLevels = {
  friendly: "Level: Friendly. You're open and polite, with a real hiring problem you'd like help with. Start at warmth 40. A decent, relevant approach will win a meeting.",
  tough: "Level: Tough. You're busy and wary of agencies, though you do have a hiring problem. Start at warmth 25. It takes a sharp, relevant approach and a good question or two to win a meeting.",
  brutal: "Level: Brutal. You're impatient, you get agency calls every day and you dislike them. Start at warmth 10. Only an outstanding, specific approach that quickly shows value wins a meeting; anything generic gets you off the phone.",
};

const scoreCallRules = (title) => `You are scoring a cold call from the hub's Games Room game "${title}". Step out of character and coach the learner, written to them as "you".

Score the whole call out of 10 at the level below, judging: a confident, clear opening with a reason for the call; curiosity (good questions about their world); relevance (linking to their situation, not a generic pitch); handling pushback; and asking for the meeting with a clear next step. Winning the meeting matters, but a well-run call that didn't land can still score well, and a lucky meeting after a weak call shouldn't score highly.

worked and improve: short, specific points. betterLine: one thing they could have said at the key moment, ready to use. playbook: what the hub's training says, citing it as labelled; empty if the hub has nothing on it. Never invent Stott and May specifics.

Keep every field short.`;

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

// What the hub's training says, found with the challenge's own words (or the first line itself).
async function lookUpTraining(scenario, sources) {
  const words = (scenario.lookUp || "").trim() || scenario.line.split(/\s+/).filter((w) => w.length > 4).slice(0, 2).join(" ");
  if (!words) return "";
  try {
    return await searchForMay(words.slice(0, 40), sources);
  } catch (error) {
    console.error("Games: couldn't search the hub:", error);
    return "";
  }
}

const list = (items, max) => (Array.isArray(items) ? items.filter((x) => typeof x === "string" && x.trim()).slice(0, max) : []);
const feedback = (result) => ({
  score: Math.max(0, Math.min(10, Math.round(Number(result.score) || 0))),
  verdict: String(result.verdict ?? ""),
  worked: list(result.worked, 3),
  improve: list(result.improve, 3),
  betterLine: String(result.betterLine ?? ""),
  playbook: String(result.playbook ?? ""),
});

// Ask May for JSON in the given shape. Returns the parsed object, or null if she declined.
async function askForJson({ system, messages, schema, maxTokens = 2000 }) {
  const reply = await client.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    output_config: { effort: "low", format: { type: "json_schema", schema } },
    system,
    messages,
  });
  if (reply.stop_reason === "refusal") return null;
  return JSON.parse(reply.content.find((b) => b.type === "text")?.text ?? "{}");
}

function failed(res, error, what) {
  console.error("Games:", error);
  const busy = error instanceof Anthropic.RateLimitError || error instanceof Anthropic.InternalServerError || error instanceof Anthropic.APIConnectionError;
  res.status(busy ? 503 : 500).json({ error: busy ? "May is very busy right now. Please try again in a minute." : `Sorry, May couldn't ${what}. Please try again.` });
}

export const games = Router();

// Rapid fire: a fresh set of questions, picked at random from the quiz bank.
games.get("/:slug/questions", async (req, res, next) => {
  try {
    const game = await sanity.fetch(queries.gameForMay, { slug: req.params.slug });
    if (!game || game.comingSoon || game.kind !== "rapid") return res.status(404).json({ error: "That game isn't available." });
    const bank = (await sanity.fetch(queries.rapidQuestions)).filter((q) => Array.isArray(q.options) && q.options.length > 1 && Number.isInteger(q.correct));
    const count = Math.min(Math.max(Number(game.rounds) || 10, 1), 20, bank.length);
    for (let i = bank.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bank[i], bank[j]] = [bank[j], bank[i]];
    }
    res.json(bank.slice(0, count).map((q) => ({
      _id: q._id,
      question: q.question,
      options: q.options,
      correct: q.correct,
      explanation: q.explanation ?? "",
      source: q.module?.slug ? { label: q.module.title, href: `/modules/${q.module.slug}${q.afterSection ? `?section=${q.afterSection}` : ""}` } : null,
    })));
  } catch (error) {
    next(error);
  }
});

games.post("/:slug/score", async (req, res) => {
  if (!mayEnabled) return res.status(404).json({ error: "May isn't switched on yet, so the games can't be played." });
  const answer = cleanAnswer(req.body?.answer);
  if (!answer) return res.status(400).json({ error: "Please type your answer (up to 1,200 characters)." });
  const level = LEVELS[req.body?.level] ? req.body.level : "tough";

  const game = await sanity.fetch(queries.gameForMay, { slug: req.params.slug });
  const scenario = game?.scenarios?.find((s) => s._key === req.body?.scenario);
  if (!game || game.comingSoon || game.kind !== "objection" || !scenario) return res.status(404).json({ error: "That challenge isn't available. Please start a new game." });
  if (!useOne(req.user)) return res.status(429).json({ error: `You've reached today's limit of ${DAILY_LIMIT} messages with May. She'll be back tomorrow.` });

  const sources = {};
  const training = await lookUpTraining(scenario, sources);

  const challenge = [
    LEVELS[level],
    `Who you played: ${scenario.who}`,
    `What you said: "${scenario.line}"`,
    scenario.background ? `Background (the learner doesn't see this): ${scenario.background}` : "",
    training ? `What the hub's training says (cite as labelled):\n\n${training}` : "The hub's training has nothing on this objection, so mark against good recruitment practice and leave playbook empty.",
  ].filter(Boolean).join("\n\n");

  try {
    const result = await askForJson({
      system: [
        { type: "text", text: instructions(fullHubName()) },
        { type: "text", text: gameRules(game.title), cache_control: { type: "ephemeral" } },
        { type: "text", text: challenge },
      ],
      messages: [{ role: "user", content: answer }],
      schema: SCORE_SCHEMA,
    });
    if (!result) return res.status(422).json({ error: "May can't score that one. Please try another answer." });
    res.json({ reaction: String(result.reaction ?? ""), ...feedback(result), sources });
  } catch (error) {
    failed(res, error, "score that");
  }
});

// The call so far as the browser sends it: May's lines and the learner's, the learner's last.
function cleanCall(turns) {
  if (!Array.isArray(turns)) return null;
  const clean = turns.filter((t) => (t?.role === "user" || t?.role === "assistant") && typeof t.content === "string" && t.content.trim()).map((t) => ({ role: t.role, content: t.content.trim() }));
  while (clean.length && clean[0].role !== "user") clean.shift(); // May's opening line is in her instructions
  if (!clean.length || clean.at(-1).role !== "user") return null;
  if (clean.some((t) => t.role === "user" && t.content.length > 800)) return null;
  for (let i = 1; i < clean.length; i++) if (clean[i].role === clean[i - 1].role) return null;
  const learnerTurns = clean.filter((t) => t.role === "user").length;
  if (learnerTurns > MAX_TURNS) return null;
  return { turns: clean.map((t) => ({ role: t.role, content: t.content.slice(0, 800) })), learnerTurns };
}

games.post("/:slug/turn", async (req, res) => {
  if (!mayEnabled) return res.status(404).json({ error: "May isn't switched on yet, so the games can't be played." });
  const call = cleanCall(req.body?.turns);
  if (!call) return res.status(400).json({ error: "Please type what you'd say (up to 800 characters)." });
  const level = callLevels[req.body?.level] ? req.body.level : "tough";

  const game = await sanity.fetch(queries.gameForMay, { slug: req.params.slug });
  const scenario = game?.scenarios?.find((s) => s._key === req.body?.scenario);
  if (!game || game.comingSoon || game.kind !== "meeting" || !scenario) return res.status(404).json({ error: "That call isn't available. Please start a new game." });
  if (!useOne(req.user)) return res.status(429).json({ error: `You've reached today's limit of ${DAILY_LIMIT} messages with May. She'll be back tomorrow.` });

  const last = call.learnerTurns >= MAX_TURNS;
  const situation = [
    callLevels[level],
    `Who you are: ${scenario.who}`,
    scenario.background ? `Your situation (the learner doesn't know this unless they find out): ${scenario.background}` : "",
    `You answered the phone with: "${scenario.line}"`,
    `This is the learner's turn ${call.learnerTurns} of ${MAX_TURNS}.${last ? " It is their last: you must decide now, meeting or hangup." : ""}`,
  ].filter(Boolean).join("\n\n");

  try {
    const turn = await askForJson({
      system: [
        { type: "text", text: instructions(fullHubName()) },
        { type: "text", text: callRules(game.title), cache_control: { type: "ephemeral" } },
        { type: "text", text: situation },
      ],
      messages: call.turns,
      schema: TURN_SCHEMA,
      maxTokens: 1000,
    });
    if (!turn) return res.status(422).json({ error: "May can't reply to that one. Please try saying it another way." });
    let outcome = ["talking", "meeting", "hangup"].includes(turn.outcome) ? turn.outcome : "talking";
    if (last && outcome === "talking") outcome = "hangup";
    const reply = String(turn.reply ?? "");
    const warmth = Math.max(0, Math.min(100, Math.round(Number(turn.warmth) || 0)));
    if (outcome === "talking") return res.json({ reply, warmth, outcome });

    // The call has ended: score it.
    const sources = {};
    const training = await lookUpTraining(scenario, sources);
    const transcript = [
      `You played: ${scenario.who}. You answered: "${scenario.line}"`,
      ...call.turns.map((t) => `${t.role === "user" ? "Learner" : "You"}: ${t.content}`),
      `You: ${reply}`,
      `How it ended: ${outcome === "meeting" ? "you agreed to a meeting" : "you ended the call without agreeing to meet"}.`,
    ].join("\n");
    const result = await askForJson({
      system: [
        { type: "text", text: instructions(fullHubName()) },
        { type: "text", text: scoreCallRules(game.title), cache_control: { type: "ephemeral" } },
        { type: "text", text: [LEVELS[level], training ? `What the hub's training says (cite as labelled):\n\n${training}` : "The hub's training has nothing specific on this, so mark against good recruitment practice and leave playbook empty."].join("\n\n") },
      ],
      messages: [{ role: "user", content: `The call:\n\n${transcript}` }],
      schema: FINAL_SCHEMA,
    });
    res.json({ reply, warmth, outcome, final: result ? { ...feedback(result), sources } : null });
  } catch (error) {
    failed(res, error, "reply to that");
  }
});
