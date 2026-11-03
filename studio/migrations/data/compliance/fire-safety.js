// Fire Safety, for UK and US staff. Written from the Regulatory Reform (Fire Safety) Order 2005, UK
// Government fire safety guidance and fire and rescue service advice, with US notes from OSHA and NFPA. For review and sign-off by HR and Compliance.
import { text, keyPoints, law, doDont, sorter, scenario, spotIt, q } from "./kit.js";

export default {
  slug: "fire-safety",
  title: "Fire Safety",
  category: "safety",
  region: "global",
  order: 52,
  icon: "flame",
  accent: "brand",
  minutes: 25,
  renewMonths: 12,
  passMark: 80,
  questionsPerAttempt: 10,
  summary: "How fires start and how to prevent them, fire equipment and signs, what to do if you discover a fire, and how to evacuate safely.",
  intro: "Fires in offices are rare, but when they happen they spread fast, and smoke can overcome people in minutes. Knowing how to prevent a fire, and exactly what to do if one starts, saves lives. This course covers both. It takes about 25 minutes and ends with an assessment: you need 80% to pass.",
  outcomes: [
    "Explain how fires start, and the main causes in offices",
    "Prevent fires through everyday habits",
    "Recognise fire safety signs and equipment, and know which extinguisher suits which fire",
    "Know what to do if you discover a fire, and when the alarm sounds",
    "Explain personal emergency evacuation plans and the role of fire marshals",
  ],
  lessons: [
    {
      title: "Fire safety law, and how fires start",
      summary: "Who's responsible, the fire triangle and the main causes.",
      blocks: [
        law("UK: Regulatory Reform (Fire Safety) Order 2005", "The \"responsible person\" for a building (usually the employer, landlord or building manager) must carry out a fire risk assessment, provide fire alarms, escape routes, signs, lighting and firefighting equipment, and make sure everyone knows what to do in a fire.\n\nEmployees must take reasonable care of themselves and others, co-operate with the fire safety arrangements, and report anything that could be a fire risk."),
        law("If you work in the US", "OSHA requires employers to have an emergency action plan and a fire prevention plan, and to train staff on them. Local fire codes apply too: in New York City, the Fire Department (FDNY) sets the rules for office buildings, including fire drills run by the building's fire safety director. In an emergency, call 911."),
        text("The fire triangle", "A fire needs three things: heat, fuel and oxygen. Take any one away and it can't burn. Fire prevention is about keeping heat sources and fuel apart. Firefighting is about removing one side of the triangle: water cools (heat), a fire blanket smothers (oxygen)."),
        text("Common causes of fire in offices", null, [
          "Faulty, damaged or overloaded electrical equipment, sockets and extension leads",
          "Lithium-ion batteries in laptops, phones, power banks, e-bikes and e-scooters, especially when damaged, using the wrong charger, or charged unattended",
          "Heaters placed near paper, furniture or packaging",
          "Kitchens: toasters, microwaves and unattended cooking",
          "Rubbish, packaging and paper allowed to build up",
          "Smoking materials, and in rare cases, deliberate fire-setting",
        ]),
      ],
    },
    {
      title: "Preventing fires",
      summary: "Everyday habits that keep heat and fuel apart.",
      blocks: [
        doDont(
          ["Report damaged plugs, cables and chargers, and stop using them", "Use the charger that came with your device, or the maker's replacement", "Keep heaters clear of paper, furniture and bins", "Keep rubbish and packaging cleared away", "Keep fire doors closed, and escape routes clear", "Switch off equipment at the end of the day"],
          ["Overload sockets, or plug extension leads into each other", "Charge e-bikes, e-scooters or power banks in the office unless it's allowed and supervised", "Leave toasters, microwaves or cooking unattended", "Prop fire doors open with extinguishers, bins or wedges", "Store anything in escape routes or stairwells", "Cover a laptop or charger while it's charging"],
        ),
        spotIt("Fire risks in this office", "Select each marker, then decide whether it's fine or a problem.", "office", [
          ["fire-exit", "The fire exit", true, "Boxes blocking a fire exit could trap people in a fire. Escape routes must always be clear."],
          ["extinguisher", "The fire extinguisher", false, "Fine. It's on its bracket, visible and unblocked. Never move one to prop a door."],
          ["high-stack", "Cardboard boxes piled high", true, "Piles of cardboard are fuel for a fire, and can fall and block a route. Store them safely or recycle them."],
          ["cable", "The cable across the floor", true, "A cable that's trodden on and dragged across the floor can be damaged and overheat, as well as being a trip hazard. Re-route it and check it."],
          ["printer", "The printer", false, "Fine, as long as it's working properly and kept clear of piles of paper. Report it if it smells hot or sparks."],
        ]),
      ],
    },
    {
      title: "Fire equipment and signs",
      summary: "Alarms, signs, and which extinguisher for which fire.",
      blocks: [
        text(null, "Know where these are in your office:", [
          "Fire alarm call points: red boxes you press to raise the alarm",
          "Fire exit signs: green signs with a running figure, showing the way out",
          "Fire extinguishers and fire blankets, and the fire assembly point outside",
          "Fire doors: marked \"Fire door, keep shut\". They hold back fire and smoke while people escape",
        ]),
        text("Fire extinguishers", "In the UK, extinguishers are red with a coloured band or label that shows what's inside:", [
          "Water (red label): paper, wood, fabric and other solids. Never on electrical or oil fires",
          "Foam (cream label): solids, and flammable liquids such as petrol",
          "Carbon dioxide, CO2 (black label): electrical equipment, and flammable liquids",
          "Dry powder (blue label): many types of fire, but rarely used indoors because the powder is hard to breathe and see through",
          "Wet chemical (yellow label): cooking oil and fat fires",
        ]),
        text("In the US", "US extinguishers are labelled by the class of fire they're for: A (ordinary materials such as paper and wood), B (flammable liquids), C (electrical equipment) and K (kitchen oils and fats). Most US offices have \"ABC\" multipurpose dry chemical extinguishers, which work on the first three. Use a class K extinguisher, or a fire blanket, for cooking oil."),
        sorter("Which extinguisher?", "Choose the right type for each fire.", ["Water or foam", "CO2", "Wet chemical"], [
          ["Paper burning in a waste bin", "Water or foam", "A fire in ordinary solid materials."],
          ["A photocopier with smoke coming out", "CO2", "Electrical equipment: CO2 doesn't conduct electricity or leave residue."],
          ["Cooking oil on fire in a pan in the kitchen", "Wet chemical", "Never use water on burning oil: it can cause an explosion of flame. A fire blanket also works for a small pan."],
          ["A burning cardboard box", "Water or foam", "A fire in ordinary solid materials."],
          ["A smoking socket and extension lead", "CO2", "Electrical: never water."],
        ]),
        keyPoints("Before you ever use an extinguisher", [
          "Only use one if you've been trained, the fire is small, and it's safe.",
          "Raise the alarm first, and make sure someone has called 999 (911 in the US).",
          "Keep your escape route behind you.",
          "If the fire doesn't go out quickly, leave, close the door and get out.",
        ]),
      ],
    },
    {
      title: "If there's a fire",
      summary: "What to do if you discover a fire, and when the alarm sounds.",
      blocks: [
        keyPoints("If you discover a fire", [
          "Raise the alarm straight away: shout \"Fire!\" and press the nearest fire alarm call point.",
          "Call 999 (911 in the US), or make sure someone has.",
          "Leave by the nearest safe exit, closing doors behind you.",
          "Only tackle the fire if you're trained, it's small and it's safe.",
        ]),
        keyPoints("When the alarm sounds", [
          "Stop what you're doing and leave straight away, by the nearest safe exit.",
          "Don't stop to collect belongings, and don't use the lifts.",
          "Help visitors and anyone who needs it, if it's safe to.",
          "Go to the assembly point and report to the fire marshal, so they know you're out.",
          "Don't go back in until the fire service or fire marshal says it's safe.",
        ]),
        text("If you're trapped", "Get into a room with a window, close the door and put towels or clothing along the bottom to keep smoke out. Call 999 (911 in the US) and say exactly where you are. Stay low, where the air is clearer, and open the window to signal for help. If your clothes catch fire: stop, drop to the ground, and roll."),
        scenario("You go into the office kitchen and see smoke and flames coming from the waste bin. Nobody else is around. What do you do first?", [
          ["Fill a cup with water and try to put it out quietly", false, "Raise the alarm first. Fires grow quickly, and others need to know."],
          ["Shout \"Fire!\", press the nearest call point and make sure 999 (911 in the US) is called. Only tackle it if you're trained and it's small and safe; otherwise close the door and leave", true, "Right. Raise the alarm first, then decide whether it's safe to tackle, with your escape route behind you."],
          ["Open the windows to let the smoke out", false, "Fresh air feeds the fire. Close the door, raise the alarm and get out."],
        ]),
      ],
    },
    {
      title: "Evacuation plans and fire marshals",
      summary: "Making sure everyone gets out, including people who need help.",
      blocks: [
        text("Personal emergency evacuation plans (PEEPs)", "Some people may need help to get out quickly: for example, people with mobility difficulties, sight or hearing loss, a temporary injury, or in later pregnancy. A PEEP sets out how they'll be alerted and helped. If you think you might need one, even for a short time, tell your manager or HR. It's confidential, and it's about keeping you safe."),
        text("Fire marshals (fire wardens)", "Fire marshals are trained colleagues who help with evacuation: they check areas are clear, guide people to exits, take the roll call at the assembly point and give information to the fire service. Follow their instructions during an alarm, and find out who they are in your office."),
        text("Fire drills", "Fire drills are held regularly, at least once a year. Treat every drill as real: it's how we find out whether the plan works."),
        scenario("A colleague recently broke their leg and is on crutches. The office is on the third floor. They haven't mentioned how they'd get out in a fire. What's the most helpful thing to do?", [
          ["Nothing: it's their business", false, "In a fire, they may not be able to use the stairs quickly. It's worth raising, sensitively."],
          ["Mention to them, privately, that they can ask for a temporary personal evacuation plan, and suggest they speak to their manager or HR", true, "Right. A temporary PEEP makes sure someone knows how to help them out safely."],
          ["Tell the whole team so everyone can help", false, "Their health information is private. Let them decide who to tell, and point them to the right route."],
        ]),
        keyPoints("Remember", [
          "Heat, fuel and oxygen: keep heat and fuel apart.",
          "Keep exits clear and fire doors shut.",
          "Raise the alarm first, then get out. Only fight a fire if trained, it's small and it's safe.",
          "Never use lifts in a fire, and never go back in.",
          "Know your exits, assembly point and fire marshals.",
        ]),
      ],
    },
  ],
  questions: [
    q("What three things does a fire need?", ["Heat, fuel and oxygen", "Heat, water and paper", "Electricity, smoke and wind", "Fuel, carbon dioxide and heat"], 1, "Remove any one, and the fire can't burn."),
    q("Under the UK Fire Safety Order, what must employees do?", ["Take reasonable care, co-operate with fire safety arrangements, and report fire risks", "Carry out the fire risk assessment", "Buy their own extinguisher", "Nothing: it's the landlord's job"], 1, "Employees have duties too."),
    q("Which of these is a common cause of office fires?", ["Faulty or overloaded electrical equipment", "Indoor plants", "Water coolers", "Open-plan desks"], 1, "Electrical faults and overloading are a leading cause."),
    q("Why are lithium-ion batteries a fire risk?", ["They can overheat and catch fire, especially when damaged or charged with the wrong charger", "They're never a risk", "Only when they're cold", "Only in cars"], 1, "Use the right charger, and report damaged batteries."),
    q("Why must fire doors be kept shut?", ["They hold back fire and smoke while people escape", "They keep the office warm", "They stop people getting lost", "They're heavy"], 1, "Never prop them open."),
    q("In the UK, which extinguisher should be used on a computer fire?", ["CO2 (black label)", "Water (red label)", "Wet chemical (yellow label)", "None: always use water"], 1, "CO2 is safe on electrical equipment."),
    q("Which extinguisher is used for cooking oil fires?", ["Wet chemical (class K in the US), or a fire blanket for a small pan", "Water", "Whatever is nearest", "Any type"], 1, "Wet chemical (class K), or a fire blanket for a small pan. Never water."),
    q("In the US, what does a class C fire involve?", ["Electrical equipment", "Cooking oil", "Paper and wood", "Metals"], 1, "A is ordinary materials, B flammable liquids, C electrical, K kitchen oils."),
    q("Why should you never use water on burning cooking oil?", ["It can cause an explosion of burning oil", "It's a waste of water", "It makes the fire smell", "It stains the kitchen"], 1, "Water on burning oil turns to steam instantly and throws the oil out."),
    q("You discover a fire. What should you do first?", ["Raise the alarm and make sure 999 (911 in the US) is called", "Try to put it out before telling anyone", "Collect your belongings", "Open the windows"], 1, "Raising the alarm comes first."),
    q("When should you use a fire extinguisher?", ["Only if you're trained, the fire is small, and it's safe, with your escape route behind you", "On any fire, before leaving", "Never", "Only if a manager tells you to"], 1, "Your safety comes first."),
    q("The fire alarm sounds. Which is right?", ["Leave by the nearest safe exit without using the lifts, and go to the assembly point", "Take the lift to get out faster", "Finish your call first", "Collect your laptop and coat"], 1, "Leave straight away, by the stairs."),
    q("You're trapped in a room by a fire. What should you do?", ["Close the door, block the gaps with towels or clothing, call 999 (911 in the US) and signal from the window", "Open the door to look for a way out through the smoke", "Hide under a desk", "Stand on a chair to avoid the smoke"], 1, "Keep the smoke out, call for help and stay low."),
    q("What is a PEEP?", ["A personal emergency evacuation plan for someone who may need help to get out", "A type of fire alarm", "A fire drill", "A fire extinguisher"], 1, "It sets out how someone will be alerted and helped."),
    q("What do fire marshals do?", ["Help with evacuation, check areas are clear and take the roll call", "Put out every fire", "Carry out the fire risk assessment", "Test the extinguishers every day"], 1, "Follow their instructions during an alarm."),
    q("How often should fire drills be held?", ["Regularly, at least once a year", "Only after a real fire", "Every five years", "Never: alarms are enough"], 1, "Drills test the plan, so treat them as real."),
  ],
  sources: [
    ["UK Government: Fire safety in the workplace", "https://www.gov.uk/workplace-fire-safety-your-responsibilities"],
    ["Regulatory Reform (Fire Safety) Order 2005", "https://www.legislation.gov.uk/uksi/2005/1541/contents"],
    ["London Fire Brigade: Fire safety at work", "https://www.london-fire.gov.uk/safety/the-workplace/"],
    ["London Fire Brigade: E-bike and e-scooter fire safety", "https://www.london-fire.gov.uk/safety/lithium-batteries/"],
    ["UK Government: Fire safety risk assessment, offices and shops", "https://www.gov.uk/government/publications/fire-safety-risk-assessment-offices-and-shops"],
    ["OSHA: Emergency action plans", "https://www.osha.gov/etools/evacuation-plans-procedures/eap"],
    ["FDNY: Fire safety for office buildings", "https://www.nyc.gov/site/fdny/index.page"],
  ],
  reviewNotes: `Please check or fill in before sign-off:
1. For each UK office: the assembly point, fire marshals, and whether the building is managed by a landlord (for example, Regus) who runs the alarms and drills. These could go in a short "Your office" part of lesson 5.
2. Lesson 2: our rules on charging e-bikes, e-scooters and power banks in the office.
3. Lesson 3: which extinguisher types are actually in our offices, so the course can say which ones people will see.
4. Lesson 5: how to ask for a PEEP (manager, HR or office manager).
5. Lesson 5: how often drills are held in each office, if more often than once a year.
6. This course is now for UK and US staff. Lessons 1 and 3 have US notes (OSHA, FDNY, extinguisher classes, 911). Add the New York office's evacuation arrangements (building fire safety director, floor wardens, assembly point).
7. Assessment: 10 questions drawn from 16, pass mark 80%, renew every 12 months.`,
};
