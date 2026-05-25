const Idea = require("../models/Idea");
const Notification = require("../models/Notification");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const createUniqueSlug = require("../utils/slug");
const { awardPoints, updateStreak } = require("../utils/reputation");

exports.createIdea = asyncHandler(async (req, res) => {
  const idea = await Idea.create({
    ...req.body,
    author: req.user._id,
    slug: await createUniqueSlug(Idea, req.body.title)
  });

  await awardPoints(req.user._id, "idea_created", "Idea", idea._id);
  await updateStreak(req.user._id, "idea_created");
  res.status(201).json({ success: true, idea });
});

exports.listIdeas = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Math.min(Number(req.query.limit || 12), 50);
  const filter = { status: req.query.status || "published" };

  if (req.query.category) filter.category = req.query.category;
  if (req.query.tag) filter.tags = req.query.tag;
  if (req.query.q) filter.$text = { $search: req.query.q };

  const [ideas, total] = await Promise.all([
    Idea.find(filter)
      .populate("author", "name username")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Idea.countDocuments(filter)
  ]);

  res.json({ success: true, ideas, page, limit, total });
});

exports.trendingIdeas = asyncHandler(async (req, res) => {
  const ideas = await Idea.aggregate([
    { $match: { status: "published" } },
    { $addFields: { score: { $add: [{ $size: "$upvotes" }, { $size: "$bookmarks" }, { $multiply: ["$viewCount", 0.1] }] } } },
    { $sort: { score: -1, createdAt: -1 } },
    { $limit: 20 }
  ]);

  res.json({ success: true, ideas });
});

exports.getIdea = asyncHandler(async (req, res) => {
  const idea = await Idea.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { viewCount: 1 } },
    { new: true }
  ).populate("author", "name username");

  if (!idea) throw new AppError("Idea not found", 404);
  res.json({ success: true, idea });
});

exports.updateIdea = asyncHandler(async (req, res) => {
  const idea = await Idea.findOneAndUpdate({ slug: req.params.slug, author: req.user._id }, req.body, {
    new: true,
    runValidators: true
  });

  if (!idea) throw new AppError("Idea not found or not owned by you", 404);
  res.json({ success: true, idea });
});

exports.deleteIdea = asyncHandler(async (req, res) => {
  const idea = await Idea.findOneAndUpdate(
    { slug: req.params.slug, author: req.user._id },
    { status: "archived" },
    { new: true }
  );

  if (!idea) throw new AppError("Idea not found or not owned by you", 404);
  res.json({ success: true, idea });
});

exports.toggleUpvote = asyncHandler(async (req, res) => {
  const idea = await Idea.findOne({ slug: req.params.slug });
  if (!idea) throw new AppError("Idea not found", 404);

  const exists = idea.upvotes.some((id) => id.equals(req.user._id));
  const update = exists ? { $pull: { upvotes: req.user._id } } : { $addToSet: { upvotes: req.user._id } };
  const updated = await Idea.findByIdAndUpdate(idea._id, update, { new: true });

  if (!exists) {
    await awardPoints(idea.author, "idea_upvoted", "Idea", idea._id);
    await Notification.create({
      recipient: idea.author,
      actor: req.user._id,
      type: "idea_upvote",
      title: "Your idea got an upvote",
      link: `/ideas/${idea.slug}`
    });
  }

  res.json({ success: true, idea: updated });
});

exports.toggleBookmark = asyncHandler(async (req, res) => {
  const idea = await Idea.findOne({ slug: req.params.slug });
  if (!idea) throw new AppError("Idea not found", 404);

  const exists = idea.bookmarks.some((id) => id.equals(req.user._id));
  const update = exists ? { $pull: { bookmarks: req.user._id } } : { $addToSet: { bookmarks: req.user._id } };
  const updated = await Idea.findByIdAndUpdate(idea._id, update, { new: true });
  res.json({ success: true, idea: updated });
});
