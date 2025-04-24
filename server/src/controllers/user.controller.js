import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

function isValidRollNo(roll) {
  if (roll.length !== 11) return false;
  if (roll[0] !== "2") return false;
  if (roll[1] !== "2" && roll[1] !== "3" && roll[1] !== "4") return false;
  if (roll.substring(2, 7) !== "10110") return false;
  if (roll[8] !== "0") return false;
  return true;
}

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      rollNo,
      year,
      upiTransactionId,
      dept,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !rollNo ||
      !year ||
      !upiTransactionId
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const duplicateTxnId = await User.findOne({ upiTransactionId });
    if (duplicateTxnId) {
      return res
        .status(400)
        .json({ message: "This UPI transaction ID has already been used." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    if (!isValidRollNo(rollNo)) {
      return res.status(400).json({ message: "Invalid roll number" });
    }
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      phone,
      rollNo,
      year,
      upiTransactionId, // Store UPI transaction ID
    };

    if (dept) {
      userData.dept = dept;
    }

    const newUser = await User.create(userData);
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      rollNo: newUser.rollNo,
      year: newUser.year,
      dept: newUser.dept,
      events: newUser.events,
      teams: newUser.teams,
    });
  } catch (error) {
    console.log("Error in register controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (!user.isPaid) {
      return res.status(400).json({ message: "You are not verified yet" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      rollNo: user.rollNo,
      year: user.year,
      dept: user.dept,
      events: user.events,
      teams: user.teams,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in getUser controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      maxAge: 0,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
