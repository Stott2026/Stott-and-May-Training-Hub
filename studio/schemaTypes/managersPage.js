import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons/Case";

// The words at the top of the hub's Managers page. There is only one of these.
export const managersPage = defineType({
  name: "managersPage",
  title: "Managers page",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({ name: "title", title: "Main heading", type: "string", initialValue: "For managers", validation: (r) => r.required() }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3, description: "The paragraph under the main heading." }),
  ],
  preview: { prepare: () => ({ title: "Managers page" }) },
});
