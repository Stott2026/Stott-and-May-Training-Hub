// One-off import: Recruitment Playbook modules 05 (Business Development Fundamentals) and 06
// (Reverse Headhunting), written from the classroom decks and their trainer notes.
// Needs the "Recruitment Playbook" group, which import-playbook-07-08.js creates (run that first).
//
// Run from the project root:  npm run import:playbook-05-06 -- --dry-run   (check only)
//                             npm run import:playbook-05-06                (import)
// The two modules and their quiz questions arrive as DRAFTS, to review and publish in the Studio.
// Safe to re-run: existing documents are left alone. Add --replace to overwrite the two module
// drafts and their quiz drafts instead (only before anyone has edited them in the Studio).
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");
const replace = process.argv.includes("--replace");

const key = (prefix, i) => `${prefix}-${i + 1}`;
const steps = (list) => list.map(([label, title, text], i) => ({ _type: "step", _key: key("step", i), ...(label && { label }), title, text }));
const table = (title, columns, rows, i = 0) => ({
  _type: "dataTable",
  _key: key("table", i),
  title,
  columns,
  rows: rows.map((cells, j) => ({ _type: "row", _key: key("row", j), cells })),
});

const bdFundamentals = {
  _id: "drafts.module-bd-fundamentals",
  _type: "trainingModule",
  title: "Business Development Fundamentals",
  slug: { _type: "slug", current: "bd-fundamentals" },
  eyebrow: "Playbook 05",
  subtitle: "Know why clients should pick us, who to call, what to say, and how to keep chasing",
  category: { _type: "reference", _ref: "category-playbook" },
  order: 50,
  icon: "megaphone",
  accent: "lime",
  sections: [
    {
      title: "Know the business you're selling",
      takeaway: "Know every market we cover. A client's other hiring need is a cross-sell, not someone else's problem.",
      content: "Most consultants can only name their own desk's market, and that's a missed cross-sell every time a client mentions another hiring need. Know the five proof points below well enough to use them on any call. Quality of service is the thread through all of them: it's why clients come back. And know the hiring models: if a perm client is struggling to hire fast, contract or a consulting SOW might be the answer.",
      tables: [table("Five proof points", ["Proof point", "What to say"], [
        ["Specialist markets", "Software Engineering, GTM Tech Sales, AI & ML / Data, Energy Solutions, Critical Infrastructure, and Contract: Salesforce & ERP, Data & Software"],
        ["Track record", "17+ years in business. Longevity is proof we deliver through every market cycle"],
        ["Global reach", "US, UK and beyond. We can hire where the client is growing, not just where we sit"],
        ["Case studies", "Proof, not promises. Know two from your market well enough to tell them from memory"],
        ["Hiring models", "Perm, contract, executive search and consulting: match the model to the problem"],
      ])],
      tip: "Ask your manager for two case studies from your market and learn them by heart this week.",
    },
    {
      title: "Your USP keeps the door open",
      takeaway: "Clients don't buy agencies, they buy people. Stott and May gets you the meeting; your USP keeps them taking your call.",
      content: "Your USP is the value you bring, not the job title you hold. Fill in the four blanks and push for specifics: \"I'm hard-working and I care\" isn't a USP, because everyone says it. Evidence matters most. One real placement or a number (time to shortlist, interview-to-offer ratio) beats any adjective. New to the desk with no placements yet? Borrow team evidence: \"Our team placed…\"",
      framework: { title: "I help [who] solve [business problem] by [how I do it differently], proven by [evidence].", steps: steps([
        ["Who", "Your clients", "Which clients do you serve?"],
        ["Problem", "Their pain", "What problem do you solve for them?"],
        ["How", "Your difference", "What do you do differently?"],
        ["Evidence", "Your proof", "A placement or a metric that proves it."],
      ]) },
      phrases: [
        "I help VC-backed NYC start-ups build their first platform teams. I only work this niche, so I know who's open to a move before they hit the market. [Recent placement]",
      ],
    },
    {
      title: "Practise it: write your USP and pitch it in 30 seconds",
      takeaway: "If you can't say it in 30 seconds, it isn't finished yet.",
      content: "Write your USP on your own, then say it out loud as if a hiring manager has just asked, \"Why should I use you?\" Common fixes: too long, too generic, no evidence, or it sounds like a script. Save the final version as a draft of your LinkedIn \"About\" section.",
      framework: { title: "The exercise (15 minutes)", steps: steps([
        ["Set up · 5 min", "Write it", "Fill in the four blanks on your own. One sentence, no jargon, at least one piece of evidence."],
        ["Run · 8 min", "Pitch it", "Stand up and deliver it as if a hiring manager just asked, \"Why should I use you?\""],
        ["Debrief · 2 min", "Sharpen it", "The room scores clarity and proof out of 5. Rewrite the weakest word before you sit down."],
      ]) },
    },
    {
      title: "Your ideal customer profile is different in every market",
      takeaway: "Know who you win most often and serve best, and call them when a trigger tells you they're hiring.",
      content: "An ideal customer profile (ICP) is the type of client you win most often and serve best. A Critical Infrastructure ICP looks nothing like a GTM Tech Sales one. The barriers row decides how hard a client is to win: enterprise usually means a preferred supplier list (PSL) and procurement, slow to win but sticky once you're in. Pick the two or three sectors where your candidates already work: that's where your credibility is highest.",
      tables: [table("Ideal customer profile by company stage", ["Company stage", "Start-up", "Scale-up", "Enterprise"], [
        ["Who you speak to", "Founders, CTO", "VP / Head of, Talent lead", "Hiring managers, HR, procurement"],
        ["What they need", "First key hires, fast", "Volume and leaders, at pace", "Niche skills, compliant process"],
        ["Barriers to entry", "Budget, founder network", "Competing agencies", "PSL, procurement, terms"],
        ["Best hiring model", "Perm, retained search", "Perm + contract", "Contract, SOW, exec search"],
      ])],
      tip: "Call now when you spot a buying trigger: a funding round (Series A to C), new leadership, headcount growth on LinkedIn, a new office or product launch, or a competitor laying off talent.",
    },
    {
      title: "Why we work a niche",
      takeaway: "A generalist is easy to replace. A specialist gets the call first.",
      content: "The temptation early on is to chase any job that moves. Every off-niche role means a new network, a new language and a lower fill rate. Inside your niche, every call compounds: candidates become referrals, and referrals become clients. A good niche is narrow enough to own and big enough to bill from; agree the boundaries with your manager. Got an off-niche lead? Pass it to the desk that owns it.",
      framework: { title: "What a niche gives you", steps: steps([
        ["Reputation", "Known for one thing", "The market knows your name for one thing."],
        ["Speed", "Network ready", "Your network is already built when the job lands."],
        ["Quality", "Sharper judgement", "You can tell a great candidate from a good one."],
        ["Service", "Real insight", "Market insight on every call, not just CVs."],
        ["Edge", "Depth wins", "You beat generalist agencies on depth."],
      ]) },
      tip: "Describe your niche in one sentence. If you can't, it isn't a niche yet.",
    },
    {
      title: "Open questions get you leads",
      takeaway: "Yes/no answers end conversations. Who, what, how and \"tell me\" keep them going.",
      content: "Open questions are how you ask for leads and managers' names without sounding transactional. Compare each pair below: the open version gets far more information. The middle two are how you get a manager's name or a referral from a candidate call without asking for it directly.",
      tables: [table("Closed to open", ["Instead of (closed)", "Ask (open)"], [
        ["\"Are you hiring at the moment?\"", "\"What does hiring look like for your team this quarter?\""],
        ["\"Do you know anyone looking?\"", "\"Who's the strongest engineer you've worked with recently?\""],
        ["\"Is the manager [Name]?\"", "\"Who leads the platform team day to day?\""],
        ["\"Is it hard to hire?\"", "\"Where are you struggling most to find the right people?\""],
      ])],
      tip: "Write down two closed questions you asked this week, and rewrite them as open ones.",
    },
    {
      title: "Funnelling to a meeting",
      takeaway: "Move from wide to specific so the client talks themselves into the need, then offer two times.",
      content: "A funnel moves from broad to specific so the client talks themselves into the need. Step 3 is the one most people skip: the cost of an empty seat is what creates urgency. Step 4 uses the \"illusion of control\": offer two specific options, not \"when are you free?\" The client still chooses, but the choice is between yes and yes.",
      framework: { title: "Four steps from wide to close", steps: steps([
        ["Wide", "Their priorities", "\"What are the big priorities for the team this year?\""],
        ["Narrow", "The people gap", "\"Which of those depends on people you don't have yet?\""],
        ["Impact", "The cost of waiting", "\"What happens if those roles are still open in three months?\""],
        ["Close", "Two options", "\"Let's get 20 minutes in. Does Tuesday at 10 or Thursday at 3 work better?\""],
      ]) },
      tip: "Send the calendar invite while you're still on the call.",
    },
    {
      title: "\"I know, I heard, I saw\"",
      takeaway: "Specific beats generic. Earn the next 30 seconds with something relevant to them, not about us.",
      content: "This is the hook that earns the next 30 seconds of a call or voicemail. It works because it's specific and relevant to them. You don't need all three every time: one strong \"I saw\" is enough on a voicemail.",
      framework: { title: "Three ways in", steps: steps([
        ["I know…", "Your network", "A fact from your network or a past placement."],
        ["I heard…", "Your conversations", "Something a candidate or contact told you."],
        ["I saw…", "A public signal", "Funding, a job ad, a new leader."],
      ]) },
      phrases: [
        "Hi [Name], it's [You] from Stott and May. I saw you've just closed your Series B and have three backend roles live. I know the platform engineers in New York who've scaled that kind of stack, and I heard from two of them this week that they're open to the right move. Worth 15 minutes on Thursday to share who's out there?",
      ],
      mistakes: [
        "Claiming candidates or placements you don't have. Everything in the pitch must be true",
      ],
    },
    {
      title: "Chasing leads: a multi-touch cadence",
      takeaway: "One call rarely converts. Every touch should add something new, never just \"checking in\".",
      content: "A lead becomes a client through repeated, relevant touches across channels. This cadence is a starting template: adapt the timings to your market, but keep the principle. Every touch adds an insight, a profile or an update. Most consultants stop after one or two attempts, which is exactly why the ones who keep going win.",
      tables: [table("A six-touch cadence", ["Day", "Channel", "What you send"], [
        ["1", "Call + voicemail", "The \"I know, I heard, I saw\" opener: 20 seconds, one reason"],
        ["1", "LinkedIn connect", "Short note, no pitch: why you're connecting"],
        ["3", "Email", "Three lines and one insight: a salary benchmark or talent map"],
        ["7", "Call", "Follow up on the insight; ask one open question"],
        ["14", "Email or InMail", "A relevant candidate profile or market update"],
        ["30", "Call", "Check in on the trigger: has anything changed?"],
      ])],
      tactics: [
        "No essays: people read on their phones, so keep it short",
        "Be human: reference something real about them",
        "Be relentless: don't stop after one or two attempts",
        "Log every touch in Bullhorn, so nothing slips and a teammate can pick it up",
      ],
    },
    {
      title: "Practise it: a 20-second chase pitch from a real lead",
      takeaway: "Short, specific, true, and a clear ask with a time.",
      content: "Use a real lead from your own desk, not a made-up one, so the pitch gets used this afternoon. Anything over 20 seconds gets cut down. \"Thursday at 2pm?\" beats \"let me know\". Afterwards, send the pitch and the follow-up email before the end of the day, and log both touches in Bullhorn.",
      framework: { title: "The exercise (20 minutes)", steps: steps([
        ["Write · 7 min", "Pick one live lead", "From your CRM. Write three sentences using at least two of \"I know, I heard, I saw\", ending with one clear ask and a time."],
        ["Deliver · 8 min", "Voicemail, then follow-up", "Deliver it to a partner as a voicemail, then read the three-line email you'd send straight after. Swap roles."],
        ["Score · 5 min", "Partner scores 1 to 5", "Specific to them? Under 20 seconds? True? Clear ask? Rewrite the weakest line, then send it for real today."],
      ]) },
      scenario: {
        title: "A Series B company in your market has just announced its funding and posted three backend roles. You've never spoken to them. What's your first touch?",
        weak: "Email the CTO your standard agency introduction, attach the terms of business and ask them to let you know if they need any help.",
        strong: "Call the hiring manager and leave a 20-second voicemail using \"I saw\" (the funding and the three roles) and \"I know\" (engineers you genuinely know who've scaled that stack), ending with a specific time: \"Worth 15 minutes on Thursday at 2?\" Connect on LinkedIn with a short, no-pitch note the same day, send a three-line email with one insight on day 3, and log every touch in Bullhorn so the cadence carries on.",
      },
    },
    {
      title: "Cold lead stripping: one profile, five sources of leads",
      takeaway: "Every profile you screen should add at least three named, logged leads to your CRM, each with a reason to call.",
      content: "Cold lead stripping is how you build your market from the work you're already doing. Every CV or profile you look at holds leads. Work through the five sources below, and ask on every qualification call: \"Where else are you interviewing?\"",
      framework: { title: "Five sources in every profile", steps: steps([
        [null, "Current employer", "Who manages them? Is the team growing, or did they just lose someone?"],
        [null, "Past employers", "Every company on the CV is a target. Who leads that team now?"],
        [null, "Managers and peers", "Former bosses who've moved on are now hiring somewhere else."],
        [null, "Interviews", "Where else are they interviewing? Each one is a company with a live need."],
        [null, "Hiring signals", "Funding, job ads, new leaders, layoffs nearby: check every company you found."],
      ]) },
      mistakes: [
        "Using information people haven't shared publicly or told you directly",
        "Sharing a candidate's details with a prospect without their consent",
      ],
    },
    {
      title: "Takeaways and actions for your desk",
      takeaway: "The measure of this module is meetings in your calendar, not notes in a notebook.",
      content: "Know what Stott and May covers, and sell all of it. Your USP is the value you bring, not the job title you hold. Work your niche: depth wins on speed, quality and reputation. Open questions get information; funnelling gets the meeting. Specific beats generic. Every profile you screen is a source of new leads. Tick off each action below as you do it this week.",
      tactics: [
        "Rehearse your USP until you can say it in 30 seconds",
        "Add three ICP-fit companies to your CRM, each with a trigger",
        "Run the six-touch cadence on five live leads",
        "Strip every profile you screen for three leads",
        "Learn two case studies from your market by heart",
        "Review meetings booked with your manager on Friday",
      ],
    },
  ],
};

