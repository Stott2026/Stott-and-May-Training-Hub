// One-off import: Management Programme modules M8 to M11, written from the classroom decks.
// Creates the "Management Programme" group, marked Managers, so these modules show on the
// Managers page only. The modules and their quiz questions arrive as DRAFTS.
//
// Run from the project root:  npm run import:management -- --dry-run   (check only)
//                             npm run import:management                (import)
// See playbook-kit.js for the options.
import { steps, table, quizDrafts, importPlaybook } from "./playbook-kit.js";

const group = {
  _id: "category-management",
  _type: "category",
  title: "Management Programme",
  slug: { _type: "slug", current: "management" },
  order: 30,
  area: "managers",
  description: "For managers and team leads: running a team, its numbers and its accounts.",
};
const inGroup = { _type: "reference", _ref: "category-management" };

const performance = {
  _id: "drafts.module-mgmt-performance",
  _type: "trainingModule",
  title: "Performance, CPPs & Reviews",
  slug: { _type: "slug", current: "performance-cpps-reviews" },
  eyebrow: "Management M8",
  subtitle: "Set the bar clearly, measure it fairly, and review it every month",
  category: inGroup,
  order: 80,
  icon: "target",
  accent: "brand",
  sections: [
    {
      title: "No surprises",
      takeaway: "Nobody should ever be surprised in a review. Every month should tell them where they stand.",
      content: "Performance management works when the bar is clear, it's measured the same way for everyone, and every conversation points to what comes next. If a consultant is surprised by anything in a quarterly review, the monthly ones weren't honest enough.",
      framework: { title: "Three things every review needs", steps: steps([
        ["Clarity", "Everyone knows the bar", "Clear targets and standards, written down."],
        ["Fairness", "Measured the same way", "The same data for everyone, top billers included."],
        ["Growth", "A path to the next step", "Every review ends with what it takes to progress."],
      ]) },
    },
    {
      title: "What goes into a CPP",
      takeaway: "A CPP covers the numbers, the skills and the career step, and what you'll do to help.",
      content: "Every consultant has a CPP that sets out what's expected of them over the next 12 months and what they're working towards. It covers four things about the numbers and four about the person. The last box is yours: what you'll provide to help them get there.",
      framework: { title: "Eight parts of a CPP", steps: steps([
        ["Target", "Billings target", "Rolling 12 months, broken down by quarter."],
        ["Activity", "Activity standards", "Calls, CVs and interviews per week for their desk."],
        ["Ratios", "Conversion ratios", "CVs to interviews, interviews to offers."],
        ["Desk", "Market and accounts", "The market they own and the accounts to grow."],
        ["Skills", "Development goals", "Two or three skills from the Playbook."],
        ["Career", "Next career step", "What it takes to reach it, and by when."],
        ["Values", "How they work", "Our values they live well, and one to develop."],
        ["Support", "What you'll provide", "Coaching, training and introductions."],
      ]) },
    },
    {
      title: "Set it with data, agree it together",
      takeaway: "Ambitious but credible, built backwards from the target, and written in their words.",
      content: "A CPP the consultant doesn't believe in won't change anything. Start from what they've actually done, stretch it, then work backwards to the weekly activity that gets them there. Write it down in their words so it's theirs, not yours.",
      framework: { title: "Five steps to a CPP", steps: steps([
        ["01", "Start with data", "The last 12 months from Cube19 and the CRM."],
        ["02", "Set the stretch", "Ambitious but credible."],
        ["03", "Work backwards", "Target to placements, to interviews, to weekly activity."],
        ["04", "Agree it", "In their words, written down."],
        ["05", "Review monthly", "Adjust only with a reason."],
      ]).map(({ label, ...s }) => s) },
    },
    {
      title: "From activity to placement",
      takeaway: "Low placements? Find the stage where the ratio drops, and coach that stage.",
      content: "Every placement is the end of a funnel. When the numbers are down, \"do more activity\" is rarely the answer on its own. Look at each conversion in turn: the stage where the ratio drops is the stage to coach.",
      framework: { title: "The funnel", steps: steps([
        ["Input", "Activity", "Calls, messages and meetings."],
        ["Stage", "CVs sent", "Qualified submissions."],
        ["Stage", "Interviews", "First and final stages."],
        ["Stage", "Offers", "Made and accepted."],
        ["Output", "Placements", "Started, and past the rebate period."],
      ]) },
      tip: "Plenty of CVs but few interviews usually points to qualification or the sell-in. Plenty of interviews but few offers points to prep and pre-closing.",
    },
    {
      title: "The review calendar",
      takeaway: "Weekly 1:1s, monthly MBRs, quarterly QBRs, and a CPP that refreshes on a rolling 12 months.",
      content: "Reviews only work if they happen on a rhythm everyone can rely on. Book them in for the year ahead, and protect them: a cancelled 1:1 tells a consultant they don't matter.",
      tables: [table("The review calendar", ["When", "Review", "With", "Focus"], [
        ["Weekly", "1:1", "Consultant", "Numbers vs CPP, pipeline, actions"],
        ["Monthly", "MBR", "Consultant and AD/Director", "Month in review, ratios, next month's plan"],
        ["Quarterly", "QBR", "Consultant and AD/Director", "Quarter vs CPP, development, career step"],
        ["Rolling 12 months", "CPP refresh", "Consultant", "Reset targets and goals for the next 12 months"],
      ])],
    },
    {
      title: "What each review covers",
      takeaway: "The MBR looks at the month and the numbers. The QBR looks at the quarter and the person.",
      content: "Use the same headings every time, so the consultant can prepare and so you can compare one review with the next. End every MBR with three priorities for next month, and every QBR with an honest answer on the career step.",
      tables: [table("MBR and QBR", ["MBR with a consultant", "QBR with a consultant"], [
        ["Billings and activity vs CPP", "Quarter vs CPP"],
        ["Conversion ratios: where it drops", "Progress on development goals"],
        ["Wins and lessons", "Career step: on track?"],
        ["Top three priorities next month", "Values and feedback"],
      ])],
    },
    {
      title: "Promotions: clear and evidence-based",
      takeaway: "Promotions are earned with evidence, not tenure, and agreed in the QBR.",
      content: "Everyone should know the career path and what it takes to move along it. The consultant prepares the evidence; you review it with the AD or Director. The career path: Associate Consultant, Consultant, Senior Consultant, Business Manager, Manager, Senior Manager, Associate Director, Director.",
      framework: { title: "How promotions work", steps: steps([
        ["The path", "Career steps", "From Associate Consultant to Director, one clear step at a time."],
        ["The criteria", "Evidence, not tenure", "Billings, activity, ratios, our values, and helping others."],
        ["The process", "Agreed in the QBR", "Evidence prepared by the consultant and reviewed with the AD/Director."],
      ]) },
      tip: "If the answer is \"not this time\", say so plainly: why, and exactly what it will take.",
    },
    {
      title: "Practise it: write a CPP",
      takeaway: "Is it stretching and credible? Is the career step clear?",
      content: "Use one of your own consultants and their real data, so the CPP is ready to agree with them this month. While you work backwards, look for the stage in their funnel where the ratio drops: that's where your coaching goes.",
      framework: { title: "The exercise (40 minutes)", steps: steps([
        ["Data · 15 min", "Pull the data", "Your consultant's last 12 months: billings, activity and ratios."],
        ["Build · 15 min", "Work backwards", "From the target to weekly activity, for one consultant."],
        ["Review · 10 min", "Peer review", "In pairs: is it stretching and credible? Is the career step clear?"],
      ]) },
      scenario: {
        title: "A consultant is well above their activity standards but behind on billings, and asks in their QBR why they haven't been promoted. What do you do?",
        weak: "Tell them to keep their head down and do even more calls, and that promotion will come with time.",
        strong: "Go through the funnel with them, using the data: where does the ratio drop? If interviews aren't turning into offers, agree a coaching plan for prep and pre-closing. Then be straight about the promotion: it's earned with evidence, not effort alone. Show them exactly what the next step needs (billings, ratios, our values, helping others), write it into their CPP with dates, and review it monthly so there are no surprises next quarter.",
      },
    },
    {
      title: "Takeaways and actions",
      takeaway: "Set the bar. Review it often. Clear, fair and no surprises.",
      content: "Nobody should be surprised in a review. CPPs refresh on a rolling 12 months. Start with data from Cube19 and the CRM, and work backwards from the target to weekly activity. Diagnose the funnel and coach the stage that drops. Promote on evidence, not tenure. Tick off each action below as you do it.",
      tactics: [
        "Check every consultant has a written, agreed CPP",
        "Book the 1:1s, MBRs and QBRs for the next quarter",
        "Find the weakest ratio for each consultant and plan the coaching",
        "Share the career path and promotion criteria with your team",
      ],
    },
  ],
};

