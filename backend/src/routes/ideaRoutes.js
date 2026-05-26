const express = require("express");
const idea = require("../controllers/ideaController");
const comment = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const rules = require("../validators");

const router = express.Router();

router.get("/", idea.listIdeas);
router.get("/trending", idea.trendingIdeas);
router.get("/recommended", protect, idea.recommendedIdeas);
router.post("/", protect, validate(rules.ideaCreate), idea.createIdea);
router.get("/:slug", idea.getIdea);
router.patch("/:slug", protect, validate(rules.ideaUpdate), idea.updateIdea);
router.delete("/:slug", protect, idea.deleteIdea);
router.post("/:slug/upvote", protect, idea.toggleUpvote);
router.post("/:slug/bookmark", protect, idea.toggleBookmark);
router.get("/:slug/comments", comment.listComments);
router.post("/:slug/comments", protect, validate(rules.commentCreate), comment.createComment);
router.patch("/:slug/comments/:commentId", protect, validate(rules.commentUpdate), comment.updateComment);
router.delete("/:slug/comments/:commentId", protect, comment.deleteComment);
router.post("/:slug/comments/:commentId/upvote", protect, comment.toggleCommentUpvote);

module.exports = router;
