// The hub's /api routes. Each one reads from Sanity and returns JSON.
import { Router } from "express";
import { sanity, queries } from "./sanity.js";

export const api = Router();

api.get("/home", async (req, res) => {
  res.json((await sanity.fetch(queries.home)) ?? {});
});

api.get("/values", async (req, res) => {
  res.json(await sanity.fetch(queries.values));
});

api.get("/modules", async (req, res) => {
  res.json(await sanity.fetch(queries.modules));
});

api.get("/modules/:slug", async (req, res) => {
  const { quiz = [], ...module } = (await sanity.fetch(queries.module, { slug: req.params.slug })) ?? {};
  if (!module.slug) return res.status(404).json({ error: "Module not found" });

  // A quiz question linked to this module shows as a quick check after the section
  // the editor chose, or after the last section if they didn't choose one.
  const sections = module.sections ?? [];
  for (const q of quiz) {
    const i = Math.min(Math.max((q.afterSection ?? sections.length) - 1, 0), sections.length - 1);
    if (sections[i] && !sections[i].quiz) sections[i].quiz = q;
  }
  res.json({ ...module, sections });
});

api.get("/quiz", async (req, res) => {
  res.json(await sanity.fetch(queries.quiz));
});

// Search across every module's sections. Returns one result per matching section,
// with a short extract of the first place the words appear.
api.get("/search", async (req, res) => {
  const q = String(req.query.q ?? "").trim().toLowerCase();
  if (q.length < 2) return res.json([]);

  const modules = await sanity.fetch(queries.searchable);
  const results = [];
  for (const m of modules) {
    (m.sections ?? []).forEach((s, index) => {
      const places = [
        ["Section", [s.title]],
        ["Explanation", [s.content]],
        ["Tactic", s.tactics],
        ["Phrase", s.phrases],
        ["Mistake", s.mistakes],
        ["Scenario", [s.scenario?.title, s.scenario?.weak, s.scenario?.strong]],
      ];
      for (const [kind, texts] of places) {
        const hit = (texts ?? []).find((t) => t?.toLowerCase().includes(q));
        if (hit) {
          results.push({ module: { slug: m.slug, title: m.title, accent: m.accent }, section: { index, title: s.title }, kind, extract: extract(hit, q) });
          return;
        }
      }
    });
  }
  res.json(results.slice(0, 50));
});

// About 160 characters around the match.
function extract(text, q) {
  const at = text.toLowerCase().indexOf(q);
  const start = Math.max(0, at - 60);
  const end = Math.min(text.length, at + q.length + 100);
  return (start > 0 ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "");
}
