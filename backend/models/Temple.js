import mongoose from "mongoose";

const templeSchema = new mongoose.Schema({
  name: String,
  location: String,
  facilities: [String],
  contactEmail: String
}, { timestamps: true });

export default mongoose.model("Temple", templeSchema);