const reverseHeadhunting = {
  _id: "drafts.module-reverse-headhunting",
  _type: "trainingModule",
  title: "Reverse Headhunting",
  slug: { _type: "slug", current: "reverse-headhunting" },
  eyebrow: "Playbook 06",
  subtitle: "Reach senior decision makers through their career, then turn it into a meeting",
  category: { _type: "reference", _ref: "category-playbook" },
  order: 60,
  icon: "heart-handshake",
  accent: "brand",
  sections: [
    {
      title: "Executive search, senior networking and BD in one call",
      takeaway: "Leaders ignore vendor calls, but they always make time to talk about their career.",
      content: "A reverse headhunt flips the usual business development call. Instead of pitching services to a leader who gets ten vendor calls a day, you approach them as a senior candidate. It's especially powerful on contract and consulting desks, where the real opportunity is often a project or a team rather than one hire.",
      framework: { title: "How a reverse headhunt works", steps: steps([
        ["The idea", "Treat the leader as a candidate", "Approach senior leaders in your space to introduce yourself and talk through senior opportunities for them."],
        ["The angle", "Show what we do", "While you talk about their career, show how Stott and May adds value for businesses like theirs."],
        ["The aim", "Book the next meeting", "A follow-up to discuss how we can support their initiatives. That's the measure of a good call."],
      ]) },
    },
    {
      title: "Six reasons it beats a cold pitch",
      takeaway: "Even if they aren't hiring now, the leader who sees you as helpful calls you first when they are.",
      content: "On contract and consulting desks, reasons 3 and 6 tend to matter most: you learn where projects are stalling and can position Stott and May as a delivery partner. Which matters most on your desk?",
      framework: { title: "Why reverse headhunts work", steps: steps([
        [null, "Cuts through the noise", "Leaders ignore vendor calls. They take calls about their career."],
        [null, "Builds trust", "Helping them first creates a stronger relationship than a pitch."],
        [null, "Shows our range", "Share the work we do for others, beyond executive search."],
        [null, "Books meetings", "The goal: a follow-up on how we support their initiatives."],
        [null, "Grows your network", "A senior network builds credibility and future work."],
        [null, "Gathers intel", "Company, project and industry insight to use on your next call."],
      ]) },
    },
    {
      title: "Anyone who is, or could become, a hiring manager",
      takeaway: "Include leaders one level below the obvious buyer: today's Director is next year's VP.",
      content: "Target the titles below, and don't stop at the obvious buyer. Leaders one level down remember who called them first. Outreach only gets you the meeting; the value happens in the live conversation, so push for a call, not an email thread.",
      tables: [table("Who to target, and how", ["Who and how", "What it looks like"], [
        ["Titles", "CTO, CIO, CISO, SVP, VP, Director, Head of"],
        ["One level down", "Leaders below the obvious buyer, who'll be buying next year"],
        ["First touch", "LinkedIn, LinkedIn Recruiter, email and SourceWhale sequences"],
        ["The conversation", "Live, not in writing: a phone call, a Teams meeting or, best of all, in person"],
      ])],
      tip: "Check your list of 10 decision makers against these titles, and add one leader a level below each.",
    },
    {
      title: "A five-step structure for every reverse headhunt",
      takeaway: "Steps 2 and 3 treat the leader as a candidate; step 4 is where they become a potential client. Never skip step 5.",
      content: "The move from step 3 to step 4 should feel natural: \"You mentioned you're leading the cloud migration. How's delivery going?\" A great conversation with no next step booked is a missed opportunity, and senior leaders know other senior leaders, so ask for referrals every time.",
      framework: { title: "The call, step by step", steps: steps([
        [null, "Open", "Why you called: them and their career, not a vacancy."],
        [null, "Their story", "Role, team, budget and the initiatives they've led."],
        [null, "Their next move", "What would an ideal role look like, and when?"],
        [null, "Their world", "Plans, pain points and where delivery is stalling."],
        [null, "Close", "Book the follow-up and ask who else you should meet."],
      ]) },
      tip: "Let them talk about themselves. Your job is to listen for the pain you can solve.",
    },
    {
      title: "Question bank 1: the leader as a candidate",
      takeaway: "Ask for their target package, never their current salary.",
      content: "The more you learn here, the more ways you have to position Stott and May as a partner. Don't interrogate: pick the questions that fit the conversation and note the rest for next time.",
      tables: [table("The leader as a candidate", ["Where they are now", "Where they want to go"], [
        ["Current role and responsibilities", "What would make them open to a move"],
        ["Team size and direct reports", "What an ideal role looks like"],
        ["Budget they manage", "Preferred sector, location, remote or travel"],
        ["Transformation initiatives they've led", "Target package for the next role"],
        ["Technologies they specialise in", "Other leaders they'd recommend"],
      ])],
      mistakes: [
        "Asking for current or past salary. Salary-history questions are banned in New York City and many US states, and that applies to senior leaders too",
      ],
    },
    {
      title: "Question bank 2: the leader as a potential client",
      takeaway: "Every stalled project is a conversation about contract, consulting or perm support.",
      content: "These questions turn a career chat into a business conversation. The right-hand column is where opportunities come from. If a leader says delivery is slipping or the systems integrator isn't adding value, that's the opening for a follow-up with our contract or consulting teams. Log everything in the CRM so whoever speaks to that business next starts informed.",
      tables: [table("The leader as a potential client", ["The team today", "Where we can help"], [
        ["Team size and perm/contract split", "Initiatives now and in the next 6 to 12 months"],
        ["Onshore, offshore or nearshore?", "Current pain points"],
        ["The technology the business runs on", "Where projects are stalling"],
        ["Do they use a systems integrator (SI)?", "Roles they struggle to hire"],
        ["Is that SI adding value?", "Time-and-materials contractors or an outcome-based SOW?"],
      ])],
    },
    {
      title: "A message you can send today",
      takeaway: "Short, personal and true. Outreach gets the call; the call does the work.",
      content: "Fill the brackets with your market and real, recent placements from your desk or the wider business. Ask your manager if you're not sure what you can reference. Personalise the first line wherever you can: a recent post, a promotion, a project they announced.",
      phrases: [
        "Hi [Name], I lead [market] at Stott and May, a global technology staffing and consulting firm. I partner with technology leaders at businesses investing in transformation, and your background is the kind I typically work with. To be transparent, I don't have a live role for you today. We recently placed [recent senior placements] and have retained searches starting with companies building out their leadership teams. I'd value a short intro to hear what you're working on and share what we're seeing in the market. Would 20 minutes next week work?",
      ],
      tactics: [
        "Keep it short: under 120 words. Leaders skim on their phone",
        "Make it real: use genuine placements and searches",
        "Follow up: two or three touches across LinkedIn, email and phone",
      ],
      mistakes: [
        "Claiming placements or retained searches we don't have. A senior leader will check",
      ],
    },
    {
      title: "The numbers that fill your diary",
      takeaway: "The numbers are a floor, not a ceiling. Reverse headhunts pay off over time, so track every one.",
      content: "A reverse headhunt only pays off over time, so the tracking matters as much as the outreach. Keep a tracker (in the CRM or a spreadsheet) listing each leader, the date of the call, what you learned and the next follow-up date.",
      tables: [table("Your weekly rhythm", ["Number", "What", "How"], [
        ["20 to 25", "Leaders messaged", "Every week, from a LinkedIn project of hiring managers in your space"],
        ["5", "Reverse headhunts booked", "The minimum. Each one is a senior relationship and a possible client"],
        ["1 a month", "Follow-up", "Track every contact and check in monthly with insight, not a sales pitch"],
      ])],
    },
    {
      title: "Practise it: a cold reverse headhunt",
      takeaway: "The one measure of success: is a follow-up meeting booked by the end of the call?",
      content: "Work in threes. The \"leader\" should be friendly but busy, giving short answers until the caller earns more. Afterwards, send the outreach message to at least five real leaders before the end of the day.",
      framework: { title: "The exercise (30 minutes)", steps: steps([
        ["Set up · 5 min", "Pick a real leader", "Groups of three. Choose a leader from your list of 10; your partner plays them."],
        ["Run · 3 × 7 min", "Five steps, live", "Open, their story, next move, their world, close. Rotate roles each round."],
        ["Debrief · 5 min", "Did you book it?", "The observer scores questioning and pitch, and notes one pain point you uncovered."],
      ]) },
      scenario: {
        title: "A CIO you've messaged agrees to a call. Ten minutes in, they mention their cloud migration is six months behind schedule. What do you do?",
        weak: "Jump straight in with a pitch for contractors, send over some CVs after the call and wait for them to come back to you.",
        strong: "Stay curious first: ask what's causing the delay, how the team is set up (perm, contract, offshore, a systems integrator) and whether the SI is adding value. Note the pain point, then close for a follow-up: \"It sounds like delivery is where the pressure is. Could I bring a colleague from our contract team next week to share how we've helped teams in the same spot?\" Ask who else they'd recommend you speak to, and log everything in the CRM the same day.",
      },
    },
    {
      title: "Takeaways and actions for your desk",
      takeaway: "Leaders take calls about their career. Every call ends with a booked next step.",
      content: "Leaders take calls about their career. Learn them as a candidate and as a client. Every call ends with a booked next step. Ask for target package, never current pay. Consistency wins: 20 to 25 messages and 5 calls a week. Tick off each action below as you do it this week.",
      tactics: [
        "Build a LinkedIn project of leaders",
        "Send your outreach to 20 to 25 of them",
        "Set up a tracker with monthly follow-ups",
        "Role-play a cold reverse headhunt with your manager",
        "Learn our capabilities inside out: every hiring model and practice we offer",
      ],
    },
  ],
};

