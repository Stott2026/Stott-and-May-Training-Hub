// Anti-Bribery & Corruption (Global). Written from the Bribery Act 2010, the Ministry of Justice
// guidance on adequate procedures, and the US Foreign Corrupt Practices Act.
// For review and sign-off by HR and Compliance before it counts.
import { text, keyPoints, law, doDont, sorter, scenario, q } from "./kit.js";

export default {
  slug: "anti-bribery",
  title: "Anti-Bribery & Corruption (Global)",
  category: "integrity",
  region: "global",
  order: 25,
  icon: "scale",
  accent: "brand",
  minutes: 30,
  renewMonths: 12,
  passMark: 80,
  questionsPerAttempt: 10,
  summary: "What bribery is, the UK Bribery Act and US FCPA, gifts and hospitality, conflicts of interest, the warning signs in recruitment, and how to say no and report it.",
  intro: "Winning business on merit is the only way Stott and May wins business. Bribery is a crime for the person involved and for the company, wherever in the world it happens. In recruitment, the risks are real: hiring managers who want a \"thank you\" for exclusivity, lavish hospitality, introducers asking for a cut. This course shows you where the line is and what to do. It takes about 30 minutes and ends with an assessment: you need 80% to pass.",
  outcomes: [
    "Explain what bribery is, and the main offences under the UK Bribery Act 2010",
    "Explain how the Act and the US Foreign Corrupt Practices Act apply to us, wherever we work",
    "Decide when a gift or hospitality is acceptable, and record it",
    "Recognise conflicts of interest and the warning signs of bribery in recruitment",
    "Say no to a bribe, and report it",
  ],
  lessons: [
    {
      title: "What bribery is",
      summary: "The definition, the offences and the penalties.",
      blocks: [
        text(null, "Bribery is offering, promising, giving, asking for or accepting anything of value to get someone to act improperly in their job, or to reward them for doing so. \"Anything of value\" doesn't just mean cash: it can be gifts, hospitality, travel, a job for a relative, a donation, a discount or a favour.\n\nCorruption is the wider abuse of a position of trust for private gain."),
        law("UK Bribery Act 2010", "Four main offences:\n\nBribing another person (section 1): offering, promising or giving a bribe.\n\nBeing bribed (section 2): requesting, agreeing to receive or accepting a bribe.\n\nBribing a foreign public official (section 6).\n\nFailure of a commercial organisation to prevent bribery (section 7): a company is guilty if someone performing services for it, such as an employee, contractor or agent, pays a bribe to win or keep business for it. The only defence is that the company had adequate procedures to prevent bribery.\n\nIndividuals face up to 10 years in prison and an unlimited fine. Companies face unlimited fines."),
        keyPoints("Worth knowing", [
          "The Act applies to UK companies and their people wherever in the world the bribery happens.",
          "It covers bribery in the private sector, not just of public officials.",
          "There's no exception for small \"facilitation payments\" to speed things up. They're bribes, and illegal under UK law.",
          "Training like this is part of the adequate procedures that protect Stott and May, and you.",
        ]),
      ],
    },
    {
      title: "Bribery in the US",
      summary: "The Foreign Corrupt Practices Act, for our US business and work with US clients.",
      blocks: [
        law("US Foreign Corrupt Practices Act (FCPA)", "Makes it a crime for US businesses and people, and companies acting in the US, to bribe foreign (non-US) government officials to win or keep business. It also requires some companies to keep accurate books and records.\n\nThe FCPA has a narrow exception for small facilitating payments for routine government actions. UK law doesn't, and Stott and May's policy follows the stricter rule: no facilitation payments, anywhere."),
        text(null, "Commercial bribery between private businesses is also a crime under US federal and state laws, including in New York. In short: the same standard applies to all of us, in every office."),
      ],
    },
    {
      title: "Gifts and hospitality",
      summary: "Where the line is, and how to stay on the right side of it.",
      blocks: [
        text(null, "Modest, occasional gifts and hospitality, like a business lunch, a branded notebook or a client event, are a normal part of building relationships. They become a problem when they're lavish, frequent, secret, or given at a time when they could influence a decision, or look as if they could."),
        keyPoints("Ask yourself", [
          "Purpose: is it to build a genuine relationship, or to influence a decision?",
          "Timing: is a decision pending, such as a tender, a PSL review or an offer?",
          "Value: is it reasonable and proportionate, within our policy limits?",
          "Openness: would you be comfortable if your manager, the client's boss or a newspaper knew about it?",
          "Record it: is it in the gifts and hospitality register, if our policy requires that?",
        ]),
        sorter("Fine, or a problem?", "Decide for each one.", ["Fine", "A problem"], [
          ["Taking a client contact for a working lunch to discuss a new role", "Fine", "Modest, occasional and for a genuine business purpose."],
          ["Offering a hiring manager a weekend at a luxury hotel while they decide which agency gets a big exclusive role", "A problem", "Lavish, and timed to influence a decision. This could be a bribe."],
          ["Accepting a box of chocolates from a candidate you placed, after they've started", "Fine", "A small thank-you, after the event, with nothing to influence."],
          ["A client contact asks for tickets to a sold-out final \"to keep our agency at the top of the list\"", "A problem", "It's linked to business being given. Say no, and report it."],
          ["Giving all your clients a branded notebook at Christmas", "Fine", "Low value, given to everyone, not linked to a decision."],
          ["Paying for a client contact's family to join a hospitality trip", "A problem", "Hospitality for family members, with no business purpose, is a red flag."],
        ]),
        doDont(
          ["Keep gifts and hospitality modest, occasional and for a clear business purpose", "Record gifts and hospitality given and received, as our policy requires", "Check with your manager or Compliance if you're not sure", "Politely decline anything that feels too much"],
          ["Give or accept cash, or cash equivalents like vouchers", "Offer anything while a decision, tender or review is under way", "Hide anything, or split it to stay under a limit", "Pay for hospitality personally to keep it off the books"],
        ),
      ],
    },
    {
      title: "Warning signs in recruitment",
      summary: "Kickbacks, introducers, conflicts of interest and other red flags.",
      blocks: [
        text(null, "Bribery in recruitment rarely looks like a brown envelope. It's more likely to look like:", [
          "A hiring manager asking for a \"referral fee\", a share of our fee or a personal favour in return for sending roles our way",
          "An introducer or third party asking to be paid a commission for business, with no clear service in return",
          "A request to pay an invoice to a personal account, a different company or another country",
          "A client contact asking us to employ a relative, or to place a contractor who's a friend, in return for business",
          "Pressure to put inflated or false information on invoices, timesheets or rates",
        ]),
        text("Conflicts of interest", "A conflict of interest is when your personal interests, or those of family and friends, could affect, or look as if they affect, your judgement at work. For example: placing a relative with a client, owning shares in a client or competitor, or a close personal relationship with a client's hiring manager. Conflicts aren't always wrong, but they must be declared to your manager so they can be managed."),
        scenario("A hiring manager at a large client says: \"I can make you our only agency for the new data team. All I'd ask is 5% of each fee, paid to my consultancy. Everyone does it.\" What do you do?", [
          ["Agree: the exclusive is worth far more than 5%", false, "That's a bribe: a payment to the hiring manager personally in return for business. It's a crime for you and for Stott and May."],
          ["Decline politely and clearly (\"We can't do that\"), end the conversation, and report it to your manager and Compliance the same day", true, "Right. Say no clearly, don't negotiate, and report it straight away so Stott and May can decide how to handle the client."],
          ["Say you'll think about it, then quietly drop the client", false, "Leaving it hanging can be taken as agreement, and the request must be reported."],
        ]),
        scenario("You're placing contractors with a client overseas. A local official says the work permits will be \"approved this week\" if you pay him $200 in cash. Otherwise they'll take a month. What do you do?", [
          ["Pay: it's a tiny amount and the client needs the contractors", false, "That's a facilitation payment, which is a bribe under UK law and against our policy, whatever the amount."],
          ["Refuse, and report it to Compliance. Accept the delay, unless someone's health or safety is at immediate risk", true, "Right. If paying is the only way to avoid a genuine threat to someone's safety, do what keeps people safe, then report it straight away."],
          ["Pay, but put it down as an \"admin fee\"", false, "Disguising it in the accounts makes it worse: it's a bribe and a false record."],
        ]),
      ],
    },
    {
      title: "Saying no, and speaking up",
      summary: "What to do if you're offered or asked for a bribe, or suspect one.",
      blocks: [
        keyPoints("If you're offered, or asked for, a bribe", [
          "Say no, clearly and politely. Don't negotiate or leave it open.",
          "Don't accept or pay anything, even to \"deal with it later\".",
          "Write down what was said, by whom and when.",
          "Report it to your manager and Compliance straight away.",
        ]),
        text(null, "If you suspect bribery or corruption by anyone, including a colleague, a client or a supplier, report it, even if you're not sure. You can also use our whistleblowing route. You won't be treated badly for reporting a genuine concern, or for refusing to pay a bribe, even if Stott and May loses business as a result."),
        keyPoints("Remember", [
          "Bribery is anything of value given to influence a decision improperly. Not just cash.",
          "UK law applies to us everywhere, and has no exception for facilitation payments.",
          "Keep gifts and hospitality modest, open and recorded.",
          "Declare conflicts of interest.",
          "Say no, write it down, and report it.",
        ]),
      ],
    },
  ],
  questions: [
    q("Which of these can be a bribe?", ["Anything of value given to influence a decision improperly, such as gifts, hospitality or a job for a relative", "Only cash", "Only payments over £1,000", "Only payments to government officials"], 1, "A bribe can be anything of value."),
    q("Under the Bribery Act, when is a company guilty of failing to prevent bribery?", ["When someone performing services for it pays a bribe to win or keep business for it, unless it had adequate procedures", "Only when a director pays a bribe", "Only when the bribe is paid in the UK", "Never: only individuals can be guilty"], 1, "Section 7 makes companies liable for bribery by their associated persons."),
    q("What's the maximum prison sentence for an individual under the Bribery Act?", ["10 years", "6 months", "2 years", "There's no prison sentence"], 1, "Up to 10 years and an unlimited fine."),
    q("Does the UK Bribery Act apply to bribery that happens abroad?", ["Yes: it applies to UK companies and their people wherever it happens", "No: only in the UK", "Only in the EU", "Only if the payment is in sterling"], 1, "The Act has worldwide reach for UK companies and people."),
    q("Are small facilitation payments to speed up routine processes allowed under UK law?", ["No: they're bribes", "Yes, if under £100", "Yes, if the official asks", "Yes, if recorded"], 1, "UK law has no facilitation payments exception."),
    q("What does the US Foreign Corrupt Practices Act (FCPA) prohibit?", ["Bribing foreign government officials to win or keep business", "All gifts to clients", "Hiring people from other countries", "Paying recruitment fees"], 1, "The FCPA targets bribery of foreign officials, and has books-and-records rules."),
    q("Which gift or hospitality is most likely to be acceptable?", ["A working lunch with a client contact to discuss a new role", "A luxury weekend for a hiring manager during a tender", "Cash to a client contact at Christmas", "Sports tickets requested in return for being kept on the PSL"], 1, "Modest, occasional and for a genuine business purpose."),
    q("Why is timing important for gifts and hospitality?", ["Anything given while a decision is pending can look like, or be, an attempt to influence it", "It isn't important", "Gifts are only allowed in December", "Hospitality must be on a weekday"], 1, "Avoid gifts and hospitality around tenders, reviews and decisions."),
    q("Can you give a client contact a gift voucher?", ["No: vouchers are treated like cash", "Yes, if it's under £50", "Yes, if they're a long-standing client", "Yes, at Christmas"], 1, "Cash and cash equivalents aren't acceptable."),
    q("A hiring manager asks for 5% of our fees paid to their own consultancy in return for exclusivity. What is this?", ["A bribe: decline and report it", "A normal referral arrangement", "Acceptable if it's in writing", "Acceptable if the client agrees"], 1, "A personal payment in return for business is a bribe."),
    q("What's a conflict of interest?", ["When personal interests could affect, or look as if they affect, your judgement at work", "When two clients want the same candidate", "When you disagree with your manager", "When a candidate has two offers"], 1, "Conflicts must be declared so they can be managed."),
    q("You're thinking of placing your brother with a client. What should you do?", ["Declare the conflict of interest to your manager first", "Go ahead without mentioning it", "Ask your brother to use a different surname", "Ask a colleague to put him forward instead without telling anyone"], 1, "Conflicts aren't always wrong, but they must be declared."),
    q("An official abroad asks for a small cash payment to approve permits faster. What should you do?", ["Refuse and report it, unless someone's safety is at immediate risk", "Pay: it's normal there", "Pay and record it as an admin fee", "Ask the client to pay it instead"], 1, "Facilitation payments are bribes. Personal safety is the only exception, and must be reported."),
    q("You're asked for a bribe. Which is the right response?", ["Say no clearly, write down what happened, and report it straight away", "Say you'll think about it", "Agree, then report it later", "Ignore it"], 1, "Be clear, keep a record and report it."),
    q("Will you be treated badly for refusing to pay a bribe, even if we lose the business?", ["No: Stott and May will support you", "Yes, if the client was important", "Only if you didn't ask your manager first", "It depends on the amount"], 1, "Refusing a bribe is always the right thing to do."),
  ],
  sources: [
    ["Bribery Act 2010", "https://www.legislation.gov.uk/ukpga/2010/23/contents"],
    ["Ministry of Justice: Bribery Act guidance (adequate procedures)", "https://www.gov.uk/government/publications/bribery-act-2010-guidance"],
    ["Serious Fraud Office: Bribery and corruption", "https://www.sfo.gov.uk/"],
    ["US Department of Justice: Foreign Corrupt Practices Act", "https://www.justice.gov/criminal/criminal-fraud/foreign-corrupt-practices-act"],
    ["Transparency International UK", "https://www.transparency.org.uk/"],
  ],
  reviewNotes: `Please check or fill in before sign-off:
1. Lesson 3: add Stott and May's gifts and hospitality limits (for example, a value above which approval is needed) and how to record them (a register, a form, Compliance). The course currently says "as our policy requires".
2. Lesson 4: confirm our approach to introducers and referral fees (for example, candidate referral schemes, which are legitimate when open and documented) and how third-party payments are approved.
3. Lesson 5: link to the anti-bribery policy and whistleblowing route, and name the Compliance contact.
4. The Economic Crime and Corporate Transparency Act 2023 added a "failure to prevent fraud" offence for large organisations (from 1 September 2025). Check whether it applies to Stott and May, and whether to add a lesson on fraud.
5. Lesson 2: the US section is a short overview. Ask US counsel whether anything specific to New York or our US clients should be added.
6. Assessment: 10 questions drawn from 15, pass mark 80%, renew every 12 months.`,
};
