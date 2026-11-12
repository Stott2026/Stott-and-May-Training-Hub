// One-off import: the House's settings and its first four rooms, as DRAFTS to review and publish
// in the Studio (The House). Wording as agreed with Ian in November 2026 (see the House's design concept).
//
// Run from the project root:  npm run import:house -- --dry-run   (check only)
//                             npm run import:house                (import)
// Safe to re-run: anything that already exists (draft or published) is left alone.
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");

const settings = {
  _id: "drafts.houseSettings",
  _type: "houseSettings",
  houseName: "The House",
  doorEyebrow: "Welcome to",
  doorHeading: "The House",
  doorHeadingAccent: "that Stott built.",
  doorIntro: "Every Stott and May tool, under one roof. Step through the front door to find the Training Hub, our contract tools and May, your guide to all of it.",
  doorButton: "Step inside",
  hallEyebrow: "Welcome home",
  hallHeading: "Everything you need,",
  hallHeadingAccent: "under one roof.",
  hallIntro: "Pick a room to get started, or ask May to point you in the right direction.",
  roomsEyebrow: "The rooms",
  roomsHeading: "Where would you like to go?",
  extensionName: "The Extension",
  extensionText: "New tools move in here as soon as they're built.",
  mayRole: "Lives here. Knows every room.",
  mayGreeting: "Hi, I'm May. Tell me what you need to do and I'll point you to the right room, or ask me anything about the tools here.",
};

// [id, room name, tool name, what it does, icon, colour, web address]
// Addresses are each tool's live Railway address (November 2026). Change them in the Studio when a tool moves.
const ROOMS = [
  ["study", "The Study", "Training Hub", "Modules, videos, quizzes and forms across perm, contract and SOW.", "graduation-cap", "brand", "https://server-production-fc323.up.railway.app"],
  ["map-room", "The Map Room", "Intelligence Brief Generator", "Gathers the intelligence you need before an outreach call or meeting, all in one brief.", "compass", "sky", "https://stott-and-may-ibg.up.railway.app"],
  ["reading-room", "The Reading Room", "Terms Reviewer", "Checks a client's terms against our standard legal terms, so you can see where they differ.", "file-check", "lime", "https://stott-may-terms-reviewer-production.up.railway.app"],
  ["records-room", "The Records Room", "Terms of Business Tracker", "See which clients have signed terms, spot recruitment signals and check which are due for renewal.", "clipboard-list", "brand", "https://client-radar-production.up.railway.app"],
];

const rooms = ROOMS.map(([id, roomName, toolName, description, icon, accent, url], i) => ({
  _id: `drafts.houseRoom-${id}`,
  _type: "houseRoom",
  roomName,
  toolName,
  description,
  icon,
  accent,
  ...(url ? { url } : {}),
  order: (i + 1) * 10,
}));

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });

let created = 0;
for (const doc of [settings, ...rooms]) {
  const publishedId = doc._id.replace(/^drafts\./, "");
  const label = doc._type === "houseSettings" ? "House settings" : `${doc.roomName} (${doc.toolName})${doc.url ? "" : ", no address yet"}`;
  if (await client.fetch(`count(*[_id in [$a, $b]])`, { a: doc._id, b: publishedId })) {
    console.log(`Already there, left alone: ${label}`);
    continue;
  }
  console.log(`${dryRun ? "Would add" : "Adding"}: ${label}`);
  if (!dryRun) await client.create(doc);
  created++;
}
if (dryRun) console.log("Dry run: nothing sent to Sanity.");
else console.log(created ? "Done. Review and publish them in the Studio, under The House." : "Nothing new to add.");
