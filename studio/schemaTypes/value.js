import { defineField, defineType } from "sanity";
import { HeartIcon } from "@sanity/icons/Heart";
import { ICON_OPTIONS } from "./options.js";

export const value = defineType({
  name: "value",
  title: "Company value",
  type: "document",
  icon: HeartIcon,
  fields: [
    defineField({ name: "title", title: "Value", type: "string", description: "For example: Accountability.", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "icon", title: "Icon", type: "string", options: { list: ICON_OPTIONS }, validation: (r) => r.required() }),
    defineField({ name: "order", title: "Display order", type: "number", description: "Lower numbers appear first.", validation: (r) => r.required().integer() }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "description" } },
});
