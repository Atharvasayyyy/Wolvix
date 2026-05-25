const mongoose = require("mongoose");

const streakSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastActivityDate: Date,
    history: [
      {
        date: Date,
        action: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Streak", streakSchema);
