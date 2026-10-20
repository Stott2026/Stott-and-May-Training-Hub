// One-off import: Recruitment Playbook modules 01 (Standards & Expectations) and 09 (Counteroffer
// Management), written from the classroom decks and their trainer notes. The 01 deck was built on a
// different set of values; here its material sits under the hub's own four values instead.
// Needs the "Recruitment Playbook" group, which import-playbook-07-08.js creates (run that first).
//
// Run from the project root:  npm run import:playbook-01-09 -- --dry-run   (check only)
//                             npm run import:playbook-01-09                (import)
// The two modules and their quiz questions arrive as DRAFTS. See playbook-kit.js for the options.
import { steps, table, quizDrafts, importPlaybook } from "./playbook-kit.js";

const standards = {
  _id: "drafts.module-standards-expectations",
  _type: "trainingModule",
  title: "Standards & Expectations",
  slug: { _type: "slug", current: "standards-expectations" },
  eyebrow: "Playbook 01",
  subtitle: "How we work, the bar we hold ourselves to, and who owns what",
  category: { _type: "reference", _ref: "category-playbook" },
  order: 10,
  icon: "badge-check",
  accent: "sky",
  sections: [
    {
      title: "Four values, one standard",
      takeaway: "Our values aren't wall art. They're the standard we hire, promote, reward and give feedback against.",
      content: "The rest of the Playbook teaches you how to do the job; this module sets the standard for how we do it here. Start with our four values. Which one are you strongest at, and which one would your last manager say you need to work on? Each value section that follows has the same shape: what it looks like on the desk, what to watch for, a tip, and a two-minute exercise. Keep a notebook open and answer each one as you go.",
      framework: { title: "Our values", steps: steps([
        [null, "One Stott and May", "A win on one desk is a win for the floor. No one person is above the team."],
        [null, "Excellence", "Specialists who work hard with enthusiasm, care and dedication, for our clients and candidates."],
        [null, "Thirst for Knowledge", "Brave, curious and always learning. Standing still is losing ground."],
        [null, "Accountability", "If it touches your desk, it's yours, and we say it clearly."],
      ]) },
    },
    {
      title: "One Stott and May",
      takeaway: "Your network is the company's network. A lead outside your desk still belongs to the team.",
      content: "We stand by each other, celebrate success and believe no one person is above the team. We run several brands on one floor: Technology Perm, Evergreen and Contract. Cross-referrals between desks are some of the cheapest fees we make: a software engineering candidate who mentions a hiring manager in energy is a lead for Evergreen. Your two-minute exercise: name one lead or candidate you could pass to another desk this week, and who to.",
      tactics: [
        "Share before you sit on it: a lead or candidate outside your desk still belongs to the team",
        "Ask for help before you're stuck, not after the deadline has passed",
        "Celebrate a teammate's placement as loudly as your own",
        "Cover for colleagues without being asked: on leave, on a call, on a deadline",
        "Give credit generously; take it rarely",
      ],
      mistakes: ["Hoarding a lead or candidate because sharing it doesn't directly benefit you"],
      tip: "Your network is the company's network.",
    },
    {
      title: "Excellence",
      takeaway: "We're a business partner, not a CV service, and activity creates luck, but only the right activity.",
      content: "Excellence shows up in two places: what we bring to clients, and the work we put in every day. Clients buy speed, access to talent they can't reach, and advice, so every interaction should leave them better informed than before: salary movement for a role family, a competitor's hiring push, candidate availability, a realistic time to fill. And motivation gets you started, but standards keep you going: hit the leading indicators every day. Your two-minute exercise: pick a live client and write the one insight you'll lead your next call with, then write your number-one leading-indicator target for this week.",
      tactics: [
        "Understand the client's business, not just the brief: competitors, growth plans, pressure points",
        "Bring value on every call: an insight, a benchmark or a warning, not just a status update",
        "Push back when a client's process or expectations will cost them the candidate",
        "Follow up after every placement: the relationship doesn't end with the invoice",
        "Hit the leading indicators (calls, meetings, submissions) before worrying about the lagging ones",
        "Treat a slow week as a signal to increase activity, not to wait it out",
        "Recover fast from a lost deal: debrief it, learn, and move to the next one the same day",
      ],
      mistakes: [
        "Treating clients as a CV drop box instead of a partner worth advising",
        "Coasting on a good month instead of building pipeline for the next one",
      ],
      tip: "Every client interaction should leave them better informed than before.",
    },
    {
      title: "Thirst for Knowledge",
      takeaway: "The way we did it last quarter isn't the way we do it this quarter.",
      content: "Our markets (AI, data, energy, infrastructure) move every quarter, so the pitch that worked in January will be stale by June. Thirst for Knowledge is curiosity with a bias to action: change a template, an outreach sequence or a market map, and share what works. Your two-minute exercise: one process or pitch you'd change this week, and why.",
      tactics: [
        "Fix, don't just flag: propose a better process, template or pitch instead of complaining about the old one",
        "Bring intel back: salary trends, competitor moves and tech shifts, and use them on your next call",
        "Test before you drop: check a channel or message has really stopped working before you abandon it",
        "Share what works: a good idea that stays with one person doesn't move the business",
        "Ask \"why do we do it this way?\" before you defend the answer",
        "Treat a \"no\" as data, not a dead end",
      ],
      mistakes: ["\"We've always done it this way\" used as a reason not to try something new"],
    },
    {
      title: "Accountability",
      takeaway: "If it touches your desk, it's yours, end to end. And clarity is kind: ambiguity is not.",
      content: "Accountability is the value that most separates top billers from the rest. Own the outcome, not the activity: \"40 calls made\" isn't \"role placed\". It also means communicating clearly. Telling a client their salary band is below market, or telling a candidate why they were rejected, builds trust. A simple shape for feedback: what I saw, the impact, and what I'd like instead. Your two-minute exercise: name one stalled outcome on your desk and what you'll do about it today, then name one piece of feedback you've been sitting on: who needs it, and when.",
      tactics: [
        "See it through from brief to aftercare: don't hand off the hard parts and keep the easy ones",
        "Flag problems the moment you see them, not when someone else notices",
        "Bring solutions with your problems: fix what you can, escalate the rest",
        "Give feedback directly and promptly, to a candidate, a client or a colleague",
        "Say \"I don't know\" or \"I got that wrong\" as easily as anything else",
        "Make the ask clear: don't hint and hope someone reads between the lines",
      ],
      mistakes: [
        "Blaming the client, the market or a colleague for something inside your control",
        "Venting to everyone except the person who can fix the problem",
      ],
      tip: "No one is coming to finish what you started. If it needs to be said, say it to the person, not about them.",
    },
    {
      title: "What \"good\" looks like on the numbers",
      takeaway: "You can't manage what you don't track. Review your own numbers before they're reviewed for you.",
      content: "Lagging indicators (fees and placements) tell you how you did. Leading indicators (quality calls, client meetings booked, submissions, first interviews) are the ones you control every day. Agree your weekly targets with your manager: they're set per desk. Exercise: write down your current NFI, your gap to budget and one action to close it, and share it with your manager this week.",
      tables: [
        table("The numbers you own", ["Measure", "What you should know", "How often"], [
          ["NFI vs budget", "Your NFI to date and your exact gap to budget", "Daily"],
          ["Contribution", "How your desk feeds breakeven and group EBITDA", "Monthly"],
          ["PPH", "Productivity per head: output matters as much as headcount", "Monthly"],
          ["Contract run-rate", "Contract desks: NFI % contribution and run-rate to target", "Weekly"],
          ["Leading indicators", "Calls, meetings, submissions, first interviews", "Weekly, before your 1:1"],
        ]),
        table("The terms", ["Term", "What it means"], [
          ["NFI", "Net fee income: the fee or margin we actually earn"],
          ["Budget", "The NFI target for your desk"],
          ["Breakeven", "The NFI a desk needs to cover its own cost"],
          ["PPH", "Productivity per head: total NFI divided by headcount"],
        ], 1),
      ],
      mistakes: ["Waiting for the monthly review to find out where you stand"],
    },
    {
      title: "Clear lines, clear responsibilities",
      takeaway: "Know who you go to, and who comes to you.",
      content: "Know the three brands (Evergreen, Technology Perm and Contract) and who leads each. Escalating through your direct line isn't bureaucracy: it keeps decisions fast, and it means your manager can actually help. Confirm your reporting line, and write down one thing you need from it to do your job well. Take it to your next 1:1.",
      framework: { title: "Three habits", steps: steps([
        ["Know your line", "Who you go to", "Know your reporting line and who owns each division. Escalate through your direct line first so decisions stay fast and clean."],
        ["Right channel", "Match the message", "Slack for quick questions. Email for anything formal. A call for anything sensitive."],
        ["No surprises", "Inform early", "Keep your manager informed before they have to ask. Raise resourcing or structural issues early."],
      ]) },
      mistakes: ["Routing around the structure because an old line felt more comfortable"],
    },
    {
      title: "Without Limits: the job is the vehicle, not the destination",
      takeaway: "Standards keep you going when motivation dips. A real goal is what makes the standards worth holding.",
      content: "Our 2026 theme is Without Limits. The earning potential here removes limits most jobs never touch, so use it on purpose. What are you working toward outside work this year? You don't have to share numbers, but write it down.",
      framework: { title: "Set a goal that matters", steps: steps([
        [null, "Attach your target to something real", "A deposit, a trip, tuition, a parent's retirement: not just a number on a screen."],
        [null, "Set a target that stretches you", "Make it uncomfortable, then work backward to the daily activity that gets you there."],
        [null, "Let the platform work for you", "The earning potential here removes limits most jobs never touch. Use it on purpose."],
        [null, "Remember why you started", "Talk about what you're building, and revisit the goal when a hard week makes it easy to forget."],
      ]) },
      mistakes: ["Letting the day-to-day grind shrink your ambition to just getting through the week"],
    },
    {
      title: "Practise it: write your personal standard for the next 90 days",
      takeaway: "Specific beats vague: \"I'll share one lead a week with another desk\", not \"be more of a team player\".",
      content: "Keep it short: three lines is perfect. When you share it, your partner's only job is to ask, \"How will you know you've done it?\" Give a copy to your manager to revisit at your 30-day review.",
      framework: { title: "The exercise (15 minutes)", steps: steps([
        ["Reflect · 5 min", "Pick two values", "One you already live well, and one where you've seen the \"watch for\" in yourself."],
        ["Commit · 5 min", "Make it measurable", "One behaviour per value, one leading-indicator target, and your Without Limits goal."],
        ["Share · 5 min", "Say it out loud", "Read it to a partner, then take it to your manager in your next 1:1."],
      ]) },
      scenario: {
        title: "A client asks you to fill a role at a salary you know is well below market. Your manager is pushing for submissions this week. What do you do?",
        weak: "Say nothing about the salary, send whoever will take the role at that number, and hope the client doesn't notice the quality.",
        strong: "Be accountable for the outcome, not the activity. Call the client and say it plainly: \"At this salary, the people you want won't move. Here's what the market is paying, and here's who I could bring you at each level.\" Bring evidence (benchmarks, candidate feedback, time to fill) so you leave them better informed. Then tell your manager what you've done and what the client decided. A submission that can't close isn't progress.",
      },
    },
    {
      title: "Takeaways and actions for your desk",
      takeaway: "Set the bar. Then raise it.",
      content: "Four values define how we work, every day, and each has a clear \"watch for\" to catch it slipping. Know your numbers daily, not at month-end. Use your reporting line, and use it early. Tie your target to something outside work. Tick off each action below as you do it this week.",
      tactics: [
        "Share your 90-day standard with your manager",
        "Write down your NFI, your gap to budget and one action",
        "Hand one lead or contact to another desk",
        "Give the piece of feedback you've been holding",
        "Set your number-one leading-indicator target",
      ],
    },
  ],
};

