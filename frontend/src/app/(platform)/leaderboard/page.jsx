"use client";

import Link from "next/link";
import { PageHeading } from "@/components/shared/page-heading";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { rankFromReputation } from "@/lib/utils";
import { useLeaderboard } from "@/features/wolvix-hooks";

export default function LeaderboardPage() {
  const leaderboard = useLeaderboard();

  return (
    <>
      <PageHeading eyebrow="Gamification" title="Builder leaderboard" description="XP, badges, streaks, and ranks highlight the most trusted startup collaborators." />
      <Card className="grid gap-3">
        {(leaderboard.data?.profiles || []).map((profile, index) => {
          const username = profile.user?.username || profile.user?._id || profile._id;
          return (
            <Link href={`/profile/${username}`} key={profile._id || index} className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-3">
              <span className="w-8 text-center font-display text-xl text-cyan">#{index + 1}</span>
              <Avatar name={profile.user?.name || "Builder"} />
              <div className="min-w-0 flex-1">
                <strong>{profile.user?.name || "Builder"}</strong>
                <p className="text-sm text-white/48">@{profile.user?.username || "wolvix"}</p>
              </div>
              <span className="text-sm text-white/58">{rankFromReputation(profile.reputationScore)} - {profile.reputationScore || 0} XP</span>
            </Link>
          );
        })}
      </Card>
    </>
  );
}
