const express = require("express");
const bookmark = require("../controllers/bookmarkController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const rules = require("../validators");

const router = express.Router();

router.get("/", protect, bookmark.listBookmarks);
router.post("/toggle", protect, validate(rules.bookmarkToggle), bookmark.toggleBookmark);

module.exports = router;
