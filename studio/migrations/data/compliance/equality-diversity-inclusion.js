// Equality, Diversity & Inclusion (UK). Written from the Equality Act 2010, EHRC guidance for
// employment service providers and Acas guidance. For review and sign-off by HR and Compliance.
import { text, keyPoints, law, doDont, sorter, scenario, q } from "./kit.js";

export default {
  slug: "equality-diversity-inclusion",
  title: "Equality, Diversity & Inclusion (UK)",
  category: "conduct",
  region: "uk",
  order: 42,
  icon: "heart-handshake",
  accent: "brand",
  minutes: 35,
  renewMonths: 12,
  passMark: 80,
  questionsPerAttempt: 10,
  summary: "The Equality Act 2010 for recruiters: protected characteristics, the forms of discrimination, handling discriminatory client requests, fair and inclusive hiring, and everyday inclusion.",
  intro: "Recruiters open, and sometimes close, the door to people's careers. That gives us a big responsibility, and a legal one: as an employment agency, we must not discriminate, or help a client to. This course covers the Equality Act 2010, what to do when a client asks for something discriminatory, how to keep bias out of hiring, and how to make Stott and May an inclusive place to work. It takes about 35 minutes and ends with an assessment: you need 80% to pass.",
  outcomes: [
    "Name the nine protected characteristics and the main forms of discrimination",
    "Explain why recruitment agencies are directly responsible under the Equality Act",
    "Handle discriminatory requests from clients",
    "Write inclusive job adverts and run a fair, consistent process",
    "Recognise unconscious bias and everyday exclusion, and act on them",
  ],
  lessons: [
    {
      title: "Equality, diversity and inclusion",
      summary: "What the words mean, and why they matter in recruitment.",
      blocks: [
        text(null, "Equality means everyone has a fair chance, and nobody is treated worse because of who they are. Diversity means the range of people and perspectives in a team. Inclusion means everyone feels they belong and can contribute.\n\nFor a recruitment business, these aren't just values. Clients want diverse shortlists. Candidates choose recruiters who treat them fairly. And the law holds us responsible for our part in every hiring decision."),
        law("Equality Act 2010: the nine protected characteristics", "It's unlawful to discriminate because of: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race (including colour, nationality and ethnic or national origin), religion or belief, sex, and sexual orientation.\n\nThe Act also protects people who are thought to have a characteristic, or who are linked to someone who has one, such as a parent of a disabled child."),
      ],
    },
    {
      title: "Forms of discrimination",
      summary: "Direct, indirect and the other ways the law can be broken.",
      blocks: [
        text(null, "The Equality Act sets out several kinds of unlawful conduct:", [
          "Direct discrimination: treating someone less favourably because of a protected characteristic. For example, rejecting a candidate because she's pregnant",
          "Indirect discrimination: applying a rule to everyone that puts people with a characteristic at a particular disadvantage, unless it can be objectively justified. For example, requiring \"10 years' experience\" when 5 would do, which disadvantages younger candidates",
          "Discrimination arising from disability, and failing to make reasonable adjustments for disabled people",
          "Harassment: unwanted conduct related to a characteristic that violates someone's dignity or creates a hostile environment",
          "Victimisation: treating someone badly because they've complained about discrimination or supported someone who has",
        ]),
        sorter("Direct or indirect?", "Decide which form of discrimination each one could be.", ["Direct discrimination", "Indirect discrimination"], [
          ["A client says, \"Don't send me anyone over 50\"", "Direct discrimination", "Treating people less favourably because of their age."],
          ["A role requires candidates to have no gaps in their CV", "Indirect discrimination", "A rule for everyone, but it disadvantages people who've taken time out for caring, pregnancy or illness."],
          ["Rejecting a candidate after she mentions she's pregnant", "Direct discrimination", "Pregnancy is a protected characteristic. This is unlawful."],
          ["A role requires \"native English speakers\"", "Indirect discrimination", "It disadvantages people because of their national origin. If good English is genuinely needed, ask for fluency instead."],
          ["A client says they'd \"prefer a man\" for a sales team", "Direct discrimination", "Treating people less favourably because of sex."],
        ]),
      ],
    },
    {
      title: "When a client asks for something discriminatory",
      summary: "Our legal responsibility, and how to handle the conversation.",
      blocks: [
        law("Recruitment agencies and the Equality Act", "As an employment service provider, Stott and May must not discriminate against candidates in the services we provide (section 55). It's also unlawful to instruct, cause or induce discrimination (section 111), or to knowingly help someone else to discriminate (section 112).\n\nSo if we follow a client's discriminatory instruction, for example by only sending younger candidates, Stott and May and the individual recruiter can be liable as well as the client."),
        keyPoints("How to handle it", [
          "Don't agree, even informally, or \"just this once\".",
          "Bring it back to the job: ask what the role actually needs (\"What skills and experience does the person need?\").",
          "Explain, politely, that we can't act on that kind of request, and why. It protects the client too.",
          "Never record the discriminatory requirement in Bullhorn or a job spec.",
          "Tell your manager and Compliance, especially if the client insists.",
        ]),
        scenario("A client says: \"I want someone young and energetic for this team. Ideally under 30, they'll fit in better.\" What do you say?", [
          ["\"No problem, I'll keep it to under 30s.\"", false, "That's direct age discrimination, and we'd be liable for helping."],
          ["\"I can't screen on age, but let's pin down what you need: energy for what, exactly? Pace, client-facing work, willingness to learn new tools? I'll find people who are strong on those.\"", true, "Right. You decline the unlawful part and steer to what the job genuinely needs, which helps the client hire well."],
          ["Agree on the call, then send a mixed shortlist anyway", false, "Agreeing, even if you don't follow through, can count as accepting a discriminatory instruction. Address it openly."],
        ]),
        scenario("A client's hiring manager says, off the record: \"Between us, try not to send women in their thirties. We can't afford anyone going off on maternity leave.\" What do you do?", [
          ["Quietly avoid sending women in their thirties", false, "That's sex and pregnancy discrimination, and we'd be helping the client break the law."],
          ["Explain that you can't take that into account, keep sending the best candidates, and tell your manager and Compliance", true, "Right. Be clear, keep your process fair, and escalate, because the client may need a conversation at a more senior level."],
          ["Tell the candidates what the client said", false, "Raise it internally first. Compliance will decide how to handle it."],
        ]),
      ],
    },
    {
      title: "Fair and inclusive hiring",
      summary: "Job adverts, shortlists, interviews and unconscious bias.",
      blocks: [
        text("Unconscious bias", "We all make quick judgements based on patterns and experience. In hiring, they can lead us to favour people like ourselves (affinity bias), look only for evidence that confirms a first impression (confirmation bias), or let one strong trait colour everything else (the halo effect). The fix isn't to feel guilty: it's to use consistent, job-related criteria for every candidate."),
        sorter("Inclusive, or a problem?", "Decide for each phrase in a job advert.", ["Inclusive", "A problem"], [
          ["\"Digital native\"", "A problem", "It suggests a younger person. Describe the digital skills you actually need."],
          ["\"Fluent in English, written and spoken\"", "Inclusive", "Describes the skill needed, not where someone is from."],
          ["\"Recent graduate\"", "A problem", "It can indirectly exclude older candidates. If a degree is needed, say so, without the \"recent\"."],
          ["\"We're happy to discuss flexible working and adjustments at any stage\"", "Inclusive", "It invites a wider range of candidates to apply."],
          ["\"Sales ninja who'll dominate the market\"", "A problem", "Aggressive, informal language can put some people off applying. Describe the role plainly."],
          ["\"3 years' experience in B2B sales, or equivalent skills\"", "Inclusive", "Clear, job-related, and open to different backgrounds."],
        ]),
        doDont(
          ["Agree clear, job-related criteria with the client before shortlisting", "Assess every candidate against the same criteria", "Ask every candidate if they need any adjustments", "Challenge feedback that isn't about the job (\"not a culture fit\", \"too old\", \"strong accent\")", "Keep diversity monitoring data separate and confidential"],
          ["Ask about age, marital status, children, religion or health in screening", "Make assumptions from a name, photo, accent or address", "Let a candidate's background count for or against them unless it's genuinely job-related", "Share diversity monitoring data with clients"],
        ),
        text("Positive action, not positive discrimination", "The law allows positive action: for example, encouraging applications from under-represented groups, or, when two candidates are equally qualified, choosing the one from an under-represented group. Positive discrimination, such as choosing someone less qualified because of a protected characteristic, or setting quotas that exclude others, is unlawful."),
      ],
    },
    {
      title: "Inclusion every day",
      summary: "How we treat each other at Stott and May.",
      blocks: [
        text(null, "Inclusion is built, or broken, in everyday moments: who gets invited, who gets interrupted, which jokes get a laugh. Small, repeated slights based on who someone is, sometimes called microaggressions, add up and push people out."),
        doDont(
          ["Learn and use people's names correctly, and the pronouns they use", "Make space for quieter voices in meetings", "Plan social events everyone can join, not just the pub", "Respect religious observance, caring responsibilities and flexible working", "Speak up, or report it, when you see exclusion or disrespect"],
          ["Ask \"Where are you really from?\"", "Make jokes about someone's age, accent, religion, disability or sexuality", "Assume people's family set-up, background or beliefs", "Dismiss someone's experience as \"oversensitive\""],
        ),
        scenario("In a team meeting, a colleague with a strong regional accent is interrupted and talked over every time they speak. Someone jokes, \"We'll need subtitles.\" What do you do?", [
          ["Laugh along: it's only banter", false, "Comments about accents can be linked to race or national origin, and they shut people out."],
          ["Make space for them (\"Hang on, I'd like to hear the rest of that\"), and if it keeps happening, raise it with the meeting lead or your manager", true, "Right. A small intervention helps straight away, and raising the pattern helps change it."],
          ["Say nothing in the meeting, but tell the colleague afterwards to speak more clearly", false, "That puts the problem on them. The behaviour of the others is the problem."],
        ]),
        keyPoints("Remember", [
          "Nine protected characteristics, and several forms of discrimination, including indirect.",
          "We're liable if we follow a client's discriminatory instruction. Say no, and redirect to the job.",
          "Use consistent, job-related criteria and inclusive language.",
          "Inclusion is everyday behaviour. Notice it, and speak up.",
        ]),
      ],
    },
  ],
  questions: [
    q("How many protected characteristics are there under the Equality Act 2010?", ["Nine", "Five", "Twelve", "Three"], 1, "Age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation."),
    q("Which of these is a protected characteristic?", ["Pregnancy and maternity", "Political party membership", "Hair colour", "Football team"], 1, "Pregnancy and maternity is one of the nine."),
    q("What is indirect discrimination?", ["A rule applied to everyone that disadvantages people with a protected characteristic, unless objectively justified", "Discrimination that happens by email", "Discrimination by a third party", "Any unfair treatment"], 1, "It's about the effect of a rule or practice."),
    q("A client says, \"Don't send me anyone over 50.\" What is this?", ["Direct age discrimination", "Indirect discrimination", "Positive action", "Acceptable if it's the client's choice"], 1, "Treating people less favourably because of age."),
    q("A role requires \"native English speakers\". What's the better alternative?", ["Ask for fluent English, if the role genuinely needs it", "Ask for a British passport", "Ask for candidates born in the UK", "Leave it as it is"], 1, "Describe the skill needed, not someone's origin."),
    q("If we follow a client's discriminatory instruction, who can be liable?", ["Stott and May and the individual recruiter, as well as the client", "Only the client", "Only the candidate", "Nobody, if it was the client's idea"], 1, "Agencies and individuals can be liable for helping to discriminate."),
    q("A client asks for someone \"young and energetic\". What's the best response?", ["Decline to screen on age, and ask what the job actually needs", "Agree and send under-30s", "Agree, then ignore it", "Refuse to work with the client"], 1, "Redirect to job-related criteria."),
    q("A hiring manager asks you not to send women who might go on maternity leave. What do you do?", ["Decline, keep your process fair, and tell your manager and Compliance", "Quietly follow the request", "Tell the candidates", "Only send men"], 1, "That's sex and pregnancy discrimination. Escalate it."),
    q("Which job advert phrase is most inclusive?", ["\"3 years' experience in B2B sales, or equivalent skills\"", "\"Digital native\"", "\"Recent graduate\"", "\"Sales ninja\""], 1, "Clear, job-related and open."),
    q("What is affinity bias?", ["Favouring people who are like ourselves", "Preferring candidates with the most experience", "Choosing the first candidate interviewed", "Liking a particular client"], 1, "One of the most common unconscious biases in hiring."),
    q("Which of these questions should you NOT ask in candidate screening?", ["\"Do you have children?\"", "\"What's your notice period?\"", "\"What salary are you looking for?\"", "\"Do you need any adjustments for interview?\""], 1, "Questions about family plans can lead to discrimination."),
    q("Is positive discrimination lawful in the UK?", ["No, but positive action, such as encouraging applications from under-represented groups, is allowed", "Yes, always", "Yes, for quotas", "Only for large companies"], 1, "Positive action is allowed; positive discrimination isn't."),
    q("Can you share a candidate's diversity monitoring data with a client?", ["No: keep it separate and confidential", "Yes, if they ask", "Yes, to show a diverse shortlist", "Only for senior roles"], 1, "Monitoring data is special category data and mustn't affect hiring decisions."),
    q("A colleague is repeatedly talked over and teased about their accent in meetings. What's a good response?", ["Make space for them to finish, and raise the pattern with the meeting lead or your manager", "Laugh along", "Tell them to speak more clearly", "Do nothing"], 1, "Small interventions and raising patterns both help."),
    q("Which of these is victimisation?", ["Treating someone badly because they complained about discrimination", "Asking about adjustments", "Choosing the best candidate", "Giving honest feedback"], 1, "Victimisation is unlawful under the Equality Act."),
  ],
  sources: [
    ["Equality Act 2010: guidance", "https://www.gov.uk/guidance/equality-act-2010-guidance"],
    ["Equality and Human Rights Commission: Employment statutory code of practice", "https://www.equalityhumanrights.com/guidance/business/employment-statutory-code-practice"],
    ["Acas: Discrimination and the law", "https://www.acas.org.uk/discrimination-and-the-law"],
    ["Acas: Recruitment, avoiding discrimination", "https://www.acas.org.uk/hiring-someone/avoiding-discrimination-in-recruitment"],
    ["Equality Act 2010, sections 55, 111 and 112", "https://www.legislation.gov.uk/ukpga/2010/15/contents"],
  ],
  reviewNotes: `Please check or fill in before sign-off:
1. Lesson 3: confirm how discriminatory client requests are escalated (manager, Compliance, a director), and whether we record them.
2. Lesson 4: link to Stott and May's equal opportunities and diversity policies, and describe how we collect diversity monitoring data from candidates, if we do.
3. Lesson 4: any client diversity commitments or shortlist targets we work to, and how to meet them lawfully (positive action, not quotas).
4. Lesson 5: any employee networks or inclusion initiatives to mention.
5. Assessment: 10 questions drawn from 15, pass mark 80%, renew every 12 months.`,
};
