import express from "express";
import OpenAI from "openai";

const router = express.Router();

// Ensure your environment variable is loaded
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// AI Chat Route
router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
      max_tokens: 200,
    });

    const answer = response.choices[0].message.content;

    res.json({ answer });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ error: "Error fetching AI response" });
  }
});

export default router;
