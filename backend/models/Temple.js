import mongoose from "mongoose";

const templeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  facilities: { type: String }
});

export default mongoose.model("Temple", templeSchema);
