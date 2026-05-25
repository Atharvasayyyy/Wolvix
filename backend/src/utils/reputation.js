const Profile = require("../models/Profile");
const Reputation = require("../models/Reputation");
const Streak = require("../models/Streak");

const points = {
  idea_created: 20,
  idea_upvoted: 5,
  comment_created: 3,
  comment_upvoted: 2,
  role_accepted: 25,
  resume_uploaded: 15,
  badge_earned: 10
};

const awardPoints = async (userId, action, sourceType, sourceId) => {
  const value = points[action] || 0;
  if (!value) return null;

  const entry = await Reputation.create({ user: userId, action, points: value, sourceType, sourceId });
  await Profile.findOneAndUpdate({ user: userId }, { $inc: { reputationScore: value } }, { upsert: true });
  return entry;
};

const updateStreak = async (userId, action) => {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const yesterday = new Date(startOfToday);
  yesterday.setDate(yesterday.getDate() - 1);

  let streak = await Streak.findOne({ user: userId });
  if (!streak) {
    streak = await Streak.create({
      user: userId,
      current: 1,
      longest: 1,
      lastActivityDate: today,
      history: [{ date: today, action }]
    });
    await Profile.findOneAndUpdate({ user: userId }, { streak: streak._id }, { upsert: true });
    return streak;
  }

  const last = streak.lastActivityDate ? new Date(streak.lastActivityDate) : null;
  const lastDay = last ? new Date(last.getFullYear(), last.getMonth(), last.getDate()) : null;

  if (lastDay && lastDay.getTime() === startOfToday.getTime()) {
    streak.history.push({ date: today, action });
  } else if (lastDay && lastDay.getTime() === yesterday.getTime()) {
    streak.current += 1;
    streak.longest = Math.max(streak.longest, streak.current);
    streak.lastActivityDate = today;
    streak.history.push({ date: today, action });
  } else {
    streak.current = 1;
    streak.lastActivityDate = today;
    streak.history.push({ date: today, action });
  }

  await streak.save();
  return streak;
};

module.exports = { awardPoints, updateStreak };
