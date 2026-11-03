import { defineField, defineType } from "sanity";
import { CheckmarkCircleIcon } from "@sanity/icons/CheckmarkCircle";

// The words at the top of the hub's Compliance page. There is only one of these.
export const compliancePage = defineType({
  name: "compliancePage",
  title: "Compliance page",
  type: "document",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({ name: "title", title: "Main heading", type: "string", initialValue: "Compliance", validation: (r) => r.required() }),
    defineField({ name: "titleAccent", title: "Heading, second line (optional)", type: "string", description: "Shown under the main heading in the accent colour. Keep it short.", validation: (r) => r.max(60) }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3, description: "The paragraph under the main heading." }),
    defineField({ name: "note", title: "Note under the courses (optional)", type: "text", rows: 2, description: "For example, who to contact with questions about mandatory training." }),
  ],
  preview: { prepare: () => ({ title: "Compliance page" }) },
});
