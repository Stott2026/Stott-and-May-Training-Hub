// One-off import: Recruitment Playbook modules 07 (Client Control) and 08 (Interview Prep &
// Pre-closing), written from the classroom decks and their trainer notes. Also creates the two
// home page groups ("Recruitment Playbook" and "Core skills") and puts the existing modules in
// Core skills.
//
// Run from the project root:  npm run import:playbook -- --dry-run   (check only)
//                             npm run import:playbook                (import)
// The two modules and their quiz questions arrive as DRAFTS, to review and publish in the Studio.
// Safe to re-run: existing documents are left alone.
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../env.js";

const dryRun = process.argv.includes("--dry-run");

const key = (prefix, i) => `${prefix}-${i + 1}`;
const steps = (list) => list.map(([label, title, text], i) => ({ _type: "step", _key: key("step", i), label, title, text }));
const table = (title, columns, rows, i = 0) => ({
  _type: "dataTable",
  _key: key("table", i),
  title,
  columns,
  rows: rows.map((cells, j) => ({ _type: "row", _key: key("row", j), cells })),
});

const categories = [
  { _id: "category-playbook", _type: "category", title: "Recruitment Playbook", slug: { _type: "slug", current: "playbook" }, order: 10, description: "The modules we teach in our classroom sessions, ready to revisit at your desk." },
  { _id: "category-core", _type: "category", title: "Core skills", slug: { _type: "slug", current: "core-skills" }, order: 20, description: "The essentials of the desk, from first call to placement." },
];

