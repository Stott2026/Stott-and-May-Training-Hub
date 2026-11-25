// One-off: sentence-case section headings in the Core skills modules, to match the Recruitment
// Playbook (final sweep, November 2026). Saved as DRAFTS to review and publish in the Studio.
// "The Six Principles of Influence" also becomes "Seven principles", since the section lists seven.
//
// Run from the project root:  node studio/migrations/fix-core-headings-2026-11.js --dry-run   (check only)
//                             node studio/migrations/fix-core-headings-2026-11.js             (save drafts)
import fs from "node:fs";
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");
const HEADINGS = {
  "Why Personal Brand Matters in Recruitment": "Why your personal brand matters in recruitment",
  "Content That Builds Credibility": "Content that builds credibility",
  "Negotiation Principles": "Negotiation principles",
  "Negotiating with Candidates": "Negotiating with candidates",
  "Pre-Start Aftercare": "Aftercare before day one",
  "Turning Placements into Referrals": "Turning placements into referrals",
  "Power Questions - Universal": "Power questions for every call",
  "Power Questions - Perm Specific": "Power questions for perm",
  "Power Questions - Contract Specific": "Power questions for contract",
  "Opening and Rapport Phrases": "Opening and rapport phrases",
  "Closing and Commitment Phrases": "Closing and commitment phrases",
  "Difficult Conversation Starters": "Starting difficult conversations",
  "Why Psychology Matters in Recruitment": "Why psychology matters in recruitment",
  "Reading Buying Signals": "Reading buying signals",
  "The Six Principles of Influence (Cialdini)": "Seven principles of influence (Cialdini)",
  "Behavioural Traits - Reading the Room": "Behavioural traits: reading the room",
  "MEDDPICC - Qualifying and Winning Complex Deals": "MEDDPICC: qualifying and winning complex deals",
  "SPIN Selling - Uncovering Pain and Creating Urgency": "SPIN Selling: uncovering pain and creating urgency",
  "GAP Selling - Bridging Current to Future State": "GAP Selling: bridging the current state to the future state",
  "Your Recruitment Tech Stack": "Your recruitment tech stack",
  "Bullhorn: Your Single Source of Truth": "Bullhorn: your single source of truth",
  "Finding Talent: LinkedIn Recruiter and Woo.io": "Finding talent: LinkedIn Recruiter and Woo.io",
  "Contact Data and Outreach: Cognism and SourceWhale": "Contact data and outreach: Cognism and SourceWhale",
  "Building Your Profile with Paiger": "Building your profile with Paiger",
  "Structuring Your Day": "Structuring your day",
  "Managing Your Pipeline": "Managing your pipeline",
};
const IDS = ["module-brand", "module-negotiation", "module-onboarding", "module-phrases", "module-psychology", "module-sales", "module-systems-rectech", "module-time"];

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_READ_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });
const docs = await client.fetch(`*[_id in $ids || _id in $drafts]`, { ids: IDS, drafts: IDS.map((id) => `drafts.${id}`) });
const tx = client.transaction();
let n = 0;
for (const id of IDS) {
  const doc = structuredClone(docs.find((d) => d._id === `drafts.${id}`) ?? docs.find((d) => d._id === id));
  for (const s of doc.sections) if (HEADINGS[s.title]) { console.log(`${id}: ${s.title} → ${HEADINGS[s.title]}`); s.title = HEADINGS[s.title]; n += 1; }
  const { _rev, _createdAt, _updatedAt, ...rest } = doc;
  tx.createOrReplace({ ...rest, _id: `drafts.${id}` });
}

// link-forms.js finds sections by heading, so keep it in step.
const url = new URL("./link-forms.js", import.meta.url);
const before = fs.readFileSync(url, "utf8");
let after = before;
for (const [from, to] of Object.entries(HEADINGS)) after = after.split(`"${from}"`).join(`"${to}"`);
if (after !== before) { console.log("file: studio/migrations/link-forms.js"); if (!dryRun) fs.writeFileSync(url, after); }

console.log(`\n${n} of ${Object.keys(HEADINGS).length} headings.`);
if (dryRun) { console.log("Dry run: nothing sent to Sanity."); process.exit(0); }
await tx.commit({ visibility: "sync" });
console.log("Saved as drafts. Review and publish them in the Studio.");
