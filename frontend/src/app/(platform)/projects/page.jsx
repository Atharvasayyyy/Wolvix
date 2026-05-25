"use client";

import Link from "next/link";
import { PageHeading } from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTeams } from "@/features/wolvix-hooks";

export default function ProjectsPage() {
  const teams = useTeams();
  return (
    <>
      <PageHeading eyebrow="Projects" title="Joined projects" description="Build With Me teams, active contributor applications, roles, milestones, and launch paths." action={<Button asChild><Link href="/teams">Find teams</Link></Button>} />
      <section className="grid gap-4 lg:grid-cols-2">
        {(teams.data?.teams || []).map((team) => (
          <Card key={team._id || team.slug}>
            <h2 className="font-display text-xl font-semibold">{team.name}</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">{team.description || team.tagline}</p>
            <div className="mt-4 flex gap-2"><Button asChild><Link href={`/workspace/${team.slug}`}>Open workspace</Link></Button><Button variant="secondary" asChild><Link href="/launches">Launch</Link></Button></div>
          </Card>
        ))}
      </section>
    </>
  );
}
