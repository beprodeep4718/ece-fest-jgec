// scripts/seedEvents.js
import dotenv from "dotenv";
import {connectDB} from '../utils/db.js'
import Event from "../models/event.model.js"; // adjust path as needed

dotenv.config();

const events = [
  {
    name: "Electroquizon",
    type: "team",
    description: "A Technical Quiz Competition on Electronics",
    date: new Date("2025-04-25T15:30:00Z"), // 9:00 PM IST
    maxTeamMembers: 2,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1745217050/IMG-20250420-WA0012_fbazx3.jpg",
  },
  {
    name: "TinkerForge",
    type: "team",
    description: "Crafting Connections That Last: Show your skills on soldering",
    date: new Date("2025-04-26T04:30:00Z"), // 10:00 AM IST
    maxTeamMembers: 4,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1745217050/IMG-20250420-WA0009_hwh2vc.jpg",
  },
  {
    name: "Capture the Fault",
    type: "individual",
    description: "Diagnosing Circuit Woes",
    date: new Date("2025-04-26T08:30:00Z"), // 2:00 PM IST
    maxTeamMembers: 1,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1745217051/IMG-20250420-WA0011_tlbbuu.jpg",
  },
  {
    name: "TechTussle",
    type: "individual",
    description: "Debate Competition on the topics of Electronics",
    date: new Date("2025-04-26T09:45:00Z"), // 3:15 PM IST
    maxTeamMembers: 1,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1745217050/IMG-20250420-WA0010_wbzef6.jpg",
  },
  {
    name: "Ohm's Kitchen",
    type: "individual",
    description: "Combine the components to cook some electronics-dish",
    date: new Date("2025-04-26T11:00:00Z"), // 4:30 PM IST
    maxTeamMembers: 1,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1745219455/WhatsApp_Image_2025-04-21_at_12.31.02_ecc56fa8_uqki2r.jpg",
  },
  {
    name: "9/11",
    type: "individual",
    description: "Catastrophic Devastation",
    date: new Date("2025-04-26T13:15:00Z"), // 6:45 PM IST
    maxTeamMembers: 1,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1745217050/IMG-20250420-WA0008_virpgn.jpg",
  },
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
