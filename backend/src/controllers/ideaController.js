const Idea = require("../models/Idea");
const Profile = require("../models/Profile");
const Notification = require("../models/Notification");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const createUniqueSlug = require("../utils/slug");
const getPagination = require("../utils/pagination");
const { ideaSignals, matchingScore, profileSignals } = require("../utils/recommendations");
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
  const { page, limit, skip } = getPagination(req.query, { limit: 12, maxLimit: 50 });
  const filter = { status: req.query.status || "published" };

  if (req.query.category) filter.category = req.query.category;
  if (req.query.tag) filter.tags = req.query.tag;
  if (req.query.q) filter.$text = { $search: req.query.q };

  const [ideas, total] = await Promise.all([
    Idea.find(filter)
      .populate("author", "name username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Idea.countDocuments(filter)
  ]);

  res.json({ success: true, ideas, page, limit, total });
});

exports.trendingIdeas = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit || 20), 50);
  const ideas = await Idea.aggregate([
    { $match: { status: "published" } },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "idea",
        as: "comments"
      }
    },
    {
      $addFields: {
        upvoteCount: { $size: { $ifNull: ["$upvotes", []] } },
        bookmarkCount: { $size: { $ifNull: ["$bookmarks", []] } },
        commentCount: {
          $size: {
            $filter: {
              input: "$comments",
              as: "comment",
              cond: { $eq: ["$$comment.isDeleted", false] }
            }
          }
        },
        contributorCount: { $size: { $ifNull: ["$collaborationNeeds", []] } },
        ageHours: { $divide: [{ $subtract: ["$$NOW", "$createdAt"] }, 3600000] }
      }
    },
    {
      $addFields: {
        freshness: { $divide: [1, { $add: [1, { $divide: ["$ageHours", 24] }] }] },
        score: {
          $add: [
            { $multiply: ["$upvoteCount", 5] },
            "$commentCount",
            "$contributorCount",
            "$bookmarkCount",
            { $multiply: ["$viewCount", 0.1] }
          ]
        }
      }
    },
    { $addFields: { score: { $add: ["$score", { $multiply: ["$freshness", 10] }] } } },
    { $project: { comments: 0 } },
    { $sort: { score: -1, createdAt: -1 } },
    { $limit: limit }
  ]);

  res.json({ success: true, ideas });
});

exports.recommendedIdeas = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query, { limit: 12, maxLimit: 50 });
  const profile = await Profile.findOne({ user: req.user._id }).lean();
  const signals = profileSignals(profile);
  const query = { status: "published" };

  if (signals.length) {
    query.$or = [
      { tags: { $in: signals } },
      { category: { $in: signals } },
      { collaborationNeeds: { $in: signals } }
    ];
  }

  const ideas = await Idea.find(query)
    .populate("author", "name username")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const scored = ideas
    .map((idea) => ({
      ...idea,
      recommendationScore: matchingScore(signals, ideaSignals(idea))
    }))
    .sort((a, b) => b.recommendationScore - a.recommendationScore || new Date(b.createdAt) - new Date(a.createdAt));

  res.json({ success: true, ideas: scored, page, limit, total: scored.length, signals });
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
