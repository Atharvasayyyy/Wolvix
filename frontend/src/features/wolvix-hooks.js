"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { aiApi, gamificationApi, ideaApi, jobsApi, launchApi, notificationApi, profileApi, projectApi } from "@/services/wolvix-api";

export const useIdeas = (params) => useQuery({ queryKey: ["ideas", params], queryFn: () => ideaApi.list(params) });
export const useTrendingIdeas = () => useQuery({ queryKey: ["ideas", "trending"], queryFn: ideaApi.trending });
export const useRecommendedIdeas = (params, options = {}) => useQuery({ queryKey: ["ideas", "recommended", params], queryFn: () => ideaApi.recommended(params), ...options });
export const useIdea = (slug) => useQuery({ queryKey: ["ideas", slug], queryFn: () => ideaApi.get(slug), enabled: Boolean(slug) });
export const useIdeaComments = (slug) => useQuery({ queryKey: ["ideas", slug, "comments"], queryFn: () => ideaApi.comments(slug), enabled: Boolean(slug) });

export function useCreateIdea() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => ideaApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ideas"] })
  });
}

export function useIdeaAction(slug, action) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => (action === "upvote" ? ideaApi.upvote(slug) : ideaApi.bookmark(slug)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ideas"] })
  });
}

export function useCreateIdeaComment(slug) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body) => ideaApi.comment(slug, body),
    onMutate: async (body) => {
      await queryClient.cancelQueries({ queryKey: ["ideas", slug, "comments"] });
      const previous = queryClient.getQueryData(["ideas", slug, "comments"]);
      queryClient.setQueryData(["ideas", slug, "comments"], (current) => ({
        ...(current || {}),
        comments: [{ _id: `optimistic-${Date.now()}`, body, pending: true }, ...(current?.comments || [])]
      }));
      return { previous };
    },
    onError: (_error, _body, context) => {
      if (context?.previous) queryClient.setQueryData(["ideas", slug, "comments"], context.previous);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ideas", slug, "comments"] })
  });
}

export function useIdeaCommentAction(slug, action) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, body }) => {
      if (action === "update") return ideaApi.updateComment(slug, commentId, body);
      if (action === "delete") return ideaApi.deleteComment(slug, commentId);
      return ideaApi.upvoteComment(slug, commentId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ideas", slug, "comments"] })
  });
}

export const useProfile = (username) => useQuery({ queryKey: ["profile", username], queryFn: () => profileApi.get(username), enabled: Boolean(username) });
export const useTeams = () => useQuery({ queryKey: ["teams"], queryFn: projectApi.list });
export const useTeam = (slug) => useQuery({ queryKey: ["teams", slug], queryFn: () => projectApi.get(slug), enabled: Boolean(slug) });

export function useCreateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => projectApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teams"] })
  });
}

export function useApplyToTeamRole(slug, roleId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => projectApi.apply(slug, roleId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["teams", slug] });
    }
  });
}

export function useDecideTeamApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ applicationId, status }) => projectApi.decideApplication(applicationId, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teams"] })
  });
}

export const useLeaderboard = () => useQuery({ queryKey: ["leaderboard"], queryFn: gamificationApi.leaderboard });
export const useBadges = () => useQuery({ queryKey: ["badges"], queryFn: gamificationApi.badges });
export const useNotifications = (options = {}) => useQuery({ queryKey: ["notifications"], queryFn: notificationApi.list, ...options });

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => notificationApi.markRead(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const previous = queryClient.getQueryData(["notifications"]);
      queryClient.setQueryData(["notifications"], (current) => ({
        ...(current || {}),
        notifications: (current?.notifications || []).map((item) => item._id === id ? { ...item, readAt: item.readAt || new Date().toISOString() } : item)
      }));
      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) queryClient.setQueryData(["notifications"], context.previous);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] })
  });
}

export const useLaunches = () => useQuery({ queryKey: ["launches"], queryFn: launchApi.list });
export const useLaunch = (slug) => useQuery({ queryKey: ["launches", slug], queryFn: () => launchApi.get(slug), enabled: Boolean(slug) });
export const useJobs = () => useQuery({ queryKey: ["jobs"], queryFn: jobsApi.list });
export const useJob = (slug) => useQuery({ queryKey: ["jobs", slug], queryFn: () => jobsApi.get(slug), enabled: Boolean(slug) });

export function useApplyToJob(slug) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => jobsApi.apply(slug, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs", slug] })
  });
}

export function useAiTool(tool) {
  return useMutation({
    mutationFn: (payload) => aiApi.runTool(tool, payload)
  });
}
