// scripts/seedEvents.js
import dotenv from "dotenv";
import {connectDB} from '../utils/db.js'
import Event from "../models/event.model.js"; // adjust path as needed

dotenv.config();

const events = [
  {
    name: "Quiz",
    type: "individual",
    description:
      "A competitive coding challenge to test problem-solving skills.",
    date: new Date("2025-04-25T21:00:00Z"),
    maxTeamMembers: 2,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1744521825/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_large_jocqew.webp",
  },
  {
    name: "TinkerForge",
    type: "individual",
    description: "Fix broken code as fast as you can.",
    date: new Date("2025-04-26T10:00:00Z"),
    maxTeamMembers: 4,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1744521825/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_large_jocqew.webp",
  },
  {
    name: "Capture the Fault",
    type: "team",
    description: "Build something cool in a short amount of time.",
    date: new Date("2025-04-26T14:00:00Z"),
    maxTeamMembers: 4,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1745217051/IMG-20250420-WA0011_tlbbuu.jpg",
  },
  {
    name: "TechTussle",
    type: "individual",
    description: "Design an intuitive and aesthetic interface for a mock app.",
    date: new Date("2025-04-26T15:15:00Z"),
    maxTeamMembers: 1,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1744521825/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_large_jocqew.webp",
  },
  {
    name: "Ohm's kitchen",
    type: "team",
    description: "Put your tech knowledge to the test in a thrilling quiz.",
    date: new Date("2025-04-26T16:30:00Z"),
    maxTeamMembers: 2,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1744521825/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_large_jocqew.webp",
  },
  {
    name: "9/11",
    type: "team",
    description: "Race your bots through a challenging course.",
    date: new Date("2025-04-26T18:45:00Z"),
    maxTeamMembers: 3,
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
