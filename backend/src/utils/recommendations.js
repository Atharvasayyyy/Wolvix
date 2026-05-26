const normalize = (value) => String(value || "").trim().toLowerCase();

const unique = (values) => [...new Set(values.map(normalize).filter(Boolean))];

const profileSignals = (profile = {}) => unique([
  ...(profile.skills || []),
  ...(profile.githubStats?.topLanguages || []),
  ...(profile.leetcodeStats?.skillTags || []),
  ...(profile.startupInterests || [])
]);

const ideaSignals = (idea = {}) => unique([
  idea.category,
  idea.stage,
  ...(idea.tags || []),
  ...(idea.collaborationNeeds || [])
]);

const matchingScore = (userSignals, itemSignals) => {
  if (!userSignals.length || !itemSignals.length) return 0;
  const matches = itemSignals.filter((signal) => userSignals.includes(signal));
  return Math.round((matches.length / Math.max(itemSignals.length, 1)) * 100);
};

const freshnessScore = (date, halfLifeDays = 14) => {
  const ageMs = Date.now() - new Date(date || Date.now()).getTime();
  const ageDays = Math.max(ageMs / 86400000, 0);
  return Math.exp(-ageDays / halfLifeDays);
};

module.exports = {
  freshnessScore,
  ideaSignals,
  matchingScore,
  profileSignals
};
