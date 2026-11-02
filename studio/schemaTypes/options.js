// Choices shown to editors in drop-down lists.
// The icon names must match the ones registered in web/src/components/icons.jsx.
export const ICON_OPTIONS = [
  { title: "Award ribbon", value: "award" },
  { title: "Crown", value: "crown" },
  { title: "Flame", value: "flame" },
  { title: "Footprints", value: "footprints" },
  { title: "Medal", value: "medal" },
  { title: "Star", value: "star" },
  { title: "Lightning", value: "zap" },
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
  { title: "Presentation", value: "presentation" },
  { title: "Clipboard", value: "clipboard-list" },
  { title: "Document", value: "file-text" },
  { title: "Checklist", value: "list-checks" },
  { title: "Library", value: "library" },
  { title: "Briefcase", value: "briefcase" },
  { title: "Phone", value: "phone" },
  { title: "Calendar", value: "calendar" },
  { title: "File with tick", value: "file-check" },
  { title: "Search", value: "search" },
  { title: "Message", value: "message-circle" },
  { title: "Bar chart", value: "chart-column" },
  { title: "Banknote", value: "banknote" },
  { title: "Triangle warning", value: "triangle-alert" },
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

// The achievements the hub can spot for badges. Each badge in "Badges and levels" picks one.
// The hub's code knows how to check each of these (web/src/lib/achievements.jsx), so add new ones there too.
export const BADGE_RULES = [
  { title: "Finish a first section", value: "first-section" },
  { title: "Finish a first module", value: "first-module" },
  { title: "Finish five modules", value: "five-modules" },
  { title: "Finish ten modules", value: "ten-modules" },
  { title: "Finish every module", value: "all-modules" },
  { title: "Finish a Start here step", value: "path-step" },
  { title: "Finish the whole Start here path", value: "path-complete" },
  { title: "Get ten quick checks right", value: "quick-checks" },
  { title: "Finish a first activity", value: "first-activity" },
  { title: "Finish five activities", value: "five-activities" },
  { title: "Finish a round of the quiz", value: "quiz-taken" },
  { title: "Full marks in a round of the quiz", value: "quiz-ace" },
  { title: "Learn on three working days in a row", value: "streak-3" },
  { title: "Learn on five working days in a row", value: "streak-5" },
  { title: "Set up a first tool (every item on its checklist)", value: "tool-setup" },
  { title: "Set up all the core systems", value: "core-setup" },
  { title: "Do the daily Big 5 check on five days", value: "big-five" },
];

// The jobs a tool can do, for the "Which tool does what" map on the Technology page.
export const TOOL_CAPABILITIES = [
  { title: "Find contacts", value: "contacts" },
  { title: "Find candidates", value: "candidates" },
  { title: "Find jobs", value: "jobs" },
  { title: "Numbers or emails", value: "numbers" },
  { title: "Market intel", value: "intel" },
  { title: "Outreach", value: "outreach" },
  { title: "Daily alerts", value: "alerts" },
];
