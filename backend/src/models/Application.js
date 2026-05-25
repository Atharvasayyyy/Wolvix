const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true, maxlength: 2000 },
    portfolioLinks: [String],
    status: { type: String, enum: ["pending", "accepted", "rejected", "withdrawn"], default: "pending" },
    decidedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    decidedAt: Date
  },
  { timestamps: true }
);

applicationSchema.index({ team: 1, roleId: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
