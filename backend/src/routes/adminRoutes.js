const express = require("express");
const Joi = require("joi");
const admin = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const router = express.Router();

router.use(protect, authorize("admin", "moderator"));
router.get("/stats", admin.stats);
router.patch(
  "/ideas/:ideaId/moderate",
  validate(Joi.object({ status: Joi.string().valid("published", "archived", "flagged").required() })),
  admin.moderateIdea
);

module.exports = router;
