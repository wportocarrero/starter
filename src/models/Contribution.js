// src/models/Contribution.js
import mongoose from "mongoose";

const ContributionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  amount: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.Contribution || mongoose.model("Contribution", ContributionSchema);
