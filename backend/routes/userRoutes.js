import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try { const user = new User(req.body); await user.save(); res.status(201).json(user); }
  catch (err) { res.status(400).json({ error: err.message }); }
});

router.get("/", async (req, res) => { const users = await User.find(); res.json(users); });

router.get("/search/:name", async (req, res) => {
  const regex = new RegExp(req.params.name, "i");
  const users = await User.find({ name: regex });
  res.json(users);
});

router.post("/connect", async (req, res) => {
  const { userId, connectId } = req.body;
  const user = await User.findById(userId);
  const connectUser = await User.findById(connectId);
  if (!user || !connectUser) return res.status(404).json({ error: "User not found" });
  if (!user.connectedUsers.includes(connectId)) user.connectedUsers.push(connectId);
  await user.save();
  res.json({ success: true, user });
});

export default router;
