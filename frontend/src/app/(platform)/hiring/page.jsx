"use client";

import Link from "next/link";
import { PageHeading } from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useJobs } from "@/features/wolvix-hooks";

export default function HiringPage() {
  const jobs = useJobs();

  return (
    <>
      <PageHeading eyebrow="Hiring" title="Startup hiring" description="Internships, contributor applications, and cofounder matching connected to Wolvix project history." />
      <section className="grid gap-4 lg:grid-cols-3">
        {jobs.data?.jobs.map((job) => (
          <Card key={job._id || job.slug || job.id}>
            <p className="text-xs font-bold uppercase text-cyan">{job.type}</p>
            <h2 className="mt-3 font-display text-xl font-semibold">{job.title}</h2>
            <p className="mt-2 text-sm text-white/58">
              {job.company} - {job.location}
            </p>
            <Button className="mt-5" asChild>
              <Link href={`/jobs/${job.slug || job._id || job.id}`}>View role</Link>
            </Button>
          </Card>
        ))}
      </section>
    </>
  );
}
