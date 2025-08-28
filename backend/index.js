import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import guruRoutes from "./routes/guruRoutes.js";
import templeRoutes from "./routes/templeRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"));

app.use("/api/gurus", guruRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("AI-enabled Digamber Jain Backend Running"));

app.listen(process.env.PORT || 5000, () => console.log("Server running"));
