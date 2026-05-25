const asyncHandler = require("../utils/asyncHandler");

const result = (type, payload) => ({
  type,
  input: payload,
  summary: `Generated ${type} guidance for the Wolvix workflow.`,
  nextSteps: ["Validate the user problem", "Define an MVP milestone", "Recruit one collaborator", "Launch a feedback loop"]
});

exports.runTool = asyncHandler(async (req, res) => {
  res.json({ success: true, result: result(req.params.tool || "tool", req.body) });
});

exports.generateIdea = asyncHandler(async (req, res) => {
  res.json({ success: true, result: result("idea-generation", req.body) });
});

exports.scoreIdea = asyncHandler(async (req, res) => {
  res.json({ success: true, result: { ...result("idea-score", req.body), score: 82 } });
});

exports.matchCollaborators = asyncHandler(async (req, res) => {
  res.json({ success: true, result: { ...result("collaborator-matches", req.body), matches: [] } });
});
