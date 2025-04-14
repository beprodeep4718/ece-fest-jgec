import express from "express";
const router = express.Router();

import {
  getAllEvents,
  getEvent,
  getEventsByIds,
} from "../controllers/event.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

router.get("/", getAllEvents);
router.get("/:id", getEvent);
router.post("/by-ids", protect, getEventsByIds);

export default router;
