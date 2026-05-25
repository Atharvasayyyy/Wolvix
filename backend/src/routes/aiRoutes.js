const express = require("express");
const ai = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/tools/:tool/run", protect, ai.runTool);
router.post("/ideas/generate", protect, ai.generateIdea);
router.post("/ideas/score", protect, ai.scoreIdea);
router.post("/matches", protect, ai.matchCollaborators);
router.post("/:tool", protect, ai.runTool);

module.exports = router;
