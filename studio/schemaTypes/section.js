import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { textList } from "./options.js";

// One section inside a module. Sections are edited inside their module, in order.
export const section = defineType({
  name: "section",
  title: "Section",
  type: "object",
  icon: DocumentTextIcon,
  groups: [
    { name: "main", title: "Main content", default: true },
    { name: "practice", title: "Tactics, phrases and mistakes" },
    { name: "scenario", title: "Scenario" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Section title",
      type: "string",
      group: "main",
      description: "Shown in the module's journey map and at the top of the section. Keep it short.",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "takeaway",
      title: "Key takeaway (optional)",
      type: "string",
      group: "main",
      description: "One sentence the learner should remember. Shown in bold above the main text.",
      validation: (r) => r.max(160),
    }),
    defineField({
      name: "content",
      title: "Main text",
      type: "text",
      rows: 6,
      group: "main",
      description: "The explanation for this section. Aim for one short paragraph of 50 to 80 words.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Image (optional)",
      type: "image",
      group: "main",
      description: "A photo or diagram for this section.",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Image description", type: "string", description: "Describe the image for people using screen readers." }],
    }),
    // Phase 2: a video field (Mux) will be added here.
    defineField({ ...textList("tactics", "Key tactics", "Practical actions. Each one becomes a tick box for the learner. Drag to reorder."), group: "practice" }),
    defineField({ ...textList("phrases", "Phrases to use", "Word-for-word lines a consultant can say or write. Each one appears as a speech bubble with a copy button."), group: "practice" }),
    defineField({ ...textList("mistakes", "Common mistakes to avoid", "What not to do. Each one appears as a red warning card."), group: "practice" }),
    defineField({
      name: "scenario",
      title: "Real-world scenario (optional)",
      type: "object",
      group: "scenario",
      description: "A challenge for the learner: they read the situation, think, then reveal the weak and strong approaches.",
      options: { collapsible: false },
      fields: [
        { name: "title", title: "The situation", type: "text", rows: 2, description: "For example: 'You have just taken on a senior Backend Engineering role in FinTech. Where do you start?'" },
        { name: "weak", title: "Weak approach", type: "text", rows: 4, description: "What an inexperienced consultant might do." },
        { name: "strong", title: "Strong approach", type: "text", rows: 6, description: "What great looks like." },
      ],
    }),
  ],
  preview: {
    select: { title: "title", tactics: "tactics", phrases: "phrases", scenario: "scenario.title" },
    prepare: ({ title, tactics = [], phrases = [], scenario }) => ({
      title: title || "Untitled section",
      subtitle: [`${tactics.length} tactics`, `${phrases.length} phrases`, scenario ? "scenario" : null].filter(Boolean).join(" · "),
    }),
  },
});
