// One-off import of the prototype content (reference/prototype/data.js) into Sanity.
//
// Run from the project root:
//   npm run import:prototype -- --dry-run     check the content and show counts, without touching Sanity
//   npm run import:prototype                  import anything that isn't in Sanity yet
//   npm run import:prototype -- --overwrite   replace everything with the prototype version (loses edits made in the Studio)
//
// Safe to run more than once: every document has a fixed ID (for example "module-candidate"),
// so a second run finds the existing documents instead of creating duplicates.
// Needs SANITY_WRITE_TOKEN in .env (a token with Editor rights from sanity.io/manage → API → Tokens).

import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";
import { VALUES, MODS, QUIZ_QS } from "../../reference/prototype/data.js";

const dryRun = process.argv.includes("--dry-run");
const overwrite = process.argv.includes("--overwrite");

// The prototype used emoji. The hub uses Lucide icon names from studio/schemaTypes/options.js.
const MODULE_ICONS = {
  candidate: "user",
  client: "handshake",
  job: "folder-kanban",
  bd: "trending-up",
  control: "target",
  interview: "mic",
  offer: "badge-check",
  negotiation: "scale",
  sales: "puzzle",
  psychology: "brain",
  time: "timer",
  brand: "lightbulb",
  onboarding: "rocket",
  phrases: "messages",
};
const VALUE_ICONS = {
  "One Stott and May": "users",
  Excellence: "sparkles",
  "Thirst for Knowledge": "brain",
  Accountability: "target",
};

// The prototype stored each module's gradient as CSS. Map it to the Studio's colour choices.
const accentFor = (gradient) => {
  if (gradient.includes("#44B3F4")) return "sky";
  if (gradient.includes("#7EFF2C")) return "lime";
  return "brand";
};

// "PEOPLE" → "People". The hub styles eyebrows in capitals, so editors type normal case.
const titleCase = (s) => s.charAt(0) + s.slice(1).toLowerCase();

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const list = (items) => (items?.length ? items : undefined);

const toSection = (s, i) => ({
  _type: "section",
  _key: `section-${i + 1}`,
  title: s.title,
  content: s.content,
  tactics: list(s.tactics),
  phrases: list(s.phrases),
  mistakes: list(s.mistakes),
  scenario: s.scenario ? { title: s.scenario.title, weak: s.scenario.weak, strong: s.scenario.strong } : undefined,
});

const modules = MODS.map((m, i) => ({
  _id: `module-${m.id}`,
  _type: "trainingModule",
  title: m.title,
  slug: { _type: "slug", current: m.id },
  eyebrow: titleCase(m.eyebrow),
  subtitle: m.subtitle,
  order: (i + 1) * 10,
  icon: MODULE_ICONS[m.id],
  accent: accentFor(m.gradient),
  sections: m.sections.map(toSection),
}));

// The prototype's quiz list repeats its last few questions. Keep the first copy of each.
const seen = new Set();
const quiz = QUIZ_QS.filter((q) => !seen.has(q.q) && seen.add(q.q)).map((q, i) => ({
  _id: `quiz-${String(i + 1).padStart(2, "0")}`,
  _type: "quizQuestion",
  question: q.q,
  options: q.opts,
  correct: q.correct,
  explanation: q.exp,
}));

const values = VALUES.map((v, i) => ({
  _id: `value-${slugify(v.title)}`,
  _type: "value",
  title: v.title,
  description: v.desc,
  icon: VALUE_ICONS[v.title],
  order: (i + 1) * 10,
}));

// Home page wording, from the prototype's app.jsx.
const homePage = {
  _id: "homePage",
  _type: "homePage",
  heroTitle: "Training Hub",
  heroIntro:
    "Your complete guide to recruitment excellence — perm, contract and SOW. Each module includes tactics, phrases, common mistakes and real-world scenarios.",
  philosophyTitle: "The Stott and May Way",
  philosophyText:
    "We exist to make great hires. Not average hires. Not fast hires for the sake of it. Great ones — where the right person lands in the right role, and both sides feel it was worth it. That standard runs through everything we do.",
};

// Check the content against the limits set in the Studio, so nothing arrives already failing validation.
const problems = [];
const check = (ok, msg) => ok || problems.push(msg);
for (const m of modules) {
  check(m.icon, `${m.title}: no icon mapped`);
  check(m.title.length <= 60, `${m.title}: title over 60 characters`);
  check(m.subtitle.length <= 90, `${m.title}: subtitle over 90 characters`);
  check(m.eyebrow.length <= 24, `${m.title}: eyebrow over 24 characters`);
  m.sections.forEach((s) => check(s.title.length <= 80, `${m.title} → "${s.title}": section title over 80 characters`));
}
values.forEach((v) => check(v.icon, `${v.title}: no icon mapped`));
quiz.forEach((q) => check(q.options.length === 4, `Quiz "${q.question}": does not have four options`));

const docs = [...modules, ...quiz, ...values, homePage];
const count = (pick) => modules.reduce((n, m) => n + m.sections.reduce((k, s) => k + pick(s), 0), 0);

console.log("Content found in the prototype:");
console.log(`  Modules:         ${modules.length}`);
console.log(`  Sections:        ${count(() => 1)}`);
console.log(`  Tactics:         ${count((s) => s.tactics?.length ?? 0)}`);
console.log(`  Phrases:         ${count((s) => s.phrases?.length ?? 0)}`);
console.log(`  Mistakes:        ${count((s) => s.mistakes?.length ?? 0)}`);
console.log(`  Scenarios:       ${count((s) => (s.scenario ? 1 : 0))}`);
console.log(`  Quiz questions:  ${quiz.length} (${QUIZ_QS.length - quiz.length} duplicates skipped)`);
console.log(`  Values:          ${values.length}`);
console.log(`  Home page:       1`);

if (problems.length) {
  console.error("\nProblems to fix before importing:\n  " + problems.join("\n  "));
  process.exit(1);
}

if (dryRun) {
  console.log("\nDry run: nothing was sent to Sanity.");
  process.exit(0);
}

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("\nSANITY_WRITE_TOKEN is missing from .env. See .env.example for how to create one.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2025-02-19", useCdn: false });

const existing = new Set(await client.fetch("*[_id in $ids]._id", { ids: docs.map((d) => d._id) }));
const tx = client.transaction();
for (const doc of docs) overwrite ? tx.createOrReplace(doc) : tx.createIfNotExists(doc);
await tx.commit({ visibility: "sync" });

const created = docs.filter((d) => !existing.has(d._id)).length;
const kept = docs.length - created;
console.log(`\nImported into "${dataset}": ${created} new documents.`);
if (kept) console.log(`${kept} were already there and were ${overwrite ? "replaced with the prototype version" : "left as they are"}.`);

const totals = await client.fetch(`{
  "modules": count(*[_type == "trainingModule" && !(_id in path("drafts.**"))]),
  "quiz": count(*[_type == "quizQuestion" && !(_id in path("drafts.**"))]),
  "values": count(*[_type == "value" && !(_id in path("drafts.**"))])
}`);
console.log(`\nNow in Sanity: ${totals.modules} modules, ${totals.quiz} quiz questions, ${totals.values} values.`);