const clientControl = {
  _id: "drafts.module-client-control",
  _type: "trainingModule",
  title: "Client Control",
  slug: { _type: "slug", current: "client-control" },
  eyebrow: "Playbook 07",
  subtitle: "Sell in with conviction, answer objections early, and run the process to the close",
  category: { _type: "reference", _ref: "category-playbook" },
  order: 70,
  icon: "compass",
  accent: "brand",
  sections: [
    {
      title: "Order-taker or process owner?",
      takeaway: "Control isn't about being pushy. It comes from being the best-informed person in the process.",
      content: "Client control is what separates a recruiter who takes orders from one who runs the process. It is built at every stage, from the brief to the offer, not grabbed at the end. Use the table to score yourself honestly: for each moment, which column did you sit in on your last placement, or your last lost deal? That is your baseline.",
      tables: [table("Order-taker or process owner?", ["Moment", "Order-taker", "Process owner"], [
        ["Taking the brief", "Writes down what the client says", "Challenges the brief against the market"],
        ["Submitting", "Forwards a CV and hopes", "Pitches the person and books a feedback slot"],
        ["Feedback", "Chases for days", "Agreed the deadline at submission"],
        ["Delays", "Accepts them quietly", "Explains the cost and resets the timeline"],
        ["Offer", "Relays numbers by email", "Pre-closed both sides; the offer is a formality"],
      ])],
    },
    {
      title: "The four-part sell-in",
      takeaway: "Sell in with evidence, not adjectives, and ask for a decision date as part of the pitch.",
      content: "Selling in a candidate means building a compelling, evidence-based case, not forwarding a CV. Work through the four parts in order: the outcome the person delivers, the context that makes them relevant, one piece of proof, then the logistics. Asking for a decision date is part of the pitch, not an afterthought.",
      framework: { title: "The four-part sell-in", steps: steps([
        ["Outcome", "Lead with the problem solved", "Why this person fixes the client's hiring need, in one sentence."],
        ["Context", "Translate, don't summarise", "Map their experience onto the client's stack, stage and challenges."],
        ["Proof", "One standout win", "A specific, measurable example of impact, not \"strong communicator\"."],
        ["Logistics", "Remove the friction", "Target package, notice and other processes, then ask for a decision date."],
      ]) },
      phrases: [
        "I've got someone who can take the data platform migration off your plate. She's led the same Snowflake move at a Series B fintech your size, cut pipeline costs by [X]%, and she's targeting [£___] with two weeks' notice. She's in one other process. Can we get first thoughts by Thursday?",
      ],
      tip: "Drop your own candidate's real figures into the pitch. Specific numbers are what make it believable.",
    },
    {
      title: "Building conviction on the call",
      takeaway: "Conviction is earned in the preparation, not performed on the call.",
      content: "Clients pick up on hesitation. If you raise the obvious concern yourself, with a clear explanation, it becomes context. If the client finds it first, it becomes a red flag. Prepare well enough that you can speak as the market expert, and never end the call without a decision point.",
      tactics: [
        "Know them better than they know themselves: their motivations, push and pull factors, and what would make them say no",
        "Speak as the market expert: benchmarks, availability and competitor moves. You're an advisor, not a CV service",
        "Pre-empt the obvious concern: raise the gap or the short tenure yourself, with the answer attached",
        "Anchor a decision before you hang up: \"When can we lock in interviews?\" A date, not \"I'll take a look\"",
      ],
      mistakes: [
        "Submitting a candidate you aren't sure about and hoping the client won't notice",
        "Letting the client discover a concern you already knew about",
        "Ending the call with \"I'll take a look\" instead of an agreed date",
      ],
      tip: "If you wouldn't hire this person yourself, don't expect the client to.",
    },
    {
      title: "A pitch that holds up under pushback",
      takeaway: "Keep it under two minutes, and never skip the logistics.",
      content: "A four-step structure keeps your pitch under two minutes. Logistics go last but must never be skipped: a great pitch that hides a salary gap or a 90-day notice period destroys trust later. If an objection catches you out, it usually means you didn't prepare enough before the call.",
      framework: { title: "Four steps to a two-minute pitch", steps: steps([
        ["Step 1", "Role fit", "Why this person, for this role, now."],
        ["Step 2", "Experience", "The two or three things that map to the brief."],
        ["Step 3", "Standout win", "One achievement they'll remember."],
        ["Step 4", "Logistics", "Package, notice, location and other processes."],
      ]) },
      tactics: [
        "Before the call, write down the top three objections this client is likely to raise, and your answer to each",
        "Bring data: salary benchmarks, how many people fit the brief, and what competitors are paying",
      ],
      mistakes: [
        "Hiding a salary gap or a long notice period to get the interview",
        "Pitching for five minutes when two would land better",
      ],
    },
    {
      title: "Handling objections live",
      takeaway: "Acknowledge it, ask a clarifying question, answer with evidence, then close for the next step.",
      content: "Every strong reframe follows the same pattern: acknowledge the objection, ask a clarifying question, answer with evidence, then close for the next step. \"Let's see a few more\" often means the client isn't sure what good looks like: that's a moment to requalify the brief, not to source more CVs.",
      tables: [table("Handling objections live", ["The client says", "Reframe it"], [
        ["\"Not enough experience in X.\"", "\"What would they need to have done in X to be credible? Here's where they did something comparable…\""],
        ["\"The salary's too high.\"", "\"Here's what the market pays for this profile right now. Is the budget fixed, or is there room for the right person?\""],
        ["\"Let's see a few more.\"", "\"Happy to. What's missing from this one? If I can address it, are you comfortable meeting them this week?\""],
        ["\"They've moved around a lot.\"", "\"Here's the reason for each move. The last two were company-driven, and here's what they want to stay for.\""],
        ["\"We'll get back to you.\"", "\"Of course. When will you have decided? They're in other processes, so I want to give them an honest timeline.\""],
      ])],
      mistakes: [
        "Using a candidate's other processes as leverage when they aren't real",
        "Sending more CVs when the real problem is an unclear brief",
      ],
      tip: "Ask a question back before you answer. It shows you the real objection behind the one they voiced.",
    },
    {
      title: "You run the timeline, not the client",
      takeaway: "Two or more warning signs on a job means control has slipped. Reset it this week.",
      content: "Most lost control starts at the brief, when no timeline was agreed. Check your live jobs against the warning signs below. If two or more apply, control has slipped and it's time to reset. The habits in the tactics list prevent it happening in the first place: the process is yours to run.",
      tactics: [
        "Set the process timeline upfront and get the client's sign-off in writing",
        "Book feedback slots at the point of submission",
        "Be the one updating both sides, not the one chasing",
        "Push back on delays professionally, to protect the candidate experience",
        "Challenge unrealistic asks with market evidence",
      ],
      mistakes: [
        "The client goes quiet for days with no explanation",
        "Interview stages keep being added without reason",
        "You hear about decisions after they're made",
        "Feedback arrives as one line, or not at all",
        "The candidate knows more about the process than you do",
      ],
    },
    {
      title: "Agree the timeline in writing at the brief",
      takeaway: "A timeline that only exists in your head can't be held to.",
      content: "Every stage needs a date and a feedback deadline, confirmed by the client in writing. The dates below are an example, not a rule: adjust them to the market and the seniority of the role. When a client misses a date, you have something to point back to without it becoming personal. Action: send a written timeline on your highest-priority job this week.",
      tables: [table("An example process timeline", ["Stage", "Target", "What we agree"], [
        ["Shortlist submitted", "Day 5", "Three to five qualified profiles"],
        ["CV feedback", "Within 48 hours", "Yes or no, with a reason for each"],
        ["First interviews", "Week 2", "Slots held in the diary now"],
        ["Interview feedback", "Within 24 hours", "A call with us, not a one-line email"],
        ["Final stage", "Week 3", "All decision makers in the room"],
        ["Offer", "Within 48 hours of the final", "Package approved before the final"],
      ])],
      phrases: [
        "Good candidates are off the market in two to three weeks. If we lock these dates now, I can promise them a fast process. Can I send this over for you to confirm?",
      ],
      tip: "Email the timeline the same day you agree it.",
    },
    {
      title: "Resetting control on a live job",
      takeaway: "The reset works because it's honest, specific and ends with a concrete ask.",
      content: "When a process has drifted, call, don't email. Name it plainly, show the client what it's costing them, check the need is still real, then re-agree dates and confirm them in writing the same day. If the client can't commit to new dates, regrade the job: a role with no committed timeline shouldn't be where your time goes.",
      framework: { title: "Four steps to reset control", steps: steps([
        ["Name it", "Say it plainly", "Call, don't email. Say plainly that the process has drifted."],
        ["Show the cost", "Make it real", "Candidates cooling off, competing offers, time to hire."],
        ["Requalify", "Check the need", "Is the need still real? Has the brief, budget or priority changed?"],
        ["Re-agree", "Lock new dates", "New dates for every stage, confirmed in writing that day."],
      ]) },
      phrases: [
        "I want to be straight with you: we've lost a week, and two of the shortlist are now in final stages elsewhere. Is this still a priority hire? If it is, can we lock in interviews for Tuesday and a decision by Friday?",
      ],
      scenario: {
        title: "Your client has gone quiet for a week on a role you've shortlisted, and two of your candidates are now in final stages elsewhere. What do you do?",
        weak: "Send another chaser email asking for feedback, and keep sourcing in case the client comes back with more requirements.",
        strong: "Call the client today. Say plainly that the process has drifted and what it's costing: two of the shortlist are in final stages elsewhere. Check the hire is still a priority and whether anything has changed. If it is, re-agree dates for interviews and a decision, and confirm them in writing the same day. If the client can't commit, regrade the job and move your time to roles that will close.",
      },
    },
    {
      title: "Practise it: sell in a candidate, then handle three objections",
      takeaway: "Practise the pitch out loud before you need it on a live call.",
      content: "Work in threes: a seller, a client and an observer. The seller uses a real candidate, and the \"client\" uses the three objections the seller wrote down earlier. The client should be realistic, not hostile: the goal is practice, not a gotcha. Afterwards, share the best reframes with your team.",
      framework: { title: "The exercise (25 minutes)", steps: steps([
        ["Set up · 5 min", "Pairs plus an observer", "The seller uses a real candidate. The \"client\" gets the three objections the seller wrote earlier."],
        ["Run · 3 × 5 min", "Pitch, push back, close", "A two-minute sell-in, three objections, and a call that ends with a confirmed next step and date. Rotate roles."],
        ["Debrief · 5 min", "Observer scores 1 to 5", "Outcome, context, proof, risk, objection handling, and whether they closed for a timeline."],
      ]) },
    },
    {
      title: "Takeaways and actions for your desk",
      takeaway: "Sell in with outcome, context, proof and risk. Agree the timeline at the brief.",
      content: "Sell in with outcome, context, proof and risk. Prepare the top three objections before every pitch. Agree the timeline at the brief and book feedback at submission. Two or more warning signs means it's time to reset. Tick off each action below as you do it this week.",
      tactics: [
        "Pre-empt your next submission's top three objections in writing",
        "Set and confirm a written process timeline on your next live job",
        "End every pitch call by anchoring a decision date",
        "Pick one job where you've lost control and reset it by Friday",
      ],
    },
  ],
};

