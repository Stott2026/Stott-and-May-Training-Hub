// One-off fix: one answer for each topic the training contradicted itself on (final sweep,
// November 2026, agreed with Ian). LinkedIn posting, follow-ups, brief call length, debrief timing,
// stalled pipelines, stay conversations, job grading, leads per profile, made-up conversion figures,
// time to decide, the client sell-in, the Start here path, Technology weeks and the Big 5, plus
// "client" not "customer" and "counteroffer" not "counter-offer".
//
// Everything arrives as DRAFTS (on top of any draft already there), to review and publish in the
// Studio. The import data files get the same wording.
//
// Run from the project root:  node studio/migrations/fix-contradictions-2026-11.js --dry-run   (check only)
//                             node studio/migrations/fix-contradictions-2026-11.js             (save drafts)
import fs from "node:fs";
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");

// [document id, old wording (exact), new wording]
const FIXES = [
  // LinkedIn posting: two or three times a week.
  ["module-brand", "one post per week sharing insight", "two or three posts a week sharing insight"],
  ["module-brand", "Aim for 2-3 posts per week - consistency beats frequency", "Aim for two or three posts a week, every week: consistency matters more than volume"],
  ["module-brand", "I post when I have something worth saying, not to fill a quota.", "I post two or three times a week, and only when I have something worth saying."],
  ["module-systems-rectech", "share relevant market content three times a week", "share relevant market content two or three times a week"],
  ["module-systems-rectech", "Share something through Paiger several times a week", "Share something through Paiger two or three times a week"],
  ["tool-linkedin-recruiter", "at least three posts a week", "two or three posts a week"],

  // Follow-ups: four to six touches, always with a way to opt out.
  ["module-bd", "Follow up 3 times across different channels before moving on - most replies come on the second or third attempt",
    "Plan four to six touches across different channels before moving on, and stop as soon as they ask you to"],
  ["module-candidate-sourcing", "one credit covers a whole 3 to 10 step sequence, so run 5 to 10 follow-ups per prospect.",
    "one credit covers a whole sequence, so plan four to six steps per prospect, and always give them an easy way to opt out."],
  ["tool-sourcewhale", "Use 7 to 9 touches across email, calls and LinkedIn.", "Use four to six touches across email, calls and LinkedIn, with an easy way to opt out."],
  ["module-systems-rectech", "Build short SourceWhale sequences of three or four steps, mixing email and LinkedIn, spread over two weeks",
    "Build SourceWhale sequences of four to six steps, mixing email and LinkedIn, spread over two to four weeks, with an easy way to opt out"],
  ["module-reverse-headhunting", "Follow up: two or three touches across LinkedIn, email and phone", "Follow up: four to six touches across LinkedIn, email and phone"],

  // Brief call: 30 to 45 minutes.
  ["module-client", "The best brief call takes 45 minutes and covers far more than the job description.", "A good brief call takes 30 to 45 minutes and covers far more than the job description."],
  ["module-client", "Can we get 20 minutes on a call today or tomorrow?", "Can we get 30 minutes on a call today or tomorrow?"],
  ["module-recruitment-lifecycle", "a ten-minute intake call that should have been forty.", "a ten-minute intake call that needed thirty to forty-five."],

  // Debrief: the candidate as soon as they come out; the client the same day.
  ["module-interview", "Not following up within 2 hours of the interview - the debrief call is as valuable as the prep call",
    "Not calling the candidate as soon as they come out of the interview - the debrief call is as valuable as the prep call"],
  ["module-interview", "Call within 2 hours. Not tomorrow morning.", "Call as soon as they come out. Not tomorrow morning."],
  ["module-interview", "Call within 2 hours of the interview ending - not the next day", "Call as soon as the interview ends - not the next day"],
  ["module-candidate", "call within 2 hours of the interview ending - not the next day", "call as soon as the interview ends - not the next day"],
  ["module-job", "Get client feedback within 24 hours of every interview - chase on the same day", "Get client feedback the same day as every interview, and chase if it hasn't come"],
  ["module-job", "Debrief the candidate within 2 hours, before you share client feedback", "Debrief the candidate as soon as they come out, before you share client feedback"],
  ["form-interview-feedback", "call within 2 hours", "call the same day"],
  ["module-client-control", "\"Within 24 hours\",\"A call with us", "\"The same day\",\"A call with us"],

  // Stalled pipeline: chase after 48 hours of silence; find out why after a week.
  ["module-time", "If a process has not moved in 2 weeks and you do not know why, that is a problem.",
    "If a process has had no response in 48 hours, chase it. If it hasn't moved in a week and you do not know why, that is a problem."],
  ["module-time", "If a role has not moved in 2 weeks, I ask why.", "If a role has not moved in a week, I ask why."],
  ["module-time", "5 roles that have had no movement in 2 weeks", "5 roles that have had no movement in a week"],
  ["module-time", "We submitted CVs 2 weeks ago", "We submitted CVs a week ago"],

  // Stay conversations: every quarter.
  ["module-mgmt-motivation", "and check in every month, not just when there's a problem.", "and hold a stay conversation every quarter, not just when there's a problem."],

  // Job grading: Green, Amber and Red are the same as A, B and C jobs.
  ["module-job", "RAG rate every live role every Monday: Green (likely to close), Amber (needs work), Red (unlikely)",
    "RAG rate every live role every Monday: Green (likely to close), Amber (needs work), Red (unlikely). These match A, B and C jobs in Job Specification & Qualification"],

  // Leads per profile: one wording, and a pointer to the full method.
  ["module-candidate-sourcing", "One profile is ten leads, if you check everything", "One profile, many leads, if you check everything"],
  ["module-candidate-sourcing", "Hotlist the companies in Bullhorn so the whole team benefits.",
    "Hotlist the companies in Bullhorn so the whole team benefits. The full method is \"Cold lead stripping\" in Business Development Fundamentals."],

  // No made-up conversion figures.
  ["module-bd", "A warm call converts at 3-5x the rate of a cold one.", "A warm call converts far better than a cold one."],
  ["module-candidate", "Warm referrals convert at 3x the rate of cold outreach - always ask", "Warm referrals convert far better than cold outreach - always ask"],
  ["module-candidate", "is worth 10x a 'keen' candidate", "is worth far more than a 'keen' candidate"],
  ["quiz-08", "Warm referrals convert at 3x the rate of cold outreach.", "Warm referrals convert far better than cold outreach."],

  // Time to decide: agree when you'll talk again.
  ["module-offer", "Giving the candidate too much time to decide - uncertainty breeds doubt", "Leaving the decision open-ended, with no agreed time to talk again"],

  // Client sell-in: the same four parts everywhere.
  ["module-client-control", "outcome, context, proof and risk", "outcome, context, proof and logistics"],

  // Technology: weeks that agree with the phases.
  ["techPage", "Bullhorn, LinkedIn Recruiter and Paiger, plus the start of Sourcewhale.", "Bullhorn, LinkedIn Recruiter and Paiger, plus the start of Sourcewhale and Woo.io."],
  ["techPage", "Woo.io and Cognism join, and all six systems run as end-to-end workflows.", "Cognism joins, and all six systems run as end-to-end workflows."],
  ["techPage", "Each system gets one week of structured learning, then goes straight into your daily work.", "Each system gets focused learning time, then goes straight into your daily work."],

  // Start here: the compliance courses belong in week 1.
  ["startHere", "Our values, the standard we hold ourselves to, the seven stages of a placement and the tools you'll use every day.",
    "Our values, the seven stages of a placement, the tools you'll use every day, and your GDPR, cyber and data privacy courses."],
];

