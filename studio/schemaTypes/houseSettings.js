import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

// The words on the House's front door and in its hallway. There is only one of these.
// Used by the House (a separate app, stott2026/the-house), not by the Training Hub.
const line = (name, title, description, max, initialValue) =>
  defineField({ name, title, type: "string", description, initialValue, validation: (r) => r.required().max(max) });

export const houseSettings = defineType({
  name: "houseSettings",
  title: "House settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "door", title: "Front door" },
    { name: "hallway", title: "Hallway" },
    { name: "may", title: "May" },
  ],
  fields: [
    { ...line("houseName", "House name", "Shown in the top bar, browser tabs and sign-in pages.", 30, "The House"), group: "general" },

    { ...line("doorEyebrow", "Small label above the heading", "For example: Welcome to.", 30), group: "door" },
    { ...line("doorHeading", "Heading", "For example: The House.", 30), group: "door" },
    { ...line("doorHeadingAccent", "Heading, second line", "Shown in aquamarine, for example: that Stott built.", 40), group: "door" },
    { ...line("doorIntro", "Introduction", "A sentence or two under the heading.", 240), group: "door" },
    { ...line("doorButton", "Button", "For example: Step inside.", 24), group: "door" },

    defineField({
      name: "hallTheme",
      title: "Hallway look",
      type: "string",
      group: "hallway",
      description: "Light matches the Training Hub. Dark carries on the night-time look of the front door. Changes show in the House within a minute or so of publishing.",
      options: { list: [{ title: "Light", value: "light" }, { title: "Dark", value: "dark" }], layout: "radio", direction: "horizontal" },
      initialValue: "light",
    }),
    { ...line("hallEyebrow", "Small label above the heading", "For example: Welcome home.", 30), group: "hallway" },
    defineField({
      name: "hallImage",
      title: "Person beside the rooms (optional)",
      type: "image",
      group: "hallway",
      description: "A cut-out photo of a person (on a clear background, PNG or WebP), shown rising out of a brand shape behind the doorways, as in the brand guidelines. Only shown on wider screens, and treated as decoration (screen readers skip it). Leave it empty to show no one.",
    }),
    { ...line("hallHeading", "Heading", "For example: Everything you need,", 40), group: "hallway" },
    { ...line("hallHeadingAccent", "Heading, second line", "Shown in teal, for example: under one roof.", 40), group: "hallway" },
    { ...line("hallIntro", "Introduction", "A sentence under the heading.", 200), group: "hallway" },
    { ...line("roomsEyebrow", "Rooms: small label", "For example: The rooms.", 30), group: "hallway" },
    { ...line("roomsHeading", "Rooms: heading", "For example: Where would you like to go?", 60), group: "hallway" },
    { ...line("extensionName", "Coming soon card: name", "The card for tools still to come, for example: The Extension.", 30), group: "hallway" },
    { ...line("extensionText", "Coming soon card: text", "For example: New tools move in here as soon as they're built.", 120), group: "hallway" },

    // May's card in the hallway. It only shows when May is switched on (an Anthropic key on the House's server).
    { ...line("mayRole", "May: subtitle", "Under her name, for example: Lives here. Knows every room.", 50), group: "may" },
    { ...line("mayGreeting", "May: greeting", "What she says first.", 240), group: "may" },
  ],
  preview: { prepare: () => ({ title: "House settings" }) },
});