const forecasting = {
  _id: "drafts.module-mgmt-forecasting",
  _type: "trainingModule",
  title: "Forecasting & Pipeline",
  slug: { _type: "slug", current: "forecasting-pipeline" },
  eyebrow: "Management M9",
  subtitle: "Call the month with confidence: know every deal, its stage and its risk",
  category: inGroup,
  order: 90,
  icon: "trending-up",
  accent: "sky",
  sections: [
    {
      title: "An honest forecast beats a hopeful one",
      takeaway: "The business plans on your number.",
      content: "Your forecast isn't a target or a hope: the Group uses it to plan hires and spend. A manager whose number is reliable gets trusted with more. One who's always optimistic, or always sandbagging, makes planning harder for everyone.",
      framework: { title: "Why it matters", steps: steps([
        ["Planning", "Hiring and costs", "The Group plans hires and spend on the forecast."],
        ["Focus", "Where to push", "A clear pipeline shows which deals need help this week."],
        ["Trust", "Credibility", "Managers who call it right get trusted with more."],
      ]) },
    },
    {
      title: "The pipeline, stage by stage",
      takeaway: "Every deal sits at one stage, and the CRM says which.",
      content: "Use the same stages across the team so everyone's pipeline means the same thing. A deal moves to the next stage only when the evidence is there, not when it feels close.",
      framework: { title: "Five stages", steps: steps([
        [null, "Qualified job", "Graded A, B or C (Playbook 04)."],
        [null, "Submitted", "CVs with the client."],
        [null, "Interviewing", "First and final stages."],
        [null, "Offer", "Made, waiting for an answer."],
        [null, "Accepted", "Start date set."],
      ]) },
      tip: "A placement is only banked once the candidate has started and the rebate period has passed.",
    },
    {
      title: "Weight the pipeline",
      takeaway: "Weight every deal by its stage, using the same weightings across the team.",
      content: "Weighting turns a list of deals into a number you can plan on. The percentages below are an example only: agree your team's weightings with Finance, and use the same ones for everyone. Each stage also has conditions: if they aren't true, the deal belongs at an earlier stage.",
      tables: [table("Example weightings", ["Stage", "Example weighting", "What has to be true"], [
        ["First interview", "10%", "Interview booked, candidate qualified"],
        ["Final interview", "30%", "Final booked, feedback positive"],
        ["Offer made", "60%", "Offer in writing, salary agreed in principle"],
        ["Offer accepted", "90%", "Accepted in writing, resignation done"],
        ["Started", "100%", "Started, rebate period running"],
      ])],
    },
    {
      title: "Committed, likely, upside",
      takeaway: "Forecast = committed + the likely deals you'd bet on. Upside is a bonus, never the plan.",
      content: "Sort every deal into one of three buckets before you call the month. For each likely deal, name the risk out loud: if you can't, you haven't tested it yet.",
      framework: { title: "Three buckets", steps: steps([
        ["Committed", "Will land", "Accepted offers and started placements. Bet your credibility on it."],
        ["Likely", "Should land", "Offers out and strong finals. Name the risk on each."],
        ["Upside", "Could land", "Earlier-stage deals that could close this month."],
      ]) },
    },
    {
      title: "Questions to test a deal",
      takeaway: "Test every deal from both sides before you count it.",
      content: "Most forecast misses come from a question nobody asked. Run through both columns with the consultant for every deal in committed and likely. Counteroffer risk is covered in depth in Playbook 09.",
      tables: [table("Test a deal", ["The candidate", "The client"], [
        ["Are they still interviewing elsewhere?", "Who makes the final decision?"],
        ["Have they resigned, and how did it go?", "Are the fee and terms agreed?"],
        ["Is there a counteroffer risk?", "What could delay the offer?"],
        ["Is the start date confirmed?", "Is the budget signed off?"],
      ])],
    },
    {
      title: "Forecasting contract",
      takeaway: "Contract is forecast weekly: who's billing, and when they finish.",
      content: "Contract earns margin every week a contractor works, so the forecast is about who's on billing and for how long. The biggest risk isn't a deal falling through: it's a contractor finishing early, or not being extended because nobody had the conversation in time.",
      tables: [table("Perm vs contract", ["Area", "Perm", "Contract"], [
        ["How we earn", "One fee per placement", "Margin every week a contractor works"],
        ["What you forecast", "Placements", "Contractors on billing, and their end dates"],
        ["The risk", "The offer falls through", "Early finish or no extension"],
        ["Growth", "New placements", "New starts plus extensions"],
        ["Afterwards", "Rebate period after the start", "Timesheets and extensions every week"],
      ])],
    },
    {
      title: "Eight common forecasting mistakes",
      takeaway: "Most bad forecasts come from the same few habits.",
      content: "Check your own forecast against this list. The last two are opposite mistakes with the same cost: when the number isn't honest, nobody can plan on it.",
      mistakes: [
        "Forecasting on hope: counting deals because you want them to close",
        "A stale CRM: deals sitting at a stage for weeks without an update",
        "Missing the risks: no answer on counteroffers or other offers",
        "One big deal: the whole month depends on one placement",
        "Late surprises: bad news shared on the last day of the month",
        "Forgetting end dates: contractors finishing without an extension conversation",
        "Moving targets: changing the forecast every day",
        "Sandbagging: under-calling so you can beat it",
      ],
    },
    {
      title: "Practise it: call your team's month",
      takeaway: "At month end, compare your call with the result.",
      content: "Use your team's live pipeline. When you test each other's top five deals, be the awkward one: the point is to find the risks before the client or candidate does.",
      framework: { title: "The exercise (40 minutes)", steps: steps([
        ["Weight · 15 min", "Weight it", "Take your live pipeline and weight every deal by its stage."],
        ["Test · 15 min", "Test it", "In pairs: test each other's top five deals with the questions."],
        ["Call · 10 min", "Call it", "Write down your committed, likely and upside numbers."],
      ]) },
      scenario: {
        title: "On the 20th, a consultant tells you their biggest deal of the month is \"definitely landing\". The offer is out, but there's no start date, they haven't spoken to the candidate since the offer, and nobody has asked about a counteroffer. Where does it go in your forecast?",
        weak: "Put it in committed: the consultant is confident, and the month needs it.",
        strong: "It's likely at best, not committed. Test it with the consultant today: has the candidate accepted in writing? Have they resigned, and how did it go? Is there a counteroffer risk? Is the start date confirmed? Name the risk next to the deal, get the consultant to call the candidate and the client today, and move it to committed only once it's accepted in writing. If the month depends on it, say so now, not on the last day.",
      },
    },
    {
      title: "Takeaways and actions",
      takeaway: "Know your number: every deal, every stage, every risk.",
      content: "Honest beats hopeful: the business plans on your number. One stage per deal, updated in the CRM. Use the same weightings across the team. Three buckets: committed, likely, upside. Test every deal from both sides. Contract is forecast weekly. Banked means past the rebate period. No late surprises. Tick off each action below as you do it.",
      tactics: [
        "Agree your team's weightings with Finance",
        "Clean the CRM: every deal at the right stage",
        "Test your top five deals with the consultant who owns them",
        "List every contractor's end date and book the extension conversations",
      ],
    },
  ],
};

