"use client";

import { PageHeading } from "@/components/shared/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useBadges } from "@/features/wolvix-hooks";

export default function AchievementsPage() {
  const badges = useBadges();
  return (
    <>
      <PageHeading eyebrow="Ranks" title="Achievements" description="Cub, Hunter, Alpha, and Legend progression powered by badges, medals, streaks, and reputation events." />
      {badges.isLoading ? <p className="text-sm text-white/48">Loading badges...</p> : null}
      {badges.error ? <p className="text-sm text-rose">{badges.error.message}</p> : null}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(badges.data?.badges || []).map((badge) => <Card key={badge._id || badge.code}><Badge>{badge.rarity || "badge"}</Badge><h2 className="mt-4 font-display text-xl font-semibold">{badge.name}</h2><p className="mt-2 text-sm leading-6 text-white/58">{badge.description}</p></Card>)}
      </section>
    </>
  );
}
