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
    defineField({ name: "titleAccent", title: "Heading, second line (optional)", type: "string", description: "Shown under the main heading in the accent colour, the brand's two-tone headline. Keep it short.", validation: (r) => r.max(60) }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3, description: "The paragraph under the main heading." }),
  ],
  preview: { prepare: () => ({ title: "Managers page" }) },
});
