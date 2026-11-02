import { defineArrayMember, defineField, defineType } from "sanity";
import { PlugIcon } from "@sanity/icons/Plug";
import { ACCENT_OPTIONS, ICON_OPTIONS, TOOL_CAPABILITIES } from "./options.js";

// One product in the Technology section, such as Bullhorn or Sourcewhale, with its own page:
// what it's for, what you'll learn, best practice, a set-up checklist and the daily check.
export const techTool = defineType({
  name: "techTool",
  title: "Tech tool",
  type: "document",
  icon: PlugIcon,
  groups: [
    { name: "about", title: "About", default: true },
    { name: "learn", title: "Learning" },
    { name: "habits", title: "Set-up and daily use" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "about", validation: (r) => r.required().max(40) }),
    defineField({ name: "slug", title: "Web address", type: "slug", group: "about", options: { source: "name", maxLength: 40 }, description: "Click Generate.", validation: (r) => r.required() }),
    defineField({ name: "role", title: "What it is, in a few words", type: "string", group: "about", description: "For example: System of record.", validation: (r) => r.required().max(30) }),
    defineField({ name: "summary", title: "Short description", type: "string", group: "about", description: "One line on the tool's card.", validation: (r) => r.required().max(120) }),
    defineField({ name: "why", title: "Why it matters (optional)", type: "text", rows: 3, group: "about", description: "A short paragraph at the top of the tool's page." }),
    defineField({ name: "core", title: "One of the core systems", type: "boolean", group: "about", initialValue: false, description: "Core systems are in the 12-week programme and are shown first." }),
    defineField({ name: "family", title: "Part of (optional)", type: "string", group: "about", description: "For example: Bullhorn, for Analytics and Sourcebreaker." }),
    defineField({ name: "week", title: "When it's taught (optional)", type: "string", group: "about", description: "For example: Week 1, then daily use.", validation: (r) => r.max(40) }),
    defineField({ name: "icon", title: "Icon", type: "string", group: "about", options: { list: ICON_OPTIONS }, initialValue: "laptop" }),
    defineField({ name: "logo", title: "Logo (optional)", type: "image", group: "about", description: "The product's logo. Shown instead of the icon when there is one; a wide logo on a white or clear background works best.", fields: [{ name: "alt", title: "Image description", type: "string" }] }),
    defineField({ name: "accent", title: "Colour", type: "string", group: "about", options: { list: ACCENT_OPTIONS, layout: "radio" }, initialValue: "brand" }),
    defineField({ name: "order", title: "Display order", type: "number", group: "about", validation: (r) => r.integer() }),
    defineField({ name: "capabilities", title: "Jobs it does", type: "array", group: "about", of: [{ type: "string" }], options: { list: TOOL_CAPABILITIES, layout: "grid" }, description: "For the Which tool does what map." }),

    defineField({ name: "learn", title: "What you'll learn (optional)", type: "array", group: "learn", of: [{ type: "string" }], description: "The topics covered in the programme, one per line." }),
    defineField({
      name: "bestPractice",
      title: "Best practice",
      type: "array",
      group: "learn",
      description: "The top five things to do in this tool, with how often. Also used for the flip-card practice on its page.",
      of: [defineArrayMember({
        type: "object",
        name: "practice",
        fields: [
          { name: "title", title: "What", type: "string", description: "For example: Hotlists.", validation: (r) => r.required().max(40) },
          { name: "when", title: "How often", type: "string", description: "For example: Daily, Every job, Ongoing.", validation: (r) => r.max(30) },
          { name: "text", title: "How", type: "string", validation: (r) => r.required().max(160) },
        ],
        preview: { select: { title: "title", subtitle: "when" } },
      })],
      validation: (r) => r.max(8),
    }),
    defineField({
      name: "links",
      title: "Vendor training links (optional)",
      type: "array",
      group: "learn",
      of: [defineArrayMember({
        type: "object",
        name: "trainingLink",
        fields: [
          { name: "label", title: "Label", type: "string", validation: (r) => r.required().max(40) },
          { name: "url", title: "Web address", type: "url", validation: (r) => r.required().uri({ scheme: ["https"] }) },
        ],
        preview: { select: { title: "label", subtitle: "url" } },
      })],
    }),

    defineField({ name: "setup", title: "Set it up once", type: "array", group: "habits", of: [{ type: "string" }], description: "Alerts, searches and set-up to do once. Learners tick each one off." }),
    defineField({ name: "dailyCheck", title: "Daily check (optional)", type: "string", group: "habits", description: "Its part of the daily Big 5 check, for example: Check saved search alert results.", validation: (r) => r.max(100) }),
    defineField({ name: "measures", title: "What we track (optional)", type: "string", group: "habits", description: "For example: Active sequences per consultant, reply rate, replies logged.", validation: (r) => r.max(200) }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "logo" } },
});
