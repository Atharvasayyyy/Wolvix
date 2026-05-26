const Profile = require("../models/Profile");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const clampScore = (value) => Math.max(0, Math.min(Math.round(value), 100));

const scoreProfile = (profileFields) => {
  const skills = profileFields.skills || [];
  const experience = profileFields.experience || [];
  const education = profileFields.education || [];
  const certifications = profileFields.certifications || [];
  const social = profileFields.socialLinks || {};
  const github = profileFields.githubStats || {};
  const leetcode = profileFields.leetcodeStats || {};
  const professional = profileFields.professional || {};

  const profileStrengthScore = clampScore(
    (profileFields.profilePhoto ? 10 : 0) +
    (profileFields.coverImage ? 5 : 0) +
    (profileFields.bio ? 15 : 0) +
    Math.min(skills.length * 4, 20) +
    Math.min(experience.length * 8, 20) +
    Math.min(education.length * 5, 10) +
    (social.github ? 5 : 0) +
    (social.linkedin ? 5 : 0) +
    (social.leetcode ? 5 : 0) +
    (professional.headline ? 5 : 0)
  );

  const openSourceScore = clampScore((github.stars || 0) / 20 + (github.repositories || 0) * 2 + (github.contributionCount || 0) / 50);
  const builderScore = clampScore((github.commits || 0) / 80 + skills.length * 4 + (profileFields.activityHistory?.length || 0) * 2);
  const technicalDepthScore = clampScore((github.topLanguages?.length || 0) * 10 + certifications.length * 8 + Math.min(skills.length * 3, 30));
  const dsaScore = clampScore((leetcode.solvedProblems || 0) / 8 + (leetcode.contestRating || 0) / 30);
  const codingStrengthScore = clampScore(dsaScore * 0.65 + technicalDepthScore * 0.35);

  return {
    professional: {
      ...professional,
      profileStrengthScore,
      portfolioReadinessScore: clampScore(profileStrengthScore * 0.5 + builderScore * 0.3 + openSourceScore * 0.2),
      startupReadinessScore: clampScore(builderScore * 0.4 + technicalDepthScore * 0.3 + Math.min(skills.length * 5, 30)),
      hiringReadinessScore: clampScore(profileStrengthScore * 0.4 + codingStrengthScore * 0.3 + openSourceScore * 0.3)
    },
    githubStats: {
      ...github,
      builderScore,
      openSourceScore,
      technicalDepthScore
    },
    leetcodeStats: {
      ...leetcode,
      dsaScore,
      codingStrengthScore,
      competitiveCodingLevel: codingStrengthScore >= 80 ? "advanced" : codingStrengthScore >= 45 ? "intermediate" : "beginner"
    }
  };
};

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username, isActive: true }).select("-password");
  if (!user) throw new AppError("Profile not found", 404);

  const profile = await Profile.findOne({ user: user._id }).populate("badges resume streak");
  res.json({ success: true, user, profile });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, username, ...profileFields } = req.body;

  if (name || username) {
    await User.findByIdAndUpdate(req.user._id, { name, username }, { runValidators: true });
  }

  const current = await Profile.findOne({ user: req.user._id }).lean();
  const mergedFields = { ...(current || {}), ...profileFields };
  const scoredFields = scoreProfile(mergedFields);

  const profile = await Profile.findOneAndUpdate({ user: req.user._id }, { ...profileFields, ...scoredFields }, {
    new: true,
    upsert: true,
    runValidators: true
  });

  res.json({ success: true, profile });
});
