// One-off fix: the "must fix before launch" wording from the final sweep (November 2026).
// IR35 lines (the client decides status, we never decide or advise on it), contradictions about
// offers and counteroffers, right to work (BRPs no longer valid), forecasting, BANT, citizenship,
// privacy wording, "S&M" and a leftover internal note.
//
// Everything arrives as DRAFTS of the documents it touches, to review and publish in the Studio.
// It also updates the same wording in the import data files, so a later re-import can't bring the
// old text back.
//
// Run from the project root:  node studio/migrations/fix-must-fixes-2026-11.js --dry-run   (check only)
//                             node studio/migrations/fix-must-fixes-2026-11.js             (save drafts)
import fs from "node:fs";
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");

const COUNTEROFFER_TIMING = "Start the counteroffer conversation at screening, and come back to it at offer stage";

// [document id, old wording (exact), new wording]
const FIXES = [
  // IR35: the client decides status and issues the Status Determination Statement (SDS).
  ["module-candidate",
    "Before anything else, are you inside or outside IR35 and what is your preferred payment method?",
    "The client has assessed this role as [inside/outside] IR35. How do you prefer to be paid: through an umbrella company or your own limited company?"],
  ["module-client",
    "Confirm IR35 status first — if the client does not know, help them work it out",
    "Confirm the client's IR35 status determination first. If they haven't assessed it, point them to HMRC's CEST tool and our compliance team: the decision and the Status Determination Statement are theirs"],
  ["module-client",
    "Have you determined IR35 status? If not, I can help you work through that before we start.",
    "Has the role been assessed for IR35 yet? We'll need your Status Determination Statement before we start, and our compliance team can point you to HMRC's guidance."],
  ["module-negotiation",
    "For contract: explore payment method and IR35 treatment before rate",
    "For contract: confirm the role's IR35 status (the client's Status Determination Statement) and the payment route before discussing rate"],
  ["module-phrases",
    "Is IR35 status a dealbreaker for you, or is it negotiable at the right rate?",
    "UK roles: would you consider a role inside IR35? If so, what day rate would you need through an umbrella company?"],

  // Selling Contract: add the UK basics next to the US ones.
  ["module-contract-consulting",
    "(on our payroll as a W-2 employee, or through their own company) and invoice the client, usually weekly from approved timesheets.",
    "(in the US, on our payroll as a W-2 employee or through their own company; in the UK, through an umbrella company or their own limited company) and invoice the client, usually weekly from approved timesheets. In the UK, the client decides whether a role is inside or outside IR35 and issues a Status Determination Statement, and agency workers gain equal treatment on pay and conditions after 12 weeks in the same role."],
  ["module-contract-consulting",
    "W-2 means the contractor is employed through us; 1099 means an independent contractor; corp-to-corp (C2C) means they bill through their own company.",
    "W-2 means the contractor is employed through us; 1099 means an independent contractor; corp-to-corp (C2C) means they bill through their own company. UK contracts work the same way with a day rate in pounds: the contractor is paid through an umbrella company or their own limited company, and the client decides IR35 status."],
  ["module-contract-consulting",
    "Quoting rates or promising a classification (W-2, 1099 or C2C) yourself.",
    "Quoting rates or promising a classification (W-2, 1099 or C2C, or in the UK an IR35 status) yourself."],

  // Privacy: don't present consent as the basis for keeping candidate data; mention the privacy notice.
  ["module-systems-rectech",
    "Are you happy for us to keep your details on file and contact you about relevant roles?",
    "We'll keep your details on file so we can call you about relevant roles. Our privacy notice explains how we use them, and you can ask us to stop at any time."],
  ["module-systems-rectech",
    "Record how and when a candidate agreed to us holding their details, and respect their contact preferences",
    "Record where a candidate's details came from and their contact preferences, check they've been sent our privacy notice, and respect any request to stop"],
  ["module-systems-rectech",
    "Use Cognism to find direct contact details for decision makers and passive candidates you cannot reach any other way",
    "Use Cognism to find direct contact details for decision makers and passive candidates you cannot reach any other way. Anyone you add from Cognism must be sent our privacy notice within a month"],

  // Offers: agree the offer process with the client (they can make it), and raise counteroffers twice.
  ["module-offer",
    "Letting the client call the candidate directly — you lose control of the conversation",
    "Not agreeing with the client how and when the offer will be made, so the candidate hears it before you've prepared them"],
  ["module-offer",
    "Never let the client make an offer directly without going through you",
    "Agree with the client how and when the offer is made, so you can prepare the candidate first"],
  ["module-offer", "Have the counter-offer conversation at initial screening — not at offer stage", COUNTEROFFER_TIMING],
  ["module-candidate", "Have the counter-offer conversation at initial screening, not at offer stage", COUNTEROFFER_TIMING],
  ["form-counter-offer-guide", "Have this conversation at screening, not at offer stage", "Start this conversation at screening, and come back to it at offer stage"],
  ["form-counter-offer-guide", "Use at screening stage — not at offer stage. Have this conversation early.", "Start at screening, and come back to it at offer stage. Have this conversation early."],

  // Forecasting: an accepted offer isn't committed until the candidate has resigned.
  ["module-mgmt-forecasting",
    "Accepted offers and started placements. Bet your credibility on it.",
    "Offers accepted in writing with the resignation done and a start date confirmed, plus started placements. Bet your credibility on it."],

  // Sales Methodologies: the subtitle promised a BANT section that doesn't exist.
  ["module-sales", "MEDDPICC, BANT, SPIN and GAP applied to recruitment", "MEDDPICC, SPIN and GAP applied to recruitment"],

  // Job spec: TS/SCI clearance needs US citizenship, so say when asking is allowed.
  ["module-job-specification",
    "Asking about citizenship or visa type. Work authorisation is a fair must-have, but ask \"authorised to work in the US?\" and \"need sponsorship now or in future?\"",
    "Asking about citizenship or visa type. Work authorisation is a fair must-have, but ask \"authorised to work in the US?\" and \"need sponsorship now or in future?\" The exception is where the law requires citizenship (security clearance such as TS/SCI, some export-controlled roles): then you may ask, but check with compliance first"],

  // Right to work: BRPs are no longer valid; eVisas through share codes. UK and US routes; perm clients check too.
  ["form-pre-placement-compliance", "Right to work in the UK confirmed",
    "Right to work confirmed (UK: our Home Office check; US: the employer completes Form I-9)"],
  ["form-pre-placement-compliance", "Document type verified (passport / biometric / share code)",
    "Document type verified (passport, or eVisa checked with a share code)"],
  ["form-pre-placement-compliance", "Expiry date diarised for re-check if applicable",
    "Expiry date diarised for re-check if applicable\nFor perm placements: client reminded that, as the employer, it must do its own right-to-work check"],
  ["form-pre-placement-compliance", "e.g. UK Passport, BRP, Share Code", "e.g. UK passport, eVisa (share code)"],

  // Brand and leftovers.
  ["techPage", " To be validated by the team.", ""],
  ["tool-paiger", "Post S&M jobs", "Post Stott and May jobs"],
  ["tool-sourcebreaker", "S&M placements", "Stott and May placements"],
  ["tool-sourcebreaker", "Sourcebots for S&M clients/terms", "Sourcebots for Stott and May clients and terms"],
];

