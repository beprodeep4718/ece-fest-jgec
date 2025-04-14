import Registration from "../models/registration.model.js";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import Team from "../models/team.model.js";

export const registerIndividual = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user._id; // from auth middleware

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.type === "team") {
      return res.status(400).json({ message: "Event is a team event" });
    }

    // check if already registered
    const existing = await Registration.findOne({
      event: eventId,
      user: userId,
    });
    if (existing)
      return res.status(400).json({ message: "Already registered." });

    const reg = new Registration({
      event: eventId,
      user: userId,
      isTeam: false,
    });
    await reg.save();

    await User.findByIdAndUpdate(userId, {
      $addToSet: { events: eventId }, // prevent duplicates
    });

    res.status(201).json({ message: "Registered successfully", reg });
  } catch (error) {
    console.error("Error registering individual:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerTeam = async (req, res) => {
  try {
    const { eventId, teamName, memberIds } = req.body;
    const userId = req.user._id;

    const allMembers = [userId, ...memberIds];

    const existing = await Registration.findOne({
      event: eventId,
      user: userId,
    });
    if (existing) {
      return res.status(400).json({ message: "Already registered as a team." });
    }

    const event = await Event.findById(eventId);
    if (allMembers.length > event.maxTeamMembers) {
      return res.status(400).json({ message: "Team size exceeds maximum limit." });
    }

    // Create Team
    const team = new Team({
      teamName,
      event: eventId,
      leader: userId,
      members: allMembers,
    });

    await team.save();

    // Create registration
    const reg = new Registration({
      event: eventId,
      user: userId,
      teamName,
      members: allMembers,
      isTeam: true,
    });

    await reg.save();

    // Update each user's events & teams
    await User.updateMany(
      { _id: { $in: allMembers } },
      {
        $addToSet: {
          events: eventId,
          teams: team._id,
        },
      }
    );

    res.status(201).json({ message: "Team registered successfully", reg, team });
  } catch (error) {
    console.error("Error registering team:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