const counteroffers = {
  _id: "drafts.module-counteroffer-management",
  _type: "trainingModule",
  title: "Counteroffer Management",
  slug: { _type: "slug", current: "counteroffer-management" },
  eyebrow: "Playbook 09",
  subtitle: "Handling a counteroffer starts long before the offer. Get ahead of it, and the deal holds",
  category: { _type: "reference", _ref: "category-playbook" },
  order: 90,
  icon: "shield-check",
  accent: "lime",
  sections: [
    {
      title: "The danger window: offer accepted to day one",
      takeaway: "Almost every counteroffer can be seen coming. The work to stop it happens at the first call, not at resignation.",
      content: "A counteroffer is when your candidate accepts your client's offer, and their current employer makes an offer of its own to keep them. It usually lands when the candidate resigns, but the risk runs all the way from accepting the offer to their first day. US notice periods are often two weeks, but contract and senior roles can be longer. Think of a deal you've lost to a counteroffer: when did the warning signs first appear? Usually early, and nobody asked the question.",
      framework: { title: "Where the risk sits", steps: steps([
        [null, "Offer", "The candidate accepts your client's offer."],
        [null, "Resignation", "The highest risk: the counter usually lands here."],
        [null, "Notice", "Still at risk until their last day."],
        [null, "Day one", "Placement secured."],
      ]) },
    },
    {
      title: "Know what they'll offer before they offer it",
      takeaway: "Map each likely counter against the candidate's push factors. That's your rebuttal.",
      content: "Most counteroffers are a reaction to cost and disruption, not a sudden change of heart about the person. If the candidate is leaving for growth and the employer counters with money, the push factor hasn't been fixed. Take a live candidate, predict what their employer would offer, and match each item to the reason they gave you for leaving.",
      tables: [table("Why employers counter, and what they offer", ["Why employers counter", "What they offer"], [
        ["Keeping someone is cheaper than replacing them", "Salary and compensation"],
        ["The team takes a hit", "Title, promotion, career growth"],
        ["Customers or projects are affected", "Flexibility"],
        ["Product or production could stall", "Culture, support or a new project"],
      ])],
    },
    {
      title: "Raise it twice: at screening and at offer",
      takeaway: "Caught off guard, people make snap, emotional decisions. Prepared, they stick to theirs.",
      content: "Handling counteroffers starts before any offer reaches the candidate. The first question tests commitment and reveals their real motivation. The second rehearses the moment so it isn't a surprise. If the answer to the first is \"a raise would keep me\", that's critical intel: either the motivation isn't strong enough, or you need to build the case around their other push factors now.",
      phrases: [
        "At screening or interview feedback: \"Have you thought about whether there's anything your company could do to keep you?\"",
        "At offer stage: \"What do you think your employer will do when you hand in your notice? Have you thought about a counteroffer?\"",
      ],
      tip: "If you know the risk early, work on it with the client, for example by sharpening the offer on the thing the candidate cares about most.",
    },
    {
      title: "Why accepting a counteroffer often backfires",
      takeaway: "The strongest argument is always their own push factors: does this offer change why they wanted to leave?",
      content: "Present these as things to help the candidate think through, not threats.",
      framework: { title: "Four things to think through", steps: steps([
        [null, "A band-aid, not a fix", "A knee-jerk reaction that rarely solves why they wanted to leave."],
        [null, "Not part of the plan", "It sits outside the company's strategy for the short or long term."],
        [null, "Trust has shifted", "Their loyalty has been questioned, which can count in a downturn or restructure."],
        [null, "Bridges burned", "It damages the relationship with the company they were joining, and their reputation."],
      ]) },
      phrases: ["You told me you were leaving because of [reason]. Does this offer change that?"],
      mistakes: [
        "Quoting statistics on how many people who accept a counteroffer leave within a year, unless you have a source you can show. Candidates push back on numbers that sound made up",
      ],
    },
    {
      title: "Respect the relationship. Return to the reasons.",
      takeaway: "The goal is a decision the candidate owns.",
      content: "Counteroffers usually come with emotion, from a manager the candidate likes and respects. Never attack the employer. Acknowledge the sincerity, then bring the candidate back to their own reasons, and use silence after each question. If they genuinely choose to stay after thinking it through, respect it, keep the relationship, and tell the client straight away.",
      phrases: [
        "Often your manager is completely sincere about the changes they're offering. But if it wasn't part of the plan until you resigned, how long will it last before the same challenges come back?",
        "Why did it take you resigning for them to offer this?",
        "Does this change the reasons you gave me for leaving?",
      ],
      mistakes: ["Criticising the candidate's employer"],
    },
    {
      title: "Coach the resignation, then stay close",
      takeaway: "Resignation is the single highest-risk moment, so don't leave it to chance.",
      content: "Help the candidate plan what they'll say: grateful, brief, decided. Encourage a written resignation they can hand over. If a counteroffer comes up in the meeting, they thank their manager and say they've made their decision. Then they call you the same day. Keep in touch weekly through the notice period.",
      framework: { title: "Four steps for resignation day", steps: steps([
        [null, "Signed first", "The written offer is signed before they resign."],
        [null, "Plan the words", "A short, positive, final message, with a letter in hand."],
        [null, "Decided, not debating", "Thank them, decline to discuss terms, confirm the last day."],
        [null, "Call you after", "The same day, so you hear about any counter first."],
      ]) },
      tip: "Agree a time for that call before they walk into the meeting.",
    },
    {
      title: "Bring the client in early, and keep them close",
      takeaway: "Belonging beats a counter. And bad news travels fast: the client hears it from you first.",
      content: "A client who knows the candidate is leaving for progression can lead the offer with the title and growth path, not just salary. During notice, regular contact from the new manager is one of the most effective counteroffer defences.",
      framework: { title: "The client side", steps: steps([
        ["Before the offer", "Flag the risk", "Tell the client what a counter might look like, so their offer answers the real push factor."],
        ["During notice", "Keep them warm", "A welcome call from the manager, a team lunch invite, first-week plans."],
        ["If it happens", "Tell them straight", "The same day, with a plan: what was offered, the candidate's view, and your next step."],
      ]) },
    },
    {
      title: "Practise it: the counteroffer call",
      takeaway: "Did the candidate reach their own decision, or feel pushed?",
      content: "Work in threes. The \"candidate\" gets a card with their push factors and the counter they've just been offered: for example, leaving for career growth and countered with a 10% raise and a vague promise of promotion, or leaving for flexibility and countered with a new title. The observer scores four things: acknowledging the relationship, returning to push factors, asking \"why now?\", and letting the candidate decide.",
      framework: { title: "The exercise (25 minutes)", steps: steps([
        ["Set up · 5 min", "Brief the candidate", "The \"candidate\" gets a card: their push factors and the counter they've just been offered."],
        ["Run · 2 × 7 min", "Handle it live", "Acknowledge, return to the reasons, ask the questions, use silence. Rotate roles."],
        ["Debrief · 5 min", "Whose decision?", "Did the candidate reach their own decision, or feel pushed? The observer scores it."],
      ]) },
      scenario: {
        title: "Your candidate calls after resigning. Their manager has offered a 10% raise and \"a path to promotion next year\". They left because they'd stopped learning and had no route up. What do you say?",
        weak: "Tell them the counteroffer is a trap, that their manager is only trying to save money, and that people who accept counteroffers always leave within a year.",
        strong: "Acknowledge it first: \"It sounds like your manager really values you, and I'm sure they mean it.\" Then return to their reasons: \"You told me you were leaving because you'd stopped learning and couldn't see a route up. Does a raise change that? If the promotion wasn't part of the plan until you resigned, how long do you think it will last?\" Use silence and let them decide. Call the client the same day with a plan, whatever the outcome.",
      },
    },
    {
      title: "Takeaways and actions for your desk",
      takeaway: "See it coming. Stay in front of it.",
      content: "The risk runs from offer to day one. Raise it at screening and at offer. Push factors are your best argument. Respect the employer; never attack. The client hears it from you first. Tick off each action below as you do it this week.",
      tactics: [
        "Ask the counteroffer question on every finalist",
        "Log each candidate's push factors in Bullhorn",
        "Coach the resignation for every accepted offer",
        "Book weekly check-ins through notice",
        "Brief clients on counteroffer risk before offers go out",
      ],
    },
  ],
};