const motivation = {
  _id: "drafts.module-mgmt-motivation",
  _type: "trainingModule",
  title: "Motivation, Recognition & Retention",
  slug: { _type: "slug", current: "motivation-retention" },
  eyebrow: "Management M10",
  subtitle: "Know what drives each person, recognise it out loud, and keep your best people",
  category: inGroup,
  order: 100,
  icon: "trophy",
  accent: "lime",
  sections: [
    {
      title: "People leave managers",
      takeaway: "People rarely leave because of one bad month. They leave when they stop feeling seen.",
      content: "Most of what keeps a consultant is in your hands: knowing what drives them, noticing their work, and showing them where they're going.",
      framework: { title: "Know them, see them, grow them", steps: steps([
        ["Know them", "Different drivers", "What motivates one person does nothing for another."],
        ["See them", "Recognise often", "Specific, public and in the moment."],
        ["Grow them", "Show the path", "People stay where they can see their next step."],
      ]) },
    },
    {
      title: "What motivates recruiters",
      takeaway: "Everyone has a mix of drivers. Your job is to know each person's top one.",
      content: "Money matters in recruitment, but it's rarely the only thing. Read the eight drivers below and think of one person on your team for each.",
      framework: { title: "Eight drivers", steps: steps([
        ["Money", "Earnings", "Commission and the lifestyle it brings."],
        ["Career", "Progression", "The next title and responsibility."],
        ["Recognition", "Being seen", "Shout-outs, the board, the wrap-up."],
        ["Mastery", "Getting better", "Skills, training and harder roles."],
        ["Team", "Belonging", "Being part of a winning team."],
        ["Autonomy", "Independence", "Their own desk, accounts and decisions."],
        ["Impact", "Changing careers", "Helping people land life-changing jobs."],
        ["Competition", "Winning", "League tables, sprints and challenges."],
      ]) },
    },
    {
      title: "Find out what drives each person",
      takeaway: "Don't guess. Ask, then use what you hear.",
      content: "Ask these questions in a 1:1, then write the answers into their CPP and use them: link their targets to what they want, and recognise them the way they like. People change, so check in every quarter.",
      tables: [table("Ask, then use it", ["Ask in 1:1s", "Then use it"], [
        ["What gets you out of bed for this job?", "Write it on their CPP"],
        ["What would make this your best year?", "Link their targets to what they want"],
        ["How do you like to be recognised?", "Recognise them the way they like"],
        ["What would make you think about leaving?", "Check in every quarter"],
      ])],
    },
    {
      title: "Recognise it, out loud",
      takeaway: "\"Great job\" fades. \"That close on the Series B deal was brilliant\" sticks.",
      content: "Recognition works when it's specific, timely and public, and when it happens all the time, not just at the end of the year.",
      framework: { title: "Four rhythms of recognition", steps: steps([
        ["In the moment", "The board and the floor", "Call out every interview, offer and placement as it happens."],
        ["Every week", "The Friday wrap-up", "Wins by name, and a shout-out for living our values."],
        ["Every month", "League tables", "Top biller, Rookie of the Month, best activity."],
        ["In writing", "A message that lasts", "A Slack shout-out, or a note to their manager."],
      ]) },
      phrases: ["That close on the Series B deal was brilliant: you'd pre-closed the candidate twice, so the offer was a formality."],
    },
    {
      title: "Incentives and sprints",
      takeaway: "Short, focused challenges, and fair ones: reward activity and behaviour too, so everyone can win.",
      content: "A sprint is a week or two on one activity: BD calls, interviews or new jobs. Shared goals with a shared reward build a team that wins together. And use what the Group already offers before inventing something new.",
      framework: { title: "Three kinds of incentive", steps: steps([
        ["Sprints", "Short and focused", "A week or two on one activity: BD calls, interviews, new jobs."],
        ["Team targets", "Win together", "A shared goal and a shared reward."],
        ["Group schemes", "Use what exists", "The Group's current incentives and trips."],
      ]) },
      tip: "Keep it fair: if only billings win prizes, the same people win every time.",
    },
    {
      title: "Why people leave, and what to do",
      takeaway: "For every reason people leave, there's something a manager can do first.",
      content: "Read down the list and be honest about your own team: which of these could be true for someone right now? The last row matters most: the time to keep someone is before the other offer arrives.",
      tables: [table("Reasons and responses", ["Why people leave", "What a manager can do"], [
        ["They feel stuck", "Show the career path and the next step on their CPP"],
        ["They don't feel valued", "Recognise them specifically and often"],
        ["A bad relationship with their manager", "Regular 1:1s, honesty and support"],
        ["They aren't earning", "Coach the stage of the funnel that drops"],
        ["A better offer", "Stay conversations before the offer arrives"],
      ])],
    },
    {
      title: "Stay conversations",
      takeaway: "Ask why they stay before someone else asks why they'd leave.",
      content: "A stay conversation is a short, honest check-in every quarter. Use the four questions, listen more than you talk, and act on one thing you hear. Your top billers get the most offers, so give them what keeps them: stretch, autonomy, leadership and recognition.",
      phrases: [
        "What do you enjoy most about your work right now?",
        "What would you change if you could?",
        "What might tempt you to leave?",
        "What do you need from me?",
      ],
      tactics: [
        "Stretch: bigger accounts and harder goals",
        "Autonomy: more say over their desk",
        "Leadership: mentoring and leading others",
        "Recognition: in front of senior leaders",
      ],
    },
    {
      title: "Practise it: a stay conversation",
      takeaway: "Where you guessed a driver, ask them this week.",
      content: "Start by mapping your own team, then practise the conversation in pairs. Finish with one specific piece of recognition for each person, to give this week.",
      framework: { title: "The exercise (35 minutes)", steps: steps([
        ["Map · 10 min", "Map your team", "For each person: their top driver, and how you know."],
        ["Role-play · 15 min", "Run a stay conversation", "In pairs, using the four questions. Swap halfway."],
        ["Plan · 10 min", "Plan recognition", "One specific recognition for each person this week."],
      ]) },
      scenario: {
        title: "Your top biller has gone quiet over the last month. You hear that a competitor has been in touch with them. What do you do?",
        weak: "Wait to see if they resign, then try to match the offer with more money.",
        strong: "Book a stay conversation this week, before an offer lands. Ask what they enjoy most, what they'd change, what might tempt them to leave, and what they need from you, then listen. Act on one thing quickly: a bigger account, more say over their desk, a chance to mentor, or recognition in front of senior leaders. Write the agreed next step into their CPP, and check in every month, not just when there's a problem.",
      },
    },
    {
      title: "Takeaways and actions",
      takeaway: "Keep your best people. Know them. See them. Grow them.",
      content: "Ask what drives each person, and write it on their CPP. Recognise often: specific, timely and public. Celebrate activity too, so everyone can win. Use short sprints. Show the path, because people stay where they can grow. Hold stay conversations every quarter, before an offer arrives, and look after your top billers. Tick off each action below as you do it.",
      tactics: [
        "Write each person's top driver on their CPP",
        "Give one specific recognition to each person this week",
        "Book a stay conversation with every top biller this quarter",
        "Plan one fair sprint for next month",
      ],
    },
  ],
};

