import express from "express";
import Guru from "../models/Guru.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Get all gurus
router.get("/", async (req, res) => {
  const gurus = await Guru.find();
  res.json(gurus);
});

// Create guru (admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  const { name, youtube } = req.body;
  const guru = await Guru.create({ name, youtube });
  res.status(201).json(guru);
});

export default router;
