const Badge = require("../models/Badge");
const Profile = require("../models/Profile");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { awardPoints } = require("../utils/reputation");

exports.listBadges = asyncHandler(async (req, res) => {
  const badges = await Badge.find().sort({ rarity: 1, name: 1 });
  res.json({ success: true, badges });
});

exports.leaderboard = asyncHandler(async (req, res) => {
  const profiles = await Profile.find().populate("user", "name username").sort({ reputationScore: -1 }).limit(50);
  res.json({ success: true, profiles });
});

exports.awardBadge = asyncHandler(async (req, res) => {
  const badge = await Badge.findOne({ code: req.body.badgeCode });
  if (!badge) throw new AppError("Badge not found", 404);

  await Profile.findOneAndUpdate({ user: req.params.userId }, { $addToSet: { badges: badge._id } }, { upsert: true });
  await awardPoints(req.params.userId, "badge_earned", "Badge", badge._id);
  res.json({ success: true, badge });
});
