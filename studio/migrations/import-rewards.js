// One-off import: the first badges, levels and points ("Badges and levels" in the Studio),
// as a DRAFT to review and publish. Until it is published, the hub shows no gamification.
//
// Run from the project root:  npm run import:rewards -- --dry-run   (check only)
//                             npm run import:rewards                (import)
// Safe to re-run: if it already exists (draft or published) it is left alone.
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");

const LEVELS = [["Rookie", 0], ["Rising Star", 100], ["Consultant", 400], ["Senior Consultant", 1000], ["Top Biller", 2000]];
const BADGES = [
  ["first-section", "First steps", "Finish your first section.", "footprints"],
  ["first-module", "Module done", "Finish a whole module.", "award"],
  ["path-step", "Off the blocks", "Finish a step of the Start here path.", "rocket"],
  ["quiz-taken", "Quiz rookie", "Finish a round of the quiz.", "badge-check"],
  ["quick-checks", "Sharp mind", "Get ten quick checks right.", "brain"],
  ["streak-3", "Three in a row", "Learn on three working days in a row.", "flame"],
  ["five-modules", "On a roll", "Finish five modules.", "zap"],
  ["quiz-ace", "Quiz ace", "Get full marks in a round of the quiz.", "trophy"],
  ["streak-5", "Full week", "Learn on five working days in a row.", "star"],
  ["ten-modules", "Ten down", "Finish ten modules.", "medal"],
  ["path-complete", "Pathfinder", "Finish every step of the Start here path.", "compass"],
  ["all-modules", "Top of the class", "Finish every module in the hub.", "crown"],
];

const doc = {
  _id: "drafts.rewards",
  _type: "rewards",
  title: "Your achievements",
  points: { section: 10, module: 50, quickCheck: 5, quizAnswer: 5 },
  levels: LEVELS.map(([title, points], i) => ({ _key: `level-${i + 1}`, _type: "level", title, points })),
  badges: BADGES.map(([rule, title, description, icon]) => ({ _key: rule, _type: "badge", rule, title, description, icon })),
};

for (const [t, p] of LEVELS) console.log(`Level: ${t} from ${p} points`);
for (const [, t, d] of BADGES) console.log(`Badge: ${t}: ${d}`);
const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });
if (await client.fetch(`count(*[_id in ["rewards", "drafts.rewards"]])`)) { console.log("Badges and levels already exist, so they were left alone."); process.exit(0); }
if (dryRun) { console.log("Dry run: nothing sent to Sanity."); process.exit(0); }
await client.create(doc);
console.log("Done. Review and publish Badges and levels in the Studio.");
