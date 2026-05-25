const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, required: true },
    title: { type: String, required: true },
    body: String,
    link: String,
    readAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
