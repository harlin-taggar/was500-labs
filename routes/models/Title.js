import mongoose from "mongoose";

const titleSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  year: { type: Number, required: true },
  synopsis: { type: String, required: true },
  genres: { type: [String], default: [] },
  poster: { type: String, required: true }, // URL of poster
}, { timestamps: true });

export default mongoose.model("Title", titleSchema);
