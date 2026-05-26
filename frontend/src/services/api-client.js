"use client";

import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const TOKEN_KEY = "wolvix_token";
export const REFRESH_TOKEN_KEY = "wolvix_refresh_token";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise = null;

const refreshAccessToken = async () => {
  if (typeof window === "undefined") return null;
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) return null;

  refreshPromise ??= axios
    .post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken })
    .then((response) => {
      const token = response.data?.token;
      const nextRefreshToken = response.data?.refreshToken;
      if (token) setSessionToken(token, nextRefreshToken);
      return token || null;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      const token = await refreshAccessToken();
      if (token) {
        original.headers = { ...original.headers, Authorization: `Bearer ${token}` };
        return apiClient.request(original);
      }
      setSessionToken();
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}`;
      }
    }

    const message = error.response?.data?.message || error.message || "Request failed";
    return Promise.reject(new Error(message));
  }
);

export const setSessionToken = (token, refreshToken) => {
  if (typeof window === "undefined") return;
  if (!token) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    document.cookie = "wvx_token=; Max-Age=0; path=/";
    return;
  }
  window.localStorage.setItem(TOKEN_KEY, token);
  if (refreshToken) window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  document.cookie = `wvx_token=${token}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
};

export const request = async (config) => {
  const response = await apiClient.request(config);
  return response.data;
};

export const getAuthToken = () => (typeof window === "undefined" ? null : window.localStorage.getItem(TOKEN_KEY));
export const clearAuthToken = () => setSessionToken();
export const setAuthToken = (token, refreshToken) => setSessionToken(token, refreshToken);
