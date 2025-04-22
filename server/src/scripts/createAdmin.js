import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt"; // bcrypt for password hashing
import User from "../models/user.model.js"; // adjust path

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ email: "admin@techfest.com" });
    if (existingAdmin) {
      console.log("Admin already exists.");
    } else {
      const hashedPassword = await bcrypt.hash("admin@123", 10); // secure password
      const adminUser = {
        name: "Techfest Admin",
        email: "admin@techfest.com",
        password: hashedPassword,
        phone: "9999999999",
        rollNo: "ADMIN001",
        dept: "Admin",
        year: "N/A",
        isPaid: true,
        upiTransactionId: "admin-upi-id",
        isAdmin: true,
      };

      await User.create(adminUser);
      console.log("Admin user created successfully.");
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error creating admin user:", err);
  }
}

createAdmin();
