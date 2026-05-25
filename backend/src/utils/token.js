const jwt = require("jsonwebtoken");

const signToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

const signRefreshToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      type: "refresh"
    },
    process.env.JWT_REFRESH_SECRET || `${process.env.JWT_SECRET}-refresh`,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d" }
  );

module.exports = { signToken, signRefreshToken };
