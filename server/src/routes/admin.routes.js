// backend/routes/admin.js
import express from "express";
import User from "../models/user.model.js";
import Team from "../models/team.model.js";
import Event from "../models/event.model.js";

const router = express.Router();

// Get participants of individual event
router.get("/participants/individual/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const participants = await User.find({ events: eventId });
    res.json(participants);
  } catch (error) {
    console.error("Error fetching individual participants:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get teams of a team event
router.get("/participants/team/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const teams = await Team.find({ event: eventId })
      .populate("leader", "name email rollNo")
      .populate("members", "name email rollNo");
    res.json(teams);
  } catch (error) {
    console.error("Error fetching team participants:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Optional: Fetch all event participants for admin dashboard
router.get("/participants/all", async (req, res) => {
  try {
    const events = await Event.find();
    const response = [];

    for (const event of events) {
      if (event.type === "individual") {
        const participants = await User.find({ events: event._id });
        response.push({ event, participants });
      } else {
        const teams = await Team.find({ event: event._id })
          .populate("leader", "name email rollNo")
          .populate("members", "name email rollNo");
        response.push({ event, teams });
      }
    }

    res.json(response);
  } catch (error) {
    console.error("Error fetching all participants:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete('/teams/:teamId', async (req, res) => {
    try {
      const { teamId } = req.params;
      
      // Find and delete the team
      const team = await Team.findById(teamId);
      
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
  
      // Remove team reference from users
      await User.updateMany(
        { _id: { $in: team.members } },
        { $pull: { teams: teamId } }
      );
  
      // Delete the team
      await Team.findByIdAndDelete(teamId);
  
      res.status(200).json({ message: 'Team deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting team', error: err });
    }
  });

  router.delete('/participants/individual/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Find and delete the participant (user)
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Remove event registration and team association (if any)
      await User.findByIdAndDelete(userId);
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  });

export default router;
