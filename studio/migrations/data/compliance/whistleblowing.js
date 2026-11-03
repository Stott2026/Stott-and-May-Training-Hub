// Whistleblowing: Speaking Up (Global). Written from the Employment Rights Act 1996 (as amended by
// the Public Interest Disclosure Act 1998), UK Government guidance and New York Labor Law section 740.
// For review and sign-off by HR and Compliance before it counts.
import { text, keyPoints, law, doDont, sorter, scenario, q } from "./kit.js";

export default {
  slug: "whistleblowing",
  title: "Whistleblowing: Speaking Up (Global)",
  category: "integrity",
  region: "global",
  order: 26,
  icon: "megaphone",
  accent: "brand",
  minutes: 25,
  renewMonths: 12,
  passMark: 80,
  questionsPerAttempt: 10,
  summary: "What whistleblowing is, what you can raise and how, the legal protection you have in the UK and New York, and how to respond if someone raises a concern with you.",
  intro: "Problems are much easier to fix when someone speaks up early. Whistleblowing means raising a concern about wrongdoing, such as fraud, danger to health and safety, or breaking the law. Stott and May wants to hear about it, and the law protects people who do. This course explains what counts, how to raise it, what protection you have, and what to do if someone comes to you. It takes about 25 minutes and ends with an assessment: you need 80% to pass.",
  outcomes: [
    "Explain what whistleblowing is, and how it differs from a personal grievance",
    "Name the kinds of wrongdoing you can raise",
    "Raise a concern internally, and know when and how to go outside",
    "Explain the legal protection whistleblowers have in the UK and New York",
    "Respond well if someone raises a concern with you",
  ],
  lessons: [
    {
      title: "What whistleblowing is",
      summary: "The kinds of wrongdoing it covers, and how it differs from a grievance.",
      blocks: [
        text(null, "Whistleblowing is when someone reports a concern about wrongdoing that affects others: the company, colleagues, clients, candidates or the public. In the UK, the law protects you if you reasonably believe your concern is in the public interest and that it shows one or more of these:", [
          "A criminal offence, such as fraud, bribery or theft",
          "Someone failing to meet a legal obligation, such as breaking data protection law",
          "A miscarriage of justice",
          "A danger to someone's health or safety",
          "Damage to the environment",
          "Someone covering up any of these",
        ]),
        text("Whistleblowing or grievance?", "A grievance is a complaint about how you personally are being treated, such as your pay, workload or a dispute with your manager. It's raised through the grievance procedure. Whistleblowing is about wrongdoing that affects other people or the public interest. Some concerns are both, for example harassment that affects several people. If you're not sure which route to use, raise it anyway, and HR will help."),
        sorter("Whistleblowing, or a grievance?", "Decide for each one.", ["Whistleblowing", "Personal grievance"], [
          ["A manager is adding hours that contractors didn't work to timesheets, and billing the client", "Whistleblowing", "Possible fraud, affecting the client and the company."],
          ["You think your bonus has been calculated wrongly", "Personal grievance", "It's about your own pay. Raise it through the grievance procedure or with HR."],
          ["Candidates' CVs are being shared with clients without their agreement", "Whistleblowing", "A failure to comply with data protection law, affecting many people."],
          ["A colleague is passing confidential client data to a competitor", "Whistleblowing", "A likely breach of law and of confidentiality, affecting clients and the company."],
          ["You disagree with your manager about which accounts you've been given", "Personal grievance", "A dispute about your own work. Talk to your manager or HR."],
          ["A fire exit at the office has been kept locked for weeks", "Whistleblowing", "A danger to health and safety."],
        ]),
      ],
    },
    {
      title: "How to raise a concern",
      summary: "Who to go to, and what to include.",
      blocks: [
        keyPoints("Raising a concern inside Stott and May", [
          "Start with your manager, if you feel able to.",
          "If you can't (for example, because your manager is involved), go to another manager, HR, Compliance or a director, using our whistleblowing policy.",
          "You can raise it in person, by phone or in writing.",
          "Explain what happened, when, who was involved and any evidence you have. You don't need proof: a reasonable belief is enough.",
          "Don't investigate yourself, collect evidence you're not entitled to, or confront the people involved.",
        ]),
        text("Confidentiality and anonymity", "Stott and May will keep your identity confidential as far as it can. You can raise a concern anonymously, but it's harder to investigate and to keep you informed, so we encourage you to give your name."),
        text("Going outside Stott and May", "You can also raise concerns with a \"prescribed person\": a regulator that deals with that kind of issue. For example:", [
          "Health and Safety Executive (HSE), for health and safety",
          "Information Commissioner's Office (ICO), for data protection",
          "HM Revenue and Customs (HMRC), for tax and National Minimum Wage",
          "Employment Agency Standards Inspectorate (EAS), for breaches of recruitment agency rules",
        ]),
        text(null, "Going to the media or posting online is only protected in limited circumstances, so take advice first. The charity Protect gives free, confidential advice to whistleblowers on 020 3117 2520."),
      ],
    },
    {
      title: "Your protection",
      summary: "What the law in the UK and New York does for whistleblowers.",
      blocks: [
        law("UK: Employment Rights Act 1996 (whistleblowing protection)", "Workers who make a protected disclosure must not be treated badly (\"subjected to a detriment\") because of it, and dismissing an employee for it is automatically unfair, from their first day. Protection covers employees and other workers, including agency workers. Anyone who victimises a whistleblower can be personally liable."),
        law("US: New York Labor Law, section 740", "Protects employees, former employees and independent contractors in New York who disclose, or threaten to disclose, to a supervisor or a public body an activity, policy or practice they reasonably believe breaks a law or regulation, or poses a substantial and specific danger to public health or safety. Employers must not retaliate, for example by firing, demoting or threatening them."),
        keyPoints("What this means at Stott and May", [
          "Nobody will be dismissed, disciplined, sidelined or treated worse for raising a genuine concern, even if it turns out to be mistaken.",
          "Treating a whistleblower badly is a disciplinary matter.",
          "Deliberately making false allegations, knowing they're untrue, isn't protected.",
        ]),
        scenario("You raised a concern that a team was charging clients for contractor hours that weren't worked. Since then, your manager has stopped inviting you to team meetings and given your best account to someone else. What do you do?", [
          ["Put up with it: it's the price of speaking up", false, "It isn't. Treating you worse because you raised a concern is unlawful and against our policy."],
          ["Report what's happening to HR or the person you raised the concern with, with dates and details", true, "Right. This may be victimisation, and Stott and May must stop it and protect you."],
          ["Withdraw your concern to make things easier", false, "The original concern still needs dealing with, and so does the way you're being treated."],
        ]),
      ],
    },
    {
      title: "If someone raises a concern with you",
      summary: "How to respond well, especially if you're a manager.",
      blocks: [
        doDont(
          ["Thank them for raising it, and take it seriously", "Listen, and write down what they tell you", "Explain what will happen next, and who else needs to know", "Pass it to HR or Compliance promptly, as our policy says", "Keep their identity confidential as far as possible"],
          ["Dismiss it, or tell them they must be mistaken", "Promise total secrecy: some people will need to know", "Investigate it yourself, or tip off the people involved", "Treat them differently because they spoke up", "Try to find out who raised an anonymous concern"],
        ),
        scenario("A junior consultant tells you, their team leader, that they think a senior colleague has been inventing candidate references. They're worried about getting the colleague into trouble. What do you do?", [
          ["Tell them to leave it with you, then have a quiet word with the senior colleague", false, "That could tip off the colleague and put the consultant at risk. Concerns like this need passing on, not handling informally."],
          ["Thank them, reassure them they've done the right thing and are protected, explain you'll pass it to HR or Compliance, and do so the same day", true, "Right. Fake references could mean fraud and a risk to clients. It needs proper investigation, and the consultant needs protecting."],
          ["Ask them to bring you proof first", false, "They don't need proof: a reasonable belief is enough to raise a concern."],
        ]),
        keyPoints("Remember", [
          "Speak up about wrongdoing that affects others: fraud, danger, breaking the law, or covering it up.",
          "Raise it internally first if you can. You don't need proof.",
          "You're protected by law from being treated badly for raising a genuine concern.",
          "If someone comes to you: listen, thank them, pass it on, and protect them.",
        ]),
      ],
    },
  ],
  questions: [
    q("What is whistleblowing?", ["Reporting a concern about wrongdoing that affects others or the public interest", "Complaining about your own pay", "Talking to the media about the company", "Reporting a colleague you don't like"], 1, "Whistleblowing is about wrongdoing affecting others."),
    q("Which of these is a whistleblowing concern?", ["A manager adding hours that weren't worked to contractor timesheets", "Disagreeing with your bonus calculation", "Wanting a different desk", "Disliking the new office layout"], 1, "Possible fraud affects clients and the company."),
    q("Which of these is a personal grievance rather than whistleblowing?", ["A dispute with your manager about which accounts you've been given", "Candidate data being shared without agreement", "A locked fire exit", "Fraudulent invoices"], 1, "Grievances are about how you personally are treated."),
    q("Do you need proof before raising a concern?", ["No: a reasonable belief is enough", "Yes, documentary proof", "Yes, two witnesses", "Only for fraud"], 1, "You need a reasonable belief, not proof."),
    q("Your manager is involved in the wrongdoing. Who can you go to?", ["Another manager, HR, Compliance or a director", "Nobody: you must go to your manager", "Only the police", "Only the media"], 1, "Our policy gives you other routes."),
    q("Which regulator could you raise a data protection concern with?", ["The Information Commissioner's Office (ICO)", "HMRC", "The Health and Safety Executive", "Companies House"], 1, "The ICO deals with data protection."),
    q("Which organisation can you contact about breaches of UK recruitment agency rules?", ["The Employment Agency Standards Inspectorate (EAS)", "The ICO", "The Charity Commission", "The Land Registry"], 1, "EAS enforces the rules for employment agencies and businesses."),
    q("Under UK law, what protection do whistleblowers have?", ["Protection from being treated badly, and dismissal for it is automatically unfair", "None", "Only a cash reward", "Protection only after two years' service"], 1, "Protection applies from day one."),
    q("Does New York's whistleblower law (Labor Law section 740) protect independent contractors?", ["Yes, as well as employees and former employees", "No: only full-time employees", "Only managers", "Only if they report to the police"], 1, "Since 2022 it covers former employees and independent contractors too."),
    q("Is someone protected if they raise a genuine concern that turns out to be mistaken?", ["Yes: a reasonable belief is protected", "No: only correct concerns are protected", "Only if they apologise", "Only if they raised it anonymously"], 1, "Genuine concerns are protected even if mistaken."),
    q("Is deliberately making a false allegation protected?", ["No", "Yes, always", "Only if anonymous", "Only if in writing"], 1, "Knowingly false allegations aren't protected."),
    q("After raising a concern, you're excluded from meetings and lose your best account. What should you do?", ["Report it to HR or the person you raised the concern with", "Accept it", "Withdraw your concern", "Resign"], 1, "This may be victimisation, which must be stopped."),
    q("Someone raises a concern with you. What should you NOT do?", ["Tip off the people involved", "Thank them", "Write down what they say", "Pass it to HR or Compliance"], 1, "Tipping off the people involved could put the whistleblower at risk and harm the investigation."),
    q("Can you promise someone total secrecy when they raise a concern?", ["No: explain that some people will need to know, and you'll protect their identity as far as possible", "Yes, always", "Only if they ask", "Only for anonymous concerns"], 1, "Be honest about who needs to know."),
    q("Which charity gives free, confidential advice to whistleblowers in the UK?", ["Protect", "Shelter", "Mind", "Citizens Advice only"], 1, "Protect: 020 3117 2520."),
  ],
  sources: [
    ["UK Government: Whistleblowing for employees", "https://www.gov.uk/whistleblowing"],
    ["UK Government: Whistleblowing, list of prescribed people and bodies", "https://www.gov.uk/government/publications/blowing-the-whistle-list-of-prescribed-people-and-bodies--2"],
    ["Protect: Whistleblowing advice", "https://protect-advice.org.uk/"],
    ["Acas: Whistleblowing at work", "https://www.acas.org.uk/whistleblowing-at-work"],
    ["New York State Department of Labor: Whistleblower protections (Labor Law 740)", "https://dol.ny.gov/"],
  ],
  reviewNotes: `Please check or fill in before sign-off:
1. Lesson 2: link to Stott and May's whistleblowing policy and name the people concerns can be raised with (for example, a named director or Compliance lead), and any confidential reporting line.
2. Lesson 2: check the Protect advice line number (020 3117 2520) is current.
3. Lesson 3: New York Labor Law 740 requires employers to post a notice of employees' rights. Confirm it's posted in the New York office.
4. Lesson 2: the prescribed persons listed are examples relevant to us. Check against the latest Government list.
5. Assessment: 10 questions drawn from 15, pass mark 80%, renew every 12 months.`,
};
