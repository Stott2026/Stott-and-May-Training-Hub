// Choices shown to editors in drop-down lists.
// The icon names must match the ones registered in web/src/components/icons.jsx.
export const ICON_OPTIONS = [
  { title: "Person", value: "user" },
  { title: "People", value: "users" },
  { title: "Handshake", value: "handshake" },
  { title: "Heart and handshake", value: "heart-handshake" },
  { title: "Folders", value: "folder-kanban" },
  { title: "Trending up", value: "trending-up" },
  { title: "Target", value: "target" },
  { title: "Microphone", value: "mic" },
  { title: "Badge with tick", value: "badge-check" },
  { title: "Scales", value: "scale" },
  { title: "Puzzle piece", value: "puzzle" },
  { title: "Brain", value: "brain" },
  { title: "Timer", value: "timer" },
  { title: "Clock", value: "clock" },
  { title: "Megaphone", value: "megaphone" },
  { title: "Rocket", value: "rocket" },
  { title: "Speech bubbles", value: "messages" },
  { title: "Laptop", value: "laptop" },
  { title: "Light bulb", value: "lightbulb" },
  { title: "Sparkles", value: "sparkles" },
  { title: "Compass", value: "compass" },
  { title: "Shield with tick", value: "shield-check" },
  { title: "Trophy", value: "trophy" },
  { title: "Open book", value: "book-open" },
  { title: "Graduation cap", value: "graduation-cap" },
];

export const ACCENT_OPTIONS = [
  { title: "Teal to aquamarine (main brand)", value: "brand" },
  { title: "Teal to sky blue", value: "sky" },
  { title: "Teal to lime", value: "lime" },
];

// A list of short text items, e.g. tactics or phrases. Editors can drag to reorder.
export const textList = (name, title, description) => ({
  name,
  title,
  description,
  type: "array",
  of: [{ type: "text", rows: 2 }],
});
