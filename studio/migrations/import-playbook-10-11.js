// One-off import: Recruitment Playbook modules 10 (Selling Contract & Consulting for Perm
// Recruiters) and 11 (Customer & Candidate Management), written from the classroom decks and their
// trainer notes. Needs the "Recruitment Playbook" group, which import-playbook-07-08.js creates.
//
// Run from the project root:  npm run import:playbook-10-11 -- --dry-run   (check only)
//                             npm run import:playbook-10-11                (import)
// The two modules and their quiz questions arrive as DRAFTS. See playbook-kit.js for the options.
import { steps, table, quizDrafts, importPlaybook } from "./playbook-kit.js";

const contractConsulting = {
  _id: "drafts.module-contract-consulting",
  _type: "trainingModule",
  title: "Selling Contract & Consulting for Perm Recruiters",
  slug: { _type: "slug", current: "contract-consulting" },
  eyebrow: "Playbook 10",
  subtitle: "Spot the signals, follow the money, and turn a stalled perm conversation into a team win",
  category: { _type: "reference", _ref: "category-playbook" },
  order: 100,
  icon: "puzzle",
  accent: "sky",
  sections: [
    {
      title: "A \"no\" on perm is often a \"yes\" on contract",
      takeaway: "No headcount isn't always no budget. The work still needs doing, so stay in the room.",
      content: "Has a client told you \"we love them, but we've got no headcount\" in the last month? Every one of those conversations was a possible contract deal. The most common way a perm consultant loses a client is by hearing \"no headcount\" and walking away, while another agency or a systems integrator fills the gap. Spotting a contract need keeps you in the account, and a client who buys contract today is likely to buy perm from us later.",
      framework: { title: "Who wins", steps: steps([
        ["For the client", "The work gets done now", "Without waiting for headcount approval."],
        ["For the business", "Margin every week", "Contract margin is earned every week the contractor works, not once."],
        ["For you", "You keep the client", "You stay in the room and are first in line when headcount opens."],
      ]) },
    },
    {
      title: "What contract actually is",
      takeaway: "Unlike perm, the relationship doesn't end at placement: we stay involved every week.",
      content: "The client pays Stott and May an hourly or daily rate for the contractor's time. We engage and pay the contractor (on our payroll as a W-2 employee, or through their own company) and invoice the client, usually weekly from approved timesheets. The contract team manages the contractor throughout, handles extensions, and often places more people on the same project. If you've never seen a contract deal run, ask a contract consultant to walk you through one from first call to first invoice.",
      framework: { title: "How a contract deal works", steps: steps([
        ["The client", "Needs skills for a period", "Needs skills for a project or a period. Pays us per hour or day."],
        ["Stott and May", "Finds, contracts and pays", "Finds, contracts and pays the contractor. Invoices the client."],
        ["The contractor", "Delivers the work", "Works at the client, submits timesheets, and is paid by us."],
      ]) },
      tactics: [
        "A fixed term: usually months, often extended. It ends when the work ends",
        "Ready to deliver: experienced specialists who hit the ground running",
        "Ongoing service: we stay involved every week with timesheets, extensions and care",
      ],
    },
    {
      title: "Same client, different problem to solve",
      takeaway: "Perm needs an approved headcount slot. A contractor is usually paid from a different pot.",
      content: "The key row is the budget line. That's why a client can have a hiring freeze and still bring in contractors. The \"who decides\" row matters too: contract decisions often sit with whoever owns the project budget, who may not be the person you speak to on perm.",
      tables: [table("Perm vs contract", ["Area", "Perm", "Contract"], [
        ["What they buy", "A permanent employee", "Skills for a defined period or project"],
        ["Speed to start", "Slower: interviews, offer, notice period", "Often faster: contractors may be free now"],
        ["Commitment", "Long term, on the headcount plan", "Fixed term, extendable, easy to end"],
        ["Budget line", "Approved headcount", "Project or non-headcount budget"],
        ["How we earn", "One-off fee, a % of salary", "Margin on every hour or day billed"],
        ["Who decides", "Hiring manager plus HR / talent", "Often the project or budget owner"],
      ])],
    },
    {
      title: "Match the model to the problem",
      takeaway: "Solve the client's problem with the right model, not the one you happen to sell.",
      content: "Time and materials (T&M) means the client pays for hours or days worked. A statement of work (SOW) is outcome-based: the client pays for a defined deliverable, and the delivery risk sits with us. Contract-to-hire is the natural bridge for perm consultants: the client gets the person now and converts them later. Conversion fees and timing are agreed in the contract terms, so check our standard terms with the contract team before quoting anything.",
      framework: { title: "Four hiring models", steps: steps([
        ["Perm", "A long-term hire", "Approved headcount, an ongoing need, and culture fit matters most."],
        ["Contract · T&M", "Skills by the hour or day", "Urgent or finite work, a freeze, or a project with an end date."],
        ["Contract-to-hire", "Try, then convert", "They want to test fit, or headcount opens later. Agree conversion terms up front."],
        ["SOW · Consulting", "Pay for the outcome", "A defined deliverable or team, priced as a project, through Stott and May Consulting."],
      ]) },
    },
    {
      title: "When they need an outcome, not a person",
      takeaway: "Contract supplies skills; consulting supplies an outcome. Spot the signal and bring in the consulting team.",
      content: "Under a statement of work, the client pays for a defined deliverable or a managed team, and Stott and May Consulting takes responsibility for delivery. It suits clients who don't want to manage individual contractors, or who are frustrated with a systems integrator (SI). Consulting engagements are often larger and longer, and put us at the heart of the client's transformation. You don't need to scope or price it: spot the signal and bring the consulting team in.",
      tip: "Consulting signals: \"we need a team, not one person\", a project that's stalled or behind, an SI that's too slow or too expensive, no capacity to manage contractors, or a wish for a fixed scope or price.",
      phrases: ["If it's the outcome that matters more than the headcount, we can also deliver this as a project through Stott and May Consulting. Worth a conversation?"],
    },
    {
      title: "How contract makes money",
      takeaway: "Contract earns on every hour worked, for as long as the contractor stays, and extensions are common.",
      content: "The figures below are illustrative only, not our actual rates or margins. The gross spread is before employer costs: for a W-2 contractor that includes payroll taxes, insurance and benefits, which is why the net margin is lower. W-2 means the contractor is employed through us; 1099 means an independent contractor; corp-to-corp (C2C) means they bill through their own company.",
      tables: [table("An illustrative example", ["Item", "Amount", "What it means"], [
        ["Bill rate", "$120", "What the client pays us"],
        ["Pay rate", "$90", "What the contractor earns"],
        ["Gross spread", "$30", "Before employer costs"],
        ["Six months", "About $30k", "Roughly 1,000 hours of spread from one contractor, before costs"],
      ])],
      mistakes: [
        "Quoting rates or promising a classification (W-2, 1099 or C2C) yourself. Misclassification carries real legal risk: leave both to the contract team",
      ],
    },
    {
      title: "CapEx vs OpEx, in plain English",
      takeaway: "Perm sits in headcount. Contractors on a build can come from the project budget.",
      content: "Capital expenditure (CapEx) is money spent creating a long-term asset: the cost is spread over its useful life. Operating expenditure (OpEx) is the cost of running the business, expensed in the year it's spent. Under US accounting rules, some work spent building internal software can be capitalised, which is one reason big technology, data and ERP programmes often have capital budgets that pay for contractors and consultants. Contractors can also sit in OpEx, in a non-headcount or \"contingent labour\" line.",
      tables: [table("Two ways clients pay", ["Area", "CapEx: capital expenditure", "OpEx: operating expenditure"], [
        ["In short", "Building something that lasts", "Running the business day to day"],
        ["Examples", "A new platform, data centre or ERP rollout", "Salaries, rent, subscriptions, support"],
        ["The cost", "Spread over several years on the balance sheet", "Hits the P&L in the year it's spent"],
        ["Controlled by", "A project or investment budget", "Department and headcount budgets"],
      ])],
      mistakes: ["Telling a client how to classify a cost. That's their finance team's decision: your job is to ask which budget the work sits in"],
      tip: "Test yourself: can you explain CapEx and OpEx back in one sentence each?",
    },
    {
      title: "Six questions that find the budget",
      takeaway: "Ask them on every perm intake, not just when a role stalls.",
      content: "These questions find money that isn't headcount, reveal the real budget owner, surface the cost of waiting, and show you think like a partner. The question about an empty seat is the most powerful: it makes the hiring manager say out loud what the gap is costing them, which is exactly the case for a contractor. The budget-owner question often leads you to a new stakeholder, such as a programme director or a finance business partner, who controls a bigger budget than your hiring manager.",
      phrases: [
        "Is this hire tied to a project, or business as usual?",
        "Is it approved headcount, or funded from a project budget?",
        "Who owns that budget, and when does it reset?",
        "Is there a hiring freeze or headcount cap right now?",
        "What happens to the project if this seat is empty for three months?",
        "Have you used contractors or a consultancy on this before?",
      ],
    },
    {
      title: "Twelve signs it's really a contract need",
      takeaway: "Any one signal is worth a question. Two or more together is a strong contract lead.",
      content: "The signals fall into three families: budget (the money is somewhere other than headcount), time (the need is urgent or finite) and team (the gap is temporary or uncertain). Which of these have you heard in the last month and walked past? \"We want to try before we commit\" is the opening for contract-to-hire.",
      tables: [table("Buy-in signals", ["Budget", "Time", "Team"], [
        ["Headcount freeze or cap", "\"We need someone yesterday\"", "A niche skill for a short need"],
        ["Year-end budget to use", "A go-live or migration date", "Cover for leave or a resignation"],
        ["A new programme or funding round", "Work with a clear end date", "Team stretched, delivery slipping"],
        ["The SI or consultancy is too costly", "A perm search stalling for weeks", "\"We want to try before we commit\""],
      ])],
    },
    {
      title: "Four objections, four reframes",
      takeaway: "Turn each objection into a question about cost, timing or budget.",
      content: "Each reframe brings you back to the funding questions. On \"too expensive\": an hourly rate looks higher than a salary divided by hours, but it doesn't carry a placement fee, benefits, onboarding or the cost of a long-term mis-hire, and it stops when the work stops. Don't quote numbers you can't back up.",
      tables: [table("Objections and reframes", ["They say", "You say"], [
        ["\"Contractors are too expensive.\"", "\"Compared with what? No upfront fee, no benefits, no long-term commitment, and you only pay for hours worked. What does the project slipping cost?\""],
        ["\"We want someone committed.\"", "\"Then let's do contract-to-hire. You get them now and convert once headcount opens.\""],
        ["\"We have no budget.\"", "\"For headcount, or at all? Is there project or non-headcount spend this could sit in?\""],
        ["\"We'll wait for headcount.\"", "\"What does waiting cost you? A contractor can bridge the gap while we keep the perm search going.\""],
      ])],
    },
    {
      title: "From \"no headcount\" to \"who's free this week?\"",
      takeaway: "Spot it, open the door and book the joint call. You don't have to sell the contract deal alone.",
      content: "Play it back: name the gap between the work and the headcount. Normalise it: show that other teams solve it this way. Offer a next step: a joint call, not a pitch over the phone. Then bring in the contract or consulting team, and keep the relationship warm alongside them. Agree who sends what to the client so the message stays consistent. If there's no fit for contract, don't force it.",
      phrases: ["It sounds like the headcount isn't there yet, but the work is. A lot of teams we work with bridge that gap with a contractor from the project budget. Would it help if I brought in [contract colleague] to show you who's available now?"],
      framework: { title: "Bring in the contract or consulting team", steps: steps([
        [null, "Spot it", "Two or more signals in one conversation."],
        [null, "Capture it", "Project, skills, start date, length and budget owner."],
        [null, "Log it", "A lead in Bullhorn, tagged to the contract desk."],
        [null, "Intro it", "A joint call with the client within 24 hours."],
        [null, "Stay on it", "Keep the relationship warm alongside the contract team."],
      ]) },
      tip: "The long game: a client who buys contract today is likely to buy perm tomorrow. Win it together.",
    },
    {
      title: "Practise it: the hiring freeze call",
      takeaway: "You win if you uncover the project budget and book a joint call with the contract team.",
      content: "Work in threes. The \"client\" gets a card: for example, a perm Data Engineer role on hold because of a headcount freeze, a data platform migration going live in eight weeks, and a programme budget their director controls, revealed only if asked who owns it. Rotate so everyone plays every role.",
      framework: { title: "The exercise (30 minutes)", steps: steps([
        ["Set up · 5 min", "Brief the client", "The \"client\" gets a card: a freeze, a go-live date and a hidden project budget."],
        ["Run · 3 × 7 min", "Find the money", "Ask the funding questions, spot the signals, handle one objection, pivot and book the joint call."],
        ["Debrief · 5 min", "Count the signals", "How many did they find? Did they uncover the project budget and book a next step?"],
      ]) },
      scenario: {
        title: "A hiring manager tells you their perm Data Engineer role is on hold: \"We've got a headcount freeze until next year.\" Their data platform migration goes live in eight weeks. What do you do?",
        weak: "Say \"No problem, I'll check back in the new year,\" close the job in Bullhorn and move on to the next call.",
        strong: "Stay in the conversation and follow the money. \"What happens to the migration if this seat is empty for the next eight weeks? Is the migration funded from a project budget? Who owns that budget?\" Play it back: the headcount isn't there, but the work is. Explain that many teams bridge that gap with a contractor, and offer a joint call with your contract colleague within 24 hours, without quoting rates yourself. Log the lead for the contract desk and keep the perm role warm for when headcount opens.",
      },
    },
    {
      title: "Takeaways and actions for your desk",
      takeaway: "Find the work. Find the budget.",
      content: "No headcount isn't always no budget. Need an outcome, not a person? Think consulting. Two signals together make a contract lead. Reframe objections around cost and time. CapEx builds; OpEx runs the business. Tick off each action below as you do it this week.",
      tactics: [
        "Add the funding questions to every intake",
        "Revisit every \"no headcount\" client",
        "Log two contract leads in Bullhorn",
        "Book one joint call with the contract team",
        "Learn our contract and consulting offer",
      ],
    },
  ],
};

