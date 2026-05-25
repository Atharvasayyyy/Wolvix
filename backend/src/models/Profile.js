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

module.exports = mongoose.model("Profile", profileSchema);
