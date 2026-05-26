const Bookmark = require("../models/Bookmark");
const Idea = require("../models/Idea");
const Job = require("../models/Job");
const Launch = require("../models/Launch");
const Profile = require("../models/Profile");
const Team = require("../models/Team");
const AppError = require("../utils/AppError");

const models = {
  Idea,
  Job,
  Launch,
  Profile,
  Project: Team,
  Team
};

const normalizeTargetType = (targetType) => (targetType === "Project" ? "Team" : targetType);

const assertTarget = async (targetType, targetId) => {
  const normalized = normalizeTargetType(targetType);
  const Model = models[normalized];
  if (!Model) throw new AppError("Unsupported bookmark target type", 400);
  const target = await Model.findById(targetId).select("_id slug title name user");
  if (!target) throw new AppError("Bookmark target not found", 404);
  return { normalized, target };
};

const toggleBookmark = async ({ user, targetType, targetId, metadata = {} }) => {
  const { normalized, target } = await assertTarget(targetType, targetId);
  const existing = await Bookmark.findOne({ user, targetType: normalized, targetId });

  if (existing && !existing.isDeleted) {
    existing.isDeleted = true;
    existing.deletedAt = new Date();
    await existing.save();
    return { bookmarked: false, bookmark: existing };
  }

  if (existing) {
    existing.isDeleted = false;
    existing.deletedAt = undefined;
    existing.metadata = metadata;
    await existing.save();
    return { bookmarked: true, bookmark: existing };
  }

  const bookmark = await Bookmark.create({ user, targetType: normalized, targetId, metadata });
  return { bookmarked: true, bookmark, target };
};

const listBookmarks = async ({ user, targetType, page = 1, limit = 30, skip = 0 }) => {
  const filter = { user, isDeleted: false };
  if (targetType) filter.targetType = normalizeTargetType(targetType);

  const [bookmarks, total] = await Promise.all([
    Bookmark.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Bookmark.countDocuments(filter)
  ]);

  return { bookmarks, total, page, limit };
};

module.exports = { listBookmarks, toggleBookmark };
