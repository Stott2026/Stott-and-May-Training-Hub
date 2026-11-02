// One-off import: the Technology tab, from the Group Technology Training Programme deck.
// Creates the 11 tools (Tech tools) and the Technology page as DRAFTS, to review and publish in
// the Studio, and adds points and badges for setting up tools to Badges and levels.
//
// Run from the project root:  npm run import:tech -- --dry-run   (check only)
//                             npm run import:tech                (import)
// Safe to re-run: tools and the page that already exist (draft or published) are left alone.
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");
const keyed = (list, prefix) => list.map((x, i) => ({ _key: `${prefix}-${i + 1}`, ...x }));
const practice = (rows) => keyed(rows.map(([title, when, text]) => ({ _type: "practice", title, when, text })), "practice");
const ref = (slug, i) => ({ _key: `tool-${i + 1}`, _type: "reference", _ref: `tool-${slug}`, _weak: true, _strengthenOnPublish: { type: "techTool" } });
const link = (label, url) => ({ _type: "trainingLink", label, url });

const TOOLS = [
  {
    slug: "bullhorn", name: "Bullhorn", role: "System of record", core: true, family: "Bullhorn", week: "Week 1, then daily use", icon: "folder-kanban", accent: "brand",
    summary: "The backbone: everything lands here. If it isn't recorded in Bullhorn, it doesn't count.",
    why: "Bullhorn is the single source of truth. Every other tool feeds it, and every gate in the programme checks the record in Bullhorn, not the activity in the other tools. Bullhorn competence comes first, before the other tools are issued.",
    capabilities: ["contacts", "candidates", "jobs", "numbers", "outreach"],
    learn: ["Records and mandatory fields", "Job and candidate lifecycle", "Submissions and notes"],
    bestPractice: [
      ["Coding", "Daily", "Code candidates, contacts and companies as you go."],
      ["Hotlists", "Daily", "Split your desk into hotlists; one can hold candidates and contacts."],
      ["Notes", "Every call", "Record every call and meeting; the keywords are searchable."],
      ["CV on file", "Every candidate", "Attach the CV so search finds keywords inside it."],
      ["Key fields", "Every time", "Salary, company, title, skills, notice period, location, contact details."],
    ],
    setup: ["Hotlists built for candidates", "Hotlists built for clients", "Key fields coded"],
    measures: "Mandatory field completion, duplicate rate, time from activity to record, notes quality audit.",
    links: [link("Bullhorn training", "https://launch.bullhorn.com/clients/pages/36/home")],
  },
  {
    slug: "linkedin-recruiter", name: "LinkedIn Recruiter", role: "Candidate sourcing", core: true, family: "LinkedIn", week: "Week 2, then daily use", icon: "search", accent: "sky",
    summary: "Search, shortlist and capture into Bullhorn.",
    capabilities: ["contacts", "candidates", "jobs", "numbers", "outreach", "alerts"],
    learn: ["Search and shortlisting", "Capture into Bullhorn", "Avoiding duplicates"],
    bestPractice: [
      ["Saved alerts", "All searches", "Set alerts on key job titles so new matches reach you daily."],
      ["Projects", "All searches", "One project per role, with saved searches and pipeline inside."],
      ["Post jobs", "Each job", "Post the job, then follow with a content post asking for applicants."],
      ["Post content", "3 a week", "Be visible and informed: at least three posts a week."],
      ["Use AI", "Every search", "Start with the AI taskbar, then narrow the search with it."],
    ],
    setup: ["Saved search alerts: candidates", "Saved search alerts: contacts", "Core projects created for your desk"],
    dailyCheck: "Check saved search alert results",
    measures: "Saved searches and alerts set up, profiles captured into Bullhorn, capture-to-contact rate.",
    links: [link("LinkedIn Recruiter training", "https://www.linkedin.com/learning/topics/recruiter"), link("LinkedIn training", "https://training.talent.linkedin.com/#language_english")],
  },
  {
    slug: "paiger", name: "Paiger", role: "Alerts and sourcing", core: true, week: "Week 2, then daily use", icon: "megaphone", accent: "lime",
    summary: "Daily alerts, content and candidate sourcing.",
    capabilities: ["contacts", "candidates", "jobs", "numbers", "intel", "outreach", "alerts"],
    bestPractice: [
      ["Social assistant", "Ongoing", "Tune it to your desk, writing style and personality."],
      ["Daily alerts", "Daily", "Get daily news, funding, market and hiring content to post."],
      ["Job leads", "Daily", "Alert on key job titles, skills, locations and industries."],
      ["Post S&M jobs", "Ongoing", "Share your live jobs using the Marketing team's tiles."],
      ["Intel", "Daily", "Use the intel and insights to research clients and the market."],
    ],
    setup: ["Daily news alerts to post", "Job lead alerts set up", "Daily use of Intel capability"],
    dailyCheck: "Check news and funding alerts to post on LinkedIn",
    measures: "Saved searches and alerts set up, profiles captured into Bullhorn, capture-to-contact rate.",
    links: [link("Paiger training", "https://content-app.com/?action=dashboard&method=training")],
  },
  {
    slug: "sourcewhale", name: "Sourcewhale", role: "Outreach", core: true, week: "Week 3, then in depth in weeks 5–8", icon: "message-circle", accent: "sky",
    summary: "Sequences, follow-up and pipeline nurture.",
    capabilities: ["contacts", "candidates", "numbers", "intel", "outreach", "alerts"],
    learn: ["Setting up a first sequence", "Logging replies in Bullhorn", "Sequence design", "Messaging quality", "Tracking replies", "Handoff to Bullhorn"],
    bestPractice: [
      ["Contact campaigns", "Ongoing", "Promote candidates to niches; load hotlists and LinkedIn imports."],
      ["Candidate campaigns", "Ongoing", "Stay in touch long term, run quick job campaigns, request updates."],
      ["Asset campaigns", "Ongoing", "Use salary guides, case studies and research to engage clients."],
      ["To-do list", "Daily", "Work calls, InMails and connection requests, all coded to Bullhorn."],
      ["Steps", "Every campaign", "Use 7–9 touches across email, calls and LinkedIn."],
    ],
    setup: ["1 candidate campaign running", "1 asset campaign running", "1 solutions campaign running"],
    dailyCheck: "Check to-do list actions and responses",
    measures: "Active sequences per consultant, reply rate, replies logged.",
    links: [link("Sourcewhale training", "https://sourcewhale.app/training")],
  },
  {
    slug: "woo", name: "Woo.io", role: "CRM and AI sourcing", core: true, week: "Week 4, then daily use", icon: "sparkles", accent: "lime",
    summary: "Auto-updates Bullhorn and sources from it.",
    capabilities: ["contacts", "candidates", "jobs", "numbers", "alerts"],
    learn: ["Setting up live searches", "Internal description per job", "Reviewing agent findings"],
    bestPractice: [
      ["Placed with", "Ongoing", "Track contacts we have placed or worked with who move company."],
      ["Job titles", "Ongoing", "Watch key titles for moves: C-suite, HR, talent, hiring managers."],
      ["AI agent sourcer", "Ongoing", "Write a rich internal description on every job so the agent finds people."],
      ["Candidate moves", "Ongoing", "Build live searches on key titles and skills; reach out as people land."],
      ["Chrome and columns", "Ongoing", "See existing relationships in LinkedIn and use Woo columns in Bullhorn."],
    ],
    setup: ["Search: contacts engaged with", "Search: contacts you own", "Internal description on every job"],
    dailyCheck: "Check for additions to your searches and agent updates",
    measures: "Live searches built, agent findings reviewed, conversations started.",
  },
  {
    slug: "cognism", name: "Cognism", role: "BD and intelligence", core: true, week: "Week 5, then daily use", icon: "target", accent: "brand",
    summary: "Client contact data and prospecting.",
    why: "Cognism comes with a short compliance element on the use of contact data, which matters across the UK, Europe and US.",
    capabilities: ["contacts", "candidates", "jobs", "numbers", "intel"],
    learn: ["Prospecting lists", "Compliant use of contact data", "Logging BD in Bullhorn"],
    bestPractice: [
      ["Save searches", "Ongoing", "Save live contact, candidate and company searches; reveal details."],
      ["AI toolbar", "Every search", "Type what you want to see instead of building complex filters."],
      ["Event triggers", "Every search", "Use job moves, funding, IPOs, acquisitions and hiring as triggers."],
      ["Hyperlinks", "Ongoing", "Click into contacts and companies for skills, tech and headcount."],
      ["Export", "As needed", "Export via Cognism or Chrome extension; check for duplicates first."],
    ],
    setup: ["Key contact searches saved", "Key candidate searches saved", "Export to Bullhorn from LinkedIn"],
    measures: "Credits used against contacts reached, BD meetings booked, contacts logged.",
    links: [link("Cognism resources", "https://www.cognism.com/resource-items")],
  },
  {
    slug: "bullhorn-analytics", name: "Bullhorn Analytics", role: "Targets and reporting", family: "Bullhorn", icon: "chart-column", accent: "brand",
    summary: "Your targets, jobs pipeline and the numbers behind your desk.",
    bestPractice: [
      ["Targets", "Monthly", "Set targets per consultant and team; star key ones for OneView."],
      ["Jobs pipeline", "Daily", "Search daily to see live progress on your jobs; sort and expand."],
      ["Slice and dice", "Ongoing", "Build and save your own searches on clients, activity and NFI."],
      ["OneView", "Ongoing", "Explore every breakdown under your targets, by client or date."],
      ["Key data", "Ongoing", "Check ratios, projected NFI, jobs without attention and poor data."],
    ],
    setup: ["Targets created and reviewed", "Slice and dice searches built", "Jobs pipeline set for daily review"],
  },
  {
    slug: "sourcebreaker", name: "Sourcebreaker", role: "Searches and Sourcebots", family: "Bullhorn", icon: "search", accent: "sky",
    summary: "Boolean searches and Sourcebots across Bullhorn and job boards.",
    capabilities: ["contacts", "candidates", "jobs", "numbers", "intel", "alerts"],
    bestPractice: [
      ["Build searches", "Daily", "Use Boolean across Bullhorn and job boards for leads and candidates."],
      ["Search criteria", "Ongoing", "Save searches for key companies, S&M placements and terms signed."],
      ["Sourcebots", "Daily", "Build 10+ Sourcebots for candidates, leads, funding and companies."],
      ["Intel", "Ongoing", "Use funding, salaries, news and the email finder."],
      ["Companies", "Ongoing", "Save key target companies to track moves, leads and candidates."],
    ],
    setup: ["Sourcebots for job leads", "Sourcebots for funding", "Sourcebots for S&M clients/terms"],
    dailyCheck: "Check Sourcebot alert emails for leads and candidates",
  },
  {
    slug: "bullhorn-ai-assistant", name: "Bullhorn AI Assistant", role: "AI writing help", family: "Bullhorn", icon: "sparkles", accent: "lime",
    summary: "Job adverts, interview tips, pitches and screening questions, drafted for you.",
    bestPractice: [
      ["Job adverts", "Every job", "Build the job description for your website, boards and LinkedIn."],
      ["Interview tips", "Pre-interview", "Create tips for the candidate from the job description."],
      ["Improve job spec", "Every job", "Sharpen the structure and sell before sending to candidates."],
      ["Create pitch", "When pitching", "Write a BD pitch for a candidate from the contact record."],
      ["Screening", "Pre-registration", "Generate questions from the CV to get more from your prescreen."],
    ],
  },
  {
    slug: "talent-insights", name: "LinkedIn Talent Insights", role: "Market intelligence", family: "LinkedIn", icon: "chart-column", accent: "sky",
    summary: "Talent pool and market data for BD calls, meetings and interview prep.",
    capabilities: ["contacts", "candidates", "jobs", "intel", "alerts"],
    bestPractice: [
      ["Client insight", "As needed", "Prepare for BD calls, meetings, spec CVs and interview prep."],
      ["Tech insight", "As needed", "Show you know the talent pools behind a technology."],
      ["Location insight", "As needed", "Show you know the talent pools in a location."],
      ["Save searches", "Ongoing", "Save key insights for easy repeat use."],
      ["Deep dives", "Ongoing", "Search by education, tenure and industry to build your knowledge."],
    ],
    setup: ["Insights saved: key desk areas", "Insights saved: key clients"],
    links: [link("LinkedIn training", "https://training.talent.linkedin.com/#language_english")],
  },
  {
    slug: "job-boards", name: "Job Boards", role: "Advertising and CV search", icon: "file-text", accent: "brand",
    summary: "Post jobs, capture strong applicants and search CV databases.",
    capabilities: ["candidates", "alerts"],
    bestPractice: [
      ["Job posts", "Every job", "Post to extra boards with original content, not a pasted spec."],
      ["Applications", "Ongoing", "Upload every strong applicant to Bullhorn, code and hotlist for later."],
      ["CV databases", "Ongoing", "Capture strong candidates into Bullhorn, coded and hotlisted."],
      ["Quotas", "Ongoing", "Watch your monthly posting and CV-open allowance; it is shared."],
      ["Best practice", "Every job", "Mind title, location, postcode, content and salary; think like the searcher."],
    ],
  },
];