const quiz = quizDrafts([
  {
    _id: "drafts.quiz-playbook-01-01", module: "module-standards-expectations", afterSection: 5,
    question: "Which of these shows Accountability?",
    options: ["\"I made 40 calls today\"", "Owning the outcome, from brief to aftercare, and flagging problems the moment you see them", "Waiting for your manager to notice a stalled job", "Explaining why the market caused a lost deal"],
    correct: 1,
    explanation: "Own the outcome, not the activity: \"40 calls made\" isn't \"role placed\". Flag problems early, and bring solutions with them.",
  },
  {
    _id: "drafts.quiz-playbook-01-02", module: "module-standards-expectations", afterSection: 6,
    question: "Which of these is a leading indicator?",
    options: ["NFI", "Placements", "First interviews", "Group EBITDA"],
    correct: 2,
    explanation: "Leading indicators (calls, meetings, submissions, first interviews) are the ones you control every day. NFI and placements are lagging: they tell you how you did.",
  },
  {
    _id: "drafts.quiz-playbook-09-01", module: "module-counteroffer-management", afterSection: 3,
    question: "When should you first raise the risk of a counteroffer?",
    options: ["When the candidate resigns", "At screening or interview feedback, and again at offer", "Only if the candidate mentions it", "On their first day"],
    correct: 1,
    explanation: "Raise it twice: at screening, to test commitment and motivation, and at offer, to rehearse the moment so it isn't a surprise.",
  },
  {
    _id: "drafts.quiz-playbook-09-02", module: "module-counteroffer-management", afterSection: 5,
    question: "Your candidate has had a counteroffer. What's the strongest argument you have?",
    options: ["Statistics on how many people leave within a year", "That their employer is only trying to save money", "Their own reasons for leaving, and whether the offer changes them", "That the client will be upset"],
    correct: 2,
    explanation: "Never attack the employer or quote numbers you can't source. Acknowledge the sincerity, then return to their push factors: does this offer change why they wanted to leave?",
  },
]);

await importPlaybook([standards, counteroffers], quiz);
