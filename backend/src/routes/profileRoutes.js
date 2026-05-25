const express = require("express");
const profile = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const rules = require("../validators");

const router = express.Router();

router.get("/:username", profile.getProfile);
router.patch("/me/update", protect, validate(rules.profileUpdate), profile.updateProfile);

module.exports = router;
