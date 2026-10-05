import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons/Tag";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "title", title: "Category name", type: "string", description: "For example: Delivery, or Business Development.", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Web address", type: "slug", options: { source: "title" }, description: "Click Generate.", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description (optional)", type: "text", rows: 2 }),
    defineField({ name: "order", title: "Display order", type: "number", validation: (r) => r.integer() }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