const interviewPrep = {
  _id: "drafts.module-interview-prep",
  _type: "trainingModule",
  title: "Interview Prep & Pre-closing",
  slug: { _type: "slug", current: "interview-prep" },
  eyebrow: "Playbook 08",
  subtitle: "Prep both sides, pre-close every call, and land the offer",
  category: { _type: "reference", _ref: "category-playbook" },
  order: 80,
  icon: "users",
  accent: "sky",
  sections: [
    {
      title: "Leave nothing to chance",
      takeaway: "Placements are won or lost before anyone walks into the room.",
      content: "A candidate who walks in underprepared reflects on us. Even experienced candidates get the basics wrong under pressure: the wrong office, a camera left off, an outfit that doesn't fit the culture. Be specific rather than assuming, and send a written prep email after the call so they have it all in one place. The package matters most: if the candidate expects one number and the manager has heard another, the offer stage will fall apart.",
      framework: { title: "The candidate prep checklist", steps: steps([
        ["Logistics", "Where, when, how", "Dress code, address and route, arrival time. For video: a quiet room, camera on, tech tested."],
        ["Research", "Know the company", "The company, its product and news, and the hiring manager's LinkedIn profile."],
        ["Technique", "Practise STAR", "Send a STAR guide: Situation, Task, Action, Result. Practise two examples together."],
        ["Package", "No surprises", "Confirm the package you submitted them at, so there's no gap with the manager."],
      ]) },
      tip: "Assume nothing. Confirm every detail, every time, in writing and on the phone.",
    },
    {
      title: "Send the weakest credible candidate first",
      takeaway: "Only send people you'd genuinely stand behind for the role.",
      content: "Wherever possible, sequence your shortlist so the first interview is with a credible but not top-ranked candidate. Debrief them in detail and use what you learn to prepare your stronger candidates. Be clear on the line: sending someone you know won't get the job damages the client relationship and the candidate's trust in us.",
      framework: { title: "Sequencing the shortlist", steps: steps([
        ["Gather", "Learn from the first", "The questions asked, the manager's style, and the real responsibilities."],
        ["Use", "Prep the stronger ones", "Prepare your stronger candidates with that intel so they walk in ahead."],
        ["The line", "Stand behind everyone", "Only send people you'd genuinely stand behind for the role."],
      ]) },
      mistakes: ["Sending a candidate you know won't get the job just to make up the numbers"],
    },
    {
      title: "Prepare the answers that win or lose interviews",
      takeaway: "Rehearse \"Why do you want to work for us?\" It's where most interviews are lost.",
      content: "\"Why do you want to work for us?\" is one of the most common interview questions, and one of the most common places interviews are lost. Rehearse it with the candidate. For likely objections, help them prepare a short, honest answer, never a cover story. Then teach them to close the interview: it lets them handle a concern in the room and gives you intel for the debrief.",
      tactics: [
        "\"Why do you want to work for us?\": make it specific and researched (the product, the team, the problem), never just \"growth\"",
        "Prepare an honest framing for the objections: short tenure, a career gap, or a move between start-up and enterprise",
        "Teach the candidate to close the interview with one confident question",
      ],
      phrases: ["Based on our conversation today, do you have any concerns about moving me to the next stage?"],
      mistakes: ["Helping a candidate build a cover story instead of an honest answer"],
    },
    {
      title: "Prep the client to sell, not just to assess",
      takeaway: "Top talent has options. Hearing it from the hiring manager is what makes them want the role.",
      content: "Client prep is underrated and skipped by average recruiters. You know the candidate's push and pull factors from your qualification call. Candidates know you're selling to them, so they may not fully trust you; hearing the same thing from the hiring manager confirms it, makes them want the role more and builds your rapport. For example, if the candidate wants great benefits and the company has them, make sure they hear it from the manager.",
      tactics: [
        "Sell the pull factors: wants the culture or the tech stack? Have the manager sell it. It lands better from them",
        "It's two-way: remind the manager top talent has options, so they need to sell, not just question",
        "Handle small doubts: brief them on the candidate's minor concerns so they can answer them",
        "Confirm the package: share the exact target number so everyone is aligned",
        "Rebuild the excitement: remind them why they liked this candidate in the first place",
      ],
      mistakes: ["Not flagging risks early: over budget, relocating or a counteroffer risk? Say it now, not at offer stage"],
    },
    {
      title: "Pre-close on every call",
      takeaway: "Ask, then stay silent. The pause is where the real answer comes out.",
      content: "Pre-close on every call, to the point where it feels repetitive. A consistent yes gives you something to reference at offer stage. If the answer shifts, asking what's changed uncovers the real reason: a genuine concern, hardball, or lost interest. If they say no with a genuine reason, you have an immediate reason to speak to the client and see if the objection can be overcome.",
      phrases: [
        "Great to hear the interview went well. I know it's early, but based on everything you know, if we got you the package you want, would you accept?",
      ],
      framework: { title: "What to do with the answer", steps: steps([
        ["If yes", "Log it", "At offer stage: \"Last time, you said if I got you X you'd accept. What's changed?\""],
        ["If no", "Get the real reason", "Take it to the client, and set up a call between them if needed."],
        ["Then", "Stay silent", "Let them talk. Don't fill the pause."],
      ]) },
    },
    {
      title: "Four questions that uncover the full picture",
      takeaway: "Anything less than a 10 out of 10 gives you something to work on.",
      content: "These four questions surface the push factors, the real level of interest, the competition and the counteroffer risk before they can derail the offer. Anything less than a 10 gives you material to prep the hiring manager with. Other companies a candidate is interviewing with are also business development leads.",
      framework: { title: "The four questions", steps: steps([
        ["Push factors", "Restate their reasons", "Restate the reasons they gave for wanting to leave."],
        ["Out of 10", "Find the gap", "\"How excited are you, out of 10? What's stopping it being a 10?\""],
        ["Competing offers", "Know the competition", "Where else are they interviewing, and which do they prefer?"],
        ["Counteroffer risk", "Test it early", "\"Would anything make you stay?\" If yes: \"Why haven't they done that already?\""],
      ]) },
      phrases: [
        "How excited are you, out of 10? What's stopping it being a 10?",
        "Would anything make you stay?",
        "Why should it take the threat of you leaving for you to get what you need?",
      ],
      scenario: {
        title: "Your candidate has had a strong final interview, but mentions a competing offer that's slightly higher. How do you handle the call?",
        weak: "Tell them the other offer is a mistake, push them to accept yours, and promise to get the client to match the money.",
        strong: "Stay calm and ask questions. Restate the push factors they gave you for leaving, and ask how the other role compares on each. Ask how excited they are about each role out of 10, and what's stopping either being a 10. Find out how their current employer will react and whether anything would make them stay. Let them reach their own decision, then take any genuine gap to the client. The other company is also a business development lead.",
      },
    },
    {
      title: "Debrief both sides within hours, not days",
      takeaway: "Momentum dies fast after an interview. Debrief both sides the same day.",
      content: "Call the candidate as soon as they come out, and the client the same day. Always get a next step with a date from the client before you hang up. Pass feedback both ways quickly and honestly. If you sent the weakest credible candidate first, this is where you collect the intel for the rest of the shortlist.",
      tables: [table("The debrief questions", ["Ask the candidate", "Ask the client"], [
        ["How did it go, in your words?", "What did you like most?"],
        ["What were you asked?", "Any concerns we should address?"],
        ["Any concerns about the role or team?", "How do they compare to the others?"],
        ["Out of 10, where are you now?", "What is the next step, and when?"],
        ["Then pre-close again", "Then share the candidate's feedback"],
      ])],
    },
    {
      title: "Practise it: a prep call, then pre-close a competing offer",
      takeaway: "Success is a candidate who reaches their own decision, not one who feels pushed.",
      content: "Work in threes. The person playing the candidate has a competing offer that's slightly higher, but the other role is weaker on their main push factor. Uncover that through questions, don't guess it. Success is a candidate who reaches their own decision, not one who feels pushed.",
      framework: { title: "The exercise (30 minutes)", steps: steps([
        ["Prep call · 10 min", "Run the checklist", "Prep your partner for a real interview: logistics, research, STAR, package and the closing question."],
        ["Pre-close · 10 min", "The competing offer", "The candidate has another offer. Uncover the full picture and coach towards a decision without pushing."],
        ["Debrief · 10 min", "Observer feedback", "Did they use silence? Find the 10 out of 10 gap? Ask about counteroffers? Rotate roles."],
      ]) },
    },
    {
      title: "Takeaways and actions for your desk",
      takeaway: "Pre-close. Then pre-close again.",
      content: "Prep is where interviews are won. Client prep is as important as candidate prep. Pre-close on every single call, use silence to uncover the real answer, and debrief both sides the same day. Apply this to the live candidate in your current process, and tick off each action below this week.",
      tactics: [
        "Send a written prep email for every interview",
        "Brief each client on the candidate's push and pull factors",
        "Log a pre-close answer for every candidate",
        "Ask the out-of-10 question on every call",
        "Check counteroffer risk on every finalist",
      ],
    },
  ],
};

