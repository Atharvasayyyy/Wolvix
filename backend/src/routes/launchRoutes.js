const express = require("express");
const launch = require("../controllers/launchController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", launch.listLaunches);
router.post("/", protect, launch.createLaunch);
router.get("/:slug", launch.getLaunch);
router.patch("/:slug", protect, launch.updateLaunch);
router.delete("/:slug", protect, launch.deleteLaunch);
router.post("/:slug/upvote", protect, launch.toggleUpvote);
router.post("/:slug/bookmark", protect, launch.toggleBookmark);

module.exports = router;
