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
  getVerifiedUsers,
} from "../controllers/admin.controller.js";
import { adminProtect } from "../middlewares/authAdminMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get participants of individual event
router.get("/participants/individual/:eventId", protect, adminProtect, getIndividualParticipants);

// Get teams of a team event
router.get("/participants/team/:eventId", protect, adminProtect, getTeamParticipants);

// Fetch all event participants for admin dashboard
router.get("/participants/all", protect, adminProtect, getAllParticipants);

// Delete a team
router.delete("/teams/:teamId", protect, adminProtect, deleteTeam);

// Delete an individual participant
router.delete("/participants/individual/:userId/:eventId", protect, adminProtect, deleteIndividualParticipant);

router.get("/unverified-users", protect, adminProtect, getUnverifiedUsers);
router.patch("/verify-user/:userId", protect, adminProtect, verifyUserPayment);

router.get("/verified-users", protect, adminProtect, getVerifiedUsers);

export default router;
