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
    { name: "structure", title: "Steps, tables and tips" },
    { name: "scenario", title: "Scenario" },
    { name: "resources", title: "Look here" },
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
    defineField({
      name: "framework",
      title: "Step-by-step framework (optional)",
      type: "object",
      group: "structure",
      description: "A short process or model, shown as numbered cards side by side. For example: the four-part sell-in.",
      options: { collapsible: false },
      fields: [
        { name: "title", title: "Framework name", type: "string", description: "For example: The four-part sell-in." },
        {
          name: "steps",
          title: "Steps",
          type: "array",
          description: "Two to four steps look best. Drag to reorder.",
          of: [
            {
              type: "object",
              name: "step",
              fields: [
                { name: "label", title: "Label", type: "string", description: "One or two words shown in small capitals, for example 'Outcome'. Optional." },
                { name: "title", title: "Step title", type: "string", validation: (r) => r.required() },
                { name: "text", title: "Explanation", type: "text", rows: 2 },
              ],
              preview: { select: { title: "title", subtitle: "label" } },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "tables",
      title: "Tables (optional)",
      type: "array",
      group: "structure",
      description: "Comparisons or reference tables, for example 'Order-taker or process owner?'.",
      of: [
        {
          type: "object",
          name: "dataTable",
          title: "Table",
          fields: [
            { name: "title", title: "Table title", type: "string" },
            { name: "columns", title: "Column headings", type: "array", of: [{ type: "string" }], description: "Left to right. Two to four columns read best.", validation: (r) => r.required().min(2).max(5) },
            {
              name: "rows",
              title: "Rows",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "row",
                  fields: [{ name: "cells", title: "Cells", type: "array", of: [{ type: "text", rows: 2 }], description: "One entry per column, in the same order as the headings." }],
                  preview: { select: { cells: "cells" }, prepare: ({ cells = [] }) => ({ title: cells.join(" · ") }) },
                },
              ],
            },
          ],
          preview: { select: { title: "title", rows: "rows" }, prepare: ({ title, rows = [] }) => ({ title: title || "Untitled table", subtitle: `${rows.length} rows` }) },
        },
      ],
    }),
    defineField({
      name: "tip",
      title: "Tip (optional)",
      type: "text",
      rows: 2,
      group: "structure",
      description: "One memorable line, shown in a highlighted box. For example: 'Ask a question back before you answer.'",
    }),
    defineField({
      name: "lookHere",
      title: "Look here (optional)",
      type: "array",
      group: "resources",
      description: "Point learners to something useful elsewhere, such as case studies or salary guides in the Marketing Hub. Shown as a 'Look here' card in the section.",
      of: [
        {
          type: "object",
          name: "resourceLink",
          fields: [
            { name: "title", title: "What to look at", type: "string", description: "For example: Client case studies.", validation: (r) => r.required().max(80) },
            { name: "note", title: "Why it helps (optional)", type: "string", description: "One line, for example: 'Learn two from your market by heart.'", validation: (r) => r.max(160) },
            { name: "where", title: "Where to find it (optional)", type: "string", description: "For example: the Case studies section.", validation: (r) => r.max(60) },
            { name: "url", title: "Web address (optional)", type: "url", description: "Leave empty to link to the Marketing Hub (set in Site settings).", validation: (r) => r.uri({ scheme: ["https"] }) },
          ],
          preview: { select: { title: "title", subtitle: "where" } },
        },
      ],
    }),
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
