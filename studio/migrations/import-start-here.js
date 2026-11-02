// One-off import: a first "Start here" path for new starters, as a DRAFT to review and publish
// in the Studio (Start here path). The timings follow the audiences on the Playbook decks.
//
// Run from the project root:  npm run import:start-here -- --dry-run   (check only)
//                             npm run import:start-here                (import)
// Safe to re-run: if the path already exists (draft or published) it is left alone.
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");
const ref = (id, i) => ({ _key: `ref-${i + 1}`, _type: "reference", _ref: id });

const STEPS = [
  ["Week 1", "Know how we work", "Our values, the standard we hold ourselves to, the seven stages of a placement and the tools you'll use every day.",
    ["module-standards-expectations", "module-recruitment-lifecycle", "module-systems-rectech"], ["form-weekly-activity-planner"]],
  ["Weeks 2 to 4", "Find and qualify", "Qualify candidates and roles properly before you spend time on them.",
    ["module-candidate-sourcing", "module-job-specification"], ["form-candidate-registration", "form-job-qualification", "form-client-brief"]],
  ["Months 2 to 3", "Win business and keep it", "Open doors with new clients, and keep everyone in the loop so deals don't go quiet.",
    ["module-bd-fundamentals", "module-reverse-headhunting", "module-customer-candidate"], ["form-lead-generation", "form-bd-call-prep", "form-candidate-pipeline"]],
  ["Months 3 to 6", "Control the process", "Sell candidates in, prepare both sides for interview and protect the offer.",
    ["module-client-control", "module-interview-prep", "module-counteroffer-management"], ["form-cv-submission-checklist", "form-interview-prep-sheet", "form-counter-offer-guide"]],
  ["From month 6", "Widen what you sell", "Turn a perm \"no\" into contract or consulting work, and negotiate with confidence.",
    ["module-contract-consulting", "module-negotiation"], ["form-sow-scope-checklist", "form-offer-tracker"]],
];

const doc = {
  _id: "drafts.startHere",
  _type: "startHere",
  title: "Start here",
  intro: "New to Stott and May? Work through these steps in order. Each one builds on the last, with forms to use on your desk as you go.",
  steps: STEPS.map(([timing, title, note, modules, forms], i) => ({
    _key: `step-${i + 1}`, _type: "pathStep", timing, title, note, modules: modules.map(ref), forms: forms.map(ref),
  })),
};

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });

// Every module and form must exist and be published, so the links work as soon as the path is.
const ids = [...new Set(STEPS.flatMap(([, , , m, f]) => [...m, ...f]))];
const found = new Set(await client.fetch(`*[_id in $ids]._id`, { ids }));
const missing = ids.filter((id) => !found.has(id));
if (missing.length) { console.error(`Not published yet: ${missing.join(", ")}`); process.exit(1); }

for (const s of doc.steps) console.log(`${s.timing} · ${s.title}: ${s.modules.length} modules, ${s.forms.length} forms`);
if (await client.fetch(`count(*[_id in ["startHere", "drafts.startHere"]])`)) { console.log("The Start here path already exists, so it was left alone."); process.exit(0); }
if (dryRun) { console.log("Dry run: nothing sent to Sanity."); process.exit(0); }
await client.create(doc);
console.log("Done. Review and publish the Start here path in the Studio.");
