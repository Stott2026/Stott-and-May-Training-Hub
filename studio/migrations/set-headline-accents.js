// One-off: suggested second heading lines (the brand's two-tone headline) for the Library,
// Managers and Documents & Forms pages and the Training home page, as DRAFTS to review and publish in the Studio.
//
// Run from the project root:  npm run import:headline-accents -- --dry-run   (check only)
//                             npm run import:headline-accents                (make the drafts)
// Safe to re-run: a page that already has a second line (draft or published) is left alone.
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");
const ACCENTS = {
  homePage: "Be better, every day.",
  libraryPage: "Every deck, ready to run.",
  managersPage: "Lead the desk, grow the team.",
  formsPage: "Fill it in, use it today.",
};

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });

for (const [id, titleAccent] of Object.entries(ACCENTS)) {
  const [published, draft] = await Promise.all([client.getDocument(id), client.getDocument(`drafts.${id}`)]);
  const current = draft ?? published;
  if (!current) { console.log(`${id}: not found, skipped (create the page in the Studio first)`); continue; }
  // The home page calls its heading "heroTitle", so its second line is "heroTitleAccent".
  const field = id === "homePage" ? "heroTitleAccent" : "titleAccent";
  if (current[field]) { console.log(`${id}: already has "${current[field]}", left alone`); continue; }
  console.log(`${id}: ${dryRun ? "would add" : "adding"} "${titleAccent}" as a draft`);
  if (!dryRun) {
    const { _rev, _updatedAt, _createdAt, ...rest } = current;
    await client.createOrReplace({ ...rest, _id: `drafts.${id}`, [field]: titleAccent });
  }
}
console.log(dryRun ? "Dry run: nothing changed." : "Done. Publish the pages in the Studio to see the new headings.");
