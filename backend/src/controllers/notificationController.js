const Notification = require("../models/Notification");
const asyncHandler = require("../utils/asyncHandler");
const getPagination = require("../utils/pagination");

exports.listNotifications = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query, { limit: 30, maxLimit: 100 });
  const filter = { recipient: req.user._id };
  if (req.query.unread === "true") filter.readAt = { $exists: false };

  const [notifications, total, unreadCount] = await Promise.all([
    Notification.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Notification.countDocuments(filter),
    Notification.countDocuments({ recipient: req.user._id, readAt: { $exists: false } })
  ]);

  res.json({ success: true, notifications, page, limit, total, unreadCount });
});

exports.markRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user._id },
    { readAt: new Date() },
    { new: true }
  );
  res.json({ success: true, notification });
});
