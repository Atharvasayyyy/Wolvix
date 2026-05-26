const asyncHandler = require("../utils/asyncHandler");
const getPagination = require("../utils/pagination");
const bookmarkService = require("../services/bookmark.service");

exports.listBookmarks = asyncHandler(async (req, res) => {
  const pagination = getPagination(req.query, { limit: 30, maxLimit: 100 });
  const result = await bookmarkService.listBookmarks({
    user: req.user._id,
    targetType: req.query.targetType,
    ...pagination
  });
  res.json({ success: true, ...result });
});

exports.toggleBookmark = asyncHandler(async (req, res) => {
  const result = await bookmarkService.toggleBookmark({
    user: req.user._id,
    targetType: req.body.targetType,
    targetId: req.body.targetId,
    metadata: req.body.metadata
  });
  res.json({ success: true, ...result });
});
