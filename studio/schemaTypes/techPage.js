import { defineArrayMember, defineField, defineType } from "sanity";
import { DesktopIcon } from "@sanity/icons/Desktop";

const toolRefs = (title, description) => ({ name: "tools", title, type: "array", description, of: [{ type: "reference", to: [{ type: "techTool" }] }] });

// The Technology tab: the day-one rule, the daily workflow, the daily Big 5 check, the
// which-tool-does-what map and the 12-week programme. The tools themselves are Tech tools.
// There is only one of these.
export const techPage = defineType({
  name: "techPage",
  title: "Technology page",
  type: "document",
  icon: DesktopIcon,
  groups: [
    { name: "top", title: "Top of the page", default: true },
    { name: "daily", title: "Daily use" },
    { name: "programme", title: "12-week programme" },
  ],
  fields: [
    defineField({ name: "title", title: "Main heading", type: "string", group: "top", initialValue: "Technology", validation: (r) => r.required().max(60) }),
    defineField({ name: "titleAccent", title: "Heading, second line (optional)", type: "string", group: "top", description: "Shown under the main heading in the accent colour, the brand's two-tone headline. For example: Learn it once, use it every day.", validation: (r) => r.max(60) }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3, group: "top", validation: (r) => r.max(300) }),
    defineField({ name: "ruleTitle", title: "The rule for day one", type: "string", group: "top", description: "For example: Bullhorn is the single source of truth.", validation: (r) => r.max(80) }),
    defineField({ name: "ruleText", title: "The rule, explained", type: "string", group: "top", validation: (r) => r.max(160) }),
    defineField({ name: "ruleTool", title: "The tool everything feeds", type: "reference", to: [{ type: "techTool" }], group: "top" }),

    defineField({ name: "bigFiveIntro", title: "Daily Big 5 check: introduction", type: "string", group: "daily", description: "The checks themselves come from each tool's Daily check, in the tools' display order.", validation: (r) => r.max(200) }),
    defineField({
      name: "workflow",
      title: "Daily workflow",
      type: "array",
      group: "daily",
      description: "The steps of a recruiter's day, in order.",
      of: [defineArrayMember({
        type: "object",
        name: "workflowStep",
        fields: [
          { name: "title", title: "Step", type: "string", validation: (r) => r.required().max(40) },
          { name: "text", title: "What it means", type: "string", validation: (r) => r.max(120) },
          { name: "stage", title: "Part of the day", type: "string", options: { list: [{ title: "Plan", value: "plan" }, { title: "Prospect and engage", value: "prospect" }, { title: "Cover jobs and log", value: "cover" }], layout: "radio", direction: "horizontal" }, initialValue: "plan" },
          toolRefs("Tools used"),
        ],
        preview: { select: { title: "title", subtitle: "text" } },
      })],
    }),
    defineField({ name: "mapNote", title: "Which tool does what: note (optional)", type: "string", group: "daily", description: "Shown under the map, for example a reminder to agree one primary tool per signal.", validation: (r) => r.max(200) }),

    defineField({ name: "programmeIntro", title: "Programme introduction", type: "text", rows: 2, group: "programme", validation: (r) => r.max(240) }),
    defineField({
      name: "phases",
      title: "Phases",
      type: "array",
      group: "programme",
      of: [defineArrayMember({
        type: "object",
        name: "phase",
        fields: [
          { name: "weeks", title: "Weeks", type: "string", description: "For example: Weeks 1–4.", validation: (r) => r.required().max(20) },
          { name: "title", title: "Phase", type: "string", validation: (r) => r.required().max(30) },
          { name: "text", title: "What happens", type: "string", validation: (r) => r.max(160) },
          toolRefs("Tools learnt in this phase (optional)"),
          { name: "gate", title: "Gate to pass", type: "string", description: "How the phase is signed off.", validation: (r) => r.max(160) },
        ],
        preview: { select: { title: "title", subtitle: "weeks" } },
      })],
    }),
    defineField({
      name: "rhythm",
      title: "Weekly rhythm (optional)",
      type: "array",
      group: "programme",
      of: [defineArrayMember({
        type: "object",
        name: "touchpoint",
        fields: [
          { name: "label", title: "Label", type: "string", description: "For example: Learn.", validation: (r) => r.max(20) },
          { name: "title", title: "Title", type: "string", validation: (r) => r.required().max(40) },
          { name: "text", title: "Text", type: "string", validation: (r) => r.max(120) },
        ],
        preview: { select: { title: "title", subtitle: "label" } },
      })],
    }),
    defineField({
      name: "tracks",
      title: "Divisional tracks (optional)",
      type: "array",
      group: "programme",
      of: [defineArrayMember({
        type: "object",
        name: "track",
        fields: [
          { name: "division", title: "Division", type: "string", validation: (r) => r.required().max(60) },
          { name: "emphasis", title: "Emphasis", type: "string", validation: (r) => r.max(160) },
        ],
        preview: { select: { title: "division", subtitle: "emphasis" } },
      })],
    }),
    defineField({ name: "relatedModule", title: "Related training module (optional)", type: "reference", to: [{ type: "trainingModule" }], group: "programme", description: "For example: Systems/RecTech." }),
  ],
  preview: { prepare: () => ({ title: "Technology page" }) },
});
