import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  role: { type: String, default: "member" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
