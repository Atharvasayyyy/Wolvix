const express = require("express");
const team = require("../controllers/teamController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const rules = require("../validators");

const router = express.Router();

router.get("/", team.listTeams);
router.post("/", protect, validate(rules.teamCreate), team.createTeam);
router.get("/:slug", team.getTeam);
router.post("/:slug/roles", protect, validate(rules.roleCreate), team.addRole);
router.post("/:slug/roles/:roleId/apply", protect, validate(rules.applicationCreate), team.applyToRole);
router.patch("/applications/:applicationId", protect, validate(rules.applicationDecision), team.decideApplication);

module.exports = router;
