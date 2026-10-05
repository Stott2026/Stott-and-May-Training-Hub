import { defineField, defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";

const LETTERS = ["A", "B", "C", "D"];

export const quizQuestion = defineType({
  name: "quizQuestion",
  title: "Quiz question",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "options",
      title: "Answer options",
      type: "array",
      of: [{ type: "string" }],
      description: "Exactly four answers, shown as A, B, C and D in this order.",
      validation: (r) => r.required().length(4),
    }),
    defineField({
      name: "correct",
      title: "Correct answer",
      type: "number",
      options: { list: LETTERS.map((l, i) => ({ title: `Option ${l}`, value: i })), layout: "radio", direction: "horizontal" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "explanation",
      title: "Explanation",
      type: "text",
      rows: 3,
      description: "Shown after the learner answers, whether they got it right or wrong.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "module",
      title: "Related module (optional)",
      type: "reference",
      to: [{ type: "trainingModule" }],
      description: "Link the question to a module to show it as a quick check inside that module.",
    }),
    defineField({
      name: "afterSection",
      title: "Show after section number (optional)",
      type: "number",
      description: "For example 2 shows it at the end of the module's second section. Leave empty to show it at the end of the module.",
      hidden: ({ document }) => !document?.module,
      validation: (r) => r.integer().min(1),
    }),
  ],
  preview: {
    select: { title: "question", module: "module.title" },
    prepare: ({ title, module }) => ({ title, subtitle: module ? `Linked to ${module}` : "General question" }),
  },
});
