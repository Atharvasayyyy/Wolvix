"use client";

import { Link } from "@/lib/router";
import { useJobs } from "@/features/wolvix-hooks";
import { Bot, Brain, Briefcase, Filter, Flame, Rocket, Search, ShieldCheck, Sparkles, TrendingUp, Zap } from "lucide-react";

const fallbackRoles = [
  { title: "Lead Rust Dev", slug: "lead-rust-dev", company: "Zenith Protocol", location: "Fully Remote", type: "Full-time", tags: ["RUST", "SOLANA", "LEGEND RANK ONLY"], description: "Own the sequencing layer for a low-latency protocol.", applications: [{}, {}, {}, {}] },
  { title: "LLM Fine-tuning Lead", slug: "llm-fine-tuning-lead", company: "Aeon AI", location: "San Francisco / Hybrid", type: "Contract", tags: ["PYTORCH", "CUDA", "ALPHA+ RANK"], description: "Train and ship specialized model pipelines for developer agents.", applications: [{}, {}] },
  { title: "Frontend Architect", slug: "frontend-architect", company: "Ghost Labs", location: "Remote", type: "Full-time", tags: ["TYPESCRIPT", "TAILWIND"], description: "Lead interface systems for a technical collaboration platform.", applications: [] }
];

const talent = [
  ["#01", "0xKage", "Lvl 99", "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=96&q=80"],
  ["#02", "NovaCore", "Lvl 94", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=96&q=80"],
  ["#03", "BitWeaver", "Lvl 91", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80"]
];

function RoleCard({ job, index }) {
  const Icon = index === 0 ? Zap : index === 1 ? Brain : ShieldCheck;
  const tags = job.tags?.length ? job.tags : [job.type || "ROLE", job.location || "REMOTE"];
  const salary = index === 0 ? "180k - 240k USDC" : index === 1 ? "210k - 300k USDC" : "150k - 190k USDC";
  const applications = job.applications?.length || 0;

  return (
    <article className="hiring-glass group cursor-pointer rounded-lg p-6 transition-all active:scale-[0.99]">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-white/10 bg-gradient-to-br from-[#aec6ff]/20 to-[#dbb8ff]/20">
            <Icon className={`h-5 w-5 ${index === 1 ? "text-[#dbb8ff]" : "text-[#aec6ff]"}`} />
          </div>
          <div>
            <Link href={`/jobs/${job.slug || job._id || job.id}`} className="font-display text-2xl font-semibold text-white transition-colors group-hover:text-[#aec6ff]">
              {job.title}
            </Link>
            <p className="mt-1 text-sm text-[#c1c6d7]">{job.company} - {job.location}</p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <div className="font-mono text-[13px] text-[#aec6ff]">{salary}</div>
          <div className="font-mono text-[11px] uppercase text-[#c1c6d7]">Equity: {index === 1 ? "Negotiable" : index === 2 ? "0.2%" : "0.5 - 1.2%"}</div>
        </div>
      </div>
      <p className="mb-5 line-clamp-2 text-sm leading-6 text-[#c1c6d7]">{job.description}</p>
      <div className="mb-6 flex flex-wrap gap-2">
        {tags.slice(0, 4).map((tag, tagIndex) => (
          <span key={`${job.title}-${tag}`} className={`rounded border border-white/10 px-2 py-1 font-mono text-[11px] ${tagIndex === tags.length - 1 && index < 2 ? "text-[#dbb8ff]" : "text-white"}`}>
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="font-mono text-[11px] text-[#c1c6d7]">{applications ? `Applied by ${applications} Legends` : "Last active 2m ago"}</div>
        <Link className="rounded-lg bg-[#aec6ff]/10 px-6 py-2 text-sm font-semibold text-[#aec6ff] transition-all hover:bg-[#aec6ff] hover:text-[#002e6b]" href={`/jobs/${job.slug || job._id || job.id}`}>
          Quick Apply
        </Link>
      </div>
    </article>
  );
}

export default function HiringPage() {
  const jobs = useJobs();
  const roles = jobs.data?.jobs?.length ? jobs.data.jobs : fallbackRoles;

  return (
    <div className="hiring-page -mx-4 -my-6 bg-[#131313] px-4 py-8 text-[#e5e2e1] sm:-mx-6 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <section className="hiring-glass relative mb-16 overflow-hidden rounded-lg border-[#aec6ff]/20 p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-[#aec6ff]/5 via-transparent to-[#dbb8ff]/5" />
          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="mb-4 inline-block rounded-full bg-[#aec6ff]/10 px-3 py-1 font-mono text-[13px] text-[#aec6ff]">MARKETPLACE v4.2</span>
              <h1 className="mb-4 max-w-2xl font-display text-5xl font-bold leading-tight text-white">
                Forge the next generation of <span className="italic text-[#aec6ff]">Autonomous Protocols</span>.
              </h1>
              <p className="max-w-xl leading-7 text-[#c1c6d7]">The Wolvix Talent Protocol connects top-ranked engineers with trending startups. Stake your reputation, climb the leaderboard, and claim your equity.</p>
            </div>
            <div className="flex gap-6">
              <div className="text-right">
                <div className="font-display text-4xl font-semibold text-white">{jobs.data?.jobs?.length || "1.2k+"}</div>
                <div className="font-mono text-[13px] uppercase text-[#c1c6d7]">Open Roles</div>
              </div>
              <div className="border-l border-white/10 pl-6 text-right">
                <div className="font-display text-4xl font-semibold text-[#dbb8ff]">842</div>
                <div className="font-mono text-[13px] uppercase text-[#c1c6d7]">Legends Active</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-wrap gap-2">
            {["All Roles", "Engineering", "Design", "AI/LLM"].map((filter, index) => (
              <button key={filter} className={`rounded px-4 py-2 text-sm font-semibold transition-all ${index === 0 ? "bg-[#aec6ff] text-[#001a43]" : "hiring-glass hover:bg-white/5"}`}>
                {filter}
              </button>
            ))}
            <button className="hiring-glass flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold hover:bg-white/5">
              <Filter className="h-4 w-4" /> Rank: Alpha+
            </button>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#c1c6d7]" />
            <input className="w-full rounded-lg border border-white/10 bg-[#111] py-2 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-[#8b90a0] focus:border-[#aec6ff] focus:ring-1 focus:ring-[#aec6ff]" placeholder="Search stack, role, or company..." type="search" />
          </div>
        </section>

        {jobs.isLoading ? <p className="mb-4 text-sm text-[#c1c6d7]">Loading jobs...</p> : null}
        {jobs.error ? <p className="mb-4 text-sm text-[#ffb4ab]">Backend jobs are unavailable right now. {jobs.error.message}</p> : null}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="space-y-4 lg:col-span-8">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="flex items-center gap-3 font-display text-2xl font-semibold text-white">
                <Briefcase className="h-6 w-6 text-[#aec6ff]" /> Open Roles
              </h2>
              <span className="font-mono text-[13px] text-[#c1c6d7]">SORT BY: TRENDING</span>
            </div>
            {roles.map((job, index) => <RoleCard key={job._id || job.slug || job.id || job.title} job={job} index={index} />)}
          </section>

          <aside className="space-y-6 lg:col-span-4">
            <section className="hiring-glass relative overflow-hidden rounded-lg border-[#dbb8ff]/30 p-6">
              <div className="absolute -right-4 -top-4 h-24 w-24 bg-[#dbb8ff]/10 blur-3xl" />
              <h2 className="mb-2 flex items-center gap-2 font-display text-2xl font-semibold text-white">
                <Sparkles className="h-5 w-5 text-[#dbb8ff]" /> Cofounder Match
              </h2>
              <p className="mb-6 text-sm leading-6 text-[#c1c6d7]">We've identified 3 potential matches based on your tech stack and past launches.</p>
              <div className="rounded-lg border border-white/5 bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-3">
                  <img alt="@alex_v" className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80" />
                  <div>
                    <div className="text-sm font-semibold text-white">@alex_v</div>
                    <div className="font-mono text-[10px] uppercase text-[#dbb8ff]">Legend - Product Growth</div>
                  </div>
                </div>
                <p className="text-sm italic leading-6 text-[#c1c6d7]">"Looking for a technical lead for a zero-knowledge identity protocol."</p>
              </div>
              <button className="mt-6 w-full rounded-lg border border-[#dbb8ff] py-3 text-sm font-semibold text-[#dbb8ff] transition-all hover:bg-[#dbb8ff] hover:text-[#470083]">View All Matches</button>
            </section>

            <section className="hiring-glass rounded-lg p-6">
              <h2 className="mb-6 flex items-center gap-2 font-display text-2xl font-semibold text-white">
                <Flame className="h-5 w-5 text-[#aec6ff]" /> Top Discovery
              </h2>
              <div className="space-y-3">
                {talent.map(([rank, name, level, avatar]) => (
                  <div key={name} className="flex items-center justify-between rounded p-3 transition-all hover:bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className={`font-mono ${rank === "#01" ? "text-[#aec6ff]" : "text-[#c1c6d7]"}`}>{rank}</div>
                      <img alt={name} className="h-8 w-8 rounded border border-white/10 object-cover" src={avatar} />
                      <div className="text-sm font-semibold text-white">{name}</div>
                    </div>
                    <div className="font-mono text-[11px] text-[#c1c6d7]">{level}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-white/10 pt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase text-[#c1c6d7]">Your Discovery Rank</span>
                  <span className="font-mono text-[#aec6ff]">#422</span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[65%] bg-[#aec6ff] hiring-shimmer" />
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
