"use client";

import Link from "next/link";
import { PageHeading } from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMarkNotificationRead, useNotifications } from "@/features/wolvix-hooks";

export default function NotificationsPage() {
  const notifications = useNotifications();
  const markRead = useMarkNotificationRead();
  return (
    <>
      <PageHeading eyebrow="Realtime ready" title="Notifications" description="Mentions, applications, upvotes, comments, and future Socket.IO events surface here." />
      <Card className="grid gap-3">
        {(notifications.data?.notifications || []).map((item) => (
          <div key={item._id} className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/5 p-3 sm:flex-row sm:items-center">
            <div className="flex-1"><strong>{item.title || "Wolvix activity"}</strong><p className="text-sm text-white/56">{item.message}</p></div>
            <div className="flex gap-2">{item.link ? <Button variant="secondary" size="sm" asChild><Link href={item.link}>Open</Link></Button> : null}<Button size="sm" onClick={() => markRead.mutate(item._id)}>Read</Button></div>
          </div>
        ))}
      </Card>
    </>
  );
}