const tools = TOOLS.map(({ slug, bestPractice, learn, setup, links, ...t }, i) => ({
  _id: `drafts.tool-${slug}`,
  _type: "techTool",
  slug: { _type: "slug", current: slug },
  order: (i + 1) * 10,
  core: false,
  ...t,
  ...(learn && { learn }),
  ...(bestPractice && { bestPractice: practice(bestPractice) }),
  ...(setup && { setup }),
  ...(links && { links: keyed(links, "link") }),
}));

const step = (title, text, stage, slugs) => ({ _type: "workflowStep", title, text, stage, tools: slugs.map(ref) });
const page = {
  _id: "drafts.techPage",
  _type: "techPage",
  title: "Technology",
  intro: "Six systems, one way of working. Learn each tool, set it up once, then use it every day: more information coming in, less searching out.",
  ruleTitle: "Bullhorn is the single source of truth.",
  ruleText: "Every other tool feeds it. If it isn't recorded in Bullhorn, it doesn't count.",
  ruleTool: { _type: "reference", _ref: "tool-bullhorn", _weak: true, _strengthenOnPublish: { type: "techTool" } },
  bigFiveIntro: "Once your alerts are built, five checks create your to-do list. More information coming in, less searching out.",
  workflow: keyed([
    step("Review your targets", "Progress against daily and monthly targets, plus today's to-do list.", "plan", ["bullhorn-analytics"]),
    step("Assess your daily alerts", "Pick key job leads and market moves to comment on in LinkedIn.", "plan", ["paiger", "linkedin-recruiter"]),
    step("Find key contacts", "Research contacts and candidates from your alerts.", "prospect", ["linkedin-recruiter", "cognism", "paiger"]),
    step("Build campaigns", "Move key alert contacts into Sourcewhale, every day.", "prospect", ["sourcewhale"]),
    step("Work your to-do list", "Follow up actions, calls and messages for each campaign stage.", "prospect", ["sourcewhale"]),
    step("Review your jobs pipeline", "Which roles need coverage and which need communication.", "cover", ["bullhorn-analytics"]),
    step("Cover your jobs", "Search for candidates across all of your search tools.", "cover", ["linkedin-recruiter", "cognism", "paiger", "sourcewhale", "woo"]),
    step("Every new vacancy", "Job description, website post, Woo agent set off, findings reviewed.", "cover", ["woo", "bullhorn-ai-assistant"]),
    step("Log everything", "Log all calls and interactions in Bullhorn.", "cover", ["bullhorn"]),
  ], "step"),
  mapNote: "Where several tools tick the same box, agree one primary tool per signal. To be validated by the team.",
  programmeIntro: "A 12-week programme in three gated phases. Each system gets one week of structured learning, then goes straight into your daily work. Progress is marked by what you can show, not by attendance.",
  phases: keyed([
    { _type: "phase", weeks: "Weeks 1–4", title: "Foundation", text: "Bullhorn, LinkedIn Recruiter and Paiger, plus the start of Sourcewhale.", tools: ["bullhorn", "linkedin-recruiter", "paiger", "sourcewhale"].map(ref), gate: "Build a shortlist for a live role, fully recorded in Bullhorn to standard." },
    { _type: "phase", weeks: "Weeks 5–8", title: "Application", text: "Woo.io and Cognism join, and all six systems run as end-to-end workflows.", tools: ["sourcewhale", "woo", "cognism"].map(ref), gate: "Run one workflow end to end, from sourcing through outreach to a recorded submission, observed by a team leader." },
    { _type: "phase", weeks: "Weeks 9–12", title: "Embed", text: "Daily and weekly routines, peer teaching (each consultant teaches one tool to a peer) and performance linkage.", gate: "Final review against the KPIs, then certification." },
  ], "phase"),
  rhythm: keyed([
    { _type: "touchpoint", label: "Learn", title: "One structured block", text: "A self-paced module followed by a short live session." },
    { _type: "touchpoint", label: "Apply", title: "One applied task", text: "The week's learning used on a real role, with real data." },
    { _type: "touchpoint", label: "Check", title: "One manager check-in", text: "Fifteen minutes against a standard scorecard." },
  ], "rhythm"),
  tracks: keyed([
    { _type: "track", division: "Software Engineering, Data & AI, Cyber Security", emphasis: "Heavier emphasis on LinkedIn Recruiter, Paiger, Sourcewhale and Woo.io." },
    { _type: "track", division: "GTM / Sales", emphasis: "The same core, with the market-specific search approaches for that vertical." },
    { _type: "track", division: "Consulting and Evergreen", emphasis: "The same core, weighted towards Bullhorn and Cognism for business development." },
  ], "track"),
};

