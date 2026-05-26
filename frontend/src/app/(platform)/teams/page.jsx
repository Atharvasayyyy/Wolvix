"use client";

import { Link } from "@/lib/router";
import { useState } from "react";
import { PageHeading } from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useApplyToTeamRole, useCreateTeam, useTeams } from "@/features/wolvix-hooks";

function ApplyButton({ slug, roleId }) {
  const apply = useApplyToTeamRole(slug, roleId || "");

  if (!roleId) return null;

  return (
    <Button
      size="sm"
      variant="secondary"
      disabled={apply.isPending}
      onClick={() => apply.mutate({ message: "I want to contribute to this project from Wolvix.", portfolioLinks: [] })}
    >
      {apply.isPending ? "Applying..." : apply.isSuccess ? "Applied" : "Apply"}
    </Button>
  );
}

export default function TeamsPage() {
  const teams = useTeams();
  const createTeam = useCreateTeam();
  const [form, setForm] = useState({ name: "", description: "", role: "" });

  return (
    <>
      <PageHeading eyebrow="Build With Me" title="Team marketplace" description="Apply to roles, recruit specialists, and organize contributor energy around startup missions." />
      <div className="grid gap-5 lg:grid-cols-[380px_minmax(0,1fr)]">
        <Card>
          <h2 className="font-display text-xl font-semibold">Create project room</h2>
          <form
            className="mt-5 grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              createTeam.mutate(
                {
                  name: form.name,
                  description: form.description,
                  openRoles: form.role
                    ? [{ title: form.role, category: "developer", description: `Open role for ${form.role}`, skills: [] }]
                    : []
                },
                { onSuccess: () => setForm({ name: "", description: "", role: "" }) }
              );
            }}
          >
            <Input placeholder="Project name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            <Textarea placeholder="Mission and traction" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
            <Input placeholder="First open role" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} />
            <Button disabled={createTeam.isPending}>{createTeam.isPending ? "Creating..." : "Create team"}</Button>
            {createTeam.error ? <p className="text-sm text-rose">{createTeam.error.message}</p> : null}
          </form>
        </Card>
        <section className="grid gap-4 lg:grid-cols-2">
          {teams.isLoading ? <Card className="text-sm text-white/48">Loading teams...</Card> : null}
          {teams.error ? <Card className="text-sm text-rose">{teams.error.message}</Card> : null}
          {(teams.data?.teams || []).map((team) => (
            <Card key={team._id || team.slug}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-semibold">{team.name}</h2>
                  <p className="mt-2 min-h-16 text-sm leading-6 text-white/58">{team.description || team.tagline || "Open roles for builders, designers, and growth operators."}</p>
                </div>
                <Badge>{team.status || "forming"}</Badge>
              </div>
              <div className="mt-4 grid gap-2">
                {(team.openRoles || team.roles || []).slice(0, 3).map((role) => (
                  <div key={role._id || role.title} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-sm text-white/70">{role.title}</span>
                    <ApplyButton slug={team.slug} roleId={role._id} />
                  </div>
                ))}
              </div>
              <Button className="mt-5" asChild>
                <Link href={`/workspace/${team.slug}`}>Open workspace</Link>
              </Button>
            </Card>
          ))}
        </section>
      </div>
    </>
  );
}
