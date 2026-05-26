const asyncHandler = require("../utils/asyncHandler");
const searchService = require("../services/search.service");

exports.globalSearch = asyncHandler(async (req, res) => {
  const q = String(req.query.q || "").trim();
  if (!q) return res.json({ success: true, results: {} });

  const results = await searchService.globalSearch({
    q,
    type: req.query.type || "all",
    limit: Math.min(Number(req.query.limit || 8), 20)
  });

  res.json({ success: true, results });
});
