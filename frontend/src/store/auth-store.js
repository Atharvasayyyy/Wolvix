"use client";

import { create } from "zustand";
import { setSessionToken } from "@/services/api-client";

export const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  token: null,
  refreshToken: null,
  hydrated: false,
  setSession: ({ token, refreshToken, user, profile }) => {
    if (token) setSessionToken(token, refreshToken);
    set({ token: token || null, refreshToken: refreshToken || null, user: user ?? null, profile: profile ?? null, hydrated: true });
  },
  clearSession: () => {
    setSessionToken();
    set({ token: null, refreshToken: null, user: null, profile: null, hydrated: true });
  },
  hydrateFromStorage: () => {
    if (typeof window === "undefined") return;
    set({
      token: window.localStorage.getItem("wolvix_token"),
      refreshToken: window.localStorage.getItem("wolvix_refresh_token"),
      hydrated: true
    });
  }
}));
