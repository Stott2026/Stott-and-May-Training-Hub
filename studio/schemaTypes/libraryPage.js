import { defineField, defineType } from "sanity";
import { DocumentsIcon } from "@sanity/icons/Documents";

// The words at the top of the hub's Library page. There is only one of these.
export const libraryPage = defineType({
  name: "libraryPage",
  title: "Library page",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({ name: "title", title: "Main heading", type: "string", initialValue: "Library", validation: (r) => r.required() }),
    defineField({ name: "titleAccent", title: "Heading, second line (optional)", type: "string", description: "Shown under the main heading in the accent colour, the brand's two-tone headline. Keep it short.", validation: (r) => r.max(60) }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3, description: "The paragraph under the main heading." }),
  ],
  preview: { prepare: () => ({ title: "Library page" }) },
});