const quiz = [
  {
    _id: "drafts.quiz-playbook-07-01", module: "module-client-control", afterSection: 2,
    question: "In the four-part sell-in, what should come last?",
    options: ["The candidate's full CV history", "Logistics, ending with a request for a decision date", "A list of the candidate's soft skills", "The fee"],
    correct: 1,
    explanation: "Outcome, context and proof build the case; logistics come last and are never skipped. Asking for a decision date is part of the pitch, not an afterthought.",
  },
  {
    _id: "drafts.quiz-playbook-07-02", module: "module-client-control", afterSection: 6,
    question: "Two or more warning signs apply to one of your live jobs. What should you do?",
    options: ["Wait another week to see if it picks up", "Send more CVs to re-engage the client", "Call the client and reset control on the process", "Pass the job to a colleague"],
    correct: 2,
    explanation: "Two or more signs means control has slipped. Call, name it plainly, show the cost, requalify the need and re-agree dates in writing.",
  },
  {
    _id: "drafts.quiz-playbook-08-01", module: "module-interview-prep", afterSection: 2,
    question: "Why send the weakest credible candidate to interview first?",
    options: ["So the client lowers their expectations", "To learn the questions and the manager's style, and prep your stronger candidates", "Because they're the most available", "To fill the client's diary"],
    correct: 1,
    explanation: "Debrief the first interview in detail and use what you learn to prepare the stronger candidates. Only ever send people you'd genuinely stand behind.",
  },
  {
    _id: "drafts.quiz-playbook-08-02", module: "module-interview-prep", afterSection: 6,
    question: "A candidate says they're a 7 out of 10 on the role. What's your next step?",
    options: ["Move on: 7 is good enough", "Ask what's stopping it being a 10", "Tell them the role is better than they think", "Drop them from the process"],
    correct: 1,
    explanation: "Anything less than a 10 gives you material to work with. Find out what's missing, and use it to prep the hiring manager.",
  },
// The modules are drafts too, so link to them the way the Studio does for unpublished documents:
// a weak link that becomes a normal one when the module is published.
].map(({ module, ...q }) => ({ ...q, _type: "quizQuestion", module: { _type: "reference", _ref: module, _weak: true, _strengthenOnPublish: { type: "trainingModule" } } }));

