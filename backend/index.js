import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

// Routes
import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Jain Community Backend is running");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
