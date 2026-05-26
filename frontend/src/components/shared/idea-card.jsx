import { Link } from "@/lib/router";
import { ArrowUpRight, Bookmark, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { compactNumber } from "@/lib/utils";

export function IdeaCard({ idea }) {
  return (
    <Card className="group grid gap-4 transition hover:border-cyan/35 hover:bg-white/8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge>{idea.category || "Startup"}</Badge>
            <Badge className="border-lime/25 text-lime">{idea.stage || "idea"}</Badge>
          </div>
          <Link href={`/ideas/${idea.slug}`} className="font-display text-xl font-semibold text-white group-hover:text-cyan">
            {idea.title}
          </Link>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/58">{idea.summary}</p>
        </div>
        <Button variant="ghost" size="sm" asChild aria-label={`Open ${idea.title}`}>
          <Link href={`/ideas/${idea.slug}`}><ArrowUpRight className="h-4 w-4" /></Link>
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-white/48">
        <span className="flex items-center gap-2"><Flame className="h-4 w-4 text-rose" /> {compactNumber(Array.isArray(idea.upvotes) ? idea.upvotes.length : 0)} upvotes</span>
        <span className="flex items-center gap-2"><Bookmark className="h-4 w-4" /> {idea.collaborationNeeds?.slice(0, 2).join(", ") || "Open collaboration"}</span>
      </div>
    </Card>
  );
}
