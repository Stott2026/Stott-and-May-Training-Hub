// Cybersecurity Essentials (Global). Written from National Cyber Security Centre (NCSC) guidance for
// staff and small organisations. For review and sign-off by HR, Compliance and IT before it counts.
import { text, keyPoints, doDont, sorter, scenario, checklist, q } from "./kit.js";

export default {
  slug: "cybersecurity-essentials",
  title: "Cybersecurity Essentials (Global)",
  category: "data",
  region: "global",
  order: 22,
  icon: "shield-check",
  accent: "brand",
  minutes: 30,
  renewMonths: 12,
  passMark: 80,
  questionsPerAttempt: 10,
  summary: "Protecting our systems and data: strong passwords and multi-factor authentication, scams that target recruiters, payment fraud, devices and networks, and what to do when something goes wrong.",
  intro: "Most cyber attacks don't break in through clever code. They get in by tricking people: a convincing email, a fake invoice, a call that sounds like the boss. Recruiters are targeted because we open attachments from strangers all day and our systems hold valuable data. This course covers the habits that keep attackers out, and what to do if something gets through. It takes about 30 minutes and ends with an assessment: you need 80% to pass.",
  outcomes: [
    "Create strong passwords and use multi-factor authentication properly",
    "Recognise social engineering scams, including payment diversion and CEO fraud",
    "Keep devices, software and connections secure",
    "Recognise the signs of an attack, and report it straight away",
  ],
  lessons: [
    {
      title: "Why it matters",
      summary: "How attackers get in, and why recruiters are a target.",
      blocks: [
        text(null, "Phishing and other scams that trick people are by far the most common type of cyber attack UK businesses report. A single successful attack can lock up our systems (ransomware), expose thousands of candidates' data, divert payments to criminals, or let someone impersonate us to our clients.\n\nRecruitment is a target because:", [
          "We receive emails and attachments from people we've never met, every day",
          "Our systems hold personal data that criminals can sell or use",
          "We pay contractors and suppliers, so payment fraud is lucrative",
          "Our business depends on trust: an attacker emailing clients as us does real damage",
        ]),
        keyPoints("The good news", [
          "Most attacks can be stopped by a few simple habits.",
          "You don't need to be technical. You need to be alert, and to report things quickly.",
          "Reporting a mistake straight away is always the right thing to do. Nobody gets in trouble for it.",
        ]),
      ],
    },
    {
      title: "Passwords and multi-factor authentication",
      summary: "The single biggest thing you can do to protect your accounts.",
      blocks: [
        text(null, "Attackers try millions of common passwords, and reuse passwords stolen from other websites (\"credential stuffing\"). A strong, unique password for every account, plus multi-factor authentication, stops nearly all of these attacks."),
        keyPoints("Passwords that work", [
          "Use three random words, for example \"CoffeeTrainPurple\". Long and memorable beats short and complicated.",
          "Use a different password for every account, especially your work email.",
          "Use the password manager to store them, so you only need to remember one.",
          "Never share your password, or write it down where others can see it.",
        ]),
        sorter("Strong, or weak?", "Decide for each one.", ["Strong", "Weak"], [
          ["Summer2026!", "Weak", "A season and a year is one of the first things attackers try, symbols or not."],
          ["Three random words, like CoffeeTrainPurple", "Strong", "Long, random and memorable: hard to guess, easy to remember."],
          ["StottAndMay123", "Weak", "The company name plus numbers is an obvious guess."],
          ["The same strong password for work email and your personal shopping account", "Weak", "If the shop is breached, attackers will try that password on your work account."],
          ["A long password created and stored by the password manager", "Strong", "Random, unique and stored securely."],
        ]),
        text("Multi-factor authentication (MFA)", "MFA asks for something extra as well as your password, such as a code or a prompt in an authenticator app. Even if someone steals your password, they can't get in without it.\n\nAttackers sometimes send repeated MFA prompts, hoping you'll approve one to make them stop. Never approve a sign-in prompt you didn't start yourself. If you get one, it means someone has your password: report it to IT and change your password."),
      ],
    },
    {
      title: "Scams that target recruiters",
      summary: "Payment diversion, fake bosses, booby-trapped CVs and more.",
      blocks: [
        text(null, "Social engineering means manipulating people rather than computers. Scammers research us on LinkedIn and our website, then pretend to be someone we trust. Watch for:", [
          "Payment diversion: an email that seems to be from a contractor or supplier, saying their bank details have changed",
          "CEO fraud: a message that seems to be from a director, asking for an urgent payment, gift cards or confidential data, often saying they're \"in a meeting\" and can't talk",
          "Booby-trapped attachments: \"CVs\" or \"job specs\" that ask you to enable macros or editing, or that come as zip files",
          "Fake login pages: links to pages that look like Microsoft 365 or Bullhorn, built to steal passwords",
          "Calls and voice messages: callers pretending to be IT, a bank or a client. Some scammers now use AI to copy real people's voices",
          "QR codes in emails or letters that lead to fake login pages",
        ]),
        scenario("You get an email from a contractor you placed: \"I've changed banks. Please update my details before this week's pay run.\" The email address looks right and the message sounds like him. What do you do?", [
          ["Update the details: it's from his email address", false, "Email accounts get hacked, and addresses can be faked. Payment diversion fraud works exactly like this."],
          ["Don't act on the email. Call the contractor on the number you already have to check, and follow the payroll team's process for bank changes", true, "Right. Always verify bank detail changes by a different route, using contact details you already hold, never the ones in the message."],
          ["Reply to the email asking him to confirm", false, "If his account has been hacked, the scammer will simply confirm."],
        ]),
        scenario("A Teams message from a director's name says: \"Are you free? I'm in back-to-back meetings and need you to buy six £100 gift cards for a client today. Send me the codes and I'll sort out expenses later.\" What do you do?", [
          ["Buy them quickly: you don't want to let the director down", false, "Urgency, secrecy and gift cards are classic signs of CEO fraud."],
          ["Don't buy anything. Check with the director through a different route, such as a phone call, and report the message to IT", true, "Right. No genuine director will ask you to buy gift cards and send them the codes. Verify, and report it."],
          ["Buy one card to test whether it's genuine", false, "Any money sent to a scammer is lost. Verify first."],
        ]),
      ],
    },
    {
      title: "Devices, software and connections",
      summary: "Keeping laptops, phones and connections secure, wherever you work.",
      blocks: [
        doDont(
          ["Install updates when prompted: they fix security holes attackers use", "Lock your devices whenever you step away, and use a PIN or biometrics on your phone", "Use the company VPN, or your phone's hotspot, instead of public Wi-Fi", "Report a lost or stolen device to IT straight away, whatever the time", "Only install software and apps IT has approved"],
          ["Put off updates for days or weeks", "Turn off antivirus or other security tools", "Plug in USB sticks you've found or been given", "Let family or friends use your work devices", "Use unapproved AI tools or file-sharing sites for work data"],
        ),
        checklist("Check your own set-up", [
          "My laptop and phone are up to date",
          "Both lock automatically, with a PIN, password or biometrics",
          "Multi-factor authentication is on for my work accounts",
          "My work passwords are in the password manager, and not used anywhere else",
          "I know how to contact IT out of hours if a device is lost or stolen",
        ]),
      ],
    },
    {
      title: "When something goes wrong",
      summary: "The signs of an attack, and what to do in the first few minutes.",
      blocks: [
        text(null, "Speed matters. The sooner IT knows, the less damage an attacker can do. Report straight away if you notice:", [
          "You've clicked a suspicious link, opened an attachment or entered your password on a page that wasn't right",
          "Sign-in prompts, password reset emails or MFA requests you didn't start",
          "Emails in your sent items that you didn't send, or contacts asking about strange messages from you",
          "Files you can't open, renamed files, or a message demanding payment (ransomware)",
          "Your device suddenly running very slowly, with unexpected pop-ups or programs",
        ]),
        keyPoints("In the first few minutes", [
          "Report it to IT straight away, and tell them exactly what happened.",
          "If you entered your password somewhere suspicious, change it straight away (from a different device if you can).",
          "If you see a ransomware message, disconnect from the network (turn off Wi-Fi or unplug the network cable) and call IT. Don't pay anything.",
          "Don't try to fix it yourself, and don't delete anything: IT may need the evidence.",
          "If personal data may be involved, IT will involve our data protection contact, as it may be a data breach.",
        ]),
        scenario("You opened a \"CV\" attachment that asked you to click Enable Editing, and now your laptop is behaving strangely. It's late on a Friday. What do you do?", [
          ["Shut down and deal with it on Monday", false, "Attackers work weekends. A few hours can let malware spread or data leave."],
          ["Disconnect from the network and report it to IT straight away, using the out-of-hours contact", true, "Right. Disconnecting limits the spread, and IT can act straight away."],
          ["Run a virus scan and say nothing if it comes back clean", false, "Scans can miss new threats. IT needs to know, whatever the scan says."],
        ]),
        keyPoints("Remember", [
          "Three random words, a different password for every account, and MFA.",
          "Never approve a sign-in prompt you didn't start.",
          "Verify payment and bank changes by phone, using details you already have.",
          "Update, lock and look after your devices.",
          "Report anything suspicious straight away. Speed beats perfection.",
        ]),
      ],
    },
  ],
  questions: [
    q("What's the NCSC's advice for a strong password?", ["Three random words", "Your name and year of birth", "Eight characters with a symbol", "The same password everywhere, so you remember it"], 1, "Three random words are long, hard to guess and memorable."),
    q("Why shouldn't you reuse your work password on other websites?", ["If one site is breached, attackers try the same password on your other accounts", "It's slower to type", "Websites don't allow it", "It uses up storage"], 1, "This is called credential stuffing."),
    q("What does multi-factor authentication do?", ["Asks for something extra as well as your password, so a stolen password isn't enough", "Makes your password longer", "Lets IT see your password", "Turns off antivirus"], 1, "MFA stops most account takeovers."),
    q("You get an MFA prompt on your phone that you didn't start. What should you do?", ["Deny it, report it to IT and change your password", "Approve it to make it stop", "Ignore it", "Turn your phone off"], 1, "An unexpected prompt means someone may have your password."),
    q("A contractor emails to say their bank details have changed. What should you do?", ["Verify by phone using the number you already have, and follow the payroll process", "Update the details straight away", "Reply to the email to confirm", "Forward it to the client"], 1, "Always verify bank changes by a different route."),
    q("A message from a director asks you to buy gift cards urgently and send the codes. What is this likely to be?", ["CEO fraud: verify by another route and report it", "A normal request", "A test from HR", "A client gift"], 1, "Urgency, secrecy and gift cards are classic signs."),
    q("A \"CV\" attachment asks you to enable macros or editing. What should you do?", ["Don't enable it: report it to IT", "Enable it to read the CV", "Forward it to a colleague to open", "Print it"], 1, "Requests to enable content are a common way to deliver malware."),
    q("Why should you install updates promptly?", ["They fix security holes attackers use", "They make the screen brighter", "They're only cosmetic", "They're optional"], 1, "Many attacks target old, unpatched software."),
    q("You're working in a café. How should you connect?", ["Use the company VPN or your phone's hotspot", "Use the café's open Wi-Fi as normal", "Use any network without a password", "Ask the person next to you for theirs"], 1, "Public Wi-Fi can be watched or faked."),
    q("Your work phone is stolen at the weekend. What do you do?", ["Report it to IT straight away", "Wait until Monday", "Buy a new one and say nothing", "Post about it on social media"], 1, "IT can lock and wipe the device remotely."),
    q("You find a USB stick in the car park. What should you do?", ["Don't plug it in: hand it to IT", "Plug it in to find the owner", "Use it for your own files", "Give it to reception to plug in"], 1, "Unknown USB sticks can carry malware."),
    q("You entered your password on a page that didn't look right. What first?", ["Change your password and report it to IT straight away", "Wait to see if anything happens", "Clear your browser history", "Log out and forget about it"], 1, "Speed limits the damage."),
    q("A message on your screen says your files are encrypted and demands payment. What do you do?", ["Disconnect from the network, call IT, and don't pay", "Pay the ransom", "Restart the laptop and carry on", "Delete the files"], 1, "Disconnecting limits the spread. Never pay."),
    q("Can a scammer copy a real person's voice on a phone call?", ["Yes: AI can be used to imitate voices, so verify unusual requests", "No, it's impossible", "Only in films", "Only on video calls"], 1, "Verify unusual requests through a known route."),
    q("Which of these is a sign your email account may have been compromised?", ["Emails in your sent items that you didn't send", "A colleague replying to your email", "A meeting invitation from your manager", "A newsletter you subscribed to"], 1, "Report it to IT straight away."),
  ],
  sources: [
    ["National Cyber Security Centre: Top tips for staff", "https://www.ncsc.gov.uk/training/top-tips-for-staff-web/"],
    ["NCSC: Three random words", "https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/three-random-words"],
    ["NCSC: Multi-factor authentication", "https://www.ncsc.gov.uk/guidance/setting-two-factor-authentication-2fa"],
    ["NCSC: Business email compromise", "https://www.ncsc.gov.uk/guidance/business-email-compromise"],
    ["UK Government: Cyber security breaches survey", "https://www.gov.uk/government/collections/cyber-security-breaches-survey"],
    ["US Cybersecurity and Infrastructure Security Agency (CISA): Secure our world", "https://www.cisa.gov/secure-our-world"],
  ],
  reviewNotes: `Please check or fill in before sign-off. Ask IT to review this course too.
1. Name the password manager we use, and confirm MFA is switched on for all work accounts.
2. How to contact IT, including out of hours, and how to report phishing (Outlook Report button, forwarding address).
3. Confirm we have a VPN. If not, change the advice to "use your phone's hotspot".
4. Payment changes: confirm the payroll and finance process for contractor and supplier bank detail changes, and link to it.
5. Personal devices: if staff can use their own phones or laptops for work, add a line on our policy.
6. AI tools: list approved tools, or link to the policy.
7. Assessment: 10 questions drawn from 15, pass mark 80%, renew every 12 months.`,
};
