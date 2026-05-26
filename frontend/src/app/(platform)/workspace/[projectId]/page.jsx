"use client";

import { useParams } from "@/lib/router";
import { Link } from "@/lib/router";
import { useTeam } from "@/features/wolvix-hooks";
import { CheckCircle2, GitBranch, Lock, MessageSquare, Paperclip, RefreshCw, Send, Sparkles } from "lucide-react";

const taskColumns = [
  {
    title: "Queue",
    count: "04",
    color: "text-[#8b90a0]",
    dot: "bg-[#8b90a0]",
    tasks: [
      { title: "Optimize Canvas Rendering", body: "The WebGL context is leaking on frame resets.", tags: ["UI/UX", "CRITICAL"], critical: true },
      { title: "API Rate Limiting", body: "Implement Redis-based sliding window.", tags: ["BACKEND"] }
    ]
  },
  {
    title: "In Synthesis",
    count: "02",
    color: "text-[#aec6ff]",
    dot: "bg-[#aec6ff] animate-pulse",
    tasks: [
      { title: "Mesh Topology Update", body: "Reconfiguring the underlying P2P network layer for lower latency.", tags: ["CORE"], active: true }
    ]
  },
  {
    title: "Review",
    count: "01",
    color: "text-[#dbb8ff]",
    dot: "bg-[#dbb8ff]",
    tasks: [
      { title: "Auth Module Audit", body: "Security review of the new biometric integration.", tags: ["SECURITY"] }
    ]
  }
];

const contributors = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=96&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=96&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80"
];

function WorkspacePanel({ className = "", children }) {
  return <div className={`workspace-glass rounded-lg ${className}`}>{children}</div>;
}

function TaskCard({ task }) {
  return (
    <WorkspacePanel className={`cursor-grab p-4 transition-colors hover:bg-white/5 ${task.active ? "border-[#aec6ff]/20 bg-[#aec6ff]/5 workspace-active-glow" : ""}`}>
      <div className="mb-3 flex flex-wrap gap-2">
        {task.tags.map((tag) => (
          <span key={tag} className={`rounded border px-1.5 py-0.5 font-mono text-[10px] ${task.critical && tag === "CRITICAL" ? "border-[#ffb4ab]/20 bg-[#ffb4ab]/10 text-[#ffb4ab]" : "border-white/10 bg-white/5 text-white"}`}>
            {tag}
          </span>
        ))}
      </div>
      <h4 className="mb-2 text-sm font-semibold text-white">{task.title}</h4>
      <p className="mb-4 text-xs leading-5 text-[#8b90a0]">{task.body}</p>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {contributors.slice(0, task.active ? 2 : 1).map((avatar) => (
            <img key={avatar} alt="Contributor" className="h-6 w-6 rounded-full border border-[#131313] object-cover" src={avatar} />
          ))}
        </div>
        {task.active ? <span className="font-mono text-[10px] text-[#aec6ff]">82% COMPLETE</span> : <Paperclip className="h-4 w-4 text-[#8b90a0]" />}
      </div>
    </WorkspacePanel>
  );
}

