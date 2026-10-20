// Uploads the rebuilt Recruitment Playbook decks to the Library, as DRAFTS to review and publish
// in the Studio. Also creates the Library page's heading and introduction.
//
// Build the decks first (npm run decks -- all), then from the project root:
//   npm run import:library -- --dry-run   (check only)
//   npm run import:library                (upload)
// Without --replace it's safe to re-run: Library items that already exist are left alone.
// With --replace, the drafts are overwritten with freshly uploaded files (only before anyone has
// edited them in the Studio).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");
const replace = process.argv.includes("--replace");
const DECKS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../scripts/decks");

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN, apiVersion: "2025-02-19", useCdn: false });
const drafts = client.withConfig({ perspective: "drafts" });

const libraryPage = {
  _id: "drafts.libraryPage",
  _type: "libraryPage",
  title: "Library",
  intro: "The classroom decks from the Recruitment Playbook, in the hub's style. Download one to run a session, or to revisit it at your desk. The trainer notes are in each slide's speaker notes.",
};

const items = [];
for (const f of fs.readdirSync(path.join(DECKS, "extras")).sort()) {
  const deck = (await import(path.join(DECKS, "extras", f))).default;
  const file = path.join(DECKS, "out", deck.file);
  if (!fs.existsSync(file)) { console.error(`Missing ${deck.file}. Run npm run decks -- all first.`); process.exit(1); }
  const module = await drafts.fetch(`*[_type == "trainingModule" && slug.current == $slug][0]{ "id": string::split(_id, "drafts.")[-1], title }`, { slug: deck.slug });
  if (!module) { console.error(`No module ${deck.slug} in Sanity.`); process.exit(1); }
  const [duration, audience] = deck.pills ?? [];
  items.push({
    file,
    doc: {
      _id: `drafts.library-playbook-${deck.number}`,
      _type: "libraryItem",
      title: module.title,
      label: `Playbook ${deck.number}`,
      kind: "deck",
      summary: deck.lead,
      duration,
      audience,
      order: Number(deck.number) * 10,
      // The modules may still be drafts: link the way the Studio does for unpublished documents.
      module: { _type: "reference", _ref: module.id, _weak: true, _strengthenOnPublish: { type: "trainingModule" } },
    },
  });
}

const problems = items.flatMap(({ doc }) => [
  doc.title.length > 80 && `${doc.title}: title too long`,
  doc.summary.length > 200 && `${doc.title}: summary is ${doc.summary.length} characters (200 maximum)`,
].filter(Boolean));
if (problems.length) { console.error("Problems:\n  " + problems.join("\n  ")); process.exit(1); }
for (const { doc, file } of items) console.log(`${doc.label} ${doc.title} · ${doc.duration} · ${(fs.statSync(file).size / 1e6).toFixed(1)} MB`);
if (dryRun) { console.log("Dry run: nothing sent to Sanity."); process.exit(0); }

const existing = new Set(await client.fetch(`*[_id in $ids]._id`, { ids: items.map((i) => i.doc._id) }));
const tx = client.transaction().createIfNotExists(libraryPage);
for (const { doc, file } of items) {
  if (existing.has(doc._id) && !replace) { console.log(`Skipped ${doc.label}: already in Sanity.`); continue; }
  const asset = await client.assets.upload("file", fs.createReadStream(file), { filename: path.basename(file) });
  tx.createOrReplace({ ...doc, file: { _type: "file", asset: { _type: "reference", _ref: asset._id } } });
  console.log(`Uploaded ${doc.label}.`);
}
await tx.commit({ visibility: "sync" });
console.log("Done. Review and publish the Library items in the Studio.");
