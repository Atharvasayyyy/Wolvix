const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: String,
    rarity: { type: String, enum: ["common", "rare", "epic", "legendary"], default: "common" },
    points: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Badge", badgeSchema);
