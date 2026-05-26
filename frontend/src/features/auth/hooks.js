"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "@/lib/router";
import { authApi } from "@/services/wolvix-api";
import { useAuthStore } from "@/store/auth-store";

export const useMe = (enabled = true) =>
  useQuery({
    queryKey: ["auth", "me"],
    queryFn: authApi.me,
    enabled
  });

export function useLogin() {
  const router = useRouter();
  const search = useSearchParams();
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (payload) => authApi.login(payload),
    onSuccess: (data) => {
      setSession({ token: data.token, refreshToken: data.refreshToken, user: data.user });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push(search?.get("next") || "/dashboard");
    }
  });
}

export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (payload) => authApi.register(payload),
    onSuccess: (data) => {
      setSession({ token: data.token, refreshToken: data.refreshToken, user: data.user });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push("/dashboard");
    }
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearSession = useAuthStore((state) => state.clearSession);

  return async () => {
    try {
      await authApi.logout();
    } catch {
      // Local session cleanup should still happen if the backend session has already expired.
    }
    clearSession();
    queryClient.clear();
    router.push("/");
  };
}
