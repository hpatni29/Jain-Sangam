import express from "express";
import Temple from "../models/Temple.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Get all temples
router.get("/", async (req, res) => {
  const temples = await Temple.find();
  res.json(temples);
});

// Create temple (admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  const { name, location, facilities } = req.body;
  const temple = await Temple.create({ name, location, facilities });
  res.status(201).json(temple);
});

export default router;
