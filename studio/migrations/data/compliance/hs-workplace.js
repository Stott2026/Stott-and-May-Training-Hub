// Health & Safety: The Workplace (UK). Written from HSE guidance and the regulations listed in
// "sources". For review and sign-off by HR and Compliance before it counts.
import { text, keyPoints, law, doDont, sorter, scenario, spotIt, q } from "./kit.js";

export default {
  slug: "hs-workplace",
  title: "Health & Safety: The Workplace (UK)",
  category: "safety",
  region: "uk",
  order: 51,
  icon: "shield-alert",
  accent: "brand",
  minutes: 30,
  renewMonths: 12,
  passMark: 80,
  questionsPerAttempt: 10,
  summary: "Staying safe in the office: risk, spotting hazards, slips and trips, lifting and carrying, fire safety, first aid and reporting.",
  intro: "Offices are low-risk places, but people still get hurt in them: tripping over cables, slipping on spills, lifting boxes badly or not knowing what to do when the fire alarm goes. This course covers your part in keeping our offices safe, and what to do when something goes wrong. It takes about 30 minutes and ends with an assessment: you need 80% to pass.",
  outcomes: [
    "Explain the difference between a hazard and a risk, and how risks are assessed",
    "Spot common hazards in an office and deal with them",
    "Prevent slips, trips and falls",
    "Lift and carry safely, or know when not to",
    "Know what to do when the fire alarm sounds",
    "Know where to find first aid, and how to report accidents and near misses",
  ],
  lessons: [
    {
      title: "Health and safety at work",
      summary: "Who's responsible for what, and how risks are managed.",
      blocks: [
        text(null, "Stott and May must protect the health, safety and welfare of everyone at work, and of visitors. You must take reasonable care of yourself and the people around you, follow the safety arrangements, and report problems. In most offices, the landlord or building manager also has duties, for example for fire alarms and shared areas."),
        law("Health and Safety at Work etc. Act 1974", "The main health and safety law in Great Britain. Employers must do what is reasonably practicable to keep people safe. Employees must take reasonable care and co-operate with their employer, and must not interfere with or misuse anything provided for safety, such as fire extinguishers or signs."),
        law("Workplace (Health, Safety and Welfare) Regulations 1992", "Set the basics for any workplace: a reasonable temperature, good lighting and ventilation, clean and uncluttered floors and walkways, toilets and washing facilities, drinking water, and somewhere to rest and eat."),
        text("Hazards and risks", "A hazard is anything that could cause harm, such as a trailing cable or a wet floor. A risk is the chance that someone will actually be harmed by it, and how badly.\n\nStott and May manages risks through risk assessments, in five steps:", [
          "Identify the hazards",
          "Decide who might be harmed, and how",
          "Evaluate the risks and decide on precautions",
          "Record the findings and put them in place",
          "Review the assessment, and update it when things change",
        ]),
        sorter("Hazard, or risk?", "Decide for each one.", ["Hazard", "Risk"], [
          ["A cable running across the walkway", "Hazard", "It's something that could cause harm."],
          ["The chance that someone carrying coffee trips over the cable on the way back from the kitchen", "Risk", "It's the likelihood and the severity of harm."],
          ["Boxes piled on top of a tall cabinet", "Hazard", "They could fall and hurt someone."],
          ["How likely it is that the boxes fall on someone opening the drawer below, and how badly they'd be hurt", "Risk", "Likelihood and severity together make the risk."],
        ]),
      ],
    },
    {
      title: "Spot the hazards",
      summary: "Look around an office and decide what's fine and what needs dealing with.",
      blocks: [
        text(null, "Here's a corner of an office. Check each numbered point and decide: fine, or a hazard? Then look around your own office the same way."),
        spotIt("Spot the hazards", "Select each marker, then decide whether it's fine or a problem.", "office", [
          ["fire-exit", "The fire exit", true, "Boxes are blocking the fire exit. In a fire, every second counts. Fire exits and the routes to them must always be kept clear."],
          ["first-aid", "The first aid sign", false, "Fine. It shows where the first aid kit is. Make sure you know where yours is."],
          ["extinguisher", "The fire extinguisher", false, "Fine. It's on its bracket, clearly visible and not blocked. Never use one to prop a door open."],
          ["high-stack", "Boxes on top of the cabinet", true, "Heavy items stored high can fall, and lifting them down is awkward. Store heavy things low, and don't stack higher than you can safely reach."],
          ["drawer", "The open bottom drawer", true, "An open drawer is a trip hazard, and opening several drawers at once can tip a cabinet over. Close drawers straight after use."],
          ["spill", "The coffee on the floor", true, "A spill is a slip hazard. Clean it up straight away, or stand guard and get it dealt with."],
          ["cable", "The cable across the floor", true, "A trailing cable across a walkway is a trip hazard. Re-route it, or report it so a cable cover can be fitted."],
        ]),
        keyPoints("If you see a hazard", [
          "If it's quick and safe to fix (closing a drawer, wiping a spill), fix it.",
          "If not, warn others and report it to your manager or the office manager.",
          "Don't assume someone else has already reported it.",
        ]),
      ],
    },
    {
      title: "Slips, trips and falls",
      summary: "The most common cause of injury at work, and the easiest to prevent.",
      blocks: [
        text(null, "Slips, trips and falls on the same level are the most common cause of non-fatal injuries reported to HSE. In offices, the usual causes are spills, trailing cables, open drawers, bags and boxes in walkways, loose carpet, and rushing on stairs."),
        doDont(
          ["Clean up spills straight away, or report them and warn others", "Keep walkways, stairs and exits clear", "Use the handrail on stairs, and don't carry so much you can't see your feet", "Use a proper step stool to reach high shelves", "Report loose carpet, broken tiles and poor lighting"],
          ["Leave bags, boxes or coats on the floor", "Stand on chairs, especially ones with wheels", "Run cables across walkways", "Rush on stairs while reading your phone", "Assume someone else will deal with it"],
        ),
        scenario("You're rushing to a client meeting and notice coffee spilt on the floor outside the kitchen, by the stairs. Nobody else seems to have seen it. What do you do?", [
          ["Step round it: you're late, and someone else will see it", false, "Someone carrying a tray, or not looking down, may not see it. It takes a minute to deal with."],
          ["Wipe it up, or if you can't, warn the people nearby and tell the office manager before you go", true, "Right. A minute of your time can prevent a nasty fall, especially next to the stairs."],
          ["Put a chair over it", false, "That creates a second hazard. Clean it up, or report it and warn people."],
        ]),
      ],
    },
    {
      title: "Lifting and carrying",
      summary: "Avoid lifting where you can, think before you lift, and lift well.",
      blocks: [
        law("Manual Handling Operations Regulations 1992", "Hazardous manual handling should be avoided where reasonably practicable. If it can't be avoided, it must be assessed and the risk reduced, for example with a trolley, by splitting the load, or by getting help."),
        text("Think TILE before you lift", null, [
          "Task: does it involve twisting, stooping, reaching or carrying a long way?",
          "Individual: are you able to do it? Think about your strength, any injury, pregnancy or health condition",
          "Load: is it heavy, bulky, unstable or hard to grip?",
          "Environment: are there stairs, tight spaces, slippery floors or poor lighting?",
        ]),
        keyPoints("Lifting well", [
          "Plan the lift: where is it going, and is the route clear?",
          "Stand close to the load, feet apart, with one foot slightly forward.",
          "Bend your knees, not your back, and get a firm grip.",
          "Keep the load close to your waist, and don't twist: turn with your feet.",
          "If it's too heavy or awkward, don't lift it: split it, use a trolley or get help.",
        ]),
        scenario("You've been asked to bring six boxes of event brochures up two flights of stairs from reception. Each box is heavy, and the lift is out of order. What's the best approach?", [
          ["Stack three boxes and carry them up together to save time", false, "A stack you can't see over, carried up stairs, is a fall and back injury waiting to happen."],
          ["Ask for help, carry one box at a time or split the boxes into lighter loads, and wait for the lift if you can", true, "Right. Reduce the load, share the work and use equipment where you can. Nothing about brochures is urgent enough to risk an injury."],
          ["Drag the boxes up the stairs one at a time", false, "Dragging up stairs strains your back and risks the box slipping back onto you."],
        ]),
      ],
    },
    {
      title: "Fire safety",
      summary: "Preventing fires, and what to do when the alarm sounds.",
      blocks: [
        law("Regulatory Reform (Fire Safety) Order 2005", "The person responsible for a building must assess fire risks, provide fire alarms, escape routes and firefighting equipment, and make sure people know what to do. You must follow the fire procedures and not interfere with anything provided for fire safety."),
        text("How fires start, and how to stop them", "A fire needs three things: heat, fuel and oxygen. In offices, the heat usually comes from faulty or overloaded electrical equipment, chargers or heaters, and the fuel from paper, packaging and furniture. Prevention is about keeping them apart:", [
          "Don't overload sockets or plug extension leads into each other",
          "Report damaged plugs, cables and chargers, and stop using them",
          "Keep paper and packaging away from heaters and electrical equipment",
          "Never prop fire doors open: they stop fire and smoke spreading",
        ]),
        keyPoints("When the fire alarm sounds", [
          "Stop what you're doing straight away, even if you're on a client call.",
          "Leave by the nearest safe exit, closing doors behind you.",
          "Don't use the lifts, and don't stop to collect belongings.",
          "Go to the assembly point and report to the fire marshal.",
          "Don't go back in until you're told it's safe.",
          "Only use a fire extinguisher if you've been trained and it's safe to do so. Your priority is getting out.",
        ]),
        scenario("The fire alarm goes off in the middle of an important call with a new client. You think it's probably a test. What do you do?", [
          ["Finish the call quickly, then leave", false, "You can't know it's a test unless you've been told. A few minutes can make all the difference in a real fire."],
          ["Tell the client you have to go because of a fire alarm, and leave straight away by the nearest exit", true, "Right. Every alarm is real unless you've been told otherwise. Any client will understand."],
          ["Stay on the call but move towards the exit", false, "You need your full attention on getting out safely."],
        ]),
      ],
    },
    {
      title: "First aid, accidents and reporting",
      summary: "Getting help, and why every accident and near miss gets reported.",
      blocks: [
        law("Health and Safety (First-Aid) Regulations 1981", "Employers must provide adequate first aid equipment, facilities and people, and tell employees about the arrangements. Find out who your first aiders are and where the first aid kit is."),
        text("Report every accident and near miss", "Tell your manager about every accident, however minor, and every near miss (something that could have hurt someone but didn't). Make sure it's recorded in the accident book.\n\nSome serious incidents must also be reported by Stott and May to HSE, under the RIDDOR regulations: for example, certain serious injuries, injuries that keep someone off normal work for more than seven days, and dangerous occurrences. Reporting everything internally makes sure nothing that needs to go to HSE is missed."),
        scenario("A colleague stands up suddenly from their desk, goes pale and faints. They come round quickly and say they're fine and don't want any fuss. What do you do?", [
          ["Take their word for it and get back to work", false, "Fainting can be a sign of something more serious. They need checking over."],
          ["Call a first aider straight away, stay with them, and make sure the incident is reported", true, "Right. A first aider can check them and decide whether they need medical help. Call 999 if they don't come round, have difficulty breathing or seem seriously unwell."],
          ["Give them some water and suggest they go home on their own", false, "They shouldn't travel alone until they've been checked. Get a first aider."],
        ]),
        keyPoints("Remember", [
          "Spot it, fix it if it's safe, report it if it isn't.",
          "Keep walkways and fire exits clear.",
          "Lift smart, or don't lift at all.",
          "When the alarm sounds, get out and stay out.",
          "Report every accident and near miss.",
          "Working from home? Take the Health & Safety: Working From Home course too.",
        ]),
      ],
    },
  ],
  questions: [
    q("What's the difference between a hazard and a risk?", ["A hazard could cause harm; a risk is the chance and severity of harm actually happening", "They mean the same thing", "A risk could cause harm; a hazard is the chance of it happening", "Hazards are physical; risks are only about stress"], 1, "Hazard: something that could cause harm. Risk: how likely harm is, and how bad."),
    q("Under health and safety law, what is your duty as an employee?", ["To take reasonable care of yourself and others, and co-operate with the safety arrangements", "None: safety is only the employer's job", "To carry out all the risk assessments", "To fix all hazards yourself"], 1, "Employees must take reasonable care and co-operate."),
    q("What are the five steps of a risk assessment, in order?", ["Identify hazards, decide who might be harmed, evaluate and decide precautions, record and act, review", "Review, record, identify, decide, evaluate", "Decide precautions, then identify hazards", "Record, then review, then identify"], 1, "Identify, decide who, evaluate, record and act, review."),
    q("You notice boxes stacked in front of a fire exit. What do you do?", ["Move them if it's safe to, or report it straight away: fire exits must always be clear", "Leave them: it's only temporary", "Put a sign on them", "Wait for the next fire drill"], 1, "Fire exits and routes to them must always be clear."),
    q("What's the most common cause of non-fatal injuries reported to HSE?", ["Slips, trips and falls", "Electric shocks", "Fires", "Falling from height"], 1, "Slips, trips and falls on the same level."),
    q("You need to reach a high shelf. What should you use?", ["A proper step stool", "A chair with wheels", "A stack of boxes", "Your desk"], 1, "Use the right equipment. Never stand on chairs."),
    q("What does TILE stand for?", ["Task, Individual, Load, Environment", "Time, Item, Lift, Effort", "Training, Inspection, Lifting, Equipment", "Twist, Inspect, Lift, End"], 1, "The four things to think about before lifting."),
    q("When lifting, how should you hold the load?", ["Close to your waist", "At arm's length", "Above your head", "To one side"], 1, "Keeping it close reduces the strain on your back."),
    q("A box is too heavy to lift comfortably. What should you do?", ["Split the load, use a trolley or get help", "Lift it quickly to get it over with", "Drag it", "Lift it with a straight back and bent arms"], 1, "If it's too heavy, don't lift it alone."),
    q("Why must fire doors never be propped open?", ["They stop fire and smoke spreading", "They're too heavy", "It sets off the alarm", "It's against the building's insurance"], 1, "Closed fire doors hold back fire and smoke while people escape."),
    q("The fire alarm sounds. What should you do?", ["Leave by the nearest safe exit and go to the assembly point", "Collect your laptop and coat first", "Use the lift to get out faster", "Wait to see if it's a test"], 1, "Leave straight away, without belongings or lifts."),
    q("When should you use a fire extinguisher?", ["Only if you're trained and it's safe to do so", "Always, before leaving", "Never, under any circumstances", "Whenever a fire marshal isn't there"], 1, "Getting out comes first. Only tackle a fire if you're trained and it's safe."),
    q("A fire needs which three things?", ["Heat, fuel and oxygen", "Heat, water and paper", "Electricity, fuel and smoke", "Oxygen, wind and heat"], 1, "Take away any one of them and a fire can't burn."),
    q("You nearly trip over a loose carpet tile but don't fall. Should you report it?", ["Yes: near misses should be reported", "No: you weren't hurt", "Only if it happens again", "Only if someone saw"], 1, "Near misses show where an accident could happen."),
    q("A colleague faints, comes round and says they're fine. What should you do?", ["Call a first aider and stay with them", "Let them get back to work", "Send them home on their own", "Give them a coffee"], 1, "Fainting needs checking. Get a first aider."),
    q("Where should accidents be recorded?", ["In the accident book, after telling your manager", "Nowhere, if no one was badly hurt", "On social media", "In your own notes only"], 1, "Every accident is reported and recorded."),
  ],
  sources: [
    ["HSE: Health and safety made simple", "https://www.hse.gov.uk/simple-health-safety/"],
    ["HSE: Risk assessment", "https://www.hse.gov.uk/simple-health-safety/risk/"],
    ["HSE: Slips and trips", "https://www.hse.gov.uk/slips/"],
    ["HSE: Manual handling at work", "https://www.hse.gov.uk/msd/manual-handling/"],
    ["UK Government: Fire safety in the workplace", "https://www.gov.uk/workplace-fire-safety-your-responsibilities"],
    ["HSE: First aid at work", "https://www.hse.gov.uk/firstaid/"],
    ["HSE: RIDDOR reporting", "https://www.hse.gov.uk/riddor/"],
  ],
  reviewNotes: `Please check or fill in before sign-off:
1. Offices: list each UK office's fire assembly point, fire marshals, first aiders and where the first aid kit and accident book are. These could go in a short "Your office" section in lessons 5 and 6, or on a linked page.
2. Building arrangements: where offices are serviced or shared (for example, Regus), confirm what the landlord is responsible for (alarms, drills, extinguishers) and who staff report building issues to.
3. Lesson 6: confirm how accidents and near misses are reported (manager, office manager, an online form) and who reports to HSE under RIDDOR.
4. Lesson 1: confirm the risk assessment process, and whether staff can see the office risk assessments.
5. Assessment: 10 questions drawn from 16, pass mark 80%, renew every 12 months.`,
};
