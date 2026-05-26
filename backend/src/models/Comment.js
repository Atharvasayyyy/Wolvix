const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    idea: { type: mongoose.Schema.Types.ObjectId, ref: "Idea", required: true, index: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
    body: { type: String, required: true, maxlength: 3000 },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

commentSchema.index({ idea: 1, createdAt: 1 });
commentSchema.index({ author: 1, createdAt: -1 });
commentSchema.index({ parent: 1 });

module.exports = mongoose.model("Comment", commentSchema);