const NEW_BADGES = [
  { _key: "tool-setup", _type: "badge", rule: "tool-setup", title: "Plugged in", description: "Set up your first tool: tick off its whole checklist.", icon: "zap" },
  { _key: "big-five", _type: "badge", rule: "big-five", title: "Big 5 habit", description: "Do the daily Big 5 check on five days.", icon: "flame" },
  { _key: "core-setup", _type: "badge", rule: "core-setup", title: "Fully loaded", description: "Set up all of the core systems.", icon: "rocket" },
];

for (const t of tools) console.log(`${t.core ? "Core" : "Add-on"}: ${t.name} · ${t.bestPractice?.length ?? 0} best practice, ${t.setup?.length ?? 0} set-up items${t.dailyCheck ? ", daily check" : ""}`);
console.log(`Technology page: ${page.workflow.length} workflow steps, ${page.phases.length} phases.`);

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN, apiVersion: "2025-02-19", useCdn: false, perspective: "raw" });
const docs = [...tools, page];
const ids = docs.flatMap((d) => [d._id, d._id.replace("drafts.", "")]);
const there = new Set((await client.fetch(`*[_id in $ids]._id`, { ids })).map((id) => id.replace("drafts.", "")));
const tx = client.transaction();
for (const d of docs) if (!there.has(d._id.replace("drafts.", ""))) tx.create(d);

