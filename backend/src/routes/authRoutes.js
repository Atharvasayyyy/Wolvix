const express = require("express");
const auth = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const rules = require("../validators");

const router = express.Router();

router.post("/register", validate(rules.register), auth.register);
router.post("/login", validate(rules.login), auth.login);
router.post("/refresh-token", auth.refreshToken);
router.post("/logout", auth.logout);
router.get("/me", protect, auth.me);

module.exports = router;
