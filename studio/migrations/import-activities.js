// One-off import: the first "Put it in order" and "Flip cards" activities, built from the
// Playbook content, plus points and two badges for activities in Badges and levels.
// Everything arrives as DRAFTS (a module that already has unpublished changes keeps them),
// to review and publish in the Studio.
//
// Run from the project root:  npm run import:activities -- --dry-run   (check only)
//                             npm run import:activities                (import)
// Safe to re-run: sections that already have activities, and badges already there, are left alone.
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");

const order = (title, instructions, items, explanation) => ({ _type: "orderActivity", title, instructions, items, explanation });
const flip = (title, instructions, cards) => ({
  _type: "flipCards", title, instructions,
  cards: cards.map(([front, back], i) => ({ _key: `card-${i + 1}`, _type: "flipCard", front, back })),
});

// Module (by web address) → section (by the start of its title) → activities.
const PLAN = {
  "recruitment-lifecycle": {
    "Seven stages, one placement": [order("Put the seven stages in order", "Drag the stages of a placement into the order they happen.",
      ["Business development", "Job intake", "Sourcing and screening", "Submission", "Interview prep and pre-closing", "Offer and close", "Onboarding and aftercare"],
      "No candidates without clients, so it starts with business development. And aftercare leads straight back to stage 1: happy clients and placed candidates bring the next role.")],
  },
  "candidate-sourcing": {
    "The qualification call, in seven steps": [order("Run the call in the right order", "Put the seven steps of a qualification call in order.",
      ["Intro: who you are and why you called", "Motivation: why move, why now", "Experience: walk the CV", "Domain: your desk's technical questions", "Logistics: package, location, notice, right to work", "Referrals: leads, names, other processes", "Next step: book client intro slots before you hang up"],
      "Motivation comes before the CV: if there's no real reason to move, the rest doesn't matter. And never hang up without the next step booked.")],
  },
  "client-control": {
    "The four-part sell-in": [order("Build the sell-in", "Put the four parts of a sell-in in the order you'd say them.",
      ["Outcome: the problem this person solves", "Context: their experience mapped onto the client's world", "Proof: one standout, measurable win", "Logistics: package, notice, other processes, a decision date"],
      "Lead with the outcome so the client is listening, back it up with context and proof, then remove the friction and ask for a decision date.")],
    "Handling objections live": [flip("Reframe the objection", "Read the objection, say your reframe out loud, then flip to compare.", [
      ["\"Not enough experience in X.\"", "\"What would they need to have done in X to be credible? Here's where they did something comparable…\""],
      ["\"The salary's too high.\"", "\"Here's what the market pays for this profile right now. Is the budget fixed, or is there room for the right person?\""],
      ["\"Let's see a few more.\"", "\"Happy to. What's missing from this one? If I can address it, are you comfortable meeting them this week?\""],
      ["\"They've moved around a lot.\"", "\"Here's the reason for each move. The last two were company-driven, and here's what they want to stay for.\""],
      ["\"We'll get back to you.\"", "\"Of course. When will you have decided? They're in other processes, so I want to give them an honest timeline.\""],
    ])],
  },
  "reverse-headhunting": {
    "A five-step structure": [order("Order the reverse headhunt", "Put the five steps of the call in order.",
      ["Open: why you called, about them not a vacancy", "Their story: role, team, budget, initiatives", "Their next move: the ideal role, and when", "Their world: plans, pain points, where delivery stalls", "Close: book the follow-up and ask who else to meet"],
      "Start with them as a candidate, then move to them as a potential client. By the time you ask about their world, you've earned the right to.")],
  },
  "contract-consulting": {
    "Match the model to the problem": [flip("Which hiring model fits?", "Read the client's situation, name the model, then flip to check.", [
      ["Approved headcount, an ongoing need, and culture fit matters most.", "Perm: a long-term hire."],
      ["Urgent or finite work, a hiring freeze, or a project with an end date.", "Contract (time and materials): skills by the hour or day."],
      ["They want to test fit, or headcount opens later.", "Contract-to-hire: try, then convert. Agree the conversion terms up front."],
      ["A defined deliverable or a whole team, priced as a project.", "SOW or consulting: pay for the outcome, delivered through Stott and May Consulting."],
    ])],
    "Four objections, four reframes": [flip("Four objections, four reframes", "Say how you'd answer each one, then flip to compare.", [
      ["\"Contractors are too expensive.\"", "\"Compared with what? No upfront fee, no benefits, no long-term commitment, and you only pay for hours worked. What does the project slipping cost?\""],
      ["\"We want someone committed.\"", "\"Then let's do contract-to-hire. You get them now and convert once headcount opens.\""],
      ["\"We have no budget.\"", "\"For headcount, or at all? Is there project or non-headcount spend this could sit in?\""],
      ["\"We'll wait for headcount.\"", "\"What does waiting cost you? A contractor can bridge the gap while we keep the perm search going.\""],
    ])],
  },
  "counteroffer-management": {
    "Respect the relationship": [flip("When the counteroffer lands", "The candidate tells you about a counteroffer. What do you ask? Flip to compare.", [
      ["\"My manager's matched the salary.\"", "\"Why did it take you resigning for them to offer this?\""],
      ["\"They've promised me the promotion I wanted.\"", "\"If it wasn't part of the plan until you resigned, how long will it last before the same challenges come back?\""],
      ["\"I'm not sure any more.\"", "\"Does this change the reasons you gave me for leaving?\""],
    ])],
  },
};

