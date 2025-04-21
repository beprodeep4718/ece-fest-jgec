// backend/routes/admin.js
import express from "express";
import {
  getIndividualParticipants,
  getTeamParticipants,
  getAllParticipants,
  deleteTeam,
  deleteIndividualParticipant,
  getUnverifiedUsers,
  verifyUserPayment,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Get participants of individual event
router.get("/participants/individual/:eventId", getIndividualParticipants);

// Get teams of a team event
router.get("/participants/team/:eventId", getTeamParticipants);

// Fetch all event participants for admin dashboard
router.get("/participants/all", getAllParticipants);

// Delete a team
router.delete("/teams/:teamId", deleteTeam);

// Delete an individual participant
router.delete("/participants/individual/:userId/:eventId", deleteIndividualParticipant);

router.get("/unverified-users", getUnverifiedUsers);
router.patch("/verify-user/:userId", verifyUserPayment);

export default router;
