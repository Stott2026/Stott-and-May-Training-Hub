import { defineArrayMember, defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons/Star";
import { BADGE_RULES, ICON_OPTIONS } from "./options.js";

// Badges, levels and points: the hub's gamification. There is only one of these.
// Learners earn points for finishing sections, modules, quick checks and the quiz, move up
// the levels as their points grow, and earn a badge when they reach each achievement.
export const rewards = defineType({
  name: "rewards",
  title: "Badges and levels",
  type: "document",
  icon: StarIcon,
  groups: [{ name: "levels", title: "Levels and points", default: true }, { name: "badges", title: "Badges" }],
  fields: [
    defineField({ name: "title", title: "Heading on the home page", type: "string", group: "levels", initialValue: "Your achievements", validation: (r) => r.required().max(40) }),
    defineField({
      name: "points",
      title: "Points for each action",
      type: "object",
      group: "levels",
      options: { columns: 2 },
      fields: [
        { name: "section", title: "Finishing a section", type: "number", initialValue: 10, validation: (r) => r.required().min(0).integer() },
        { name: "module", title: "Finishing a whole module (bonus)", type: "number", initialValue: 50, validation: (r) => r.required().min(0).integer() },
        { name: "quickCheck", title: "A quick check answered right", type: "number", initialValue: 5, validation: (r) => r.required().min(0).integer() },
        { name: "quizAnswer", title: "Each right answer in the best quiz round", type: "number", initialValue: 5, validation: (r) => r.required().min(0).integer() },
        { name: "activity", title: "Finishing an activity (Put it in order or Flip cards)", type: "number", initialValue: 15, validation: (r) => r.min(0).integer() },
      ],
    }),
    defineField({
      name: "levels",
      title: "Levels",
      type: "array",
      group: "levels",
      description: "From the first level up. The first level should start at 0 points.",
      of: [
        defineArrayMember({
          type: "object",
          name: "level",
          fields: [
            { name: "title", title: "Level name", type: "string", validation: (r) => r.required().max(30) },
            { name: "points", title: "Points needed", type: "number", validation: (r) => r.required().min(0).integer() },
          ],
          preview: { select: { title: "title", points: "points" }, prepare: ({ title, points }) => ({ title, subtitle: `${points ?? 0} points` }) },
        }),
      ],
      validation: (r) => r.required().min(2).max(8),
    }),
    defineField({
      name: "badges",
      title: "Badges",
      type: "array",
      group: "badges",
      description: "Each badge is earned for one achievement. Remove a badge to stop using it.",
      of: [
        defineArrayMember({
          type: "object",
          name: "badge",
          fields: [
            { name: "rule", title: "Earned when someone…", type: "string", options: { list: BADGE_RULES }, validation: (r) => r.required() },
            { name: "title", title: "Badge name", type: "string", validation: (r) => r.required().max(30) },
            { name: "description", title: "How to earn it", type: "string", description: "Shown under the badge, for example: Finish a whole module.", validation: (r) => r.required().max(80) },
            { name: "icon", title: "Icon", type: "string", options: { list: ICON_OPTIONS }, initialValue: "award" },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
      validation: (r) => r.custom((badges = []) => {
        const rules = badges.map((b) => b.rule).filter(Boolean);
        return new Set(rules).size === rules.length || "Two badges use the same achievement.";
      }),
    }),
  ],
  preview: { prepare: () => ({ title: "Badges and levels" }) },
});