const clients = {
  _id: "drafts.module-mgmt-clients",
  _type: "trainingModule",
  title: "Managing Clients as a Manager",
  slug: { _type: "slug", current: "managing-clients-manager" },
  eyebrow: "Management M11",
  subtitle: "From your own desk to the team's accounts: plan them, grow them, protect them",
  category: inGroup,
  order: 110,
  icon: "handshake",
  accent: "brand",
  sections: [
    {
      title: "Your role changes",
      takeaway: "As a consultant you manage your clients. As a manager you own the team's key accounts.",
      content: "A few accounts usually drive most of a team's billings. Your job is to know which ones, make sure each has relationships at several levels, and use them to open doors for the rest of the Group.",
      framework: { title: "The shift", steps: steps([
        ["Concentration", "A few accounts matter most", "Know which accounts drive your team's billings."],
        ["Depth", "More than one relationship", "Every key account needs relationships at several levels."],
        ["Growth", "Across the Group", "Every account can open doors for other brands."],
      ]) },
    },
    {
      title: "The account plan",
      takeaway: "Eight boxes, three actions: every key account has a plan.",
      content: "An account plan fits on one page. Fill in the eight boxes for each key account, and refresh it before every client review. The gaps you find (a missing relationship, an unknown competitor, terms nobody checked) are where the account is at risk.",
      framework: { title: "Eight boxes", steps: steps([
        ["Map", "Who's who", "Decision makers, hiring managers, HR and procurement."],
        ["Plans", "Hiring plans", "Teams growing, projects coming, budgets."],
        ["Relationships", "Who knows whom", "Our contacts at each level, and the gaps."],
        ["History", "What we've done", "Placements, fill rate and feedback."],
        ["Competition", "Who else", "Other agencies and internal recruiters."],
        ["Group", "Other brands", "Perm, Consulting and Evergreen opportunities."],
        ["Terms", "Our terms", "Fees, rebate period and payment terms."],
        ["Actions", "Next 90 days", "Three actions, with owners and dates."],
      ]) },
    },
    {
      title: "Run a client review",
      takeaway: "Bring the data, listen first, then bring ideas, and agree actions in writing.",
      content: "Hold a review with every key account at least once a quarter. Come with the numbers, ask for their honest feedback, and spend most of the time on their plans for the next quarter.",
      framework: { title: "Five steps", steps: steps([
        ["01", "Prepare the data", "Roles, CVs, interviews, placements and time to hire."],
        ["02", "Their feedback", "What's working, and what isn't."],
        ["03", "Their plans", "Hiring for the next quarter."],
        ["04", "Our ideas", "Market insight and talent we know."],
        ["05", "Agree actions", "Written down and followed up."],
      ]).map(({ label, ...s }) => s) },
    },
    {
      title: "When something goes wrong",
      takeaway: "Same day, own it, fix it.",
      content: "How you handle a problem often matters more to a client than the problem itself. Call the same day, take ownership without excuses or blame, and come with a plan.",
      framework: { title: "Five steps for an escalation", steps: steps([
        ["01", "Acknowledge fast", "The same day, by phone."],
        ["02", "Own it", "No excuses, no blame."],
        ["03", "Fix it", "A plan, with dates."],
        ["04", "Follow up", "Check it worked."],
        ["05", "Learn", "Share the lesson with the team."],
      ]).map(({ label, ...s }) => s) },
      tip: "If a placement falls off in the rebate period, you call the client, agree the replacement or refund under the terms, and lead the search.",
    },
    {
      title: "Protect your terms",
      takeaway: "Trade, don't give. A lower fee is permanent; the reason for it rarely is.",
      content: "Know the terms for every key account, and sell on value, not price. If you do move, get something back. Any change to fees or terms goes to the AD or Director.",
      framework: { title: "Four rules", steps: steps([
        ["Know them", "Every key account", "Fee, rebate period and payment terms, in the CRM."],
        ["Sell value", "Not price", "Speed, quality and market insight justify the fee."],
        ["Trade, don't give", "If you move, get something", "Exclusivity, volume or faster payment in return."],
        ["Escalate", "Big changes", "Fee or term changes go to the AD/Director."],
      ]) },
      mistakes: ["Discounting without a reason and something in return"],
    },
    {
      title: "Coach your team on clients",
      takeaway: "Do it together, then hand over carefully: never one contact per account, never a cold handover.",
      content: "Your consultants learn client management by watching you do it and doing it alongside you. Share your relationships, so no account depends on one person.",
      tables: [table("Coaching on clients", ["Do it together", "Build relationships"], [
        ["Joint client visits and lunches", "Introduce consultants to your contacts"],
        ["Listen to BD and client calls", "Multiple contacts on every account"],
        ["Prepare for client reviews together", "Share account plans in the Monday meeting"],
        ["Debrief after every meeting", "Hand over clients carefully, never cold"],
      ])],
    },
    {
      title: "Practise it: build an account plan",
      takeaway: "Where is the account at risk, and where is the Group opportunity?",
      content: "Use your team's most important account. Present your plan to a partner in two minutes: if you can't explain it that quickly, it isn't clear enough yet.",
      framework: { title: "The exercise (35 minutes)", steps: steps([
        ["Map · 15 min", "Map it", "Pick your most important account and fill in the eight boxes."],
        ["Gaps · 10 min", "Find the gaps", "Where is the account at risk? Where is the Group opportunity?"],
        ["Act · 10 min", "Three actions", "Write three actions for the next 90 days, with owners."],
      ]) },
      scenario: {
        title: "Your biggest client's new procurement lead asks you to cut your fee on every role from next month, or they'll move to another agency. What do you do?",
        weak: "Agree straight away to protect the account, and tell the team the new rate.",
        strong: "Don't agree on the call. Thank them, and ask what's driving it: budget, a new policy, or a competitor's rate? Come back with the value you've delivered (placements, time to hire, fill rate). If you move at all, trade it: exclusivity, guaranteed volume or faster payment in return. Take any change to fees or terms to your AD or Director before you agree it. Then update the account plan, and build relationships beyond procurement so the account doesn't rest on one contact.",
      },
    },
    {
      title: "Takeaways and actions",
      takeaway: "Own the accounts. Plan them, grow them, protect them.",
      content: "Own the key accounts, and know which ones matter most. Plan every account: eight boxes, three actions. Build many relationships, never one contact per account. Review quarterly. Escalate fast, and lead fall-offs. Protect your terms: trade, don't give. Coach your team together, with joint visits and debriefs. Tick off each action below as you do it.",
      tactics: [
        "Write an account plan for your top five accounts",
        "Book a client review with each key account this quarter",
        "Check every key account's terms are in the CRM",
        "Book one joint client visit with each consultant",
      ],
    },
  ],
};

