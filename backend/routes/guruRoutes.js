import express from "express";
import Guru from "../models/Guru.js";
import axios from "axios";
const router = express.Router();

// AI-powered endpoint
router.get("/ai", async (req, res) => {
  try {
    const cached = await Guru.find();
    if (cached.length > 0) return res.json(cached);

    const prompt = "List top Digamber Jain Gurus, short bio, and main YouTube links in JSON.";
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    }, { headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` }});

    const data = JSON.parse(response.data.choices[0].message.content);
    await Guru.insertMany(data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
