const express = require("express");
const job = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", job.listJobs);
router.post("/", protect, job.createJob);
router.get("/:slug", job.getJob);
router.patch("/:slug", protect, job.updateJob);
router.delete("/:slug", protect, job.deleteJob);
router.post("/:slug/apply", protect, job.applyToJob);

module.exports = router;
