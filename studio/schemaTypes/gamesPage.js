import { defineField, defineType } from "sanity";
import { JoystickIcon } from "@sanity/icons/Joystick";

// The Games Room page (agreed with Ian, November 2026): its heading, and the names of the three
// levels May can play at. There is only one of these. The games themselves are under "Games".
const level = (name, title, example) =>
  defineField({
    name,
    title,
    type: "object",
    options: { collapsible: true, collapsed: false },
    fields: [
      { name: "name", title: "Name", type: "string", description: `For example: ${example.name}.`, validation: (r) => r.max(20) },
      { name: "line", title: "One line", type: "string", description: `For example: ${example.line}`, validation: (r) => r.max(80) },
    ],
  });

export const gamesPage = defineType({
  name: "gamesPage",
  title: "Games Room page",
  type: "document",
  icon: JoystickIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Small label above the heading", type: "string", description: "For example: The Games Room.", validation: (r) => r.max(30) }),
    defineField({ name: "title", title: "Heading", type: "string", description: "For example: Challenge May.", validation: (r) => r.required().max(40) }),
    defineField({ name: "titleAccent", title: "Heading, second line", type: "string", description: "Shown in the accent colour, for example: Think on your feet.", validation: (r) => r.max(40) }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 2, validation: (r) => r.max(240) }),
    defineField({ name: "heroImage", title: "Header picture (optional)", type: "image", options: { hotspot: true }, description: "A cut-out photo of a person (clear background), shown in the brand shape beside the heading. Until one is added, a photo from the brand guidelines shows." }),
    level("friendly", "Level 1", { name: "Friendly", line: "May plays nice and marks kindly." }),
    level("tough", "Level 2", { name: "Tough", line: "Real pushback, marked like a manager would." }),
    level("brutal", "Level 3", { name: "Brutal", line: "The hardest buyer you'll meet. No easy marks." }),
    defineField({ name: "privacyNote", title: "Reminder under the answer box", type: "string", description: "For example: Keep it fictional: no real names or details.", validation: (r) => r.max(120) }),
  ],
  preview: { prepare: () => ({ title: "Games Room page" }) },
});
