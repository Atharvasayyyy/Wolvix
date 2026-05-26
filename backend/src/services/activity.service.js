const ActivityLog = require("../models/ActivityLog");

const logActivity = async ({ actor, action, targetType, targetId, metadata = {} }) => {
  if (!actor || !action || !targetType || !targetId) return null;
  return ActivityLog.create({ actor, action, targetType, targetId, metadata });
};

const listActivities = async ({ actor, targetType, targetId, page = 1, limit = 30, skip = 0 }) => {
  const filter = { isDeleted: false };
  if (actor) filter.actor = actor;
  if (targetType) filter.targetType = targetType;
  if (targetId) filter.targetId = targetId;

  const [activities, total] = await Promise.all([
    ActivityLog.find(filter).populate("actor", "name username").sort({ createdAt: -1 }).skip(skip).limit(limit),
    ActivityLog.countDocuments(filter)
  ]);

  return { activities, total, page, limit };
};

module.exports = { listActivities, logActivity };
