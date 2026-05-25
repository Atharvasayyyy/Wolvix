"use client";

import { useState } from "react";
import { PageHeading } from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { useAiTool } from "@/features/wolvix-hooks";

const tools = ["validate", "roadmap", "marketing", "architecture"];

export default function AiToolsPage() {
  const [active, setActive] = useState("validate");
  const [prompt, setPrompt] = useState("");
  const ai = useAiTool(active);
  return (
    <>
      <PageHeading eyebrow="AI lab" title="Startup AI tools" description="Validator, roadmap generator, marketing generator, and architecture generator wired to AI endpoints with graceful local continuity." />
      <div className="mb-4 flex flex-wrap gap-2">{tools.map((tool) => <Button key={tool} variant={active === tool ? "primary" : "secondary"} onClick={() => setActive(tool)}>{tool}</Button>)}</div>
      <Card>
        <Textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Describe your startup idea, market, or architecture question..." />
        <Button className="mt-4" onClick={() => ai.mutate({ prompt })}>{ai.isPending ? "Generating..." : "Generate"}</Button>
        {ai.data ? <pre className="mt-5 overflow-auto rounded-lg border border-white/10 bg-black/30 p-4 text-xs text-white/64">{JSON.stringify(ai.data, null, 2)}</pre> : null}
      </Card>
    </>
  );
}
