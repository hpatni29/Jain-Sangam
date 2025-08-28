import mongoose from "mongoose";

const templeSchema = new mongoose.Schema({
  name: String,
  city: String,
  state: String,
  facilities: [String]
});

const Temple = mongoose.model("Temple", templeSchema);
export default Temple;
