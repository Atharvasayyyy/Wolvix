"use client";

import { Link } from "@/lib/router";
import { useParams } from "@/lib/router";
import { PageHeading } from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLaunch } from "@/features/wolvix-hooks";

export default function LaunchDetailPage() {
  const params = useParams();
  const id = params?.id ?? "";
  const launch = useLaunch(id);
  const item = launch.data?.launch;
  return (
    <>
      <PageHeading eyebrow="Launch" title={item?.title || id} description={item?.tagline || "Product launch detail with reviews, changelog, media, and upvotes."} action={<Button asChild><Link href="/hiring">Open hiring</Link></Button>} />
      {launch.isLoading ? <p className="mb-4 text-sm text-white/48">Loading launch...</p> : null}
      {launch.error ? <p className="mb-4 text-sm text-rose">{launch.error.message}</p> : null}
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Card className="min-h-80"><h2 className="font-display text-xl font-semibold">Demo theater</h2><div className="mt-5 grid aspect-video place-items-center rounded-lg border border-white/10 bg-black/30 text-white/42">Video and screenshots</div></Card>
        <Card><h2 className="font-display text-xl font-semibold">Changelog</h2><div className="mt-4 grid gap-3 text-sm text-white/58"><p>v0.3 Public beta launch</p><p>v0.2 Founder onboarding</p><p>v0.1 Prototype shipped</p></div></Card>
      </div>
    </>
  );
}
