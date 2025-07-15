import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortcode: { type: String, unique: true, required: true },
  url: { type: String, required: true },
  expiry: { type: Date, required: true },
  hitCount: { type: Number, default: 0 },
});

export const Url = mongoose.model("Url", urlSchema);
