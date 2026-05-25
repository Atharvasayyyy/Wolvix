const Profile = require("../models/Profile");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username, isActive: true }).select("-password");
  if (!user) throw new AppError("Profile not found", 404);

  const profile = await Profile.findOne({ user: user._id }).populate("badges resume streak");
  res.json({ success: true, user, profile });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, username, ...profileFields } = req.body;

  if (name || username) {
    await User.findByIdAndUpdate(req.user._id, { name, username }, { runValidators: true });
  }

  const profile = await Profile.findOneAndUpdate({ user: req.user._id }, profileFields, {
    new: true,
    upsert: true,
    runValidators: true
  });

  res.json({ success: true, profile });
});
