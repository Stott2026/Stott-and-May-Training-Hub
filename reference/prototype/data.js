export const B = {
  teal:"#00C8C8", aqua:"#73F7BB", dark:"#111314", mid:"#7A8798",
  border:"#2a2f35", white:"#FFFFFF", card:"#1a1f24", inner:"#181c20",
};

export const VALUES = [
  {icon:"🤝",title:"One Stott and May",desc:"We stand by each other, celebrating success as we strive for excellence in all we do. We believe in unity, no one person is above the team."},
  {icon:"💫",title:"Excellence",desc:"We are specialists in our field, working hard with enthusiasm, care and dedication, as we strive to provide a platform for your success."},
  {icon:"🧠",title:"Thirst for Knowledge",desc:"We are brave, curious and continuously learning from our experiences. We embrace our challenges as a path to success."},
  {icon:"🎯",title:"Accountability",desc:"Effective communication is key to us and holding ourselves accountable for our promises is a foundation of our business."},
];

export const MODS = [
  {id:"candidate",icon:"👤",eyebrow:"PEOPLE",title:"Candidate Management",subtitle:"Source, screen, brief and manage expectations",gradient:`linear-gradient(135deg,${B.teal},${B.aqua})`,sections:[
    {
      title:"Sourcing and Attraction",
      content:"The best recruiters do not wait for roles to fill before building a talent pool. They are constantly mapping their market, building relationships before they need them, and staying visible so that when a role lands, they have people to call within the hour. Your sourcing strategy should work for you even when you are busy placing.",
      tactics:[
        "Map your talent pool before every search — know your market before you need it",
        "Build Boolean search strings tailored to the role and specialism",
        "Warm referrals convert at 3x the rate of cold outreach — always ask",
        "Use competitor mapping to identify talent at rival firms",
        "Engage on LinkedIn before you need someone — comment, share, connect",
        "Track candidate availability cycles — contractors often come to end of contract at predictable intervals",
        "Build talent pipelines for roles you place repeatedly, not just ones you have live today",
      ],
      phrases:[
        "I came across your profile and there is an opportunity genuinely worth your time. Are you open to a quick call?",
        "I only reach out to people I genuinely believe are a strong fit. This role is a rare one.",
        "I won't waste your time. If it is not right after 10 minutes, say so and I will leave you alone.",
        "I know you are probably not actively looking, but this one is different. Can I take 5 minutes to explain why?",
        "I have been building a network in this space for a while and your name keeps coming up. I wanted to reach out directly.",
        "Before I tell you about the role, can I ask you a couple of questions? I want to make sure it is actually worth your time.",
      ],
      mistakes:[
        "Sending the same generic InMail to 50 people — candidates can tell and it damages your brand",
        "Only sourcing when you have a live role — reactive sourcing means you are always behind",
        "Focusing only on active candidates — the best people are usually passively looking",
        "Ignoring your existing database — your best candidates are often ones you have already spoken to",
        "Copying competitor job ads without understanding the brief — leads to wrong shortlists",
      ],
      scenario:{
        title:"You have just taken on a senior Backend Engineering role in FinTech. Where do you start?",
        weak:"Post the job on LinkedIn and wait. Search for Backend Engineer on LinkedIn Recruiter and message 30 people the same InMail.",
        strong:"Before posting anywhere, spend 30 minutes mapping the FinTech engineering talent pool in your city. Identify the top 10 companies where this person is likely to work. Check your database for anyone you have spoken to in the last 18 months. Write a specific Boolean string for this role. Reach out personally to 5-8 people with a message referencing something specific about their background. Only then post the role — but frame it as exclusive and urgent."
      }
    },
    {
      title:"Screening and Qualifying",
      content:"A thorough screen is what separates a great recruiter from an average one. Anyone can find a CV that matches keywords. The skill is in understanding what someone actually wants, what is really driving them to consider a move, and whether they would still be interested at offer stage. Get this wrong and you will waste everyone's time.",
      tactics:[
        "Use open questions to uncover real motivations, not surface-level answers",
        "Qualify on culture fit and working style, not just technical skills",
        "Always ask: what would make you leave your current role? Listen for the real answer beneath the first one",
        "Identify the push and pull — what they are moving from, and what they are moving toward",
        "Confirm availability, notice periods and competing processes early — not at offer stage",
        "Score their commitment to move on a scale of 1-10 and explore the number",
        "Ask what they have turned down recently — it tells you what they will not settle for",
        "Do not over-qualify — you are screening for fit, not interrogating a suspect",
      ],
      phrases:[
        "What does the ideal next step look like for you? Not just the role, but the environment and the growth.",
        "On a scale of 1-10, how committed are you to making a move right now? Tell me about that number.",
        "What is the one thing that would stop you from accepting an offer?",
        "If I could build you the perfect role from scratch, what would it look like?",
        "What does your current role give you that you would be scared of losing?",
        "What have you turned down in the last 6 months, and why?",
        "Help me understand what is really driving this. Is it the role, the company, the manager, the money, or something else?",
        "If money was not a factor at all, what would your ideal next move look like?",
      ],
      mistakes:[
        "Accepting the first answer — most people give a polished answer first and the real one second",
        "Rushing past motivation to get to availability — understanding why they want to move is more important than when",
        "Not asking about competing processes — finding out at offer stage that they have 3 other offers is too late",
        "Qualifying too hard and killing enthusiasm — find the balance between thorough and interrogative",
        "Assuming salary is the main driver when it often is not",
      ],
      scenario:{
        title:"A candidate tells you they are open to new opportunities but seems lukewarm. What do you do?",
        weak:"Take them at face value, send them the job spec, and hope they get excited when they read it.",
        strong:"Slow down. Ask them directly: on a scale of 1-10, how committed are you to making a move right now? If they say 6 or 7, ask what would make it a 9. Listen for the real driver underneath. Is it money? Culture? Career stagnation? Unhappy manager? Once you know the real push factor, you can qualify roles against it and build genuine motivation. A lukewarm candidate who understands why they want to move is worth 10x a 'keen' candidate who has not thought it through."
      }
    },
    {
      title:"Perm — Briefing and Preparing Candidates",
      content:"For permanent roles the candidate is making a significant life decision. Your job is to make sure they are going into every interview fully prepared, genuinely motivated, and clear on their own position. A well-briefed candidate performs better, asks better questions, handles salary conversations more confidently, and drops out less. Do not skip this step.",
      tactics:[
        "Run a proper 20-minute briefing call — never just send a PDF or WhatsApp",
        "Research the interviewer and share specific intelligence before the call",
        "Explain the interview format, style and likely questions in detail",
        "Coach them on what the hiring manager cares about most",
        "Brief on salary expectations early and agree a position together",
        "Prepare 3 smart questions for them to ask at the end of the interview",
        "Run a mock answer to the toughest likely question",
        "Send a follow-up summary after the call so they can refer to it the night before",
      ],
      phrases:[
        "Let me give you a proper prep call. I want you going in with full confidence.",
        "The hiring manager values X above all else. Make sure you reference your experience with that directly.",
        "Do not try to be what you think they want. Be yourself. I have told them why you are great.",
        "Think about why you want THIS company, not just the role. Have a clear, genuine answer ready.",
        "Prepare 3 smart questions to ask at the end. It shows you have done your homework.",
        "If they ask about salary, here is what we have agreed you will say. Let us practise it.",
        "I know you are confident, but let us run through your answer to their toughest question. Ready?",
      ],
      mistakes:[
        "Sending the job spec and saying 'good luck' — this is not preparation",
        "Not coaching on salary — leaving the candidate to wing it at offer stage causes problems",
        "Over-briefing and killing natural conversation — give them a framework, not a script",
        "Forgetting to follow up after the interview — the debrief call is as important as the prep call",
        "Assuming experienced candidates do not need prep — everyone performs better when well-briefed",
      ],
      scenario:{
        title:"Your candidate has a first interview tomorrow morning. You spoke to them briefly last week. What do you do tonight?",
        weak:"Send a quick WhatsApp wishing them good luck and remind them of the time.",
        strong:"Call them tonight for a 20-minute prep session. Share 2-3 things you know about the interviewer from their LinkedIn. Remind them of the 3 things the client cares about most. Agree on the salary conversation approach. Coach them on the answer to the hardest likely question. Send a short follow-up message with the key points. Then tomorrow, call within 2 hours of the interview ending — not the next day."
      }
    },
    {
      title:"Contract — Briefing and Preparing Candidates",
      content:"Contract candidates are experienced professionals who move fast and have clear commercial priorities. Do not over-explain or talk down to them. Get straight to what matters: the rate, the IR35 status, the scope of work, the start date, and whether it is the right fit for their skills. Respect their time and they will respect yours.",
      tactics:[
        "Confirm IR35 status before briefing — it changes everything about rate calculations",
        "Be crystal clear on the rate: PAYE, umbrella, or limited company",
        "Confirm start date and duration upfront — contractors will not wait",
        "Brief on the technical environment and stack in detail — contractors need to hit the ground running",
        "Understand their current contract end date and pipeline — are you competing?",
        "Be concise — experienced contractors do not need hand-holding",
        "Address rate flexibility early so there are no surprises at offer stage",
      ],
      phrases:[
        "Before anything else, are you inside or outside IR35 and what is your preferred payment method?",
        "This is a 6-month rolling contract, outside IR35, starting in 2 weeks. Does that work for you?",
        "I know your time is valuable. Here is the brief, the rate, and the timeline. Any questions?",
        "They move quickly on contract. If you are interested I would want to get you in front of them this week.",
        "Is there anything that would stop you taking this if the interview went well? I would rather know now.",
        "What is your current situation? Free immediately or do you have a notice period?",
      ],
      mistakes:[
        "Briefing on IR35 without confirming the client's SDS first — guessing IR35 status is dangerous",
        "Being vague on rate — contractors will not progress without a clear number",
        "Over-explaining to experienced contractors — treat them as peers",
        "Not confirming competing processes — a contractor with 3 other interviews will not wait 2 weeks for yours",
        "Forgetting to confirm access, equipment and onboarding logistics — a bad day one kills the relationship",
      ],
      scenario:{
        title:"You have a contract role that needs to start in 10 days. Your candidate is currently on a contract ending in 3 weeks. What do you do?",
        weak:"Send the job spec, ask if they are interested, and wait for a response.",
        strong:"Call immediately. Get straight to the point: rate, IR35, start date, duration, tech stack. Ask if there is any flexibility on their current contract end date. If they are interested, move to interview the same day or next morning. Get verbal commitment before you close the call. Do not let the process drag — contractors make fast decisions and will take the first good offer they get."
      }
    },
    {
      title:"SOW — Briefing and Preparing Candidates",
      content:"SOW engagements are a fundamentally different conversation. The candidate is not filling a seat — they are selling a solution to a problem. They need to think like a consultant, not an employee. Your job is to help them frame their pitch around outcomes, demonstrate governance capability, and show that they can own delivery end to end.",
      tactics:[
        "Clarify the deliverable and success criteria before the candidate prepares anything",
        "Help them structure their approach: problem definition, proposed solution, governance model, timeline",
        "Coach them to ask clarifying questions in the interview — it shows consultative thinking",
        "Prepare them for scope, risk and pricing questions",
        "Make sure they are comfortable discussing IP, confidentiality and substitution clauses",
        "Position them as a solution provider, not a worker — language matters",
        "Run through the question: what would you do in the first 30 days?",
      ],
      phrases:[
        "This is not a day-rate role. They are buying an outcome. Let us talk through what success looks like and how you would approach it.",
        "Think of this less as an interview and more as a working session. They want to see how you think.",
        "Be prepared to talk through your governance model and how you would escalate issues. It builds confidence.",
        "Do not just present your solution. Ask questions first. Show that you understand before you prescribe.",
        "They will respect a consultant who pushes back on an unclear brief. Do not be afraid to do that.",
        "Have a clear answer to: what would you do in the first 30 days?",
      ],
      mistakes:[
        "Briefing a SOW candidate like a contract candidate — they need a completely different mindset",
        "Not preparing them for commercial questions — rate, scope and IP always come up",
        "Letting them go in without a clear structure for their presentation",
        "Failing to brief on the governance and sign-off process — SOW clients are buying process as much as outcome",
        "Not coaching them on the discovery questions they should ask — showing curiosity wins SOW interviews",
      ],
      scenario:{
        title:"Your candidate is presenting a SOW proposal to a financial services client tomorrow. How do you prep them?",
        weak:"Remind them to be confident and know their stuff.",
        strong:"Run a 30-minute briefing. Help them structure their presentation: open with your understanding of the problem, present your proposed approach and methodology, explain governance and reporting, outline key milestones and what success looks like at each stage, and close with questions that show you are genuinely interested in their constraints. Role-play the three hardest questions they will get: how would you handle scope creep? What happens if you cannot deliver on time? How did you price this?"
      }
    },
    {
      title:"Managing Expectations",
      content:"Most placement failures happen not because the wrong person was found, but because expectations were not managed at the right time. Counter-offers, cold feet, competing offers and last-minute dropouts are all largely preventable. The conversations that feel uncomfortable to have early are far less uncomfortable than the ones you have to have at offer stage.",
      tactics:[
        "Have the counter-offer conversation at initial screening, not at offer stage",
        "Check in same day after every interview — not the next morning",
        "Be honest about likelihood of success at each stage — do not over-promise",
        "For perm: address lifestyle, relocation, or family considerations early",
        "For contract: have a backup plan if they get a competing offer during your process",
        "Ask directly: has anything changed? at every touchpoint",
        "If they go quiet, call — do not wait for them to come back to you",
      ],
      phrases:[
        "If your current employer makes a counter-offer, what would you do? Let us talk through that now.",
        "I want to be straight with you. There are 3 strong candidates at this stage. Here is how I think you stand out.",
        "I would rather have an honest conversation now than a difficult one at offer stage. Where are you at?",
        "Has anything changed since we last spoke that I should know about?",
        "I am not going to pressure you. But I need to know where your head is at before I go back to the client.",
        "What would it take for you to walk away from this process? I want to manage that risk now.",
      ],
      mistakes:[
        "Avoiding the counter-offer conversation because it feels awkward — it will be much more awkward at offer stage",
        "Checking in by WhatsApp instead of calling — tone is lost in text",
        "Accepting that everything is fine without probing — people say they are fine when they are not",
        "Not flagging to the client when a candidate is wavering — surprises at offer stage damage your credibility",
        "Letting too much time pass between touchpoints — candidates disengage when they feel forgotten",
      ],
      scenario:{
        title:"Your candidate has been through 2 interviews and you are expecting an offer this week. They stop responding to your messages. What do you do?",
        weak:"Send another message and wait. They are probably just busy.",
        strong:"Call them. Do not text again. If they do not answer, leave a short voicemail: 'I have some good news coming your way this week and I want to make sure I can reach you. Can you give me a quick call?' When you speak to them, lead with an open question: how are you feeling about everything? Listen carefully. Something has changed — find out what it is before the offer lands."
      }
    },
  ]},
  {id:"client",icon:"🤝",eyebrow:"RELATIONSHIPS",title:"Client Management",subtitle:"Build trust, add value, develop accounts",gradient:`linear-gradient(135deg,${B.teal},#44B3F4)`,sections:[
    {
      title:"Building Trust Early",
      content:"Trust is the only currency that matters in recruitment. You cannot buy it with a lower fee, win it with a large database, or manufacture it with a pitch deck. You earn it by being honest when honesty is hard, by following through consistently, and by adding value before you ask for anything in return. The best client relationships are built before there is a live role to fill.",
      tactics:[
        "Send market insight before pitching a candidate — lead with value",
        "Be honest about what you can and cannot deliver in this market",
        "Always do what you say you will do, even when it is inconvenient",
        "Share salary benchmarks, skills scarcity data and competitor intel proactively",
        "Show you understand their business, not just their vacancy",
        "Be the first to raise a problem — not the last",
        "Say no when the brief is unrealistic rather than promising what you cannot deliver",
      ],
      phrases:[
        "I wanted to share this salary benchmark data. No agenda, just thought it would be useful for your planning.",
        "I would rather tell you I cannot find this profile than waste your time with the wrong people.",
        "I am going to be straight with you. I think the brief needs adjusting. Here is why.",
        "I won't just tell you what you want to hear. That is not how I add value.",
        "I have seen this situation before. Here is what worked and here is what did not.",
        "Can I share a thought? You might disagree, but I think it is worth saying.",
      ],
      mistakes:[
        "Over-promising to win the business then under-delivering — kills trust faster than anything",
        "Sending CVs before you have fully understood the brief",
        "Disappearing after the placement — the relationship only exists when you need something",
        "Avoiding difficult conversations about the brief, the market, or the timeline",
        "Treating every client the same regardless of how strategic they are",
      ],
      scenario:{
        title:"A client asks you to fill a senior Data Science role at below-market salary. They have been trying for 3 months. What do you do?",
        weak:"Say you will try your best and start sending CVs hoping something sticks.",
        strong:"Tell them the truth. Share salary data for equivalent roles in their market. Explain specifically why the current rate is the barrier — not a vague 'the market is competitive'. Offer a solution: here are three options. Adjust the salary. Adjust the seniority of the role. Or adjust the expectations around remote working to widen the pool. This is the conversation they need to have, and you are the person best placed to have it. That is what a trusted partner does."
      }
    },
    {
      title:"Taking a Quality Brief — Perm",
      content:"The quality of your brief determines the quality of your shortlist. A bad brief produces a bad shortlist which wastes everyone's time and damages your relationship. Push beyond the job spec. Ask about the person who failed in this role before. Ask what great looks like versus good. Ask about the team dynamic and the manager's style. The best brief call takes 45 minutes and covers far more than the job description.",
      tactics:[
        "Always take a brief on a live call, never by email or from a job spec alone",
        "Ask what failed hires had in common — this tells you more than any spec",
        "Understand the culture, leadership style and team dynamic",
        "Push for a salary range with flex — not just a headline number",
        "Confirm the interview process, number of stages and decision timeline before you start",
        "Ask who else is involved in the decision — not just the hiring manager",
        "Agree on the definition of a strong shortlist before you submit anyone",
      ],
      phrases:[
        "Tell me about the last person who did this role brilliantly. What made them stand out?",
        "If you could design the perfect candidate from scratch, what would that look like beyond the CV?",
        "What has caused turnover in this role before, and how are you addressing that?",
        "What does the team dynamic look like, and what kind of personality would thrive in it?",
        "What are the three things that would make you think yes, that is the one, when you meet the right person?",
        "Tell me about a hire that did not work out. What was it that did not fit?",
        "If salary is the sticking point, what other levers do you have? Equity, bonus, title, remote working?",
      ],
      mistakes:[
        "Accepting a job spec as a brief — the spec tells you what they want, not who will thrive",
        "Not pushing on salary flex — taking the first number and finding out there is more at offer stage",
        "Failing to ask about the interview process — sending candidates into a 5-stage process without warning is unacceptable",
        "Not understanding the team or manager — culture fit is as important as technical fit",
        "Taking the brief by email — you lose the ability to probe, challenge and read between the lines",
      ],
      scenario:{
        title:"A client sends you a job spec by email and says 'can you get some CVs over by Friday?' What do you do?",
        weak:"Read the spec, start searching, and send 3-4 CVs by Friday.",
        strong:"Reply within the hour: 'Absolutely, I want to make sure I am sending you the right people. Can we get 20 minutes on a call today or tomorrow? I have a few questions that will make a big difference to the shortlist.' Then on the call, ask the brief questions that the spec does not answer: who failed in this role and why, what the team is like, what the interview process looks like, and what flex there is on salary. Friday CVs will be far better for it."
      }
    },
    {
      title:"Taking a Quality Brief — Contract",
      content:"Contract briefs should be fast and precise. The client usually has an urgent problem and wants it solved quickly. Your job is to remove friction, not add it. Confirm the 5 essentials in the first 5 minutes — rate, IR35, start date, duration, must-have skills — and then move. But do not skip the questions that prevent problems later.",
      tactics:[
        "Confirm IR35 status first — if the client does not know, help them work it out",
        "Get the rate approved before you advertise — do not assume",
        "Understand the real start date — ASAP is not a date",
        "Clarify must-haves versus nice-to-haves firmly — everything cannot be essential",
        "Agree on shortlist format and turnaround time — 24-48hrs is standard",
        "Set expectations on notice periods — top contractors are rarely free immediately",
        "Ask about access, equipment and onboarding — a bad day one kills the placement",
      ],
      phrases:[
        "I can turn this around quickly. I just need the rate, IR35 status and must-haves confirmed. Can we do that now?",
        "When you say ASAP, are we talking next week or next month? That changes who I can approach.",
        "I would rather send you two great people than five average ones. Is that how you would prefer to work?",
        "If I find the right person today, can you move to interview tomorrow?",
        "Have you determined IR35 status? If not, I can help you work through that before we start.",
        "How many agencies are you using on this? I want to know how to prioritise my resource.",
      ],
      mistakes:[
        "Starting to source before IR35 is confirmed — creates compliance problems downstream",
        "Agreeing to unrealistic timelines — setting yourself up to fail",
        "Sending 10 CVs to look busy instead of 3 great ones — quantity signals desperation not quality",
        "Not asking about the onboarding process — a contractor who cannot get access on day one will leave",
        "Failing to set SLA expectations — if you do not agree a response time, you will not get one",
      ],
      scenario:{
        title:"A client calls you at 4pm on a Wednesday needing a Senior DevOps Engineer to start Monday. What is your first question?",
        weak:"Tell them you will see what you can do and start calling contractors immediately.",
        strong:"Before anything else: confirm the rate, confirm IR35 status, and ask what access and equipment will be in place by Monday. Then be honest: the right person for this probably has notice to work out or is in another process. Here are 3 people I know who might be free — let me make some calls right now and get back to you within the hour. Speed is your value here. But do not promise Monday if Monday is not achievable."
      }
    },
    {
      title:"Account Development",
      content:"Every successful placement should open a door, not close one. The best account managers treat every new hire as the start of a relationship with a new hiring manager, a new team, and a new part of the business. Map the organisation. Understand their hiring cycles. Share insight without being asked. The goal is to become so embedded in how they think about talent that they call you before they write a job spec.",
      tactics:[
        "Map org charts and identify other hiring managers within 30 days of every placement",
        "Share quarterly hiring insights and salary data without being asked",
        "Ask for introductions to new stakeholders after every successful placement",
        "Understand their budget cycles and headcount planning timelines",
        "Mix perm, contract and SOW opportunities across the same account",
        "Find out what the business is building and stay ahead of the hiring need",
        "Position yourself as a talent advisor, not a supplier",
      ],
      phrases:[
        "Now that we have placed Alex, who else in the business has headcount this year?",
        "I would love to understand your broader talent strategy so I can be more useful to you.",
        "Are there any project-based needs where a SOW or contract engagement might make more sense than a perm hire?",
        "What does your hiring plan look like for the next 6 months? I want to make sure I am planning ahead for you.",
        "I have been working with another team in your business. Would it be useful for me to make an introduction?",
        "What is the one thing I could do differently that would make me more valuable to you?",
      ],
      mistakes:[
        "Disappearing after the placement and only calling when you want something",
        "Treating every contact at the same company separately instead of mapping the account as a whole",
        "Not asking for introductions — most clients are happy to facilitate if you ask",
        "Focusing only on current live roles instead of future pipeline",
        "Missing the opportunity to introduce SOW or contract alongside perm",
      ],
      scenario:{
        title:"You have just placed a VP of Engineering at a scale-up. The CEO thanks you. What do you do next?",
        weak:"Thank them, send an invoice, and move on to the next role.",
        strong:"This is your biggest opportunity. Within a week of the placement, call the CEO and the new VP separately. Ask how the start is going. With the VP, ask who they are planning to hire — they almost certainly have headcount. With the CEO, ask who else in the leadership team has hiring needs this year. Map every team. Identify every potential role. You have just earned trust at the highest level of this business. Do not waste it."
      }
    },
  ]},
  {id:"job",icon:"🗂️",eyebrow:"DELIVERY",title:"Job Management",subtitle:"Qualify, prioritise and run every role to a close",gradient:`linear-gradient(135deg,${B.teal},${B.aqua})`,sections:[
    {
      title:"Qualifying a Job Before You Work It",
      content:"Not every job deserves your time. The biggest drain on a consultant's desk is roles that were never going to close: unapproved budgets, unrealistic salaries, clients who will not give feedback, or searches shared with six other agencies. Qualifying hard at the start is not being difficult. It is protecting your time so you can give the roles that will close everything they need.",
      tactics:[
        "Qualify every role on a live call before you source a single candidate",
        "Confirm the budget is approved, not pending sign-off",
        "Test the salary or rate against the market before you commit — and say so if it is off",
        "Find out how many other agencies are working it, and whether internal candidates are in the mix",
        "Agree feedback turnaround and interview availability up front — a client who will not commit to 48-hour feedback will not close",
        "Use MEDDPICC for senior, retained or high-value roles",
        "Score the role Green, Amber or Red before you decide how much time to give it",
      ],
      phrases:[
        "Before I start, can I ask a few questions? I want to make sure I put the right effort behind this.",
        "Is the budget signed off for this role, or is it still going through approval?",
        "How many agencies are you working with on this one?",
        "If I send you a strong CV on Tuesday, when could you realistically interview?",
        "I will be honest — at this salary, the people you have described are hard to attract. Can we talk about flex?",
        "What happens to the business if this role is still open in three months?",
      ],
      mistakes:[
        "Saying yes to every job and spreading yourself too thin",
        "Starting to source before the budget is approved",
        "Accepting a salary you know is below market and hoping for the best",
        "Not asking how many agencies are involved — you end up in a race you cannot win",
        "Treating a vague 'send me anyone good' as a real job",
      ],
      scenario:{
        title:"A new client asks you to work a Senior Data Engineer role. They are also using four other agencies and the salary is 15% below market. What do you do?",
        weak:"Start searching straight away and try to be the first agency to send a CV.",
        strong:"Slow down and qualify. Share salary data showing where the market is. Ask what flex exists across base, bonus and remote working. Then offer a better way of working: if you give me a two-week exclusive at a realistic salary, I will give this my full focus and have a shortlist to you within five days. If they refuse both, be honest about how much time you can give it and put your effort into roles that will close."
      }
    },
    {
      title:"Prioritising Your Desk",
      content:"Every consultant has more roles than hours. The ones who bill consistently are ruthless about where their time goes. They know which roles are closest to a placement, which clients reward effort, and which jobs are quietly dying. A weekly RAG review of every live role turns a crowded desk into a clear plan.",
      tactics:[
        "RAG rate every live role every Monday: Green (likely to close), Amber (needs work), Red (unlikely)",
        "Spend most of your time on Green roles — that is where placements come from",
        "For Amber roles, identify the one thing that would move them to Green, then fix it or ask for it",
        "Have an honest conversation about Red roles — pause them or agree new terms",
        "Weight priority by fee, likelihood and time to close, not just by which client shouts loudest",
        "Keep your number of live roles realistic for the time you have",
      ],
      phrases:[
        "I want to make sure I am giving this the focus it deserves. Can we agree what needs to be true for it to close?",
        "This one has not moved in two weeks. Is it still a priority for you?",
        "I would rather be honest than let this drift. Should we pause it until the budget is confirmed?",
        "If I could only fill one of these roles for you this month, which would it be?",
      ],
      mistakes:[
        "Working roles in the order they arrived instead of by likelihood to close",
        "Keeping dead roles on your desk because letting go feels like failure",
        "Letting the loudest client take all your time regardless of their value",
        "Not reviewing the desk weekly — priorities shift faster than you think",
      ],
      scenario:{
        title:"You have 11 live roles and can only realistically give serious focus to five. How do you decide?",
        weak:"Try to work all 11 equally and hope some of them land.",
        strong:"RAG rate all 11. Put the three or four Greens at the top of your week. For the Ambers, pick the two where one conversation — a salary change, faster feedback, an exclusive — would make them Green, and have that conversation today. For the Reds, call the clients and agree to pause or reset them. You are not dropping clients. You are telling them honestly what it takes to get a result."
      }
    },
    {
      title:"Running the Search and Shortlist",
      content:"A great shortlist is three to five people the client wants to meet, not ten CVs that loosely match the spec. Your value is in the filtering. Every candidate you submit either builds your credibility with the client or erodes it. Submit fewer, better people, and explain clearly why each one is worth meeting.",
      tactics:[
        "Agree what a strong shortlist looks like with the client before you start",
        "Map the market first, then approach — know who is out there before you pick up the phone",
        "Submit three to five qualified candidates, not a pile of CVs",
        "Write a short covering note for every CV explaining why this person fits this brief",
        "Set a shortlist date and hit it — or tell the client early if you will not",
        "Use feedback from the first CVs to sharpen the search",
      ],
      phrases:[
        "I have three people I think you will want to meet. Here is why each one fits.",
        "I have spoken to twelve people and these are the three I would put my name to.",
        "Before you read the CVs, here is the one thing I want you to know about each candidate.",
        "What did you think of the first two? Your feedback will help me sharpen the next ones.",
      ],
      mistakes:[
        "Sending CVs without a covering note — the client has to do your job for you",
        "Submitting candidates you have not properly screened",
        "Missing the agreed shortlist date without warning",
        "Ignoring feedback on early submissions and sending more of the same",
      ],
      scenario:{
        title:"A client rejects your first three CVs, saying none of them are quite right. What do you do?",
        weak:"Send three more CVs with a similar profile.",
        strong:"Call the client before sending anything else. Ask what specifically was missing from each one — skills, seniority, style, background. Often the brief has shifted or was never fully clear. Recalibrate together: so if I have understood correctly, what you really need is X rather than Y? Then confirm it back in writing and search again against the new criteria."
      }
    },
    {
      title:"Managing the Interview Process",
      content:"Once candidates are in process, your job is to keep momentum. Processes die in the gaps: slow feedback, rescheduled interviews, a candidate who hears nothing for a week. The consultant who controls the timeline — booking the next stage before the last one ends and chasing feedback within hours — closes more roles.",
      tactics:[
        "Book the next interview stage before the current one finishes wherever possible",
        "Get client feedback within 24 hours of every interview — chase on the same day",
        "Debrief the candidate within 2 hours, before you share client feedback",
        "Keep a clear timeline for every process and share it with both sides",
        "Flag delays to the candidate early so silence does not become doubt",
        "Watch for competing processes and adjust your timeline to match",
      ],
      phrases:[
        "While I have you, can we lock in a date for the next stage now?",
        "I would love your feedback today while it is fresh. What stood out?",
        "The candidate has another process moving quickly. If we want them, we need to move by Friday.",
        "I want to keep this moving for both of you. Here is the timeline I think works.",
      ],
      mistakes:[
        "Waiting for the client to come back with feedback instead of chasing it",
        "Letting a week pass between stages with no update to the candidate",
        "Sharing client feedback before hearing the candidate's own reaction",
        "Not knowing about a candidate's other processes until it is too late",
      ],
      scenario:{
        title:"Your candidate had a strong first interview five days ago. The client still has not given feedback and the candidate has a final interview elsewhere next week. What do you do?",
        weak:"Send the client another email asking for feedback.",
        strong:"Call the client today. Be direct: the candidate interviewed well, and they are at final stage elsewhere next week. If you want them, we need to book the next stage this week. Then call the candidate, share where things are, and ask how they are feeling about both processes. You are managing a real risk, not creating false urgency."
      }
    },
    {
      title:"Contract and SOW Job Management",
      content:"Contract and SOW roles move on a different clock. Contract roles are won or lost in hours, not weeks — the first good candidate in front of the client usually gets it. SOW engagements are slower to scope but carry more commercial risk, because you are selling an outcome. Manage each on its own terms.",
      tactics:[
        "For contract: confirm rate, IR35 status, start date and duration before you advertise",
        "For contract: aim to submit within 24–48 hours and interview within days",
        "For contract: start the renewal conversation at the halfway point of every assignment",
        "For SOW: scope deliverables, milestones and acceptance criteria before any pricing",
        "For SOW: agree governance, change control and escalation before work starts",
        "For SOW: check the engagement is a genuine SOW, not a contract role in disguise",
      ],
      phrases:[
        "If I can get you two strong contractors by tomorrow, can you interview on Thursday?",
        "We are halfway through the assignment. How is it going, and are you likely to extend?",
        "Before we talk about price, can we agree exactly what will be delivered and how it will be signed off?",
        "What happens if the scope changes halfway through? Let us agree that process now.",
      ],
      mistakes:[
        "Treating a contract role with a perm timeline — someone faster will win it",
        "Leaving renewals until the last week of an assignment",
        "Pricing a SOW before the deliverables are clear",
        "Letting a SOW run without a change control process",
      ],
      scenario:{
        title:"A contractor you placed six months ago has four weeks left. Neither the client nor the contractor has mentioned an extension. What do you do?",
        weak:"Wait for the client to raise it nearer the end date.",
        strong:"You are already late. Call the client this week: how has the assignment gone, and what does the next quarter look like for the project? Then call the contractor and find out what they want — extension, rate review or a move. If the client wants to extend and the contractor is happy, agree terms now. If not, start lining up the contractor's next role and a replacement for the client."
      }
    },
  ]},
  {id:"bd",icon:"📈",eyebrow:"GROWTH",title:"Business Development",subtitle:"Win new clients and expand existing ones",gradient:`linear-gradient(135deg,${B.teal},#44B3F4)`,sections:[
    {
      title:"Warm BD Tactics",
      content:"Warm BD is the highest ROI activity in recruitment. A warm call converts at 3-5x the rate of a cold one. The best recruiters are always looking for warm routes into new conversations — through candidates, through LinkedIn engagement, through placements, through referrals, and through market events. Your job is to engineer warmth before you pick up the phone.",
      tactics:[
        "Lead with a placement announcement or market data, not a pitch",
        "Ask every placed candidate for two hiring manager introductions within the first 90 days",
        "Engage with a prospect's LinkedIn content before you message them",
        "Congratulate on funding rounds, promotions, or new product launches — research creates warmth",
        "Reference mutual connections explicitly in your outreach",
        "Use a recent placement in a similar company as a conversation opener",
        "Build a referral flywheel: every happy candidate or client should generate at least one introduction",
      ],
      phrases:[
        "Congratulations on the Series B. I imagine you will be growing the team. I would love to understand your hiring plans.",
        "I placed someone who used to work at your company. They spoke incredibly highly of you. I wanted to introduce myself.",
        "[Name] suggested I reach out. They thought there might be a useful conversation to be had.",
        "I was going to send you a cold message, but then I noticed we are connected through [name]. I thought a warm introduction was better.",
        "I shared some content recently that you engaged with. I thought it might be worth a proper conversation.",
        "I have been watching your growth for a while. The [milestone] caught my eye. Is now a good time to connect?",
      ],
      mistakes:[
        "Treating a warm contact like a cold call — referencing the mutual connection and then immediately pitching",
        "Not following up after a candidate introduction — the introduction is just the opening",
        "Using generic congratulations messages that are clearly automated",
        "Not preparing the conversation before making a warm call — warmth is not an excuse to wing it",
        "Forgetting to ask for introductions after every placement — this is your biggest missed opportunity",
      ],
      scenario:{
        title:"You have just placed a Software Engineer at a FinTech scale-up. How do you use this placement to generate more BD?",
        weak:"Post about the placement on LinkedIn and hope a hiring manager sees it.",
        strong:"Call the candidate at the 30-day mark. Ask how it is going. Then: who else in your network would benefit from speaking to me? And separately, contact the hiring manager: now that [name] is settling in, I wanted to check in and understand your broader hiring plans for the year. Ask for an introduction to the CTO or Head of Product. Ask if there are any contract or SOW needs alongside perm. One placement, done well, should generate 3-5 new conversations."
      }
    },
    {
      title:"Cold Outreach That Works",
      content:"Cold outreach fails almost universally when it is generic. It works when it is specific, relevant, short, and easy to respond to. The goal of a cold message is not to pitch your services. It is to earn the right to a 10-minute conversation. Everything else follows from there.",
      tactics:[
        "Personalise every message — reference something specific about their company or role",
        "Open with insight or value, not a pitch about yourself",
        "Keep messages to 3-4 sentences maximum — every extra sentence reduces reply rate",
        "Always end with a low-commitment ask: worth 10 minutes? rather than would you like to meet?",
        "Follow up 3 times across different channels before moving on — most replies come on the second or third attempt",
        "Test different subject lines and opening hooks — treat outreach like a campaign, not a letter",
        "Voice notes on LinkedIn outperform text messages significantly — use them",
      ],
      phrases:[
        "I saw you are scaling the engineering team. I specialise in this space and have a couple of people you might not find elsewhere.",
        "I am not going to pitch you. I would just like to share what I am seeing in the market and get your thoughts.",
        "I noticed [specific thing about their company]. It made me think there might be a relevant conversation to be had.",
        "I will be brief. I work with similar companies in your space and I think I could add value here. Worth 10 minutes?",
        "I have sent you a couple of messages and not heard back. I will leave it here. If the timing ever changes, I hope you will reach out.",
        "I know this is a cold message. I will make it worth your while. Here is what I know about hiring in your space right now...",
      ],
      mistakes:[
        "Opening with 'I hope this message finds you well' — it signals a template and gets ignored",
        "Writing 4+ paragraphs about your company — the reader will not get to the ask",
        "Following up with 'just checking in' — add value on every follow-up",
        "Giving up after one attempt — most positive replies come on the second or third touch",
        "Asking for a full meeting on the first message — make the first ask as easy as possible",
      ],
      scenario:{
        title:"You want to reach a VP of Engineering at a Series C FinTech company who you have no connection to. Write your approach.",
        weak:"Hi [name], I hope you are well. I am a recruiter at Stott and May and we specialise in technology recruitment. I would love to learn more about your hiring plans. Are you free for a 30-minute call?",
        strong:"Hi [name], I noticed [company] just launched [product] — congrats on the growth. I specialise in engineering hiring for FinTech scale-ups and I am currently working with a couple of senior engineers who would probably not show up on your radar through normal channels. Worth a 10-minute call this week? No pitch, just a conversation."
      }
    },
    {
      title:"Winning on a BD Call",
      content:"The first BD call is not a sales call. It is a listening call. Your goal is to understand their world well enough to be genuinely useful — and to earn the right to a follow-up. The recruiters who win BD calls ask great questions, listen carefully, share one or two relevant insights, and leave with a clear next step. They do not pitch for 20 minutes and then wonder why no one calls back.",
      tactics:[
        "Prepare 3 specific insight points before every call — not generic ones",
        "Set the agenda at the start: I only need 10 minutes, here is what I was hoping to cover",
        "Ask more questions than you answer — aim for 70/30 listening to talking",
        "Share one insight that demonstrates you understand their market, not yourself",
        "Always end with a clear, specific next step — not a vague 'I'll be in touch'",
        "Send a follow-up within the hour while you are still fresh in their mind",
        "Qualify the call: are they a live opportunity, warm pipeline, or not a fit?",
      ],
      phrases:[
        "I only need 10 minutes. If there is no value in it for you, I will be the first to say so.",
        "What is the biggest hiring challenge you are facing right now?",
        "What would make you consider working with a new recruitment partner?",
        "Can I be honest with you about what I am seeing in the market? I think it will change how you approach this search.",
        "Before I talk about what we do, can I ask you a couple of questions? I want to make sure I am relevant to you.",
        "What would a successful outcome from this call look like for you?",
        "I am not going to leave without us agreeing on a clear next step, even if that is just a date to speak again.",
      ],
      mistakes:[
        "Pitching your company before you have understood their needs — irrelevant pitches get politely dismissed",
        "Failing to qualify whether there is a live need — not every call will convert immediately",
        "Ending the call with 'I will send you some information' — information is not a next step",
        "Talking too much — the best BD call has the client talking for 70% of it",
        "Not following up — you will be forgotten within 48 hours if you do not",
      ],
      scenario:{
        title:"A warm introduction gets you 15 minutes with a CTO at a defence-tech scale-up. How do you run the call?",
        weak:"Thank them for their time, explain what Stott and May does, list some of your clients, and ask if they have any roles.",
        strong:"Start with: thanks for the time. I know it is 15 minutes so I want to make sure I use it well. Can I ask you a few questions first? Then: what does your engineering hiring look like this year? What has been the hardest profile to find? What has your experience been with recruiters so far? Listen carefully. At the 10-minute mark, share one insight that is relevant to what they have told you. End with: based on what you have told me, I think I can genuinely help with [specific area]. Would it be worth speaking again once I have pulled together a few relevant profiles?"
      }
    },
  ]},
  {id:"control",icon:"🎯",eyebrow:"INFLUENCE",title:"Control in Conversations",subtitle:"Handle objections, steer calls and close",gradient:`linear-gradient(135deg,${B.teal},${B.aqua})`,sections:[
    {
      title:"Handling Objections",
      content:"Objections are not rejections. They are requests for more information, more reassurance, or a different framing. The recruiter who welcomes objections and addresses them confidently wins more than the one who avoids difficult conversations. Learn your 5 most common objections by heart and have a considered response for each one.",
      tactics:[
        "Acknowledge before you respond — never argue or dismiss",
        "Have 3 responses ready for your 5 most common objections",
        "Turn objections into discovery questions: what is driving that concern?",
        "Use social proof: a client in a similar situation found that...",
        "If you cannot answer, say so — and commit to coming back with the answer",
        "Treat an objection as a buying signal — people who are not interested do not object, they end the call",
        "After handling an objection, always check: does that address your concern?",
      ],
      phrases:[
        "I hear that. Can you tell me more about what is driving that concern? I want to make sure I understand it properly.",
        "That is a really common concern at this stage. Here is what I have seen work in similar situations.",
        "That is fair. Can I share a different perspective and you can tell me what you think?",
        "I would rather you raised that now than it became a problem later. Let us address it properly.",
        "I am not going to try to talk you out of that. But can I ask one question first?",
        "What would need to be different for that not to be a concern?",
        "I have heard that before and I understand why. Let me give you a different way of looking at it.",
      ],
      mistakes:[
        "Arguing with the objection — you will win the argument and lose the deal",
        "Capitulating immediately — discounting or over-conceding signals weakness and devalues your service",
        "Moving on without checking the objection is resolved — unresolved objections resurface at the worst moment",
        "Being defensive about your fee — treat it as a conversation about value, not a negotiation about price",
        "Not preparing for objections — the same 5 come up in every client conversation",
      ],
      scenario:{
        title:"A client says: we already have a preferred supplier list and you are not on it. What do you say?",
        weak:"Apologise and ask if there is any way to get on the list.",
        strong:"Acknowledge it: I understand, and I respect that you have an existing process. Can I ask you something though? Is every role on your PSL being filled quickly and to the standard you need? Most clients I work with have a PSL but still have a few roles that their existing suppliers struggle with — usually niche technical profiles or very senior hires. I am not asking to replace your PSL. I am asking for the chance to show what we can do on one role. If we deliver, the conversation about formalising the relationship takes care of itself."
      }
    },
    {
      title:"Steering Conversations",
      content:"The recruiter who controls the agenda controls the outcome. This does not mean being aggressive or pushy. It means being deliberate about where the conversation goes, summarising regularly to confirm alignment, and using questions strategically to move toward the outcome you both want. Silence is your most underused tool.",
      tactics:[
        "Set the agenda at the start of every call — even a brief one",
        "Use open questions to gather intelligence, closed questions to confirm and commit",
        "Start broad, then funnel to specifics",
        "Use silence after an important question — do not fill the gap",
        "Summarise and confirm at every key point: so if I have understood correctly...",
        "If the conversation drifts, redirect with a question: that is useful context. Can I bring us back to...?",
        "Use the mirror technique — repeat the last 2-3 words of what they said to draw out more",
      ],
      phrases:[
        "Let me make sure I have understood this correctly. Is that right?",
        "If I could solve that for you, would you be happy to move forward?",
        "Before we go further, can I just confirm a couple of things?",
        "I am going to summarise where we are. Tell me if I have got anything wrong.",
        "Can I ask a slightly different question? I want to make sure I am addressing the right thing.",
        "Let us step back for a second. I want to make sure we are solving the right problem.",
        "I notice we have been talking about X. Is that actually the most important thing, or is there something else underneath it?",
      ],
      mistakes:[
        "Talking too much — you cannot listen and talk at the same time",
        "Filling silences immediately — give the other person space to think and continue",
        "Not summarising — conversations drift and misunderstandings compound",
        "Asking multiple questions at once — the other person answers the easiest one and ignores the rest",
        "Reacting rather than steering — responding to everything they say without progressing toward an outcome",
      ],
      scenario:{
        title:"A client meeting has drifted into a general conversation about the market. You have 10 minutes left and no next step agreed. What do you do?",
        weak:"Enjoy the conversation and follow up with an email afterward.",
        strong:"Interrupt politely: this has been a really useful conversation. I want to make sure I use the last 10 minutes well. Can I share one specific thing I think we could do for you, and then get your reaction? Then share your pitch — concisely. Then: based on what you have told me, does that feel relevant? If yes: what would the right first step look like? End every meeting with a committed next step, not an open-ended intention."
      }
    },
    {
      title:"Closing Techniques",
      content:"Closing is not a technique you apply at the end of a well-run process — it is a thread that runs through the whole conversation. Every question you ask, every concern you address, every summary you give is moving toward the moment where the other person says yes. If you have done everything right, the close should feel like a natural conclusion, not a pressure point.",
      tactics:[
        "Trial close throughout: how are you feeling about this so far?",
        "Use assumptive language in the final stages: when we move to the next step...",
        "If they hesitate, ask what is holding them back — do not guess",
        "For perm: close on the relationship and the long-term fit",
        "For contract and SOW: close on speed, compliance and commercial certainty",
        "If they say they need to think about it, ask: what would help you decide?",
        "Always end with a clear agreed next step, even if the answer is not yet",
      ],
      phrases:[
        "Based on everything we have discussed, does this feel like the right move for you?",
        "What would need to be true for you to say yes to this?",
        "I would love to put you forward. Are you happy for me to do that?",
        "It sounds like we are aligned. Shall we agree next steps now?",
        "I am not going to pressure you. But I do want to understand what is holding you back, because I might be able to help.",
        "What is the last thing you need before you can commit to this?",
        "If we can resolve [concern], are you ready to move?",
      ],
      mistakes:[
        "Waiting until the end to close — by then objections have had time to grow",
        "Making assumptions about yes without confirming — verbal agreement is not a signed contract",
        "Accepting need to think about it without exploring what needs to change",
        "Closing too hard and too early — you push people away when you close before they are ready",
        "Not confirming next steps in writing — verbal commitments evaporate",
      ],
      scenario:{
        title:"A candidate has been through 2 interviews, the client wants to make an offer, but the candidate says they need a few days to think about it. What do you do?",
        weak:"Give them the time and check in on Friday.",
        strong:"Do not wait. Call them immediately and ask what is on their mind. Do not accept the generic 'I just need to think about it.' Ask: is it the role, the salary, the company, or something else? Identify the specific concern. Address it directly. Then ask: if we could resolve that, would you be ready to move forward? A candidate who asks for time without a specific reason is usually either wavering on commitment, expecting a counter-offer, or has another process running. Find out which one it is tonight, not on Friday."
      }
    },
  ]},
  {id:"interview",icon:"🎤",eyebrow:"PREPARATION",title:"Interview Coaching",subtitle:"Prepare candidates to perform at their best",gradient:`linear-gradient(135deg,${B.teal},${B.aqua})`,sections:[
    {
      title:"The Pre-Interview Brief",
      content:"The pre-interview brief is your single biggest lever for improving interview performance. A consultant who briefs well places more people. It is that simple. The brief is not about telling the candidate what to say — it is about making sure they walk in informed, prepared, and confident enough to be themselves.",
      tactics:[
        "Run a proper 20-minute call — never just send a message or email",
        "Research the interviewer on LinkedIn and share specific findings",
        "Explain the interview format, style and likely question types",
        "Brief on company culture, recent news, and strategic priorities",
        "Agree on the salary position before the interview, not after",
        "Prepare 3 smart questions for the candidate to ask",
        "Send a brief summary message after the call so they have a reference for the night before",
      ],
      phrases:[
        "Let me give you a proper prep call. 20 minutes will make a real difference.",
        "I have looked at the interviewer's LinkedIn. They have been focused on [topic] recently. It is worth having a view on it.",
        "The client is very values-led. Make sure you demonstrate cultural alignment, not just technical skills.",
        "Do not go in trying to be what you think they want. Be yourself. I have told them why you are great.",
        "Here are the 3 things the interviewer cares about most. Make sure each one comes up naturally.",
        "If they ask something you do not know, it is okay to say so. What you say next matters more than the answer.",
      ],
      mistakes:[
        "Sending the job spec with a 'good luck' message — this is not preparation",
        "Not researching the interviewer — this is a missed opportunity every time",
        "Over-scripting the candidate — they sound rehearsed and unnatural",
        "Forgetting to agree on salary positioning before the interview",
        "Not following up within 2 hours of the interview — the debrief call is as valuable as the prep call",
      ],
      scenario:{
        title:"Your candidate has a technical interview at a Series B SaaS company tomorrow. The interviewer is the Head of Engineering. What does your prep call cover?",
        weak:"Tell them to brush up on their technical skills and be themselves.",
        strong:"Look up the Head of Engineering on LinkedIn before the call. Note their background and any recent posts. In the prep call: share what you know about the interviewer. Explain the format — is it live coding, system design, or competency? Remind them of the 3 things the client cares about. Run through their answer to the hardest likely technical question. Agree on what to say if salary comes up. Give them 3 smart questions to ask. Then tomorrow morning, send a short message with the key points and wish them luck."
      }
    },
    {
      title:"Post-Interview Debrief",
      content:"The debrief call is one of the most important touchpoints in the recruitment process and one of the most neglected. Call within 2 hours. Not tomorrow morning. Not by message. Call. The candidate's reaction is still fresh, their emotions are running, and if something has shifted — enthusiasm, concern, a competing offer — you need to know about it now.",
      tactics:[
        "Call within 2 hours of the interview ending — not the next day",
        "Ask open questions first — do not lead with your assumptions",
        "Listen for hesitation — it tells you more than what they say",
        "If they loved it, reinforce their excitement and build momentum toward offer stage",
        "If it went badly, find out exactly what happened before you speak to the client",
        "Ask: what would make you turn this down if an offer came through?",
        "Always end with: what is your gut telling you?",
      ],
      phrases:[
        "How did it go? What was your gut feeling walking out?",
        "What question did you find hardest, and how do you think you answered it?",
        "On a scale of 1-10, how much do you want this role after meeting the team?",
        "Did anything surprise you — either positively or negatively?",
        "How did you get on with the interviewer? Did it feel like a good connection?",
        "What would make you turn this down if an offer came through?",
        "Is there anything you wish you had said differently?",
      ],
      mistakes:[
        "Leaving the debrief until the next day — enthusiasm fades and concerns solidify overnight",
        "Asking are you still keen? instead of open questions — you will get a yes regardless",
        "Not asking what they did not like — the positive feedback is easy, the concerns are what matter",
        "Sharing the client's feedback before hearing the candidate's reaction — you bias their response",
        "Not flagging wavering candidates to the client — surprises at offer stage are avoidable",
      ],
      scenario:{
        title:"You call a candidate 2 hours after their final interview. They say it went well but they seem flat. What do you do?",
        weak:"Take their word for it and report back to the client that the interview went well.",
        strong:"Do not move on. Something has shifted. Ask: you seem a little quieter than I expected. Is everything okay? Give them space to answer. It might be that they met someone on the team they did not connect with. It might be that the role description changed in the final interview. It might be that they have another offer coming. You will not know until you ask. Address it now — not when the offer is on the table."
      }
    },
  ]},
  {id:"offer",icon:"✅",eyebrow:"CLOSING",title:"Offer Management and Closing",subtitle:"Get to yes and make it stick",gradient:`linear-gradient(135deg,${B.teal},#44B3F4)`,sections:[
    {
      title:"Setting Up the Offer",
      content:"The best offer processes have no surprises. By the time the offer lands, both parties already know it is going to be accepted. Getting there requires deliberate groundwork: you need to know the candidate's walk-away position, the client's ceiling, and every potential objection before a number is discussed. Offers that fall over at this stage are almost always the result of skipped conversations earlier in the process.",
      tactics:[
        "Run a verbal offer check before the client makes anything formal",
        "Confirm the full package — not just base salary — before the conversation",
        "Know the candidate's minimum acceptable number before you go back to the client",
        "Never let the client make an offer directly without going through you",
        "For perm: address notice period, start date and any counter-offer risk before the offer",
        "For contract: confirm payment method, umbrella or limited company, and start date logistics",
        "Frame the offer positively when you deliver it — your tone sets their tone",
      ],
      phrases:[
        "Before we get to formal offer stage, let me just check — if the client comes back at this number, where are you?",
        "Let me speak to the client first. I want to make sure the offer lands well.",
        "I am going to go back to the client. Is there anything I should be fighting for on your behalf?",
        "What does the full package need to look like for this to be a yes? Not just salary — everything.",
        "If I get you what you have told me you need, will you accept? I need to know before I go back to them.",
        "I want this to be a clean close. Is there anything that might complicate it that I should know about?",
      ],
      mistakes:[
        "Letting the client call the candidate directly — you lose control of the conversation",
        "Not knowing the candidate's walk-away position before the offer is made",
        "Delivering an offer with uncertainty in your voice — it makes the candidate uncertain too",
        "Failing to confirm the full package — salary is not the whole offer",
        "Not having the counter-offer conversation before offer stage",
      ],
      scenario:{
        title:"The client is ready to make an offer of 85k to your candidate who said they wanted 90k. What do you do?",
        weak:"Deliver the offer and hope the candidate accepts it.",
        strong:"Before delivering the offer, go back to the client. The candidate's expectation is 90k. Is there any flex? Explore every lever: base, bonus, equity, review date, remote working. If the client can get to 88k with a 6-month review, that might be enough. If they genuinely cannot move, call the candidate before the formal offer and have an honest conversation: the client has come in at 85k. I want to talk through how you are feeling about that before it becomes formal. Address the gap directly. Do not deliver an offer you already know will be declined."
      }
    },
    {
      title:"Handling Counter-Offers",
      content:"Counter-offers are one of the most predictable risks in permanent recruitment and yet they still catch recruiters off guard. The defence is simple: have the conversation early, not at the point of resignation. A candidate who has thought through the counter-offer scenario in advance is far better equipped to handle it when it arrives.",
      tactics:[
        "Have the counter-offer conversation at initial screening — not at offer stage",
        "Ask explicitly: what would your employer do if you resigned? What would you do?",
        "Help the candidate think through the real consequences of accepting",
        "Remind them that counter-offers address salary, not the underlying reasons they wanted to leave",
        "For contractors: remind them that leaving a contract early has reputational and financial consequences",
        "If a counter-offer arrives, give them space — but have facts ready",
        "Follow up within 24 hours if they are considering it — not 48",
      ],
      phrases:[
        "If your employer makes you a counter-offer, what will you do? Let us think through that now.",
        "Counter-offers are usually reactive. They rarely change the underlying reason you wanted to move.",
        "I am not going to pressure you. But let us talk through what has really changed if they match the salary.",
        "Ask yourself: if they could have paid you more, why did they not before you handed in your notice?",
        "If the counter-offer addresses everything that made you want to leave, take it. But if it does not — what then?",
        "I have seen people take counter-offers and be back on the market 6 months later. Let us make sure you are thinking this through.",
      ],
      mistakes:[
        "Avoiding the counter-offer conversation because it feels like planting a negative idea",
        "Panicking when a counter-offer arrives and saying the wrong thing",
        "Giving the candidate too much time to decide — uncertainty breeds doubt",
        "Not understanding what the candidate values beyond salary — you need to know what would actually make them stay",
        "Taking the counter-offer personally — focus on helping the candidate make the right decision",
      ],
      scenario:{
        title:"Your candidate calls you at 6pm to say their employer has matched the offer and offered a promotion. They are tempted. What do you do?",
        weak:"Tell them they should not take the counter-offer and remind them why they wanted to leave.",
        strong:"Do not tell them what to do. Ask questions. Remind them of the specific reasons they said they wanted to move: you told me the real issue was [X]. Does a salary increase and a new title change that? Give them time to answer. Then: if those things have genuinely been resolved and you believe the company has changed, you should seriously consider it. But if the fundamental issues are still there, the counter-offer is just buying them time. What does your gut say? Help them reach their own conclusion — a candidate who makes their own decision is far less likely to reverse it."
      }
    },
  ]},
  {id:"negotiation",icon:"⚖️",eyebrow:"COMMERCIAL",title:"Negotiation Skills",subtitle:"Create better outcomes for everyone",gradient:`linear-gradient(135deg,${B.teal},#44B3F4)`,sections:[
    {
      title:"Negotiation Principles",
      content:"Good negotiation is not about extracting the maximum from the other side. It is about creating an outcome that both parties feel good about — because sustainable relationships are built on fair deals. In recruitment, you need both the client and the candidate to feel they got a fair outcome, or the relationship breaks down and so does your reputation.",
      tactics:[
        "Prepare your position, ideal outcome, and walk-away before any negotiation",
        "Never make the first move without knowing the other party's constraints",
        "Seek to understand before you seek to be understood",
        "Trade concessions — never give anything away for free",
        "Always have a BATNA: Best Alternative To a Negotiated Agreement",
        "Slow down when pressure increases — urgency is your enemy",
        "Document everything agreed as you go to prevent misunderstandings",
      ],
      phrases:[
        "Before we talk numbers, help me understand what constraints you are working within.",
        "I am not here to squeeze the last pound out of this. I want a deal that works for everyone.",
        "If we can agree on X, I can move on Y. How does that feel?",
        "What does a win look like for you here? I want to make sure we both leave satisfied.",
        "I want to be transparent about where I am coming from. Here is my position and here is why.",
        "What is the one thing you absolutely cannot move on? If I know that, I can work around it.",
      ],
      mistakes:[
        "Making the first concession too early — it signals you have more room to give",
        "Negotiating by email — you lose tone, context and the ability to read reactions",
        "Making concessions under emotional pressure — always ask for time",
        "Treating every negotiation as a zero-sum game — you need the relationship to survive the deal",
        "Not knowing your walk-away point before you start",
      ],
      scenario:{
        title:"A client pushes back on your fee. They say your competitor is offering 15%. You are at 18%. What do you do?",
        weak:"Offer to match 15% to avoid losing the business.",
        strong:"Do not discount immediately. Ask: what is your biggest concern — the percentage, or the total cost? Understand the objection before you respond. Then: I am at 18% because of X. Here is what that buys you that a 15% agency will not deliver. If they still push: I can look at the fee structure, but I would want something in return — exclusivity, or a multi-role agreement, or a retained element. If you are going to move, get something of value back. A discounted fee with nothing in return tells the client your original fee was not justified."
      }
    },
    {
      title:"Negotiating with Candidates",
      content:"Negotiating with candidates requires a completely different approach to negotiating with clients. Candidates are making emotional, life-affecting decisions. Your role is not to push them into a number — it is to help them understand the full value of the opportunity and to reach a decision they feel genuinely good about. A candidate who accepts under pressure will resent it.",
      tactics:[
        "Never pressure a candidate — it destroys trust and almost always backfires",
        "Help them understand the full package value, not just the base salary",
        "If they are stuck on a number, explore what is underneath it",
        "Understand what they would lose by not making this move",
        "For contract: explore payment method and IR35 treatment before rate",
        "Use time pressure carefully — only when it is real, and only once",
        "Always frame the negotiation as making this work for them",
      ],
      phrases:[
        "I hear you on the salary. Help me understand what is driving that number.",
        "I want you to feel great about this decision. What would need to change for that to be true?",
        "Is there a package structure that would make this work even if the base does not move?",
        "Let us separate the salary from the total package. When you look at everything, how does it feel?",
        "What is the minimum you would accept and still feel it was the right move? Be honest with me.",
        "I want to fight for you. But I need to know what is worth fighting for.",
        "If the number does not move, is there anything else that would make this a yes?",
      ],
      mistakes:[
        "Telling a candidate what they should want — your job is to understand what they do want",
        "Minimising their concerns about salary — if it matters to them it matters",
        "Applying pressure by emphasising how much the client wants them — it backfires when they realise it gave them leverage",
        "Not exploring non-salary levers — title, remote, review date, bonus structure",
        "Closing too quickly before the candidate has fully processed the offer",
      ],
      scenario:{
        title:"Your candidate has received an offer of 75k. They wanted 80k. They are genuinely excited but feel they need to push back. What do you do?",
        weak:"Go back to the client and ask for 80k.",
        strong:"Before you go anywhere, ask the candidate: if the client absolutely cannot move on salary, would you still take this role? You need to know the answer before you negotiate. If yes, you have room to work with. If no, you need to know that too. Then go to the client: the candidate is very excited. There is a small gap on salary. Is there any flex? Explore every lever — bonus, equity, review at 6 months, remote days. Come back with the best package you can get, not just a number. And if the gap genuinely cannot be closed, be honest with both sides."
      }
    },
  ]},
  {id:"sales",icon:"🧩",eyebrow:"METHODOLOGY",title:"Sales Methodologies",subtitle:"MEDDPICC, BANT, SPIN and GAP applied to recruitment",gradient:`linear-gradient(135deg,${B.teal},#44B3F4)`,sections:[
    {
      title:"MEDDPICC — Qualifying and Winning Complex Deals",
      content:"MEDDPICC is the gold standard for qualifying complex deals. In recruitment it helps you separate the roles worth working from the ones that will drain your time. Work through every letter before committing serious resource — especially for senior searches, retained work, or large contract engagements.",
      tactics:[
        "M — Metrics: What does a successful hire look like in 12 months? How will they measure it?",
        "E — Economic Buyer: Who actually approves the hire? HR is often not the final decision-maker",
        "D — Decision Criteria: What are they evaluating candidates and agencies on?",
        "D — Decision Process: How many interview stages? Who is involved at each step? What is the timeline?",
        "P — Paper Process: For SOW and contract — what does contracting and onboarding look like?",
        "I — Identify Pain: What is the cost of NOT filling this role? What problem does it solve?",
        "C — Champion: Who inside the client is fighting for this hire to happen — and for you to win?",
        "C — Competition: Who else are they talking to? Other agencies, direct sourcing, internal candidates?",
      ],
      phrases:[
        "How will you measure whether this hire has been successful in 12 months? (Metrics)",
        "Who has the final sign-off on the hire — is that you, or does it go above you? (Economic Buyer)",
        "What would make you choose one recruiter over another for this search? (Decision Criteria)",
        "Walk me through the process from shortlist to offer — who is involved at each stage? (Decision Process)",
        "What is the impact on the business if this role is not filled in the next 3 months? (Identify Pain)",
        "Who internally is most invested in getting this right? (Champion)",
        "Are you working with other agencies on this? (Competition)",
      ],
      mistakes:[
        "Working a role without confirming budget — you can spend weeks sourcing for a role that was never approved",
        "Assuming the HR contact is the decision-maker — find the Economic Buyer early",
        "Skipping the Pain question — without understanding urgency, you cannot create momentum",
        "Not identifying a champion — a role with no internal advocate rarely closes",
        "Ignoring the competition — knowing who else is involved helps you position your approach",
      ],
      scenario:{
        title:"A new client contacts you about a Head of Product role. They want CVs by end of week. How do you apply MEDDPICC?",
        weak:"Start sourcing immediately to show responsiveness.",
        strong:"Before sending a single CV, qualify the opportunity. On a call: How will you measure whether this hire is successful? Who ultimately makes the final decision on this? What is your interview process and timeline? What is the cost to the business if this role is not filled in the next quarter? Who internally is most invested in getting this right? Are you working with any other agencies? Once you have the answers, you know whether this is worth working — and how to win it."
      }
    },
    {
      title:"SPIN Selling — Uncovering Pain and Creating Urgency",
      content:"SPIN works because it lets the client or candidate sell themselves on the need. You are not pitching a solution — you are asking questions that help them realise the cost of the current situation and the value of changing it. The Implication questions are the most powerful and the most underused.",
      tactics:[
        "S — Situation: Understand the current state before anything else",
        "P — Problem: What is not working? What is the source of frustration or difficulty?",
        "I — Implication: What are the consequences of the problem not being solved? This is where urgency is created",
        "N — Need-Payoff: Help them articulate the value of solving it — in their words, not yours",
        "Do not rush to solutions — let the implications land before you propose anything",
        "Implication questions work on candidates too: what happens to your career if you stay another 2 years?",
        "Use silence after an implication question — let them sit with the consequence",
      ],
      phrases:[
        "Tell me about the team as it stands. How did this gap come about? (Situation)",
        "What is the impact on the team of having this role vacant right now? (Problem)",
        "If this is not filled in the next 6 weeks, what happens to the project timeline? (Implication)",
        "When you imagine having the right person in this seat, what does that change for you? (Need-Payoff)",
        "So if I understand correctly — the longer this stays open, the more pressure it puts on [X]. Is that right?",
        "What is this vacancy costing you in time and energy every week it is not filled?",
        "What would it mean for the team if we got this right quickly? (Need-Payoff)",
      ],
      mistakes:[
        "Jumping to the solution before the implication has landed",
        "Using SPIN as an interrogation rather than a conversation",
        "Skipping Situation questions and going straight to Problem — you miss important context",
        "Not asking Need-Payoff questions — these are what make the client commit to action",
        "Forgetting that SPIN works on candidates too, not just clients",
      ],
      scenario:{
        title:"A client says they are not in a rush to fill the role. They want to be thorough. How do you use SPIN?",
        weak:"Respect their timeline and start a long process.",
        strong:"Explore the Implication. Ask: what is the team managing in the meantime? Who is covering the responsibilities? What is that costing in overtime, quality, or missed deadlines? What happens to the delivery plan if this role is still open in 3 months? Let them tell you the cost. Do not tell them. Once they have articulated the consequence of delay in their own words, the urgency often emerges naturally. Then: so if we could find the right person in 3 weeks rather than 3 months, what would that be worth to the team?"
      }
    },
    {
      title:"GAP Selling — Bridging Current to Future State",
      content:"GAP Selling is built on one insight: people buy to close a gap between where they are and where they want to be. In recruitment, your job is to make that gap vivid — to help the client or candidate feel the distance between their current situation and the outcome they want. The bigger the gap you surface, the more motivated they are to act.",
      tactics:[
        "Current State: Understand exactly where they are — the pain, the risk, the frustration",
        "Future State: Help them articulate where they want to be — in specific, tangible terms",
        "The Gap: Make the distance between the two states feel real and costly",
        "Your Solution: Position your approach as the bridge that closes the gap",
        "Use with hesitant candidates: make the current state uncomfortable and the future state compelling",
        "Use with slow clients: make the cost of the gap explicit and urgent",
        "The bigger and more specific the gap, the more motivated they are to act",
      ],
      phrases:[
        "Help me understand where things stand today. What is the biggest challenge you are navigating? (Current State)",
        "If everything went perfectly, what would the team look like in 12 months? (Future State)",
        "What is stopping you from getting there right now? (The Gap)",
        "So the gap between where you are and where you want to be is essentially [summary]. Does that feel right?",
        "What is the cost — in time, money, or risk — of that gap staying open?",
        "You have told me you want X, but right now you have Y. That gap is exactly what I help people close.",
        "Here is how I think we close that gap. Let me show you what that looks like in practice.",
      ],
      mistakes:[
        "Describing the gap in your own words instead of theirs — it must come from them to be powerful",
        "Moving to solution before the gap is fully felt",
        "Defining the future state too vaguely — make it specific and tangible",
        "Not connecting your solution directly to the gap — the link must be explicit",
        "Rushing the process — GAP Selling requires patience",
      ],
      scenario:{
        title:"A candidate says they are fairly happy in their current role but open to new opportunities. How do you use GAP Selling?",
        weak:"Pitch the opportunity and hope it is exciting enough.",
        strong:"Start with Current State: tell me what your current role looks like day to day. What do you enjoy and what are you finding less fulfilling? Then Future State: if you could design the perfect role for the next 3 years, what would it include? Then surface the Gap: it sounds like what you have today is X, but what you really want is Y. Is that fair? Once they confirm the gap, you can position the opportunity as the bridge: the role I am working on addresses exactly that gap. Want me to walk you through it?"
      }
    },
  ]},
  {id:"psychology",icon:"🧠",eyebrow:"PSYCHOLOGY",title:"Psychology of Sales",subtitle:"Buying signals, behavioural traits and influence principles",gradient:`linear-gradient(135deg,${B.teal},${B.aqua})`,sections:[
    {
      title:"Why Psychology Matters in Recruitment",
      content:"Recruitment is fundamentally a human business. People do not make decisions purely on logic. They make them on emotion and justify with logic afterward. Understanding the psychological drivers behind a decision — fear, status, belonging, certainty, excitement — gives you the ability to influence outcomes ethically and effectively. This is not manipulation. It is empathy applied with precision.",
      tactics:[
        "Every candidate and client has a dominant motivation — find it and speak to it",
        "People buy feelings, not facts: safety, excitement, status, belonging, certainty",
        "The brain resists change — your job is to make the status quo feel more uncomfortable than the move",
        "Decisions are emotional first, rational second — address the emotion before the logic",
        "Trust is the foundation of all influence — without it, no technique works",
        "Listen for the feeling behind the words, not just the words themselves",
        "Mirror language and pacing to build unconscious rapport",
      ],
      phrases:[
        "I want to understand what really matters to you here. Not just the job spec, but what would make this feel right.",
        "What would make you look back on this decision in a year and feel like it was the right call?",
        "Sometimes people know what they want but struggle to articulate it. Let me ask you a few questions and see if we can get there together.",
        "What feeling are you looking for in your next role? Not the job title — the feeling.",
        "What would need to be true for this to feel like a no-brainer?",
      ],
      mistakes:[
        "Treating every conversation as a transaction — people disengage when they feel processed",
        "Responding to the surface answer without exploring the emotional driver underneath",
        "Using psychological techniques without genuine empathy — people sense inauthenticity immediately",
        "Ignoring body language and vocal cues on video and phone calls",
        "Assuming your values and priorities map onto the other person's",
      ],
      scenario:{
        title:"A senior candidate seems enthusiastic but keeps delaying. They accept every interview but always find a reason to pause at offer stage. What is going on and what do you do?",
        weak:"Keep pushing the process forward and hope they eventually commit.",
        strong:"Stop and have a direct conversation. Something is blocking them — it is almost always fear. Are they afraid of leaving a company where they have status and security? Are they worried about failing in a new environment? Is the decision really about a family conversation that has not happened yet? Ask directly: I have noticed you engage fully with the process and then pause at the decision point. Help me understand what is going on for you. Whatever you say, I am going to try to help you think through it honestly. Then address the underlying fear, not the surface objection."
      }
    },
    {
      title:"Reading Buying Signals",
      content:"Buying signals are moments where a candidate or client signals readiness to move forward — often without realising it. The recruiter who spots these signals can accelerate the process at exactly the right moment. Missing them means leaving momentum on the table.",
      tactics:[
        "Verbal signals: increased question frequency, asking about start dates, timelines, or next steps",
        "Language shift: moving from if to when — when I join rather than if I joined",
        "Engagement depth: they start volunteering information you did not ask for",
        "Competitive curiosity: asking how you compare to other recruiters or agencies",
        "For candidates: asking about the team, culture or manager's style — they are imagining themselves there",
        "For clients: asking about your process, database or recent placements",
        "Urgency signals: unprompted references to their current frustrations or pain",
      ],
      phrases:[
        "You mentioned when I start — it sounds like you are feeling positive about this. Is that fair to say?",
        "You have asked a lot of great questions. What is your gut feeling telling you at this point?",
        "It sounds like you are ready to move forward. Shall we talk about next steps?",
        "I am picking up that this is feeling right for you. What would make you 100% sure?",
        "I notice you have moved from if to when. I think that tells us something. Am I reading that right?",
        "Your energy has shifted since we started talking. Is this resonating more than you expected?",
      ],
      mistakes:[
        "Missing the signal and continuing to sell when the person is already ready to buy",
        "Ignoring language shifts — if to when is one of the most reliable buying signals there is",
        "Not acting on a buying signal — the moment passes quickly",
        "Over-reading signals and closing too early before genuine commitment",
        "Failing to recognise negative signals — disengagement, shorter answers, delayed responses",
      ],
      scenario:{
        title:"You are on a call with a client about a new role. They have not committed to working with you yet, but they start asking how quickly you can have CVs ready and what your process is for managing the interview schedule. What do you do?",
        weak:"Answer their questions and continue the conversation.",
        strong:"Recognise the buying signal. They are already thinking about working with you — they are just not ready to say it out loud. Shift gear: it sounds like you are ready to move on this. If I can get a strong shortlist to you by [specific date], would that work? Do not ask if they want to work with you — assume it and confirm the logistics. Most clients will not say yes until they feel they have made the decision themselves. Your job is to make the next step feel easy and natural."
      }
    },
    {
      title:"The Six Principles of Influence (Cialdini)",
      content:"Robert Cialdini's six principles of influence are the most evidence-based framework for ethical persuasion in existence. Every great recruiter uses them instinctively — understanding them consciously makes you far more effective. Used with integrity they build better relationships. Misused they destroy them.",
      tactics:[
        "Reciprocity: give value first — market insight, salary data, candidate feedback — before asking for anything",
        "Commitment and Consistency: get small yeses early — they pave the way for the big yes at offer stage",
        "Social Proof: other candidates in your position have found this works well — normalise the decision",
        "Authority: demonstrate expertise — market knowledge, sector insight, track record — before pitching",
        "Liking: people buy from people they like — invest in rapport before you invest in persuasion",
        "Scarcity: this candidate has two other processes — create urgency without manufacturing pressure",
        "Unity (7th principle): shared identity builds trust — we both want the same outcome here",
      ],
      phrases:[
        "I have put together some market data for you. No strings, I just thought it would be useful. (Reciprocity)",
        "You mentioned earlier that career progression was your priority. This role ticks that box exactly. You said it yourself. (Commitment)",
        "Three other senior engineers I have placed in the last year made a very similar move. Here is how it went for them. (Social Proof)",
        "I have placed 14 people in this specialism in the last 18 months — here is what I am seeing. (Authority)",
        "I want to be straight with you — this candidate is interviewing with two other companies this week. (Scarcity)",
        "We both want the same thing here — the right person in the right role. Let us figure out how to make that happen. (Unity)",
      ],
      mistakes:[
        "Using scarcity dishonestly — fabricating competing offers or urgency destroys trust permanently",
        "Skipping reciprocity and going straight to the ask — you earn the right to ask by giving first",
        "Applying authority through ego rather than insight — talking about yourself rather than their market",
        "Ignoring the liking principle — people do not buy from people they do not connect with",
        "Overusing social proof — it becomes generic if every situation is compared to someone else",
      ],
      scenario:{
        title:"You are trying to convert a warm lead into a first meeting. They are politely interested but non-committal. How do you apply Cialdini?",
        weak:"Send them more information about Stott and May and follow up next week.",
        strong:"Reciprocity first: send them something valuable before you ask for anything — a salary benchmark, a market insight, a relevant article. Reference it when you follow up: I sent you that benchmark on DevOps salaries last week. I have been thinking about your situation since and I have a couple of observations I think would be useful to share. Liking: make the conversation about them, not about you. Authority: reference a specific recent placement in their space. Scarcity: I am working with a couple of engineers in your space right now who are looking at their options. It might be worth a 15-minute call before they make decisions."
      }
    },
    {
      title:"Behavioural Traits — Reading the Room",
      content:"People communicate differently, make decisions differently, and need different things from you. DISC (Dominant, Influential, Steady, Conscientious) is a simple framework for adapting your style to the person in front of you. Getting this right transforms your conversations. You are not changing your message — you are changing how you deliver it.",
      tactics:[
        "D — Dominant: direct, results-focused, impatient. Get to the point fast. Lead with outcomes, not process.",
        "I — Influential: people-oriented, enthusiastic, relationship-driven. Build rapport first. They buy from people they like.",
        "S — Steady: calm, loyal, resistant to change, needs reassurance. Be patient. Acknowledge their concerns fully.",
        "C — Conscientious: analytical, detail-oriented, risk-averse. Bring data. Answer every question thoroughly.",
        "Most people are a blend — watch for dominant traits in how they communicate",
        "Mirror their energy and pace — fast talkers want fast answers, methodical people want depth",
        "Adapt your pitch style, not your integrity — flexibility is a strength",
      ],
      phrases:[
        "I will keep this brief — here are the three things that matter most about this opportunity. (For D types)",
        "Before I go into the details, tell me a bit about yourself. I would love to understand what you are looking for. (For I types)",
        "I completely understand this is a big decision. Let us take it one step at a time. (For S types)",
        "Let me send you the full brief, the company overview, and the interview process so you have everything in front of you. (For C types)",
        "How do you prefer to make decisions like this — quickly when something feels right, or do you prefer to weigh everything up first?",
        "I can tell you like the detail. Let me walk you through the numbers properly. (For C types)",
        "Bottom line: this is a strong opportunity and I think you are the right fit. I can fill in the detail if it is useful. (For D types)",
      ],
      mistakes:[
        "Using the same communication style with everyone — it works for some and alienates others",
        "Giving a D-type a 20-minute pitch — they made their decision in the first 2 minutes",
        "Giving a C-type a high-energy sales pitch without evidence — they will not trust you",
        "Rushing an S-type through a decision — they will resist and then quietly disengage",
        "Not picking up on signals that your style is not landing — be flexible enough to switch mid-conversation",
      ],
      scenario:{
        title:"You are on a video call with a potential new client. Within 2 minutes they have interrupted you twice, answered their own questions, and glanced at another screen. What type are they and how do you adapt?",
        weak:"Continue your prepared pitch and hope they come back to the conversation.",
        strong:"They are a D-type. Stop pitching. Match their pace. Get direct: I am going to cut to the chase. The reason I wanted to speak to you specifically is [one sentence]. The one thing I can do that your current suppliers probably cannot is [one thing]. Can I ask you one question? What is your single biggest hiring challenge right now? Let them talk. D-types respect directness and get frustrated by process. Give them outcomes, not stories. End with: I do not need 30 minutes. Give me 2 weeks and one role to prove it."
      }
    },
  ]},
  {id:"time",icon:"⏱️",eyebrow:"PRODUCTIVITY",title:"Time and Desk Management",subtitle:"Do more of what matters, less of what does not",gradient:`linear-gradient(135deg,${B.teal},${B.aqua})`,sections:[
    {
      title:"Structuring Your Day",
      content:"The best recruiters are ruthlessly structured. They know which activities generate revenue and they protect time for those activities first. Admin, email, and reactive tasks expand to fill whatever time you give them. The consultant who blocks time for proactive outreach every morning will outbill the reactive one every single month.",
      tactics:[
        "Block the first hour for proactive outreach before email and admin take over",
        "Batch admin tasks — do not let them interrupt your peak hours",
        "Identify your top 3 actions each morning before you open email",
        "Protect BD time in your diary like a client meeting — it never gets cancelled",
        "Review your day at 5pm: what moved forward, what did not, and why",
        "Schedule your highest-energy tasks for when you are naturally most alert",
        "Say no to meetings that do not have a clear purpose or outcome",
      ],
      phrases:[
        "My mornings are for outreach and calls. Admin gets done in the afternoon when my energy is lower.",
        "I block BD time in my diary like it is a client meeting. It never gets moved.",
        "Before I open email, I decide what the 3 most important things I need to do today are.",
        "If a meeting does not have a clear outcome defined, I ask for one before I accept it.",
        "I do not check email first thing. I start with my most important call of the day.",
      ],
      mistakes:[
        "Starting the day with email — you are immediately reactive rather than proactive",
        "Letting admin expand into your best hours — do it last, not first",
        "Not having a plan for the day — you end up responding to whatever comes in",
        "Accepting every meeting request — not every meeting deserves your time",
        "Confusing activity with productivity — being busy is not the same as being effective",
      ],
      scenario:{
        title:"It is Monday morning. You have 8 live roles, 12 active candidates in processes, and 40 unread emails. What do you do first?",
        weak:"Open the emails and start responding.",
        strong:"Close the email. Before anything else, spend 10 minutes planning. RAG rate your 8 roles: which 3 are most likely to close this week? Check which of your 12 candidates have interviews or outstanding actions today. Write your 3 most important actions for the day. Only then open email — and process it in a batch rather than responding to each one as it arrives. The emails will still be there in an hour. The momentum you build in the first hour of the day is harder to recover."
      }
    },
    {
      title:"Managing Your Pipeline",
      content:"A well-managed pipeline is the difference between a consistent biller and a feast-or-famine recruiter. You need visibility of every active process at every stage — and a clear plan for what you need to do to move each one forward. If a process has not moved in 2 weeks and you do not know why, that is a problem.",
      tactics:[
        "Update your CRM daily — if it is not in the system it does not exist",
        "Review your full pipeline every Monday morning with a critical eye",
        "Identify where processes are stalling and intervene early",
        "Have a 30-day, 60-day and 90-day view of your pipeline at all times",
        "Know your conversion rates at each stage — data drives better decisions",
        "Colour-code or flag stuck processes so they cannot be ignored",
        "Have an honest conversation with clients or candidates when a process has stalled",
      ],
      phrases:[
        "I review my pipeline every Monday. I want to know where everything is and what I need to do to move it forward.",
        "If a role has not moved in 2 weeks, I ask why. Inertia is the enemy.",
        "I treat my pipeline like a living thing. It needs attention or it dies.",
        "I always know my 30/60/90 day view. That is how I stay consistent and avoid surprises.",
        "What is going to close this month, next month, and the month after? If I cannot answer that, something is wrong.",
      ],
      mistakes:[
        "Not updating your CRM — if it is not recorded, you will forget it",
        "Carrying dead processes without addressing them — they block your view of what is real",
        "Not knowing your conversion rates — you cannot improve what you do not measure",
        "Reviewing your pipeline only when things go wrong — it should be a weekly discipline",
        "Having too many roles on your desk and spreading yourself too thin",
      ],
      scenario:{
        title:"It is Monday morning and your pipeline review reveals 5 roles that have had no movement in 2 weeks. What do you do?",
        weak:"Make a note to chase them this week.",
        strong:"Pick up the phone today. For each stalled role, call the client: I wanted to check in on [role]. We submitted CVs 2 weeks ago and I want to make sure we are still aligned on timeline and process. If the client has gone quiet, there is a reason — find out what it is. Is the budget on hold? Has the role changed? Are they pursuing an internal candidate? A stalled process is information. Get it. Then decide: is this still worth working, or should you have an honest conversation about pausing it?"
      }
    },
  ]},
  {id:"brand",icon:"💡",eyebrow:"VISIBILITY",title:"Personal Brand and LinkedIn",subtitle:"Build a reputation that brings opportunity to you",gradient:`linear-gradient(135deg,${B.teal},#44B3F4)`,sections:[
    {
      title:"Why Personal Brand Matters in Recruitment",
      content:"In a market full of recruiters, the ones who win are the ones who are known. A strong personal brand means inbound calls, warm conversations, and candidates who ask to work with you specifically — not just any recruiter. Your brand is not what you say about yourself. It is what happens when you are not in the room.",
      tactics:[
        "Define your niche — be the go-to person for one specific market, not a generalist",
        "Consistency beats virality — post regularly rather than occasionally",
        "Your brand should demonstrate expertise, not just activity",
        "Engage with others' content before you expect engagement on yours",
        "Offline reputation matters too — how you treat people follows you",
        "Your brand is built in the moments between placements, not just in the successful ones",
        "Ask yourself: what would someone know about me and my market after reading my LinkedIn for 5 minutes?",
      ],
      phrases:[
        "I want to be the first person people think of when they need a specialism hire.",
        "My goal with LinkedIn is not followers — it is being visible to the right people at the right time.",
        "I post when I have something worth saying, not to fill a quota.",
        "My brand is built on what I know, not on who I am. The expertise comes first.",
        "If someone Googles my name and my niche together, I want to be what comes up.",
      ],
      mistakes:[
        "Treating LinkedIn like a job board — posting roles and nothing else",
        "Posting generic motivational content that has nothing to do with your market",
        "Being inconsistent — posting 10 times in one week and nothing for a month",
        "Building a brand without a niche — a generalist brand is no brand at all",
        "Focusing on followers instead of the right audience",
      ],
      scenario:{
        title:"You want to be known as the go-to recruiter for Data Engineering roles in the UK. What does your personal brand strategy look like?",
        weak:"Post your job roles on LinkedIn and congratulate candidates on their new roles.",
        strong:"Map your content strategy: one post per week sharing insight from the market — salary trends, skills shortages, what hiring managers are asking for. Engage with every Data Engineering leader's content in your feed — add a thoughtful comment, not just a like. Write a monthly post sharing what you are seeing in the market: 5 things I have learned placing Data Engineers this quarter. Connect with every Data Engineering candidate and hiring manager you speak to. Within 6 months, your feed will become a resource people in that community actively follow — and your phone will start ringing."
      }
    },
    {
      title:"Content That Builds Credibility",
      content:"The best recruiter content educates, informs, or entertains — and always demonstrates expertise. Sanitised corporate posts are ignored. Honest, specific, market-driven content gets shared. The posts that perform best are the ones that make someone in your niche think: this person really knows their stuff.",
      tactics:[
        "Share market insight: salary trends, skills shortages, hiring patterns — with real numbers where possible",
        "Post candidate or client stories (with permission) — social proof is your most powerful content",
        "Comment on industry news with an informed point of view — not just sharing without adding value",
        "Behind-the-scenes content builds trust: how you work, what you look for, your process",
        "Aim for 2-3 posts per week — consistency beats frequency",
        "Write the post you wish someone had written when you were starting out in your niche",
        "The best hook is a specific, surprising, or counterintuitive opening line",
      ],
      phrases:[
        "Content idea: What I look for in a [role] CV — and what makes me put it straight on my shortlist.",
        "Content idea: I have placed 12 [roles] in the last year. Here is what the market is telling me.",
        "Content idea: 3 things that are making [specialism] hiring harder right now — and what companies are doing about it.",
        "Content idea: The question I ask every candidate that tells me everything about their motivation.",
        "Content idea: What the best [role] candidates have in common — it is not what you think.",
        "The best content I have ever posted was the most honest. Sanitised posts do not get shared.",
      ],
      mistakes:[
        "Posting the same type of content every time — vary format, topic and tone",
        "Writing for everyone — the more specific your niche, the more valuable your content to that niche",
        "Sharing articles without adding your own insight — curation without commentary adds no value",
        "Making every post about yourself or your placements — it reads like a sales pitch",
        "Giving up after a few posts with low engagement — consistency over months, not weeks",
      ],
      scenario:{
        title:"You want to write a post that performs well in your niche. How do you approach it?",
        weak:"Write about how excited you are to be working on a great new role.",
        strong:"Think about what you have genuinely learned from the market this week. Is there something surprising you have noticed — a salary that has shifted, a skill that is suddenly in demand, a type of candidate that keeps getting overlooked? Write that. Open with the most interesting sentence you can: I have spoken to 40 engineers this month and almost every one of them said the same thing. Then tell them what it was. Add one practical takeaway. Keep it under 200 words. Tag 2-3 relevant people if it is genuinely useful to them. That is a post worth reading."
      }
    },
  ]},
  {id:"onboarding",icon:"🚀",eyebrow:"AFTERCARE",title:"Onboarding and Aftercare",subtitle:"Protect the placement and build loyalty",gradient:`linear-gradient(135deg,${B.teal},${B.aqua})`,sections:[
    {
      title:"Pre-Start Aftercare",
      content:"The period between offer acceptance and start date is statistically the most vulnerable point in a placement. The candidate has handed in their notice, received their counter-offer, and is sitting with no one checking in on them. The client is distracted preparing for the new hire. This is when placements fall over — and it is entirely preventable.",
      tactics:[
        "Check in every week between offer acceptance and start date — minimum",
        "Help the candidate mentally bridge the gap: what they are leaving versus what they are gaining",
        "For perm: introduce the candidate to their future manager or buddy if possible",
        "For contract: confirm all access, equipment and logistics well before day one",
        "Send useful content: team page, company news, what to expect on day one",
        "Watch for warning signs: delayed responses, shorter messages, vague answers",
        "Flag any wobbles to the client early — do not hope they go away",
      ],
      phrases:[
        "Just checking in. How are you feeling about the start date?",
        "Any wobbles? Now is the time to tell me, not on day one.",
        "I have asked the client if they can set up a coffee before you start. It will make day one easier.",
        "Is there anything you need from me before you start? I want to make sure you are set up for success.",
        "I know the wait can feel strange. It is completely normal. Is everything still feeling right?",
      ],
      mistakes:[
        "Disappearing after the offer is accepted — this is when the candidate needs you most",
        "Only checking in the day before the start — too late to address problems",
        "Not watching for communication changes — a candidate who stops responding enthusiastically is a risk",
        "Failing to confirm logistics for contract starts — a candidate who cannot access systems on day one will leave",
        "Not telling the client if a candidate is wavering — the client needs time to prepare",
      ],
      scenario:{
        title:"Your permanent candidate accepted an offer 2 weeks ago. They hand in their notice this week. You have not heard from them since they accepted. What do you do?",
        weak:"Wait to hear how the resignation goes.",
        strong:"Call them before they hand in their notice. Ask: how are you feeling about handing in your notice? Have you thought about what you will say if they make a counter-offer? Run through the counter-offer conversation one more time. After they hand in their notice, call the same day. Ask how it went. Listen for hesitation. If their employer made a counter-offer, explore it with them now — not when they have decided to accept it. Check in every week until they start. Be present."
      }
    },
    {
      title:"Turning Placements into Referrals",
      content:"Every successful placement is the beginning of a referral flywheel if you manage it correctly. A placed candidate has trust in you, a new network, and colleagues they could introduce you to. A happy client has colleagues, other hiring managers, and a reference they can give. The 90-day mark is when satisfaction is highest — and when you should be asking.",
      tactics:[
        "Ask for referrals at the 90-day mark — when satisfaction is highest",
        "Make it easy: ask for a specific name, not a general favour",
        "For clients: ask for introductions to other hiring managers by name",
        "For candidates: ask for two names of people in their network who might benefit from speaking to you",
        "Stay in touch annually — a market update or salary benchmark keeps you front of mind",
        "Celebrate placements on LinkedIn — it attracts inbound and signals success",
        "Turn a referral into a thank you — recognise people who send you business",
      ],
      phrases:[
        "You seem really settled. Is there anyone in your network who might be looking for a move?",
        "I promise I will look after anyone you send my way the same way I looked after you.",
        "Who else in your new company might benefit from speaking to me? I would love an introduction.",
        "If you were going to refer me to someone, what would you say about working with me?",
        "Would you be comfortable writing a short LinkedIn recommendation? It would mean a lot.",
        "I am always looking to grow my network with people like you. Who do you know that I should know?",
      ],
      mistakes:[
        "Asking for referrals immediately after the offer — too early, trust is not yet proven",
        "Making the ask too vague: if you know anyone who is looking, send them my way",
        "Not following up on warm referral introductions quickly — warmth fades fast",
        "Forgetting to thank people who send referrals — they will not send another",
        "Only asking candidates for referrals and ignoring client referrals to other hiring managers",
      ],
      scenario:{
        title:"Your placed candidate has been in their new role for 3 months and is thriving. When and how do you ask for a referral?",
        weak:"Send them a LinkedIn message saying if they know anyone looking, to send them your way.",
        strong:"Call them. Not message — call. Ask genuinely: how is everything going? Listen properly. Then: I am really glad it has worked out so well. You know how much I value the people I work with. Can I ask a favour? Do you know two or three people in your network who are at a similar stage to where you were 3 months ago — experienced, maybe feeling like they have hit a ceiling, open to a conversation? I am not looking for people who are actively searching. Just people who might benefit from a conversation the same way you did. Specific, personal, and easy to say yes to."
      }
    },
  ]},
  {id:"phrases",icon:"💬",eyebrow:"TOOLKIT",title:"Phrases and Questions Toolkit",subtitle:"Ready-to-use language for every situation",gradient:`linear-gradient(135deg,${B.teal},#7EFF2C)`,sections:[
    {
      title:"Power Questions — Universal",
      content:"These questions work across perm, contract and SOW conversations to open up real dialogue and uncover what people actually think. Use them to get beneath the surface answer.",
      tactics:[],
      phrases:[
        "What would make this role or engagement unmissable for you?",
        "If you could change one thing about your current situation, what would it be?",
        "What does success look like in 12 months for whoever takes this on?",
        "What is the one thing that would stop you from saying yes?",
        "If money was not a factor, what would your ideal next step look like?",
        "What is your biggest risk right now, and how are you managing it?",
        "If you were advising a colleague in your exact situation, what would you tell them to do?",
        "What would you regret NOT doing in the next 12 months?",
        "What is the most important thing I should understand about your situation that I have not asked about yet?",
      ],
      mistakes:[],
      scenario:null
    },
    {
      title:"Power Questions — Perm Specific",
      content:"Permanent moves are emotional decisions. These questions help you understand what is really driving the candidate or client — beneath the surface answer.",
      tactics:[],
      phrases:[
        "What would your perfect working week look like?",
        "Tell me about a manager who got the best out of you. What did they do?",
        "If you joined and it did not work out in 6 months, what would the reason be?",
        "How does your family feel about this move?",
        "What do you want people to say about you professionally in 5 years?",
        "What is one thing you have never had in a role that you have always wanted?",
        "If you could go back and do one career decision differently, what would it be?",
        "What does a great place to work actually mean to you — concretely?",
      ],
      mistakes:[],
      scenario:null
    },
    {
      title:"Power Questions — Contract Specific",
      content:"Contract candidates move on commercial logic. These questions cut to what matters fastest and surface the real decision criteria.",
      tactics:[],
      phrases:[
        "What rate would make you turn down a competing offer?",
        "How much notice do you need to give, and is that negotiable?",
        "Are you interviewing anywhere else right now, and how live are those processes?",
        "Is IR35 status a dealbreaker for you, or is it negotiable at the right rate?",
        "What would make you renew at the end of the contract rather than move on?",
        "What is your single most important criteria when choosing a contract — rate, work, location, or something else?",
        "What is the worst contract experience you have had, and what made it that way?",
      ],
      mistakes:[],
      scenario:null
    },
    {
      title:"Opening and Rapport Phrases",
      content:"First impressions set the tone for everything that follows. These openers help you connect quickly and create trust in the early part of a conversation.",
      tactics:[],
      phrases:[
        "I appreciate you making time. I will be respectful of it.",
        "Before I say anything about the role, I would love to understand a bit more about you.",
        "I am not going to pitch you anything today. I just want to understand your world a bit better.",
        "The reason I wanted to speak to you specifically is...",
        "I do my best work when I really understand what someone is looking for. Can I ask you a few questions?",
        "I have done some research before this call. I want to make sure I am genuinely useful to you, not just going through the motions.",
        "I am going to be straight with you. I think that is more useful than telling you what you want to hear.",
      ],
      mistakes:[],
      scenario:null
    },
    {
      title:"Closing and Commitment Phrases",
      content:"Moving conversations to a decisive next step without pressure. These phrases help you close loops, confirm commitment and advance the process.",
      tactics:[],
      phrases:[
        "Based on everything we have discussed, does this feel like the right move for you?",
        "What would need to be true for you to say yes to this?",
        "It sounds like we are aligned. Shall we agree next steps now?",
        "I am going to assume we are moving forward unless you tell me otherwise. Is that fair?",
        "What is the last thing you need before you can commit to this?",
        "I do not want to leave this call without a clear next step. Can we agree on one now?",
        "I think we are close. What would it take to get us over the line today?",
        "I will follow up with X. I would ask that you come back to me with Y by [date]. Does that work?",
      ],
      mistakes:[],
      scenario:null
    },
    {
      title:"Difficult Conversation Starters",
      content:"Not every conversation is easy. These openers help you get into tricky topics with honesty and care.",
      tactics:[],
      phrases:[
        "I want to be straight with you because I think that is more useful than telling you what you want to hear.",
        "Can I share some honest feedback? I think it will help you.",
        "I want to flag something before we go further. I think it is important.",
        "I would rather have this conversation now than let it become a problem later.",
        "This might not be what you want to hear, but I think you would want me to say it.",
        "I am going to ask you something that might feel direct. I hope that is okay.",
        "I am not going to pretend everything is fine when I do not think it is. Can we talk about it?",
        "I want to address something that I think has been sitting between us. Is that okay?",
      ],
      mistakes:[],
      scenario:null
    },
  ]},
];

