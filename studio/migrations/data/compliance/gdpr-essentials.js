// GDPR Essentials (Global). Written from ICO guidance on UK GDPR and the Data Protection Act 2018.
// For review and sign-off by HR and Compliance before it counts.
import { text, keyPoints, law, doDont, stat, sorter, scenario, q } from "./kit.js";

export default {
  slug: "gdpr-essentials",
  title: "GDPR Essentials (Global)",
  category: "data",
  region: "global",
  order: 10,
  icon: "fingerprint",
  accent: "brand",
  minutes: 35,
  renewMonths: 12,
  passMark: 80,
  questionsPerAttempt: 10,
  summary: "The rules for handling personal data, applied to recruitment: the principles, lawful bases, people's rights, breaches, and keeping and sharing data safely.",
  intro: "Recruitment runs on personal data: CVs, phone numbers, salaries, right-to-work documents, interview notes and references. GDPR sets the rules for how we collect, use, share and keep it. This course explains those rules in plain English with examples from the desk. It takes about 35 minutes and ends with an assessment: you need 80% to pass.",
  outcomes: [
    "Recognise personal data and special category data in everyday recruitment work",
    "Explain the seven data protection principles",
    "Say which lawful basis applies to common recruitment tasks",
    "Recognise a request from someone exercising their rights, and pass it on straight away",
    "Recognise a personal data breach and report it at once",
    "Keep, share and send personal data safely",
  ],
  lessons: [
    {
      title: "Why GDPR matters to a recruiter",
      summary: "What the law is, who it protects, and what counts as personal data.",
      blocks: [
        text(null, "The General Data Protection Regulation (GDPR) protects people's personal data. Since Brexit, the UK has its own version, the UK GDPR, which sits alongside the Data Protection Act 2018. The EU GDPR still applies to the personal data of people in the EU. The rules are almost the same, and both apply to Stott and May.\n\nIt doesn't matter which office you work in: if you handle the data of candidates, contractors or client contacts in the UK or EU, these rules apply to you. In the UK the regulator is the Information Commissioner's Office (ICO)."),
        stat("£17.5m", "or 4% of annual worldwide turnover, whichever is higher: the maximum fine under the UK GDPR. The EU maximum is €20 million or 4%.", "ICO"),
        text("What counts as personal data", "Personal data is any information about a living person who can be identified, directly or indirectly. A name obviously counts, but so does a work email address, a phone number, a LinkedIn profile, an employee ID, or your notes and opinions about a candidate.\n\nSome personal data is more sensitive and needs extra protection. This is called special category data:", [
          "Racial or ethnic origin",
          "Political opinions, religious or philosophical beliefs",
          "Trade union membership",
          "Genetic and biometric data (used to identify someone)",
          "Health, including mental health and disability",
          "Sex life or sexual orientation",
        ]),
        text(null, "Information about criminal convictions and offences has its own separate rules and is just as sensitive. Only collect it when there's a clear legal reason, for example a role that needs a criminal record check."),
        sorter("What kind of data is it?", "Sort each one.", ["Personal data", "Special category data", "Not personal data"], [
          ["A candidate's mobile number", "Personal data", "It identifies and lets you contact a specific person."],
          ["A client contact's work email: jane.smith@client.com", "Personal data", "Work details still identify a person. Business contacts are covered too."],
          ["Your call notes: \"Strong Java, wants hybrid, seemed nervous\" on a named candidate's record", "Personal data", "Opinions about an identifiable person are personal data, and the candidate can ask to see them. Keep notes factual and professional."],
          ["A candidate's health condition, mentioned at interview", "Special category data", "Health information needs extra care and a specific legal condition to use it."],
          ["Ethnicity from a candidate's diversity monitoring form", "Special category data", "Racial or ethnic origin is special category data. Keep it separate from the hiring decision."],
          ["A client's company registration number", "Not personal data", "It's about a company, not a person."],
          ["Truly anonymised salary benchmarks, with no way to identify anyone", "Not personal data", "Properly anonymised data is outside GDPR. But if people can be re-identified, it's still personal data."],
        ]),
      ],
    },
    {
      title: "The people and the seven principles",
      summary: "Who's who under GDPR, and the seven rules behind everything else.",
      blocks: [
        text("Who's who", "A data subject is the person the data is about: a candidate, contractor, client contact or colleague.\n\nA controller decides why and how personal data is used. For our candidate and client databases, Stott and May is the controller, so we're responsible for following the law.\n\nA processor handles data on a controller's instructions, for example a payroll provider or a software supplier. Processors must have a contract with the controller that sets out what they can and can't do."),
        law("UK GDPR, Article 5: the seven principles", "Every use of personal data must follow these principles. Accountability means we must also be able to show that we do."),
        {
          _type: "ccKeyPoints",
          title: "The seven principles, on the desk",
          points: [
            "Lawfulness, fairness and transparency: have a lawful basis, and tell people what you do with their data (our privacy notice).",
            "Purpose limitation: collect data for a clear purpose and don't reuse it for something unrelated. A CV sent for one role isn't a mailing list.",
            "Data minimisation: only collect what you need. You rarely need a date of birth or a photo to put someone forward.",
            "Accuracy: keep records up to date and correct mistakes. Update Bullhorn when a candidate's details change.",
            "Storage limitation: don't keep data longer than you need it. Follow our retention rules.",
            "Integrity and confidentiality: keep data secure: locked screens, the right recipients, approved systems.",
            "Accountability: be able to show we comply: records, policies, training like this.",
          ],
        },
        doDont(
          ["Record only what's relevant to finding someone work, or to the role", "Keep notes factual: the candidate can ask to see them", "Update or correct records as soon as you know they've changed", "Use Bullhorn and approved systems, not personal spreadsheets"],
          ["Ask for or record a date of birth, photo or marital status \"just in case\"", "Write opinions you wouldn't be comfortable reading out to the candidate", "Keep personal copies of CVs on your desktop or personal email", "Use candidate data for anything the candidate wouldn't expect"],
        ),
      ],
    },
    {
      title: "Lawful bases: why we can use the data",
      summary: "The six lawful bases, and which ones recruitment relies on.",
      blocks: [
        text(null, "You can only use personal data if you have a lawful basis. There are six:", [
          "Consent: the person has clearly agreed",
          "Contract: it's needed for a contract with the person, or to take steps they've asked for before one",
          "Legal obligation: the law requires it",
          "Vital interests: it's needed to protect someone's life",
          "Public task: for official functions (not usually relevant to us)",
          "Legitimate interests: it's needed for our legitimate business interests, and those aren't outweighed by the person's rights and interests",
        ]),
        text("In recruitment", "Much of our day-to-day work relies on legitimate interests: finding candidates, keeping them on file and contacting them about relevant roles. That only works if we're open about it, so when we collect someone's details from somewhere other than them (LinkedIn, a job board, a referral), we must tell them, usually within a month, and give them our privacy notice.\n\nPaying a contractor relies on contract. Right-to-work checks and the records the recruitment regulations require rely on legal obligation.\n\nConsent has to be freely given, specific, informed and as easy to withdraw as to give, so it's best kept for things that are genuinely optional. Whatever the lawful basis, always get the candidate's agreement before you send their details to a client for a specific role."),
        law("Special category data needs more", "To use special category data, like health information, you need a lawful basis and an extra condition from Article 9, such as explicit consent or a legal duty in employment law (for example, making reasonable adjustments). If you're not sure, ask before you record it."),
        sorter("Which lawful basis?", "Pick the lawful basis that fits best.", ["Legitimate interests", "Contract", "Legal obligation"], [
          ["Adding a candidate you found on LinkedIn to Bullhorn so you can contact them about relevant roles", "Legitimate interests", "A legitimate business purpose, as long as we tell them and they can object."],
          ["Paying a contractor you've placed", "Contract", "Payment is needed to fulfil the contract with the contractor."],
          ["Checking a contractor's right to work in the UK", "Legal obligation", "The law requires right-to-work checks."],
          ["Keeping the records the recruitment regulations require", "Legal obligation", "The Conduct Regulations require agencies to keep certain records."],
          ["Sending a client contact news about our services", "Legitimate interests", "Business-to-business marketing can rely on legitimate interests, with an easy way to opt out. Electronic marketing rules also apply."],
        ]),
        scenario("A client says: \"Before we sign off the role, send me five CVs so I can see what the market looks like.\" Two of the candidates you have in mind don't know about this client. What do you do?", [
          ["Send all five CVs: it's only to show the market", false, "Sending a candidate's details without their agreement isn't fair or transparent, and they wouldn't expect it."],
          ["Send anonymised market information, and only put forward named candidates who have agreed to be considered for this role", true, "Right. You help the client without sharing anyone's data they haven't agreed to. Anonymised market data gives them the picture."],
          ["Send the CVs with the names removed", false, "Removing the name often isn't enough: a full career history can still identify someone. Use real anonymised data, or get agreement first."],
        ]),
      ],
    },
    {
      title: "People's rights",
      summary: "What people can ask us to do with their data, and what you do when they ask.",
      blocks: [
        text(null, "Everyone whose data we hold has rights over it:", [
          "To be informed: what we do with their data and why (our privacy notice)",
          "Of access: to a copy of their data (a subject access request)",
          "To rectification: to have mistakes corrected",
          "To erasure: to have their data deleted, in some circumstances",
          "To restrict processing: to limit what we do with it while a concern is looked at",
          "To data portability: to take data they gave us to another organisation",
          "To object: for example to their data being used for marketing, which we must stop",
          "Rights around automated decisions: not to be subject to some decisions made only by a computer, with no human involved",
        ]),
        keyPoints("Subject access requests", [
          "A request can be made in any form: by email, on the phone, in a LinkedIn message, to anyone in the company. It doesn't need to mention GDPR or use any special words.",
          "We have one month to respond, starting the day it's received, by anyone. That's why you pass it on straight away.",
          "It's usually free. People can see everything we hold about them, including notes and emails about them.",
        ]),
        scenario("A candidate emails you: \"I've had enough of recruiters. What information have you got on me, and where did you get my number?\" What do you do?", [
          ["Reply with their Bullhorn record so they can see it", false, "Well meant, but a subject access request covers all the data we hold, not just one record, and it needs checking first, for example so we don't disclose other people's data."],
          ["Pass it to our data protection contact the same day, and let the candidate know it's being handled", true, "Right. It's a subject access request, so the one-month clock has started. Our data protection contact handles the full response."],
          ["Delete their record so there's nothing to send", false, "Never delete data to avoid a request: that's a serious breach of the law. They asked what we hold, not for deletion."],
        ]),
        scenario("On a call, a contractor says: \"Take me off your system. I don't want to hear from you again.\" What do you do?", [
          ["Agree, and simply stop calling them", false, "Stopping calls is a start, but the request needs recording and handling properly, or a colleague may contact them next week."],
          ["Confirm you'll pass it on, record it, and send it to our data protection contact the same day", true, "Right. It's an objection and possibly an erasure request. We may need to keep some data (for example, for tax or legal records), but we must stop contacting them and handle the rest properly."],
          ["Tell them it isn't possible because they're already in Bullhorn", false, "People have the right to object to marketing and to ask for erasure. It's always possible to act on it."],
        ]),
      ],
    },
    {
      title: "Data breaches",
      summary: "What a breach is, why speed matters, and what you do.",
      blocks: [
        text(null, "A personal data breach is any security incident that leads to personal data being lost, destroyed, changed, or seen by someone who shouldn't see it, whether it's an accident or deliberate.\n\nMost breaches in recruitment are simple mistakes: a CV sent to the wrong person, an email with every candidate's address visible, a lost laptop or printout, a phishing email that gives someone access."),
        stat("72 hours", "the time an organisation has to report a breach to the ICO, from becoming aware of it, if it's likely to put people at risk. If the risk is high, the people affected must be told without undue delay.", "UK GDPR, Articles 33 and 34"),
        sorter("Breach, or not?", "Decide for each one.", ["A breach: report it now", "Not a breach"], [
          ["You email a candidate's CV, with their salary, to the wrong client", "A breach: report it now", "Personal data went to someone who shouldn't have it."],
          ["You email 40 candidates about an event, with every address in the To line", "A breach: report it now", "Everyone can now see everyone else's email address. Use BCC, or a mailing tool."],
          ["You leave a printed shortlist on the train", "A breach: report it now", "Lost personal data is a breach, even on paper."],
          ["A colleague looks up a friend's candidate record out of curiosity", "A breach: report it now", "Access without a work reason is unauthorised access."],
          ["Your work laptop is stolen, but it's encrypted and was locked", "A breach: report it now", "Report it anyway. Encryption may mean the risk is low, but our data protection contact decides that, not you."],
          ["You send a CV to the right client, for a role the candidate agreed to, through our usual system", "Not a breach", "Right person, right purpose, agreed by the candidate."],
        ]),
        scenario("An hour ago you sent a candidate's CV, with their current salary, to the wrong contact at another client. You've just noticed. What do you do?", [
          ["Email the contact asking them to delete it, and say nothing internally", false, "Asking them to delete it may help, but the breach must be reported internally. The 72-hour clock may already be running."],
          ["Report it straight away to your manager and our data protection contact, then follow their instructions", true, "Right. Report it at once, honestly and with the facts. They'll decide what happens next, which may include asking the recipient to delete it and confirm, and telling the candidate."],
          ["Wait to see whether the contact replies", false, "Waiting wastes time we may not have. Report it now."],
        ]),
        keyPoints("If you think something's gone wrong", [
          "Report it straight away, even if you're not sure it's a breach.",
          "Don't try to investigate or fix it on your own, and never cover it up.",
          "Note what happened, when, and whose data was involved.",
          "Nobody gets in trouble for reporting a mistake quickly. Hiding one is what causes real harm.",
        ]),
      ],
    },
    {
      title: "Keeping and sharing data safely",
      summary: "Retention, sending data abroad, new tools and AI.",
      blocks: [
        text("Keep it only as long as you need it", "Storage limitation means deleting data we no longer need. Stott and May has retention rules that say how long different records are kept. Don't keep your own copies of CVs or spreadsheets outside our systems, because they can't be found, updated or deleted when they should be."),
        text("Sending data outside the UK or EU", "Personal data can only go to a country outside the UK or EU if it's protected there: either the country has been approved as adequate, or there's a safeguard such as an approved data transfer agreement.\n\nSending a UK candidate's CV to a client in the US, or using a new overseas tool, can count. If it isn't one of our usual, approved routes, check with our data protection contact before you send."),
        text("New tools and AI", "Before we start using personal data in a new way that's likely to be high risk, such as a new screening tool, we must carry out a data protection impact assessment (DPIA). Never upload CVs or candidate details to an AI tool or app that Stott and May hasn't approved. Free tools often keep what you put in and use it to train their models."),
        doDont(
          ["Use Bullhorn and approved systems for candidate data", "Check the recipient before you press send", "Use BCC, or a mailing tool, for group emails", "Ask our data protection contact before sending data abroad in a new way", "Delete what you no longer need, in line with our retention rules"],
          ["Forward candidate data to personal email or messaging apps", "Paste CVs or personal details into AI tools the company hasn't approved", "Keep \"just in case\" spreadsheets of candidates on your laptop", "Share passwords or log in as someone else"],
        ),
        keyPoints("Remember", [
          "If it can identify a person, it's personal data. Treat it with care.",
          "Only collect what you need, use it for the reason you collected it, and keep it safe.",
          "Pass on requests about people's data the same day.",
          "Report a suspected breach straight away.",
        ]),
      ],
    },
  ],
  questions: [
    q("Which of these is personal data?", ["A client contact's work email address", "A company's registration number", "Truly anonymised salary statistics", "A job title with no name attached"], 1, "Work contact details still identify a person, so they're personal data."),
    q("Which of these is special category data?", ["A candidate's health condition", "A candidate's home address", "A candidate's salary", "A candidate's notice period"], 1, "Health is special category data. Address, salary and notice period are personal data, but not special category."),
    q("Your call notes on a named candidate say \"seemed nervous\". Are they personal data?", ["Yes: opinions about an identifiable person are personal data", "No: notes are internal", "Only if the candidate is told", "Only if they're written on paper"], 1, "Opinions about someone are their personal data, and they can ask to see them."),
    q("What does the data minimisation principle mean?", ["Only collect the personal data you actually need", "Make data files as small as possible", "Delete data every month", "Store data on as few computers as possible"], 1, "Collect what you need for the purpose, and no more."),
    q("What does the storage limitation principle mean?", ["Don't keep personal data longer than you need it", "Only store data in the UK", "Only keep paper records", "Keep data for at least seven years"], 1, "Keep it only as long as needed, in line with our retention rules."),
    q("Who decides why and how personal data is used, and is responsible for following the law?", ["The controller", "The processor", "The data subject", "The ICO"], 1, "The controller decides the why and how. For our databases, that's Stott and May."),
    q("Which lawful basis covers checking a contractor's right to work?", ["Legal obligation", "Consent", "Vital interests", "Public task"], 1, "The law requires right-to-work checks."),
    q("You add a candidate you found on LinkedIn to Bullhorn. What must happen?", ["We must tell them, usually within a month, and give them our privacy notice", "Nothing: LinkedIn profiles are public", "We must get their written consent first", "We must tell the ICO"], 1, "When data comes from somewhere other than the person, we must tell them about it within a reasonable time, at the latest within a month."),
    q("A client asks for some CVs \"to see the market\". What's right?", ["Only send details of candidates who've agreed to be put forward for that role", "Send any CVs that match", "Send CVs with the names removed", "Send CVs if the client signs an NDA"], 1, "Candidates must agree before their details go to a client for a role."),
    q("A candidate asks, in a LinkedIn message, what data we hold on them. What is this?", ["A subject access request, which must be passed on straight away", "Not valid, because it wasn't sent to the data protection team", "Not valid, because it doesn't mention GDPR", "Something to ignore if they're not an active candidate"], 1, "A request can come in any form, to anyone, with no special wording. The one-month clock starts when it's received."),
    q("How long do we normally have to respond to a subject access request?", ["One month", "72 hours", "Three months", "One year"], 1, "One month, which can be extended in limited circumstances."),
    q("A contractor asks you to remove them from our system. What do you do?", ["Record it and pass it to our data protection contact the same day", "Tell them it isn't possible", "Delete everything yourself straight away", "Ignore it if they're on a live assignment"], 1, "It may be an objection and an erasure request. Some data may need to be kept for legal reasons, so it must be handled properly."),
    q("How long does an organisation have to report a notifiable breach to the ICO?", ["72 hours from becoming aware of it", "One month", "Seven days", "There's no time limit"], 1, "72 hours, so reporting internally straight away matters."),
    q("You send a CV to the wrong client. What should you do first?", ["Report it straight away to your manager and our data protection contact", "Ask the client to delete it and say nothing", "Wait and see whether they reply", "Delete it from your sent items"], 1, "Report it straight away. They'll decide what happens next."),
    q("You email 40 candidates with every address in the To line. Is this a breach?", ["Yes: everyone's email address has been shared with everyone else", "No: they're only email addresses", "Only if someone complains", "Only if one of them is a client"], 1, "Disclosing people's email addresses to others is a breach. Use BCC or a mailing tool."),
    q("Can you upload a candidate's CV to a free AI tool to rewrite it?", ["No: only use tools Stott and May has approved", "Yes, if you remove the phone number", "Yes, if the candidate is happy", "Yes, if you delete it afterwards"], 1, "Unapproved tools may keep and reuse what you upload. Use only approved tools."),
    q("You want to send a UK candidate's CV to a client in a country you haven't worked with before. What should you do?", ["Check with our data protection contact first", "Send it: GDPR only applies in the UK", "Send it if it's password-protected", "Ask the client to delete it after reading"], 1, "Sending personal data abroad needs safeguards. Check before using a new route."),
    q("What's the maximum fine under the UK GDPR?", ["£17.5 million or 4% of annual worldwide turnover, whichever is higher", "£10,000", "£500,000", "1% of UK profit"], 1, "£17.5 million or 4% of annual worldwide turnover, whichever is higher."),
  ],
  sources: [
    ["ICO: Guide to the UK GDPR", "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/"],
    ["ICO: The data protection principles", "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/"],
    ["ICO: Lawful basis for processing", "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/"],
    ["ICO: Individual rights", "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/"],
    ["ICO: Personal data breaches", "https://ico.org.uk/for-organisations/report-a-breach/"],
    ["ICO: International transfers", "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/"],
  ],
  reviewNotes: `Please check or fill in before sign-off:
1. "Our data protection contact": add the name or mailbox (DPO, data protection lead or Compliance) wherever the course says this (lessons 4, 5 and 6).
2. Lesson 1: the course applies to all staff, including the US team, because they handle UK and EU personal data. Confirm.
3. Lesson 3: confirm the lawful bases Stott and May's privacy notice actually uses (legitimate interests for sourcing, contract, legal obligation), and add a link to the candidate privacy notice if there's one online.
4. Lesson 3: "tell them within a month" when collecting data from LinkedIn or job boards: confirm how we do this in practice (for example, an automatic privacy notice email from Bullhorn).
5. Lesson 6: retention periods. Add the headline periods from our retention policy, or a link to it.
6. Lesson 6: which AI tools are approved for candidate data, if any.
7. The Data (Use and Access) Act 2025 amends parts of UK data protection law (for example, around complaints, automated decisions and legitimate interests). The core content here is unchanged, but Compliance may want to add a line on it.
8. Assessment: 10 questions drawn from 18, pass mark 80%, renew every 12 months.`,
};
