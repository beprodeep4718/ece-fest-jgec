// scripts/seedEvents.js
import dotenv from "dotenv";
import {connectDB} from '../utils/db.js'
import Event from "../models/event.model.js"; // adjust path as needed

dotenv.config();

const events = [
  {
    name: "Electroquizon",
    type: "team",
    description: "Get ready to spark your brains and ignite your knowledge circuits! Electroquizon is the ultimate battlefield for tech enthusiasts who think they know their resistors from their rectifiers...",
    date: new Date("2025-04-25T21:00:00Z"),
    maxTeamMembers: 2,
    posterUrl: "https://res.cloudinary.com/dltygrzd4/image/upload/v1745338609/WhatsApp_Image_2025-04-22_at_21.37.49_9a6f3845_aprimx.jpg",
    rulesAndRegulations: {
      eligibility: "Open to all students with an interest in electronics. Teams must consist of 2 participants.",
      structure: [
        "Preliminary Round: A written MCQ-based screening.",
        "Final Round: An interactive buzzer round for top qualifying teams."
      ],
      questionFormat: [
        "Questions will cover topics such as analog & digital electronics, circuit theory, famous inventions, and general electronics knowledge."
      ],
      scoring: [
        "Each correct answer awards points.",
        "Negative marking may apply in specific rounds (will be announced beforehand).",
        "In case of a tie, a rapid-fire tiebreaker will be conducted."
      ],
      generalRules: [
        "Mobile phones, calculators, or any electronic gadgets are strictly prohibited during the quiz.",
        "Teams must report 15 minutes before the scheduled time.",
        "Decision of the quizmaster/judges will be final and binding."
      ]
    }
  },
  {
    name: "TinkerForge",
    type: "team",
    description: "Are you ready to transform a bunch of components into a functional masterpiece? Welcome to TinkerForge...",
    date: new Date("2025-04-26T10:00:00Z"),
    maxTeamMembers: 5,
    posterUrl: "https://res.cloudinary.com/dltygrzd4/image/upload/v1745338589/WhatsApp_Image_2025-04-22_at_21.37.50_7b5ffecc_zvmysw.jpg",
    rulesAndRegulations: {
      eligibility: "Open to all students passionate about electronics and circuit building. Each team must consist of 5 members.",
      competitionObjective: [
        "Teams will be provided with a circuit diagram and required electronic components.",
        "The task is to assemble and solder the given circuit within the stipulated time."
      ],
      judgingCriteria: [
        "Functionality of the final circuit.",
        "Soldering quality (neatness, accuracy, and safety).",
        "Team coordination and time management."
      ],
      toolsAndMaterials: [
        "Basic tools like soldering iron, wire cutter, multimeter, etc., will be provided.",
        "Teams are not allowed to use personal tools unless approved by organizers."
      ],
      generalRules: [
        "Safety measures must be strictly followed during soldering.",
        "Any damage to provided tools/components may lead to disqualification.",
        "Decisions by the judges and event coordinators will be final.",
        "Late arrival beyond the reporting time may result in point deduction or disqualification."
      ]
    }
  },
  {
    name: "Capture the Fault",
    type: "individual",
    description: "Got an eye for errors and a brain wired for logic? Capture the Fault is your chance to prove it...",
    date: new Date("2025-04-26T14:00:00Z"),
    maxTeamMembers: 1,
    posterUrl: "https://res.cloudinary.com/dltygrzd4/image/upload/v1745338622/WhatsApp_Image_2025-04-22_at_21.37.50_91fb4dae_iydr6g.jpg",
    rulesAndRegulations: {
      eligibility: "Open to individual participants with an interest in electronics and troubleshooting.",
      objective: "Identify all the faults in a pre-assembled electronic circuit. Provide proper reasoning and, where required, suggest possible fixes.",
      structure: [
        "Each participant will be assigned one circuit.",
        "Circuits may have multiple faults – from incorrect component placement to soldering errors."
      ],
      judgingCriteria: [
        "Accuracy in identifying faults.",
        "Reasoning and explanation behind each fault detected.",
        "Time taken to complete the task."
      ],
      generalRules: [
        "Participants must not alter the circuit physically (unless told otherwise).",
        "Use of mobile phones or external help is strictly prohibited.",
        "Judges’ decisions will be final and binding."
      ]
    }
  },
  {
    name: "TechTussle",
    type: "individual",
    description: "Do you have the spark to electrify a room with your words? Step into the intellectual battlefield of TechTussle...",
    date: new Date("2025-04-26T15:15:00Z"),
    maxTeamMembers: 1,
    posterUrl: "https://res.cloudinary.com/dltygrzd4/image/upload/v1745338597/WhatsApp_Image_2025-04-22_at_21.37.49_166106ac_ytdrj6.jpg",
    rulesAndRegulations: {
      eligibility: "Open to individual participants interested in electronics and technology.",
      debateFormat: [
        "Topics will revolve around current trends, innovations, and controversies in electronics and allied technologies.",
        "Each participant will be assigned a stance (For/Against) prior to the event."
      ],
      speakingTime: [
        "Opening Argument: 3 minutes",
        "Counterargument/Defense: 2 minutes",
        "Rebuttal/Conclusion: 1 minute"
      ],
      judgingCriteria: [
        "Depth of knowledge and relevance to electronics",
        "Clarity of thought and logical reasoning",
        "Confidence, language, and delivery",
        "Ability to handle counterarguments"
      ],
      generalRules: [
        "Use of slangs, disrespectful language, or personal attacks will lead to disqualification.",
        "Internet/mobile usage is not allowed during the debate.",
        "Participants must report 15 minutes prior to the event start.",
        "Judges’ decision will be final and binding."
      ]
    }
  },
  {
    name: "Ohm's Kitchen",
    type: "individual",
    description: "Welcome to Ohm’s Kitchen, where the ingredients are resistors and the recipe is resistance...",
    date: new Date("2025-04-26T16:30:00Z"),
    maxTeamMembers: 1,
    posterUrl: "https://res.cloudinary.com/dltygrzd4/image/upload/v1745338603/WhatsApp_Image_2025-04-22_at_21.37.49_4ec63978_c53e2j.jpg",
    rulesAndRegulations: {
      eligibility: "Open to individual participants with a basic understanding of resistor combinations and circuit design.",
      objective: "Given a target resistance value, participants must use provided resistors to build a circuit (using series and/or parallel combinations) that closely matches the target value.",
      eventStructure: [
        "Multiple rounds with increasing difficulty.",
        "Each round may have different target resistances.",
        "Participants must complete the task within a given time limit per round."
      ],
      toolsAndMaterials: [
        "Resistors of various values",
        "No personal components allowed."
      ],
      judgingCriteria: [
        "Accuracy of final resistance compared to the target",
        "Time taken to complete the task",
        "Neatness and correctness of circuit design"
      ],
      generalRules: [
        "Resistance will be measured using a multimeter.",
        "Participants must not exceed the time limit for each round.",
        "No external help or reference materials allowed during the event.",
        "In case of a tie, a rapid bonus challenge will decide the winner.",
        "Judge's decisions will be final and binding."
      ]
    }
  },
  {
    name: "9/11",
    type: "individual",
    description: "Channel your inner engineer and pilot in Crash Circuit, a fun, hands-on event where precision flying meets strategic destruction...",
    date: new Date("2025-04-26T18:45:00Z"),
    maxTeamMembers: 1,
    posterUrl: "https://res.cloudinary.com/dltygrzd4/image/upload/v1745338614/WhatsApp_Image_2025-04-22_at_21.37.50_5c602a59_uwzpsu.jpg",
    rulesAndRegulations: {
      eligibility: "Open to individual participants.",
      objective: "Use the provided paper to fold planes and hit the tower with the aim of collapsing or damaging it as much as possible.",
      structure: [
        "Each participant gets 3 chances/planes.",
        "The distance from the tower will be fixed and same for all.",
        "Tower structure will contain electronic components (dummy/mock) as part of its theme."
      ],
      judgingCriteria: [
        "Impact score based on damage done to tower (points for displacement, partial fall, full collapse).",
        "Accuracy of throws."
      ],
      materialsAndRules: [
        "Only provided A4 sheets may be used to make the planes.",
        "No external modifications (e.g., clips, weights) allowed.",
        "Participants must stay behind the marked throw line."
      ],
      generalRules: [
        "Unsportsmanlike behavior or repeated rule violation may result in disqualification.",
        "Participants must report on time.",
        "Judge’s decision will be final."
      ]
    }
  }
];


const insertEvents = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    await Event.deleteMany(); // optional: clears old events
    const result = await Event.insertMany(events);
    console.log("Events inserted:", result);
    process.exit(0);
  } catch (err) {
    console.error("Error inserting events:", err);
    process.exit(1);
  }
};

insertEvents();
