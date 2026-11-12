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
    defineField({ name: "icon", title: "Icon", type: "string", options: { list: ICON_OPTIONS }, initialValue: "house", validation: (r) => r.required() }),
    defineField({ name: "accent", title: "Doorway colour", type: "string", options: { list: ACCENT_OPTIONS, layout: "radio" }, initialValue: "brand" }),
    defineField({ name: "order", title: "Display order", type: "number", description: "Rooms are shown smallest number first.", validation: (r) => r.integer() }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "roomName", subtitle: "toolName" } },
});
