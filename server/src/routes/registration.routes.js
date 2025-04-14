import express from "express";
const router = express.Router();
import {
  registerIndividual,
  registerTeam,
} from "../controllers/registration.controller.js";
import {protect} from '../middlewares/authMiddleware.js'

router.post("/individual", protect, registerIndividual);
router.post("/team", protect, registerTeam);

export default router;