// Fixes that aren't a change of wording.
function special(id, doc) {
  const log = [];
  if (id === "startHere") {
    // The Offer Tracker goes with the offer module (step 4), the Pipeline Tracker with finding and qualifying (step 2).
    const move = (formId, toKey) => {
      const from = doc.steps.find((s) => s.forms?.some((f) => f._ref === formId));
      const to = doc.steps.find((s) => s._key === toKey);
      if (!from || !to || from === to) return log.push(`NOT MOVED ${formId}`);
      const ref = from.forms.find((f) => f._ref === formId);
      from.forms = from.forms.filter((f) => f !== ref);
      to.forms = [...(to.forms ?? []), { ...ref, _key: `ref-${formId}` }];
      log.push(`moved ${formId} to ${toKey}`);
    };
    move(doc.steps.flatMap((s) => s.forms ?? []).find((f) => /offer-tra/.test(f._ref))?._ref, "step-4");
    move("form-candidate-pipeline", "step-2");
  }
  // The Big 5 daily check: Bullhorn, the single source of truth, in; Sourcebreaker (not a core tool) out.
  if (id === "tool-bullhorn" && !doc.dailyCheck) { doc.dailyCheck = "Work your Bullhorn tasks and pipeline: today's follow-ups and stalled processes"; log.push("daily check added"); }
  if (id === "tool-sourcebreaker" && doc.dailyCheck) { delete doc.dailyCheck; log.push("daily check removed"); }
  return log;
}

