const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    path: { type: String, required: true },
    url: { type: String, required: true },
    purpose: { type: String, enum: ["profile_photo", "cover_image", "resume", "project_media", "team_logo", "other"], default: "other" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Upload", uploadSchema);
