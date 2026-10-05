import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(here, "../web");
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT) || 3000;

const app = express();

// ── API routes ──────────────────────────────────────────
// Everything the browser needs from Sanity (and later the database) goes through /api.

// Used by Railway to check the app is up. Returns no data.
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// Any other /api address that doesn't exist gets a clear 404 rather than the web page.
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

// ── Front end ───────────────────────────────────────────
if (isProduction) {
  // Production: serve the built files from web/dist (created by `npm run build`).
  const dist = path.join(webRoot, "dist");
  app.use(express.static(dist, { index: false }));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(dist, "index.html"));
  });
} else {
  // Development: run Vite inside Express, so the page reloads as you edit
  // and everything is still on one address (http://localhost:3000).
  const { createServer } = await import("vite");
  const vite = await createServer({
    root: webRoot,
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
}

app.listen(port, () => {
  console.log(`Training Hub running at http://localhost:${port} (${isProduction ? "production" : "development"})`);
});
