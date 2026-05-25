const User = require("../models/User");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { signToken, signRefreshToken } = require("../utils/token");

const sendUser = (res, statusCode, user) => {
  const safeUser = user.toObject();
  delete safeUser.password;
  res.status(statusCode).json({
    success: true,
    token: signToken(user),
    refreshToken: signRefreshToken(user),
    user: safeUser
  });
};

exports.register = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  await Profile.create({ user: user._id });
  sendUser(res, 201, user);
});

exports.login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select("+password");
  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new AppError("Invalid email or password", 401);
  }

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });
  sendUser(res, 200, user);
});

exports.me = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id }).populate("badges resume streak");
  res.json({ success: true, user: req.user, profile });
});

exports.refreshToken = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken;
  if (!token) throw new AppError("Refresh token required", 400);

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || `${process.env.JWT_SECRET}-refresh`);
  if (decoded.type !== "refresh") throw new AppError("Invalid refresh token", 401);

  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) throw new AppError("User account not found", 401);

  res.json({ success: true, token: signToken(user), refreshToken: signRefreshToken(user), user });
});

exports.logout = asyncHandler(async (req, res) => {
  res.json({ success: true, message: "Logged out" });
});
