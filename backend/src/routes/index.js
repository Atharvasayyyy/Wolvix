const express = require("express");
const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const ideaRoutes = require("./ideaRoutes");
const teamRoutes = require("./teamRoutes");
const uploadRoutes = require("./uploadRoutes");
const badgeRoutes = require("./badgeRoutes");
const notificationRoutes = require("./notificationRoutes");
const adminRoutes = require("./adminRoutes");
const launchRoutes = require("./launchRoutes");
const jobRoutes = require("./jobRoutes");
const aiRoutes = require("./aiRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profiles", profileRoutes);
router.use("/ideas", ideaRoutes);
router.use("/teams", teamRoutes);
router.use("/uploads", uploadRoutes);
router.use("/badges", badgeRoutes);
router.use("/notifications", notificationRoutes);
router.use("/launches", launchRoutes);
router.use("/jobs", jobRoutes);
router.use("/ai", aiRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
