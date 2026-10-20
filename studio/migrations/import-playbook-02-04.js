// One-off import: Recruitment Playbook modules 02 (The Recruitment Lifecycle) and 04 (Job
// Specification & Qualification), written from the classroom decks and their trainer notes.
// Needs the "Recruitment Playbook" group, which import-playbook-07-08.js creates (run that first).
//
// Run from the project root:  npm run import:playbook-02-04 -- --dry-run   (check only)
//                             npm run import:playbook-02-04                (import)
// The two modules and their quiz questions arrive as DRAFTS. See playbook-kit.js for the options.
import { steps, table, quizDrafts, importPlaybook } from "./playbook-kit.js";

const lifecycle = {
  _id: "drafts.module-recruitment-lifecycle",
  _type: "trainingModule",
  title: "The Recruitment Lifecycle",
  slug: { _type: "slug", current: "recruitment-lifecycle" },
  eyebrow: "Playbook 02",
  subtitle: "Seven connected stages, from business development to aftercare, for a repeatable desk",
  category: { _type: "reference", _ref: "category-playbook" },
  order: 20,
  icon: "rocket",
  accent: "brand",
  sections: [
    {
      title: "Seven stages, one placement",
      takeaway: "Miss one stage and the whole desk gets harder. Nail all seven and you build a repeatable pipeline.",
      content: "This is the map for the whole Playbook. Every other module is a deep dive on one or two of these stages, so the aim here is breadth, not depth: be able to name all seven stages in order and explain what goes wrong when one is skipped. A weak intake gives a weak shortlist, a skipped pre-close becomes a lost offer, and no aftercare means no referral. It's a loop, not a line: aftercare feeds referrals and repeat business, and the loop starts again. Keep one live role in mind as you go, and note one thing you did well and one thing you skipped at each stage.",
      framework: { title: "The 360° process", steps: steps([
        [null, "Business development", "No candidates without clients. Deep dive: Playbook 05 and 06."],
        [null, "Job intake", "A weak brief creates a weak shortlist. Deep dive: Playbook 04."],
        [null, "Sourcing and screening", "Speed and quality are a discipline, not a trade-off. Deep dive: Playbook 03."],
        [null, "Submission", "A sales document, not a CV forward. Deep dive: Playbook 07."],
        [null, "Interview prep and pre-closing", "Won or lost in prep, not in the room. Deep dive: Playbook 08."],
        [null, "Offer and close", "Where deals are made, and lost. Deep dive: Playbook 09."],
        [null, "Onboarding and aftercare", "Not done until they've started, and stayed. Then back to stage 1."],
      ]) },
    },
    {
      title: "Stage 1: no candidates without clients, and no clients without trust",
      takeaway: "Relationships open doors. Results keep them open.",
      content: "Every placement starts here. Think about your current clients: which came from a warm introduction, and which from a cold call? Referred calls convert far better. Qualify the client as hard as you qualify candidates: a slow payer or an indecisive hiring manager costs you weeks. Tick the habits you already have; the rest are your focus this week.",
      tactics: [
        "Time it right: target funding rounds, leadership changes and headcount growth",
        "Lead with insight: share a benchmark or competitor move before you ask for anything",
        "Map the stakeholders: HR, hiring managers and finance, never just one contact",
        "Qualify the client: fair payer, realistic timelines, decisive?",
        "Use warm intros: a referred call converts far better than a cold one",
        "Track every touch: BD is a long cycle, so log every touchpoint and no lead slips",
      ],
      tip: "Practise a first-touch call that opens with a market insight, not a pitch. Did it earn a second conversation?",
    },
    {
      title: "Stage 2: a weak brief creates a weak shortlist",
      takeaway: "Most failed searches trace back to a ten-minute intake call that should have been forty.",
      content: "Garbage in, garbage out. Test the last brief you took against the six boxes below. Which one was empty? That gap is usually where the search stalled. Practise by running a mock qualification call and naming the three most important open questions you still have at the end.",
      framework: { title: "Six things every brief needs", steps: steps([
        [null, "The real reason", "Backfill, growth or restructure: each changes how you sell it."],
        [null, "Who decides", "Who interviews, who signs off, and who can veto."],
        [null, "Agree the process", "Lock stages, timings and feedback deadlines up front."],
        [null, "Push and pull", "What makes a great candidate say yes, and what makes them say no."],
        [null, "Budget and flex", "Exact range, bonus, equity, and where there's real room to move."],
        [null, "Market reality", "Unrealistic brief? Say so now, not after three failed submissions."],
      ]) },
      tip: "Ask \"why\" three times before you ask \"what\".",
    },
    {
      title: "Stage 3: speed and quality are a discipline, not a trade-off",
      takeaway: "The best candidate is rarely the one who applied first.",
      content: "Reach beyond the people already looking, screen against the brief rather than keywords, and keep your list live. Practise by screening a mock CV against a live brief and listing the first three questions you'd ask.",
      tactics: [
        "Go beyond job boards: reach passive talent through outreach, referrals and your network",
        "Screen to the brief: motivation and fit matter as much as skills on paper",
        "Qualify motivation: what's driving the move, and what would make them stay?",
        "Test real interest: \"What would stop you accepting an offer here?\"",
        "Confirm the basics early: target package, notice period and work authorisation",
        "Keep the list live: drop candidates who cool off so they don't clog the pipeline",
      ],
      mistakes: [
        "Asking for current or past salary. Ask for the target or expected package: salary-history questions are banned in New York City and many US states",
        "Asking about citizenship or visa type. Ask \"Are you legally authorised to work in the US?\" and \"Will you now or in the future need visa sponsorship?\"",
      ],
    },
    {
      title: "Stage 4: a submission is a sales document, not a CV forward",
      takeaway: "Sell the person, not just the profile: why this person, why now, and what the risk is.",
      content: "Put a strong submission email next to a bare CV forward and it's obvious which one a hiring manager acts on. Your summary should answer three things: why this person, why now, and what the risk is. Setting a feedback deadline at submission is your first act of client control.",
      tactics: [
        "Always add a summary: motivation, fit and the standout wins the CV can't show",
        "Map to the brief: make the relevance obvious, don't make the client work for it",
        "Flag it up front: target package, competing processes and notice period",
        "Submit in batches: a side-by-side comparison speeds up decisions",
        "Set a deadline for feedback",
        "Prep for the wait: manage the timeline so candidates don't cool off or go elsewhere",
      ],
      phrases: ["Can we get first thoughts by Thursday?"],
      tip: "Practise writing a two-line submission summary for a candidate with an unconventional background.",
    },
    {
      title: "Stage 5: interviews are won or lost in prep, not in the room",
      takeaway: "Pre-close, then pre-close again, and again.",
      content: "Client prep is as important as candidate prep, and it's the step average recruiters skip. Send the weakest credible candidate first only where it's genuinely possible, and never send someone you wouldn't stand behind.",
      framework: { title: "Six habits of great interview prep", steps: steps([
        [null, "Prep the candidate", "Logistics, research, STAR answers and objection handling."],
        [null, "Prep the client", "Share push and pull factors so they sell as well as assess."],
        [null, "Pre-close every call", "Ask the pre-close question below, every time."],
        [null, "Send the weakest first", "Use the first interview to gather intel for the stronger ones."],
        [null, "Debrief in hours", "Both sides, same day. Momentum dies fast."],
        [null, "Track the answer", "Log every pre-close response so you can spot it shifting."],
      ]) },
      phrases: ["If we got you the package you want, would you accept?"],
    },
    {
      title: "Stage 6: the offer stage is where deals are made, and lost",
      takeaway: "If you've pre-closed properly, the offer should never surprise anyone.",
      content: "Think of a deal you lost at offer stage and work back: which earlier stage was weak? Almost always it's a missed pre-close or a counteroffer nobody prepared for. Present the offer live, because you hear the hesitation an email hides.",
      tactics: [
        "Verbal before written: confirm acceptance in principle before paperwork goes out",
        "Present it live: walk through package, start date and next steps. Never just email it",
        "Raise the counteroffer before it happens",
        "Lock the start date: firm acceptance and start date in the same conversation",
        "Keep both sides warm: resignation, notice and contract signing all carry risk",
        "Have the plan ready: restate why they wanted to leave before their employer can",
      ],
      phrases: ["Would they counter? What would make you stay?"],
    },
    {
      title: "Stage 7: the placement isn't done until they've started, and stayed",
      takeaway: "The relationship doesn't end at sign-off. Aftercare turns one placement into the next three.",
      content: "A 30-day call to the hiring manager is a business development call with a warm reason to ring. Happy candidates and clients are your best new-business source, which takes you straight back to stage 1. Put calendar reminders in for every current starter today.",
      tables: [table("Aftercare check-ins", ["When", "Who", "What you cover"], [
        ["Weekly until day one", "Candidate", "Head off counteroffers and cold feet"],
        ["Before day one", "Both sides", "Start time, contact, equipment and first-week plan"],
        ["Day one and week one", "Both sides", "How it's going; fix small problems early"],
        ["30, 60 and 90 days", "Both sides", "Ask for feedback, referrals and the next hire"],
      ])],
      tactics: [
        "Ask for feedback: it protects the relationship and surfaces repeat business",
        "Ask for referrals from every happy candidate and client",
        "Log the history: what worked and what didn't, so the next search starts faster",
      ],
    },
    {
      title: "Practise it: a lifecycle audit of one live role",
      takeaway: "Your lowest-scoring stage tells you which Playbook module to do next.",
      content: "Work in pairs, each bringing one live or recently lost role from your desk. The stage people skip most is usually client prep or aftercare. Take your \"one fix\" to your next 1:1 with your manager.",
      framework: { title: "The exercise (30 minutes)", steps: steps([
        ["Set up · 5 min", "Pick a real role", "Pairs. Each person brings one live or recently lost role from their desk."],
        ["Run · 2 × 10 min", "Score each stage", "Your partner asks the six questions for each stage. Score it 1 to 5 and note the weakest point."],
        ["Debrief · 5 min", "One fix, today", "Name the lowest-scoring stage and the one action you'll take on it before the end of the day."],
      ]) },
      scenario: {
        title: "Your candidate turns down an offer at the last minute: their employer has matched it, and the start date was never agreed. Which stages let you down, and what will you do differently?",
        weak: "Put it down to bad luck, tell the client the candidate was never serious, and send the next CV on the shortlist.",
        strong: "Work back through the stages. At screening (stage 3), did you ask what would make them stay? At interview prep (stage 5), did you pre-close on every call and track the answer? At offer (stage 6), did you raise the counteroffer before it happened, present the offer live, and lock the start date in the same conversation? Be honest with the client about what happened, re-engage your next-best candidate, and fix the weakest stage on your other live roles this week.",
      },
    },
    {
      title: "Takeaways and actions for your desk",
      takeaway: "Seven stages. Nail every one.",
      content: "Every placement runs on seven connected stages. A weak stage shows up later as a lost deal. Prep the client as hard as the candidate. Pre-close on every call and track the answer. Aftercare is the start of the next placement. Test yourself: can you name the seven stages in order from memory? Tick off each action below as you do it this week.",
      tactics: [
        "Fix the weakest stage on your audited role",
        "Set a feedback deadline on every submission",
        "Pre-close every candidate in process",
        "Book 30/60/90-day check-ins for every starter",
        "Ask one placed candidate for a referral",
      ],
    },
  ],
};

