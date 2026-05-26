"use client";

import { useEffect } from "react";
import { useNotifications } from "@/features/wolvix-hooks";
import { useAuthStore } from "@/store/auth-store";
import { useNotificationStore } from "@/store/notification-store";

export function RealtimeProvider({ children }) {
  const token = useAuthStore((state) => state.token);
  const syncNotifications = useNotificationStore((state) => state.syncNotifications);
  const setRealtimeConnected = useNotificationStore((state) => state.setRealtimeConnected);
  const notifications = useNotifications({
    enabled: Boolean(token),
    refetchInterval: token ? 30_000 : false
  });

  useEffect(() => {
    setRealtimeConnected(Boolean(token));
  }, [setRealtimeConnected, token]);

  useEffect(() => {
    if (notifications.data?.notifications) syncNotifications(notifications.data.notifications);
  }, [notifications.data, syncNotifications]);

  return children;
}
