const express = require("express");
const uploadController = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/asset", protect, upload.single("file"), uploadController.uploadAsset);
router.post("/resume", protect, upload.single("resume"), uploadController.uploadResume);

module.exports = router;
