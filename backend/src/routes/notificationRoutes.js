const express = require("express");
const notification = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, notification.listNotifications);
router.patch("/:id/read", protect, notification.markRead);

module.exports = router;
