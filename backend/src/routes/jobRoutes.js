const express = require("express");
const job = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const rules = require("../validators");

const router = express.Router();

router.get("/", job.listJobs);
router.post("/", protect, validate(rules.jobCreate), job.createJob);
router.get("/:slug", job.getJob);
router.patch("/:slug", protect, validate(rules.jobUpdate), job.updateJob);
router.delete("/:slug", protect, job.deleteJob);
router.post("/:slug/apply", protect, validate(rules.jobApplication), job.applyToJob);

module.exports = router;
