// The hub's /api routes. Each one reads from Sanity and returns JSON.
import { Router } from "express";
import { sanity, queries } from "./sanity.js";
import { searchModules, withQuickChecks } from "./content.js";

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
  const module = await sanity.fetch(queries.module, { slug: req.params.slug });
  if (!module?.slug) return res.status(404).json({ error: "Module not found" });
  res.json(withQuickChecks(module));
});

api.get("/quiz", async (req, res) => {
  res.json(await sanity.fetch(queries.quiz));
});

api.get("/search", async (req, res) => {
  const q = String(req.query.q ?? "").trim();
  if (q.length < 2) return res.json([]);
  res.json(searchModules(await sanity.fetch(queries.searchable), q));
});
