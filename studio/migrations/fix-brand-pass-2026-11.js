// One-off brand tidy-up from the final sweep (November 2026), following the brand guidelines:
// - em dashes become a spaced hyphen ("fear — status" → "fear - status")
// - en dash number ranges become "to" ("Weeks 1–4" → "Weeks 1 to 4")
// - US spellings: toward(s), afterward(s), band-aid → sticking plaster
//
// Everything arrives as DRAFTS (on top of any draft already there), to review and publish in the
// Studio. Compliance courses are left alone (they have none, and one mentions US spellings on
// purpose), as are the House's settings and rooms. The import data files get the same change, so
// a re-import can't bring the old characters back.
//
// Run from the project root:  node studio/migrations/fix-brand-pass-2026-11.js --dry-run   (check only)
//                             node studio/migrations/fix-brand-pass-2026-11.js             (save drafts)
import fs from "node:fs";
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");
const TYPES = ["trainingModule", "formDocument", "techPage", "techTool", "homePage", "libraryItem", "quizQuestion", "libraryPage", "managersPage", "formsPage", "compliancePage", "startHere", "rewards", "siteSettings", "category", "value"];

export function tidy(text) {
  return text
    .replace(/(\d)[ \t]*–[ \t]*(\d)/g, "$1 to $2") // number ranges
    .replace(/[ \t]*[—–][ \t]*/g, " - ")             // any other em or en dash
    .replace(/\bA band-aid\b/g, "A sticking plaster")
    .replace(/\ba band-aid\b/g, "a sticking plaster")
    .replace(/\bband-aid\b/gi, "sticking plaster")
    .replace(/\b([Tt])oward\b/g, "$1owards")
    .replace(/\b([Aa])fterward\b/g, "$1fterwards");
}

function apply(value, count) {
  if (typeof value === "string") {
    const next = tidy(value);
    if (next !== value) count.n += 1;
    return next;
  }
  if (Array.isArray(value)) return value.map((v) => apply(v, count));
  if (value && typeof value === "object") {
    // Leave system fields, addresses and option values alone.
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k.startsWith("_") || ["slug", "url", "href", "icon", "accent"].includes(k) ? v : apply(v, count)]));
  }
  return value;
}

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_READ_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });
const all = await client.fetch(`*[_type in $types]`, { types: TYPES });
const byId = new Map();
for (const d of all) {
  const id = d._id.replace(/^drafts\./, "");
  // Prefer the draft if someone is already editing.
  if (!byId.has(id) || d._id.startsWith("drafts.")) byId.set(id, d);
}

const tx = client.transaction();
let docs = 0;
let fields = 0;
for (const [id, base] of byId) {
  const count = { n: 0 };
  const next = apply(base, count);
  if (!count.n) continue;
  docs += 1;
  fields += count.n;
  console.log(`${String(count.n).padStart(4)}  ${base._type}  ${base.title ?? id}`);
  const { _rev, _createdAt, _updatedAt, ...rest } = next;
  tx.createOrReplace({ ...rest, _id: `drafts.${id}` });
}

// The import data files, so a re-import keeps the tidied text.
for (const name of fs.readdirSync(new URL("./", import.meta.url), { recursive: true })) {
  if (!/\.(js|json)$/.test(name) || name.includes("fix-brand-pass") || name.includes("fix-must-fixes")) continue;
  const url = new URL(`./${name}`, import.meta.url);
  const before = fs.readFileSync(url, "utf8");
  const after = tidy(before);
  if (after !== before) {
    console.log(`file  studio/migrations/${name}`);
    if (!dryRun) fs.writeFileSync(url, after);
  }
}

console.log(`\n${fields} fields in ${docs} documents.`);
if (dryRun) { console.log("Dry run: nothing sent to Sanity, no files changed."); process.exit(0); }
await tx.commit({ visibility: "sync" });
console.log("Saved as drafts. Review and publish them in the Studio.");
