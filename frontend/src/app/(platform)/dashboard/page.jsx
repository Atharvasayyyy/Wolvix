"use client";

import { Link } from "@/lib/router";
import { Rocket } from "lucide-react";
import { PageHeading } from "@/components/shared/page-heading";
import { IdeaCard } from "@/components/shared/idea-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import { useIdeas, useLeaderboard, useNotifications, useTeams } from "@/features/wolvix-hooks";
import { useAuthStore } from "@/store/auth-store";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const ideas = useIdeas({ limit: 3 });
  const teams = useTeams();
  const leaderboard = useLeaderboard();
  const notifications = useNotifications();

  return (
    <>
      <PageHeading
        eyebrow="Command center"
        title={`Welcome${user?.name ? `, ${user.name.split(" ")[0]}` : ""}`}
        description="Track ideas, joined projects, reputation, notifications, and next launch moves from one connected workspace."
        action={<Button asChild><Link href="/ideas/create">Create idea</Link></Button>}
      />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Ideas" value={ideas.data?.total || ideas.data?.ideas?.length || 0} detail="Published opportunities" />
        <StatCard label="Projects" value={teams.data?.teams?.length || 0} detail="Build With Me rooms" />
        <StatCard label="Leaderboard" value={leaderboard.data?.profiles?.length || 0} detail="Ranked builders" />
        <StatCard label="Unread" value={notifications.data?.notifications?.filter((item) => !item.readAt).length || 0} detail="Notifications" />
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
        <section className="grid gap-4">
          {ideas.isLoading ? [1, 2, 3].map((item) => <Skeleton key={item} className="h-48" />) : ideas.data?.ideas?.map((idea) => <IdeaCard key={idea._id || idea.slug} idea={idea} />)}
        </section>
        <Card>
          <Rocket className="mb-4 h-6 w-6 text-cyan" />
          <h2 className="font-display text-xl font-semibold">Internal flow</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/58">
            {[
              ["/ideas", "Explore Ideas"],
              [ideas.data?.ideas?.[0]?.slug ? `/ideas/${ideas.data.ideas[0].slug}` : "/ideas", "Open Idea Details"],
              ["/teams", "Build With Me"],
              [teams.data?.teams?.[0]?.slug ? `/workspace/${teams.data.teams[0].slug}` : "/projects", "Workspace"],
              ["/launches", "Launch"],
              ["/hiring", "Hiring"]
            ].map(([href, step]) => (
              <Link key={step} href={href} className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 transition hover:border-cyan/30 hover:text-cyan">{step}</Link>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
