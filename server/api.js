// The hub's /api routes. Each one reads from Sanity and returns JSON.
import { Readable } from "node:stream";
import { Router } from "express";
import { sanity, queries } from "./sanity.js";
import { searchModules, withQuickChecks } from "./content.js";

export const api = Router();

api.get("/site", async (req, res) => {
  res.json((await sanity.fetch(queries.site)) ?? {});
});

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

api.get("/managers", async (req, res) => {
  res.json(await sanity.fetch(queries.managers));
});

api.get("/library", async (req, res) => {
  res.json(await sanity.fetch(queries.library));
});

// Streams a Library file from Sanity to the signed-in person, so the file's own address
// never reaches the browser and every download needs a Stott and May sign-in.
api.get("/library/:id/download", async (req, res) => {
  const file = await sanity.fetch(queries.libraryFile, { id: req.params.id });
  if (!file?.url) return res.status(404).json({ error: "File not found" });
  const upstream = await fetch(file.url);
  if (!upstream.ok) return res.status(502).json({ error: "The file couldn't be fetched. Please try again." });
  const name = file.originalFilename || "download";
  res.set({
    "Content-Type": file.mimeType || "application/octet-stream",
    "Content-Length": upstream.headers.get("content-length") ?? file.size,
    "Content-Disposition": `attachment; filename="${name.replace(/[^\w .&()-]/g, "_")}"; filename*=UTF-8''${encodeURIComponent(name)}`,
    "Cache-Control": "private, no-store",
  });
  Readable.fromWeb(upstream.body).pipe(res);
});
