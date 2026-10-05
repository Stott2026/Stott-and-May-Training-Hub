// TEMPORARY: real content from the prototype, used only to review the module page design.
// Step 5 deletes this file: modules will come from Sanity.
import { MODS, QUIZ_QS } from "../../reference/prototype/data.js";

const ICONS = { candidate: "user", client: "handshake" };

function fromPrototype(mod, extras = {}) {
  return {
    slug: mod.id,
    icon: ICONS[mod.id] || "book-open",
    eyebrow: mod.eyebrow,
    title: mod.title,
    subtitle: mod.subtitle,
    accent: mod.gradient.includes("44B3F4") ? "sky" : mod.gradient.includes("7EFF2C") ? "lime" : "brand",
    sections: mod.sections.map((s) => ({ ...s })),
    ...extras,
  };
}

export const previewModule = fromPrototype(MODS[0], {
  heroImage: "/placeholders/person-1.webp",
  phraseAvatar: "/placeholders/person-6.webp",
});
// In Sanity, a quiz question can be linked to a section. Linked here by hand for the preview.
previewModule.sections[1].quiz = QUIZ_QS[1];

export const previewNextModule = fromPrototype(MODS[1]);
