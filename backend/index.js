import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config(); // 🔹 Load .env locally

const app = express();
app.use(express.json());

// 🔹 MongoDB connection
console.log("Using Mongo URI:", process.env.MONGO_URI?.replace(/:.+@/, ":****@"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 🔹 Sample schema for Gurus
const guruSchema = new mongoose.Schema({
  name: String,
  bio: String,
  youtube: String
});
const Guru = mongoose.model("Guru", guruSchema);

// 🔹 AI-enabled route using OpenAI
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

// 🔹 Test endpoint
app.get("/", (req, res) => {
  res.send("AI-enabled Digamber Jain Backend Running");
});

// 🔹 Port handling (Render compatible)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
