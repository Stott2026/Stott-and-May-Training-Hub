// Builds a single-file preview of the hub with a snapshot of the current Sanity content,
// for sharing as a private preview link before the hub is live on Railway.
// Run from the project root: npm run preview:build
// Output: web/dist-preview/hub-preview.html (not committed: it contains the training content).
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import { sanity, queries } from "../server/sanity.js";
import { withQuickChecks } from "../server/content.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const web = path.join(root, "web");
const snapshotFile = path.join(web, "src/preview/snapshot.json");
const outDir = path.join(web, "dist-preview");

// 1. Take a snapshot of the content, in the same shape the /api routes return.
const [home, values, modules, quiz, searchable] = await Promise.all(
  [queries.home, queries.values, queries.modules, queries.quiz, queries.searchable].map((q) => sanity.fetch(q))
);
const routes = { "/home": home ?? {}, "/values": values, "/modules": modules, "/quiz": quiz };
for (const m of modules) {
  routes[`/modules/${m.slug}`] = withQuickChecks(await sanity.fetch(queries.module, { slug: m.slug }));
}
await fs.mkdir(path.dirname(snapshotFile), { recursive: true });
await fs.writeFile(snapshotFile, JSON.stringify({ takenAt: new Date().toISOString(), routes, searchable }));

try {
  // 2. Build the front end in preview mode (content from the snapshot, relative addresses).
  await build({
    root: web,
    mode: "preview",
    base: "./",
    logLevel: "warn",
    build: { outDir, emptyOutDir: true, cssCodeSplit: false, rollupOptions: { output: { inlineDynamicImports: true } } },
  });

  // 3. Put the script, styles and pictures inside the page, so it is one self-contained file.
  let html = await fs.readFile(path.join(outDir, "index.html"), "utf8");
  const read = (ref) => fs.readFile(path.join(outDir, ref), "utf8");
  for (const [tag, ref] of [...html.matchAll(/<script[^>]*src="\.\/([^"]+)"[^>]*><\/script>/g)]) {
    const code = (await read(ref)).replaceAll("</script", "<\\/script");
    html = html.replace(tag, () => `<script type="module">${code}</script>`);
  }
  for (const [tag, ref] of [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="\.\/([^"]+)"[^>]*>/g)]) {
    const css = await read(ref);
    html = html.replace(tag, () => `<style>${css}</style>`);
  }
  const types = { webp: "image/webp", png: "image/png", jpg: "image/jpeg", svg: "image/svg+xml" };
  const refs = new Set(html.match(/\.\/(placeholders|brand)\/[\w.-]+\.(webp|png|jpg|svg)/g));
  for (const ref of refs) {
    const data = await fs.readFile(path.join(web, "public", ref));
    html = html.replaceAll(ref, `data:${types[ref.split(".").pop()]};base64,${data.toString("base64")}`);
  }
  // The preview host adds its own page wrapper, so keep only what goes inside it.
  html = html
    .replace(/<!doctype html>|<\/?html[^>]*>|<\/?head>|<\/?body>|<meta [^>]*>/gi, "")
    .replace(/<title>[^<]*<\/title>/, "<title>Training Hub Preview</title>");
  const file = path.join(outDir, "hub-preview.html");
  await fs.writeFile(file, html);
  console.log(`Preview built: ${path.relative(root, file)} (${Math.round(html.length / 1024)} KB, ${modules.length} modules)`);
} finally {
  // The snapshot must never end up in a normal build or in Git.
  await fs.rm(snapshotFile, { force: true });
}
