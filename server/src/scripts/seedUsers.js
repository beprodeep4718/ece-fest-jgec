import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import Team from '../models/team.model.js';
import Registration from '../models/registration.model.js';


dotenv.config();

const testUsers = [
  {
    name: "Nirman Dey",
    email: "nirmandey23@gmail.com",
    password: "Nirman@tech",
    phone: "9339842205",
    rollNo: "23101105019",
    dept: "ECE",
    year: "2",
    isPaid: true,
    upiTransactionId: "makers-upi-id-3", // Added UPI Transaction ID
  }
];


const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // await User.deleteMany();
    // await Team.deleteMany();
    // await Registration.deleteMany();
    // console.log("✅ Old data deleted successfully!");


    const hashedUsers = await Promise.all(
      testUsers.map(async user => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );

    const createdUsers = await User.insertMany(hashedUsers);
    console.log("✅ Users seeded successfully!");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
