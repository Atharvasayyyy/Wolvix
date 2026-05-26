"use client";

import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  connected: false,
  unreadCount: 0,
  latest: [],
  setRealtimeConnected: (connected) => set({ connected }),
  syncNotifications: (notifications = []) =>
    set({
      latest: notifications.slice(0, 10),
      unreadCount: notifications.filter((item) => !item.readAt).length
    }),
  pushNotification: (notification) =>
    set((state) => {
      const latest = [notification, ...state.latest].slice(0, 10);
      return {
        latest,
        unreadCount: latest.filter((item) => !item.readAt).length
      };
    }),
  markReadLocal: (id) =>
    set((state) => {
      const latest = state.latest.map((item) => item._id === id ? { ...item, readAt: item.readAt || new Date().toISOString() } : item);
      return {
        latest,
        unreadCount: latest.filter((item) => !item.readAt).length
      };
    })
}));
