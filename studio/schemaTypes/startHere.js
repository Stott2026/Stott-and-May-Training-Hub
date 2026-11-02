import { defineArrayMember, defineField, defineType } from "sanity";
import { RocketIcon } from "@sanity/icons/Rocket";

// The "Start here" path on the home page: a recommended order through the training for new
// starters, step by step, with forms to practise with. There is only one of these.
export const startHere = defineType({
  name: "startHere",
  title: "Start here path",
  type: "document",
  icon: RocketIcon,
  fields: [
    defineField({ name: "title", title: "Heading", type: "string", initialValue: "Start here", validation: (r) => r.required().max(60) }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3, description: "One or two sentences on who the path is for and how to use it.", validation: (r) => r.max(240) }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      description: "In the order to do them. Four to six steps read best. Leave empty to hide the path.",
      of: [
        defineArrayMember({
          type: "object",
          name: "pathStep",
          fields: [
            { name: "timing", title: "When", type: "string", description: "For example: Week 1, or Months 2 to 3.", validation: (r) => r.required().max(24) },
            { name: "title", title: "Step title", type: "string", description: "For example: Know how we work.", validation: (r) => r.required().max(50) },
            { name: "note", title: "Why this step (optional)", type: "string", description: "One line on what they'll be able to do afterwards.", validation: (r) => r.max(160) },
            {
              name: "modules",
              title: "Modules",
              type: "array",
              description: "The training to do in this step, in order. Up to four.",
              of: [{ type: "reference", to: [{ type: "trainingModule" }], options: { filter: 'category->area != "managers"' } }],
              validation: (r) => r.required().min(1).max(4).unique(),
            },
            {
              name: "forms",
              title: "Forms to practise with (optional)",
              type: "array",
              description: "Up to three forms from the Documents & Forms tab to use on the desk during this step.",
              of: [{ type: "reference", to: [{ type: "formDocument" }] }],
              validation: (r) => r.max(3).unique(),
            },
          ],
          preview: {
            select: { timing: "timing", title: "title", m0: "modules.0.title", m1: "modules.1.title", m2: "modules.2.title" },
            prepare: ({ timing, title, m0, m1, m2 }) => ({ title: `${timing} · ${title}`, subtitle: [m0, m1, m2].filter(Boolean).join(", ") }),
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Start here path" }) },
});
