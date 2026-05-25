import { apiClient } from "@/services/api-client";

const unwrap = (promise) => promise.then((response) => response.data);

export const authApi = {
  login: (payload) => unwrap(apiClient.post("/auth/login", payload)),
  register: (payload) => unwrap(apiClient.post("/auth/register", payload)),
  me: () => unwrap(apiClient.get("/auth/me")),
  logout: () => unwrap(apiClient.post("/auth/logout")),
  refreshToken: (refreshToken) => unwrap(apiClient.post("/auth/refresh-token", { refreshToken }))
};

export const profileApi = {
  get: (username) => unwrap(apiClient.get(`/profiles/${username}`)),
  update: (payload) => unwrap(apiClient.patch("/profiles/me/update", payload)),
  uploadAvatar: (file) => uploadAsset(file, "profile_photo"),
  uploadCover: (file) => uploadAsset(file, "cover_image"),
  uploadResume: (file) => {
    const form = new FormData();
    form.append("resume", file);
    return unwrap(apiClient.post("/uploads/resume", form, { headers: { "Content-Type": "multipart/form-data" } }));
  }
};

export const ideaApi = {
  list: (params) => unwrap(apiClient.get("/ideas", { params })),
  trending: () => unwrap(apiClient.get("/ideas/trending")),
  create: (payload) => unwrap(apiClient.post("/ideas", payload)),
  get: (slug) => unwrap(apiClient.get(`/ideas/${slug}`)),
  update: (slug, payload) => unwrap(apiClient.patch(`/ideas/${slug}`, payload)),
  delete: (slug) => unwrap(apiClient.delete(`/ideas/${slug}`)),
  upvote: (slug) => unwrap(apiClient.post(`/ideas/${slug}/upvote`)),
  bookmark: (slug) => unwrap(apiClient.post(`/ideas/${slug}/bookmark`)),
  comments: (slug) => unwrap(apiClient.get(`/ideas/${slug}/comments`)),
  comment: (slug, body) => unwrap(apiClient.post(`/ideas/${slug}/comments`, { body })),
  updateComment: (slug, commentId, body) => unwrap(apiClient.patch(`/ideas/${slug}/comments/${commentId}`, { body })),
  deleteComment: (slug, commentId) => unwrap(apiClient.delete(`/ideas/${slug}/comments/${commentId}`)),
  upvoteComment: (slug, commentId) => unwrap(apiClient.post(`/ideas/${slug}/comments/${commentId}/upvote`))
};

export const projectApi = {
  list: () => unwrap(apiClient.get("/teams")),
  create: (payload) => unwrap(apiClient.post("/teams", payload)),
  get: (slug) => unwrap(apiClient.get(`/teams/${slug}`)),
  addRole: (slug, payload) => unwrap(apiClient.post(`/teams/${slug}/roles`, payload)),
  apply: (slug, roleId, payload) => unwrap(apiClient.post(`/teams/${slug}/roles/${roleId}/apply`, payload)),
  decideApplication: (applicationId, payload) => unwrap(apiClient.patch(`/teams/applications/${applicationId}`, payload))
};

export const gamificationApi = {
  badges: () => unwrap(apiClient.get("/badges")),
  leaderboard: () => unwrap(apiClient.get("/badges/leaderboard")),
  reputation: () => unwrap(apiClient.get("/auth/me"))
};

export const notificationApi = {
  list: () => unwrap(apiClient.get("/notifications")),
  markRead: (id) => unwrap(apiClient.patch(`/notifications/${id}/read`))
};

export const launchApi = {
  list: () => unwrap(apiClient.get("/launches")),
  get: (slug) => unwrap(apiClient.get(`/launches/${slug}`)),
  create: (payload) => unwrap(apiClient.post("/launches", payload)),
  update: (slug, payload) => unwrap(apiClient.patch(`/launches/${slug}`, payload)),
  delete: (slug) => unwrap(apiClient.delete(`/launches/${slug}`)),
  upvote: (slug) => unwrap(apiClient.post(`/launches/${slug}/upvote`)),
  bookmark: (slug) => unwrap(apiClient.post(`/launches/${slug}/bookmark`))
};

export const jobsApi = {
  list: () => unwrap(apiClient.get("/jobs")),
  get: (slug) => unwrap(apiClient.get(`/jobs/${slug}`)),
  create: (payload) => unwrap(apiClient.post("/jobs", payload)),
  update: (slug, payload) => unwrap(apiClient.patch(`/jobs/${slug}`, payload)),
  delete: (slug) => unwrap(apiClient.delete(`/jobs/${slug}`)),
  apply: (slug, payload) => unwrap(apiClient.post(`/jobs/${slug}/apply`, payload))
};

export const aiApi = {
  runTool: (tool, payload) => unwrap(apiClient.post(`/ai/tools/${tool}/run`, payload)),
  generateIdea: (payload) => unwrap(apiClient.post("/ai/ideas/generate", payload)),
  scoreIdea: (payload) => unwrap(apiClient.post("/ai/ideas/score", payload)),
  matchCollaborators: (payload) => unwrap(apiClient.post("/ai/matches", payload))
};

function uploadAsset(file, purpose) {
  const form = new FormData();
  form.append("file", file);
  form.append("purpose", purpose);
  return unwrap(apiClient.post("/uploads/asset", form, { headers: { "Content-Type": "multipart/form-data" } }));
}
