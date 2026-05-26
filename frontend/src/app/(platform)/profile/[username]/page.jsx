"use client";

import { useParams } from "@/lib/router";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { PageHeading } from "@/components/shared/page-heading";
import { rankFromReputation } from "@/lib/utils";
import { useProfile } from "@/features/wolvix-hooks";

export default function ProfilePage() {
  const params = useParams();
  const username = params?.username ?? "";
  const profile = useProfile(username);
  const user = profile.data?.user;
  const data = profile.data?.profile;
  const score = data?.reputationScore || 0;

  return (
    <>
      {profile.isLoading ? <p className="mb-4 text-sm text-white/48">Loading profile...</p> : null}
      {profile.error ? <p className="mb-4 text-sm text-rose">{profile.error.message}</p> : null}
      <div className="glass mb-6 min-h-48 rounded-lg p-5">
        <div className="mt-20 flex flex-col gap-4 sm:flex-row sm:items-end">
          <Avatar name={user?.name || username} src={data?.profilePhoto} className="h-24 w-24 text-2xl" />
          <PageHeading title={user?.name || username} description={data?.bio || data?.headline || "Builder profile with skills, proof-of-work, badges, streaks, and contribution history."} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Rank" value={rankFromReputation(score)} detail={`${score} XP`} />
        <StatCard label="Streak" value={data?.streak?.current || 0} detail="Active days" />
        <StatCard label="Badges" value={data?.badges?.length || 0} detail="Earned medals" />
        <StatCard label="Projects" value={data?.activityHistory?.filter((item) => item.type === "project").length || 0} detail="Shipped work" />
      </div>
      <Card className="mt-5">
        <h2 className="font-display text-xl font-semibold">Skills</h2>
        <div className="mt-4 flex flex-wrap gap-2">{(data?.skills || ["React", "Node", "MongoDB", "AI"]).map((skill) => <Badge key={skill}>{skill}</Badge>)}</div>
      </Card>
    </>
  );
}
