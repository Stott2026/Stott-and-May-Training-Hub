import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons/Home";
import { ACCENT_OPTIONS, ICON_OPTIONS } from "./options.js";

// One room in the House: a Stott and May tool, shown as a doorway card in the House's hallway.
// Used by the House (a separate app, stott2026/the-house), not by the Training Hub.
export const houseRoom = defineType({
  name: "houseRoom",
  title: "House room",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({ name: "roomName", title: "Room name", type: "string", description: "The house-style name, for example: The Study.", validation: (r) => r.required().max(30) }),
    defineField({ name: "toolName", title: "Tool name", type: "string", description: "The tool's own name, shown just above the room name, for example: Training Hub.", validation: (r) => r.required().max(40) }),
    defineField({ name: "description", title: "What it does", type: "string", description: "One line on the room's card.", validation: (r) => r.required().max(120) }),
    defineField({ name: "url", title: "Web address", type: "url", description: "Where \"Go in\" takes people. Open the tool in your browser and copy the address from the address bar. Leave it empty while the tool isn't ready, and the room shows as coming soon.", validation: (r) => r.uri({ scheme: ["https"] }) }),
    defineField({ name: "comingSoon", title: "Coming soon", type: "boolean", initialValue: false, description: "Tick to show this room's door as coming soon, even though it has a web address (for example while its content is being checked). Untick to open the door." }),
    defineField({ name: "icon", title: "Icon", type: "string", options: { list: ICON_OPTIONS }, initialValue: "house", validation: (r) => r.required() }),
    defineField({ name: "accent", title: "Doorway colour", type: "string", options: { list: ACCENT_OPTIONS, layout: "radio" }, initialValue: "brand" }),
    defineField({
      name: "wing",
      title: "Wing",
      type: "string",
      description: "Which part of the House this room is in. The West and East Wings' names are in House settings, under Wings. Rooms with nothing chosen go in the main house.",
      options: {
        list: [
          { title: "Main house (for everyone)", value: "main" },
          { title: "West Wing (clients)", value: "west" },
          { title: "East Wing (candidates)", value: "east" },
        ],
        layout: "radio",
      },
      initialValue: "main",
    }),
    defineField({ name: "order", title: "Display order", type: "number", description: "Rooms are shown smallest number first.", validation: (r) => r.integer() }),
    // May, the guide in the House's hallway, reads this to explain the room and send people to it
    // (agreed with Ian, 20 November 2026). Not shown on the doorway card.
    defineField({
      name: "mayNotes",
      title: "What May knows",
      type: "text",
      rows: 12,
      description:
        "Optional. What May, the guide in the hallway, should know about this tool: what it does, what people use it for, its main features and any limits. Plain sentences or short lines starting with \"- \". She uses it to answer questions and send people to the right room. Not shown on the doorway card.",
      validation: (r) => r.max(3000),
    }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "roomName", subtitle: "toolName" } },
});
