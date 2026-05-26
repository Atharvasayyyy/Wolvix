"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useMe } from "@/features/auth/hooks";
import { RealtimeProvider } from "@/providers/realtime-provider";

function SessionBootstrap() {
  const { token, hydrateFromStorage, setSession } = useAuthStore();
  const me = useMe(Boolean(token));

  useEffect(() => hydrateFromStorage(), [hydrateFromStorage]);
  useEffect(() => {
    if (me.data) setSession({ user: me.data.user, profile: me.data.profile, token: token || undefined });
  }, [me.data, setSession, token]);

  return null;
}

export function AppProviders({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 30_000,
            refetchOnWindowFocus: false
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionBootstrap />
      <RealtimeProvider>{children}</RealtimeProvider>
    </QueryClientProvider>
  );
}
