// One-off fix: how the hub talks about asking for current salary (agreed with Ian, November 2026).
// Not a blanket ban: lead with the target package, and be mindful of the law where you're recruiting.
// Salary-history questions are banned in New York and many other US states and cities, but allowed
// in the UK. Visa type is still never asked.
//
// Everything arrives as DRAFTS (on top of any draft already there), to review and publish in the
// Studio. The import data files get the same wording.
//
// Run from the project root:  node studio/migrations/fix-salary-2026-11.js --dry-run   (check only)
//                             node studio/migrations/fix-salary-2026-11.js             (save drafts)
import fs from "node:fs";
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");
const LAW = "Salary-history questions are banned in New York and many other US states and cities, though allowed in the UK";
const TAKEAWAY = "Lead with target package and work authorisation, know the salary-history rules where you're recruiting, and never ask visa type.";

// [document id, old wording (exact), new wording]
const FIXES = [
  ["module-candidate-sourcing", "New York City and many US states ban salary-history questions, and federal law restricts questions about citizenship status.",
    `${LAW}, and US federal law restricts questions about citizenship status. Know the rules where the role and the candidate are based.`],
  ["module-candidate-sourcing", "Recording current salary or immigration details in Bullhorn when a candidate volunteers them. Note the target package and \"sponsorship required: yes / no\" only",
    "Recording current salary where salary-history rules apply, or immigration details anywhere, when a candidate volunteers them. Note the target package and \"sponsorship required: yes / no\""],
  ["module-candidate-sourcing", "Ask for target package and work authorisation, never salary history or visa type.", TAKEAWAY],
  ["module-candidate-sourcing", "Record only the target package and \"sponsorship required: yes\" in Bullhorn, not their current salary or visa details.",
    "Record the target package and \"sponsorship required: yes\" in Bullhorn, not their visa details, and not their current salary where salary-history rules apply."],
  ["module-recruitment-lifecycle", "Asking for current or past salary. Ask for the target or expected package: salary-history questions are banned in New York City and many US states",
    `Leading with current or past salary. Ask for the target or expected package first. ${LAW}, so know the rules where you're recruiting`],
  ["module-reverse-headhunting", "Asking for current or past salary. Salary-history questions are banned in New York City and many US states, and that applies to senior leaders too",
    `Leading with current or past salary. ${LAW}, and that applies to senior leaders too. Start with their target package`],
  ["module-reverse-headhunting", "Ask for their target package, never their current salary.", "Start with their target package, and know the salary-history rules where you're recruiting."],
  ["quiz-playbook-02-01", "Ask for the target or expected package, never current or past salary. Salary-history questions are banned in New York City and many US states.",
    `Ask for the target or expected package: it's what you need to submit at the right number. ${LAW}, so lead with the target package everywhere.`],
  ["quiz-playbook-06-01", "Ask for their target package, never their current salary. Salary-history questions are banned in New York City and many US states, and that applies to senior leaders too.",
    `Ask for their target package: it's what you need to submit at the right number. ${LAW}, and that applies to senior leaders too.`],
];

function walk(value, fn, count) {
  if (typeof value === "string") { const next = fn(value); if (next !== value) count.n += 1; return next; }
  if (Array.isArray(value)) return value.map((v) => walk(v, fn, count));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k.startsWith("_") ? v : walk(v, fn, count)]));
  return value;
}

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_READ_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });
const ids = [...new Set(FIXES.map(([id]) => id))];
const docs = await client.fetch(`*[_id in $ids || _id in $drafts]`, { ids, drafts: ids.map((id) => `drafts.${id}`) });

let problems = 0;
const tx = client.transaction();
for (const id of ids) {
  let doc = docs.find((d) => d._id === `drafts.${id}`) ?? docs.find((d) => d._id === id);
  if (!doc) { console.log(`MISSING   ${id}`); problems += 1; continue; }
  for (const [, from, to] of FIXES.filter(([fid]) => fid === id)) {
    const count = { n: 0 };
    doc = walk(doc, (s) => s.split(from).join(to), count);
    console.log(`${count.n ? "ok       " : "NOT FOUND"} ${id}: ${from.slice(0, 70)}`);
    if (!count.n) problems += 1;
  }
  const { _rev, _createdAt, _updatedAt, ...rest } = doc;
  tx.createOrReplace({ ...rest, _id: `drafts.${id}` });
}

for (const name of fs.readdirSync(new URL("./", import.meta.url), { recursive: true })) {
  if (!/\.(js|json)$/.test(name) || /^fix-/.test(name)) continue;
  const url = new URL(`./${name}`, import.meta.url);
  const before = fs.readFileSync(url, "utf8");
  let after = before;
  // The import files are JavaScript with double-quoted strings, so quotes inside are escaped.
  for (const [, from, to] of FIXES) {
    const enc = (s) => JSON.stringify(s).slice(1, -1);
    after = after.split(enc(from)).join(enc(to)).split(from).join(to.includes("\"") ? enc(to) : to);
  }
  if (after !== before) {
    console.log(`file      studio/migrations/${name}`);
    if (!dryRun) fs.writeFileSync(url, after);
  }
}

if (problems) console.log(`\n${problems} problem(s) above.`);
if (dryRun) { console.log("Dry run: nothing sent to Sanity, no files changed."); process.exit(0); }
await tx.commit({ visibility: "sync" });
console.log(`\nSaved ${ids.length} drafts. Review and publish them in the Studio.`);