const quiz = [
  {
    _id: "drafts.quiz-playbook-05-01", module: "module-bd-fundamentals", afterSection: 2,
    question: "Which part of your USP matters most?",
    options: ["Your job title", "Evidence: a real placement or a number", "How hard-working you are", "How long Stott and May has been in business"],
    correct: 1,
    explanation: "Evidence matters most. One real placement or a number, like time to shortlist, beats any adjective. New to the desk? Borrow team evidence.",
  },
  {
    _id: "drafts.quiz-playbook-05-02", module: "module-bd-fundamentals", afterSection: 7,
    question: "At the end of a funnel, how should you ask for the meeting?",
    options: ["\"When are you free?\"", "\"Let me know if you'd like to meet\"", "Offer two specific times, such as Tuesday at 10 or Thursday at 3", "Send a calendar link and wait"],
    correct: 2,
    explanation: "Two specific options use the illusion of control: the client still chooses, but the choice is between yes and yes. Send the invite while you're still on the call.",
  },
  {
    _id: "drafts.quiz-playbook-06-01", module: "module-reverse-headhunting", afterSection: 5,
    question: "On a reverse headhunt, what should you ask about pay?",
    options: ["Their current salary", "Their salary history for the last three roles", "Their target package for the next role", "Nothing: never discuss pay"],
    correct: 2,
    explanation: "Ask for their target package, never their current salary. Salary-history questions are banned in New York City and many US states, and that applies to senior leaders too.",
  },
  {
    _id: "drafts.quiz-playbook-06-02", module: "module-reverse-headhunting", afterSection: 9,
    question: "What is the one measure of a good reverse headhunt call?",
    options: ["The leader agrees to move roles", "A follow-up meeting is booked", "You learn their salary", "You send them three CVs"],
    correct: 1,
    explanation: "The aim is a follow-up to discuss how we can support their initiatives. A great conversation with no next step booked is a missed opportunity.",
  },
// The modules are drafts too, so link to them the way the Studio does for unpublished documents:
// a weak link that becomes a normal one when the module is published.
].map(({ module, ...q }) => ({ ...q, _type: "quizQuestion", module: { _type: "reference", _ref: module, _weak: true, _strengthenOnPublish: { type: "trainingModule" } } }));

