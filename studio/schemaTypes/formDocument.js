import { defineArrayMember, defineField, defineType } from "sanity";
import { ClipboardIcon } from "@sanity/icons/Clipboard";
import { ICON_OPTIONS } from "./options.js";

// A fillable form in the hub's Documents & Forms tab, built from blocks: headings, fields,
// choices, scores, checklists and a few special layouts. What people type stays in their own
// browser (no candidate data is stored by the hub).
const lines = (r) => r.required().min(1);
const textList = (name, title) => ({ name, title, type: "array", of: [{ type: "string" }], validation: lines });

const blocks = [
  defineArrayMember({
    type: "object", name: "formHeading", title: "Heading",
    fields: [{ name: "title", title: "Heading", type: "string", validation: (r) => r.required() }],
    preview: { select: { title: "title" }, prepare: ({ title }) => ({ title, subtitle: "Heading" }) },
  }),
  defineArrayMember({
    type: "object", name: "formField", title: "Box to type in",
    fields: [
      { name: "label", title: "Label", type: "string", validation: (r) => r.required() },
      { name: "placeholder", title: "Hint inside the box (optional)", type: "string" },
      { name: "lines", title: "Lines", type: "number", initialValue: 1, description: "1 for a single line, 2 or more for a bigger box.", validation: (r) => r.min(1).max(8).integer() },
      { name: "width", title: "Width", type: "string", initialValue: "full", options: { list: [{ title: "Full width", value: "full" }, { title: "Half", value: "half" }, { title: "Third", value: "third" }], layout: "radio", direction: "horizontal" } },
    ],
    preview: { select: { title: "label", subtitle: "width" }, prepare: ({ title, subtitle }) => ({ title, subtitle: `Box · ${subtitle ?? "full"}` }) },
  }),
  defineArrayMember({
    type: "object", name: "formChoice", title: "Pick one",
    fields: [{ name: "label", title: "Question", type: "string", validation: (r) => r.required() }, textList("options", "Options")],
    preview: { select: { title: "label" }, prepare: ({ title }) => ({ title, subtitle: "Pick one" }) },
  }),
  defineArrayMember({
    type: "object", name: "formScore", title: "Score out of 10",
    fields: [{ name: "label", title: "What is being scored", type: "string", validation: (r) => r.required() }],
    preview: { select: { title: "label" }, prepare: ({ title }) => ({ title, subtitle: "Score out of 10" }) },
  }),
  defineArrayMember({
    type: "object", name: "formChecklist", title: "Checklist",
    fields: [textList("items", "Items to tick")],
    preview: { select: { items: "items" }, prepare: ({ items = [] }) => ({ title: items[0] ?? "Checklist", subtitle: `Checklist · ${items.length} items` }) },
  }),
  defineArrayMember({
    type: "object", name: "formGuide", title: "Guidance to read (script or questions)",
    description: "Read-only text for the consultant, such as a call script or questions to ask.",
    fields: [{
      name: "steps", title: "Steps", type: "array", validation: lines,
      of: [{ type: "object", name: "guideStep", fields: [
        { name: "tag", title: "Tag (optional)", type: "string", description: "For example: Step 1, or Opening." },
        { name: "title", title: "Title (optional)", type: "string" },
        { name: "text", title: "Words to say", type: "text", rows: 3, validation: (r) => r.required() },
      ], preview: { select: { title: "text", subtitle: "tag" } } }],
    }],
    preview: { select: { steps: "steps" }, prepare: ({ steps = [] }) => ({ title: steps[0]?.title ?? steps[0]?.text ?? "Guidance", subtitle: `Guidance · ${steps.length} steps` }) },
  }),
  defineArrayMember({
    type: "object", name: "formPrompts", title: "Question cards with notes",
    description: "Cards that each ask a question and have a box for notes, for example BANT.",
    fields: [{
      name: "cards", title: "Cards", type: "array", validation: lines,
      of: [{ type: "object", name: "promptCard", fields: [
        { name: "tag", title: "Letter or tag (optional)", type: "string" },
        { name: "title", title: "Title", type: "string", validation: (r) => r.required() },
        { name: "question", title: "Question", type: "string" },
      ], preview: { select: { title: "title", subtitle: "question" } } }],
    }],
    preview: { select: { cards: "cards" }, prepare: ({ cards = [] }) => ({ title: cards.map((c) => c.title).join(", ") || "Question cards", subtitle: "Question cards" }) },
  }),
  defineArrayMember({
    type: "object", name: "formNumbers", title: "Number boxes",
    description: "A grid of boxes for numbers, each with an optional target.",
    fields: [{
      name: "items", title: "Boxes", type: "array", validation: lines,
      of: [{ type: "object", name: "numberItem", fields: [
        { name: "label", title: "Label", type: "string", validation: (r) => r.required() },
        { name: "target", title: "Target (optional)", type: "string" },
      ], preview: { select: { title: "label", subtitle: "target" } } }],
    }],
    preview: { select: { items: "items" }, prepare: ({ items = [] }) => ({ title: items.map((i) => i.label).join(", ") || "Number boxes", subtitle: "Number boxes" }) },
  }),
  defineArrayMember({
    type: "object", name: "formRows", title: "Rows to fill in",
    description: "Repeated rows, optionally in groups: for example pipeline stages, days of the week or actions.",
    fields: [
      { name: "groups", title: "Groups (optional)", type: "array", of: [{ type: "string" }], description: "For example Monday to Friday. Leave empty for one set of rows." },
      { name: "rowsPerGroup", title: "Rows in each group", type: "number", initialValue: 1, validation: (r) => r.required().min(1).max(10).integer() },
      {
        name: "columns", title: "Columns", type: "array", validation: lines,
        of: [{ type: "object", name: "rowColumn", fields: [
          { name: "label", title: "Label", type: "string", validation: (r) => r.required() },
          { name: "kind", title: "Type", type: "string", initialValue: "text", options: { list: [{ title: "Short text", value: "text" }, { title: "Longer text", value: "long" }, { title: "Number", value: "number" }], layout: "radio", direction: "horizontal" } },
        ], preview: { select: { title: "label", subtitle: "kind" } } }],
      },
    ],
    preview: { select: { groups: "groups", columns: "columns" }, prepare: ({ groups = [], columns = [] }) => ({ title: (groups.length ? groups : columns.map((c) => c.label)).join(", "), subtitle: "Rows to fill in" }) },
  }),
];