export default function WorkspacePage() {
  const params = useParams();
  const projectId = params?.projectId ?? "";
  const teamQuery = useTeam(projectId);
  const team = teamQuery.data?.team;
  const roles = team?.openRoles?.length ? team.openRoles : team?.roles || [{ title: "Frontend builder" }, { title: "AI engineer" }, { title: "Growth lead" }];
  const members = team?.members?.length ? team.members : [];
  const commits = Math.max(4200, members.length * 640 + roles.length * 500);

  return (
    <div className="workspace-page -mx-4 -my-6 flex h-[calc(100vh-4rem)] overflow-hidden bg-[#131313] text-[#e5e2e1] sm:-mx-6">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-white/5 p-6 lg:p-8">
          {teamQuery.isLoading ? <p className="mb-4 text-sm text-[#c1c6d7]">Loading workspace...</p> : null}
          {teamQuery.error ? <p className="mb-4 text-sm text-[#ffb4ab]">Backend workspace data is unavailable right now. {teamQuery.error.message}</p> : null}
          <div className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="rounded border border-[#aec6ff]/20 bg-[#aec6ff]/10 px-2 py-0.5 font-mono text-[13px] text-[#aec6ff]">WLVX-{String(projectId || "042").slice(0, 3).toUpperCase()}</span>
                <h1 className="font-display text-4xl font-semibold text-white">{team?.name || "Neural Mesh Refactoring"}</h1>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-[#c1c6d7]">{team?.description || "Refining the synaptic weights for the Wolvix Core. Transitioning from sequential to distributed asynchronous mesh topology."}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="block font-mono text-[13px] text-[#8b90a0]">GITHUB SYNC</span>
                <div className="flex items-center gap-2 text-[#aec6ff]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#aec6ff] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#aec6ff]" />
                  </span>
                  <span className="font-mono text-[13px]">LIVE: {commits.toLocaleString()} COMMITS</span>
                </div>
              </div>
              <button className="workspace-glass rounded p-3 transition-all hover:bg-white/10" aria-label="Sync workspace">
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Q3 Initialize", "100% DEPLOYED", "w-full", CheckCircle2, "text-[#aec6ff]"],
              ["Core Mapping", "64% IN PROGRESS", "w-2/3", GitBranch, "text-[#aec6ff]"],
              ["Latency Sync", "LOCKED", "w-0", Lock, "text-[#8b90a0] opacity-60"],
              ["Global Exit", "LOCKED", "w-0", Lock, "text-[#8b90a0] opacity-60"]
            ].map(([label, status, width, Icon, color], index) => (
              <WorkspacePanel key={label} className={`relative overflow-hidden p-4 transition-all hover:border-[#aec6ff]/30 ${index === 0 ? "workspace-active-glow" : ""} ${index > 1 ? "opacity-60" : ""}`}>
                <div className="mb-4 flex items-start justify-between">
                  <span className="font-mono text-[13px] uppercase text-[#c1c6d7]">{label}</span>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div className={`mb-2 h-1 overflow-hidden rounded-full bg-white/5 ${index === 1 ? "workspace-scanning-line" : ""}`}>
                  <div className={`h-full bg-[#aec6ff] shadow-[0_0_8px_#aec6ff] ${width}`} />
                </div>
                <span className={`font-mono text-[11px] ${index < 2 ? "text-[#aec6ff]" : "text-[#8b90a0]"}`}>{status}</span>
              </WorkspacePanel>
            ))}
          </div>
        </header>

        <section className="flex flex-1 gap-8 overflow-x-auto p-6 lg:p-8">
          {taskColumns.map((column) => (
            <div key={column.title} className="w-80 shrink-0">
              <div className="mb-4 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${column.dot}`} />
                  <h2 className={`text-sm font-semibold uppercase tracking-[0.2em] ${column.color}`}>{column.title}</h2>
                </div>
                <span className="font-mono text-[13px] text-[#8b90a0]">{column.count}</span>
              </div>
              <div className="workspace-kanban-column space-y-4">
                {column.tasks.map((task) => <TaskCard key={task.title} task={task} />)}
                {column.title === "Queue" ? (
                  <WorkspacePanel className="border-dashed p-4 text-sm text-[#8b90a0]">
                    Open roles: {roles.map((role) => role.title).join(", ")}
                  </WorkspacePanel>
                ) : null}
              </div>
            </div>
          ))}
        </section>
      </div>

      <aside className="hidden w-[320px] flex-col border-l border-white/5 bg-[#0e0e0e]/50 xl:flex">
        <div className="border-b border-white/5 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">CONTRIBUTORS</h3>
            <span className="font-mono text-[13px] text-[#8b90a0]">{Math.max(8, members.length)} ONLINE</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {contributors.map((avatar) => (
              <div key={avatar} className="relative">
                <img alt="Contributor" className="h-8 w-8 rounded-full border border-[#aec6ff]/40 object-cover grayscale transition-all hover:grayscale-0" src={avatar} />
                <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-[#131313] bg-[#aec6ff]" />
              </div>
            ))}
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-[#8b90a0]">+5</div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="border-b border-white/5 bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#8b90a0]" />
              <span className="text-sm font-semibold text-[#c1c6d7]">synthesis-log</span>
            </div>
          </div>
          <div className="flex-1 space-y-6 overflow-y-auto p-4">
            {[
              ["neo_architect", "text-[#aec6ff]", "Just pushed the initial mesh topology refactor. Check the WLVX branch."],
              ["sarah_ops", "text-[#dbb8ff]", "Synced. Latency looks nominal on the staging node. Ready for review?"],
              ["dave_core", "text-white", "Looking at it now. Might need to bump the memory buffer on listener nodes."]
            ].map(([name, color, message], index) => (
              <div key={name} className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className={`cursor-pointer text-[13px] font-semibold hover:underline ${color}`}>{name}</span>
                  <span className="font-mono text-[10px] text-[#8b90a0]">14:{22 + index * 4}</span>
                </div>
                <p className="text-sm leading-snug text-[#c1c6d7]">{message}</p>
              </div>
            ))}
            <div className="rounded-r border-l-2 border-[#aec6ff] bg-[#aec6ff]/5 p-3">
              <div className="mb-1 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#aec6ff]" />
                <span className="font-mono text-[11px] text-[#aec6ff]">SYSTEM NOTIFICATION</span>
              </div>
              <p className="font-mono text-[11px] text-[#c1c6d7]">GitHub Sync: 12 files changed in commit <span className="text-[#aec6ff]">8f2a1b5</span></p>
            </div>
          </div>
          <div className="bg-[#131313] p-4">
            <div className="flex items-end gap-2 rounded-lg border border-white/10 bg-white/5 p-2 transition-all focus-within:border-[#aec6ff]/50">
              <textarea className="min-h-8 flex-1 resize-none border-none bg-transparent p-1 text-sm text-white outline-none placeholder:text-[#8b90a0]" placeholder="Message #synthesis-log" rows="1" />
              <button className="flex h-8 w-8 items-center justify-center text-[#8b90a0] transition-colors hover:text-[#aec6ff]" aria-label="Send message">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <footer className="fixed bottom-0 right-0 z-30 hidden border-t border-white/5 bg-[#0e0e0e] px-8 py-3 xl:left-[calc(240px+1.5rem)] xl:block">
        <div className="flex items-center justify-between gap-6">
          <p className="font-mono text-[13px] text-[#c1c6d7]">© 2026 Wolvix Protocol. <span className="text-[#aec6ff]/50">Encrypted Transmission.</span></p>
          <div className="flex items-center gap-4">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <span className="font-mono text-[13px] text-emerald-500">OPERATIONAL</span>
            <span className="font-mono text-[13px] text-[#8b90a0]">v4.2.0-STABLE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
