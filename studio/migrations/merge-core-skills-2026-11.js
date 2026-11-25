// One-off: fold the older "Core skills" modules into the Recruitment Playbook (agreed with Ian,
// November 2026). The sections that add something new move into the Playbook module they belong
// to, as DRAFTS to review and publish. Then seven older modules are retired.
//
//   Contract and SOW candidate briefing        → Interview Prep & Pre-closing
//   Managing expectations                       → Client & Candidate Management
//   Contract brief; contract and SOW jobs       → Job Specification & Qualification
//   Handling objections (plus the five common)  → Business Development Fundamentals
//
// Retired (unpublished, so they disappear from the hub; each keeps a draft, so publishing it in the
// Studio brings it back): Interview Coaching, Offer Management and Closing, Candidate Management,
// Client Management, Job Management, Business Development, Control in Conversations.
//
// Run from the project root:
//   node studio/migrations/merge-core-skills-2026-11.js --dry-run   (check only)
//   node studio/migrations/merge-core-skills-2026-11.js             (save the merged Playbook drafts)
//   node studio/migrations/merge-core-skills-2026-11.js --retire    (unpublish the seven older modules)
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");
const retire = process.argv.includes("--retire");

const RETIRE = ["module-interview", "module-offer", "module-candidate", "module-client", "module-job", "module-bd", "module-control"];

// [from module, section title, new title, to module, insert before the section titled]
const MOVES = [
  ["module-candidate", "Contract - Briefing and Preparing Candidates", "Contract: brief and prepare the candidate", "module-interview-prep", "Practise it: a prep call, then pre-close a competing offer"],
  ["module-candidate", "SOW - Briefing and Preparing Candidates", "SOW: brief and prepare the consultant", "module-interview-prep", "Practise it: a prep call, then pre-close a competing offer"],
  ["module-candidate", "Managing Expectations", "Managing expectations, from first call to offer", "module-customer-candidate", "Practise it: the 48-hour plan for one live role"],
  ["module-client", "Taking a Quality Brief - Contract", "Taking a contract brief", "module-job-specification", "Practise it: qualify, grade and build the search for one live role"],
  ["module-job", "Contract and SOW Job Management", "Working contract and SOW jobs", "module-job-specification", "Practise it: qualify, grade and build the search for one live role"],
  ["module-control", "Handling Objections", "Handling the objections you'll hear most", "module-bd-fundamentals", "Practise it: a 20-second chase pitch from a real lead"],
];

// The objection section promised "your 5 most common objections" without naming them.
const FIVE_OBJECTIONS = {
  _key: "table-five-objections",
  _type: "dataTable",
  title: "The five you'll hear most",
  columns: ["Objection", "What's usually behind it", "Try"],
  rows: [
    ["\"Your fees are too high.\"", "They can't yet see the value against the cost of the empty seat.", "\"What is this role costing you each week it's empty? Let's look at the fee against that.\""],
    ["\"We have a PSL and you're not on it.\"", "A process, not a closed door.", "\"Which roles does your PSL struggle with? Let us prove ourselves on one.\""],
    ["\"We hire through our in-house team.\"", "Internal TA covers most hires, but not all.", "\"Where does your team get stuck? We work alongside in-house teams on niche and senior roles.\""],
    ["\"Just send me some CVs.\"", "They want speed, not a process.", "\"I will, and they'll be far better for 30 minutes on the brief. Can we do that now?\""],
    ["\"There's no budget right now.\"", "Timing, or a headcount freeze.", "\"When does budget open up? And is there a project that can't wait? That's often a contract need.\""],
  ].map((cells, i) => ({ _key: `row-${i + 1}`, _type: "row", cells })),
};

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_READ_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });
const ids = [...new Set(MOVES.flatMap(([from, , , to]) => [from, to]).concat(RETIRE))];
const docs = await client.fetch(`*[_id in $ids || _id in $drafts]`, { ids, drafts: ids.map((id) => `drafts.${id}`) });
const latest = (id) => docs.find((d) => d._id === `drafts.${id}`) ?? docs.find((d) => d._id === id);

if (retire) {
  // Unpublish: make sure a draft exists (so nothing is lost), then remove the published version.
  const tx = client.transaction();
  for (const id of RETIRE) {
    const published = docs.find((d) => d._id === id);
    const draft = docs.find((d) => d._id === `drafts.${id}`);
    if (!published) { console.log(`already retired  ${id}`); continue; }
    if (!draft) { const { _rev, _createdAt, _updatedAt, ...rest } = published; tx.createIfNotExists({ ...rest, _id: `drafts.${id}` }); }
    tx.delete(id);
    console.log(`retire           ${id}: ${published.title}`);
  }
  if (dryRun) { console.log("Dry run: nothing sent to Sanity."); process.exit(0); }
  await tx.commit({ visibility: "sync" });
  console.log("Retired. Each keeps a draft in the Studio: publish it to bring the module back.");
  process.exit(0);
}

let problems = 0;
const targets = new Map();
for (const [from, title, newTitle, to, before] of MOVES) {
  const source = latest(from);
  const section = source?.sections?.find((s) => s.title === title);
  const target = targets.get(to) ?? structuredClone(latest(to));
  if (!section || !target) { console.log(`NOT FOUND  ${from}: ${title}`); problems += 1; continue; }
  const key = `from-${from.replace("module-", "")}-${section._key}`;
  if (target.sections.some((s) => s._key === key)) { console.log(`already there  ${to}: ${newTitle}`); continue; }
  const moved = { ...structuredClone(section), _key: key, title: newTitle };
  if (from === "module-control") {
    moved.content = moved.content.replace("Learn your 5 most common objections by heart and have a considered response for each one.", "Learn the five below by heart, and have a considered response ready for each one.");
    moved.tables = [...(moved.tables ?? []), FIVE_OBJECTIONS];
  }
  const at = target.sections.findIndex((s) => s.title === before);
  if (at === -1) { console.log(`NO PLACE   ${to}: before "${before}"`); problems += 1; continue; }
  target.sections.splice(at, 0, moved);
  targets.set(to, target);
  console.log(`move       ${from} "${title}" → ${to} as "${newTitle}"`);
}

if (problems) { console.log(`\n${problems} problem(s): nothing saved.`); process.exit(1); }
if (dryRun) { console.log("Dry run: nothing sent to Sanity."); process.exit(0); }
const tx = client.transaction();
for (const [id, doc] of targets) {
  const { _rev, _createdAt, _updatedAt, ...rest } = doc;
  tx.createOrReplace({ ...rest, _id: `drafts.${id}` });
}
await tx.commit({ visibility: "sync" });
console.log(`\nSaved ${targets.size} Playbook drafts. Review and publish them in the Studio, then run with --retire.`);
