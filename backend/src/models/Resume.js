const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    file: { type: mongoose.Schema.Types.ObjectId, ref: "Upload", required: true },
    parsed: {
      skills: [String],
      education: [String],
      certifications: [String],
      projects: [String],
      experience: [String]
    },
    manuallyEdited: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
