// Neurodiversity Awareness, for UK and US staff. Written from Acas guidance on neurodiversity at work,
// the Equality Act 2010, the UK Government's Access to Work scheme and, for the US, the Americans with
// Disabilities Act and New York State and City human rights law. For review and sign-off by HR and
// Compliance before it counts.
import { text, keyPoints, law, doDont, stat, sorter, scenario, q } from "./kit.js";

export default {
  slug: "neurodiversity-awareness",
  title: "Neurodiversity Awareness",
  category: "conduct",
  region: "global",
  order: 40,
  icon: "brain",
  accent: "brand",
  minutes: 30,
  renewMonths: 12,
  passMark: 80,
  questionsPerAttempt: 10,
  summary: "What neurodiversity is, the myths to drop, how to communicate well, the law and reasonable adjustments, and how to recruit in a neuroinclusive way.",
  intro: "Around one in seven people in the UK is neurodivergent: their brain works differently in ways that bring real strengths, and sometimes challenges in workplaces built for everyone else. That includes colleagues, candidates and clients. This course explains neurodiversity, how to be an inclusive colleague, and how to run a recruitment process that gives neurodivergent candidates a fair chance. It takes about 30 minutes and ends with an assessment: you need 80% to pass.",
  outcomes: [
    "Explain what neurodiversity is, and name common neurodivergent conditions",
    "Separate the common myths from the facts",
    "Communicate clearly and respectfully with neurodivergent colleagues and candidates",
    "Explain the duty to make reasonable adjustments (in the US, reasonable accommodations)",
    "Run a neuroinclusive recruitment process, and advise clients on one",
  ],
  lessons: [
    {
      title: "What neurodiversity means",
      summary: "Different brains, different strengths, and the conditions involved.",
      blocks: [
        text(null, "Neurodiversity means the natural differences in how people's brains work: how we think, learn, focus, communicate and process information. Most people are neurotypical, meaning their brain works in the way society usually expects. People whose brains work differently are neurodivergent."),
        stat("1 in 7", "people in the UK, more than 15%, are thought to be neurodivergent", "Acas"),
        text("Common neurodivergent conditions", "Each condition shows up differently in different people, and many people have more than one:", [
          "Autism: differences in social communication and interaction, often with strong focus, a preference for routine, and sensory sensitivities",
          "ADHD (attention deficit hyperactivity disorder): differences in attention, activity levels and impulsivity, often with energy, creativity and the ability to hyperfocus",
          "Dyslexia: differences in processing written language, such as reading and spelling, often with strong problem-solving and big-picture thinking",
          "Dyspraxia (developmental coordination disorder): differences in physical coordination, and sometimes organisation and planning",
          "Dyscalculia: differences in understanding numbers and maths",
          "Tourette's syndrome: involuntary sounds and movements called tics",
        ]),
        keyPoints("Worth knowing", [
          "Many people, especially adults and women, have never been diagnosed. Some find out in their 30s, 40s or later.",
          "Neurodivergent people often have a \"spiky profile\": great strengths in some areas, and challenges in others.",
          "Many challenges come from the environment (noise, unclear instructions, rigid processes) rather than the person.",
        ]),
      ],
    },
    {
      title: "Myths and facts",
      summary: "Common misunderstandings, and what's actually true.",
      blocks: [
        sorter("Myth, or fact?", "Decide for each one.", ["Myth", "Fact"], [
          ["Autistic people don't feel empathy", "Myth", "Many autistic people feel deeply, but may show it differently. Misunderstanding often runs both ways, between autistic and non-autistic people."],
          ["ADHD is just a lack of focus that children grow out of", "Myth", "ADHD often continues into adulthood, and affects attention, activity and impulsivity. Many people with ADHD can focus intensely on things that interest them."],
          ["Dyslexia is linked to low intelligence", "Myth", "Dyslexia affects how people process written language. It has nothing to do with intelligence."],
          ["Many neurodivergent people have never been diagnosed", "Fact", "Diagnosis can be hard to get, and many adults, particularly women, are diagnosed late or not at all."],
          ["Small changes, like putting instructions in writing, can make a big difference", "Fact", "Many helpful adjustments cost little or nothing, and often help everyone."],
          ["All autistic people have the same needs", "Myth", "Every person is different. Ask the person what works for them."],
          ["Neurodivergent people can be some of an organisation's best performers when the environment works for them", "Fact", "Strengths like focus, pattern-spotting, creativity and problem-solving are valuable in many roles."],
        ]),
        text(null, "A note on jokes: comments like \"I'm a bit OCD about my desk\" or \"we're all a bit autistic\" can feel dismissive to people living with these conditions every day. They make it harder for people to talk openly about what they need."),
      ],
    },
    {
      title: "Language and communication",
      summary: "Talking about neurodiversity respectfully, and communicating so everyone can follow.",
      blocks: [
        text("Language", "People have different preferences. Many autistic people prefer identity-first language (\"an autistic person\"), while others prefer person-first language (\"a person with dyslexia\"). The best approach is to listen to the words someone uses about themselves, and use those.\n\nAvoid language that suggests suffering or that labels people's worth, such as \"suffers from\", \"special needs\" or \"high-functioning\" and \"low-functioning\"."),
        doDont(
          ["Be clear and direct, and say exactly what you mean", "Put key points, actions and deadlines in writing", "Share agendas and questions before meetings", "Give people time to think before they answer", "Ask \"What works best for you?\"", "Offer choices, such as camera on or off, call or message"],
          ["Rely on hints, sarcasm or unspoken expectations", "Judge someone on eye contact or small talk", "Change plans at the last minute without explaining", "Share someone's diagnosis without their permission", "Assume you know what someone needs because of a label"],
        ),
        scenario("A new colleague's emails are very brief and direct: \"No. That won't work. Use the other template.\" Some of the team think they're being rude. What's the most helpful response?", [
          ["Tell your manager the colleague is being rude", false, "Direct isn't the same as rude. It may simply be how they communicate."],
          ["Assume good intent, and if something's unclear, ask them directly. If tone is causing friction in the team, talk to the colleague privately and kindly about it", true, "Right. Clear, direct communication works both ways. A private, respectful conversation helps everyone understand each other's styles."],
          ["Ignore their emails and work it out yourself", false, "That leaves the misunderstanding in place, and may leave the colleague isolated."],
        ]),
      ],
    },
    {
      title: "The law and reasonable adjustments",
      summary: "What the Equality Act requires, and the kinds of support that help.",
      blocks: [
        law("UK: Equality Act 2010", "A person is disabled under the Act if they have a physical or mental impairment that has a substantial and long-term (12 months or more) adverse effect on their ability to carry out normal day-to-day activities. Many neurodivergent people meet this definition.\n\nEmployers must make reasonable adjustments to remove disadvantages disabled people face, including job applicants. It's unlawful to discriminate against, harass or victimise someone because of a disability."),
        keyPoints("What you need to know", [
          "Someone doesn't need a formal diagnosis to ask for support. Focus on what they need.",
          "Adjustments should be agreed with the person, and reviewed if things change.",
          "Information about someone's condition is confidential and sensitive. Only share it with the people who need it, and with the person's agreement.",
          "In the UK, the Government's Access to Work scheme can help fund support such as equipment, coaching or assistive software.",
        ]),
        text("Examples of reasonable adjustments", null, [
          "Written instructions and summaries of meetings",
          "A quieter place to work, or noise-cancelling headphones",
          "Flexible hours, or regular short breaks",
          "Assistive technology, such as text-to-speech or mind-mapping software",
          "Clear priorities and deadlines, and regular one-to-ones",
          "Extra time for written tasks or tests",
          "Advance notice of changes",
        ]),
        scenario("A colleague tells you, in confidence, that they've just been diagnosed with ADHD. They're struggling with an open-plan office and back-to-back calls, but don't want the team to know. What do you do?", [
          ["Tell the team so they can be understanding", false, "It's their information to share, not yours. Telling others without permission breaks their trust and could be unlawful."],
          ["Thank them for telling you, keep it confidential, and encourage them to talk to their manager or HR about adjustments, offering to help them prepare if they'd like", true, "Right. Respect their privacy, and point them towards the support they're entitled to ask for."],
          ["Suggest they don't mention it to anyone, in case it affects their career", false, "Asking for adjustments is their right, and Stott and May must consider them fairly."],
        ]),
        law("If you work in the US", "The Americans with Disabilities Act (ADA) protects qualified people with disabilities from discrimination, and requires employers to provide reasonable accommodations, the US term for reasonable adjustments, unless that would cause undue hardship. Many neurodivergent conditions can be disabilities under the ADA.\n\nNew York State and New York City human rights law go further. In New York City, employers must engage in a \"cooperative dialogue\" with anyone who asks for an accommodation, or who they know may need one, and confirm the outcome in writing. The UK's Access to Work scheme doesn't apply in the US: ask HR what support is available."),
      ],
    },
    {
      title: "Neuroinclusive recruitment",
      summary: "Giving neurodivergent candidates a fair chance, and helping clients do the same.",
      blocks: [
        text(null, "Traditional recruitment can unfairly screen out neurodivergent candidates: vague job ads, unexpected questions, judging on eye contact and small talk, and \"culture fit\". As recruiters, we can change that for our candidates, and advise our clients on how to do the same.\n\nJob applicants are protected too, by the Equality Act in the UK and the ADA and New York law in the US, so employers must make reasonable adjustments (accommodations) in the hiring process."),
        doDont(
          ["Ask every candidate: \"Is there anything that would help you at interview?\"", "Share the interview format, who'll be there and how long it'll take", "Suggest clients share questions in advance, or allow written answers", "Separate essential requirements from nice-to-haves in job ads", "Judge candidates on their skills and what they can do"],
          ["Mark candidates down for limited eye contact, fidgeting or a direct manner", "Use vague phrases like \"excellent communication skills\" unless the role really needs them", "Share a candidate's condition with a client without the candidate's clear agreement", "Assume a candidate can't do a role because of their condition"],
        ),
        scenario("A strong candidate tells you they're autistic and asks whether they can see the interview questions in advance. The client's hiring manager says, \"We don't do that. It wouldn't be fair on the others.\" What do you do?", [
          ["Tell the candidate it isn't possible", false, "That may leave the candidate at a disadvantage the client is legally required to consider removing."],
          ["With the candidate's agreement on what you share, explain to the client that this is a reasonable adjustment, which helps them assess the candidate's real ability, and suggest options such as sharing the topics in advance", true, "Right. Adjustments level the playing field rather than giving an unfair advantage. You're helping the client hire well and stay within the law."],
          ["Send the client the candidate's diagnosis so they understand", false, "Only share what the candidate agrees to. Often the adjustment is all the client needs to know about."],
        ]),
        scenario("A client's interview feedback on an excellent candidate says: \"Technically brilliant, but didn't make eye contact and seemed a bit odd. Not a culture fit.\" What's the best response?", [
          ["Pass the feedback on and move on to the next candidate", false, "The feedback is about style, not ability, and could reflect bias against a neurodivergent candidate."],
          ["Gently challenge it: ask the client how the candidate measured against the role's actual requirements, and whether eye contact matters for the job", true, "Right. Steering feedback back to the requirements helps the client avoid bias, and avoid missing a great hire."],
          ["Tell the candidate to practise making more eye contact", false, "The problem is how the candidate was judged, not the candidate."],
        ]),
      ],
    },
  ],
  questions: [
    q("About how many people in the UK are thought to be neurodivergent?", ["Around 1 in 7", "Around 1 in 100", "Around 1 in 1,000", "Around 1 in 2"], 1, "Acas estimates more than 15%, around 1 in 7."),
    q("Which of these is a neurodivergent condition?", ["Dyslexia", "Hay fever", "Short-sightedness", "Asthma"], 1, "Dyslexia, autism, ADHD, dyspraxia, dyscalculia and Tourette's syndrome are common examples."),
    q("What does a \"spiky profile\" mean?", ["Strong abilities in some areas, and challenges in others", "Someone who is easily annoyed", "Someone who is good at everything", "A type of CV format"], 1, "Many neurodivergent people have uneven strengths and challenges."),
    q("Is dyslexia linked to intelligence?", ["No: it affects processing written language, not intelligence", "Yes, always", "Only in adults", "Only when undiagnosed"], 1, "Dyslexia isn't related to intelligence."),
    q("What's the best way to know which language someone prefers about their neurodivergence?", ["Listen to how they describe themselves, and use the same words", "Always use person-first language", "Always use identity-first language", "Avoid the subject entirely"], 1, "Preferences vary, so follow the person's lead."),
    q("Which of these helps communication with neurodivergent colleagues?", ["Putting key points and actions in writing", "Relying on hints and unspoken expectations", "Changing plans at the last minute", "Using sarcasm to keep things light"], 1, "Clear, written communication helps many people, and often everyone."),
    q("In the UK, under the Equality Act 2010, what makes an impairment a disability?", ["A substantial and long-term adverse effect on normal day-to-day activities", "Any condition with a diagnosis", "Only physical impairments", "Only conditions that started in childhood"], 1, "Substantial, long-term (12 months or more) effect on day-to-day activities."),
    q("Does someone need a formal diagnosis to ask for support at work?", ["No: focus on what they need", "Yes, always", "Only for physical adjustments", "Only after six months' service"], 1, "Support can be discussed without a formal diagnosis."),
    q("Which of these is a reasonable adjustment?", ["Noise-cancelling headphones or a quieter place to work", "Moving the person to a different team without asking", "Giving them less important work", "Telling the team about their condition"], 1, "Adjustments are agreed with the person to remove a disadvantage."),
    q("A colleague tells you about their diagnosis in confidence. What should you do?", ["Keep it confidential, and encourage them to talk to their manager or HR about support if they'd like", "Tell the team so they understand", "Tell your manager straight away", "Write it in their record"], 1, "It's their information to share."),
    q("Are job applicants protected by the Equality Act?", ["Yes: employers must make reasonable adjustments in the hiring process", "No: only employees", "Only once they've been offered the job", "Only for physical disabilities"], 1, "Applicants are protected, so recruitment needs to be fair and accessible."),
    q("What should you ask every candidate before an interview?", ["\"Is there anything that would help you at interview?\"", "\"Do you have a disability?\"", "\"Are you neurodivergent?\"", "Nothing: it's up to them to raise it"], 1, "Asking everyone makes it easy to request adjustments without having to disclose a condition."),
    q("A client wants to mark a candidate down for not making eye contact. What do you do?", ["Steer the feedback back to the role's actual requirements", "Agree: eye contact shows confidence", "Tell the candidate to practise eye contact", "Withdraw the candidate"], 1, "Judging on eye contact can be biased against neurodivergent candidates."),
    q("Can you tell a client about a candidate's autism without asking the candidate?", ["No: only share what the candidate agrees to", "Yes, if it helps the client", "Yes, if the client asks", "Yes, if it's in the CV"], 1, "Health information is sensitive. Share only with the candidate's agreement."),
    q("What is the US term for a reasonable adjustment under the Americans with Disabilities Act?", ["A reasonable accommodation", "A special exemption", "A disability allowance", "A performance plan"], 1, "Under the ADA, employers must provide reasonable accommodations unless that causes undue hardship."),
    q("What is Access to Work?", ["A UK Government scheme that can help fund support at work", "A type of employment contract", "A building accessibility standard", "A recruitment job board"], 1, "Access to Work can fund equipment, coaching and other support."),
  ],
  sources: [
    ["Acas: Neurodiversity at work", "https://www.acas.org.uk/neurodiversity-at-work"],
    ["Equality Act 2010: guidance", "https://www.gov.uk/guidance/equality-act-2010-guidance"],
    ["UK Government: Access to Work", "https://www.gov.uk/access-to-work"],
    ["National Autistic Society: employing autistic people", "https://www.autism.org.uk/what-we-do/employment"],
    ["British Dyslexia Association: workplace", "https://www.bdadyslexia.org.uk/advice/employers"],
    ["ADHD UK", "https://adhduk.co.uk/"],
    ["US EEOC: Disability discrimination and reasonable accommodation", "https://www.eeoc.gov/disability-discrimination-and-employment-decisions"],
    ["NYC Commission on Human Rights: Cooperative dialogue", "https://www.nyc.gov/site/cchr/law/cooperative-dialogue.page"],
  ],
  reviewNotes: `Please check or fill in before sign-off:
1. Lesson 4: how staff ask for reasonable adjustments at Stott and May (manager, HR, a form), and any internal neurodiversity network or support.
2. Lesson 5: does Stott and May have a standard adjustments question in our candidate process (for example, in the interview confirmation email)? If so, refer to it.
3. The figure in lesson 1 (1 in 7) is from Acas. Check it's still Acas's current wording.
4. Language guidance (lesson 3): consider asking any neurodivergent colleagues willing to review it.
5. This course is now for UK and US staff. The US notes (lesson 4) are a short overview: ask US counsel or a New York HR adviser to check them, and add how US staff ask for accommodations.
6. Assessment: 10 questions drawn from 16, pass mark 80%, renew every 12 months.`,
};
