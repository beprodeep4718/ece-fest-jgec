import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import Team from "../models/team.model.js";
import Registration from "../models/registration.model.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

const refreshDb = async () => {
  try {
    await connectDB();

    console.log("🧹 Clearing collections...");

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Registration.deleteMany({}),
    ]);

    console.log("✅ Database cleared successfully!");

    // Optional: Seed with sample data
    // const event = await Event.create({
    //   name: "CodeSprint",
    //   type: "team",
    //   description: "24hr coding event",
    //   date: new Date(),
    //   maxTeamMembers: 4,
    //   posterUrl: "https://example.com/poster.jpg"
    // });

    process.exit(0);
  } catch (err) {
    console.error("❌ Error refreshing DB:", err);
    process.exit(1);
  }
};

refreshDb();
