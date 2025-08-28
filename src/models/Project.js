// src/models/Project.js
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goal: { type: Number, required: true },
  raised: { type: Number, default: 0 },
  image: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
