// Health & Safety: Working From Home (UK). Written from HSE guidance and the regulations listed
// in "sources". For review and sign-off by HR and Compliance before it counts.
import { text, keyPoints, law, doDont, stat, figure, spotIt, sorter, scenario, checklist, q } from "./kit.js";

export default {
  slug: "hs-working-from-home",
  title: "Health & Safety: Working From Home (UK)",
  category: "safety",
  region: "uk",
  order: 50,
  icon: "house",
  accent: "brand",
  minutes: 30,
  renewMonths: 12,
  passMark: 80,
  questionsPerAttempt: 10,
  summary: "Set up and work safely at home: your workstation, breaks and eyes, electrical and fire safety, wellbeing, and what to report.",
  intro: "Working from home is still work, so the same health and safety law applies at your kitchen table as in the office. This course shows you how to set up a safe, comfortable workspace, look after your body, eyes and mind, and what to tell us if something changes or goes wrong. It takes about 30 minutes and ends with a short assessment: you need 80% to pass.",
  outcomes: [
    "Explain what Stott and May is responsible for, and what you are responsible for, when you work at home",
    "Set up a screen, chair, keyboard and lighting so you can work comfortably",
    "Spot common hazards in a home workspace and fix them",
    "Build breaks into your day, and know how to get an eye test",
    "Look after your wellbeing when you work on your own",
    "Know what to report, and when to check your set-up again",
  ],
  lessons: [
    {
      title: "Home working is still work",
      summary: "The law, and who is responsible for what.",
      blocks: [
        text(null, "When you work from home, Stott and May has the same duty to protect your health, safety and welfare as it does in the office. You have duties too: to take reasonable care of yourself, to follow the guidance and training you're given, and to tell us about problems.\n\nMost home-working risks are low, but they add up. A screen that's too low, a dining chair with no support or a day without breaks rarely hurts on day one. Over months, they can mean neck, back and wrist pain, eye strain, headaches and stress."),
        stat("543,000", "workers in Great Britain had a work-related musculoskeletal disorder, such as back, neck, shoulder or wrist pain, in 2023/24", "HSE, Work-related ill health statistics 2023/24"),
        law("Health and Safety at Work etc. Act 1974", "Employers must, so far as is reasonably practicable, protect the health, safety and welfare of their employees, wherever they work.\n\nEmployees must take reasonable care of their own health and safety and that of others, and co-operate with their employer on health and safety."),
        law("Management of Health and Safety at Work Regulations 1999", "Employers must assess the risks of the work people do, including work done at home, and put sensible measures in place. That's why we ask you to check your home set-up and tell us about problems."),
        law("Health and Safety (Display Screen Equipment) Regulations 1992", "If you use a screen daily, for continuous spells of an hour or more, you're a display screen equipment (DSE) user. Your workstation must be assessed, your work should include breaks or changes of activity, and you can ask for an eye test, paid for by your employer."),
        sorter("Whose job is it?", "Decide who is responsible for each one.", ["Stott and May", "You", "Both of us"], [
          ["Carrying out a risk assessment of home working", "Stott and May", "It's the employer's duty under the 1999 Regulations. You help by answering honestly about your set-up."],
          ["Setting up your desk, chair and screen the way this course shows", "You", "You're at the desk every day. This course and the checklist show you how."],
          ["Telling your manager about pain, discomfort or a problem with your set-up", "You", "Only you know how it feels. Speaking up early means it can be fixed before it becomes a long-term problem."],
          ["Arranging and paying for an eye test when a screen user asks for one", "Stott and May", "Under the DSE Regulations the employer pays for the test, and for basic glasses if you need them specifically for screen work."],
          ["Keeping company equipment, like your laptop and charger, safe to use", "Both of us", "We provide safe equipment and fix faults. You check it for damage, use it properly and report problems."],
          ["Keeping your home's own wiring and sockets safe", "You", "Your home's electrics are your responsibility. We're responsible for the equipment we provide."],
          ["Making sure there's time for breaks and changes of activity", "Both of us", "Work should be planned so breaks are possible, and you need to take them."],
        ]),
        keyPoints("In short", [
          "The same law protects you at home as in the office.",
          "Stott and May assesses the risks and provides safe equipment. You set up safely, use what you're given properly and speak up.",
          "If something doesn't feel right, tell your manager early. Small fixes now prevent long-term problems.",
        ]),
      ],
    },
    {
      title: "Set up your workstation",
      summary: "Screen, chair, keyboard and light: the set-up that protects your neck, back, wrists and eyes.",
      blocks: [
        text(null, "You don't need an expensive home office to work comfortably. You need the right heights and distances, and a way of sitting that's supported. Use the drawing as your guide, then check your own set-up."),
        figure("desk-posture", [
          ["screen-height", "Top of the screen at or slightly below eye level, so you look straight ahead or slightly down."],
          ["distance", "Screen roughly an arm's length away, straight in front of you."],
          ["back", "Lower back supported. Use a cushion or a rolled-up towel if the chair doesn't do it."],
          ["elbows", "Elbows by your sides and forearms roughly level: adjust the chair height to get this."],
          ["wrists", "Wrists straight while you type, with the keyboard and mouse close and space in front to rest your hands."],
          ["feet", "Feet flat on the floor. If they don't reach, use a footrest or a sturdy box."],
          ["light", "Good light without glare. Put the screen side-on to windows and use a lamp if you need one."],
        ], "A good seated set-up, based on HSE guidance on working with display screen equipment."),
        text("Working on a laptop", "Laptops are built to be portable, not for long spells of work. Because the screen and keyboard are joined, you either look down at the screen or reach up to the keyboard.\n\nFor anything more than short spells, raise the laptop so the screen is at eye level (on a laptop stand or a stack of books) and use a separate keyboard and mouse. A separate monitor is even better. If you need equipment to work safely at home, ask your manager."),
        doDont(
          ["Adjust your chair first, then the screen, then the keyboard and mouse", "Sit back in the chair so your back is supported", "Keep things you use often within easy reach", "Change position often: no posture is good for hours on end"],
          ["Work for long spells hunched over a laptop on a sofa, a bed or your lap", "Sit with your screen facing a bright window, or with a window behind you reflecting on it", "Perch on the edge of a hard dining chair all day", "Ignore aches and pains in the hope they go away"],
        ),
        scenario("Priya's new flat has no desk. For two weeks she's worked on the sofa with her laptop on her knees, and by mid-afternoon her neck aches. What should she do?", [
          ["Carry on: it's only temporary and the ache goes by the next morning", false, "Aches that come back every day are an early warning. Left alone, they can turn into long-term problems."],
          ["Work at a table, raise the laptop to eye level with a separate keyboard and mouse, and tell her manager about the ache and her set-up", true, "Right. A table, a raised screen and a separate keyboard fix the posture, and telling her manager means Stott and May can help, for example with equipment."],
          ["Buy a softer sofa cushion", false, "Comfort helps, but the problem is posture: looking down at a laptop on her knees strains her neck however soft the sofa."],
        ]),
        checklist("Check your own set-up now", [
          "The top of my screen is at, or a little below, eye level",
          "My screen is about an arm's length away and straight in front of me",
          "I use a separate keyboard and mouse with my laptop for long spells",
          "My lower back is supported",
          "My forearms are roughly level and my wrists straight when I type",
          "My feet rest flat on the floor or on a footrest",
          "There's no glare or reflection on my screen",
          "I have room to move and change position",
        ]),
      ],
    },
    {
      title: "Spot the problems",
      summary: "Look around a typical home workspace and decide what's fine and what needs fixing.",
      blocks: [
        text(null, "This home workspace was set up in a hurry. Check each numbered point and decide: fine, or a problem? Then look at your own space the same way."),
        spotIt("Spot the problems", "Select each marker, then decide whether it's fine or a problem.", "home-desk", [
          ["laptop", "The laptop", true, "The screen is far below eye level, so you'd look down all day and strain your neck. Raise it on a stand or books, and use a separate keyboard and mouse."],
          ["window", "The window", true, "Facing a bright window with the screen in front of it makes your eyes work hard against the glare. Turn the table so the window is to the side of the screen, or use a blind."],
          ["cable", "The cable across the floor", true, "A cable trailing across the floor is a trip hazard. Route it along the wall, or move closer to the socket."],
          ["socket", "The extension lead", true, "An adaptor plugged into an extension lead, full of plugs, can overload it and start a fire. Use one extension lead with no adaptors, within its rating."],
          ["chair", "The dining chair", true, "A hard dining chair with no back support or height adjustment is fine for a meal, not a working day. Use an adjustable chair if you can, or add a cushion to support your lower back."],
          ["box", "The box on the floor", true, "Clutter on the floor is a trip hazard. Keep walkways clear. (A sturdy box can make a good footrest, though, if your feet don't reach the floor.)"],
          ["drink", "The drink by the laptop", true, "A spill can damage equipment and is an electrical risk. Keep drinks to one side, away from the keyboard and cables."],
          ["lamp", "The floor lamp", false, "Fine. Extra light helps you see without straining, especially on dark afternoons. Just make sure it doesn't reflect on the screen."],
          ["plant", "The plant", false, "Fine. It's well away from the laptop and cables. Just water it away from your equipment."],
        ]),
        keyPoints("Fix the common ones", [
          "Raise the screen, and use a separate keyboard and mouse.",
          "Put the screen side-on to windows.",
          "Keep cables and clutter out of walkways.",
          "Never plug extension leads into each other, or adaptors into extension leads.",
          "Support your back and your feet.",
        ]),
      ],
    },
    {
      title: "Breaks, eyes and moving",
      summary: "Why short, frequent breaks matter, how to look after your eyes, and getting an eye test.",
      blocks: [
        text(null, "Long, unbroken spells at a screen are one of the main causes of eye strain and aches. The DSE Regulations don't set a fixed break length, but your work should include regular breaks or changes of activity, and HSE's guidance is that short, frequent breaks are better than longer, less frequent ones.\n\nAt home it's easy to go hours without moving: there's no walk to a meeting room or a colleague's desk. Build movement into your day on purpose."),
        keyPoints("Build breaks into your day", [
          "Take a short break or change activity every hour or so, before you feel tired: stand up, stretch, move around.",
          "Take calls standing up, or walking, where you can.",
          "Look away from the screen often. A handy rule of thumb: every 20 minutes, look at something about 6 metres (20 feet) away for 20 seconds.",
          "Have lunch away from your desk.",
          "Remember to blink. People blink less when they look at screens, which dries the eyes.",
        ]),
        law("Eye tests for screen users (DSE Regulations)", "If you're a DSE user, you can ask Stott and May to arrange and pay for an eye and eyesight test, and for further tests at regular intervals.\n\nIf the optician says you need glasses specifically for screen work, Stott and May pays for a basic pair. Ask your manager or HR how to arrange it."),
        scenario("It's 3pm. You've been on back-to-back calls and in Bullhorn since 9, with lunch at your desk. Your eyes are tired and you have a headache. What's the best thing to do?", [
          ["Push on and finish the shortlist, then rest tonight", false, "Working through tiredness makes mistakes more likely and the headache worse. A short break now is quicker in the end."],
          ["Take a proper break away from the screen (stand up, move, get water and daylight), then plan short breaks into the rest of the day", true, "Right. Breaking before you get tired prevents eye strain and aches. If headaches or tired eyes keep happening, ask about an eye test."],
          ["Turn the screen brightness right up so it's easier to see", false, "A screen much brighter than the room makes eye strain worse. Match the brightness to the room and cut the glare instead."],
        ]),
      ],
    },
    {
      title: "Electrical and fire safety at home",
      summary: "Simple checks that prevent the most common home-office accidents.",
      blocks: [
        text(null, "Most electrical fires in homes start with overloaded sockets, damaged cables or chargers. A quick look at your equipment, and at how it's plugged in, prevents most of them."),
        doDont(
          ["Check plugs, cables and chargers for damage before use: scorch marks, cracks, exposed wires", "Use the charger that came with your laptop or phone, or the maker's replacement", "Use one extension lead per socket, fully unwound, within its rating", "Switch off and unplug equipment at the end of the day", "Have working smoke alarms, test them regularly and know your way out", "Stop using faulty company equipment and report it"],
          ["Plug an extension lead into another extension lead, or adaptors into an extension lead", "Run cables under rugs or carpets, where damage goes unseen", "Charge devices on beds or sofas, or under cushions", "Use equipment with a damaged cable or a cracked plug", "Try to repair company equipment yourself", "Keep drinks next to laptops and cables"],
        ),
        sorter("Safe, or needs fixing?", "Sort each one.", ["Safe", "Needs fixing"], [
          ["A laptop charger with tape wrapped round a split in the cable", "Needs fixing", "Damaged cables can give shocks or start fires. Stop using it and get a replacement."],
          ["A four-way extension lead powering a laptop, a monitor and a phone charger", "Safe", "Low-power office equipment like this is well within a typical extension lead's rating."],
          ["Two extension leads plugged into each other to reach the desk", "Needs fixing", "Plugging leads into each other makes overloading and fire more likely. Use one longer lead instead."],
          ["A phone charging overnight under a pillow", "Needs fixing", "Chargers and devices give off heat. Covered up, they can overheat. Charge on a hard surface."],
          ["A cable run along the skirting board behind the desk", "Safe", "Out of the walkway and not under a rug: that's the way to route cables."],
          ["A cable running under the hallway rug", "Needs fixing", "Damage under a rug goes unseen, and the cable can overheat. Re-route it."],
        ]),
        keyPoints("If there's a fire", [
          "Get out, stay out and call 999.",
          "Don't stop to save equipment or work.",
          "Test your smoke alarms regularly.",
        ]),
      ],
    },
    {
      title: "Look after your wellbeing",
      summary: "Stress, isolation and switching off when your home is also your office.",
      blocks: [
        text(null, "Working from home has real benefits: no commute, fewer interruptions, more flexibility. It has risks too. The working day can creep into the evening, you can feel cut off from your team, and there's no one nearby to notice if you're struggling.\n\nStress is a health and safety risk like any other, and employers have to manage it."),
        stat("776,000", "workers in Great Britain had work-related stress, depression or anxiety in 2023/24, the most common type of work-related ill health", "HSE, Work-related ill health statistics 2023/24"),
        text("What causes work-related stress", "HSE's Management Standards describe six areas of work that, if they aren't managed well, lead to stress:", [
          "Demands: workload, work patterns and the work environment",
          "Control: how much say you have in the way you do your work",
          "Support: encouragement and resources from your manager and colleagues",
          "Relationships: avoiding conflict and dealing with unacceptable behaviour",
          "Role: understanding your role and responsibilities",
          "Change: how change is managed and communicated",
        ]),
        keyPoints("Habits that help", [
          "Keep a routine: regular start and finish times, and a proper lunch break.",
          "Switch off at the end of the day: close the laptop and turn off notifications.",
          "Keep work and home apart if you can, even if that just means putting the laptop away.",
          "Stay connected: use video for team catch-ups, and make time for informal chats.",
          "Get outside and move every day.",
          "Speak up early if your workload, or anything else, is getting too much.",
        ]),
        scenario("A colleague on your desk usually joins the morning stand-up with their camera on and plenty to say. For the past two weeks their camera has been off, they've missed two calls and their messages are short. What do you do?", [
          ["Leave it. It's their business, and they'll say if something's wrong", false, "People who are struggling often don't say so, especially when they work alone. A friendly check-in can make a real difference."],
          ["Message them privately, ask how they are and listen. If you're worried about them, let your manager know", true, "Right. A private, low-pressure check-in shows you've noticed and you care. You don't have to fix anything, just listen and point them to support."],
          ["Mention it in the team chat so everyone can check in", false, "Well meant, but raising it in front of the team can embarrass them. Keep it private."],
        ]),
        text("Where to get support", "Talk to your manager or HR about the support Stott and May offers. If you need to talk to someone straight away, Samaritans are free to call on 116 123, any time, day or night. For health worries, contact your GP or NHS 111."),
      ],
    },
    {
      title: "Report it, and keep it up to date",
      summary: "What to report, when to check your set-up again, and changes in your circumstances.",
      blocks: [
        text(null, "Health and safety only works if problems are known about. Tell your manager straight away about:", [
          "Any accident or injury while you're working, however minor",
          "Near misses: something that could have caused an injury",
          "Pain, discomfort, eye strain or headaches you think may be linked to your work",
          "Faulty or damaged company equipment",
          "Anything that makes it hard to work safely at home",
        ]),
        text("Check again when things change", "Your set-up isn't a one-off. Check it again, and tell your manager, if you move home or room, get new equipment, or your health or circumstances change: for example if you become pregnant, have an injury, or have a health condition or disability that affects how you work. Stott and May can then review the risks and make reasonable adjustments."),
        scenario("You're carrying a box of client files up the stairs to your home office when you trip. You're bruised but think you're fine. What do you do?", [
          ["Nothing: it happened at home, so it isn't a work matter", false, "You were doing a work task, so it's a work-related accident. It needs reporting, even at home."],
          ["Report it to your manager the same day, with what happened and how, even though the injury seems minor", true, "Right. Reporting it means it's on record, you get support if the injury turns out to be worse, and the cause can be dealt with so it doesn't happen again."],
          ["Report it only if you need time off", false, "Report every work-related accident and near miss, however minor. Some injuries only show up later, and the record matters."],
        ]),
        keyPoints("Remember", [
          "Home working is still work: the same rules apply.",
          "Set up properly, take breaks and look after your wellbeing.",
          "If something's wrong, report it early.",
        ]),
      ],
    },
  ],
  questions: [
    q("When you work from home, does health and safety law still apply?", ["Yes: employers have the same duty to protect employees wherever they work", "No: it only applies on company premises", "Only if you work from home more than three days a week", "Only for people with a home-working contract"], 1, "The Health and Safety at Work etc. Act 1974 protects employees wherever they work, including at home."),
    q("Who counts as a display screen equipment (DSE) user?", ["Anyone who uses a screen daily, for continuous spells of an hour or more", "Only people who use two screens", "Only people who work in IT", "Anyone who owns a computer"], 1, "If you use a screen daily for continuous spells of an hour or more, you're a DSE user and the DSE Regulations apply."),
    q("Where should the top of your screen be?", ["At or slightly below eye level", "Well below eye level, so you look down", "Well above eye level, so you look up", "It doesn't matter if the text is big enough"], 1, "With the top of the screen at or just below eye level, you look straight ahead or slightly down, which is easiest on your neck."),
    q("About how far away should your screen be?", ["Roughly an arm's length", "As close as possible", "At least two metres", "Half an arm's length"], 1, "Roughly an arm's length lets you read comfortably without leaning in."),
    q("You work on a laptop for most of the day. What's the best set-up?", ["Raise the laptop so the screen is at eye level, and use a separate keyboard and mouse", "Use it on your lap so it's close to you", "Keep it flat on the table and lean forward", "Tilt the screen back as far as it goes"], 1, "Raising the screen and using a separate keyboard and mouse fixes the laptop's built-in posture problem."),
    q("Where should a window be in relation to your screen?", ["To the side of the screen", "Directly behind the screen", "Directly behind you", "It makes no difference"], 1, "Side-on light avoids glare in your eyes (a window behind the screen) and reflections on the screen (a window behind you)."),
    q("What's the best way to take breaks from screen work?", ["Short, frequent breaks or changes of activity", "One long break at the end of the day", "No breaks, to finish sooner", "Breaks only once your eyes hurt"], 1, "HSE's guidance is that short, frequent breaks are better than longer, less frequent ones."),
    q("You're a DSE user and would like an eye test. Who pays?", ["Stott and May, as your employer", "You do", "The NHS, always", "No one: eye tests aren't covered"], 1, "Under the DSE Regulations, your employer arranges and pays for an eye test when you ask, and for basic glasses if you need them specifically for screen work."),
    q("Which of these is a fire risk?", ["An adaptor plugged into an extension lead", "One extension lead powering a laptop and a monitor", "A charger on a hard desk surface", "Switching equipment off at night"], 1, "Adaptors in extension leads, and leads plugged into each other, make overloading and fire more likely."),
    q("Your laptop charger cable has split. What should you do?", ["Stop using it, and report it to get a replacement", "Wrap it in tape and carry on", "Only use it during the day", "Use it until it stops working"], 1, "Damaged cables can give shocks or start fires. Stop using it and report it."),
    q("You nearly trip over a cable while working at home, but you're not hurt. Should you report it?", ["Yes: near misses should be reported too", "No: only injuries need reporting", "Only if it happens twice", "Only if it happened in the office"], 1, "Near misses show where an accident could happen, so the cause can be fixed first."),
    q("Which of these is one of the six areas in HSE's Management Standards for work-related stress?", ["Control: how much say you have in the way you work", "Salary", "Office location", "Job title"], 1, "The six areas are demands, control, support, relationships, role and change."),
    q("A colleague who works from home seems withdrawn and has missed several calls. What's the best first step?", ["Check in with them privately, ask how they are and listen", "Ignore it: it's their business", "Ask about it in the team chat", "Report them for missing calls"], 1, "A private, friendly check-in shows you care without putting them on the spot."),
    q("When should you check your home workstation set-up again?", ["When you move, change equipment, or your health or circumstances change", "Never: once is enough", "Only if your manager asks", "Every five years"], 1, "Changes in where you work, what you use or your health can change the risks."),
    q("What's the right way to run a cable from your desk to the socket?", ["Along the wall, out of the walkway", "Across the middle of the room", "Under a rug, so it's hidden", "Through a doorway, so the door holds it in place"], 1, "Cables in walkways are trip hazards, and cables under rugs can be damaged without anyone seeing."),
    q("What is your own duty as an employee under health and safety law?", ["To take reasonable care of your own health and safety and that of others, and co-operate with your employer", "None: health and safety is only the employer's job", "To carry out the company's risk assessments yourself", "To buy all your own equipment"], 1, "The 1974 Act gives employees duties too: take reasonable care, and co-operate."),
  ],
  sources: [
    ["HSE: Protecting home workers", "https://www.hse.gov.uk/home-working/"],
    ["HSE: Working safely with display screen equipment", "https://www.hse.gov.uk/msd/dse/"],
    ["HSE: Work-related stress and how to manage it", "https://www.hse.gov.uk/stress/"],
    ["HSE: Health and safety statistics", "https://www.hse.gov.uk/statistics/"],
    ["The Health and Safety (Display Screen Equipment) Regulations 1992", "https://www.legislation.gov.uk/uksi/1992/2792/contents"],
    ["Electrical Safety First: safety in the home", "https://www.electricalsafetyfirst.org.uk/"],
  ],
  reviewNotes: `Please check or fill in before sign-off:
1. Figures in lessons 1 and 6 (543,000 musculoskeletal disorders; 776,000 stress, depression or anxiety) are HSE's 2023/24 figures. HSE publishes new figures each November: update to the latest.
2. Equipment: what Stott and May provides for home workers (monitor, keyboard and mouse, laptop stand, chair) and how to ask for it. Lesson 2 currently says "ask your manager".
3. Eye tests: how a DSE user arranges a test and claims for glasses (lesson 4 currently says "ask your manager or HR").
4. Wellbeing support (lesson 6, "Where to get support"): add Stott and May's Employee Assistance Programme or other support, if there is one.
5. Reporting (lesson 7): confirm who accidents and near misses go to (manager, HR, a health and safety lead) and whether there's an accident book or online form to link to.
6. Home-working risk assessment: if there's a company DSE or home-working self-assessment form, we can link to it from lesson 2.
7. Assessment: 10 questions drawn from 16, pass mark 80%, renew every 12 months. Confirm these settings.`,
};
