import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import guruRoutes from "./routes/gurus.js";
import templeRoutes from "./routes/temples.js";
import aiRoutes from "./routes/ai.js";

dotenv.config();
const app = express();

// CORS: allow frontend domain
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gurus", guruRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/ai", aiRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
