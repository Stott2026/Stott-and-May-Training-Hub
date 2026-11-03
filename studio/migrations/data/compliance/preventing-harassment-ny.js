// Preventing Harassment (US, New York). Written to cover New York State's minimum standards for
// annual interactive sexual harassment prevention training (Labor Law section 201-g) and New York
// City's training requirements (Stop Sexual Harassment Act, Administrative Code section 8-107(30)),
// from the State's model training and policy and NYC Commission on Human Rights guidance.
// For review and sign-off by HR, Compliance and US counsel before it counts.
import { text, keyPoints, law, doDont, sorter, scenario, q } from "./kit.js";

export default {
  slug: "preventing-harassment-ny",
  title: "Preventing Harassment (US, New York)",
  category: "us",
  region: "us-ny",
  order: 60,
  icon: "users",
  accent: "brand",
  minutes: 45,
  renewMonths: 12,
  passMark: 80,
  questionsPerAttempt: 12,
  summary: "Annual harassment prevention training for our New York team, covering federal, New York State and New York City law, reporting, retaliation, bystander intervention and managers' duties.",
  intro: "Everyone at Stott and May has the right to work free from harassment, and so does everyone we place. New York State requires all employers to give staff interactive harassment prevention training every year, and New York City adds its own requirements. This course meets both. It explains what harassment is, how to report it, what protection you have, how to step in safely as a bystander, and the extra responsibilities of managers. It takes about 45 minutes and ends with an assessment: you need 80% to pass.",
  outcomes: [
    "Explain what sexual harassment and other unlawful harassment are under federal, New York State and New York City law",
    "Recognise harassment in person, online and at client sites, with examples",
    "Report harassment internally, and name the external agencies you can go to",
    "Explain how the law protects you from retaliation",
    "Use the five Ds to step in safely as a bystander",
    "Explain the extra responsibilities of supervisors and managers",
  ],
  lessons: [
    {
      title: "Harassment and the law in New York",
      summary: "What the law says, who it protects, and where it applies.",
      blocks: [
        text(null, "Sexual harassment is a form of sex discrimination. It's against Stott and May policy, and it's unlawful under federal, New York State and New York City law. Harassment because of other protected characteristics, such as race, religion, age or disability, is unlawful too."),
        law("Federal: Title VII of the Civil Rights Act of 1964", "Prohibits employment discrimination, including harassment, because of race, colour, religion, sex (including pregnancy, sexual orientation and gender identity) and national origin. Other federal laws protect age (40 and over), disability and genetic information. Enforced by the US Equal Employment Opportunity Commission (EEOC)."),
        law("New York State Human Rights Law", "Harassment is unlawful when it subjects someone to inferior terms, conditions or privileges of employment because of a protected characteristic. Since 2019, it does not have to be \"severe or pervasive\" to be unlawful. Protected characteristics include age, race, creed, colour, national origin, citizenship or immigration status, sex, sexual orientation, gender identity or expression, disability, military status, marital and familial status, predisposing genetic characteristics, and status as a victim of domestic violence."),
        law("New York City Human Rights Law", "One of the most protective laws in the country. It covers the same ground as State law and adds protections, for example for caregiver status, height and weight. The Stop Sexual Harassment Act requires employers in New York City to give staff interactive training every year."),
        keyPoints("Who is protected, by whom, and where", [
          "Everyone: employees, job applicants, interns (paid or unpaid), and non-employees such as contractors, consultants and vendors working in the workplace. That includes the contractors we place with clients.",
          "Harassment can come from anyone: a manager, a colleague, a client, a candidate or a supplier, of any gender, towards anyone of any gender.",
          "It can happen anywhere connected to work: the office, client sites, events and dinners, business travel, video calls, chat, text messages, email and social media, during or outside working hours.",
        ]),
      ],
    },
    {
      title: "What sexual harassment looks like",
      summary: "The forms it takes, with examples.",
      blocks: [
        text(null, "Sexual harassment is unwelcome conduct of a sexual nature, or conduct directed at someone because of their sex, sexual orientation, or gender identity or expression. It takes two main forms:", [
          "Quid pro quo (\"this for that\"): when submitting to, or rejecting, sexual advances is used to make decisions about someone's work, such as a promotion, pay, assignments or keeping their job",
          "Hostile work environment: unwelcome conduct that makes it harder for someone to do their job, or treats them worse, because of their sex, gender or sexual orientation",
        ]),
        text("Examples", "These are examples of conduct that can be sexual harassment. It's what's done and its effect that matter, not what someone says they intended:", [
          "Unwanted touching, hugging, kissing or brushing against someone, and sexual assault",
          "Sexual jokes, comments or questions about someone's body, appearance, clothing or sex life",
          "Repeated requests for dates or sexual favours after someone has said no or shown they're not interested",
          "Displaying or sending sexual images, videos, memes or messages, including in chats and on social media",
          "Hints or threats that someone's job, pay or assignments depend on going along with sexual advances",
          "Hostile treatment because of gender, such as sabotaging someone's work or mocking them for not fitting gender stereotypes",
          "Deliberately using the wrong name or pronouns for a transgender or non-binary person",
        ]),
        sorter("Could this be harassment?", "Decide for each one.", ["Could be harassment", "Not harassment"], [
          ["A colleague keeps asking a teammate out, even though she's said no twice", "Could be harassment", "Persisting after a clear no is unwelcome conduct."],
          ["A manager hints that a junior colleague's promotion depends on having drinks alone with him", "Could be harassment", "Linking a work decision to a personal or sexual request is quid pro quo harassment."],
          ["Someone posts a sexual meme in the team chat \"as a joke\"", "Could be harassment", "Sexual content at work is unwelcome to many people, whatever the intent."],
          ["A manager gives a colleague honest, respectful feedback on missed targets", "Not harassment", "Fair, respectful performance management isn't harassment."],
          ["A colleague comments on someone's body during a video call", "Could be harassment", "Comments about someone's body are unwelcome, on screen as much as in person."],
          ["The team is invited to a leaving lunch", "Not harassment", "An ordinary social invitation, open to everyone."],
          ["A colleague keeps calling a transgender teammate by their old name on purpose", "Could be harassment", "Deliberate misgendering is harassment based on gender identity."],
        ]),
      ],
    },
    {
      title: "Harassment because of other characteristics",
      summary: "Race, religion, age, disability and more.",
      blocks: [
        text(null, "Harassment because of any protected characteristic is unlawful, not just sex. It often hides behind \"banter\": jokes and comments that single people out for who they are."),
        doDont(
          ["Treat everyone with respect, including clients, candidates and contractors", "Think about how a comment might land with someone different from you", "Apologise and stop if someone tells you something you said was hurtful", "Call out or report behaviour that targets people for who they are"],
          ["Make jokes or comments about race, religion, accents, age, disability or sexuality", "Use slurs or stereotypes, even \"as a joke\"", "Imitate someone's accent, disability or way of speaking", "Say \"it's only banter\" when someone objects"],
        ),
        scenario("On the team chat, a colleague jokes that an older teammate is \"too old to learn the new CRM\" and should \"leave it to the youngsters\". Others add laughing emojis. The teammate hasn't replied. What do you do?", [
          ["Nothing: everyone's laughing, so it must be fine", false, "Silence isn't agreement. Age-based comments can be harassment, and the teammate may feel unable to object."],
          ["Don't join in. Message the teammate privately to check they're OK, and raise it with the colleague or your manager", true, "Right. Supporting the teammate and raising it helps stop it becoming normal. You can also report it to HR."],
          ["Add your own joke to lighten the mood", false, "That adds to the harm and makes it harder for the teammate to object."],
        ]),
      ],
    },
    {
      title: "Speaking up, and protection from retaliation",
      summary: "How to report, where else you can go, and your protection when you do.",
      blocks: [
        text("Reporting inside Stott and May", "If you experience or see harassment, report it to your manager, any other manager, or HR, verbally or in writing. You can use the complaint form in our anti-harassment policy, but you don't have to.\n\nStott and May will investigate every complaint promptly and fairly, keep it as confidential as possible, and take action where harassment is found. You don't need to have all the facts or to be sure it's harassment before you report."),
        law("External agencies", "You can also complain to a government agency, as well as or instead of reporting internally. Each agency has time limits for filing, so don't wait. You can also bring a case in court, and you may want to talk to a lawyer.\n\nUS Equal Employment Opportunity Commission (EEOC): 1-800-669-4000, www.eeoc.gov\n\nNew York State Division of Human Rights: 1-888-392-3644, dhr.ny.gov\n\nNew York City Commission on Human Rights: call 311 or (212) 416-0197, nyc.gov/cchr\n\nIf a crime has been committed, such as sexual assault or stalking, you can also contact the police."),
        law("Retaliation is unlawful", "It's against the law, and against our policy, to retaliate against anyone who complains about harassment, helps someone else complain, takes part in an investigation, or speaks out against harassment, even if the complaint isn't upheld, as long as it was made in good faith.\n\nRetaliation includes being fired, demoted, given worse clients, shifts or territories, left out of meetings, given an unfair review or a bad reference, threatened, or treated worse in any way that might stop someone from speaking up."),
        scenario("You saw a manager make sexual comments to a colleague at a client dinner, and HR asks you to be a witness. Later the manager says to you, \"Think carefully about your career before you say anything.\" What do you do?", [
          ["Tell HR you didn't see anything, to protect your career", false, "You're protected by law. The manager's comment is itself a serious problem."],
          ["Tell HR what you saw, and report the manager's comment to HR as well", true, "Right. Discouraging a witness can be unlawful retaliation. You're protected for taking part honestly in an investigation."],
          ["Agree with the manager, then report it anonymously online", false, "Report it directly to HR, who must protect you from retaliation."],
        ]),
      ],
    },
    {
      title: "Stepping in: bystander intervention",
      summary: "Five safe ways to help when you see harassment.",
      blocks: [
        text(null, "Bystanders can stop harassment and support the person targeted. You don't have to confront anyone to help. Use the five Ds, choosing whichever is safest and most comfortable for you in the moment."),
        keyPoints("The five Ds", [
          "Distract: interrupt the situation without mentioning the harassment. Ask the person targeted a question, \"need\" them for something, or start a conversation that gives them a way out.",
          "Delegate: get help from someone else, such as a manager, HR, a client's senior contact, venue staff or, if someone is in danger, the police.",
          "Document: if it's safe and someone is already helping, note what happened, when, where and who saw it, or take a screenshot of messages. Give it to the person targeted; don't share it without their agreement.",
          "Delay: afterwards, check in with the person. Ask if they're OK, listen, and offer to help them report it.",
          "Direct: if it's safe, speak up: \"That's not OK,\" or \"Please stop.\" Keep it short, and don't get drawn into an argument.",
        ]),
        scenario("At a client networking event, a senior client contact keeps putting his hand on the arm of a junior contractor we placed, standing very close and commenting on her dress. She keeps stepping back and looks uncomfortable. What's a good first step?", [
          ["Leave it: he's an important client and she can handle it", false, "Our contractors are protected too, and Stott and May must act when we know about harassment, including by clients."],
          ["Walk over and give her a reason to step away (\"Sorry to interrupt, can I borrow you for a minute?\"), then check she's OK and report it to your manager or HR", true, "Right. Distract gets her out of the situation safely, and Delay and reporting make sure she's supported and it's dealt with."],
          ["Loudly tell the client he's harassing her, in front of everyone", false, "Direct action can sometimes work, but publicly confronting someone may make things worse for her. Start with the safest option."],
        ]),
      ],
    },
    {
      title: "Responsibilities of supervisors and managers",
      summary: "The extra duties that come with managing people, or looking after candidates and contractors.",
      blocks: [
        text(null, "Anyone with supervisory responsibilities has extra duties. At Stott and May, that includes managers and team leaders, and also consultants looking after contractors they've placed."),
        keyPoints("If you're a supervisor or manager, you must", [
          "Never harass anyone, or behave in a way that makes harassment seem acceptable.",
          "Report any harassment you see, or are told about, to HR straight away, even if the person asks you not to. Failing to report can lead to disciplinary action.",
          "Take every complaint seriously, and never discourage anyone from reporting.",
          "Not investigate on your own: HR leads investigations.",
          "Make sure nobody suffers retaliation for complaining or helping with an investigation.",
          "Act on harassment by non-employees, such as clients, towards our people and contractors. Employers can be liable for harassment by clients and vendors when they know about it and don't act.",
        ]),
        scenario("A contractor you placed tells you a manager at the client site makes sexual comments about her, and has started messaging her late at night. She asks you not to tell anyone, because she doesn't want to lose the assignment. What do you do?", [
          ["Respect her wishes and keep it to yourself", false, "As a supervisor, you must report harassment you're told about. You can't promise to keep it secret."],
          ["Thank her for telling you, explain that you have to pass it to HR so she can be protected, reassure her that she's protected from retaliation, and report it to HR the same day", true, "Right. Be honest that you must report it, keep it as confidential as possible, and make sure she's protected. HR can then act with the client."],
          ["Call the client manager yourself and tell him to stop", false, "Confronting him on your own could make things worse for her, and HR needs to lead the response."],
        ]),
        keyPoints("Remember", [
          "Harassment is unlawful, and it doesn't have to be severe or repeated to be wrong under New York law.",
          "It can happen anywhere work happens, including online and at client sites.",
          "Report it internally, and you can also go to the EEOC, the New York State Division of Human Rights or the New York City Commission on Human Rights.",
          "Retaliation is unlawful.",
          "Use the five Ds to help safely.",
        ]),
      ],
    },
  ],
  questions: [
    q("Under New York State law, does harassment have to be \"severe or pervasive\" to be unlawful?", ["No: it's unlawful if it subjects someone to inferior terms, conditions or privileges of employment because of a protected characteristic", "Yes, always", "Only for sexual harassment", "Only outside New York City"], 1, "Since 2019, New York State law doesn't require harassment to be severe or pervasive."),
    q("Who is protected from harassment under New York State law?", ["Employees, applicants, interns and non-employees such as contractors and vendors in the workplace", "Only full-time employees", "Only employees with over a year's service", "Only managers"], 1, "Contractors, consultants and vendors are protected too."),
    q("Which of these is an example of quid pro quo harassment?", ["A manager hinting a promotion depends on going on a date with him", "A colleague telling an offensive joke", "A team lunch invitation", "Fair feedback on performance"], 1, "Quid pro quo links a work decision to submitting to sexual advances."),
    q("Can harassment happen over chat, text or social media?", ["Yes: anywhere connected to work", "No: only in person", "Only during working hours", "Only on company devices"], 1, "Harassment can happen in any work-connected setting, online or offline."),
    q("Can a client harass one of our contractors?", ["Yes, and Stott and May must act when it knows about it", "No: clients aren't covered", "Only if the client is in New York City", "Only if the contractor is an employee"], 1, "Harassment can come from anyone, including clients."),
    q("Which of these is harassment based on gender identity?", ["Deliberately using the wrong name or pronouns for a transgender colleague", "Asking a colleague which pronouns they use", "Using a colleague's chosen name", "Inviting everyone to a team event"], 1, "Deliberate misgendering can be harassment."),
    q("A colleague says an offensive comment was \"just banter\". Can it still be harassment?", ["Yes: what matters is the conduct and its effect, not the intent", "No: banter is always fine", "Only if they say it twice", "Only if a manager said it"], 1, "Intent doesn't make unwelcome conduct acceptable."),
    q("Who can you report harassment to inside Stott and May?", ["Your manager, any other manager, or HR", "Only HR, in writing", "Only the person harassing you", "Only your team"], 1, "You can report verbally or in writing to any of them."),
    q("Which of these agencies can you complain to about workplace harassment in New York City?", ["The New York City Commission on Human Rights", "The Federal Trade Commission", "The Department of Motor Vehicles", "The Internal Revenue Service"], 1, "The EEOC, the New York State Division of Human Rights and the New York City Commission on Human Rights all accept complaints."),
    q("What is the EEOC?", ["The federal agency that enforces laws against workplace discrimination and harassment", "A New York City court", "A trade union", "An insurance scheme"], 1, "The US Equal Employment Opportunity Commission."),
    q("Is it lawful to treat someone worse because they complained about harassment in good faith?", ["No: retaliation is unlawful, even if the complaint isn't upheld", "Yes, if the complaint isn't upheld", "Yes, if they're a contractor", "Only managers are protected"], 1, "Retaliation against anyone who complains, helps or takes part in an investigation is unlawful."),
    q("Which of these could be retaliation?", ["Giving someone worse clients after they made a complaint", "Thanking someone for raising a concern", "Investigating a complaint promptly", "Keeping a complaint confidential"], 1, "Any action that might stop someone from speaking up can be retaliation."),
    q("What are the five Ds of bystander intervention?", ["Distract, Delegate, Document, Delay, Direct", "Deny, Defend, Debate, Decide, Delete", "Detect, Discuss, Decide, Do, Debrief", "Distance, Discipline, Document, Dismiss, Direct"], 1, "Five ways to help, from the safest to the most direct."),
    q("At an event, you see someone being made uncomfortable by unwanted attention. Which is a \"Distract\" response?", ["Interrupt with a reason for the person to step away", "Confront the harasser loudly", "Film it and post it online", "Ignore it"], 1, "Distract gives the person a way out without confrontation."),
    q("What does \"Delay\" mean in bystander intervention?", ["Checking in with the person afterwards and offering support", "Waiting a week before reporting", "Delaying the event", "Asking the harasser to wait"], 1, "Checking in afterwards can make a real difference."),
    q("A contractor tells you, a supervisor, about harassment, and asks you to keep it secret. What must you do?", ["Explain you must report it to HR, then report it the same day", "Keep it secret, as asked", "Confront the harasser yourself", "Wait to see if it happens again"], 1, "Supervisors must report harassment they're told about, and can't promise secrecy."),
    q("Should a manager investigate a harassment complaint on their own?", ["No: report it to HR, who lead the investigation", "Yes, always", "Only if it's minor", "Only if the person agrees"], 1, "HR leads investigations. Managers must report straight away."),
    q("How often must New York employers provide harassment prevention training?", ["Every year", "Once, when someone joins", "Every five years", "Only after a complaint"], 1, "New York State and New York City both require annual interactive training."),
  ],
  sources: [
    ["New York State: Combating Sexual Harassment in the Workplace", "https://www.ny.gov/combating-sexual-harassment-workplace/employers"],
    ["New York State Division of Human Rights", "https://dhr.ny.gov/"],
    ["NYC Commission on Human Rights: Sexual harassment", "https://www.nyc.gov/site/cchr/law/sexual-harassment.page"],
    ["NYC Commission on Human Rights: Bystander intervention", "https://www.nyc.gov/site/cchr/community/bystander-intervention.page"],
    ["US Equal Employment Opportunity Commission: Harassment", "https://www.eeoc.gov/harassment"],
    ["Right To Be: The five Ds of bystander intervention", "https://righttobe.org/guides/bystander-intervention-training/"],
  ],
  reviewNotes: `Please check or fill in before sign-off. Ask US counsel or an HR adviser in New York to review this course.
1. Requirements check: New York State (Labor Law 201-g) requires annual interactive training that includes an explanation of sexual harassment, examples, information on federal and state law and remedies, employees' rights of redress and all available forums, and information on conduct by supervisors and their additional responsibilities. New York City (Admin Code 8-107(30)) adds: harassment as discrimination under local law, the internal complaint process, the external complaint processes with contact details, the prohibition of retaliation with examples, bystander intervention, and managers' responsibilities. Please confirm the course covers each one.
2. Record-keeping: New York City requires employers to keep a record of all training, including a signed acknowledgement, for three years. Until the hub stores official records, keep a separate signed acknowledgement (or the LearnUpon record).
3. Lesson 4: link to Stott and May's US anti-harassment policy and complaint form (New York State requires both), and name the HR contact for the US team. Add a contact for questions about the training, as New York's guidance expects people to be able to ask questions.
4. Lesson 4: check the agency phone numbers and websites are current.
5. Lesson 1: confirm the protected characteristics listed are current (New York adds to them from time to time).
6. Spelling: like the rest of the hub, this course uses British spelling. As it's for the US team, you may prefer US spelling (\"recognize\", \"behavior\", \"color\"): say if so and we'll switch it.
7. Assessment: 12 questions drawn from 18, pass mark 80%, renew every 12 months (annual training is required).`,
};
