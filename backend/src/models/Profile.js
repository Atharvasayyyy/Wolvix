const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    profilePhoto: String,
    coverImage: String,
    bio: { type: String, maxlength: 1000 },
    skills: [{ type: String, trim: true }],
    education: [
      {
        institution: String,
        degree: String,
        field: String,
        startDate: Date,
        endDate: Date,
        description: String
      }
    ],
    certifications: [
      {
        name: String,
        issuer: String,
        issuedAt: Date,
        url: String
      }
    ],
    experience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        current: Boolean,
        description: String
      }
    ],
    resume: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
    socialLinks: {
      github: String,
      linkedin: String,
      leetcode: String,
      portfolio: String,
      other: [
        {
          label: String,
          url: String
        }
      ]
    },
    professional: {
      headline: String,
      currentRole: String,
      company: String,
      profileStrengthScore: { type: Number, default: 0 },
      portfolioReadinessScore: { type: Number, default: 0 },
      startupReadinessScore: { type: Number, default: 0 },
      hiringReadinessScore: { type: Number, default: 0 }
    },
    githubStats: {
      username: String,
      repositories: { type: Number, default: 0 },
      stars: { type: Number, default: 0 },
      commits: { type: Number, default: 0 },
      contributionCount: { type: Number, default: 0 },
      topLanguages: [String],
      pinnedRepos: [
        {
          name: String,
          url: String,
          description: String,
          stars: Number,
          language: String
        }
      ],
      builderScore: { type: Number, default: 0 },
      openSourceScore: { type: Number, default: 0 },
      technicalDepthScore: { type: Number, default: 0 }
    },
    leetcodeStats: {
      username: String,
      solvedProblems: { type: Number, default: 0 },
      contestRating: { type: Number, default: 0 },
      streak: { type: Number, default: 0 },
      ranking: { type: Number, default: 0 },
      badges: [String],
      skillTags: [String],
      dsaScore: { type: Number, default: 0 },
      codingStrengthScore: { type: Number, default: 0 },
      competitiveCodingLevel: { type: String, default: "beginner" }
    },
    startupInterests: [String],
    location: {
      city: String,
      state: String,
      country: String,
      remote: { type: Boolean, default: true }
    },
    reputationScore: { type: Number, default: 0 },
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Badge" }],
    medals: [String],
    streak: { type: mongoose.Schema.Types.ObjectId, ref: "Streak" },
    activityHistory: [
      {
        type: String,
        text: String,
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

profileSchema.index({ user: 1 }, { unique: true });
profileSchema.index({ reputationScore: -1 });
profileSchema.index({ skills: 1 });
profileSchema.index({ "githubStats.topLanguages": 1 });
profileSchema.index({ startupInterests: 1 });

module.exports = mongoose.model("Profile", profileSchema);
