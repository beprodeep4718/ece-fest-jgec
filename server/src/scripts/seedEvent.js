// scripts/seedEvents.js
import dotenv from "dotenv";
import {connectDB} from '../utils/db.js'
import Event from "../models/event.model.js"; // adjust path as needed

dotenv.config();

const events = [
  {
    name: "Code Clash",
    type: "individual",
    description:
      "A competitive coding challenge to test problem-solving skills.",
    date: new Date("2025-04-25T10:00:00Z"),
    maxTeamMembers: 1,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1744521825/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_large_jocqew.webp",
  },
  {
    name: "Debug Duel",
    type: "individual",
    description: "Fix broken code as fast as you can.",
    date: new Date("2025-04-25T12:00:00Z"),
    maxTeamMembers: 1,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1744521825/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_large_jocqew.webp",
  },
  {
    name: "Hack Sprint",
    type: "team",
    description: "Build something cool in a short amount of time.",
    date: new Date("2025-04-26T09:00:00Z"),
    maxTeamMembers: 4,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1744521825/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_large_jocqew.webp",
  },
  {
    name: "UI/UX Showdown",
    type: "individual",
    description: "Design an intuitive and aesthetic interface for a mock app.",
    date: new Date("2025-04-26T13:00:00Z"),
    maxTeamMembers: 1,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1744521825/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_large_jocqew.webp",
  },
  {
    name: "Tech Quiz",
    type: "team",
    description: "Put your tech knowledge to the test in a thrilling quiz.",
    date: new Date("2025-04-27T10:00:00Z"),
    maxTeamMembers: 2,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1744521825/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_large_jocqew.webp",
  },
  {
    name: "Robo Race",
    type: "team",
    description: "Race your bots through a challenging course.",
    date: new Date("2025-04-27T14:00:00Z"),
    maxTeamMembers: 3,
    posterUrl:
      "https://res.cloudinary.com/dltygrzd4/image/upload/v1744521825/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_large_jocqew.webp",
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
