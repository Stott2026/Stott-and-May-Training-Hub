// Shared helpers for the Recruitment Playbook imports (one script per pair of classroom decks).
// Each import passes its modules and quiz questions to importPlaybook(), which checks them against
// the Studio's limits and sends them to Sanity as DRAFTS, to review and publish in the Studio.
//
// Options on the command line:
//   --dry-run   check only, nothing is sent
//   --replace   overwrite these module and quiz drafts (only before anyone has edited them)
// Without --replace it's safe to re-run: existing documents are left alone.
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

export const key = (prefix, i) => `${prefix}-${i + 1}`;

// Framework steps from [label, title, text] lists. The label is optional: pass null to leave it out.
export const steps = (list) =>
  list.map(([label, title, text], i) => ({ _type: "step", _key: key("step", i), ...(label && { label }), title, text }));

export const table = (title, columns, rows, i = 0) => ({
  _type: "dataTable",
  _key: key("table", i),
  title,
  columns,
  rows: rows.map((cells, j) => ({ _type: "row", _key: key("row", j), cells })),
});

// The modules are drafts too, so quiz questions link to them the way the Studio does for
// unpublished documents: a weak link that becomes a normal one when the module is published.
export const quizDrafts = (list) =>
  list.map(({ module, ...q }) => ({
    ...q,
    _type: "quizQuestion",
    module: { _type: "reference", _ref: module, _weak: true, _strengthenOnPublish: { type: "trainingModule" } },
  }));

export async function importPlaybook(modules, quiz) {
  const dryRun = process.argv.includes("--dry-run");
  const replace = process.argv.includes("--replace");

  // Check against the Studio's limits.
  const problems = [];
  for (const m of modules) {
    if (m.title.length > 60) problems.push(`${m.title}: title`);
    if (m.subtitle.length > 90) problems.push(`${m.title}: subtitle (${m.subtitle.length})`);
    if (m.eyebrow.length > 24) problems.push(`${m.title}: eyebrow`);
    m.sections = m.sections.map((s, i) => ({ _type: "section", _key: key("section", i), ...s }));
    for (const s of m.sections) {
      if (s.title.length > 80) problems.push(`${s.title}: section title (${s.title.length})`);
      if (s.takeaway?.length > 160) problems.push(`${s.title}: takeaway (${s.takeaway.length})`);
      for (const t of s.tables ?? []) for (const r of t.rows) if (r.cells.length !== t.columns.length) problems.push(`${s.title}: table row has wrong number of cells`);
    }
  }
  for (const q of quiz) {
    const m = modules.find((m) => m._id === `drafts.${q.module._ref}`);
    if (!m) problems.push(`${q._id}: no module ${q.module._ref} in this import`);
    else if (q.afterSection > m.sections.length) problems.push(`${q._id}: afterSection is past the last section`);
  }
  if (problems.length) { console.error("Problems:\n  " + problems.join("\n  ")); process.exit(1); }

  for (const m of modules) {
    const count = (f) => m.sections.reduce((n, s) => n + (s[f]?.length ?? 0), 0);
    console.log(`${m.title}: ${m.sections.length} sections, ${m.sections.filter((s) => s.framework).length} frameworks, ${count("tables")} tables, ${m.sections.filter((s) => s.tip).length} tips, ${count("tactics")} tactics, ${count("phrases")} phrases, ${count("mistakes")} mistakes, ${m.sections.filter((s) => s.scenario).length} scenarios`);
  }
  console.log(`Quiz questions: ${quiz.length}`);
  if (dryRun) { console.log("Dry run: nothing sent to Sanity."); return; }

  const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN, apiVersion: "2025-02-19", useCdn: false });
  if (!(await client.fetch(`count(*[_id == "category-playbook"])`))) {
    console.error("The Recruitment Playbook group is missing. Run npm run import:playbook first.");
    process.exit(1);
  }
  const tx = client.transaction();
  for (const doc of [...modules, ...quiz]) (replace ? tx.createOrReplace(doc) : tx.createIfNotExists(doc));
  await tx.commit({ visibility: "sync" });
  console.log("Imported as drafts. Review and publish them in the Studio.");
}
