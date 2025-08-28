import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fetch from "node-fetch";

import Guru from "./models/Guru.js";
import Temple from "./models/Temple.js";
import User from "./models/User.js";

dotenv.config();
const app = express();
app.use(express.json());

// ----------------- MongoDB Connection -----------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// ----------------- AI Q&A Route -----------------
app.post("/api/ask", async (req, res) => {
  const { question } = req.body;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: question }]
      })
    });
    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------------- Gurus -------------------
app.get("/api/gurus", async (req, res) => {
  try {
    const gurus = await Guru.find();
    res.json(gurus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/gurus/sample", async (req, res) => {
  const sampleGurus = [
    { name: "Acharya Kundakunda", bio: "Famous Digamber Jain Acharya", youtube: "https://www.youtube.com/embed/XYZ123" },
    { name: "Acharya Vidyasagar", bio: "Renowned Jain Monk", youtube: "https://www.youtube.com/embed/ABC456" }
  ];
  await Guru.insertMany(sampleGurus);
  res.send("Sample Gurus added");
});

// ----------------- Temples -------------------
app.get("/api/temples", async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/temples/sample", async (req, res) => {
  const sampleTemples = [
    { name: "Shri Digamber Jain Mandir", city: "Delhi", state: "Delhi", facilities: ["Library", "Meditation Hall"] },
    { name: "Shri Jain Mandir", city: "Mumbai", state: "Maharashtra", facilities: ["Dining", "Accommodation"] }
  ];
  await Temple.insertMany(sampleTemples);
  res.send("Sample Temples added");
});

// ----------------- Users -------------------
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/users/sample", async (req, res) => {
  const sampleUsers = [
    { name: "Ramesh Jain", city: "Delhi", state: "Delhi", email: "ramesh@gmail.com" },
    { name: "Suresh Jain", city: "Mumbai", state: "Maharashtra", email: "suresh@gmail.com" }
  ];
  await User.insertMany(sampleUsers);
  res.send("Sample Users added");
});

// ----------------- Test Route -----------------
app.get("/", (req, res) => res.send("AI-enabled Digamber Jain Backend Running"));

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
