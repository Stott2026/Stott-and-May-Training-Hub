// One-off import: the 17 fillable forms from the Stott and May Documents Hub (built in an earlier
// chat), converted into Sanity "Form" documents, plus the Documents & Forms page heading.
// The forms are in data/forms.json. Everything arrives as DRAFTS, to review and publish.
//
// Run from the project root:  npm run import:forms -- --dry-run   (check only)
//                             npm run import:forms                (import)
// Safe to re-run: forms already in Sanity (draft or published) are left alone. Add --replace to
// overwrite the drafts instead (only before anyone has edited them in the Studio).
import fs from "node:fs";
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");
const replace = process.argv.includes("--replace");
const forms = JSON.parse(fs.readFileSync(new URL("./data/forms.json", import.meta.url), "utf8"));
const page = {
  _id: "drafts.formsPage",
  _type: "formsPage",
  title: "Documents & Forms",
  intro: "Fill these in on screen as you work, then print or save them as a PDF. What you type stays on your own computer: nothing is sent to or saved by the hub.",
};

for (const f of forms) console.log(`${f.group} · ${f.title}: ${f.blocks.length} blocks`);
if (dryRun) { console.log("Dry run: nothing sent to Sanity."); process.exit(0); }

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });
const ids = forms.flatMap((f) => [f._id, f._id.replace("drafts.", "")]);
const there = new Set((await client.fetch(`*[_id in $ids]._id`, { ids })).map((id) => id.replace("drafts.", "")));
const tx = client.transaction().createIfNotExists(page);
for (const f of forms) {
  if (replace) tx.createOrReplace(f);
  else if (!there.has(f._id.replace("drafts.", ""))) tx.create(f);
}
await tx.commit({ visibility: "sync" });
console.log("Imported as drafts. Review and publish the forms and the Documents & Forms page in the Studio.");