export const formDocument = defineType({
  name: "formDocument",
  title: "Form",
  type: "document",
  icon: ClipboardIcon,
  groups: [{ name: "details", title: "Details", default: true }, { name: "content", title: "Form content" }],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "details", validation: (r) => r.required().max(80) }),
    defineField({ name: "slug", title: "Web address", type: "slug", group: "details", options: { source: "title", maxLength: 40 }, description: "Click Generate.", validation: (r) => r.required() }),
    defineField({ name: "group", title: "Group", type: "string", group: "details", description: "Forms are grouped by this on the Documents & Forms page, for example: Candidates.", validation: (r) => r.required() }),
    defineField({ name: "summary", title: "Short description", type: "string", group: "details", description: "One line on the card.", validation: (r) => r.required().max(120) }),
    defineField({ name: "intro", title: "When to use it", type: "string", group: "details", description: "Shown under the title on the form, for example: Complete before sending any CV to a client.", validation: (r) => r.max(160) }),
    defineField({ name: "icon", title: "Icon", type: "string", group: "details", options: { list: ICON_OPTIONS }, initialValue: "clipboard-list" }),
    defineField({ name: "order", title: "Display order", type: "number", group: "details", validation: (r) => r.integer() }),
    defineField({ name: "blocks", title: "Form content", type: "array", group: "content", of: blocks, validation: lines }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "group" } },
});
