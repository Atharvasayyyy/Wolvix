const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true, maxlength: 140 },
    slug: { type: String, required: true, unique: true, lowercase: true },
    summary: { type: String, required: true, maxlength: 300 },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    market: String,
    stage: { type: String, enum: ["idea", "prototype", "mvp", "launched", "scaling"], default: "idea" },
    category: { type: String, required: true, index: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    collaborationNeeds: [String],
    media: [{ type: mongoose.Schema.Types.ObjectId, ref: "Upload" }],
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    viewCount: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published", "archived", "flagged"], default: "published" }
  },
  { timestamps: true }
);

ideaSchema.index({ title: "text", summary: "text", problem: "text", solution: "text", tags: "text" });

module.exports = mongoose.model("Idea", ideaSchema);
