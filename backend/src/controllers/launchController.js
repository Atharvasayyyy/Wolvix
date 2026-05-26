const Launch = require("../models/Launch");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const createUniqueSlug = require("../utils/slug");
const getPagination = require("../utils/pagination");

exports.listLaunches = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query, { limit: 12, maxLimit: 50 });
  const filter = { status: req.query.status || "published" };
  if (req.query.category) filter.category = req.query.category;

  const [launches, total] = await Promise.all([
    Launch.find(filter).populate("owner", "name username").sort({ createdAt: -1 }).skip(skip).limit(limit),
    Launch.countDocuments(filter)
  ]);

  res.json({ success: true, launches, page, limit, total });
});

exports.createLaunch = asyncHandler(async (req, res) => {
  const launch = await Launch.create({
    ...req.body,
    owner: req.user._id,
    slug: await createUniqueSlug(Launch, req.body.title)
  });
  res.status(201).json({ success: true, launch });
});

exports.getLaunch = asyncHandler(async (req, res) => {
  const launch = await Launch.findOne({ slug: req.params.slug }).populate("owner", "name username");
  if (!launch) throw new AppError("Launch not found", 404);
  res.json({ success: true, launch });
});

exports.updateLaunch = asyncHandler(async (req, res) => {
  const launch = await Launch.findOneAndUpdate({ slug: req.params.slug, owner: req.user._id }, req.body, { new: true });
  if (!launch) throw new AppError("Launch not found or not owned by you", 404);
  res.json({ success: true, launch });
});

exports.deleteLaunch = asyncHandler(async (req, res) => {
  const launch = await Launch.findOneAndUpdate({ slug: req.params.slug, owner: req.user._id }, { status: "archived" }, { new: true });
  if (!launch) throw new AppError("Launch not found or not owned by you", 404);
  res.json({ success: true, launch });
});

exports.toggleUpvote = asyncHandler(async (req, res) => {
  const launch = await Launch.findOne({ slug: req.params.slug });
  if (!launch) throw new AppError("Launch not found", 404);
  const exists = launch.upvotes.some((id) => id.equals(req.user._id));
  const update = exists ? { $pull: { upvotes: req.user._id } } : { $addToSet: { upvotes: req.user._id } };
  const updated = await Launch.findByIdAndUpdate(launch._id, update, { new: true });
  res.json({ success: true, launch: updated });
});

exports.toggleBookmark = asyncHandler(async (req, res) => {
  const launch = await Launch.findOne({ slug: req.params.slug });
  if (!launch) throw new AppError("Launch not found", 404);
  const exists = launch.bookmarks.some((id) => id.equals(req.user._id));
  const update = exists ? { $pull: { bookmarks: req.user._id } } : { $addToSet: { bookmarks: req.user._id } };
  const updated = await Launch.findByIdAndUpdate(launch._id, update, { new: true });
  res.json({ success: true, launch: updated });
});
