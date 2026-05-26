"use client";

import { Link } from "@/lib/router";
import { useParams } from "@/lib/router";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/input";
import { PageHeading } from "@/components/shared/page-heading";
import { useCreateIdeaComment, useIdea, useIdeaAction, useIdeaComments } from "@/features/wolvix-hooks";

export default function IdeaDetailPage() {
  const params = useParams();
  const id = params?.id ?? "";
  const idea = useIdea(id);
  const comments = useIdeaComments(id);
  const upvote = useIdeaAction(id, "upvote");
  const bookmark = useIdeaAction(id, "bookmark");
  const createComment = useCreateIdeaComment(id);
  const [body, setBody] = useState("");

  if (idea.isLoading) return <Loader label="Loading idea" />;
  if (!idea.data?.idea) return <PageHeading title="Idea not found" description="This idea may have moved or been archived." />;
  const item = idea.data.idea;

  return (
    <>
      <PageHeading eyebrow={item.category || "Idea"} title={item.title} description={item.summary} action={<Button asChild><Link href={`/teams?idea=${item.slug}`}>Build With Me</Link></Button>} />
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <section className="grid gap-5">
          <Card><h2 className="font-display text-xl font-semibold">Problem</h2><p className="mt-3 leading-7 text-white/62">{item.problem}</p></Card>
          <Card><h2 className="font-display text-xl font-semibold">Solution</h2><p className="mt-3 leading-7 text-white/62">{item.solution}</p></Card>
          <Card>
            <h2 className="font-display text-xl font-semibold">Comments</h2>
            <form
              className="mt-4 grid gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                if (!body.trim()) return;
                createComment.mutate(body, { onSuccess: () => setBody("") });
              }}
            >
              <Textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Add a practical suggestion, question, or build offer." />
              <Button disabled={createComment.isPending}>{createComment.isPending ? "Posting..." : "Post comment"}</Button>
            </form>
            <div className="mt-4 grid gap-3">
              {(comments.data?.comments || []).map((comment) => <div key={comment._id} className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/62">{comment.body || comment.content}</div>)}
              {!comments.data?.comments?.length ? <p className="text-sm text-white/45">No comments yet. Start the discussion from the backend comments API.</p> : null}
            </div>
          </Card>
        </section>
        <aside className="grid content-start gap-4">
          <Card>
            <div className="flex flex-wrap gap-2">{item.tags?.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
            <div className="mt-5 grid gap-3">
              <Button onClick={() => upvote.mutate()}>Upvote</Button>
              <Button variant="secondary" onClick={() => bookmark.mutate()}>Bookmark</Button>
              <Button variant="ghost" asChild><Link href="/projects">Related projects</Link></Button>
            </div>
          </Card>
          <Card><MessageCircle className="mb-3 h-5 w-5 text-cyan" /><p className="text-sm leading-6 text-white/58">Contributors, comments, and related projects stay connected to this idea slug.</p></Card>
        </aside>
      </div>
    </>
  );
}
