const mongoose = require("mongoose");

const reputationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    points: { type: Number, required: true },
    sourceType: String,
    sourceId: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
);

reputationSchema.index({ user: 1, createdAt: -1 });
reputationSchema.index({ action: 1, createdAt: -1 });
reputationSchema.index({ sourceType: 1, sourceId: 1 });

module.exports = mongoose.model("Reputation", reputationSchema);
