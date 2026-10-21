// Deck kit: builds a Recruitment Playbook deck in the Training Hub style from the module's content
// in Sanity (drafts included), plus the deck extras in extras/ (session facts, outcomes, which
// trainer notes go where) and the trainer notes in notes/. Each kind of content gets its own
// layout, as on the hub's module pages.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const lu = require("react-icons/lu");
const { applyTheme } = require("./apply_theme.cjs");

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const REPO = path.resolve(HERE, "../..");
const PUBLIC = path.join(REPO, "web/public");

// ── Brand (from web/src/styles/tokens.css) ──
const HEX = {
  teal: "00C8C8", aqua: "73F7BB", sky: "44B3F4", lime: "7EFF2C", ink: "111314", cloud: "ECEEF3", white: "FFFFFF",
  tealInk: "007A7A", slateInk: "5B6675", danger: "C93838", danger50: "FDEEEE", teal50: "E6FAFA", sunken: "F5F7FA", border: "DFE3E9",
};
const THEME = {
  name: "Stott and May Training Hub",
  headFontFace: "Manrope",
  bodyFontFace: "Inter",
  colors: {
    dk1: HEX.ink, lt1: HEX.white, dk2: HEX.tealInk, lt2: HEX.cloud,
    accent1: HEX.teal, accent2: HEX.aqua, accent3: HEX.sky, accent4: HEX.lime, accent5: HEX.slateInk, accent6: HEX.danger,
    hlink: HEX.tealInk, folHlink: HEX.slateInk,
  },
};
const ACCENT = { brand: [HEX.teal, HEX.aqua], sky: [HEX.teal, HEX.sky], lime: [HEX.teal, HEX.lime] };

// ── Content from Sanity ──
export async function loadModule(slug) {
  const { createClient } = await import("@sanity/client");
  const client = createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID, dataset: process.env.SANITY_STUDIO_DATASET || "production",
    token: process.env.SANITY_READ_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "drafts",
  });
  const m = await client.fetch(`*[_type == "trainingModule" && slug.current == $slug][0]{ title, eyebrow, subtitle, accent, sections[]{ title, takeaway, content, framework, tables, tip, tactics, phrases, mistakes, scenario } }`, { slug });
  if (!m) throw new Error(`No module with slug ${slug}`);
  return m;
}