const quiz = quizDrafts([
  {
    _id: "drafts.quiz-mgmt-m8-01", module: "module-mgmt-performance", afterSection: 4,
    question: "A consultant's placements are low. What should you do first?",
    options: ["Tell them to double their calls", "Find the stage in their funnel where the ratio drops, and coach that stage", "Lower their target", "Wait for next quarter's review"],
    correct: 1,
    explanation: "Every placement is the end of a funnel. Find the stage where the conversion ratio drops, and coach that stage.",
  },
  {
    _id: "drafts.quiz-mgmt-m8-02", module: "module-mgmt-performance", afterSection: 7,
    question: "What should a promotion be based on?",
    options: ["Time in the role", "Evidence: billings, activity, ratios, our values and helping others", "Who asks first", "Billings alone"],
    correct: 1,
    explanation: "Promotions are evidence-based, not tenure-based. The consultant prepares the evidence, and it's agreed in the QBR with the AD or Director.",
  },
  {
    _id: "drafts.quiz-mgmt-m9-01", module: "module-mgmt-forecasting", afterSection: 4,
    question: "What goes into your forecast for the month?",
    options: ["Every deal in the pipeline", "Committed deals, plus the likely deals you'd bet on", "Committed, likely and upside together", "Only placements that have started"],
    correct: 1,
    explanation: "Forecast = committed + the likely deals you would bet on. Upside is a bonus, never the plan.",
  },
  {
    _id: "drafts.quiz-mgmt-m9-02", module: "module-mgmt-forecasting", afterSection: 6,
    question: "What is the biggest forecasting risk on contract?",
    options: ["The offer falls through", "A contractor finishes early or isn't extended", "The rebate period", "Timesheets arrive late"],
    correct: 1,
    explanation: "Contract earns margin every week a contractor works, so the risk is an early finish or no extension. Track every end date and have the extension conversation in time.",
  },
  {
    _id: "drafts.quiz-mgmt-m10-01", module: "module-mgmt-motivation", afterSection: 4,
    question: "Which recognition is most likely to stick?",
    options: ["\"Great job, everyone\" at the end of the month", "A specific, timely shout-out for what they actually did", "A bonus with no explanation", "A mention in the annual review"],
    correct: 1,
    explanation: "Recognition works when it's specific, timely and public. \"Great job\" fades; naming exactly what they did sticks.",
  },
  {
    _id: "drafts.quiz-mgmt-m10-02", module: "module-mgmt-motivation", afterSection: 7,
    question: "When should you hold a stay conversation with a top biller?",
    options: ["When they resign", "When a competitor makes them an offer", "Every quarter, before an offer arrives", "Once a year at their review"],
    correct: 2,
    explanation: "Stay conversations happen every quarter, before another offer arrives. That's when you can still act on what you hear.",
  },
  {
    _id: "drafts.quiz-mgmt-m11-01", module: "module-mgmt-clients", afterSection: 5,
    question: "A key client asks for a lower fee. What's the right approach?",
    options: ["Agree to keep the account", "Refuse outright", "Sell on value, trade for something in return, and take any change to your AD/Director", "Let the consultant decide"],
    correct: 2,
    explanation: "Trade, don't give: exclusivity, volume or faster payment in return. Fee or term changes go to the AD or Director. A lower fee is permanent; the reason rarely is.",
  },
  {
    _id: "drafts.quiz-mgmt-m11-02", module: "module-mgmt-clients", afterSection: 4,
    question: "A placement falls off in the rebate period. Who calls the client?",
    options: ["The consultant who placed them", "The manager, who agrees the replacement or refund and leads the search", "Finance", "Nobody: wait for the client to raise it"],
    correct: 1,
    explanation: "The manager calls the client the same day, agrees the replacement or refund under the terms, and leads the search.",
  },
]);

await importPlaybook([performance, forecasting, motivation, clients], quiz, { groups: [group] });
