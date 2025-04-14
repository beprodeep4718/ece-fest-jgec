import express from "express";
const router = express.Router();
import { register, login, getUser, logout } from "../controllers/user.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getUser);
router.post("/logout", protect, logout);

export default router;
