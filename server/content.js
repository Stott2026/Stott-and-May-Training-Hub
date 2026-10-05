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
  return results.slice(0, 50);
}

// About 160 characters around the match.
function extract(text, q) {
  const at = text.toLowerCase().indexOf(q);
  const start = Math.max(0, at - 60);
  const end = Math.min(text.length, at + q.length + 100);
  return (start > 0 ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "");
}
