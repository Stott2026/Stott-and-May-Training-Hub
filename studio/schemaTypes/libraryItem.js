import { defineField, defineType } from "sanity";
import { DocumentsIcon } from "@sanity/icons/Documents";

export const LIBRARY_KINDS = [
  { title: "Training deck", value: "deck" },
  { title: "Guide", value: "guide" },
  { title: "Template", value: "template" },
  { title: "Form", value: "form" },
];

// A file people can download from the hub's Library: a classroom deck, a guide or a template.
export const libraryItem = defineType({
  name: "libraryItem",
  title: "Library item",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "For example: Client Control.", validation: (r) => r.required().max(80) }),
    defineField({ name: "label", title: "Label above the title (optional)", type: "string", description: "One or two words in small capitals, for example 'Playbook 07'.", validation: (r) => r.max(24) }),
    defineField({ name: "kind", title: "Type", type: "string", options: { list: LIBRARY_KINDS, layout: "radio", direction: "horizontal" }, initialValue: "deck", validation: (r) => r.required() }),
    defineField({ name: "summary", title: "Short description", type: "text", rows: 2, description: "One or two sentences on the card.", validation: (r) => r.required().max(200) }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      description: "PowerPoint, PDF, Word or Excel. To update it, upload the new version here: the download link stays the same.",
      options: { accept: ".pptx,.ppt,.pdf,.docx,.doc,.xlsx,.xls" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "module", title: "Related training module (optional)", type: "reference", to: [{ type: "trainingModule" }], description: "The module page shows a link to this file." }),
    defineField({ name: "duration", title: "Session length (optional)", type: "string", description: "For example: 90 minutes." }),
    defineField({ name: "audience", title: "Who it's for (optional)", type: "string", description: "For example: Consultants · 3+ months on desk." }),
    defineField({ name: "order", title: "Display order", type: "number", validation: (r) => r.integer() }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", label: "label", kind: "kind", file: "file.asset.originalFilename" },
    prepare: ({ title, label, kind, file }) => ({
      title,
      subtitle: [label, LIBRARY_KINDS.find((k) => k.value === kind)?.title, file ? undefined : "No file yet"].filter(Boolean).join(" · "),
    }),
  },
});
