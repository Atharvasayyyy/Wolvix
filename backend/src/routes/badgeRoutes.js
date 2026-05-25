const express = require("express");
const badge = require("../controllers/badgeController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", badge.listBadges);
router.get("/leaderboard", badge.leaderboard);
router.post("/:userId/award", protect, authorize("admin", "moderator"), badge.awardBadge);

module.exports = router;