// "client" not "customer" in the module that used it (the "ideal customer profile" is a standard term and stays).
const CUSTOMER_DOCS = ["module-customer-candidate", "quiz-playbook-11-02", "library-playbook-11"];
const toClient = (s) => s.replace(/\bcustomers\b/g, "clients").replace(/\bCustomers\b/g, "Clients").replace(/\bcustomer\b/g, "client").replace(/\bCustomer\b/g, "Client");
// "counteroffer" everywhere (not inside addresses such as form-counter-offer-guide).
const toCounteroffer = (s) => s.replace(/(?<![-\w])([Cc])ounter-([Oo])ffer(s?)(?![-\w])/g, (_, c, o, plural) => `${c}ounter${o.toLowerCase()}ffer${plural}`);

function walk(value, fn, count) {
  if (typeof value === "string") { const next = fn(value); if (next !== value) count.n += 1; return next; }
  if (Array.isArray(value)) return value.map((v) => walk(v, fn, count));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k.startsWith("_") || ["slug", "url", "href", "icon", "accent"].includes(k) ? v : walk(v, fn, count)]));
  }
  return value;
}

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_READ_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });
const TYPES = ["trainingModule", "formDocument", "quizQuestion", "techTool", "techPage", "libraryItem", "startHere", "homePage", "rewards"];
const all = await client.fetch(`*[_type in $types]`, { types: TYPES });
const byId = new Map();
for (const d of all) { const id = d._id.replace(/^drafts\./, ""); if (!byId.has(id) || d._id.startsWith("drafts.")) byId.set(id, d); }

let problems = 0;
const changed = new Map();
const get = (id) => changed.get(id) ?? structuredClone(byId.get(id));

for (const [id, from, to] of FIXES) {
  const base = byId.get(id);
  if (!base) { console.log(`MISSING   ${id}`); problems += 1; continue; }
  const doc = get(id);
  // Table cells are matched on their JSON so a short value ("Within 24 hours") is changed only in its row.
  const asJson = from.startsWith("\"");
  const count = { n: 0 };
  const next = asJson
    ? (JSON.stringify(doc).includes(from) ? (count.n = 1, JSON.parse(JSON.stringify(doc).split(from).join(to))) : doc)
    : walk(doc, (s) => s.split(from).join(to), count);
  console.log(`${count.n ? "ok       " : "NOT FOUND"} ${id}: ${from.slice(0, 70)}`);
  if (!count.n) problems += 1;
  changed.set(id, next);
}
for (const id of ["startHere", "tool-bullhorn", "tool-sourcebreaker"]) {
  const doc = get(id);
  const log = special(id, doc);
  log.forEach((l) => console.log(`${l.startsWith("NOT") ? "NOT FOUND" : "ok       "} ${id}: ${l}`));
  if (log.some((l) => l.startsWith("NOT"))) problems += 1;
  if (log.length) changed.set(id, doc);
}
for (const id of CUSTOMER_DOCS) {
  const count = { n: 0 };
  const next = walk(get(id), toClient, count);
  console.log(`ok        ${id}: customer to client in ${count.n} places`);
  if (count.n) changed.set(id, next);
}
let co = 0;
for (const id of byId.keys()) {
  const count = { n: 0 };
  const next = walk(get(id), toCounteroffer, count);
  if (count.n) { changed.set(id, next); co += count.n; }
}
console.log(`ok        counter-offer to counteroffer in ${co} places`);

const tx = client.transaction();
for (const [id, doc] of changed) {
  const { _rev, _createdAt, _updatedAt, ...rest } = doc;
  tx.createOrReplace({ ...rest, _id: `drafts.${id}` });
}

// The import data files, so a re-import keeps the agreed wording.
for (const name of fs.readdirSync(new URL("./", import.meta.url), { recursive: true })) {
  if (!/\.(js|json)$/.test(name) || /^fix-/.test(name)) continue;
  const url = new URL(`./${name}`, import.meta.url);
  const json = name.endsWith(".json");
  const before = fs.readFileSync(url, "utf8");
  let after = before;
  for (const [, from, to] of FIXES) {
    if (from.startsWith("\"")) continue;
    const enc = (s) => (json ? JSON.stringify(s).slice(1, -1) : s);
    after = after.split(enc(from)).join(enc(to));
  }
  after = toCounteroffer(after);
  if (after !== before) {
    console.log(`file      studio/migrations/${name}`);
    if (!dryRun) fs.writeFileSync(url, after);
  }
}

console.log(`\n${changed.size} documents.${problems ? ` ${problems} problem(s) above.` : ""}`);
if (dryRun) { console.log("Dry run: nothing sent to Sanity, no files changed."); process.exit(0); }
await tx.commit({ visibility: "sync" });
console.log("Saved as drafts. Review and publish them in the Studio.");
