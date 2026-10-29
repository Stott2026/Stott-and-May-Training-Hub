// One-off import: the Marketing Hub quick link (Site settings) and "Look here" cards that point
// training sections to useful material in the Marketing Hub. Everything arrives as DRAFTS:
// each module gets a draft copy with its Look here cards added, to review and publish in the Studio.
//
// Run from the project root:  npm run import:marketing-hub -- --dry-run   (check only)
//                             npm run import:marketing-hub                (import)
// Safe to re-run: sections that already have Look here cards, or modules with unpublished
// changes, are left alone.
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");
const MARKETING_HUB = "https://sandm1.sharepoint.com/sites/StottandMayMarketingHub/SitePages/Stott-and-May-Marketing-Hub.aspx";

const siteSettings = {
  _id: "drafts.siteSettings",
  _type: "siteSettings",
  quickLinks: [{ _key: "marketing-hub", _type: "quickLink", label: "Marketing Hub", url: MARKETING_HUB }],
};

// Cards have no address of their own, so they all follow the Marketing Hub link in Site settings.
const card = (title, note, where) => ({ title, note, where });
const CASE_STUDIES = card("Client case studies", "Real placements by market and hiring model. Learn two from your market by heart.", "Case studies");
const OVERVIEWS = card("Capability overviews", "One-page summaries of what we do, by market and service.", "Capability overviews");
const REPORTS = card("Research papers and reports", "Talent trends and guides to share with clients. Share the landing page link where there is one.", "Research papers and reports");
const SALARY = card("Salary guides", "Market pay data for the UK, US and Germany, to benchmark any package.", "Salary guides");
const CVS = card("CV templates", "The approved ways to present a candidate's CV.", "CV templates");
const BIO = card("Custom staff bio", "Your experience, clients and feedback on one page. Ask Marketing for yours.", "Custom staff bio");
const MEETING = card("Book a meeting page", "Your own page where prospects can book 30 minutes in your diary.", "Book a meeting page");
const CONSULTING = card("Stott and May Consulting overview", "What we deliver as projects and teams under a statement of work.", "Capability overviews");
const TALENT = card("Talent Solutions overview", "Talent Finder+ and Team Builder Project, our retained services.", "Capability overviews");
const PROPOSALS = card("Proposal templates", "Talent Finder+ and Team Builder Project proposals for retained work.", "Proposal templates");
const STORYTELLING = card("Social storytelling", "Share a team member's standout placement or feedback on LinkedIn, with the marketing team.", "Social storytelling");

// Module (by web address) → section (by the start of its title) → cards.
const PLAN = {
  "standards-expectations": { "Excellence": [REPORTS] },
  "recruitment-lifecycle": { "Stage 1:": [REPORTS, CASE_STUDIES], "Stage 4:": [CVS] },
  "candidate-sourcing": { "The client pitch pack": [CASE_STUDIES, OVERVIEWS], "SourceWhale": [REPORTS] },
  "job-specification": { "Ask better questions": [SALARY] },
  "bd-fundamentals": {
    "Know the business you're selling": [CASE_STUDIES, OVERVIEWS],
    "Your USP keeps the door open": [BIO],
    "Funnelling to a meeting": [MEETING],
    "Chasing leads": [REPORTS, SALARY],
  },
  "reverse-headhunting": { "A message you can send today": [CASE_STUDIES], "Question bank 2": [CONSULTING, TALENT] },
  "client-control": { "The four-part sell-in": [CVS], "Building conviction on the call": [SALARY, REPORTS] },
  "contract-consulting": { "When they need an outcome": [CONSULTING, TALENT] },
  "customer-candidate-management": { "Two customer updates": [REPORTS] },
  "motivation-retention": { "Recognise it, out loud": [STORYTELLING] },
  "managing-clients-manager": { "Run a client review": [REPORTS, CASE_STUDIES], "Protect your terms": [PROPOSALS] },
};

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });
const tx = client.transaction().createIfNotExists(siteSettings);
let added = 0;
for (const [slug, sections] of Object.entries(PLAN)) {
  const published = await client.fetch(`*[_type == "trainingModule" && slug.current == $slug && !(_id in path("drafts.**"))][0]`, { slug });
  if (!published) { console.error(`No published module "${slug}".`); process.exit(1); }
  if (await client.fetch(`count(*[_id == $id])`, { id: `drafts.${published._id}` })) {
    console.log(`Skipped ${published.title}: it already has unpublished changes. Publish or discard them, then run this again.`);
    continue;
  }
  const draft = { ...published, _id: `drafts.${published._id}` };
  delete draft._rev; delete draft._createdAt; delete draft._updatedAt;
  for (const [start, cards] of Object.entries(sections)) {
    const section = draft.sections.find((s) => s.title.startsWith(start));
    if (!section) { console.error(`${published.title}: no section starting "${start}".`); process.exit(1); }
    if (section.lookHere?.length) continue;
    section.lookHere = cards.map((c, i) => ({ _key: `look-${i + 1}`, _type: "resourceLink", ...c }));
    added += cards.length;
    console.log(`${published.title} · ${section.title}: ${cards.map((c) => c.title).join(", ")}`);
  }
  tx.createOrReplace(draft);
}
console.log(`${added} Look here cards.`);
if (dryRun) { console.log("Dry run: nothing sent to Sanity."); process.exit(0); }
await tx.commit({ visibility: "sync" });
console.log("Done. Review and publish Site settings and the changed modules in the Studio.");
