const asyncHandler = require("../utils/asyncHandler");
const getPagination = require("../utils/pagination");
const activityService = require("../services/activity.service");

exports.listActivities = asyncHandler(async (req, res) => {
  const pagination = getPagination(req.query, { limit: 30, maxLimit: 100 });
  const result = await activityService.listActivities({
    actor: req.query.actor,
    targetType: req.query.targetType,
    targetId: req.query.targetId,
    ...pagination
  });
  res.json({ success: true, ...result });
});
