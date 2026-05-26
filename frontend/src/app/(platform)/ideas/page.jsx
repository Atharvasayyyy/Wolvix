"use client";

import { Link } from "@/lib/router";
import { compactNumber } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useIdeas, useTrendingIdeas } from "@/features/wolvix-hooks";
import {
  ArrowRight,
  Bitcoin,
  Bot,
  Brain,
  Cloud,
  Code2,
  Cpu,
  Plus,
  Search,
  Shield,
  ThumbsUp,
  Users
} from "lucide-react";

const fallbackImages = [
  "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80"
];

const categories = [
  [Brain, "Artificial Intelligence", 128],
  [Cloud, "Enterprise SaaS", 84],
  [Bitcoin, "Web3 & Crypto", 56],
  [Code2, "Developer Tools", 92]
];

const buildRequests = [
  ["Alex.eth", "Looking for a Rust engineer to optimize L2 sequencing...", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80"],
  ["Sarah_Dev", "Frontend architect needed for a glassmorphic dashboard project.", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=96&q=80"]
];

const displayTags = (idea) => {
  const tags = idea.tags?.length ? idea.tags : idea.collaborationNeeds;
  return (tags?.length ? tags : ["React", "Node", "AI"]).slice(0, 3);
};

function ideaImage(idea, index) {
  const media = idea.media?.[0];
  return media?.url || media?.secureUrl || fallbackImages[index % fallbackImages.length];
}

function IdeaExplorerCard({ idea, index }) {
  const upvotes = Array.isArray(idea.upvotes) ? idea.upvotes.length : idea.upvotes || 0;
  const collaborators = idea.collaborationNeeds?.length || idea.members?.length || Math.max(8, index * 7 + 18);

  return (
    <article className="explore-glass group flex h-full flex-col overflow-hidden rounded-lg">
      <div className="relative h-40 overflow-hidden">
        <img alt={idea.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={ideaImage(idea, index)} />
        <div className="absolute left-4 top-4 flex flex-wrap gap-1">
          {index === 0 ? <span className="rounded border border-white/10 bg-black/60 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[#aec6ff] backdrop-blur-md">Trending</span> : null}
          <span className="rounded border border-white/10 bg-black/60 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[#dbb8ff] backdrop-blur-md">{idea.category || "Startup"}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Link href={`/ideas/${idea.slug || idea._id}`} className="mb-2 font-display text-xl font-semibold text-white transition-colors group-hover:text-[#aec6ff]">
          {idea.title}
        </Link>
        <p className="mb-6 line-clamp-2 text-sm leading-6 text-[#c1c6d7]">{idea.summary || idea.problem || "A high-signal startup concept looking for the right technical collaborators."}</p>
        <div className="mt-auto space-y-5">
          <div className="flex flex-wrap gap-2">
            {displayTags(idea).map((tag) => (
              <span key={tag} className="rounded border border-white/5 bg-white/5 px-2 py-1 font-mono text-[11px] text-white">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1 text-[#aec6ff]">
                <ThumbsUp className="h-4 w-4" /> <span className="font-mono text-xs">{compactNumber(upvotes)}</span>
              </span>
              <span className="flex items-center gap-1 text-[#c1c6d7]">
                <Users className="h-4 w-4" /> <span className="font-mono text-xs">{collaborators}</span>
              </span>
            </div>
            <Link className="flex items-center gap-1 text-xs font-semibold uppercase text-white transition-colors hover:text-[#aec6ff]" href={`/ideas/${idea.slug || idea._id}`}>
              Analyze <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function IdeasPage() {
  const ideas = useIdeas();
  const trending = useTrendingIdeas();
  const ideaList = ideas.data?.ideas || [];
  const trendingList = trending.data?.ideas || [];

  return (
    <div className="explore-page -mx-4 -my-6 bg-[#131313] px-4 py-6 text-[#e5e2e1] sm:-mx-6 sm:px-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <aside className="space-y-6 lg:col-span-3">
            <section className="explore-glass rounded-lg p-6">
              <h3 className="mb-4 font-mono text-[13px] uppercase tracking-[0.2em] text-[#aec6ff]">Systems Architecture</h3>
              <div className="space-y-2">
                {categories.map(([Icon, label, count], index) => (
                  <button key={label} className={`flex w-full items-center justify-between rounded-lg px-4 py-3 transition-all ${index === 0 ? "bg-[#aec6ff]/10 text-[#aec6ff]" : "text-[#c1c6d7] hover:bg-white/5"}`}>
                    <span className="flex items-center gap-2 text-sm">
                      <Icon className="h-4 w-4" /> {label}
                    </span>
                    <span className="font-mono text-xs opacity-60">{count}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="explore-glass rounded-lg p-6">
              <h3 className="mb-4 font-mono text-[13px] uppercase tracking-[0.2em] text-[#aec6ff]">Build Requests</h3>
              <div className="space-y-4">
                {buildRequests.map(([name, body, avatar]) => (
                  <div key={name} className="cursor-pointer rounded-lg border border-white/5 bg-white/5 p-3 transition-all hover:border-[#aec6ff]/20">
                    <div className="mb-1 flex items-center gap-2">
                      <img alt={name} className="h-6 w-6 rounded-full object-cover" src={avatar} />
                      <span className="text-sm font-medium text-white">{name}</span>
                    </div>
                    <p className="text-xs leading-5 text-[#c1c6d7]">{body}</p>
                  </div>
                ))}
              </div>
              <Link className="mt-6 block w-full rounded-lg border border-[#aec6ff]/20 py-2 text-center text-xs font-semibold text-[#aec6ff] transition-all hover:bg-[#aec6ff]/5" href="/ideas/create">
                Submit Request
              </Link>
            </section>
          </aside>

          <div className="space-y-6 lg:col-span-9">
            <section className="explore-glass flex flex-col items-center gap-4 rounded-lg p-4 md:flex-row md:p-6">
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#c1c6d7]" />
                <input className="w-full rounded-lg border border-white/5 bg-[#20201f] py-3 pl-12 pr-4 text-base outline-none transition-all placeholder:text-[#8b90a0] focus:border-[#aec6ff]/50 focus:ring-1 focus:ring-[#aec6ff]/50" placeholder="Search protocol ideas, stacks, or keywords..." type="search" />
              </div>
              <div className="flex w-full gap-2 md:w-auto">
                <select className="w-full rounded-lg border border-white/5 bg-[#20201f] px-4 py-3 font-mono text-xs text-[#c1c6d7] outline-none md:w-auto">
                  <option>Difficulty: All</option>
                  <option>Junior</option>
                  <option>Senior</option>
                  <option>Architect</option>
                </select>
                <select className="w-full rounded-lg border border-white/5 bg-[#20201f] px-4 py-3 font-mono text-xs text-[#c1c6d7] outline-none md:w-auto">
                  <option>Tech Stack: All</option>
                  <option>Rust / Solana</option>
                  <option>Python / AI</option>
                  <option>Node.js / React</option>
                </select>
              </div>
            </section>

            <div className="mb-2 flex flex-wrap gap-2 text-sm text-white/56">
              {trendingList.slice(0, 6).map((idea) => (
                <Link key={idea.slug || idea._id} href={`/ideas/${idea.slug || idea._id}`} className="rounded-full border border-[#aec6ff]/25 bg-[#aec6ff]/10 px-3 py-1 text-[#aec6ff]">
                  {idea.title}
                </Link>
              ))}
            </div>

            {ideas.error ? <p className="text-sm text-[#ffb4ab]">Backend ideas are unavailable right now. {ideas.error.message}</p> : null}

            <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {ideas.isLoading ? (
                [1, 2, 3, 4].map((item) => <Skeleton key={item} className="h-96" />)
              ) : ideaList.length ? (
                ideaList.map((idea, index) => <IdeaExplorerCard key={idea._id || idea.slug} idea={idea} index={index} />)
              ) : (
                <div className="md:col-span-2">
                  <EmptyState title="No ideas yet" description="Seed the network by publishing the first high-signal startup idea." action={<Link className="rounded-lg bg-[#0070f3] px-5 py-3 text-sm font-semibold text-white" href="/ideas/create">Create idea</Link>} />
                </div>
              )}
            </section>

            <div className="flex flex-col items-center justify-center gap-4 py-10 opacity-50">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#aec6ff] border-t-transparent" />
              <span className="font-mono text-xs uppercase tracking-[0.2em]">Compiling more initiatives...</span>
            </div>
          </div>
        </div>
      </div>

      <Link className="group fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0070f3] text-white shadow-2xl transition-all hover:scale-110 active:scale-95" href="/ideas/create" aria-label="New initiative">
        <Plus className="h-6 w-6" />
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg border border-white/10 bg-[#2a2a2a] px-3 py-1.5 text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100">New Initiative</span>
      </Link>
    </div>
  );
}
