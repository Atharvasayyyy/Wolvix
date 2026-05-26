const express = require("express");
const activity = require("../controllers/activityController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, activity.listActivities);

module.exports = router;
