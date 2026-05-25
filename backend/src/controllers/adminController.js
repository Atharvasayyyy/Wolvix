const Idea = require("../models/Idea");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

exports.stats = asyncHandler(async (req, res) => {
  const [users, ideas, flaggedIdeas] = await Promise.all([
    User.countDocuments(),
    Idea.countDocuments(),
    Idea.countDocuments({ status: "flagged" })
  ]);
  res.json({ success: true, stats: { users, ideas, flaggedIdeas } });
});

exports.moderateIdea = asyncHandler(async (req, res) => {
  const idea = await Idea.findByIdAndUpdate(req.params.ideaId, { status: req.body.status }, { new: true });
  res.json({ success: true, idea });
});
