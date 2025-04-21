import express from "express";
const router = express.Router();
import { protect } from "../middlewares/authMiddleware.js";
import User from "../models/user.model.js";

router.get("/available", protect, async (req, res) => {
  const { eventId } = req.query;

  if (!eventId) {
    return res.status(400).json({ message: "Event ID is required" });
  }

  try {
    const users = await User.find({
      events: { $ne: eventId },
      isPaid: true,
    }).select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