// Points and badges for setting up tools, on top of any unpublished changes.
const rewardsBase = (await client.fetch(`*[_id == "drafts.rewards"][0]`)) ?? (await client.fetch(`*[_id == "rewards"][0]`));
if (rewardsBase) {
  const rewards = { ...rewardsBase, _id: "drafts.rewards" };
  delete rewards._rev; delete rewards._createdAt; delete rewards._updatedAt;
  const missing = NEW_BADGES.filter((b) => !(rewards.badges ?? []).some((x) => x.rule === b.rule));
  if (missing.length || rewards.points?.toolSetup === undefined) {
    rewards.points = { ...rewards.points, toolSetup: rewards.points?.toolSetup ?? 25 };
    const at = (rewards.badges ?? []).findIndex((b) => b.rule === "five-activities");
    rewards.badges = [...(rewards.badges ?? [])];
    rewards.badges.splice(at >= 0 ? at + 1 : rewards.badges.length, 0, ...missing);
    tx.createOrReplace(rewards);
    console.log(`Badges and levels: 25 points per tool set up${missing.length ? `, badges ${missing.map((b) => b.title).join(", ")}` : ""}.`);
  }
}

if (dryRun) { console.log("Dry run: nothing sent to Sanity."); process.exit(0); }
await tx.commit({ visibility: "sync" });
console.log("Done. Review and publish the Tech tools, the Technology page and Badges and levels in the Studio.");
