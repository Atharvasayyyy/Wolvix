const Comment = require("../models/Comment");
const Idea = require("../models/Idea");
const Notification = require("../models/Notification");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { awardPoints } = require("../utils/reputation");

exports.createComment = asyncHandler(async (req, res) => {
  const idea = await Idea.findOne({ slug: req.params.slug });
  if (!idea) throw new AppError("Idea not found", 404);

  const comment = await Comment.create({
    ...req.body,
    idea: idea._id,
    author: req.user._id
  });

  await awardPoints(req.user._id, "comment_created", "Comment", comment._id);

  if (!idea.author.equals(req.user._id)) {
    await Notification.create({
      recipient: idea.author,
      actor: req.user._id,
      type: "idea_comment",
      title: "New comment on your idea",
      body: req.body.body.slice(0, 160),
      link: `/ideas/${idea.slug}`
    });
  }

  res.status(201).json({ success: true, comment });
});

exports.listComments = asyncHandler(async (req, res) => {
  const idea = await Idea.findOne({ slug: req.params.slug });
  if (!idea) throw new AppError("Idea not found", 404);

  const comments = await Comment.find({ idea: idea._id, isDeleted: false })
    .populate("author", "name username")
    .sort({ createdAt: 1 });

  res.json({ success: true, comments });
});

exports.updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findOneAndUpdate(
    { _id: req.params.commentId, author: req.user._id, isDeleted: false },
    { body: req.body.body },
    { new: true }
  );

  if (!comment) throw new AppError("Comment not found or not owned by you", 404);
  res.json({ success: true, comment });
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findOneAndUpdate(
    { _id: req.params.commentId, author: req.user._id },
    { isDeleted: true, body: "[deleted]" },
    { new: true }
  );

  if (!comment) throw new AppError("Comment not found or not owned by you", 404);
  res.json({ success: true, comment });
});

exports.toggleCommentUpvote = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) throw new AppError("Comment not found", 404);

  const exists = comment.upvotes.some((id) => id.equals(req.user._id));
  const update = exists ? { $pull: { upvotes: req.user._id } } : { $addToSet: { upvotes: req.user._id } };
  const updated = await Comment.findByIdAndUpdate(comment._id, update, { new: true });

  if (!exists) await awardPoints(comment.author, "comment_upvoted", "Comment", comment._id);
  res.json({ success: true, comment: updated });
});
