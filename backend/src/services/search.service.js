const Idea = require("../models/Idea");
const Job = require("../models/Job");
const Launch = require("../models/Launch");
const Profile = require("../models/Profile");
const Team = require("../models/Team");
const User = require("../models/User");

const textRegex = (q) => new RegExp(String(q || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

const globalSearch = async ({ q, type = "all", limit = 8 }) => {
  const regex = textRegex(q);
  const searches = [];

  if (type === "all" || type === "ideas") {
    searches.push(Idea.find({ status: "published", $or: [{ title: regex }, { summary: regex }, { category: regex }, { tags: regex }] }).limit(limit).lean().then((items) => ({ type: "ideas", items })));
  }
  if (type === "all" || type === "projects") {
    searches.push(Team.find({ status: { $ne: "archived" }, $or: [{ name: regex }, { description: regex }, { "openRoles.skills": regex }] }).limit(limit).lean().then((items) => ({ type: "projects", items })));
  }
  if (type === "all" || type === "launches") {
    searches.push(Launch.find({ status: "published", $or: [{ title: regex }, { tagline: regex }, { category: regex }] }).limit(limit).lean().then((items) => ({ type: "launches", items })));
  }
  if (type === "all" || type === "jobs") {
    searches.push(Job.find({ status: "open", $or: [{ title: regex }, { company: regex }, { tags: regex }, { description: regex }] }).limit(limit).lean().then((items) => ({ type: "jobs", items })));
  }
  if (type === "all" || type === "users") {
    searches.push(
      Promise.all([
        User.find({ isActive: true, $or: [{ name: regex }, { username: regex }] }).select("name username").limit(limit).lean(),
        Profile.find({ $or: [{ skills: regex }, { startupInterests: regex }, { "githubStats.topLanguages": regex }] }).populate("user", "name username").limit(limit).lean()
      ]).then(([users, profiles]) => ({ type: "users", items: [...users, ...profiles.map((profile) => ({ ...profile.user, profile }))].slice(0, limit) }))
    );
  }

  const groups = await Promise.all(searches);
  return groups.reduce((result, group) => {
    result[group.type] = group.items;
    return result;
  }, {});
};

module.exports = { globalSearch };