// Trainer notes from an original classroom deck (as Markdown from markitdown), by slide number,
// with the old values taken out. Used once to make notes/NN.json, which the builder reads.
const OLD_VALUES = ["Fresh Thinking", "Ownership", "Client Obsession", "Customer Obsession", "One Team", "Say It Straight", "Relentless Drive"];
const SPELLING = [
  [/\bauthoriz/g, "authoris"], [/\bAuthoriz/g, "Authoris"], [/\bemphasiz/g, "emphasis"], [/\bEmphasiz/g, "Emphasis"],
  [/\bprioritiz/g, "prioritis"], [/\bdeprioritiz/g, "deprioritis"], [/\brecogniz/g, "recognis"], [/\bnormaliz/g, "normalis"], [/\bNormaliz/g, "Normalis"],
  [/\borganiz/g, "organis"], [/\bpersonaliz/g, "personalis"], [/\bPersonaliz/g, "Personalis"], [/\bcapitaliz/g, "capitalis"], [/\bspecializ/g, "specialis"],
  [/\bbehavior/g, "behaviour"], [/\bBehavior/g, "Behaviour"], [/\bcenter\b/g, "centre"], [/\blabor\b/g, "labour"], [/\bfavorite/g, "favourite"],
  [/\banonymized/g, "anonymised"], [/\bminimiz/g, "minimis"], [/\banalyz/g, "analys"], [/\brésumé/g, "CV"], [/\bvacation\b/g, "holiday"],
  [/\bprograms\b/g, "programmes"], [/\bprogram\b/g, "programme"], [/\bProgram\b/g, "Programme"], [/\bcriticiz/g, "criticis"], [/\bcatalog\b/g, "catalogue"],
];
export function originalNotes(mdFile) {
  const md = fs.readFileSync(mdFile, "utf8");
  const notes = {};
  for (const part of md.split(/<!-- Slide number: (\d+) -->/).slice(1).reduce((a, x, i, arr) => (i % 2 ? a : [...a, [arr[i], arr[i + 1]]]), [])) {
    const [n, body] = part;
    const m = body.match(/### Notes:\s*([\s\S]*?)(?=\n<!--|$)/);
    if (m) notes[Number(n)] = cleanNote(m[1].trim());
  }
  return notes;
}
export function cleanNote(t) {
  t = t.replace(/^Trainer notes:\s*/i, "");
  // Drop sentences that name the old values, and parentheses that mention them.
  t = t.replace(/\s*\(([^()]*)\)/g, (all, inner) => (OLD_VALUES.some((v) => inner.includes(v)) ? "" : all));
  t = t.split(/(?<=[.!?])\s+(?=[A-Z“"])/).filter((s) => !OLD_VALUES.some((v) => s.includes(v)) && !/\bvalues?\b/i.test(s)).join(" ");
  for (const [re, to] of SPELLING) t = t.replace(re, to);
  return t.replace(/—/g, ",").replace(/ ,/g, ",").replace(/\s{2,}/g, " ").trim();
}

// ── Text measurement (for layout) ──
const LINE = 1.22; // line height as a multiple of the font size
// Average character width as a share of the font size: Manrope bold runs wider than Inter.
function lines(t, widthIn, pt, bold = false, factor) {
  const perLine = Math.max(8, Math.floor((widthIn * 72) / (pt * (factor ?? (bold ? 0.57 : pt >= 15 ? 0.53 : 0.47)))));
  return String(t).split("\n").reduce((n, para) => {
    const words = para.split(/\s+/);
    let count = 1, len = 0;
    for (const w of words) {
      if (len && len + 1 + w.length > perLine) { count++; len = w.length; } else len += (len ? 1 : 0) + w.length;
    }
    return n + count;
  }, 0);
}
const textH = (t, widthIn, pt, bold, factor) => (lines(t, widthIn, pt, bold, factor) * pt * LINE) / 72;

// ── Artwork ──
const png = (buf) => "image/png;base64," + buf.toString("base64");
const svgPng = async (svg, w, h) => png(await sharp(Buffer.from(svg)).resize(w, h).png().toBuffer());

async function heroBackground([a, b]) {
  return svgPng(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="0.6"><stop offset="0" stop-color="#${b === HEX.aqua ? HEX.aqua : b}"/><stop offset="0.7" stop-color="#${a}"/></linearGradient>
      <radialGradient id="glow" cx="0.3" cy="0.2" r="0.6"><stop offset="0" stop-color="#fff" stop-opacity="0.55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <filter id="blur"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>
    <rect width="1920" height="1080" fill="url(#g)"/><rect width="1920" height="1080" fill="url(#glow)"/>
    <path d="M0 930 C 380 860, 700 900, 980 880 S 1600 840, 1920 760" stroke="#fff" stroke-width="10" fill="none" opacity="0.6" filter="url(#blur)"/>
    <path d="M0 930 C 380 860, 700 900, 980 880 S 1600 840, 1920 760" stroke="#fff" stroke-width="3.5" fill="none"/>
    <path d="M0 930 C 380 860, 700 900, 980 880 S 1600 840, 1920 760 L 1920 1080 L 0 1080 Z" fill="#fff" opacity="0.18"/>
  </svg>`, 1920, 1080);
}
const softBackground = () => svgPng(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#${HEX.teal50}"/><stop offset="1" stop-color="#EBFDF5"/></linearGradient></defs>
    <rect width="1920" height="1080" fill="url(#g)"/>
    <path d="M0 980 C 420 920, 760 960, 1040 940 S 1620 900, 1920 830" stroke="#${HEX.teal}" stroke-width="3" fill="none" opacity="0.5"/></svg>`, 1920, 1080);

async function personInShape(file, [a, b]) {
  const person = await sharp(path.join(PUBLIC, "placeholders", file)).resize({ width: 820, height: 1060, fit: "inside" }).png().toBuffer();
  const meta = await sharp(person).metadata();
  const Wc = 1000, Hc = 1100;
  const shape = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${Wc}" height="${Hc}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#${a}"/><stop offset="1" stop-color="#${b}"/></linearGradient></defs>
    <rect x="90" y="300" width="820" height="760" rx="240" fill="url(#g)" transform="rotate(-6 500 680)"/></svg>`);
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="${meta.height}">
    <rect width="${meta.width}" height="${meta.height}" fill="#fff"/>
    <rect y="${meta.height - 260}" width="${meta.width}" height="260" fill="#000"/>
    <rect y="${meta.height - 520}" width="${meta.width}" height="520" rx="260" fill="#fff"/></svg>`);
  const clipped = await sharp(person).composite([{ input: await sharp(mask).png().toBuffer(), blend: "dest-in" }]).png().toBuffer();
  const top = Math.max(0, Hc - meta.height - 40);
  return png(await sharp({ create: { width: Wc, height: Hc, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: shape }, { input: clipped, left: Math.round((Wc - meta.width) / 2), top }]).png().toBuffer());
}

const iconCache = {};
async function icon(name, color) {
  const k = name + color;
  if (!lu[name]) throw new Error(`No Lucide icon ${name}`);
  if (!iconCache[k]) {
    const svg = renderToStaticMarkup(React.createElement(lu[name], { size: 256, color: "#" + color, strokeWidth: 1.75 }));
    iconCache[k] = png(await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer());
  }
  return iconCache[k];
}
const tileCache = {};
async function tileImage(kind = "brand", circle = false) {
  const k = kind + circle;
  if (!tileCache[k]) {
    const [a, b] = kind === "soft" ? [HEX.teal50, "EBFDF5"] : kind === "danger" ? [HEX.danger50, HEX.danger50] : ACCENT[kind] ?? ACCENT.brand;
    const shape = circle ? `<circle cx="128" cy="128" r="128" fill="url(#g)"/>` : `<rect width="256" height="256" rx="76" fill="url(#g)"/>`;
    tileCache[k] = await svgPng(`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#${a}"/><stop offset="1" stop-color="#${b}"/></linearGradient></defs>${shape}</svg>`, 256, 256);
  }
  return tileCache[k];
}

// ── The deck ──
const X0 = 0.6, CW = 12.13, BOTTOM = 6.72, GAP = 0.25;

export async function buildDeck({ slug, number, extras, outFile }) {
  const m = await loadModule(slug);
  const notesFile = path.join(HERE, "notes", `${number}.json`);
  const notes = fs.existsSync(notesFile) ? JSON.parse(fs.readFileSync(notesFile, "utf8")) : {};
  const accent = ACCENT[m.accent] ?? ACCENT.brand;
  const tileKinds = ["brand", m.accent === "brand" ? "sky" : m.accent];

  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  // Playbook decks by default; extras.programme switches the naming (e.g. the Management Programme, "M8").
  const programme = extras.programme ?? "Recruitment Playbook";
  const tag = extras.tag ?? `Module ${number}`;
  pres.title = `${m.title}: ${programme} ${extras.tag ?? number}`;
  pres.author = "Stott and May";
  pres.company = "Stott and May";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  const C = pres.SchemeColor;

  const art = {
    hero: await heroBackground(accent),
    soft: await softBackground(),
    logo: png(fs.readFileSync(path.join(PUBLIC, "brand/logo-dark.png"))),
    personTitle: await personInShape(extras.people?.title ?? "person-5.webp", accent),
    personSide: await personInShape(extras.people?.side ?? "person-1.webp", ACCENT.sky),
    personClose: await personInShape(extras.people?.close ?? "person-3.webp", accent),
  };

  const FOOT = `Stott and May ${programme} · ${m.title}`;
  const footer = [{ text: { text: FOOT, options: { x: X0, y: 6.95, w: 9, h: 0.3, fontSize: 10, color: C.text2, margin: 0 } } }];
  const slideNumber = { x: 12.1, y: 6.95, w: 0.65, h: 0.3, fontSize: 10, color: C.text2, align: "right" };
  pres.defineSlideMaster({
    title: "Title", background: { data: art.hero },
    objects: [
      { image: { data: art.logo, x: X0, y: 0.5, w: 0.75, h: 0.75 } },
      { placeholder: { options: { name: "eyebrow", type: "body", x: X0, y: 1.75, w: 7.4, h: 0.4, fontSize: 13, bold: true, color: C.text1, charSpacing: 3, margin: 0 }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: X0, y: 2.2, w: 7.5, h: 2.0, fontSize: 44, bold: true, color: C.text1, margin: 0, valign: "top", align: "left" }, text: "" } },
    ],
  });
  for (const [name, bg] of [["Content", { color: C.background2 }], ["Exercise", { data: art.soft }]]) {
    pres.defineSlideMaster({
      title: name, background: bg, margin: [0.6, 0.6, 0.7, 0.6],
      objects: [
        { image: { data: art.logo, x: 12.15, y: 0.42, w: 0.6, h: 0.6 } },
        { placeholder: { options: { name: "eyebrow", type: "body", x: X0, y: 0.5, w: 10.5, h: 0.32, fontSize: 12, bold: true, color: C.text2, charSpacing: 3, margin: 0 }, text: "" } },
        { placeholder: { options: { name: "title", type: "title", x: X0, y: 0.85, w: 11.3, h: 1.1, fontSize: 28, bold: true, color: C.text1, margin: 0, valign: "top", align: "left" }, text: "" } },
        ...footer,
      ],
      slideNumber,
    });
  }

  // ── Building blocks ──
  const shadow = () => ({ type: "outer", color: HEX.ink, opacity: 0.08, blur: 10, offset: 2, angle: 90 });
  const card = (s, x, y, w, h, o = {}) =>
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.16, fill: { color: o.fill ?? C.background1 }, line: o.line ? { color: o.line, width: 1 } : { type: "none" }, shadow: o.flat ? undefined : shadow() });
  const tile = async (s, x, y, size, iconName, o = {}) => {
    s.addImage({ data: await tileImage(o.kind ?? "brand", o.circle), x, y, w: size, h: size });
    const pad = size * 0.24;
    s.addImage({ data: await icon(iconName, o.iconColor ?? HEX.ink), x: x + pad, y: y + pad, w: size - 2 * pad, h: size - 2 * pad });
  };
  const text = (s, t, o) => s.addText(t, { isTextBox: true, margin: 0, valign: "top", fontSize: 14, color: C.text1, ...(o.bold ? { fontFace: "+mj-lt" } : {}), ...o });
  const label = (s, t, o) => text(s, t.toUpperCase(), { fontSize: 11, bold: true, color: C.text2, charSpacing: 2, ...o });
  const numberBadge = async (s, x, y, n, size = 0.5, kind = "brand") => {
    s.addImage({ data: await tileImage(kind, true), x, y, w: size, h: size });
    text(s, String(n).padStart(2, "0"), { x, y, w: size, h: size, align: "center", valign: "middle", bold: true, fontSize: size > 0.55 ? 15 : 12 });
  };

  const slides = [];
  const addSlide = (master, eyebrow, title, note) => {
    const s = pres.addSlide({ masterName: master });
    if (eyebrow) s.addText(eyebrow.toUpperCase(), { placeholder: "eyebrow" });
    if (title) s.addText(title, { placeholder: "title" });
    s.addNotes(note ?? "");
    slides.push(s);
    return s;
  };
  // Content starts below the title (one or two lines) and the takeaway.
  const headerBottom = (title) => 0.85 + textH(title, 11.3, 28, true, 0.5) + 0.12;
  // Under a title slide's heading (44pt, up to three lines).
  const underTitle = (title) => 2.2 + textH(title, 7.5, 44, true, 0.56) + 0.15;

  // ── Blocks: each returns { h, draw(s, y) } so slides can be packed. ──
  const blocks = {
    framework(f, w = CW, k = false) {
      const n = f.steps.length;
      const cols = n <= 4 ? n : n === 5 ? 5 : n === 6 ? 3 : 4;
      const rows = Math.ceil(n / cols);
      const cw = (w - (cols - 1) * 0.22) / cols, inner = cw - 0.5;
      const tSize = cols >= 5 || k ? 14 : 16, dSize = cols >= 5 || k ? 12 : 13;
      const cardH = (st) => (k ? 0.2 : 0.25) + 0.55 + (st.label ? 0.3 : 0) + textH(st.title, inner, tSize, true) + 0.08 + textH(st.text ?? "", inner, dSize) + (k ? 0.12 : 0.2);
      const rowHs = Array.from({ length: rows }, (_, r) => Math.max(...f.steps.slice(r * cols, r * cols + cols).map(cardH)));
      const head = f.title && !k ? 0.4 : 0;
      return {
        h: head + rowHs.reduce((a, b) => a + b, 0) + (rows - 1) * 0.2,
        async draw(s, y, x = X0) {
          if (head) { label(s, f.title, { x, y, w, h: 0.3 }); y += head; }
          for (const [i, st] of f.steps.entries()) {
            const r = Math.floor(i / cols), c = i % cols;
            const cx = x + c * (cw + 0.22), cy = y + rowHs.slice(0, r).reduce((a, b) => a + b, 0) + r * 0.2;
            card(s, cx, cy, cw, rowHs[r]);
            await numberBadge(s, cx + 0.25, cy + (k ? 0.2 : 0.25), i + 1, 0.5, tileKinds[i % 2]);
            let ty = cy + (k ? 0.8 : 0.85);
            if (st.label) { label(s, st.label, { x: cx + 0.25, y: ty, w: inner, h: 0.28, fontSize: 10 }); ty += 0.32; }
            const th = textH(st.title, inner, tSize, true);
            text(s, st.title, { x: cx + 0.25, y: ty, w: inner, h: th, fontSize: tSize, bold: true });
            if (st.text) text(s, st.text, { x: cx + 0.25, y: ty + th + 0.08, w: inner, h: textH(st.text, inner, dSize) + 0.05, fontSize: dSize, color: C.accent5 });
          }
        },
      };
    },
    table(t, w = CW, k = false) {
      const cols = t.columns.length;
      const all = [t.columns, ...t.rows.map((r) => r.cells)];
      const longestWord = (i) => Math.max(...all.map((r) => Math.max(...String(r[i] ?? "").split(/\s+/).map((x) => x.length))));
      // Every column is at least wide enough for its longest word (bold, 14pt, plus padding).
      const minW = t.columns.map((_, i) => (longestWord(i) * 14 * 0.62) / 72 + 0.32);
      const weight = t.columns.map((_, i) => Math.max(8, Math.min(60, Math.max(...all.map((r) => String(r[i] ?? "").length)))));
      const total = weight.reduce((a, b) => a + b, 0);
      let colW = weight.map((x) => (x / total) * w);
      for (let pass = 0; pass < 3; pass++) {
        const short = colW.map((c, i) => Math.max(0, minW[i] - c));
        const need = short.reduce((a, b) => a + b, 0);
        if (!need) break;
        const spare = colW.map((c, i) => (short[i] ? 0 : Math.max(0, c - minW[i])));
        const spareTotal = spare.reduce((a, b) => a + b, 0);
        colW = colW.map((c, i) => (short[i] ? minW[i] : c - (spare[i] / spareTotal) * need));
      }
      const size = (fs_) => {
        const rowH = (r, head) => Math.max(...r.map((c, i) => textH(c ?? "", colW[i] - 0.28, fs_, head || i === 0, head || i === 0 ? 0.6 : 0.53))) + 0.16;
        return [rowH(t.columns, true), ...t.rows.map((r) => rowH(r.cells, false))];
      };
      let fsz = k ? 12 : 14, hs = size(fsz);
      const fit = () => hs.reduce((a, b) => a + b, 0);
      while (fit() > 4.4 && fsz > 11) { fsz--; hs = size(fsz); }
      const head = t.title && !k ? 0.4 : 0;
      return {
        h: head + fit(), rows: t.rows.length,
        async draw(s, y, x = X0) {
          if (head) { label(s, t.title, { x, y, w, h: 0.3 }); y += head; }
          const headRow = t.columns.map((c, i) => ({ text: c, options: { bold: true, fontFace: "+mj-lt", color: i === cols - 1 ? C.accent2 : C.background1, fill: { color: C.text1 }, fontSize: fsz } }));
          const body = t.rows.map((r, ri) => r.cells.map((c, i) => ({ text: c ?? "", options: { bold: i === 0, ...(i === 0 ? { fontFace: "+mj-lt" } : {}), color: C.text1, fill: { color: ri % 2 ? HEX.sunken : HEX.white }, fontSize: fsz } })));
          s.addTable([headRow, ...body], { x, y, w, colW, rowH: hs, margin: [0.08, 0.14, 0.08, 0.14], border: { type: "solid", color: HEX.border, pt: 0.75 }, valign: "middle" });
        },
      };
    },
    list(items, kind, w = CW, k = false) {
      const good = kind === "tactics";
      const cols = w > 7 && items.length > 3 ? 2 : 1;
      const colW = (w - 0.7 - (cols - 1) * 0.3) / cols;
      const per = Math.ceil(items.length / cols);
      const isz = k ? 13 : 14;
      const itemH = (t) => Math.max(0.3, textH(t, colW - 0.5, isz)) + (k ? 0.1 : 0.16);
      const colHs = Array.from({ length: cols }, (_, c) => items.slice(c * per, c * per + per).reduce((a, t) => a + itemH(t), 0));
      const h = (k ? 0.78 : 0.95) + Math.max(...colHs) + 0.1;
      return {
        h,
        async draw(s, y, x = X0) {
          card(s, x, y, w, h, { fill: good ? C.background1 : HEX.danger50 });
          await tile(s, x + 0.3, y + (k ? 0.16 : 0.22), 0.48, good ? "LuListChecks" : "LuTriangleAlert", good ? {} : { kind: "danger", iconColor: HEX.danger });
          label(s, good ? "Key tactics" : "Watch out for", { x: x + 0.95, y: y + (k ? 0.27 : 0.33), w: w - 1.3, h: 0.28, color: good ? C.text2 : C.accent6 });
          for (let c = 0; c < cols; c++) {
            let iy = y + (k ? 0.76 : 0.92);
            const ix = x + 0.35 + c * (colW + 0.3);
            for (const t of items.slice(c * per, c * per + per)) {
              s.addImage({ data: await icon(good ? "LuCircleCheck" : "LuCircleX", good ? HEX.tealInk : HEX.danger), x: ix, y: iy + 0.02, w: 0.28, h: 0.28 });
              text(s, t, { x: ix + 0.42, y: iy, w: colW - 0.5, h: itemH(t), fontSize: isz });
              iy += itemH(t);
            }
          }
        },
      };
    },
    phrases(list, w = CW, k = false) {
      const parsed = list.map((p) => {
        const mm = p.match(/^([A-Z][^"“:]{1,40}):\s+(.+)$/s);
        return mm && !mm[1].includes("[") ? { label: mm[1], q: mm[2] } : { label: null, q: p };
      });
      const quote = (q) => (/^["“]/.test(q) ? q.replace(/^"/, "“").replace(/"$/, "”") : `“${q}”`);
      const cols = parsed.length === 2 && w > 7 && parsed.every((p) => p.q.length > 90) ? 2 : 1;
      const colW = (w - (cols - 1) * 0.25) / cols, inner = colW - 1.25;
      const fsz = k || parsed.reduce((a, p) => a + p.q.length, 0) > 700 ? 13 : 15;
      const oneH = (p) => (p.label ? 0.3 : 0) + textH(quote(p.q), inner, fsz) + 0.18;
      const cardH = (ps) => 0.72 + ps.reduce((a, p) => a + oneH(p), 0) + 0.12;
      const groups = cols === 2 ? [[parsed[0]], [parsed[1]]] : [parsed];
      const h = Math.max(...groups.map(cardH));
      return {
        h,
        async draw(s, y, x = X0) {
          for (const [g, ps] of groups.entries()) {
            const cx = x + g * (colW + 0.25);
            card(s, cx, y, colW, h);
            await tile(s, cx + 0.3, y + 0.25, 0.5, "LuQuote");
            label(s, ps.length > 1 ? "Say this" : ps[0].label ?? "Say this", { x: cx + 0.95, y: y + 0.36, w: inner, h: 0.28 });
            let py = y + 0.72;
            for (const p of ps) {
              if (p.label && ps.length > 1) { label(s, p.label, { x: cx + 0.95, y: py, w: inner, h: 0.26, fontSize: 10, color: C.accent5 }); py += 0.3; }
              const th = textH(quote(p.q), inner, fsz);
              text(s, quote(p.q), { x: cx + 0.95, y: py, w: inner, h: th + 0.05, fontSize: fsz, italic: true });
              py += th + 0.18;
            }
          }
        },
      };
    },
    tip(t, w = CW, k = false) { return blocks.bar("tip", t, w, k); },
    // A slim one-line bar: a tip (dark), a phrase to say (soft teal) or a watch-out (soft red).
    bar(kind, t, w = CW, k = false) {
      const look = {
        tip: { fill: C.text1, icon: ["LuLightbulb", HEX.aqua], tag: "TIP", tagColor: C.accent2, color: C.background1, italic: false },
        say: { fill: HEX.teal50, icon: ["LuQuote", HEX.tealInk], tag: "SAY THIS", tagColor: C.text2, color: C.text1, italic: true },
        watch: { fill: HEX.danger50, icon: ["LuTriangleAlert", HEX.danger], tag: "WATCH OUT", tagColor: C.accent6, color: C.text1, italic: false },
      }[kind];
      const body = kind === "say" ? `“${t.replace(/^["“]|["”]$/g, "")}”` : t;
      const th = textH(`${look.tag}   ${body}`, w - 1.0, 15);
      const h = Math.max(k ? 0.62 : 0.72, th + (k ? 0.22 : 0.3));
      return {
        h,
        async draw(s, y, x = X0) {
          card(s, x, y, w, h, { fill: look.fill, flat: true });
          s.addImage({ data: await icon(...look.icon), x: x + 0.28, y: y + h / 2 - 0.17, w: 0.34, h: 0.34 });
          text(s, [
            { text: `${look.tag}   `, options: { bold: true, color: look.tagColor, fontSize: 12, charSpacing: 2, italic: false } },
            { text: body, options: { color: look.color, fontSize: 15, italic: look.italic } },
          ], { x: x + 0.8, y: y + 0.15, w: w - 1.0, h: h - 0.3, valign: "middle" });
        },
      };
    },
    // Big-number cards, from a table whose rows are [number, what, detail].
    stats(t, w = CW) {
      const n = t.rows.length, cw = (w - (n - 1) * 0.25) / n, inner = cw - 0.7;
      const h = 0.35 + 0.95 + Math.max(...t.rows.map((r) => textH(r.cells[1], inner, 17, true) + 0.12 + textH(r.cells[2] ?? "", inner, 14))) + 0.35;
      return {
        h,
        async draw(s, y, x = X0) {
          for (const [i, r] of t.rows.entries()) {
            const cx = x + i * (cw + 0.25), dark = i === 0;
            card(s, cx, y, cw, h, { fill: dark ? C.text1 : C.background1 });
            text(s, r.cells[0], { x: cx + 0.35, y: y + 0.3, w: inner, h: 0.85, fontSize: 44, bold: true, color: dark ? C.accent2 : C.text2 });
            const lh = textH(r.cells[1], inner, 17, true);
            text(s, r.cells[1], { x: cx + 0.35, y: y + 1.3, w: inner, h: lh, fontSize: 17, bold: true, color: dark ? C.background1 : C.text1 });
            text(s, r.cells[2] ?? "", { x: cx + 0.35, y: y + 1.3 + lh + 0.12, w: inner, h: textH(r.cells[2] ?? "", inner, 14) + 0.1, fontSize: 14, color: dark ? C.background1 : C.accent5 });
          }
        },
      };
    },
    takeaway(t) {
      const h = textH(t, CW, 17);
      return { h, async draw(s, y) { text(s, t, { x: X0, y, w: CW, h: h + 0.05, fontSize: 17, color: C.text1 }); } };
    },
  };
  // Two blocks side by side, e.g. tactics and mistakes.
  const pair = (a, b) => ({ h: Math.max(a.h, b.h), async draw(s, y) { await a.draw(s, y, X0); await b.draw(s, y, X0 + (CW + 0.25) / 2); } });
  const column = (list, gap = 0.18) => ({ h: list.reduce((a, b) => a + b.h, 0) + gap * (list.length - 1), async draw(s, y, x) { for (const b of list) { await b.draw(s, y, x); y += b.h + gap; } } });
  const pairW = (a, b, aw) => ({ h: Math.max(a.h, b.h), async draw(s, y) { await a.draw(s, y, X0); await b.draw(s, y, X0 + aw + 0.25); } });

  // Packs blocks onto as many slides as they need.
  // Estimates run slightly high, so the compact layout may use a little of the gap above the footer.
  async function packed(master, eyebrow, title, note, list, gap = GAP, limit = BOTTOM + 0.02) {
    let s = addSlide(master, eyebrow, title, note);
    let y = headerBottom(title);
    for (const b of list) {
      if (y + b.h > limit && y > headerBottom(title) + 0.6) {
        s = addSlide(master, eyebrow, `${title} (continued)`, "");
        y = headerBottom(title);
      }
      await b.draw(s, y);
      y += b.h + gap;
    }
    return s;
  }

  // ── Slides ──
  const eyebrow = (part) => `${tag} · ${part}`;
  const noteFor = (i) => [extras.sectionNotes?.[i]?.map((n) => notes[n]).filter(Boolean).join("\n\n"), extras.extraNotes?.[i]].filter(Boolean).join("\n\n");

  // 1 Title
  {
    const s = addSlide("Title", null, null, extras.notes?.title ?? notes[1]);
    s.addText(`${programme} · ${tag}`.toUpperCase(), { placeholder: "eyebrow" });
    s.addText(m.title, { placeholder: "title" });
    const ly = underTitle(m.title), lead = extras.lead ?? m.subtitle;
    text(s, lead, { x: X0, y: ly, w: 7.0, h: textH(lead, 7.0, 18) + 0.1, fontSize: 18 });
    const pillY = Math.max(5.35, ly + textH(lead, 7.0, 18) + 0.35);
    let px = X0;
    for (const [i, p] of (extras.pills ?? []).entries()) {
      const pw = 0.4 + p.length * 0.105;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: px, y: pillY, w: pw, h: 0.48, rectRadius: 0.24, fill: { color: i === 0 ? C.text1 : C.background1 }, line: { type: "none" } });
      text(s, p, { x: px, y: pillY, w: pw, h: 0.48, align: "center", valign: "middle", bold: true, fontSize: 14, color: i === 0 ? C.background1 : C.text1 });
      px += pw + 0.15;
    }
    s.addImage({ data: art.personTitle, x: 8.35, y: 0.55, w: 4.45, h: 4.9 });
  }

  // 2 What you'll leave with
  {
    const s = addSlide("Content", `${tag} · Overview`, "What you'll leave with", extras.notes?.overview ?? notes[2]);
    for (const [i, [ic, t]] of extras.outcomes.entries()) {
      const y = 1.95 + i * 1.5;
      card(s, X0, y, 7.6, 1.25);
      await tile(s, 0.9, y + 0.3, 0.65, ic, { kind: tileKinds[i % 2] });
      label(s, `0${i + 1}`, { x: 1.8, y: y + 0.22, w: 1, h: 0.3, fontSize: 12 });
      text(s, t, { x: 1.8, y: y + 0.5, w: 6.2, h: 0.65, fontSize: 16 });
    }
    card(s, 8.55, 1.95, 4.18, 4.25, { fill: C.text1 });
    text(s, "Session facts", { x: 8.9, y: 2.25, w: 3.6, h: 0.45, fontSize: 20, bold: true, color: C.accent2 });
    for (const [i, [k, v]] of extras.facts.entries()) {
      label(s, k, { x: 8.9, y: 2.95 + i * 1.0, w: 3.6, h: 0.3, color: C.accent2 });
      text(s, v, { x: 8.9, y: 3.25 + i * 1.0, w: 3.6, h: 0.65, fontSize: 14, color: C.background1 });
    }
  }

  // Sections
  for (const [i, sec] of m.sections.entries()) {
    const part = extras.parts?.[i] ?? sec.title;
    const note = [sec.content, noteFor(i)].filter(Boolean).join("\n\n");
    if (extras.custom?.[i]) { await extras.custom[i]({ pres, addSlide, blocks, card, tile, text, label, icon, numberBadge, HEX, C, art, eyebrow, sec, note, headerBottom, packed, X0, CW, BOTTOM, GAP }); continue; }
    if (/^Practise it/i.test(sec.title)) { await exerciseSlide(sec, note); continue; }
    if (/^Takeaways/i.test(sec.title)) { await takeawaysSlide(sec, note); continue; }
    const make = (k, tight = false) => {
      const list = [blocks.takeaway(sec.takeaway)];
      if (sec.framework?.steps?.length) list.push(blocks.framework(sec.framework, CW, k));
      const tables = sec.tables ?? [];
      // A small two-column table (like a glossary) sits beside the main one.
      if (tables.length === 2 && tables[1].columns.length === 2 && tables[1].rows.length <= 5) {
        const w1 = CW * 0.64;
        list.push(pairW(blocks.table(tables[0], w1, k), blocks.table(tables[1], CW - w1 - 0.25, k), w1));
      } else for (const t of tables) list.push(extras.stats?.includes(i) ? blocks.stats(t) : blocks.table(t, CW, k));
      const half = (CW - 0.25) / 2;
      const shortPhrase = sec.phrases?.length === 1 && sec.phrases[0].length < 160;
      const shortMistake = sec.mistakes?.length === 1 && sec.mistakes[0].length < 170 && !sec.tactics?.length;
      let tipDone = false;
      if (sec.tactics?.length && sec.mistakes?.length) {
        // Tactics on the left; the watch-outs, and the tip if it fits, on the right.
        const left = blocks.list(sec.tactics, "tactics", half, k);
        const right = [blocks.list(sec.mistakes, "mistakes", half, k)];
        if (sec.tip) {
          const withTip = column([...right, blocks.tip(sec.tip, half, k)]);
          if (withTip.h <= left.h + 0.05) { right.push(blocks.tip(sec.tip, half, k)); tipDone = true; }
        }
        list.push(pair(left, column(right)));
      } else if (sec.tactics?.length) list.push(blocks.list(sec.tactics, "tactics", CW, k));
      const bars = []; // [kind, text]
      if (sec.mistakes?.length && !sec.tactics?.length) {
        if (shortMistake) bars.push(["watch", sec.mistakes[0]]);
        else if (k && sec.mistakes.length === 2 && sec.mistakes.every((m) => m.length < 110) && !sec.phrases?.length) bars.push(...sec.mistakes.map((m) => ["watch", m]));
        else if (sec.phrases?.length && !shortPhrase && sec.mistakes.length <= 2) {
          const pw = CW * 0.6;
          const side = pairW(blocks.phrases(sec.phrases, pw, k), blocks.list(sec.mistakes, "mistakes", CW - pw - 0.25, k), pw);
          const stacked = blocks.phrases(sec.phrases, CW, k).h + blocks.list(sec.mistakes, "mistakes", CW, k).h + 0.2;
          if (side.h < stacked) list.push(side);
          else list.push(blocks.list(sec.mistakes, "mistakes", CW, k), blocks.phrases(sec.phrases, CW, k));
        } else list.push({ ...blocks.list(sec.mistakes, "mistakes", CW, k), rebuild: (w) => blocks.list(sec.mistakes, "mistakes", w, k) });
      }
      const phrasesDone = sec.mistakes?.length && !sec.tactics?.length && !shortMistake && sec.phrases?.length && !shortPhrase && sec.mistakes.length <= 2;
      if (sec.phrases?.length && !phrasesDone) {
        if (shortPhrase) bars.unshift(["say", sec.phrases[0]]);
        else list.push({ ...blocks.phrases(sec.phrases, CW, k), rebuild: (w) => blocks.phrases(sec.phrases, w, k) });
      }
      if (sec.tip && !tipDone && tight && !bars.length && list.length > 1) {
        const last = list.pop(), lw = CW * 0.66;
        const shrunk = last.rebuild ? last.rebuild(lw) : null;
        if (shrunk) { list.push(pairW(shrunk, blocks.tip(sec.tip, CW - lw - 0.25, k), lw)); tipDone = true; }
        else list.push(last);
      }
      if (sec.tip && !tipDone) bars.push(["tip", sec.tip]);
      // Two bars sit side by side when that saves room.
      while (bars.length) {
        if (bars.length >= 2) {
          const full = bars.slice(0, 2).map(([kd, t]) => blocks.bar(kd, t, CW, k));
          const halves = bars.slice(0, 2).map(([kd, t]) => blocks.bar(kd, t, half, k));
          if (Math.max(halves[0].h, halves[1].h) + 0.18 < full[0].h + full[1].h) { list.push(pair(halves[0], halves[1])); bars.splice(0, 2); continue; }
        }
        const [kd, t] = bars.shift();
        list.push(blocks.bar(kd, t, CW, k));
      }
      return list;
    };
    const fits = (list, gap, slack = 0.02) => headerBottom(sec.title) + list.reduce((a, b) => a + b.h, 0) + gap * (list.length - 1) <= BOTTOM + slack;
    const roomy = make(false);
    if (process.env.DECK_DEBUG) console.log(i, sec.title.slice(0, 30), "top", headerBottom(sec.title).toFixed(2), "roomy", roomy.map((b) => b.h.toFixed(2)).join(" "), "compact", make(true).map((b) => b.h.toFixed(2)).join(" "));
    if (fits(roomy, GAP)) await packed("Content", eyebrow(part), sec.title, note, roomy, GAP);
    else if (fits(make(true), 0.16, 0.16)) await packed("Content", eyebrow(part), sec.title, note, make(true), 0.16, BOTTOM + 0.18);
    else await packed("Content", eyebrow(part), sec.title, note, make(true, true), 0.16, BOTTOM + 0.18);
    if (sec.scenario) await scenarioSlide(sec.scenario);
  }

  async function exerciseSlide(sec, note) {
    const minutes = sec.framework?.title?.match(/\((\d+) minutes\)/)?.[1];
    const title = sec.title.replace(/^Practise it:\s*/i, "").replace(/^./, (c) => c.toUpperCase());
    const s = addSlide("Exercise", `Practical exercise${minutes ? ` · ${minutes} minutes` : ""}`, title, note);
    const y0 = headerBottom(title) + 0.1;
    text(s, sec.takeaway, { x: X0, y: y0, w: CW, h: textH(sec.takeaway, CW, 17) + 0.05, fontSize: 17 });
    const steps = sec.framework.steps;
    const cw = (CW - (steps.length - 1) * 0.26) / steps.length;
    const icons = ["LuUsers", "LuMessagesSquare", "LuClipboardList", "LuTarget"];
    const top = y0 + textH(sec.takeaway, CW, 17) + 0.35;
    const h = Math.min(BOTTOM - top, Math.max(...steps.map((st) => 1.25 + 0.4 + textH(st.title, cw - 0.7, 18, true) + textH(st.text, cw - 0.7, 14) + 0.3)));
    for (const [i, st] of steps.entries()) {
      const x = X0 + i * (cw + 0.26), dark = i === steps.length - 1;
      card(s, x, top, cw, h, { fill: dark ? C.text1 : C.background1 });
      await tile(s, x + 0.35, top + 0.3, 0.62, icons[i % icons.length], { kind: tileKinds[i % 2] });
      label(s, `0${i + 1} · ${st.label ?? ""}`, { x: x + 0.35, y: top + 1.15, w: cw - 0.7, h: 0.3, color: dark ? C.accent2 : C.text2 });
      const th = textH(st.title, cw - 0.7, 18, true);
      text(s, st.title, { x: x + 0.35, y: top + 1.5, w: cw - 0.7, h: th, fontSize: 18, bold: true, color: dark ? C.background1 : C.text1 });
      text(s, st.text, { x: x + 0.35, y: top + 1.5 + th + 0.12, w: cw - 0.7, h: textH(st.text, cw - 0.7, 14) + 0.1, fontSize: 14, color: dark ? C.background1 : C.accent5 });
    }
    if (sec.scenario) await scenarioSlide(sec.scenario);
  }

  async function scenarioSlide(sc) {
    const s = addSlide("Content", `${tag} · Scenario`, "What would you do?", "Read the situation aloud and ask the room what they would do before revealing the two approaches. Discuss what makes the strong approach work.");
    const sitW = 8.55, sitH = Math.max(1.5, 0.75 + textH(sc.title, sitW - 1.3, 17) + 0.3);
    card(s, X0, 1.75, sitW, sitH, { fill: HEX.teal50, flat: true });
    await tile(s, X0 + 0.3, 2.0, 0.55, "LuTarget", { kind: tileKinds[0] });
    label(s, "The situation", { x: X0 + 1.05, y: 2.1, w: 5, h: 0.3 });
    text(s, sc.title, { x: X0 + 1.05, y: 2.45, w: sitW - 1.3, h: sitH - 0.75, fontSize: 17, bold: true });
    s.addImage({ data: art.personSide, x: 9.55, y: 0.9, w: 3.1, h: 3.4 });
    const top = Math.max(1.75 + sitH, 4.1) + 0.25, ws = [(CW - 0.25) * 0.42, (CW - 0.25) * 0.58];
    let fsz = 14;
    while (fsz > 11 && top + 0.85 + Math.max(textH(sc.strong, ws[1] - 0.7, fsz), textH(sc.weak, ws[0] - 0.7, fsz)) > BOTTOM) fsz--;
    const h = BOTTOM - top;
    for (const [i, [kind, t]] of [["weak", sc.weak], ["strong", sc.strong]].entries()) {
      const colW = ws[i], x = X0 + (i ? ws[0] + 0.25 : 0), weak = kind === "weak";
      card(s, x, top, colW, h, { fill: weak ? HEX.danger50 : C.background1 });
      s.addImage({ data: await icon(weak ? "LuCircleX" : "LuCircleCheck", weak ? HEX.danger : HEX.tealInk), x: x + 0.3, y: top + 0.28, w: 0.36, h: 0.36 });
      label(s, weak ? "Weak approach" : "Strong approach", { x: x + 0.8, y: top + 0.33, w: colW - 1.1, h: 0.3, color: weak ? C.accent6 : C.text2 });
      text(s, t, { x: x + 0.35, y: top + 0.8, w: colW - 0.7, h: h - 0.95, fontSize: fsz });
    }
  }

  async function takeawaysSlide(sec, note) {
    const s = addSlide("Content", `${tag} · Takeaways and actions`, "What to take back to your desk", note);
    const take = sec.content.replace(/\s*Tick off each action below.*$/, "").replace(/\s*Test yourself:.*?\?\s*/, " ").split(/(?<=[.?!])\s+/).filter(Boolean);
    const colW = (CW - 0.25) / 2, y = 1.85, h = BOTTOM - y;
    const tz = take.length > 6 ? 14 : 16, az = sec.tactics.length > 5 ? 14 : 16;
    card(s, X0, y, colW, h, { fill: C.text1 });
    label(s, "Key takeaways", { x: X0 + 0.35, y: y + 0.35, w: 4.5, h: 0.3, color: C.accent2 });
    text(s, take.map((t, i) => ({ text: t, options: { bullet: { indent: 18 }, breakLine: i < take.length - 1, paraSpaceAfter: 8 } })), { x: X0 + 0.35, y: y + 0.8, w: colW - 0.7, h: h - 1.0, fontSize: tz, color: C.background1 });
    const x2 = X0 + colW + 0.25;
    card(s, x2, y, colW, h);
    label(s, "Actions this week", { x: x2 + 0.35, y: y + 0.35, w: 4.5, h: 0.3 });
    let iy = y + 0.85;
    for (const t of sec.tactics) {
      s.addImage({ data: await icon("LuCircleCheck", HEX.tealInk), x: x2 + 0.35, y: iy + 0.03, w: 0.32, h: 0.32 });
      const th = textH(t, colW - 1.2, az);
      text(s, t, { x: x2 + 0.85, y: iy, w: colW - 1.2, h: th + 0.05, fontSize: az });
      iy += th + 0.2;
    }
  }

  // Close
  {
    const s = addSlide("Title", null, null, extras.notes?.close ?? notes[Math.max(0, ...Object.keys(notes).map(Number))] ?? "Open the floor for questions.");
    s.addText("QUESTIONS & DISCUSSION", { placeholder: "eyebrow" });
    s.addText(extras.close.title, { placeholder: "title" });
    text(s, extras.close.body, { x: X0, y: underTitle(extras.close.title), w: 7.0, h: 0.8, fontSize: 18 });
    s.addImage({ data: art.personClose, x: 8.35, y: 0.55, w: 4.45, h: 4.9 });
  }

  await pres.writeFile({ fileName: outFile });
  await applyTheme(outFile, THEME);
  return { slides: slides.length };
}
