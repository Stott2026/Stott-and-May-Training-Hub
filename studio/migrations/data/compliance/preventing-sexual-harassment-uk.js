// Preventing Sexual Harassment (UK). Written from the Equality Act 2010 (as amended by the Worker
// Protection (Amendment of Equality Act 2010) Act 2023), the EHRC's guidance on the preventative duty,
// and Acas guidance. For review and sign-off by HR and Compliance before it counts.
import { text, keyPoints, law, doDont, stat, sorter, scenario, q } from "./kit.js";

export default {
  slug: "preventing-sexual-harassment-uk",
  title: "Preventing Sexual Harassment (UK)",
  category: "conduct",
  region: "uk",
  order: 41,
  icon: "hand",
  accent: "brand",
  minutes: 35,
  renewMonths: 12,
  passMark: 80,
  questionsPerAttempt: 10,
  summary: "What sexual harassment is under UK law, the employer's duty to prevent it, recognising it (including from clients), speaking up, stepping in and managers' responsibilities.",
  intro: "Since October 2024, UK employers have had a legal duty to take reasonable steps to prevent sexual harassment of their workers, including by clients and other third parties. Training everyone is one of those steps. This course explains what sexual harassment is, how to recognise it, what to do if it happens to you or someone else, and what managers must do. It takes about 35 minutes and ends with an assessment: you need 80% to pass.",
  outcomes: [
    "Explain what sexual harassment is under the Equality Act 2010",
    "Explain the employer's duty to prevent sexual harassment",
    "Recognise sexual harassment, in person, online and from clients or candidates",
    "Report harassment, and explain how you're protected when you do",
    "Step in safely as a bystander",
    "Explain the extra responsibilities of managers",
  ],
  lessons: [
    {
      title: "What the law says",
      summary: "The definitions, and the duty to prevent sexual harassment.",
      blocks: [
        law("Equality Act 2010, section 26: harassment", "The Act covers three kinds of harassment at work:\n\nUnwanted conduct related to a protected characteristic (such as sex, race or disability) that violates someone's dignity, or creates an intimidating, hostile, degrading, humiliating or offensive environment for them.\n\nSexual harassment: unwanted conduct of a sexual nature that has that purpose or effect.\n\nLess favourable treatment because someone rejected, or gave in to, sexual harassment."),
        text(null, "It's the effect that matters, not just the intention. \"It was only a joke\" or \"I didn't mean anything by it\" doesn't make conduct acceptable if it was unwanted and had that effect. Tribunals look at how the person felt, the circumstances, and whether it was reasonable for the conduct to have that effect."),
        law("The duty to prevent sexual harassment", "Since 26 October 2024, employers must take reasonable steps to prevent sexual harassment of their employees in the course of their employment. This is a proactive duty: employers must act before harassment happens, not just respond to complaints. It includes harassment by third parties, such as clients, candidates and suppliers.\n\nIf an employment tribunal finds harassment and that the employer breached the duty, it can increase compensation by up to 25%. The Equality and Human Rights Commission can also take enforcement action."),
        stat("25%", "the maximum uplift to compensation a tribunal can order if an employer has failed to take reasonable steps to prevent sexual harassment", "Equality Act 2010, section 124A"),
        keyPoints("Who, where and when", [
          "Anyone can be harassed, and anyone can harass, regardless of gender. Harassment can happen between people of the same sex.",
          "It can come from a manager, a colleague, a client, a candidate, a contractor or a supplier.",
          "It covers anywhere connected to work: the office, client sites, events, after-work drinks, business travel, video calls, Teams, WhatsApp, text and social media.",
        ]),
      ],
    },
    {
      title: "Recognising sexual harassment",
      summary: "What it looks like, in person and online.",
      blocks: [
        text(null, "Sexual harassment can be a single serious incident, or repeated behaviour that builds up. Examples include:", [
          "Unwanted touching, hugging, kissing or brushing against someone, and sexual assault",
          "Sexual comments, jokes or innuendo, and comments about someone's body, appearance or clothing",
          "Intrusive questions about someone's sex life, or talking about your own",
          "Repeated requests for dates after someone has said no or shown they're not interested",
          "Sending or showing sexual images, videos, memes or messages",
          "Staring or leering, and sexual gestures",
          "Suggesting that work opportunities depend on sexual favours, or treating someone worse because they said no",
        ]),
        sorter("Could this be sexual harassment?", "Decide for each one.", ["Could be sexual harassment", "Not sexual harassment"], [
          ["A colleague comments on a teammate's body during a video call", "Could be sexual harassment", "Comments about someone's body are unwanted conduct of a sexual nature, on screen as much as in person."],
          ["Someone shares a sexual meme in the team WhatsApp group \"for a laugh\"", "Could be sexual harassment", "It can create an offensive environment for others in the group, whatever the intention."],
          ["A manager keeps asking a junior colleague out after she's said no", "Could be sexual harassment", "Persisting after a clear no is unwanted conduct, and the power imbalance makes it worse."],
          ["A manager gives a colleague fair, respectful feedback about their work", "Not sexual harassment", "Fair performance management isn't harassment."],
          ["Two colleagues who are in a relationship, which they've both told HR about, have lunch together", "Not sexual harassment", "Consensual relationships aren't harassment, though our policy may ask people to declare them."],
          ["A client keeps messaging a consultant late at night with comments about how she looks", "Could be sexual harassment", "Harassment by clients counts, and Stott and May must take reasonable steps to prevent it."],
        ]),
      ],
    },
    {
      title: "Harassment by clients, candidates and others",
      summary: "Why third-party harassment matters so much in recruitment, and what to do.",
      blocks: [
        text(null, "Recruiters spend much of their time with people outside Stott and May: clients, candidates and contractors, at meetings, events, dinners and on calls. The duty to prevent sexual harassment covers harassment by these third parties too.\n\nThe same applies the other way round: the contractors and candidates we work with must be protected from harassment, including by our own people and by our clients."),
        doDont(
          ["Report harassment by a client or candidate in exactly the same way as harassment by a colleague", "Keep client events professional, and look out for each other", "Take a contractor seriously if they tell you a client is harassing them", "Leave a meeting or call if you feel unsafe, and report it"],
          ["Put up with harassment because the client is important", "Tell someone to \"just ignore it\" or \"take it as a compliment\"", "Send a junior colleague alone to meet a client you know behaves badly", "Assume a contractor's problems at a client site are nothing to do with us"],
        ),
        scenario("At a dinner with a major client, the client's MD repeatedly puts his hand on a junior colleague's knee and makes comments about her dress. She looks uncomfortable. You're the most senior Stott and May person there. What do you do?", [
          ["Nothing: he's our biggest client, and she can handle it", false, "Stott and May must take reasonable steps to prevent harassment by clients. No client is more important than our people's safety."],
          ["Step in calmly, for example by swapping seats or giving her a reason to leave the table, check she's OK, and report it to HR the next day", true, "Right. Remove her from the situation first, without a scene. Then support her and report it, so HR can decide how to handle the client."],
          ["Have a quiet word with her afterwards about avoiding him in future", false, "That puts the burden on her. The client's behaviour is the problem, and it needs reporting."],
        ]),
      ],
    },
    {
      title: "Speaking up, and protection when you do",
      summary: "How to report, where to get help, and protection from victimisation.",
      blocks: [
        text("If it happens to you", "You can report sexual harassment to your manager, another manager or HR, verbally or in writing, using our anti-harassment policy. If the person harassing you is your manager, go to someone else. You don't need proof, or to be certain it counts as harassment, before you report.\n\nIt can help to note what happened, when, where, who was there, and keep any messages. Stott and May will take every report seriously, deal with it promptly and as confidentially as possible, and support you."),
        law("Victimisation is unlawful", "Under section 27 of the Equality Act 2010, it's unlawful to treat someone badly because they've made a complaint, supported someone else's, or given evidence, as long as they acted in good faith. That includes being sidelined, given worse work, denied promotion or pushed out."),
        text("Help outside Stott and May", null, [
          "Acas gives free, confidential advice on workplace problems: 0300 123 1100",
          "You can bring a claim at an employment tribunal. There are strict time limits (normally three months less one day from the incident), and you must contact Acas for early conciliation first",
          "If a crime has been committed, such as sexual assault or stalking, you can report it to the police. In an emergency, call 999",
        ]),
        scenario("A colleague tells you that a senior consultant has been sending her sexual messages, but she's worried that reporting it will hurt her career. What's the most helpful thing to do?", [
          ["Tell her it's probably best to keep quiet for now", false, "That leaves her unprotected, and lets the behaviour continue."],
          ["Listen, believe her, explain that she's protected from victimisation, and offer to go with her to HR or help her write it down", true, "Right. Support her to report it. If you're a manager, you must report it yourself."],
          ["Confront the consultant on her behalf", false, "Confronting him could make things worse. Support her to report it through the proper route."],
        ]),
      ],
    },
    {
      title: "Stepping in as a bystander",
      summary: "Five safe ways to help.",
      blocks: [
        text(null, "Most harassment happens with other people nearby. Bystanders who act, even in small ways, can stop it, support the person targeted, and show that it isn't acceptable here. Choose the option that's safest for you and the person targeted."),
        keyPoints("The five Ds", [
          "Distract: interrupt without mentioning the harassment. Ask a question, \"need\" the person for something, or start another conversation.",
          "Delegate: get help from someone else, such as a manager, HR, venue staff or, in an emergency, the police.",
          "Document: if it's safe, note what happened and when, or screenshot messages. Give it to the person targeted to use as they choose.",
          "Delay: afterwards, check in with the person. Ask how they are, listen, and offer to help them report it.",
          "Direct: if it's safe, say something short and clear: \"That's not OK.\" Don't get drawn into an argument.",
        ]),
        scenario("In the team chat, a colleague posts a crude joke about a new joiner's appearance. A few people react with laughing emojis. The joiner hasn't responded. What do you do?", [
          ["Ignore it: it's just the chat", false, "Silence lets it become normal, and the joiner may feel unable to speak up."],
          ["Don't react. Message the joiner privately to check they're OK, and raise it with the colleague, your manager or HR", true, "Right. Delay and Delegate support the joiner and get it dealt with. If it's safe and you feel able, a short \"Not OK\" in the chat (Direct) also helps."],
          ["Reply with a joke to change the mood", false, "That can add to the harm and makes it harder to object."],
        ]),
      ],
    },
    {
      title: "Managers' responsibilities",
      summary: "What managers and team leaders must do.",
      blocks: [
        keyPoints("If you manage people, you must", [
          "Set the tone: challenge inappropriate comments and behaviour straight away, including from clients.",
          "Take every report seriously, and pass it to HR the same day. Don't promise to keep it secret, and don't investigate on your own.",
          "Make sure nobody who reports, or helps, is victimised.",
          "Think ahead: plan client events and travel so people aren't put at risk, and don't send people alone to meet anyone known to behave badly.",
          "Act on harassment by clients, candidates or suppliers, not just colleagues.",
        ]),
        scenario("A contractor you look after tells you a client's team leader keeps making sexual comments about her. She asks you not to say anything because she needs the contract. You're her Stott and May contact. What do you do?", [
          ["Respect her wishes and keep it quiet", false, "Stott and May has a duty to act. You can't keep it secret, though you can keep it as confidential as possible."],
          ["Thank her, explain that you have to pass it to HR so she can be protected and won't lose out for reporting, and report it the same day", true, "Right. Be honest about what happens next, reassure her about victimisation, and let HR handle the client."],
          ["Ring the client team leader and tell him to stop", false, "Acting alone could make things worse for her. HR needs to lead the response."],
        ]),
        keyPoints("Remember", [
          "Sexual harassment is unwanted conduct of a sexual nature. It's the effect that matters.",
          "Stott and May must take reasonable steps to prevent it, including by clients.",
          "Report it, and support others to report it. Victimisation is unlawful.",
          "Use the five Ds to help safely.",
        ]),
      ],
    },
  ],
  questions: [
    q("Under the Equality Act 2010, what is sexual harassment?", ["Unwanted conduct of a sexual nature that violates someone's dignity or creates an intimidating, hostile, degrading, humiliating or offensive environment", "Any conversation about relationships at work", "Only physical contact", "Only conduct that happens more than once"], 1, "Unwanted conduct of a sexual nature, with that purpose or effect."),
    q("Does it matter that the person \"only meant it as a joke\"?", ["No: the effect on the person matters, not just the intention", "Yes: jokes are never harassment", "Only if they apologise", "Only if it was in the office"], 1, "Harassment can be about the effect, whatever was intended."),
    q("Since October 2024, what must UK employers do?", ["Take reasonable steps to prevent sexual harassment of their employees", "Only respond to complaints when they're made", "Ban all relationships at work", "Report every complaint to the police"], 1, "The preventative duty means acting before harassment happens."),
    q("Does the duty to prevent sexual harassment cover harassment by clients?", ["Yes: it includes third parties, such as clients and candidates", "No: only colleagues", "Only clients based in the UK", "Only if the client is in our office"], 1, "Third-party harassment is covered by the duty."),
    q("If a tribunal finds the employer breached the duty, by how much can it increase compensation?", ["Up to 25%", "Up to 5%", "Up to 100%", "It can't"], 1, "Up to 25%."),
    q("Which of these could be sexual harassment?", ["Commenting on a colleague's body during a video call", "Fair feedback on someone's work", "Inviting the whole team to lunch", "Asking a colleague how their weekend was"], 1, "Comments about someone's body are unwanted conduct of a sexual nature."),
    q("Can sexual harassment happen in a WhatsApp group?", ["Yes: anywhere connected to work, including online", "No: only in person", "Only on work phones", "Only during working hours"], 1, "Work-related chats, calls and social media are all covered."),
    q("A client harasses a junior colleague at dinner. What's the best first step?", ["Calmly remove her from the situation, check she's OK, then report it", "Ignore it: he's an important client", "Tell her to avoid him in future", "Confront the client loudly"], 1, "Make her safe first, then support and report."),
    q("What is victimisation?", ["Treating someone badly because they made or supported a complaint in good faith", "Being harassed by a client", "Making a complaint", "A type of joke"], 1, "Victimisation is unlawful under section 27 of the Equality Act."),
    q("Do you need proof before reporting harassment?", ["No: report it, and HR will look into it", "Yes, always", "Only for client harassment", "Only if it happened more than once"], 1, "You don't need proof or certainty to report."),
    q("Which organisation gives free, confidential advice on workplace problems?", ["Acas", "HMRC", "The ICO", "Companies House"], 1, "Acas: 0300 123 1100."),
    q("What does \"Delay\" mean in the five Ds?", ["Checking in with the person afterwards and offering support", "Waiting a week before reporting", "Postponing the event", "Asking the harasser to wait"], 1, "Checking in afterwards can make a real difference."),
    q("A colleague asks you, their manager, to keep a harassment report secret. What must you do?", ["Explain you must pass it to HR, then report it the same day", "Keep it secret, as asked", "Investigate it yourself first", "Wait to see if it happens again"], 1, "Managers must report it, keeping it as confidential as possible."),
    q("Can men be sexually harassed, and can harassment happen between people of the same sex?", ["Yes to both", "No to both", "Only men can be harassed by women", "Only between people of different sexes"], 1, "Anyone can be harassed, and anyone can harass."),
    q("A contractor tells you a client is harassing her. Is that Stott and May's concern?", ["Yes: we must act to protect the people we place", "No: it's the client's problem", "Only if she's an employee", "Only if she complains in writing"], 1, "We must take her report seriously and act."),
  ],
  sources: [
    ["Equality and Human Rights Commission: Sexual harassment and harassment at work", "https://www.equalityhumanrights.com/guidance/sexual-harassment-and-harassment-work"],
    ["Equality and Human Rights Commission: Preventing sexual harassment at work, a guide for employers", "https://www.equalityhumanrights.com/guidance/preventing-sexual-harassment-work"],
    ["Acas: Sexual harassment", "https://www.acas.org.uk/sexual-harassment"],
    ["Equality Act 2010, section 26", "https://www.legislation.gov.uk/ukpga/2010/15/section/26"],
    ["Worker Protection (Amendment of Equality Act 2010) Act 2023", "https://www.legislation.gov.uk/ukpga/2023/51/contents"],
    ["Right To Be: The five Ds of bystander intervention", "https://righttobe.org/guides/bystander-intervention-training/"],
  ],
  reviewNotes: `Please check or fill in before sign-off:
1. Lesson 4: link to Stott and May's UK anti-harassment (or dignity at work) policy and name the HR contact. Add any Employee Assistance Programme.
2. The Employment Rights Act reforms are expected to strengthen the duty (to "all reasonable steps") and add employer liability for harassment by third parties. Check the current position and update lesson 1 when these come into force.
3. Lesson 2: does our policy ask people to declare relationships at work? Adjust the example if not.
4. Lesson 6: confirm how client harassment is escalated (HR, the account owner, a director) and any steps we take for client events (for example, no one meets a client alone in the evening).
5. The EHRC's guidance lists training as one reasonable step. Others include a policy, a risk assessment, reporting routes and acting on complaints. Confirm these are in place, as the course says they are.
6. Assessment: 10 questions drawn from 15, pass mark 80%, renew every 12 months.`,
};
