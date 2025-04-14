import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import Team from '../models/team.model.js';


dotenv.config();

const testUsers = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "password123",
    phone: "9876543210",
    rollNo: "CSE2021001",
    dept: "CSE",
    year: "3",
    isPaid: true,
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    password: "password123",
    phone: "9876543211",
    rollNo: "ECE2021002",
    dept: "ECE",
    year: "2",
    isPaid: false,
  },
  {
    name: "Charlie Brown",
    email: "charlie@example.com",
    password: "password123",
    phone: "9876543212",
    rollNo: "ME2021003",
    dept: "ME",
    year: "4",
    isPaid: true,
  },
  {
    name: "Diana Prince",
    email: "diana@example.com",
    password: "password123",
    phone: "9876543213",
    rollNo: "CSE2021004",
    dept: "CSE",
    year: "1",
    isPaid: false,
  },
  {
    name: "Ethan Hunt",
    email: "ethan@example.com",
    password: "password123",
    phone: "9876543214",
    rollNo: "EEE2021005",
    dept: "EEE",
    year: "2",
    isPaid: true,
  },
  {
    name: "Fiona Gallagher",
    email: "fiona@example.com",
    password: "password123",
    phone: "9876543215",
    rollNo: "CIV2021006",
    dept: "CIV",
    year: "3",
    isPaid: true,
  },
  {
    name: "George Miller",
    email: "george@example.com",
    password: "password123",
    phone: "9876543216",
    rollNo: "CSE2021007",
    dept: "CSE",
    year: "4",
    isPaid: false,
  },
  {
    name: "Hannah Wells",
    email: "hannah@example.com",
    password: "password123",
    phone: "9876543217",
    rollNo: "ECE2021008",
    dept: "ECE",
    year: "1",
    isPaid: true,
  },
  {
    name: "Ian Malcolm",
    email: "ian@example.com",
    password: "password123",
    phone: "9876543218",
    rollNo: "ME2021009",
    dept: "ME",
    year: "2",
    isPaid: false,
  },
  {
    name: "Julia Roberts",
    email: "julia@example.com",
    password: "password123",
    phone: "9876543219",
    rollNo: "CSE2021010",
    dept: "CSE",
    year: "3",
    isPaid: true,
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();
    await Team.deleteMany();

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
