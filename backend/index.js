import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // 🔹 Important: load env vars

const app = express();
app.use(express.json());

console.log("Using Mongo URI:", process.env.MONGO_URI); // 🔹 Debug

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
