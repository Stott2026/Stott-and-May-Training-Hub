// Data Privacy Essentials (Global): the everyday habits that keep personal data safe, plus a short
// tour of privacy laws in the UK, EU and US. Complements GDPR Essentials, which covers the law in
// depth. For review and sign-off by HR and Compliance before it counts.
import { text, keyPoints, law, doDont, sorter, scenario, spotIt, checklist, q } from "./kit.js";

export default {
  slug: "data-privacy-essentials",
  title: "Data Privacy Essentials (Global)",
  category: "data",
  region: "global",
  order: 20,
  icon: "lock-keyhole",
  accent: "brand",
  minutes: 30,
  renewMonths: 12,
  passMark: 80,
  questionsPerAttempt: 10,
  summary: "The everyday habits that keep candidates' and clients' data safe: spotting phishing, clean desk and screen, sharing safely, social media and AI tools.",
  intro: "Most data leaks don't need a hacker. They happen when someone clicks a convincing link, leaves a screen unlocked, sends a CV to the wrong person or posts something they shouldn't. This course covers the habits that prevent that, wherever you work, and the main privacy laws in the countries we work in. It takes about 30 minutes and ends with an assessment: you need 80% to pass.",
  outcomes: [
    "Recognise information that can identify someone, on its own or combined",
    "Spot the signs of a phishing email, text or call, and report it",
    "Keep your desk, screen and devices secure, in the office, at home and on the move",
    "Share personal data only with the right people, in the right way",
    "Use social media and AI tools without exposing anyone's data",
    "Name the main privacy laws in the UK, EU and US",
  ],
  lessons: [
    {
      title: "What counts as private",
      summary: "Information that identifies people, on its own or in combination.",
      blocks: [
        text(null, "Personal data (in the US, often called personally identifiable information or PII) is anything that identifies a person, directly or indirectly. Directly means a name, a photo or an email address. Indirectly means details that point to one person when you put them together.\n\nIn recruitment that's easy to miss. \"A female finance director at a 12-person company in Truro\" has no name in it, but anyone in that town's business community would know who it is."),
        sorter("Can it identify someone?", "Decide for each one.", ["Can identify someone", "Can't on its own"], [
          ["A LinkedIn profile URL", "Can identify someone", "It points straight to one person."],
          ["\"The Head of Finance at a 12-person firm in Truro\"", "Can identify someone", "No name, but the combination points to one person."],
          ["A CV with the name removed but the full career history left in", "Can identify someone", "Employers, dates and job titles together usually identify the person."],
          ["\"A Java developer\"", "Can't on its own", "Thousands of people fit. On its own, it doesn't identify anyone."],
          ["An average day rate across 200 contractors, with no names", "Can't on its own", "Aggregated figures like this don't identify individuals."],
          ["A candidate's phone number", "Can identify someone", "It belongs to, and reaches, one person."],
        ]),
        keyPoints("Why it matters", [
          "People trust us with their careers, salaries and sometimes their health. Losing that trust costs us candidates and clients.",
          "Leaks can lead to fraud, identity theft, embarrassment or worse for the people involved.",
          "Mistakes can mean fines, contract losses and reporting to regulators.",
        ]),
      ],
    },
    {
      title: "Spot the phish",
      summary: "Phishing emails, texts and calls, and what to do when one arrives.",
      blocks: [
        text(null, "Phishing is when someone pretends to be a trusted person or organisation to get you to click a link, open an attachment, hand over a password or send data. It comes by email, but also by text (smishing), phone call (vishing), LinkedIn and messaging apps.\n\nRecruiters are prime targets: we open CVs from strangers all day, and our systems hold valuable data. Look at this email and check each part."),
        spotIt("Check this email", "Select each marker, then decide whether it's fine or a warning sign.", "phishing-email", [
          ["subject", "The subject line", true, "Urgency and a deadline (\"locks in 2 hours\") are classic pressure tactics, designed to make you act before you think."],
          ["sender", "The sender's address", true, "\"stottandmay-helpdesk.co\" isn't our domain. Lookalike addresses are a key sign. Check the actual address, not just the display name."],
          ["time", "The time it was sent", false, "Fine on its own: emails arrive at all hours. Judge the rest of the message."],
          ["greeting", "\"Dear user\"", true, "Our IT team knows your name. Generic greetings suggest a mass mailing."],
          ["request", "Asking for your password and Bullhorn login", true, "No genuine IT team will ever ask you for your password by email. This is the biggest warning sign."],
          ["link", "The button and the address under it", true, "The address goes to a .ru website, not ours. Hover over a link (or press and hold on a phone) to see where it really goes, and don't click."],
          ["attachment", "Payroll_Update.zip", true, "Zip files and unexpected attachments are a common way to deliver malware. Don't open them."],
          ["threat", "\"Permanent account closure\"", true, "Threats of something bad happening are another pressure tactic."],
        ]),
        keyPoints("If you get a suspicious message", [
          "Don't click links, open attachments or reply.",
          "Report it using the Report button in Outlook, or forward it to IT.",
          "If it claims to be from someone you know, check with them using contact details you already have, not the ones in the message.",
          "If you've already clicked or entered a password, tell IT straight away. Speed limits the damage, and nobody will blame you for reporting.",
        ]),
        scenario("A caller says they're from a client's HR team. They need a contractor's home address and date of birth today for an urgent payroll problem, and they sound stressed. You don't recognise the name. What do you do?", [
          ["Give the details: payroll problems need sorting quickly", false, "Urgency and stress are classic pressure tactics. Giving personal data to an unverified caller could be a breach."],
          ["Say you'll call them back, then check through the client contact you already know, and only share what's genuinely needed", true, "Right. Verify through known contact details, and share the minimum, by an approved route."],
          ["Email the details to the address they give you", false, "An address given by an unverified caller could be anyone's. Verify first."],
        ]),
      ],
    },
    {
      title: "Clean desk, clear screen",
      summary: "Protecting data on screens, paper and devices, wherever you work.",
      blocks: [
        text(null, "Data protection is also physical: what's on your screen, on your desk and in the printer tray. Check each marker in this office."),
        spotIt("What's wrong at this desk?", "Select each marker, then decide whether it's fine or a problem.", "office", [
          ["screen", "The screen", true, "An unlocked screen showing a list of candidates can be read by anyone walking past. Lock it every time you step away: Windows key + L."],
          ["sticky-note", "The sticky note", true, "A password on a sticky note gives anyone access to your account. Use the password manager instead."],
          ["printer", "Pages in the printer", true, "Printouts left in the tray can be picked up by anyone. Collect them straight away, or don't print."],
          ["drawer", "The open drawer full of papers", true, "Files with personal data should be locked away when you're not using them."],
          ["shred-bin", "The confidential waste bin", false, "Fine. Paper with personal data goes in confidential waste, never the normal bin."],
          ["phone", "The phone on the desk", false, "Fine, as long as it's locked with a PIN or biometrics. A work phone holds candidate contacts and messages."],
        ]),
        doDont(
          ["Lock your screen every time you step away (Windows key + L)", "Use the password manager and switch on multi-factor authentication", "Use long passphrases, and a different one for every account", "Clear your desk at the end of the day", "Put paper with personal data in confidential waste", "Use a privacy screen filter when working in public"],
          ["Write passwords down or share them", "Leave printouts in the printer", "Talk through candidate details on a busy train", "Let family members use your work laptop", "Plug in USB sticks you've found or been given", "Join public Wi-Fi without the company VPN"],
        ),
        checklist("Check your own habits", [
          "I lock my screen whenever I step away",
          "My passwords are in the password manager, not written down",
          "Multi-factor authentication is switched on for my accounts",
          "My work phone is locked with a PIN or biometrics",
          "I clear my desk of personal data at the end of the day",
          "I use confidential waste for paper with personal data",
        ]),
      ],
    },
    {
      title: "Share it safely",
      summary: "Getting personal data to the right person, in the right way, and no more of it than needed.",
      blocks: [
        text(null, "Misdirected emails are among the most common data breaches reported to the ICO. Autocomplete makes it easy: you type \"Sam\" and it fills in the wrong Sam.\n\nBefore you share any personal data, ask three questions: Should they have it? Do they need all of it? Am I sending it the approved way?"),
        sorter("Fine, or stop and check?", "Decide for each one.", ["Fine", "Stop and check"], [
          ["Sending a CV through Bullhorn to the client contact who briefed the role, with the candidate's agreement", "Fine", "Right recipient, approved route, candidate agreed."],
          ["Forwarding a shortlist to your personal Gmail to work on at the weekend", "Stop and check", "Personal accounts aren't secure or controlled by us. Never move company data to them."],
          ["Emailing ten candidates about an event, with everyone in the To line", "Stop and check", "Use BCC, or a mailing tool, so nobody sees anyone else's address."],
          ["Sending a CV that still shows the candidate's home address and date of birth", "Stop and check", "Remove what the client doesn't need. Data minimisation applies to what you send, too."],
          ["Sending a contractor's bank details over WhatsApp to the payroll team", "Stop and check", "Use the approved payroll process, not messaging apps."],
          ["Sharing an anonymised market salary summary with a client", "Fine", "No individual can be identified."],
        ]),
        keyPoints("Before you press send", [
          "Check every recipient, especially when autocomplete has filled them in.",
          "Use BCC or a mailing tool for groups.",
          "Remove details the recipient doesn't need.",
          "Use approved systems, never personal email or messaging apps.",
          "If you get it wrong, report it straight away.",
        ]),
      ],
    },
    {
      title: "Social media, AI and working on the move",
      summary: "Posting, using AI tools and working in public without exposing anyone.",
      blocks: [
        text("Social media", "LinkedIn is central to our work, but posts can reveal more than you mean them to. A photo of your desk can show a screen or whiteboard full of names. A celebratory post about a placement can reveal a candidate's move before they've told their employer.\n\nOnly name candidates, contractors or clients in posts with their clear agreement, and check the background of every photo."),
        scenario("You've just placed a candidate as CFO at a well-known client. You want to post on LinkedIn: \"Delighted to have placed Sarah as the new CFO at Acme!\" What should you do first?", [
          ["Post it: it's good news and great marketing", false, "Sarah may not have resigned yet, or told her current employer. Posting could cause her real problems."],
          ["Ask both Sarah and the client whether they're happy for you to post, and when", true, "Right. Their agreement, and their timing, come first. Many people prefer an announcement after they've started."],
          ["Post it without naming Sarah", false, "\"The new CFO at Acme\" still identifies her. You need agreement either way."],
        ]),
        text("AI tools", "AI tools can save time, but anything you paste into an unapproved one may be stored and used to train it. Only use AI tools Stott and May has approved for work, and never paste in CVs, candidate details, client documents or anything confidential unless the tool is approved for that."),
        text("Working on the move", "On trains, in cafés and at client sites, people can see your screen and hear your calls. Sit where your screen can't be overlooked, use a privacy filter, keep calls about candidates for private spaces, and never leave your laptop or phone unattended."),
      ],
    },
    {
      title: "Privacy laws around the world",
      summary: "The main laws in the UK, EU and US, and the standard we work to everywhere.",
      blocks: [
        law("UK: UK GDPR and the Data Protection Act 2018", "The main data protection rules in the UK, enforced by the Information Commissioner's Office (ICO). The GDPR Essentials course covers them in detail."),
        law("EU: General Data Protection Regulation (GDPR)", "Applies to the personal data of people in the EU, including EU candidates and contractors we work with from the UK or US."),
        law("US: a patchwork of federal and state laws", "The US has no single national privacy law. Federal laws cover particular sectors, such as health (HIPAA) and financial information (the Gramm-Leach-Bliley Act). A growing number of states have their own laws. For example, the California Consumer Privacy Act gives California residents, including job applicants and employees, rights over their data.\n\nIn New York, the SHIELD Act requires businesses to protect New York residents' private information with reasonable security measures, and to notify people if it's breached."),
        keyPoints("One standard, everywhere", [
          "Laws differ from country to country, but our habits shouldn't.",
          "Treat every person's data with the same care, wherever they and you are.",
          "If you're unsure whether something is allowed, ask before you act.",
        ]),
      ],
    },
  ],
  questions: [
    q("Which of these can identify a person?", ["\"The Head of Finance at a 12-person firm in Truro\"", "\"A Java developer\"", "An average day rate across 200 contractors", "A job board's name"], 1, "Details combined can point to one person, even without a name."),
    q("A CV has the name removed but the full career history left in. Is it still personal data?", ["Yes: the history can identify the person", "No: the name has gone", "Only if it includes a photo", "Only if it's sent outside the UK"], 1, "Employers, dates and job titles together usually identify someone."),
    q("An email from \"IT\" asks you to confirm your password. What do you do?", ["Don't reply or click: report it", "Reply with your password, since it's IT", "Click the link to check it's genuine", "Forward it to colleagues to warn them"], 1, "Genuine IT teams never ask for passwords by email. Report it."),
    q("How can you check where a link in an email really goes?", ["Hover over it (or press and hold on a phone) without clicking", "Click it and see", "Reply to the sender and ask", "Check the time the email arrived"], 1, "Hovering shows the real address without opening it."),
    q("You clicked a link in a phishing email and typed your password. What now?", ["Tell IT straight away", "Change nothing and hope for the best", "Wait to see if anything happens", "Delete the email so nobody knows"], 1, "Reporting quickly limits the damage. Nobody is blamed for reporting."),
    q("A caller claiming to be from a client's HR team wants a contractor's home address urgently. What's best?", ["Call back through the client contact you already know before sharing anything", "Give it: it's urgent", "Email it to the address they give you", "Ask them to text you instead"], 1, "Verify through known contact details first, and share only what's needed."),
    q("You're stepping away from your desk for two minutes. What should you do?", ["Lock your screen (Windows key + L)", "Nothing: two minutes isn't long", "Turn the screen off at the wall", "Ask a colleague to watch it"], 1, "Lock it every time, however briefly."),
    q("Where should paper with personal data go when you've finished with it?", ["Confidential waste", "The normal recycling bin", "Your desk drawer", "Home with you, to shred"], 1, "Confidential waste is shredded securely."),
    q("Where should you keep your passwords?", ["In the password manager", "On a sticky note on your screen", "In a notes file on your desktop", "In an email to yourself"], 1, "The password manager keeps them secure."),
    q("You need to email ten candidates about an event. How?", ["Use BCC, or a mailing tool", "Put everyone in the To line", "Put everyone in CC", "Send it from your personal email"], 1, "BCC or a mailing tool stops everyone seeing each other's addresses."),
    q("Can you forward a shortlist to your personal email to work on at home?", ["No: keep company data in company systems", "Yes, if you delete it afterwards", "Yes, if it's password-protected", "Yes, at weekends only"], 1, "Personal accounts aren't secure or controlled by us."),
    q("Before sending a CV to a client, what should you remove?", ["Personal details the client doesn't need, such as a home address or date of birth", "The candidate's skills", "The candidate's work history", "Nothing: send it as it is"], 1, "Only send what the recipient needs."),
    q("You want to announce a placement on LinkedIn. What first?", ["Get the candidate's and the client's agreement, and agree the timing", "Post it straight away", "Post it without the candidate's name", "Ask your manager to post it instead"], 1, "Their agreement and timing come first."),
    q("Can you paste a CV into an AI tool Stott and May hasn't approved?", ["No", "Yes, if you remove the name", "Yes, if it's for a summary", "Yes, if the tool is free"], 1, "Unapproved tools may store and reuse what you paste in."),
    q("Which New York law requires businesses to protect New York residents' private information and report breaches?", ["The SHIELD Act", "The Equality Act", "HIPAA", "The Bribery Act"], 1, "The New York SHIELD Act sets data security and breach notification rules."),
    q("You're working on a train. What's the safest approach?", ["Sit where your screen can't be overlooked, and keep candidate calls for private spaces", "Take candidate calls quietly", "Leave your laptop on the seat while you get a coffee", "Use the train's open Wi-Fi without the VPN"], 1, "Protect your screen, your calls and your devices in public."),
  ],
  sources: [
    ["ICO: Guide to data security", "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/security/a-guide-to-data-security/"],
    ["National Cyber Security Centre: Phishing attacks", "https://www.ncsc.gov.uk/guidance/phishing"],
    ["National Cyber Security Centre: Top tips for staff", "https://www.ncsc.gov.uk/training/top-tips-for-staff-web/"],
    ["New York State Attorney General: SHIELD Act", "https://ag.ny.gov/resources/organizations/data-breach-reporting"],
    ["California Privacy Protection Agency: CCPA", "https://cppa.ca.gov/"],
  ],
  reviewNotes: `Please check or fill in before sign-off:
1. Lesson 2: how staff report phishing (the Report button in Outlook, forwarding to IT, or both) and who IT is.
2. Lesson 3: confirm Stott and May uses a password manager and multi-factor authentication, and name the password manager if so. Confirm the confidential waste arrangements in each office.
3. Lesson 3: "Join public Wi-Fi without the company VPN": confirm we have a VPN. If not, change this to "use your phone's hotspot instead of public Wi-Fi".
4. Lesson 4: confirm the approved way to send CVs to clients (from Bullhorn, or by email), and the approved route for contractor bank details.
5. Lesson 5: which AI tools are approved for work, and whether any are approved for candidate data.
6. Lesson 6: US content is a short overview for awareness, not legal advice. Compliance may want to add any client-specific requirements.
7. Assessment: 10 questions drawn from 16, pass mark 80%, renew every 12 months.`,
};
