"use client";

import { useMemo } from "react";
import { useParams } from "@/lib/router";
import { compactNumber, rankFromReputation } from "@/lib/utils";
import { useProfile } from "@/features/wolvix-hooks";
import {
  ArrowUpRight,
  BadgeCheck,
  Code2,
  Crown,
  Flame,
  Github,
  GitFork,
  Lock,
  Medal,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Trophy,
  UserPlus,
  Zap
} from "lucide-react";

const fallbackCover = "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&w=1800&q=80";
const fallbackAvatar = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=480&q=80";

const fallbackActivities = [
  { type: "pull_request", text: "Merged PR #402 into wolvix-core", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { type: "badge", text: 'Earned "Alpha Hunter" Badge', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString() },
  { type: "project", text: "Initiated Project Zenith", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() },
  { type: "post", text: 'Published Post "The future of Wasm"', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString() }
];

const fallbackProjects = [
  {
    name: "Zenith Distributed Engine",
    status: "Live",
    description: "High-performance Rust-based orchestration engine for edge computing nodes.",
    stars: "2.4k",
    forks: "328",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Wolvix Auth Toolkit",
    status: "v1.2.0",
    description: "Advanced biometric and hardware key authentication library for web apps.",
    stars: "1.8k",
    forks: "152",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
  }
];

const achievementIcons = [Medal, Zap, BadgeCheck, Crown, Sparkles, Lock];
const defaultSkills = ["Rust", "React", "TypeScript", "WebAssembly", "PostgreSQL", "Docker", "Kubernetes"];

function timeAgo(value) {
  if (!value) return "Recently";
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.max(1, Math.floor(diff / 60000));
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Yesterday" : `${days} days ago`;
}

function levelFromScore(score) {
  return Math.max(1, Math.floor(Number(score || 0) / 300) + 1);
}

function contributionLevel(index, score) {
  const seed = (index * 17 + Number(score || 0) * 3) % 11;
  if (seed > 8) return "bg-[#aec6ff]";
  if (seed > 6) return "bg-[#aec6ff]/70";
  if (seed > 3) return "bg-[#aec6ff]/40";
  if (seed > 1) return "bg-[#aec6ff]/20";
  return "bg-[#20201f]";
}

function ProfilePanel({ className = "", children }) {
  return <section className={`profile-glass rounded-lg ${className}`}>{children}</section>;
}

export default function ProfilePage() {
  const params = useParams();
  const username = params?.username ?? "";
  const profileQuery = useProfile(username);
  const user = profileQuery.data?.user;
  const profile = profileQuery.data?.profile;
  const reputationScore = profile?.reputationScore || 0;
  const level = levelFromScore(reputationScore);
  const skills = profile?.skills?.length ? profile.skills : defaultSkills;
  const activities = profile?.activityHistory?.length ? profile.activityHistory : fallbackActivities;
  const badges = profile?.badges?.length ? profile.badges : ["Early Adopter", "Fast Responder", "Clean Coder", "Top 1% Architect", "Open Source Lead", "Locked Achievement"];
  const heatmapCells = useMemo(() => Array.from({ length: 52 * 7 }, (_, index) => contributionLevel(index, reputationScore)), [reputationScore]);
  const displayName = user?.name || username || "Alex Rivera";
  const headline = profile?.bio || "Designing high-frequency trading protocols and decentralized cloud infrastructures. Obsessed with Rust, low-latency systems, and minimalist UI.";
  const currentStreak = profile?.streak?.current || profile?.streak?.currentStreak || 128;
  const medals = profile?.medals?.length || badges.length;
  const projectCount = activities.filter((item) => item.type === "project").length || fallbackProjects.length;
  const socialGithub = profile?.socialLinks?.github;

  return (
    <div className="profile-page -mx-4 -my-6 bg-[#131313] px-4 py-6 text-[#e5e2e1] sm:-mx-6 sm:px-6">
      <div className="mx-auto max-w-[1440px]">
        {profileQuery.isLoading ? <p className="mb-4 text-sm text-[#c1c6d7]">Loading profile transmission...</p> : null}
        {profileQuery.error ? (
          <ProfilePanel className="mb-4 p-4">
            <p className="text-sm text-[#ffb4ab]">Backend profile data is unavailable right now, so Wolvix is showing the designed profile shell with fallback content. {profileQuery.error.message}</p>
          </ProfilePanel>
        ) : null}

        <header className="relative mb-10">
          <div className="profile-bento-glow relative h-64 w-full overflow-hidden rounded-lg border border-white/10 md:h-80">
            <img alt={`${displayName} cover`} className="h-full w-full object-cover opacity-50" src={profile?.coverImage || fallbackCover} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent" />
          </div>
          <div className="relative -mt-20 flex flex-col justify-between gap-6 px-4 md:-mt-24 md:flex-row md:items-end md:px-10">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-end">
              <div className="profile-glass h-32 w-32 rounded-lg border-[#aec6ff]/20 p-1 shadow-xl md:h-40 md:w-40">
                <img alt={`${displayName} avatar`} className="h-full w-full rounded-lg object-cover" src={profile?.profilePhoto || fallbackAvatar} />
              </div>
              <div className="pb-2 text-center md:text-left">
                <h1 className="font-display text-5xl font-bold leading-tight text-white">{displayName}</h1>
                <p className="mb-1 font-mono text-[13px] uppercase tracking-[0.24em] text-[#aec6ff]">Level {level} {rankFromReputation(reputationScore)} Architect</p>
                <p className="max-w-xl leading-7 text-[#c1c6d7]">{headline}</p>
              </div>
            </div>
            <div className="mb-2 flex justify-center gap-4">
              <a className="profile-glass flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:bg-white/10 active:scale-95" href={socialGithub || "#"} target={socialGithub ? "_blank" : undefined} rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <button className="flex items-center gap-2 rounded-lg bg-[#0070f3] px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95">
                <UserPlus className="h-4 w-4" /> Connect
              </button>
            </div>
          </div>
        </header>

        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="grid grid-cols-2 gap-4 md:col-span-8 lg:grid-cols-4">
            {[
              [Star, compactNumber(reputationScore || 12400), "XP Points", "text-[#aec6ff]"],
              [Flame, currentStreak, "Day Streak", "text-[#dbb8ff]"],
              [ShieldCheck, profile?.reputationScore || 98, "Rep Score", "text-white"],
              [Medal, medals, "Medals", "text-[#c6c6c6]"]
            ].map(([Icon, value, label, color]) => (
              <ProfilePanel key={label} className="flex min-h-36 cursor-default flex-col items-center justify-center p-6 text-center transition-all hover:border-[#aec6ff]/40">
                <Icon className={`mb-3 h-8 w-8 transition-transform group-hover:scale-110 ${color}`} />
                <span className="font-display text-4xl font-semibold text-white">{value}</span>
                <span className="font-mono text-[13px] text-[#c1c6d7]">{label}</span>
              </ProfilePanel>
            ))}
          </div>
          <ProfilePanel className="md:col-span-4 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-2xl font-semibold text-white">Tech Stack</h3>
              <Code2 className="h-5 w-5 text-[#c1c6d7]" />
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={`${skill}-${index}`} className={`rounded-lg border border-white/5 bg-[#1c1b1b] px-3 py-1.5 font-mono text-[13px] ${index % 4 === 0 ? "text-[#aec6ff]" : index % 4 === 3 ? "text-[#dbb8ff]" : "text-white"}`}>
                  {skill}
                </span>
              ))}
            </div>
          </ProfilePanel>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ProfilePanel className="flex h-[500px] flex-col p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-2xl font-semibold text-white">Recent Activity</h3>
              <button className="font-mono text-[13px] text-[#aec6ff]">View All</button>
            </div>
            <div className="profile-scrollbar flex-1 space-y-6 overflow-y-auto pr-2">
              {activities.slice(0, 8).map((item, index) => (
                <div key={`${item.text}-${index}`} className="relative border-l-2 border-white/5 pl-5">
                  <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-[#131313] ${index % 3 === 0 ? "bg-[#aec6ff]" : index % 3 === 2 ? "bg-[#dbb8ff]" : "bg-[#353535]"}`} />
                  <p className="text-sm font-medium text-white">{item.text}</p>
                  <p className="mt-1 text-xs text-[#c1c6d7]">{timeAgo(item.createdAt)} - {item.type || "Activity"}</p>
                </div>
              ))}
            </div>
          </ProfilePanel>

          <ProfilePanel className="flex flex-col p-6 lg:col-span-2">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-display text-2xl font-semibold text-white">Contribution Heatmap</h3>
              <div className="flex items-center gap-2 text-sm text-[#c1c6d7]">
                <span>Less</span>
                <div className="h-3 w-3 rounded-sm bg-[#20201f]" />
                <div className="h-3 w-3 rounded-sm bg-[#aec6ff]/30" />
                <div className="h-3 w-3 rounded-sm bg-[#aec6ff]/60" />
                <div className="h-3 w-3 rounded-sm bg-[#aec6ff]" />
                <span>More</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-center overflow-x-auto pb-4">
              <div className="mx-auto grid w-fit grid-flow-col grid-rows-7 gap-1 lg:mx-0">
                {heatmapCells.map((color, index) => (
                  <div key={index} className={`profile-contribution-cell ${color}`} title={`Contribution day ${index + 1}`} />
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-6 border-t border-white/5 pt-6 xl:flex-row xl:items-end xl:justify-between">
                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <p className="text-sm text-[#c1c6d7]">Total Commits</p>
                    <p className="font-display text-3xl font-semibold text-white">{compactNumber((reputationScore || 6140) / 3)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#c1c6d7]">Longest Streak</p>
                    <p className="font-display text-3xl font-semibold text-[#dbb8ff]">{currentStreak} Days</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#c1c6d7]">Top Language</p>
                    <p className="font-display text-3xl font-semibold text-[#aec6ff]">{skills[0]}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-white/5 bg-[#0e0e0e] p-6">
                  <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[#c1c6d7]">GitHub Sync Status</p>
                  <div className="flex items-center gap-2 font-mono text-[13px] text-[#aec6ff]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#aec6ff] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#aec6ff]" />
                    </span>
                    Real-time Transmission Active
                  </div>
                </div>
              </div>
            </div>
          </ProfilePanel>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <ProfilePanel className="p-6">
            <h3 className="mb-6 font-display text-2xl font-semibold text-white">Achievements</h3>
            <div className="grid grid-cols-3 gap-4">
              {badges.slice(0, 6).map((badge, index) => {
                const Icon = achievementIcons[index] || Trophy;
                const locked = index === 5 && !profile?.badges?.length;
                return (
                  <div key={typeof badge === "string" ? badge : badge._id || badge.name} className={`profile-glass grid aspect-square place-items-center rounded-lg ${locked ? "opacity-40 grayscale" : ""}`} title={typeof badge === "string" ? badge : badge.name}>
                    <Icon className={`h-8 w-8 ${index % 2 === 0 ? "text-[#aec6ff]" : "text-[#dbb8ff]"}`} />
                  </div>
                );
              })}
            </div>
          </ProfilePanel>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-3">
            {fallbackProjects.map((project, index) => (
              <ProfilePanel key={project.name} className="group overflow-hidden transition-all hover:border-[#aec6ff]/50">
                <div className="relative h-32 overflow-hidden bg-[#353535]">
                  <img alt={project.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={project.image} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${index === 0 ? "bg-[#aec6ff] text-[#002e6b]" : "bg-[#2a2a2a] text-white"}`}>{project.status}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="mb-1 font-display text-2xl font-semibold text-white">{project.name}</h4>
                  <p className="line-clamp-2 text-sm leading-6 text-[#c1c6d7]">{project.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-[#c1c6d7]">
                      <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {project.stars}</span>
                      <span className="flex items-center gap-1"><GitFork className="h-3 w-3" /> {project.forks}</span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-[#c1c6d7] transition-colors group-hover:text-[#aec6ff]" />
                  </div>
                </div>
              </ProfilePanel>
            ))}
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 py-10 md:flex-row">
          <div className="text-center md:text-left">
            <span className="font-display text-2xl font-semibold text-white">Wolvix</span>
            <p className="mt-1 font-mono text-[13px] text-[#c1c6d7]">© 2026 Wolvix Protocol. Encrypted Transmission.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {["Documentation", "Changelog", "Privacy", "API"].map((label) => (
              <a key={label} className="font-mono text-[13px] text-[#c1c6d7] transition-colors hover:text-[#aec6ff]" href="#">
                {label}
              </a>
            ))}
          </div>
          <Terminal className="h-5 w-5 text-[#c1c6d7]" />
        </footer>
      </div>
    </div>
  );
}
