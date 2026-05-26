const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    idea: { type: mongoose.Schema.Types.ObjectId, ref: "Idea" },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    logo: { type: mongoose.Schema.Types.ObjectId, ref: "Upload" },
    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["owner", "admin", "member"], default: "member" },
        title: String,
        joinedAt: { type: Date, default: Date.now }
      }
    ],
    openRoles: [
      {
        title: { type: String, required: true },
        category: { type: String, enum: ["developer", "designer", "marketer", "founder", "product", "sales", "other"], required: true },
        description: { type: String, required: true },
        skills: [String],
        isOpen: { type: Boolean, default: true }
      }
    ],
    status: { type: String, enum: ["forming", "building", "launched", "paused", "archived"], default: "forming" }
  },
  { timestamps: true }
);

teamSchema.index({ name: "text", description: "text", "openRoles.title": "text", "openRoles.skills": "text" });
teamSchema.index({ status: 1, createdAt: -1 });
teamSchema.index({ owner: 1, createdAt: -1 });
teamSchema.index({ "members.user": 1 });
teamSchema.index({ "openRoles.skills": 1 });

module.exports = mongoose.model("Team", teamSchema);