const NEW_BADGES = [
  { _key: "first-activity", _type: "badge", rule: "first-activity", title: "Hands on", description: "Finish your first activity.", icon: "puzzle" },
  { _key: "five-activities", _type: "badge", rule: "five-activities", title: "Practice makes perfect", description: "Finish five activities.", icon: "sparkles" },
];

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });
const tx = client.transaction();

// Builds on the unpublished draft if there is one, so its changes are kept.
async function draftOf(id) {
  const published = await client.fetch(`*[_id == $id][0]`, { id });
  const base = (await client.fetch(`*[_id == $id][0]`, { id: `drafts.${id}` })) ?? published;
  if (!base) return null;
  const draft = { ...base, _id: `drafts.${id}` };
  delete draft._rev; delete draft._createdAt; delete draft._updatedAt;
  return draft;
}

let added = 0;
for (const [slug, sections] of Object.entries(PLAN)) {
  const id = await client.fetch(`*[_type == "trainingModule" && slug.current == $slug && !(_id in path("drafts.**"))][0]._id`, { slug });
  if (!id) { console.error(`No published module "${slug}".`); process.exit(1); }
  const draft = await draftOf(id);
  let changed = false;
  for (const [start, activities] of Object.entries(sections)) {
    const section = draft.sections.find((s) => s.title.startsWith(start));
    if (!section) { console.error(`${draft.title}: no section starting "${start}".`); process.exit(1); }
    if (section.activities?.length) continue;
    section.activities = activities.map((a, i) => ({ _key: `activity-${i + 1}`, ...a }));
    added += activities.length;
    changed = true;
    for (const a of activities) console.log(`${draft.title} · ${section.title}: ${a._type === "flipCards" ? "Flip cards" : "Put it in order"}, "${a.title}"`);
  }
  if (changed) tx.createOrReplace(draft);
}

// Points and badges for activities.
const rewards = await draftOf("rewards");
if (rewards) {
  const missing = NEW_BADGES.filter((b) => !(rewards.badges ?? []).some((x) => x.rule === b.rule));
  const needsPoints = rewards.points?.activity === undefined;
  if (missing.length || needsPoints) {
    rewards.points = { ...rewards.points, activity: rewards.points?.activity ?? 15 };
    // New badges go just after "Sharp mind" (quick checks), or at the end.
    const at = (rewards.badges ?? []).findIndex((b) => b.rule === "quick-checks");
    rewards.badges = [...rewards.badges];
    rewards.badges.splice(at >= 0 ? at + 1 : rewards.badges.length, 0, ...missing);
    tx.createOrReplace(rewards);
    console.log(`Badges and levels: 15 points per activity${missing.length ? `, badges ${missing.map((b) => b.title).join(" and ")}` : ""}.`);
  }
}

console.log(`${added} activities.`);
if (dryRun) { console.log("Dry run: nothing sent to Sanity."); process.exit(0); }
await tx.commit({ visibility: "sync" });
console.log("Done. Review and publish the changed modules and Badges and levels in the Studio.");
