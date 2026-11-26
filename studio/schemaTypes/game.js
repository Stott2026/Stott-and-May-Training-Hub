import { defineArrayMember, defineField, defineType } from "sanity";
import { JoystickIcon } from "@sanity/icons/Joystick";
import { ACCENT_OPTIONS, ICON_OPTIONS } from "./options.js";

// One game in the Games Room (agreed with Ian, November 2026): "challenge May". May plays a
// part or sets the challenge, the learner answers, and she scores them against the hub's training.
// The kind of game decides how it plays; each kind is built in the hub (web/src/pages/GamePage.jsx
// and server/games.js), so a new kind needs a developer, but new scenarios don't.
export const GAME_KINDS = [
  { title: "Handle the objection: May plays someone with an objection, you answer, she scores you out of 10", value: "objection" },
  { title: "Get the meeting: a cold call of up to five turns; May agrees to meet or hangs up, then scores the call", value: "meeting" },
  { title: "Rapid fire (coming next)", value: "rapid" },
  { title: "Spot the mistake (coming next)", value: "mistake" },
  { title: "Counter-offer (coming next)", value: "counter" },
];

export const game = defineType({
  name: "game",
  title: "Game",
  type: "document",
  icon: JoystickIcon,
  fields: [
    defineField({ name: "title", title: "Game name", type: "string", description: "For example: Handle the objection.", validation: (r) => r.required().max(40) }),
    defineField({ name: "slug", title: "Web address", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "kind", title: "Kind of game", type: "string", options: { list: GAME_KINDS }, validation: (r) => r.required() }),
    defineField({ name: "comingSoon", title: "Coming soon", type: "boolean", initialValue: false, description: "Tick to show the game's card as coming soon, so it can't be played yet." }),
    defineField({ name: "tagline", title: "One line on the card", type: "string", description: "For example: May pushes back. You win her round.", validation: (r) => r.required().max(90) }),
    defineField({ name: "intro", title: "How to play", type: "text", rows: 3, description: "Shown before the game starts.", validation: (r) => r.max(300) }),
    defineField({ name: "image", title: "Picture (optional)", type: "image", options: { hotspot: true }, description: "Shown at the top of the game's card and its start screen. Without one, the hub shows a drawing for the kind of game. A wide picture works best (about 12 by 7)." }),
    defineField({ name: "icon", title: "Icon", type: "string", options: { list: ICON_OPTIONS }, initialValue: "target" }),
    defineField({ name: "accent", title: "Colour", type: "string", options: { list: ACCENT_OPTIONS, layout: "radio" }, initialValue: "brand" }),
    defineField({ name: "order", title: "Display order", type: "number", description: "Games are shown smallest number first.", validation: (r) => r.integer() }),
    defineField({ name: "rounds", title: "Challenges per game", type: "number", initialValue: 3, description: "Handle the objection: how many challenges one game has, picked at random from the list below, each scored out of 10. Get the meeting is always one call, picked at random.", validation: (r) => r.min(1).max(5).integer() }),
    defineField({
      name: "scenarios",
      title: "Challenges",
      type: "array",
      description: "The more there are, the less often people see the same one. Keep them fictional: no real names of candidates, clients or colleagues.",
      of: [
        defineArrayMember({
          type: "object",
          name: "gameScenario",
          fields: [
            { name: "who", title: "Who May plays", type: "string", description: "For example: Head of Engineering at a fast-growing fintech. Don't use a real person or company.", validation: (r) => r.required().max(80) },
            { name: "line", title: "What they say first", type: "text", rows: 2, description: "Handle the objection: the objection, in their words (for example: Your fees are too high). Get the meeting: how they answer the phone (for example: Yes? Who's this?).", validation: (r) => r.required().max(300) },
            { name: "background", title: "Background for May (optional)", type: "text", rows: 2, description: "Anything May should know to play the part, which the learner doesn't see. For example: They've had two bad agencies this year. For Get the meeting, include what would make them want to meet.", validation: (r) => r.max(400) },
            { name: "lookUp", title: "Words to look up in the hub", type: "string", description: "One to three words May searches the training for, to mark the answer against it. For example: fees objection.", validation: (r) => r.max(40) },
          ],
          preview: { select: { title: "line", subtitle: "who" } },
        }),
      ],
    }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "tagline" } },
});
