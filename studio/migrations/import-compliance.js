// Imports the compliance courses (and the Compliance page) as DRAFTS, to review and sign off in
// the Studio. Course content is in migrations/data/compliance/.
//
// Run from the project root:  npm run import:compliance -- --dry-run   (check only)
//                             npm run import:compliance                (import)
//                             npm run import:compliance -- --replace   (overwrite the drafts)
// Without --replace, a course that already exists (draft or published) is left alone.
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";
import { COURSES, PAGE } from "./data/compliance/index.js";

const dryRun = process.argv.includes("--dry-run");
const replace = process.argv.includes("--replace");
const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });

// Every object in an array needs a _key in Sanity.
const withKeys = (value) => {
  if (Array.isArray(value)) return value.map((v) => (v && typeof v === "object" ? { _key: randomUUID().slice(0, 12), ...withKeys(v) } : v));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withKeys(v)]));
  return value;
};

const exists = async (id) => (await client.fetch(`count(*[_id in [$id, "drafts." + $id]])`, { id })) > 0;

if (!(await exists("compliancePage"))) {
  console.log(`Compliance page: ${dryRun ? "would add" : "adding"} as a draft`);
  if (!dryRun) await client.createOrReplace({ _id: "drafts.compliancePage", _type: "compliancePage", ...PAGE });
} else console.log("Compliance page: already there, left alone");

for (const course of COURSES) {
  const id = `course-${course.slug}`;
  if ((await exists(id)) && !replace) { console.log(`${course.title}: already there, left alone (add -- --replace to overwrite the draft)`); continue; }
  const { slug, sources = [], ...rest } = course;
  const doc = withKeys({
    _id: `drafts.${id}`,
    _type: "complianceCourse",
    ...rest,
    slug: { _type: "slug", current: slug },
    approved: false,
    sources: sources.map(([title, url]) => ({ _type: "source", title, url })),
  });
  const parts = course.lessons.reduce((n, l) => n + l.blocks.length, 0);
  console.log(`${course.title}: ${dryRun ? "would add" : "adding"} as a draft (${course.lessons.length} lessons, ${parts} parts, ${course.questions.length} questions)`);
  if (!dryRun) await client.createOrReplace(doc);
}
console.log(dryRun ? "Dry run: nothing changed." : "Done. Review the courses in the Studio under Compliance courses, then publish.");
