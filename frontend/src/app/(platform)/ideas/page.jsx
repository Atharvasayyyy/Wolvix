"use client";

import { Link } from "@/lib/router";
import { PageHeading } from "@/components/shared/page-heading";
import { IdeaCard } from "@/components/shared/idea-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useIdeas, useTrendingIdeas } from "@/features/wolvix-hooks";

export default function IdeasPage() {
  const ideas = useIdeas();
  const trending = useTrendingIdeas();

  return (
    <>
      <PageHeading eyebrow="Idea exchange" title="Explore ideas" description="Discover startup concepts, find collaborators, upvote promising bets, and move directly into Build With Me workspaces." action={<Button asChild><Link href="/ideas/create">Publish idea</Link></Button>} />
      <div className="mb-6 flex flex-wrap gap-2 text-sm text-white/56">
        {(trending.data?.ideas || []).slice(0, 6).map((idea) => <Link key={idea.slug} href={`/ideas/${idea.slug}`} className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 text-cyan">{idea.title}</Link>)}
      </div>
      {ideas.error ? <p className="mb-4 text-sm text-rose">{ideas.error.message}</p> : null}
      <section className="grid gap-4 lg:grid-cols-2">
        {ideas.isLoading ? [1, 2, 3, 4].map((item) => <Skeleton key={item} className="h-52" />) : ideas.data?.ideas?.length ? ideas.data.ideas.map((idea) => <IdeaCard key={idea._id || idea.slug} idea={idea} />) : <div className="lg:col-span-2"><EmptyState title="No ideas yet" description="Seed the network by publishing the first high-signal startup idea." action={<Button asChild><Link href="/ideas/create">Create idea</Link></Button>} /></div>}
      </section>
    </>
  );
}
