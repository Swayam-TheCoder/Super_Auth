import express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from './routes/userRoutes.js';
import connectDB from "./config/db.js";
const app = express();

connectDB();
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
