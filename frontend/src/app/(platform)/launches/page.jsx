"use client";

import Link from "next/link";
import { PageHeading } from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLaunches } from "@/features/wolvix-hooks";

export default function LaunchesPage() {
  const launches = useLaunches();

  return (
    <>
      <PageHeading eyebrow="Product showcase" title="Startup launches" description="Demo videos, screenshots, changelogs, reviews, and launch upvotes live in this showcase surface." />
      <section className="grid gap-4 lg:grid-cols-3">
        {launches.data?.launches.map((launch) => (
          <Card key={launch._id || launch.slug || launch.id}>
            <p className="text-xs font-bold uppercase text-cyan">{launch.category}</p>
            <h2 className="mt-3 font-display text-xl font-semibold">{launch.title}</h2>
            <p className="mt-2 min-h-16 text-sm leading-6 text-white/58">{launch.tagline}</p>
            <Button className="mt-5" asChild>
              <Link href={`/launches/${launch.slug || launch._id || launch.id}`}>Open launch</Link>
            </Button>
          </Card>
        ))}
      </section>
    </>
  );
}
