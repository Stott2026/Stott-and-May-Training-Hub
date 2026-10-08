import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { api } from "./api.js";
import { auth, requireSignIn, session } from "./auth.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(here, "../web");
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT) || 3000;

const app = express();

// Railway sits in front of the app, so trust it to say whether the visitor used HTTPS.
app.set("trust proxy", 1);
app.use(session);

// Used by Railway to check the app is up. Returns no data, so it is the one route open to all.
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// ── Sign-in ─────────────────────────────────────────────
// Microsoft sign-in pages. Everything below requireSignIn needs a signed-in Stott and May account.
app.use("/auth", auth);
app.use(requireSignIn);

// ── API routes ──────────────────────────────────────────
// Everything the browser needs from Sanity (and later the database) goes through /api.

// Who is signed in, for the name in the top bar.
app.get("/api/me", (req, res) => {
  res.json({ name: req.user.name, email: req.user.email });
});

// Training content from Sanity: home page, values, modules, quiz and search.
app.use("/api", api);

// Any other /api address that doesn't exist gets a clear 404 rather than the web page.
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

// If Sanity can't be reached or a query fails, log the details and send a plain message.
app.use("/api", (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong loading the content. Please try again." });
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