export const QUIZ_QS = [
  {q:"A contractor asks about IR35 status. What should you do first?",opts:["Guess based on the job description","Confirm with the client before briefing","Tell the candidate it is inside IR35 to be safe","Ignore it and focus on rate"],correct:1,exp:"Always confirm IR35 status with the client before briefing any contractor. Getting this wrong creates compliance risk for everyone."},
  {q:"A candidate rates their commitment to move at 6 out of 10. What is your next step?",opts:["Move them forward, 6 is good enough","Drop them and find someone more committed","Explore what would make it a 9 or 10","Wait and see if they warm up"],correct:2,exp:"A 6 out of 10 means something is holding them back. Explore it — often a simple concern can be addressed and commitment increases significantly."},
  {q:"A client says your rates are too high. What is the best response?",opts:["Immediately offer a discount","End the call, they are not serious","Acknowledge it then walk through the value","Tell them competitors charge more"],correct:2,exp:"Never discount immediately. Acknowledge the concern then explain what is included in your fee and the value of using a specialist partner."},
  {q:"What is the key difference between a SOW and a contract engagement?",opts:["SOW is cheaper","SOW buys an outcome, contract buys time","SOW is only for large companies","There is no meaningful difference"],correct:1,exp:"A SOW engagement purchases a defined deliverable or outcome. A contract engagement is resource-based — you are buying time and skills."},
  {q:"A perm candidate receives a counter-offer. When should you have discussed this?",opts:["When they receive the counter-offer","After they have accepted your client's offer","During the initial screening call","You should not bring it up — it plants the idea"],correct:2,exp:"The counter-offer conversation should happen during initial screening, before the process begins. It is far harder to handle when it actually arrives."},
  {q:"You have 8 live roles on your desk. What should you do first on Monday morning?",opts:["Work on the newest role — it is freshest","Call every client for an update","RAG rate your jobs and prioritise the greenest","Focus on the role with the highest fee"],correct:2,exp:"Use a RAG system (Red/Amber/Green) to assess which roles are most likely to close, then focus your energy there first."},
  {q:"A client says they want 10 CVs for a contract role by end of week. What do you do?",opts:["Send 10 CVs to keep them happy","Push back — offer 2-3 quality CVs and explain why","Agree and scramble to find 10 people","Ask them to reduce the requirement to 5"],correct:1,exp:"Quality always beats quantity. Push back professionally — 2-3 highly qualified candidates will get them to a hire faster than 10 mediocre ones."},
  {q:"Which is the most effective type of BD activity?",opts:["Cold email campaigns to bought lists","Warm referrals from placed candidates","LinkedIn InMails to unknown hiring managers","Advertising on job boards"],correct:1,exp:"Warm referrals convert at 3x the rate of cold outreach. Always ask placed candidates for introductions to other hiring managers."},
  {q:"When is the best time to start the renewal conversation with a contractor?",opts:["At the end of the contract","One week before the contract ends","At the halfway point of the contract","Only if the client brings it up first"],correct:2,exp:"Start the renewal conversation at the halfway point. Waiting until the end leaves you no time to act if the answer is no."},
  {q:"A candidate goes quiet after receiving a verbal offer. What should you do?",opts:["Wait — give them space to decide","Send one final email then move on","Call them same day and find out what is going on","Tell the client they have accepted and hope for the best"],correct:2,exp:"Radio silence after a verbal offer almost always means something is wrong. Call immediately — counter-offer, cold feet, or a competing offer needs to be surfaced and addressed."},
  {q:"What is the primary goal of your LinkedIn content strategy as a recruiter?",opts:["Get as many followers as possible","Be visible to the right people at the right time","Post motivational quotes daily","Advertise job roles to candidates"],correct:1,exp:"Personal brand in recruitment is about targeted visibility. The goal is to be front of mind for the hiring managers and candidates in your niche."},
  {q:"A SPIN Selling Implication question is designed to do what?",opts:["Understand the client's current situation","Identify what is not working","Create urgency by exploring the consequences of the problem","Help the client articulate the value of solving it"],correct:2,exp:"Implication questions create urgency by helping the client feel the cost of the problem not being solved. They are the most powerful and most underused part of SPIN."},
  {q:"A client wants you to work a role but will not confirm the budget is approved. What should you do?",opts:["Start sourcing to show commitment","Qualify it as Amber or Red and confirm budget before investing serious time","Send CVs anyway — budgets usually get approved","Drop the client"],correct:1,exp:"Unapproved budget is one of the most common reasons roles never close. Confirm it before you commit serious time to the search."},
  {q:"Your first three CVs for a role are all rejected. What is the best next step?",opts:["Send three more with a similar profile","Call the client to find out what was missing and recalibrate the brief","Wait for the client to send a new spec","Lower your standards and send more CVs"],correct:1,exp:"Rejected CVs usually mean the brief has shifted or was never fully clear. Recalibrate with the client before searching again."},
];
