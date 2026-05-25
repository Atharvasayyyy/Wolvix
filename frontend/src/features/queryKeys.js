export const queryKeys = {
  auth: {
    all: ["auth"],
    me: ["auth", "me"]
  },
  profiles: {
    all: ["profiles"],
    detail: (username) => ["profiles", username]
  },
  ideas: {
    all: ["ideas"],
    lists: () => ["ideas", "list"],
    list: (params) => ["ideas", "list", params ?? {}],
    trending: ["ideas", "trending"],
    detail: (slug) => ["ideas", slug],
    comments: (slug) => ["ideas", slug, "comments"]
  },
  projects: {
    all: ["projects"],
    list: (params) => ["projects", "list", params ?? {}],
    detail: (slug) => ["projects", slug]
  },
  gamification: {
    all: ["gamification"],
    badges: ["gamification", "badges"],
    leaderboard: ["gamification", "leaderboard"]
  },
  notifications: {
    all: ["notifications"],
    list: ["notifications", "list"]
  },
  launches: {
    all: ["launches"],
    list: (params) => ["launches", "list", params ?? {}],
    detail: (slug) => ["launches", slug]
  },
  jobs: {
    all: ["jobs"],
    list: (params) => ["jobs", "list", params ?? {}],
    detail: (slug) => ["jobs", slug]
  },
  aiTools: {
    all: ["aiTools"],
    list: ["aiTools", "list"],
    detail: (toolId) => ["aiTools", toolId]
  }
};