const customerCandidate = {
  _id: "drafts.module-customer-candidate",
  _type: "trainingModule",
  title: "Customer & Candidate Management",
  slug: { _type: "slug", current: "customer-candidate-management" },
  eyebrow: "Playbook 11",
  subtitle: "Over-communicate, coach every step, and never sit on information and hope for the best",
  category: { _type: "reference", _ref: "category-playbook" },
  order: 110,
  icon: "messages",
  accent: "brand",
  sections: [
    {
      title: "Silence is where deals die",
      takeaway: "Nobody should ever have to chase you.",
      content: "When did a customer or candidate last chase you for an update? Every time that happens, you've already lost a bit of control. When people hear nothing, they fill the gap with the worst assumption: the agency isn't working on it, the candidate has gone cold, the role has gone away. A candidate who hears nothing for a week takes another interview. A customer who hears nothing calls another agency. Over-communicating feels like too much to us; to the other side, it feels like being looked after.",
      framework: { title: "One standard", steps: steps([
        [null, "Nobody chases you", "Nobody should ever have to chase you for an update."],
        [null, "Nothing held back", "Share what you know as soon as you know it."],
        [null, "Coach every step", "Never hope for the best."],
      ]) },
    },
    {
      title: "Hoping for the best is not a strategy",
      takeaway: "\"No news\" is still news. Send it.",
      content: "Be honest: which of the \"stop\" column do you do? Holding information usually comes from a good place, such as not wanting to bother anyone or waiting until there's an answer, but it reads as silence. \"No news\" tells the other side you're on it and when they'll hear next.",
      tables: [table("Stop and start", ["Stop", "Start"], [
        ["Waiting for feedback before updating anyone", "\"No news yet. I've chased; next update Thursday.\""],
        ["Sitting on bad news until you have a fix", "Share it the same day, with a plan"],
        ["Assuming the candidate is prepped", "A coaching call before every step"],
        ["Updating only when someone asks", "Set the cadence up front and keep it"],
        ["Keeping details in your head", "Log it, so anyone on the team can pick it up"],
        ["One long email at the end of the week", "Short, frequent updates on the right channel"],
      ])],
    },
    {
      title: "Who hears what, and when",
      takeaway: "While anything is waiting, both sides hear from you at least every 48 hours.",
      content: "This is the minimum standard. The 48-hour rule changes behaviour most: even if the update is \"still waiting, here's what I'm doing about it\". Tell the customer and the candidate this cadence at the start so they know what to expect. That alone cuts down on chasing.",
      tables: [table("The update cadence", ["Stage", "Customer", "Candidate"], [
        ["Brief taken", "Same-day recap: role, process, dates", "Full role details and next steps"],
        ["Submission", "Summary plus a feedback deadline", "\"You're submitted; feedback by [day]\""],
        ["Waiting", "Update every 48 hours, even \"no news\"", "Update every 48 hours, even \"no news\""],
        ["Interview", "Confirmation plus candidate briefing", "Confirmation plus a prep call"],
        ["After interview", "Debrief the same day", "Debrief within the hour"],
        ["Offer", "Daily contact until signed", "Daily contact; pre-close every call"],
        ["Notice to day 90", "Weekly, then 30 / 60 / 90 days", "Weekly, then 30 / 60 / 90 days"],
      ])],
      tip: "Print the cadence table for your desk.",
    },
    {
      title: "Right message, right channel",
      takeaway: "If it matters, call first, then confirm it in writing.",
      content: "Ask each customer and candidate early how they prefer to be updated, and use it: many hiring managers now want a shared Slack channel, and many candidates prefer text. Whatever the channel, call first and confirm anything important in writing, so there's always a record. Keep messages short: a three-line Slack update read today beats a long email read next week.",
      framework: { title: "Three channels", steps: steps([
        ["Slack · Teams · Text", "Quick and frequent", "Status updates and nudges, interview confirmations, quick yes / no questions."],
        ["Email", "Anything to keep", "Brief recaps and timelines, submissions and prep packs, offer details in writing."],
        ["Phone · Video", "Anything that matters", "Bad news and rejections, offers and counteroffers, any concern or hesitation."],
      ]) },
    },
    {
      title: "Two customer updates to send this week",
      takeaway: "Coach the customer: tell them what to do next, and by when.",
      content: "Every customer message should end with a clear ask and a date (feedback, interview slots, offer approval): that's how you keep control. The status update shows activity, asks for one specific action and adds value with a market insight. The recap email puts the agreed process in writing on day one and sets the update rhythm, so the customer never wonders when they'll hear from you. Draft a Slack update for one of your live roles now.",
      phrases: [
        "Slack status update: \"Quick update on [Role]: 8 screened, 3 submitted (summaries in your inbox), 2 waiting on your feedback. Could we get your thoughts by Thursday 12pm? One market note: [insight].\"",
        "Email brief recap: \"Thanks for the time today. To confirm: [role, must-haves, range]. Process: [stages, dates]. You'll get a shortlist by [day] and an update from me every [Tue / Thu]. Anything I've missed?\"",
      ],
    },
    {
      title: "Coach the candidate before every step",
      takeaway: "At every step, tell them what happens next, when, and when they'll hear from you.",
      content: "Candidate control comes from coaching, not chasing. A candidate who knows exactly what happens next, and when they'll hear from you, doesn't go quiet or take another process without telling you. Interview prep and pre-closing are covered in Playbook 08; counteroffers and resignation in Playbook 09.",
      framework: { title: "Six coaching moments", steps: steps([
        [null, "Submission", "Confirm interest, package and permission to submit."],
        [null, "Interview", "A prep call plus a written prep pack."],
        [null, "Debrief", "Within the hour. Score out of 10."],
        [null, "Offer", "Pre-close, and prep them for a counteroffer."],
        [null, "Resignation", "Plan the words, and call you after."],
        [null, "Day one", "Weekly until they start, then 30 / 60 / 90 days."],
      ]) },
    },
    {
      title: "Two candidate messages to send this week",
      takeaway: "Every message sets the next touchpoint, so the candidate never wonders where they stand.",
      content: "The \"no news yet\" message is the one most consultants never send, and it's the one that keeps candidates warm. It does three things: it gives the status, it pre-closes (\"still a 9/10?\") and it commits to a specific next contact. Write one for a candidate in your live process and send it today.",
      phrases: [
        "Text, no news yet: \"Hi [Name], no feedback from [Customer] yet. I've chased and expect it by Wednesday. Still feeling a 9/10? I'll call you Wednesday afternoon either way.\"",
        "Text, interview confirmed: \"You're confirmed with [Manager] on [day, time]. Prep notes are in your inbox. Let's do 15 minutes the day before. And call me as soon as you're out.\"",
      ],
    },
    {
      title: "Share bad news faster than good news",
      takeaway: "Fast, straight, and with a plan.",
      content: "The instinct is to hold bad news until you've fixed it. Don't. A customer who finds out late loses trust; a customer who hears it early, with a plan, trusts you more. The same applies to candidates: a rejection delivered quickly, by phone, with honest feedback keeps them in your network for the next role.",
      framework: { title: "Three rules for bad news", steps: steps([
        [null, "Fast", "The same day you hear it."],
        [null, "Straight", "Clear, honest, no spin."],
        [null, "With a plan", "What you're doing next."],
      ]) },
      phrases: ["To a customer, candidate withdrew: \"I wanted you to hear this from me straight away: [Name] has withdrawn after a counteroffer. I have two strong backups I can have with you by Thursday. Can we hold the interview slots?\""],
    },
    {
      title: "Nothing in process goes quiet overnight",
      takeaway: "If you were off sick tomorrow, could someone pick up every live deal from your Bullhorn notes?",
      content: "Run this check in the last 15 minutes of every day. The last item is the real test: if a colleague couldn't pick up a deal from your notes, there's information in your head that should be written down. Tick each one off before you log off today.",
      tactics: [
        "Every live candidate has a next contact booked",
        "Every live job has a next customer update booked",
        "Nobody has waited more than 48 hours to hear from you",
        "Every call and message is logged in Bullhorn",
        "Bad news from today has been shared today",
        "A colleague could pick up any deal from your notes",
      ],
    },
    {
      title: "Practise it: the 48-hour plan for one live role",
      takeaway: "Who would have gone quiet? Then send the messages.",
      content: "Use a real role so the messages go out today. In the review, look for three things: anyone left waiting over 48 hours, any message without a clear next step and date, and anything important being sent by text that should be a call.",
      framework: { title: "The exercise (25 minutes)", steps: steps([
        ["Map · 10 min", "List every contact", "Every customer and candidate touch for the next 48 hours: who, what, which channel, when."],
        ["Write · 10 min", "Draft the messages", "One customer Slack update and one candidate text, using the templates."],
        ["Review · 5 min", "Gap check", "Your partner checks it against the cadence. Who would have gone quiet? Then send them."],
      ]) },
      scenario: {
        title: "It's Thursday. You submitted three candidates on Monday and the customer hasn't replied. Your strongest candidate texts: \"Any news? I've got another final next week.\" What do you do?",
        weak: "Text back \"Nothing yet, will let you know\" and wait for the customer to reply before contacting anyone again.",
        strong: "Call the candidate: give them the honest status, pre-close (\"How do you feel about the role now, out of 10? How does the other process compare?\") and commit to a time you'll call back. Then call the customer, not email: \"Your strongest candidate has another final next week. Can we get feedback by tomorrow at 12?\" Confirm it in writing, log both calls in Bullhorn, and update the candidate by the time you promised, even if there's no news.",
      },
    },
    {
      title: "Takeaways and actions for your desk",
      takeaway: "Over-communicate. Every step.",
      content: "Silence is where deals die. \"No news\" is still news: send it. 48 hours is the longest anyone waits. Call for anything that matters, then confirm in writing. Every message ends with a next step and a date. Tick off each action below as you do it this week.",
      tactics: [
        "Send a brief recap on every new role",
        "Agree an update day with every customer",
        "Book a next contact for every candidate",
        "Run the daily check before you log off",
        "Share any bad news the same day",
      ],
    },
  ],
};

