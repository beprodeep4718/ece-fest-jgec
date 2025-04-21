import User from "../models/user.model.js";
import Team from "../models/team.model.js";
import Event from "../models/event.model.js";
import Registration from "../models/registration.model.js";

export const getIndividualParticipants = async (req, res) => {
  try {
    const { eventId } = req.params;
    const participants = await User.find({ events: eventId });
    res.json(participants);
  } catch (error) {
    console.error("Error fetching individual participants:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTeamParticipants = async (req, res) => {
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
};

export const getAllParticipants = async (req, res) => {
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
};

export const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const eventId = team.event;

    // 1. Remove the teamId from each user's teams and remove the event from events array
    await User.updateMany(
      { _id: { $in: team.members } },
      {
        $pull: {
          teams: teamId,
          events: eventId,
        },
      }
    );

    // 2. Remove registration entry
    await Registration.findOneAndDelete({
      event: eventId,
      teamName: team.teamName,
      user: team.leader, // team registration created by leader
      isTeam: true,
    });

    // 3. Delete the team
    await Team.findByIdAndDelete(teamId);

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (err) {
    console.error("Error deleting team:", err);
    res.status(500).json({ message: "Error deleting team", error: err });
  }
};

export const deleteIndividualParticipant = async (req, res) => {
  try {
    const { userId, eventId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 1. Remove event from user's registered events
    user.events = user.events.filter((eId) => eId.toString() !== eventId);
    await user.save();

    // 2. Remove from registration collection
    await Registration.findOneAndDelete({
      user: userId,
      event: eventId,
      isTeam: false, // only delete individual registrations
    });

    res.status(200).json({ message: "User removed from event successfully" });
  } catch (err) {
    console.error("Error removing user from event:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUnverifiedUsers = async (req, res) => {
    try {
      const users = await User.find({ isPaid: false }).select("-password");
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  };

  export const verifyUserPayment = async (req, res) => {
    const { userId } = req.params;
    try {
      await User.findByIdAndUpdate(userId, { isPaid: true });
      res.json({ success: true, message: "User marked as verified" });
    } catch (err) {
      res.status(500).json({ message: "Failed to verify user" });
    }
  };