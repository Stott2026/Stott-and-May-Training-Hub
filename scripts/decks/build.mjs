// Builds Recruitment Playbook decks in the Training Hub style, from the module content in Sanity.
// From the project root:  npm run decks -- 05 06      (or "all"; needs SANITY_READ_TOKEN in .env)
// The decks land in scripts/decks/out/ (not committed). Drafts are included, so decks can be
// rebuilt before the content is published.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildDeck } from "./kit.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
fs.mkdirSync(OUT, { recursive: true });
const all = fs.readdirSync(path.join(HERE, "extras")).map((f) => f.replace(".mjs", "")).sort();
const wanted = process.argv.slice(2).includes("all") || process.argv.length <= 2 ? all : process.argv.slice(2);
for (const n of wanted) {
  const extras = (await import(`./extras/${n}.mjs`)).default;
  const r = await buildDeck({ slug: extras.slug, number: extras.number, extras, outFile: path.join(OUT, extras.file) });
  console.log(`Wrote ${extras.file} (${r.slides} slides)`);
}
