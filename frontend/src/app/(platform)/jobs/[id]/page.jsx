"use client";

import { useParams } from "@/lib/router";
import { useState } from "react";
import { PageHeading } from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { useApplyToJob, useJob } from "@/features/wolvix-hooks";

export default function JobDetailPage() {
  const params = useParams();
  const id = params?.id ?? "";
  const jobQuery = useJob(id);
  const apply = useApplyToJob(id);
  const job = jobQuery.data?.job;
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <PageHeading eyebrow="Role" title={job?.title || id} description={job ? `${job.company} - ${job.location}` : "Contributor application detail."} />
      {jobQuery.isLoading ? <p className="mb-4 text-sm text-white/48">Loading role...</p> : null}
      {jobQuery.error ? <p className="mb-4 text-sm text-rose">{jobQuery.error.message}</p> : null}
      <Card>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            apply.mutate({ portfolioUrl, message });
          }}
        >
          <Input placeholder="Portfolio or GitHub URL" value={portfolioUrl} onChange={(event) => setPortfolioUrl(event.target.value)} />
          <Textarea placeholder="Why are you a strong fit?" value={message} onChange={(event) => setMessage(event.target.value)} />
          <Button disabled={apply.isPending}>{apply.isPending ? "Applying..." : "Apply"}</Button>
          {apply.isSuccess ? <p className="text-sm text-emerald-300">Application submitted.</p> : null}
          {apply.error ? <p className="text-sm text-red-300">{apply.error.message}</p> : null}
        </form>
      </Card>
    </>
  );
}