// Check against the Studio's limits.
const problems = [];
for (const m of [clientControl, interviewPrep]) {
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
if (problems.length) { console.error("Problems:\n  " + problems.join("\n  ")); process.exit(1); }

for (const m of [clientControl, interviewPrep]) {
  const count = (f) => m.sections.reduce((n, s) => n + (s[f]?.length ?? 0), 0);
  console.log(`${m.title}: ${m.sections.length} sections, ${m.sections.filter((s) => s.framework).length} frameworks, ${count("tables")} tables, ${m.sections.filter((s) => s.tip).length} tips, ${count("tactics")} tactics, ${count("phrases")} phrases, ${count("mistakes")} mistakes, ${m.sections.filter((s) => s.scenario).length} scenarios`);
}
console.log(`Quiz questions: ${quiz.length}`);
if (dryRun) { console.log("Dry run: nothing sent to Sanity."); process.exit(0); }

const client = createClient({ projectId, dataset, token: process.env.SANITY_WRITE_TOKEN, apiVersion: "2025-02-19", useCdn: false });
const tx = client.transaction();
for (const doc of [...categories, clientControl, interviewPrep, ...quiz]) tx.createIfNotExists(doc);
// Put the existing (published) modules into Core skills, unless they already have a group.
const existing = await client.fetch(`*[_type == "trainingModule" && !(_id in path("drafts.**")) && !defined(category)]._id`);
for (const id of existing) tx.patch(id, (p) => p.set({ category: { _type: "reference", _ref: "category-core" } }));
await tx.commit({ visibility: "sync" });
console.log(`Imported. ${existing.length} existing modules put in Core skills.`);
