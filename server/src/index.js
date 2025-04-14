import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();

import authRoutes from './routes/auth.routes.js';
import eventRoutes from './routes/event.routes.js'; 
import registrationRoutes from './routes/registration.routes.js';
import userRoutes from './routes/user.routes.js';

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes); 
app.use("/api/registration", registrationRoutes); 
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})