const jobSpec = {
  _id: "drafts.module-job-specification",
  _type: "trainingModule",
  title: "Job Specification & Qualification",
  slug: { _type: "slug", current: "job-specification" },
  eyebrow: "Playbook 04",
  subtitle: "Qualify every role before you source, and spend your time where placements happen",
  category: { _type: "reference", _ref: "category-playbook" },
  order: 40,
  icon: "target",
  accent: "sky",
  sections: [
    {
      title: "Garbage in, garbage out",
      takeaway: "Your most valuable asset is your time. Poor qualification is how it gets wasted.",
      content: "Have you ever worked a role for two weeks and then found out it was never going to be filled? That time is the cost of poor qualification. The spec is the blueprint for sourcing, outreach and assessment, so this is where every placement starts. Every qualification call should answer four questions: is it a real, active need? Can we realistically fill it? Is the client committed? Is it worth prioritising?",
      tables: [table("Weak or strong qualification?", ["Area", "Weak qualification", "Strong qualification"], [
        ["What it feels like", "Busy, not productive", "Speed, delivery, revenue"],
        ["The role", "Sourcing for a role that was never real", "Clarity on role, skills, level, package and location"],
        ["Submissions", "Rejected for reasons nobody told you", "Sharper sourcing and better candidates"],
        ["Package", "Salary gaps discovered at offer stage", "Market reality set with the client on day one"],
        ["The result", "Low fill rate, wasted weeks", "Higher fill rate, more placements"],
      ])],
    },
    {
      title: "Ask better questions before you take the role",
      takeaway: "Need tells you how to sell it, Process how fast you can move, Package if it's fillable, and Risk how much time it deserves.",
      content: "Grouping the qualification questions into four areas makes them easy to remember and easy to check off on the call. A backfill, a growth hire and a restructure sound very different to a candidate, so the Need questions shape your pitch. The column most people skip is Risk.",
      tables: [table("The qualification call", ["Need", "Process", "Package", "Risk"], [
        ["Why is this hire needed?", "Who interviews, who decides, who can veto?", "Is budget approved?", "What happens if it isn't filled?"],
        ["Why now?", "How many stages, how long?", "Base, bonus, equity range?", "Other agencies working it?"],
        ["What problem are they solving?", "Feedback within how many hours?", "Where is the flex?", "Internal candidates?"],
        ["What does success look like in 6 to 12 months?", "Must-have skills?", "In-office requirements?", "Any red flags so far?"],
      ])],
      tip: "Ask \"why\" three times before you ask \"what\". The real reason for the hire changes how you sell it.",
    },
    {
      title: "The best recruiters spend the most time on the best jobs",
      takeaway: "Urgency, clarity, engagement, realistic expectations and a high probability of close.",
      content: "A high-quality job has a strong probability of being filled, a committed client and clear requirements. Score your live spec against the six signs below, one point each. Anything under four is a warning sign: qualify it further with the client this week, or deprioritise it.",
      framework: { title: "Six signs of a high-quality job", steps: steps([
        [null, "Clear hiring need", "The client knows exactly why they're hiring."],
        [null, "Committed client", "Engaged, responsive, willing to partner."],
        [null, "Realistic expectations", "Skills, package and location match the market."],
        [null, "Fillability", "Can we realistically find this person?"],
        [null, "Defined process", "Clear stages. Red flag: \"We're still figuring it out.\""],
        [null, "Competitive opportunity", "Top candidates need a compelling reason to move."],
      ]) },
    },
    {
      title: "Separate the essentials from the wish list",
      takeaway: "Every nice-to-have you move out of the must-have column widens the talent pool.",
      content: "Most job descriptions list fifteen requirements as if they were all equal. In reality three to five are non-negotiable and the rest are a wish list. Use the test question word for word on every qualification call, then ask the follow-ups: what are the top three to five non-negotiables? What could flex for an exceptional person? What made past hires succeed?",
      tables: [table("Example: a backend engineer building LLM products", ["Must have", "Nice to have"], [
        ["Required language, e.g. Python", "LangGraph experience"],
        ["Active TS/SCI clearance", "Start-up background"],
        ["Built production LLM applications", "AWS certification"],
        ["5+ years backend engineering", "Mentoring engineers"],
        ["Authorised to work in the US", "Kubernetes knowledge"],
      ])],
      phrases: ["If a candidate didn't have this, would you still interview them?"],
      tip: "If the answer to the test question is no, it's a must-have. Anything else belongs on the wish list.",
      mistakes: [
        "Asking about citizenship or visa type. Work authorisation is a fair must-have, but ask \"authorised to work in the US?\" and \"need sponsorship now or in future?\"",
      ],
    },
    {
      title: "Grade every job A, B or C, and work it accordingly",
      takeaway: "A jobs get your best hours. Ask what it would take to move every job up a grade.",
      content: "Grading is how you protect your time. A jobs get your best hours and your best candidates. B jobs get worked steadily, with a plan to turn them into A jobs: ask for exclusivity once you've proven quality. C jobs get minimal time; the right move is often to ask the client what it would take to make it exclusive, or to walk away. Grade your live spec now with the quick questions.",
      tables: [table("Job grading", ["Sign", "A: high priority", "B: medium priority", "C: low priority"], [
        ["Commitment", "Retained or exclusive, urgent need", "Not retained, but committed to fill", "Multiple agencies, no commitment to you"],
        ["Relationship", "Strong relationship, fast feedback", "Some engagement", "Poor communication"],
        ["The brief", "Clear requirements, competitive package", "Decent opportunity, moderate urgency", "Unrealistic expectations, low urgency"],
        ["Your time", "Your best hours and candidates", "Steady work, with a plan to reach A", "Minimal time, or walk away"],
      ])],
      tip: "Quick grading: is it urgent? Can we fill it? Is the client engaged? Is the package competitive? Is the process clear?",
    },
    {
      title: "Know exactly who you're looking for before you search",
      takeaway: "Find the best candidates, in the fastest way possible, through the right channels.",
      content: "The qualification call gives you everything you need here. If you can't fill in all three parts, the role isn't qualified yet: go back to the client. Then challenge yourself: is the company list too narrow? Are you only fishing in the obvious ponds?",
      framework: { title: "Build the search", steps: steps([
        ["Target candidate", "Define the hire", "Which companies they come from, which titles are relevant, must-haves vs nice-to-haves."],
        ["Persona", "Picture the ideal hire", "Industry background, company size and stage, location and work pattern, technical depth."],
        ["Target companies", "Map where they sit", "Direct competitors, the same tech stack or problems, and where the best talent is."],
      ]) },
    },
    {
      title: "Turn the spec into Boolean searches",
      takeaway: "Must-haves go in the string. Nice-to-haves rank the results.",
      content: "Build the string piece by piece and watch how the results change as you add or remove an AND. Run the same logic across channels: LinkedIn Recruiter, Bullhorn, job boards, and GitHub for engineers. Throughout the search, feed market feedback back to the client and requalify the role if priorities change.",
      tables: [table("Building the string", ["Part", "How to write it", "Example"], [
        ["Titles", "Every variant the market uses, joined with OR", "(\"backend engineer\" OR \"software engineer\")"],
        ["Core skills", "Must-haves only, joined with AND", "AND (Python OR Go)"],
        ["Keywords", "Tools, domains and synonyms in quotes", "AND (LLM OR \"large language model\")"],
        ["Location", "Filter to where they can work", "AND (\"New York\" OR NYC)"],
        ["Exclusions", "NOT strips out the noise", "NOT (recruiter OR intern)"],
      ])],
      mistakes: [
        "Putting nice-to-haves in the AND chain and shrinking the pool to nothing",
      ],
    },
    {
      title: "Practise it: qualify, grade and build the search for one live role",
      takeaway: "Did you downgrade a role once you asked the right questions? That's the lesson.",
      content: "Use a real spec from your desk so the output is useful straight away. The \"hiring manager\" should hold back information unless asked the right question: that's the point of the drill.",
      framework: { title: "The exercise (30 minutes)", steps: steps([
        ["Qualify · 10 min", "Mock intake call", "Your partner plays the hiring manager for a real spec. Ask the qualification questions and find the must-haves."],
        ["Grade · 5 min", "A, B or C?", "Grade the role with the five quick questions and defend the grade to your partner."],
        ["Build · 15 min", "Search plan", "A persona, ten target companies and one Boolean string. Run it and count the results."],
      ]) },
      scenario: {
        title: "A new client sends a spec with fifteen \"essential\" requirements. Budget isn't confirmed, three other agencies are working it, and the hiring manager says the process is \"still being figured out\". What do you do?",
        weak: "Thank them, start sourcing straight away against all fifteen requirements, and send CVs as fast as possible to beat the other agencies.",
        strong: "Book a proper qualification call before you source. Work through Need, Process, Package and Risk: why the hire, who decides, whether budget is approved, what happens if it isn't filled. Use the test question to cut the fifteen requirements to three to five must-haves. As it stands, it's a C job: say so plainly, and ask what it would take to make it exclusive with a defined process and agreed feedback times. If the client won't commit, give it minimal time and put your hours into your A jobs.",
      },
    },
    {
      title: "Takeaways and actions for your desk",
      takeaway: "Qualify first. Then search.",
      content: "Qualify every role before you source. Spend your time on A jobs. Challenge unrealistic asks early. Separate must-haves to widen the pool. The spec is your blueprint for the search. Tick off each action below as you do it this week.",
      tactics: [
        "Grade every open role A, B or C",
        "Confirm three to five must-haves on each A job",
        "Lock the interview process and timeline",
        "Build a persona and Boolean string for each A job",
        "Requalify any role that has changed",
      ],
    },
  ],
};

