const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    launch: { type: mongoose.Schema.Types.ObjectId, ref: "Launch" },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    company: { type: String, required: true },
    location: { type: String, default: "Remote" },
    type: { type: String, default: "Full-time" },
    description: { type: String, required: true },
    tags: [String],
    applications: [
      {
        applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        portfolioUrl: String,
        message: String,
        status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    status: { type: String, enum: ["open", "closed", "archived"], default: "open" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
