// Modern Slavery (Global). Written from the Modern Slavery Act 2015, Home Office statutory guidance,
// the ILO/Walk Free Global Estimates and the US Trafficking Victims Protection Act.
// For review and sign-off by HR and Compliance before it counts.
import { text, keyPoints, law, doDont, stat, sorter, scenario, q } from "./kit.js";

export default {
  slug: "modern-slavery",
  title: "Modern Slavery (Global)",
  category: "ethics",
  region: "global",
  order: 30,
  icon: "hand",
  accent: "brand",
  minutes: 25,
  renewMonths: 12,
  passMark: 80,
  questionsPerAttempt: 10,
  summary: "What modern slavery is, why recruitment is on the front line, how to spot the signs in candidates, contractors and supply chains, and what to do.",
  intro: "Modern slavery is happening now, in every country, including the UK and the US. Recruitment is one of the main routes into it: exploiters use fake job offers, recruitment fees and debts to trap people. As recruiters, we're well placed to spot the signs. This course shows you what to look for and what to do. It takes about 25 minutes and ends with an assessment: you need 80% to pass.",
  outcomes: [
    "Explain what modern slavery is, and the forms it takes",
    "Explain why recruitment is a high-risk area",
    "Spot the warning signs in candidates, contractors and suppliers",
    "Know what to do, and what not to do, if you're concerned",
    "Explain what the law expects of businesses like ours",
  ],
  lessons: [
    {
      title: "What modern slavery is",
      summary: "The definition, the forms it takes, and the scale.",
      blocks: [
        text(null, "Modern slavery is when someone is controlled and exploited by others for their gain, and can't leave because of threats, violence, deception, debt or abuse of power. It isn't only historical, and it isn't only abroad."),
        stat("50 million", "people were living in modern slavery on any given day in 2021: 28 million in forced labour and 22 million in forced marriage", "ILO, Walk Free and IOM, Global Estimates of Modern Slavery (2022)"),
        law("Modern Slavery Act 2015 (UK)", "Makes slavery, servitude, forced or compulsory labour, and human trafficking criminal offences, with a maximum sentence of life imprisonment. Victims can be adults or children, and can be UK nationals as well as people from abroad."),
        text("The main forms", null, [
          "Forced labour: work done under threat of a penalty, which the person hasn't freely agreed to",
          "Debt bondage: being forced to work to pay off a debt, often a recruitment fee or travel cost, that can never realistically be repaid. The most common form worldwide",
          "Human trafficking: moving, recruiting or harbouring someone in order to exploit them. They don't have to cross a border",
          "Domestic servitude: being forced to work in a private home, often with no pay and no freedom",
          "Criminal exploitation: being forced into crime, such as drug dealing (\"county lines\") or cannabis farming",
          "Sexual exploitation, and forced marriage",
        ]),
        sorter("Is it modern slavery?", "Decide for each one.", ["Likely modern slavery", "Poor practice, not slavery"], [
          ["A worker must work off a \"recruitment fee\" that grows every month, and their passport is kept until it's paid", "Likely modern slavery", "Debt bondage and document retention are two classic signs of control."],
          ["A worker is paid late one month because of a payroll error that's then fixed", "Poor practice, not slavery", "A genuine mistake, put right, isn't exploitation, though it should still be fixed fast."],
          ["Workers are housed by their employer, threatened with being reported to the authorities if they leave, and paid far below the minimum wage", "Likely modern slavery", "Threats, control of housing and very low pay together point to forced labour."],
          ["A contractor is unhappy with their day rate and wants to renegotiate", "Poor practice, not slavery", "A normal commercial disagreement. They're free to negotiate or leave."],
        ]),
      ],
    },
    {
      title: "Why recruitment is on the front line",
      summary: "How exploiters use recruitment, and where our own risks lie.",
      blocks: [
        text(null, "Many victims are recruited with a promise of a good job. Exploiters charge them fees for the job, travel or accommodation, then use the debt to control them. Others are supplied to businesses through chains of agencies and subcontractors, where nobody checks who is actually doing the work.\n\nOur work is mostly professional and technical, so the risk on our own desks is lower than in some sectors. But it isn't zero, and we also see into our clients', suppliers' and contractors' supply chains."),
        law("Employment Agencies Act 1973 and the Conduct Regulations 2003 (UK)", "Agencies must not charge work-seekers a fee for finding them work (apart from a few specific sectors, such as entertainment and modelling). Charging workers recruitment fees is one of the main routes into debt bondage worldwide. Responsible businesses follow the Employer Pays Principle: the employer, never the worker, pays the cost of recruitment."),
        keyPoints("Where the risk is for us", [
          "Contractors supplied through third parties, such as overseas partners, umbrella companies or subcontractors, where we don't deal with the person directly.",
          "Offshore delivery and SOW projects, where work is passed to partners in other countries.",
          "Suppliers to our own business: cleaning, security, catering, IT hardware and branded goods.",
          "Candidates who may be under someone else's control, and are being \"placed\" by them.",
        ]),
      ],
    },
    {
      title: "Spot the signs",
      summary: "What to look out for in candidates, contractors and suppliers.",
      blocks: [
        text(null, "No single sign proves someone is being exploited, and some signs have innocent explanations. But several together, or one that just doesn't feel right, are worth raising."),
        doDont(
          ["Notice if someone else always speaks for the candidate, or seems to be in control", "Notice if a candidate seems scared, anxious, or unsure of their own address or employer", "Notice if several workers share one address, phone number or bank account", "Notice if someone else holds a worker's passport or ID", "Notice if pay goes to a third party, or a worker owes money for getting the job", "Notice if a supplier's prices are too low to pay their workers fairly"],
          ["Assume it can't happen in professional or office roles", "Ignore your instinct because the paperwork looks fine", "Dismiss the signs because the candidate says everything's OK. Victims often don't see themselves as victims, or are too afraid to say"],
        ),
        sorter("Red flag, or normal?", "Decide for each one.", ["Red flag", "Normal"], [
          ["Three contractors placed through the same partner all give the same bank account for pay", "Red flag", "Someone else may be controlling their wages."],
          ["A candidate's \"manager\" joins every call, answers for them and won't let them speak alone", "Red flag", "A sign of control. Try to speak to the person on their own."],
          ["A candidate says they owe an agent abroad a large fee for finding them this role", "Red flag", "Recruitment debts are a classic route into debt bondage."],
          ["A worker says their passport is \"being kept safe\" by their accommodation provider", "Red flag", "Nobody should hold another person's identity documents. It's a common way to control people."],
          ["A contractor is paid through an umbrella company that gives them clear payslips", "Normal", "A common, legitimate arrangement, as long as the worker gets their pay and payslips."],
          ["A candidate asks about holiday entitlement and notice periods", "Normal", "Normal questions about working conditions."],
        ]),
      ],
    },
    {
      title: "What to do if you're concerned",
      summary: "Report it, keep people safe, and don't investigate on your own.",
      blocks: [
        keyPoints("If you're worried about someone", [
          "If someone is in immediate danger, call the police: 999 in the UK, 911 in the US.",
          "Otherwise, report your concern to your manager and the Compliance team straight away.",
          "Write down what you saw or heard, and when, in plain facts.",
          "Don't confront anyone you suspect of exploiting someone. It could put the person, and you, at risk.",
          "Don't try to investigate, or promise the person anything you can't deliver.",
        ]),
        text("Helplines", "You can also get advice in confidence, any time:", [
          "UK: Modern Slavery and Exploitation Helpline, 08000 121 700",
          "US: National Human Trafficking Hotline, 1-888-373-7888, or text 233733",
        ]),
        scenario("You're interviewing a contractor supplied by an overseas partner. A man who says he's her \"coordinator\" answers every question for her, and mentions she'll \"pay back her travel costs\" from her first months' wages. She seems nervous and avoids eye contact. What do you do?", [
          ["Carry on: the partner vouches for her and the paperwork is fine", false, "Paperwork can be faked or controlled. Several signs here suggest she may not be free."],
          ["Ask the coordinator to leave so you can speak with her alone, then report what you saw to your manager and Compliance the same day", true, "Right. Speaking to her alone, if it's safe to, can help. Either way, report your concerns straight away and let the right people decide what happens next."],
          ["Confront the coordinator and tell him what he's doing is illegal", false, "Confronting him could put her at greater risk. Report it, and let the right people act."],
        ]),
        scenario("A long-standing supplier offers to provide cleaning for our office at a price far below anyone else's. When you ask how, they say their workers \"live on site and don't need much\". What do you do?", [
          ["Accept: it's a great saving", false, "A price far below the market can mean someone isn't being paid fairly."],
          ["Don't proceed, and raise it with the person responsible for suppliers and with Compliance", true, "Right. Unrealistically low prices and workers living on site are warning signs that need checking before we do business."],
          ["Accept, but ask them to sign a contract saying they follow the law", false, "A signature isn't enough when the warning signs are this clear. Raise it first."],
        ]),
      ],
    },
    {
      title: "The law and our responsibilities",
      summary: "What the law expects of businesses, in the UK and the US.",
      blocks: [
        law("Modern Slavery Act 2015, section 54: transparency in supply chains", "Businesses that operate in the UK with an annual turnover of £36 million or more must publish a modern slavery statement every year, setting out what they do to find and prevent modern slavery in their business and supply chains. Clients often ask suppliers like us for the same information."),
        law("United States: the Trafficking Victims Protection Act", "Makes human trafficking and forced labour federal crimes. US federal contractors have extra anti-trafficking duties, and some states, such as California, require large businesses to disclose what they do to tackle slavery and trafficking in their supply chains."),
        text("What it means for you", null, [
          "Follow our processes for checking candidates, contractors, partners and suppliers. Don't skip steps to save time.",
          "Never charge a candidate or contractor a fee for finding them work.",
          "Answer client questions about modern slavery accurately. If you don't know the answer, ask Compliance.",
          "Speak up about anything that doesn't feel right. You won't be in trouble for raising a genuine concern.",
        ]),
        keyPoints("Remember", [
          "Modern slavery is real, and recruitment is one of the routes into it.",
          "Watch for control: documents held, debts owed, someone else speaking or being paid.",
          "Report concerns straight away. Never confront or investigate on your own.",
        ]),
      ],
    },
  ],
  questions: [
    q("Which of these is a form of modern slavery?", ["Debt bondage: being forced to work to pay off a debt that can't realistically be repaid", "Working overtime by choice for extra pay", "Being on a fixed-term contract", "Negotiating a lower day rate"], 1, "Debt bondage is the most common form of modern slavery worldwide."),
    q("Under the Modern Slavery Act 2015, can a UK national be a victim?", ["Yes: victims can be any nationality, including British", "No: only people from abroad", "Only children", "Only if they've crossed a border"], 1, "Victims can be anyone. Trafficking doesn't even require crossing a border."),
    q("Does human trafficking require someone to cross a border?", ["No: people can be trafficked within one country", "Yes, always", "Only in the US", "Only for sexual exploitation"], 1, "Moving or harbouring someone in order to exploit them is trafficking, even within one town."),
    q("Can a UK recruitment agency charge a candidate a fee for finding them work?", ["No, apart from a few specific sectors such as entertainment and modelling", "Yes, if the candidate agrees", "Yes, for overseas candidates", "Yes, if it's taken from their first pay"], 1, "Agencies must not charge work-seekers fees for finding them work, with very limited exceptions."),
    q("What is the Employer Pays Principle?", ["The employer, never the worker, pays the cost of recruitment", "Employers pay all workers the same", "Employers pay agency fees in advance", "Workers pay their own travel costs"], 1, "Workers shouldn't pay to get a job: fees are a main route into debt bondage."),
    q("Several contractors placed through one partner all give the same bank account for their pay. What does this suggest?", ["Someone else may be controlling their wages: report it", "They share a flat, so it's fine", "It saves on admin", "Nothing: banks check these things"], 1, "Shared bank accounts are a warning sign of control."),
    q("A worker says their passport is being \"kept safe\" by their accommodation provider. Is this a concern?", ["Yes: holding someone's documents is a common way to control them", "No: it's a kind thing to do", "Only if they want to travel", "Only if it's kept for more than a year"], 1, "Nobody should hold another person's identity documents."),
    q("A candidate's \"coordinator\" answers every question for them at interview. What's the best action?", ["Try to speak to the candidate alone, then report your concerns", "Carry on: it saves time", "Confront the coordinator", "Reject the candidate and say nothing"], 1, "Speaking to them alone may help, and reporting lets the right people act."),
    q("You suspect someone is being exploited, but they're not in immediate danger. What should you do?", ["Report it to your manager and Compliance straight away", "Investigate it yourself first", "Confront the suspected exploiter", "Wait until you have proof"], 1, "Report concerns straight away. You don't need proof."),
    q("Someone is in immediate danger. What do you do?", ["Call the police: 999 in the UK, 911 in the US", "Email Compliance", "Wait until the next working day", "Post about it on social media"], 1, "Immediate danger always means the police first."),
    q("What is the UK Modern Slavery and Exploitation Helpline number?", ["08000 121 700", "111", "101", "0300 123 1234"], 1, "08000 121 700, open any time."),
    q("A supplier's price is far below everyone else's, and their workers \"live on site\". What should you do?", ["Don't proceed: raise it with the person responsible for suppliers and Compliance", "Accept the saving", "Accept if they sign a declaration", "Ask for a bigger discount"], 1, "Unrealistically low prices can mean workers aren't being paid fairly."),
    q("Which UK businesses must publish an annual modern slavery statement?", ["Those with an annual turnover of £36 million or more", "All businesses, of any size", "Only public bodies", "Only manufacturers"], 1, "Section 54 of the Modern Slavery Act 2015 applies from £36 million turnover."),
    q("Which of these is normal, not a red flag?", ["A contractor paid through an umbrella company that gives them clear payslips", "A worker who owes an agent a large fee for their job", "Someone else holding a worker's passport", "Several workers sharing one bank account"], 1, "Umbrella companies are a common, legitimate arrangement."),
    q("A victim tells you they're fine and don't need help. What should you do?", ["Still report your concerns: victims often don't see themselves as victims, or are too afraid to say", "Accept it and do nothing", "Tell them they're wrong", "Ask their employer whether they're fine"], 1, "Fear and control often stop people asking for help. Report what you've seen."),
  ],
  sources: [
    ["Modern Slavery Act 2015", "https://www.legislation.gov.uk/ukpga/2015/30/contents"],
    ["Home Office: Modern slavery statutory guidance", "https://www.gov.uk/government/publications/modern-slavery-how-to-identify-and-support-victims"],
    ["Modern Slavery and Exploitation Helpline (Unseen)", "https://www.modernslaveryhelpline.org/"],
    ["ILO, Walk Free and IOM: Global Estimates of Modern Slavery", "https://www.ilo.org/publications/major-publications/global-estimates-modern-slavery-forced-labour-and-forced-marriage"],
    ["US National Human Trafficking Hotline", "https://humantraffickinghotline.org/"],
    ["Institute for Human Rights and Business: the Employer Pays Principle", "https://www.ihrb.org/employerpays"],
  ],
  reviewNotes: `Please check or fill in before sign-off:
1. Lesson 4: confirm who staff report concerns to (manager and Compliance, a named lead, or a whistleblowing route), and add Stott and May's whistleblowing contact if there's one.
2. Lesson 5: does Stott and May publish a modern slavery statement (required from £36m turnover, and often asked for by clients)? If so, add a link and a line saying what's in it.
3. Lesson 2: confirm the "where the risk is for us" list fits our business (overseas partners, umbrella companies, SOW delivery partners, our own suppliers).
4. Lesson 1: the 50 million figure is from the 2022 Global Estimates (for 2021). Check whether a newer edition has been published.
5. Helpline numbers (lesson 4): UK 08000 121 700; US 1-888-373-7888 or text 233733. Check they're still current before sign-off.
6. Assessment: 10 questions drawn from 15, pass mark 80%, renew every 12 months.`,
};
