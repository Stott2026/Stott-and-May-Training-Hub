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
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3, description: "The paragraph under the main heading." }),
  ],
  preview: { prepare: () => ({ title: "Library page" }) },
});
