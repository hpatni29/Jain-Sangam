import mongoose from "mongoose";

const guruSchema = new mongoose.Schema({
  name: { type: String, required: true },
  youtube: { type: String }, // optional video link
});

export default mongoose.model("Guru", guruSchema);
