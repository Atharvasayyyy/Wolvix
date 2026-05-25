"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PageHeading } from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { useCreateIdea } from "@/features/wolvix-hooks";

const schema = z.object({
  title: z.string().min(4),
  summary: z.string().min(12).max(300),
  problem: z.string().min(12),
  solution: z.string().min(12),
  market: z.string().optional(),
  stage: z.enum(["idea", "prototype", "mvp", "launched", "scaling"]),
  category: z.string().min(2),
  tags: z.string(),
  collaborationNeeds: z.string()
});

export default function CreateIdeaPage() {
  const router = useRouter();
  const createIdea = useCreateIdea();
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { title: "", summary: "", problem: "", solution: "", market: "", stage: "idea", category: "", tags: "", collaborationNeeds: "" } });

  return (
    <>
      <PageHeading eyebrow="Publish" title="Create an idea" description="Capture the problem, solution, market, and collaboration needs so builders can discover and join the mission." />
      <Card>
        <form className="grid gap-4" onSubmit={form.handleSubmit((values) => createIdea.mutate({ ...values, tags: values.tags.split(",").map((tag) => tag.trim()).filter(Boolean), collaborationNeeds: values.collaborationNeeds.split(",").map((need) => need.trim()).filter(Boolean) }, { onSuccess: (data) => router.push(`/ideas/${data.idea.slug}`) }))}>
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Title" {...form.register("title")} />
            <Input placeholder="Category" {...form.register("category")} />
          </div>
          <Textarea placeholder="Summary" {...form.register("summary")} />
          <div className="grid gap-4 md:grid-cols-2">
            <Textarea placeholder="Problem" {...form.register("problem")} />
            <Textarea placeholder="Solution" {...form.register("solution")} />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Input placeholder="Market" {...form.register("market")} />
            <select className="focus-ring h-11 rounded-lg border border-white/12 bg-black/24 px-3 text-sm text-white" {...form.register("stage")}>
              {["idea", "prototype", "mvp", "launched", "scaling"].map((stage) => <option key={stage}>{stage}</option>)}
            </select>
            <Input placeholder="Tags, comma separated" {...form.register("tags")} />
          </div>
          <Input placeholder="Collaboration needs, comma separated" {...form.register("collaborationNeeds")} />
          {createIdea.error ? <p className="text-sm text-rose">{createIdea.error.message}</p> : null}
          <Button disabled={createIdea.isPending}>{createIdea.isPending ? "Publishing..." : "Publish idea"}</Button>
        </form>
      </Card>
    </>
  );
}
