require("dotenv").config();

const connectDB = require("../config/db");
const Badge = require("../models/Badge");
const Idea = require("../models/Idea");
const Profile = require("../models/Profile");
const User = require("../models/User");

const seed = async () => {
  await connectDB();

  await Badge.deleteMany({});
  await Badge.insertMany([
    { code: "first-idea", name: "First Spark", description: "Published the first idea.", rarity: "common", points: 25 },
    { code: "team-builder", name: "Team Builder", description: "Created a team and opened roles.", rarity: "rare", points: 50 },
    { code: "collaborator", name: "Collaborator", description: "Helped another builder improve an idea.", rarity: "common", points: 20 }
  ]);

  let user = await User.findOne({ email: "founder@wolvix.dev" });
  if (!user) {
    user = await User.create({
      name: "Wolvix Founder",
      username: "wolvixfounder",
      email: "founder@wolvix.dev",
      password: "Password123",
      role: "admin",
      emailVerified: true
    });
  }

  await Profile.findOneAndUpdate(
    { user: user._id },
    {
      bio: "Building Wolvix for founders, makers, designers, marketers, and developers.",
      skills: ["Node.js", "React", "MongoDB", "Product Strategy"],
      reputationScore: 100,
      socialLinks: {
        github: "https://github.com/wolvix",
        linkedin: "https://linkedin.com/company/wolvix",
        portfolio: "https://wolvix.dev"
      }
    },
    { upsert: true }
  );

  await Idea.findOneAndUpdate(
    { slug: "ai-startup-matchmaking" },
    {
      author: user._id,
      title: "AI Startup Matchmaking",
      slug: "ai-startup-matchmaking",
      summary: "A matching system for founders and builders based on reputation and skills.",
      problem: "Early-stage builders struggle to find trusted collaborators.",
      solution: "Use profile signals, contribution history, and team needs to recommend collaborators.",
      category: "community",
      tags: ["startups", "collaboration", "matching"],
      collaborationNeeds: ["Frontend developer", "Product designer", "Growth marketer"]
    },
    { upsert: true }
  );

  console.log("Seed complete");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