const quiz = quizDrafts([
  {
    _id: "drafts.quiz-playbook-10-01", module: "module-contract-consulting", afterSection: 3,
    question: "Why can a client with a hiring freeze still bring in contractors?",
    options: ["Contractors are always cheaper", "Contractors are usually paid from a project or non-headcount budget", "Hiring freezes never apply to technology teams", "Contractors don't need approval"],
    correct: 1,
    explanation: "A perm hire needs an approved headcount slot. A contractor is usually paid from a different pot, such as a project budget. No headcount isn't always no budget.",
  },
  {
    _id: "drafts.quiz-playbook-10-02", module: "module-contract-consulting", afterSection: 6,
    question: "A client asks what the contractor's rate would be, and whether they'd be W-2 or 1099. What should you do?",
    options: ["Quote the illustrative $120 an hour", "Say 1099, as it's simplest", "Bring in the contract team to cover rates and classification", "Tell them to ask their finance team"],
    correct: 2,
    explanation: "Never quote rates or promise a classification yourself: misclassification carries real legal risk. Spot the need, open the door, and book a joint call with the contract team.",
  },
  {
    _id: "drafts.quiz-playbook-11-01", module: "module-customer-candidate", afterSection: 3,
    question: "While a candidate is waiting for feedback, how often should they hear from you?",
    options: ["Only when there's news", "At least every 48 hours, even if it's \"no news\"", "Once a week", "When they chase you"],
    correct: 1,
    explanation: "48 hours is the longest anyone waits. \"No news\" is still news: it tells them you're on it and when they'll hear next.",
  },
  {
    _id: "drafts.quiz-playbook-11-02", module: "module-customer-candidate", afterSection: 8,
    question: "A shortlisted candidate withdraws. When should you tell the customer?",
    options: ["Once you've found a replacement", "At the next weekly update", "The same day, with a plan", "Only if they ask"],
    correct: 2,
    explanation: "Share bad news faster than good news: the same day, straight, and with a plan. A customer who hears it early, with a plan, trusts you more.",
  },
]);

await importPlaybook([contractConsulting, customerCandidate], quiz);
