const mongoose = require("mongoose");

const launchSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    tagline: { type: String, required: true },
    description: String,
    category: { type: String, default: "Startup" },
    demoUrl: String,
    screenshots: [String],
    changelog: [String],
    reviews: [
      {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        body: String,
        createdAt: { type: Date, default: Date.now }
      }
    ],
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" }
  },
  { timestamps: true }
);

launchSchema.index({ title: "text", tagline: "text", description: "text", category: "text" });
launchSchema.index({ status: 1, createdAt: -1 });
launchSchema.index({ owner: 1, createdAt: -1 });
launchSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model("Launch", launchSchema);
