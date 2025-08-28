import mongoose from "mongoose";

const guruSchema = new mongoose.Schema({
  name: String,
  title: String,
  biography: String,
  youtubeVideos: [String]
}, { timestamps: true });

export default mongoose.model("Guru", guruSchema);
