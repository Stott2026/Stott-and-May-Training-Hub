// One-off import: Recruitment Playbook module 03 (Candidate Sourcing & Qualification), written from
// the classroom deck and its trainer notes. Needs the "Recruitment Playbook" group, which
// import-playbook-07-08.js creates (run that first).
//
// Run from the project root:  npm run import:playbook-03 -- --dry-run   (check only)
//                             npm run import:playbook-03                (import)
// The module and its quiz questions arrive as DRAFTS. See playbook-kit.js for the options.
import { steps, table, quizDrafts, importPlaybook } from "./playbook-kit.js";

const sourcing = {
  _id: "drafts.module-candidate-sourcing",
  _type: "trainingModule",
  title: "Candidate Sourcing & Qualification",
  slug: { _type: "slug", current: "candidate-sourcing" },
  eyebrow: "Playbook 03",
  subtitle: "Find the right people, qualify them properly, and keep them warm until their first day",
  category: { _type: "reference", _ref: "category-playbook" },
  order: 30,
  icon: "user",
  accent: "lime",
  sections: [
    {
      title: "The qualification call, in seven steps",
      takeaway: "Same order, every time, so nothing gets missed. Never hang up without a next step booked.",
      content: "Candidates are one half of every placement, and most deals that fall over do so because of something we didn't find out on the first call. Motivation is the single best predictor of whether a candidate will accept: if you can't write down their push and pull factors after the call, you haven't qualified them. Ask your team lead for your desk's five domain questions (for example, software engineering: stack, scale, system design; energy: project types, licensing; GTM sales: quota, attainment, deal size).",
      framework: { title: "The seven steps", steps: steps([
        [null, "Intro", "Who you are, your niche, why you called."],
        [null, "Motivation", "Push and pull: why move, why now."],
        [null, "Experience", "Walk the CV: wins and scope."],
        [null, "Domain", "Your desk's technical questions."],
        [null, "Logistics", "Package, location, notice, right to work."],
        [null, "Referrals", "Leads, names, other processes."],
        [null, "Next step", "Book client intro slots before you hang up, e.g. \"Monday 9 to 12 or Wednesday 3 to 5\"."],
      ]) },
      phrases: ["I'm [Name] at Stott and May. I specialise in placing [engineers] into [VC-backed start-ups in New York]. Have you got ten minutes?"],
      tip: "Dial once, dial again. Calls drop and people miss the first ring: a second attempt minutes later often connects.",
    },
    {
      title: "The questions that protect the deal",
      takeaway: "\"What would stop you accepting an offer?\" surfaces real objections faster than any other question.",
      content: "Motivation questions tell you whether this candidate will actually move. Logistics questions stop late-stage surprises: note the wording, as the next section explains. Network questions turn every candidate call into business development: managers' names become leads, and competing processes tell you who's hiring. Log everything as pre-screen notes in Bullhorn and add the candidate to the right hotlist.",
      tables: [table("Three sets of questions", ["Motivation: why move?", "Logistics: can it work?", "Network: who else?"], [
        ["What's prompting you to look now?", "Target package for your next role?", "Who's the best engineer you've worked with?"],
        ["What would your next role need to have?", "Location and hybrid, onsite or remote?", "Who's your manager? Are they hiring?"],
        ["What would make you stay where you are?", "Notice, start date, booked holiday?", "Any meetups or communities you attend?"],
        ["Which other processes are you in?", "Authorised to work in the US? Sponsorship needed?", "When are you free for a 30-minute client intro?"],
      ])],
    },
    {
      title: "Ask it the right way",
      takeaway: "Ask for target package and work authorisation, never salary history or visa type.",
      content: "New York City and many US states ban salary-history questions, and federal law restricts questions about citizenship status. One wrong question can put the client, the candidate and us at risk. The target package gives you everything you need to submit at the right number. This isn't legal advice: if in doubt, check with your manager or HR before asking.",
      tables: [table("Don't ask, ask instead", ["Topic", "Don't ask", "Ask instead"], [
        ["Pay", "\"What are you earning now?\"", "\"What package are you targeting for your next role?\""],
        ["Right to work", "\"Are you a citizen? Green card, H-1B, OPT?\"", "\"Are you legally authorised to work in the US? Will you now or in future need visa sponsorship?\""],
        ["Personal", "Age, family plans, religion, health, nationality", "Only what the job needs: availability, travel, location"],
      ])],
      mistakes: [
        "Recording current salary or immigration details in Bullhorn when a candidate volunteers them. Note the target package and \"sponsorship required: yes / no\" only",
      ],
    },
    {
      title: "Lock in representation within the hour",
      takeaway: "No \"Confirmed\", no submission.",
      content: "Representation protects the deal: without written confirmation, a duplicate submission from another agency can cost us the fee. Send the email within the hour while the call is fresh, attach the job description, and follow up with a text so it doesn't sit in their inbox. Check [Client] is the same company all the way through before you send. Set expectations (timeline, process stages, how often you'll update them, and exactly what your role is), then do exactly that.",
      phrases: [
        "Email: \"Hi [Name], great speaking today. As discussed, this email confirms you're giving Stott and May exclusive representation of your candidacy for [Client], and that you haven't authorised any other agency or third party to submit your details to [Client] in the past 12 months. Please reply 'Confirmed' so we can move ahead. The role details and a short pitch pack on [Client] are below.\"",
        "Text: \"Just sent the details for [Client]. Reply 'Confirmed' and send your latest CV when you can.\"",
      ],
      tip: "Log it straight away: pre-screen notes, hotlist and a LinkedIn connection.",
    },
    {
      title: "The client pitch pack: sell the role with facts",
      takeaway: "Candidates are wary of being sold to, but well-researched facts are persuasive on their own.",
      content: "The pitch pack goes underneath the representation email. Build one for each of your clients, refresh the funding and press lines every quarter, and save it in the shared drive so the whole team can reuse it. Check every fact against the client's own website before sending. Worked example (Merge): a unified API, so SaaS companies integrate once and get access to hundreds of third-party integrations. Founded in 2020 by Shensi Ding (CEO) and Gil Feig (CTO), who both saw at early-stage start-ups how painful integrations were. Stage: Series B, with seed and Series B coverage in TechCrunch and Built In.",
      framework: { title: "Five parts, every client", steps: steps([
        [null, "Key links", "Website, careers page, LinkedIn."],
        [null, "What they do", "The product, and the problem it solves."],
        [null, "Founders", "Who they are, and why they built it."],
        [null, "Funding and stage", "Latest round, and investors."],
        [null, "Recent press", "Two or three links from the last 12 months."],
      ]) },
    },
    {
      title: "The channel map: never rely on one source",
      takeaway: "The best candidates are usually passive, so direct outreach should be most of your sourcing time.",
      content: "Every team sources differently: engineering desks lean on LinkedIn and meetups, Evergreen relies more on cold calling and industry events, and contract desks lean on hotlists and referrals. Which two channels work best on your desk, and which one have you never tried? Commit to adding one new channel this month.",
      tables: [table("Three ways to find candidates", ["Direct outreach: go to the passive market", "Inbound: let candidates find you", "Market and community: map where talent lives"], [
        ["LinkedIn connection messages", "Job boards", "Competitor mapping"],
        ["LinkedIn Recruiter InMail", "Job advert applications", "Meetup groups"],
        ["SourceWhale email sequences", "Referrals from placed candidates", "Conferences and events"],
        ["Cold calling", "Your own LinkedIn content", "Alumni and internship networks"],
      ])],
    },
    {
      title: "LinkedIn: connect at volume, engage until they reply",
      takeaway: "Once someone accepts, messaging is free, so the connection itself is the asset.",
      content: "Connect with hundreds of people in your niche every week, and expect to engage once, twice or three times before you get a reply. Keep the opening message short, specific and personal: name the project, the stack or the company, never \"your impressive background\". Find your MVPs (most valuable prospects): in-demand, well-networked people worth investing relationship time in. Tag them, and stay in touch even when you have nothing live.",
      phrases: [
        "Connect note: \"Hi [Name], I place [backend engineers] into [VC-backed start-ups in NYC]. Your work on [project] stood out, so I'd love to connect.\"",
        "Once connected: \"Thanks for connecting. I'm working with [Client], a [Series B] team building [product]. They need someone who's done [specific thing you saw on their profile]. Open to a 10-minute chat this week?\"",
      ],
      tip: "Test length, directness, tone and specificity. Change one at a time, then repeat what works.",
    },
    {
      title: "LinkedIn Recruiter: one InMail, one credit, make it count",
      takeaway: "InMail is the precision tool. Spend credits on top-priority profiles, not volume.",
      content: "The template has three jobs: show why you picked them (the specific match), give enough about the company to spark interest (link the pitch pack rather than pasting it), and make a small ask. Change up subject lines: role and stage, a mutual connection, or the problem they'd solve. Run a generic version and a direct version side by side for a week, and compare reply rates with your manager: direct, specific messages usually earn the replies.",
      phrases: ["Subject: [Role] at a [Series B] [sector] company. \"Hi [Name], [Client] is hiring a [Role] to [own the integrations platform]. You've done exactly that at [Company], which is why I'm reaching out. [One line on the product], [funding stage], [work model]. Here's the company brief: [link]. Worth 15 minutes this week?\""],
    },
    {
      title: "SourceWhale: sequences keep passive talent warm",
      takeaway: "Each step adds something new. The break-up email often gets the highest reply rate.",
      content: "SourceWhale is the most credit-efficient way to run multi-touch outreach: one credit covers a whole 3 to 10 step sequence, so run 5 to 10 follow-ups per prospect. Most passive candidates won't reply to step 1. Each step should add something new: the role, then proof, then a market insight, then a polite break-up, which works because it's low-pressure. The spacing is a guide: adjust it to your market. Keep warm with check-ins, market updates and value-add touches, not just roles.",
      tables: [table("A four-step sequence", ["Step", "Day", "What it adds", "Example"], [
        ["1", "Day 1", "The role", "\"[Client] is hiring a [Role] to [build X]. Here's why I thought of you…\""],
        ["2", "Day 3", "The proof", "\"Quick follow-up: they just [raised / launched / hired]. Brief attached.\""],
        ["3", "Day 7", "The insight", "\"What we're seeing on [skill] packages in [city] this quarter…\""],
        ["4", "Day 14", "The break-up", "\"Not the right time? No problem. Shall I keep you posted on [niche] roles?\""],
      ])],
      tip: "Build one four-step sequence for a live role this week, and review it with your manager.",
    },
    {
      title: "One profile is ten leads, if you check everything",
      takeaway: "Think like a market specialist, headhunter and adviser on every profile you open.",
      content: "Most consultants read a profile for the one role they're working on and move on. The best treat every profile as a map: past employers give you target companies, their leaders give you business development leads, and a layoff tells you a whole team may be on the market. Hotlist the companies in Bullhorn so the whole team benefits.",
      framework: { title: "Five things to check", steps: steps([
        [null, "Contact info", "Is a mobile or email in the contact section or the Featured section?"],
        [null, "Past companies", "Connect with similar people at every company they've worked at, then hotlist those companies."],
        [null, "Their leaders", "Connect with engineering leaders at current and past employers: future clients and spec-in targets."],
        [null, "Layoff signals", "Were they laid off? Their colleagues may be open to work too. Search the company for \"open to work\"."],
        [null, "Your audience", "Follow leaders, founders and speakers in your market. Like and comment to build credibility."],
      ]) },
    },
    {
      title: "Practise it: run a cold candidate call, start to finish",
      takeaway: "Did you uncover genuine motivation, stay compliant, find the deal-breaker and book a next step?",
      content: "Work in threes: a caller, a candidate and an observer. The caller uses a live role; the candidate gets a short brief with one hidden deal-breaker, such as a holiday booked in three weeks, a competing final-stage interview, or a hybrid requirement the role can't meet. Keep feedback structured: one thing that worked, one thing to change.",
      framework: { title: "The exercise (25 minutes)", steps: steps([
        ["Set up · 5 min", "Caller, candidate, observer", "The caller uses a live role. The candidate gets a short brief with one hidden deal-breaker."],
        ["Run · 3 × 5 min", "All seven steps", "Intro to next step. The call ends with two intro-call slots and a referral ask. Rotate roles."],
        ["Debrief · 5 min", "Observer scores 1 to 5", "Motivation uncovered, compliant logistics, deal-breaker found, next step booked."],
      ]) },
      scenario: {
        title: "Ten minutes into a great call, the candidate says: \"I'm on $140k now, and I'm on an H-1B, so I'll need a transfer.\" Then they ask about next steps. What do you do?",
        weak: "Note their current salary and visa type in Bullhorn, promise to send them to the client today, and hang up without booking anything.",
        strong: "Thank them, and steer to what you need: \"What package are you targeting for your next role?\" and \"Will you now or in the future need visa sponsorship?\" Record only the target package and \"sponsorship required: yes\" in Bullhorn, not their current salary or visa details. Ask \"What would stop you accepting an offer?\", book two client intro slots before you hang up, ask for a referral, and send the representation email within the hour.",
      },
    },
    {
      title: "Takeaways and actions for your desk",
      takeaway: "Every placement starts with the first call.",
      content: "The same seven-step call, every time. Motivation predicts acceptance. Ask for target package and work authorisation, never salary history or visa type. No \"Confirmed\", no submission. Most great candidates are passive: multi-touch wins. Tick off each action below as you do it this week.",
      tactics: [
        "Do a paired cold-call role-play with your manager, with structured feedback",
        "Learn your desk's five domain questions",
        "Build a pitch pack for each of your clients",
        "Build LinkedIn and SourceWhale templates, send three personalised InMails, and review replies next week",
        "Write a job advert for one new vacancy",
      ],
    },
  ],
};

const quiz = quizDrafts([
  {
    _id: "drafts.quiz-playbook-03-01", module: "module-candidate-sourcing", afterSection: 3,
    question: "Which question is the compliant way to check right to work?",
    options: ["\"Are you a US citizen?\"", "\"Are you on an H-1B or a green card?\"", "\"Are you legally authorised to work in the US? Will you now or in future need visa sponsorship?\"", "\"Where were you born?\""],
    correct: 2,
    explanation: "Ask about authorisation to work and the need for sponsorship, never citizenship or visa type. Federal law restricts questions about citizenship status.",
  },
  {
    _id: "drafts.quiz-playbook-03-02", module: "module-candidate-sourcing", afterSection: 4,
    question: "When should you submit a candidate to a client?",
    options: ["As soon as the call ends", "Once they've replied \"Confirmed\" to your representation email", "Once the client asks for CVs", "After a second call"],
    correct: 1,
    explanation: "No \"Confirmed\", no submission. Without written representation, a duplicate submission from another agency can cost us the fee. Send the email within the hour.",
  },
]);

await importPlaybook([sourcing], quiz);
