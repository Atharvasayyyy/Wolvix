const jwt = require("jsonwebtoken");

const getSecret = (name, fallback) => {
  const secret = process.env[name] || fallback;
  if (!secret) throw new Error(`${name} is required`);
  return secret;
};

const signToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    getSecret("JWT_SECRET"),
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

const signRefreshToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      type: "refresh"
    },
    getSecret("JWT_REFRESH_SECRET", `${getSecret("JWT_SECRET")}-refresh`),
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d" }
  );

module.exports = { signToken, signRefreshToken };