// Replaces wording inside every string in a document. A checklist item that becomes two lines
// (contains "\n") is split into two items.
function apply(value, from, to, hits) {
  if (typeof value === "string") {
    if (!value.includes(from)) return value;
    hits.n += 1;
    return value.split(from).join(to);
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) => {
      const next = apply(item, from, to, hits);
      return typeof item === "string" && next !== item && next.includes("\n") && !item.includes("\n") ? next.split("\n") : [next];
    });
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k.startsWith("_") ? v : apply(v, from, to, hits)]));
  }
  return value;
}

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_READ_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });
const ids = [...new Set(FIXES.map(([id]) => id))];
const docs = await client.fetch(`*[_id in $ids || _id in $drafts]`, { ids, drafts: ids.map((id) => `drafts.${id}`) });

let problems = 0;
const tx = client.transaction();
for (const id of ids) {
  // Start from the existing draft if someone is already editing, otherwise from the published version.
  const base = docs.find((d) => d._id === `drafts.${id}`) ?? docs.find((d) => d._id === id);
  if (!base) { console.log(`MISSING  ${id}`); problems += 1; continue; }
  let doc = base;
  for (const [, from, to] of FIXES.filter(([fid]) => fid === id)) {
    const hits = { n: 0 };
    doc = apply(doc, from, to, hits);
    console.log(`${hits.n ? "ok      " : "NOT FOUND"} ${id}: ${from.slice(0, 70)}${hits.n > 1 ? ` (${hits.n} places)` : ""}`);
    if (!hits.n) problems += 1;
  }
  const { _rev, _createdAt, _updatedAt, ...rest } = doc;
  tx.createOrReplace({ ...rest, _id: `drafts.${id}` });
}

// Keep the import data files in step, so a re-import can't bring the old wording back.
const files = ["data/forms.json", "import-tech.js", "import-management.js", "import-playbook-07-08.js", "import-prototype.js"];
for (const name of files) {
  const url = new URL(`./${name}`, import.meta.url);
  if (!fs.existsSync(url)) continue;
  const before = fs.readFileSync(url, "utf8");
  let after = before;
  for (const [, from, to] of FIXES) {
    if (to.includes("\n")) continue; // the one new checklist item is only added in Sanity
    const json = name.endsWith(".json");
    const enc = (s) => (json ? JSON.stringify(s).slice(1, -1) : s);
    after = after.split(enc(from)).join(enc(to));
  }
  if (after !== before) {
    console.log(`file    studio/migrations/${name} updated`);
    if (!dryRun) fs.writeFileSync(url, after);
  }
}

if (problems) console.log(`\n${problems} problem(s) above.`);
if (dryRun) { console.log("Dry run: nothing sent to Sanity, no files changed."); process.exit(0); }
await tx.commit({ visibility: "sync" });
console.log(`\nSaved ${ids.length} drafts. Review and publish them in the Studio.`);
