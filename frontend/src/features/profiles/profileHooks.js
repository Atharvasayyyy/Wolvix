"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../../services";
import { queryKeys } from "../queryKeys";

export const useProfile = (username, enabled = Boolean(username)) =>
  useQuery({
    queryKey: queryKeys.profiles.detail(username),
    queryFn: () => profileService.getByUsername(username),
    enabled
  });

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => profileService.updateMe(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all });

      const user = typeof data.profile.user === "object" ? data.profile.user : data.user;
      if (user?.username) {
        queryClient.setQueryData(queryKeys.profiles.detail(user.username), data);
      }
    }
  });
};

export const useUploadProfileAssetMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, purpose }) => profileService.uploadAsset(file, purpose),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all });
    }
  });
};

export const useUploadResumeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file) => profileService.uploadResume(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all });
    }
  });
};