const quiz = quizDrafts([
  {
    _id: "drafts.quiz-playbook-02-01", module: "module-recruitment-lifecycle", afterSection: 3,
    question: "When you screen a candidate, what should you ask about pay?",
    options: ["Their current salary", "Their target or expected package", "Their salary history", "Nothing until the offer stage"],
    correct: 1,
    explanation: "Ask for the target or expected package, never current or past salary. Salary-history questions are banned in New York City and many US states.",
  },
  {
    _id: "drafts.quiz-playbook-02-02", module: "module-recruitment-lifecycle", afterSection: 6,
    question: "You lose a deal at offer stage. Which earlier step is most often the cause?",
    options: ["The job advert", "A missed pre-close, or a counteroffer nobody prepared for", "The number of interview stages", "The fee"],
    correct: 1,
    explanation: "Work back through the stages. Almost always it's a missed pre-close or a counteroffer nobody prepared for. If you've pre-closed properly, the offer should never surprise anyone.",
  },
  {
    _id: "drafts.quiz-playbook-04-01", module: "module-job-specification", afterSection: 4,
    question: "Which question tells you whether a requirement is a true must-have?",
    options: ["\"Is this on the job description?\"", "\"If a candidate didn't have this, would you still interview them?\"", "\"Would this be nice to have?\"", "\"How many candidates have this?\""],
    correct: 1,
    explanation: "If the answer is no, it's a must-have. Anything else belongs on the wish list, and every nice-to-have you move widens the talent pool.",
  },
  {
    _id: "drafts.quiz-playbook-04-02", module: "module-job-specification", afterSection: 5,
    question: "A role is with several agencies, the client is slow to reply, and expectations are unrealistic. How should you work it?",
    options: ["As an A job: work it hardest to beat the other agencies", "As a C job: minimal time, and ask what it would take to make it exclusive, or walk away", "Send every CV you have", "Ignore it without telling the client"],
    correct: 1,
    explanation: "That's a C job. Protect your time: ask the client what it would take to make it exclusive, or walk away, and put your best hours into A jobs.",
  },
]);

await importPlaybook([lifecycle, jobSpec], quiz);