const modules = [bdFundamentals, reverseHeadhunting];

// Check against the Studio's limits.
const problems = [];
for (const m of modules) {
  if (m.title.length > 60) problems.push(`${m.title}: title`);
  if (m.subtitle.length > 90) problems.push(`${m.title}: subtitle (${m.subtitle.length})`);
  if (m.eyebrow.length > 24) problems.push(`${m.title}: eyebrow`);
  m.sections = m.sections.map((s, i) => ({ _type: "section", _key: key("section", i), ...s }));
  for (const s of m.sections) {
    if (s.title.length > 80) problems.push(`${s.title}: section title (${s.title.length})`);
    if (s.takeaway?.length > 160) problems.push(`${s.title}: takeaway (${s.takeaway.length})`);
    for (const t of s.tables ?? []) for (const r of t.rows) if (r.cells.length !== t.columns.length) problems.push(`${s.title}: table row has wrong number of cells`);
  }
}
for (const q of quiz) {
  const m = modules.find((m) => m._id === `drafts.${q.module._ref}`);
  if (q.afterSection > m.sections.length) problems.push(`${q._id}: afterSection is past the last section`);
}
if (problems.length) { console.error("Problems:\n  " + problems.join("\n  ")); process.exit(1); }

for (const m of modules) {
  const count = (f) => m.sections.reduce((n, s) => n + (s[f]?.length ?? 0), 0);
  console.log(`${m.title}: ${m.sections.length} sections, ${m.sections.filter((s) => s.framework).length} frameworks, ${count("tables")} tables, ${m.sections.filter((s) => s.tip).length} tips, ${count("tactics")} tactics, ${count("phrases")} phrases, ${count("mistakes")} mistakes, ${m.sections.filter((s) => s.scenario).length} scenarios`);
}
console.log(`Quiz questions: ${quiz.length}`);
if (dryRun) { console.log("Dry run: nothing sent to Sanity."); process.exit(0); }

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN, apiVersion: "2025-02-19", useCdn: false });
if (!(await client.fetch(`count(*[_id == "category-playbook"])`))) {
  console.error("The Recruitment Playbook group is missing. Run npm run import:playbook first.");
  process.exit(1);
}
const tx = client.transaction();
for (const doc of [...modules, ...quiz]) (replace ? tx.createOrReplace(doc) : tx.createIfNotExists(doc));
await tx.commit({ visibility: "sync" });
console.log("Imported as drafts. Review and publish them in the Studio.");
