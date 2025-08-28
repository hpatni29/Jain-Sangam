import mongoose from "mongoose";

const guruSchema = new mongoose.Schema({
  name: String,
  bio: String,
  youtube: String
});

const Guru = mongoose.model("Guru", guruSchema);
export default Guru;
