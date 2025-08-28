import express from "express";
import Temple from "../models/Temple.js";
import axios from "axios";
const router = express.Router();

// AI-powered endpoint
router.get("/ai", async (req, res) => {
  try {
    const cached = await Temple.find();
    if (cached.length > 0) return res.json(cached);

    const prompt = "List Digamber Jain temples in India, their location and facilities in JSON.";
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    }, { headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` }});

    const data = JSON.parse(response.data.choices[0].message.content);
    await Temple.insertMany(data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
