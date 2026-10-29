// One-off import: links training sections to the fillable forms in the Documents & Forms tab
// ("Use this form" cards). Everything arrives as DRAFTS: each module gets a draft with its form
// links added, to review and publish in the Studio. A module that already has unpublished changes
// (for example new Look here cards) keeps them, and the form links are added on top.
//
// Run from the project root:  npm run link:forms -- --dry-run   (check only)
//                             npm run link:forms                (import)
// Safe to re-run: sections that already have forms are left alone.
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");

// Module (by web address) → section (by the start of its title) → forms (by web address).
const PLAN = {
  // Recruitment Playbook
  "standards-expectations": { "What \"good\" looks like on the numbers": ["weekly-activity-planner"] },
  "recruitment-lifecycle": {
    "Stage 1:": ["lead-generation", "bd-call-prep"],
    "Stage 2:": ["client-brief", "job-qualification"],
    "Stage 3:": ["candidate-registration", "candidate-pipeline"],
    "Stage 4:": ["cv-submission-checklist"],
    "Stage 5:": ["interview-prep-sheet", "interview-feedback"],
    "Stage 6:": ["offer-tracker", "counter-offer-guide"],
    "Stage 7:": ["pre-placement-compliance", "reference-check"],
  },
  "candidate-sourcing": { "The qualification call": ["candidate-registration"], "Practise it: run a cold candidate call": ["candidate-registration"] },
  "job-specification": { "Ask better questions": ["client-brief"], "Grade every job": ["job-qualification"], "Practise it": ["job-qualification"] },
  "interview-prep": { "Leave nothing to chance": ["interview-prep-sheet"], "Debrief both sides": ["interview-feedback", "candidate-feedback"] },
  "counteroffer-management": { "Raise it twice": ["counter-offer-guide"], "Bring the client in early": ["offer-tracker"], "Practise it": ["counter-offer-guide"] },
  "client-control": { "Agree the timeline in writing": ["client-brief"] },
  "bd-fundamentals": { "Funnelling to a meeting": ["bd-call-prep"], "Cold lead stripping": ["lead-generation"] },
  "reverse-headhunting": { "A five-step structure": ["bd-call-prep"], "The numbers that fill your diary": ["weekly-activity-planner"] },
  "contract-consulting": { "Six questions that find the budget": ["client-brief"], "When they need an outcome": ["sow-scope-checklist"] },
  "customer-candidate-management": { "Practise it": ["candidate-pipeline"] },
  // Core skills
  "client": { "Taking a Quality Brief — Perm": ["client-brief"], "Taking a Quality Brief — Contract": ["client-brief"], "Account Development": ["client-qbr"] },
  "job": { "Qualifying a Job": ["job-qualification"], "Contract and SOW": ["sow-scope-checklist", "pre-placement-compliance"] },
  "candidate": { "Screening and Qualifying": ["candidate-registration"] },
  "interview": { "The Pre-Interview Brief": ["interview-prep-sheet"], "Post-Interview Debrief": ["interview-feedback", "candidate-feedback"] },
  "offer": { "Setting Up the Offer": ["offer-tracker"], "Handling Counter-Offers": ["counter-offer-guide"] },
  "onboarding": { "Pre-Start Aftercare": ["pre-placement-compliance"] },
  "bd": { "Warm BD Tactics": ["lead-generation"], "Winning on a BD Call": ["bd-call-prep"] },
  "time": { "Structuring Your Day": ["weekly-activity-planner"], "Managing Your Pipeline": ["candidate-pipeline"] },
  // Management Programme
  "managing-clients-manager": { "Run a client review": ["client-qbr"] },
  "forecasting-pipeline": { "The pipeline, stage by stage": ["candidate-pipeline"] },
};

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });

// Forms may still be drafts, so link to them the way the Studio does for unpublished documents:
// a weak link that becomes a normal one when the form is published.
const forms = await client.fetch(`*[_type == "formDocument"]{ _id, "slug": slug.current }`);
const formId = new Map(forms.map((f) => [f.slug, f._id.replace("drafts.", "")]));
const link = (slug, i) => {
  const id = formId.get(slug);
  if (!id) { console.error(`No form "${slug}". Run npm run import:forms first.`); process.exit(1); }
  return { _key: `form-${i + 1}`, _type: "reference", _ref: id, _weak: true, _strengthenOnPublish: { type: "formDocument" } };
};

const tx = client.transaction();
let added = 0;
for (const [slug, sections] of Object.entries(PLAN)) {
  const published = await client.fetch(`*[_type == "trainingModule" && slug.current == $slug && !(_id in path("drafts.**"))][0]`, { slug });
  if (!published) { console.error(`No published module "${slug}".`); process.exit(1); }
  // Build on the unpublished draft if there is one, so its changes are kept.
  const base = (await client.fetch(`*[_id == $id][0]`, { id: `drafts.${published._id}` })) ?? published;
  const draft = { ...base, _id: `drafts.${published._id}` };
  delete draft._rev; delete draft._createdAt; delete draft._updatedAt;
  let changed = false;
  for (const [start, slugs] of Object.entries(sections)) {
    const section = draft.sections.find((s) => s.title.startsWith(start));
    if (!section) { console.error(`${published.title}: no section starting "${start}".`); process.exit(1); }
    if (section.forms?.length) continue;
    section.forms = slugs.map(link);
    added += slugs.length;
    changed = true;
    console.log(`${published.title} · ${section.title}: ${slugs.join(", ")}`);
  }
  if (changed) tx.createOrReplace(draft);
}
console.log(`${added} form links.`);
if (dryRun) { console.log("Dry run: nothing sent to Sanity."); process.exit(0); }
await tx.commit({ visibility: "sync" });
console.log("Done. Review and publish the changed modules in the Studio.");
