const express = require("express");
const launch = require("../controllers/launchController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const rules = require("../validators");

const router = express.Router();

router.get("/", launch.listLaunches);
router.post("/", protect, validate(rules.launchCreate), launch.createLaunch);
router.get("/:slug", launch.getLaunch);
router.patch("/:slug", protect, validate(rules.launchUpdate), launch.updateLaunch);
router.delete("/:slug", protect, launch.deleteLaunch);
router.post("/:slug/upvote", protect, launch.toggleUpvote);
router.post("/:slug/bookmark", protect, launch.toggleBookmark);

module.exports = router;
