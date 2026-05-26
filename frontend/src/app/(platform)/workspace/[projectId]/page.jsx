"use client";

import { useParams } from "@/lib/router";
import { PageHeading } from "@/components/shared/page-heading";
import { Link } from "@/lib/router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTeam } from "@/features/wolvix-hooks";

export default function WorkspacePage() {
  const params = useParams();
  const projectId = params?.projectId ?? "";
  const team = useTeam(projectId);
  const board = ["Backlog", "Validation", "Build", "Launch"];

  return (
    <>
      <PageHeading eyebrow="Workspace" title={team.data?.team?.name || projectId} description="Roadmap, roles, applications, tasks, milestones, and realtime-ready collaboration surfaces." action={<Button asChild><Link href="/launches">Open launch board</Link></Button>} />
      {team.isLoading ? <p className="mb-4 text-sm text-white/48">Loading workspace...</p> : null}
      {team.error ? <p className="mb-4 text-sm text-rose">{team.error.message}</p> : null}
      <div className="grid gap-4 lg:grid-cols-4">
        {board.map((column) => (
          <Card key={column} className="min-h-72">
            <h2 className="font-display text-lg font-semibold">{column}</h2>
            <div className="mt-4 grid gap-3">
              {["Define owner", "Ship milestone", "Review signal"].map((task) => <div key={task} className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/62">{task}</div>)}
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-5">
        <h2 className="font-display text-xl font-semibold">Open roles</h2>
        <div className="mt-4 flex flex-wrap gap-2">{(team.data?.team?.openRoles || team.data?.team?.roles || [{ title: "Frontend builder" }, { title: "AI engineer" }, { title: "Growth lead" }]).map((role) => <Badge key={role.title}>{role.title}</Badge>)}</div>
      </Card>
    </>
  );
}
