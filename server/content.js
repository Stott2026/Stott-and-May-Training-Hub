// Content rules shared by the server and the preview build (scripts/build-preview.js).
// Plain JavaScript with no server-only imports, so the browser preview can use it too.

// A quiz question linked to a module shows as a quick check after the section
// the editor chose, or after the last section if they didn't choose one.
export function withQuickChecks({ quiz = [], ...module }) {
  const sections = module.sections ?? [];
  for (const q of quiz) {
    const i = Math.min(Math.max((q.afterSection ?? sections.length) - 1, 0), sections.length - 1);
    if (sections[i] && !sections[i].quiz) sections[i].quiz = q;
  }
  return { ...module, sections };
}

// Search the whole hub: forms, Library files and training sections, each in its own group.
export function searchHub({ modules = [], forms = [], library = [] } = {}, query) {
  const q = String(query ?? "").trim().toLowerCase();
  if (q.length < 2) return { forms: [], files: [], sections: [] };
  return { forms: searchForms(forms, q), files: searchLibrary(library, q), sections: searchModules(modules, q) };
}

// A form matches on its title, description or any wording inside it (questions, options, checklists).
function searchForms(forms, q) {
  const results = [];
  for (const f of forms) {
    const inside = (f.blocks ?? []).flatMap((b) => [
      b.title, b.label, b.placeholder, ...(b.options ?? []), ...(b.items ?? []).map((i) => (typeof i === "string" ? i : i?.label)),
      ...(b.steps ?? []).flatMap((st) => [st.title, st.text]), ...(b.cards ?? []).flatMap((c) => [c.title, c.question]),
      ...(b.groups ?? []), ...(b.columns ?? []).map((c) => c.label),
    ]);
    const places = [["Form", [f.title, f.summary]], ["When to use it", [f.intro]], ["In the form", inside], ["Group", [f.group]]];
    for (const [kind, texts] of places) {
      const hit = texts.find((t) => typeof t === "string" && t.toLowerCase().includes(q));
      if (hit) {
        results.push({ _id: f._id, slug: f.slug, title: f.title, group: f.group, icon: f.icon, summary: f.summary, kind, extract: kind === "Form" ? f.summary : extract(hit, q), rank: places.findIndex((p) => p[0] === kind) });
        break;
      }
    }
  }
  // Forms named after the search first, then ones that only mention it inside.
  return results.sort((a, b) => a.rank - b.rank);
}

// A Library file matches on its title, label, description or the module it belongs to.
function searchLibrary(items, q) {
  const words = (i) => [i.title, i.label, i.summary, i.module?.title, i.kind, i.kind === "deck" && "presentation slides PowerPoint", i.file?.extension];
  return items.filter((i) => words(i).some((t) => typeof t === "string" && t.toLowerCase().includes(q)));
}

// Search across every module's sections. Returns one result per matching section,
// with a short extract of the first place the words appear.
export function searchModules(modules, query) {
  const q = String(query ?? "").trim().toLowerCase();
  if (q.length < 2) return [];
  const results = [];
  for (const m of modules) {
    (m.sections ?? []).forEach((s, index) => {
      const places = [
        ["Section", [s.title]],
        ["Explanation", [s.content, s.tip]],
        ["Framework", (s.framework?.steps ?? []).flatMap((st) => [st.title, st.text])],
        ["Table", (s.tables ?? []).flatMap((t) => [t.title, ...(t.rows ?? []).flatMap((r) => r.cells ?? [])])],
        ["Tactic", s.tactics],
        ["Phrase", s.phrases],
        ["Mistake", s.mistakes],
        ["Scenario", [s.scenario?.title, s.scenario?.weak, s.scenario?.strong]],
      ];
      for (const [kind, texts] of places) {
        const hit = (texts ?? []).find((t) => t?.toLowerCase().includes(q));
        if (hit) {
          results.push({ module: { slug: m.slug, title: m.title, accent: m.accent }, section: { index, title: s.title }, kind, extract: kind === "Section" ? opening(s.content) : extract(hit, q), rank: places.findIndex((p) => p[0] === kind) });
          return;
        }
      }
    });
  }
  // Sections named after the search first, then the rest in module order.
  return results.sort((a, b) => (b.rank === 0) - (a.rank === 0)).slice(0, 100);
}

// The first 160 or so characters, for a section whose title matched.
function opening(text = "") {
  return text.length > 160 ? text.slice(0, 160).replace(/\s+\S*$/, "") + "…" : text;
}

// About 160 characters around the match.
function extract(text, q) {
  const at = text.toLowerCase().indexOf(q);
  const start = Math.max(0, at - 60);
  const end = Math.min(text.length, at + q.length + 100);
  return (start > 0 ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "");
}
