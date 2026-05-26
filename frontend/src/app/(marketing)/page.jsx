"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/lib/router";
import {
  ArrowRight,
  Bell,
  Binary,
  Bot,
  Brain,
  CheckCircle2,
  CircleX,
  Code2,
  DatabaseZap,
  GitBranch,
  Github,
  GitFork,
  Lightbulb,
  Network,
  Rocket,
  RocketIcon,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Trophy,
  Users,
  UserPlus,
  WalletCards,
  Zap
} from "lucide-react";

const partnerLogos = [
  [Terminal, "Google Cloud"],
  [DatabaseZap, "AWS Activate"],
  [Binary, "NVIDIA Inception"],
  [GitBranch, "GitHub for Startups"],
  [Network, "Vercel Pro"]
];

const problemCards = [
  [Users, "Crowdsourced Logic", "Validate system designs with verified level 40+ architects.", "text-[#aec6ff]"],
  [GitFork, "Neural Pairing", "Find the missing CTO or full-stack partner using AI logic.", "text-[#dbb8ff]"],
  [Sparkles, "Auto-Provision", "Instantly spin up dev environments for the entire team.", "text-[#aec6ff]"],
  [Rocket, "Venture Track", "Fast-track high-ranking teams to investor pitch days.", "text-[#dbb8ff]"]
];

const leaderboard = [
  {
    rank: "#01",
    handle: "@hyper_node",
    title: "Level 92 - Rust Systems Architect",
    xp: "14,820 XP",
    note: "Stable Protocol Launch",
    color: "text-green-400",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80"
  },
  {
    rank: "#02",
    handle: "@void_main",
    title: "Level 88 - Zero Knowledge Expert",
    xp: "12,450 XP",
    note: "Founder: CipherCore",
    color: "text-[#aec6ff]",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
  },
  {
    rank: "#03",
    handle: "@pixel_sorcerer",
    title: "Level 85 - AI/ML Researcher",
    xp: "11,200 XP",
    note: "3 Active Labs",
    color: "text-[#dbb8ff]",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80"
  }
];

const steps = [
  [Lightbulb, "IDEA", "Draft the vision on the collab board.", "border-[#aec6ff] text-[#aec6ff]"],
  [UserPlus, "TEAM", "Neural matching finds co-founders.", "border-[#dbb8ff] text-[#dbb8ff]"],
  [Code2, "BUILD", "Execute sprints with AI auditing.", "border-[#aec6ff] text-[#aec6ff]"],
  [RocketIcon, "LAUNCH", "Deploy via Wolvix Cloud Infrastructure.", "border-[#dbb8ff] text-[#dbb8ff]"],
  [WalletCards, "HIRE", "Scale your team with venture funding.", "border-[#0070f3] text-[#0070f3]"]
];

const testimonials = [
  {
    quote: "Wolvix cut our prototyping time by 70%. We found our CTO in 48 hours and closed our Seed round within three months.",
    name: "Marcus Thorne",
    role: "Founder, Nexus Labs",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80"
  },
  {
    quote: "The architectural validation feature saved us from a fatal database design flaw. Wolvix is the CI/CD of team building.",
    name: "Elena Rodriguez",
    role: "Lead Architect, Flow.io",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80"
  },
  {
    quote: "I was just a junior dev with a big idea. Wolvix paired me with veterans who helped me turn it into a profitable SaaS.",
    name: "Sanjay Patel",
    role: "Creator, GridLock",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
  }
];

function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d");
    let animationFrame = 0;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 150 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5,
        alpha: Math.random() * 0.5
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }
        context.fillStyle = `rgba(174, 198, 255, ${particle.alpha})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });
      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-40" aria-hidden="true" />;
}

function GlassCard({ className = "", children }) {
  return <div className={`wolvix-glass rounded-lg ${className}`}>{children}</div>;
}

export default function LandingPage() {
  return (
    <main className="wolvix-landing min-h-screen overflow-x-hidden bg-[#131313] text-[#e5e2e1] selection:bg-[#aec6ff]/30">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#131313]/70 shadow-[0_0_20px_rgba(0,112,243,0.1)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-10">
            <Link className="font-display text-2xl font-bold tracking-tight text-[#aec6ff]" href="/">
              Wolvix
            </Link>
            <div className="hidden gap-6 md:flex">
              {["Explore", "Ideas", "Launches", "Teams", "Leaderboard"].map((item, index) => (
                <Link
                  key={item}
                  className={`text-sm font-medium transition-colors ${index === 0 ? "border-b-2 border-[#aec6ff] pb-1 text-[#aec6ff]" : "text-[#c1c6d7] hover:text-white"}`}
                  href={index === 0 ? "/" : `/${item.toLowerCase()}`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link aria-label="Notifications" className="text-[#c1c6d7] transition-colors hover:text-[#aec6ff]" href="/notifications">
              <Bell className="h-5 w-5" />
            </Link>
            <Link aria-label="AI tools" className="text-[#c1c6d7] transition-colors hover:text-[#aec6ff]" href="/ai-tools">
              <Zap className="h-5 w-5" />
            </Link>
            <Link className="grid h-8 w-8 overflow-hidden rounded-full border border-white/10 bg-[#2a2a2a]" href="/signup">
              <img alt="Wolvix member profile" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80" />
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 pt-24 text-center md:px-12">
        <HeroParticles />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,112,243,0.15),transparent_70%)]" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="wolvix-float wolvix-glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[13px] text-[#e5e2e1]">
            <span className="h-2 w-2 rounded-full bg-[#aec6ff] shadow-[0_0_8px_#aec6ff]" />
            Now Integrated with GPT-4o Architect
          </div>
          <h1 className="mx-auto mb-6 max-w-5xl font-display text-5xl font-bold leading-tight text-white md:text-[80px] md:leading-[1.05]">
            Wolvix: <span className="wolvix-gradient-text">Where Builders Turn Ideas Into Startups.</span>
          </h1>
          <p className="mx-auto mb-16 max-w-2xl text-lg leading-8 text-[#c1c6d7]">
            The technical ecosystem for elite developers to find co-founders, validate architectures, and launch venture-scale products in record time.
          </p>
          <div className="mb-16 flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link className="flex items-center gap-2 rounded-lg bg-[#0070f3] px-10 py-4 text-sm font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(0,112,243,0.4)] active:scale-95" href="/signup">
              Initiate First Build <Rocket className="h-4 w-4" />
            </Link>
            <Link className="wolvix-glass rounded-lg px-10 py-4 text-sm font-semibold text-white transition-all hover:bg-white/5 active:scale-95" href="/ideas">
              Explore Initiatives
            </Link>
          </div>
          <div className="relative mt-10 w-full overflow-hidden opacity-60">
            <div className="wolvix-marquee flex items-center gap-16 whitespace-nowrap py-6">
              {[...partnerLogos, ...partnerLogos].map(([Icon, label], index) => (
                <span key={`${label}-${index}`} className="flex items-center gap-2 font-mono text-[13px] uppercase text-[#c1c6d7]">
                  <Icon className="h-4 w-4" /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0e0e0e] px-4 py-16 md:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-display text-4xl font-semibold text-[#aec6ff]">The Architecture Paradox</h2>
            <p className="leading-8 text-[#c1c6d7]">
              Most brilliant software ideas die in solitude. Technical debt, lack of specialized talent, and isolation turn potentially unicorn ventures into unfinished GitHub repos. Wolvix solves the Solo Builder Exhaustion by algorithmically matching architects with the right partners.
            </p>
            <ul className="space-y-4">
              {[
                [CircleX, "Solo builders hit knowledge ceilings after week 2.", "text-[#ffb4ab]"],
                [CircleX, "Networking is noisy, irrelevant, and time-consuming.", "text-[#ffb4ab]"],
                [CheckCircle2, "Wolvix teams ship 3.4x faster than solo developers.", "text-[#aec6ff]"]
              ].map(([Icon, text, color]) => (
                <li key={text} className="flex gap-4 text-sm">
                  <Icon className={`h-5 w-5 shrink-0 ${color}`} />
                  <span className={color === "text-[#aec6ff]" ? "text-white" : "text-[#c1c6d7]"}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative grid grid-cols-2 gap-4">
            <div className="absolute -inset-10 bg-[#aec6ff]/10 blur-[100px]" />
            {problemCards.map(([Icon, title, body, color], index) => (
              <GlassCard key={title} className={`relative flex flex-col gap-3 p-6 ${index % 2 === 0 ? "translate-y-8" : ""}`}>
                <Icon className={`h-10 w-10 ${color}`} />
                <h3 className={`text-sm font-semibold ${color}`}>{title}</h3>
                <p className="text-sm leading-6 text-[#c1c6d7]">{body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-12">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="mb-16 text-center font-display text-4xl font-semibold">
            Propelling the <span className="text-[#aec6ff]">Technical Vanguard</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2 md:[grid-auto-rows:minmax(0,1fr)]">
            <GlassCard className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden p-10 md:col-span-2 md:row-span-2">
              <div className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-40 wolvix-carbon" />
              <div className="relative z-10">
                <Network className="mb-6 h-12 w-12 text-[#aec6ff]" />
                <h3 className="mb-3 font-display text-4xl font-semibold">Idea Collaboration</h3>
                <p className="mb-6 max-w-xl leading-7 text-[#c1c6d7]">A real-time workspace for asynchronous brainstorming. Fork ideas, merge technical specs, and build the blueprint before the code exists.</p>
                <div className="relative h-1 w-full overflow-hidden rounded-full bg-[#20201f]">
                  <div className="wolvix-scan absolute left-0 top-0 h-full w-2/3 bg-[#aec6ff]" />
                </div>
              </div>
            </GlassCard>
            <GlassCard className="group flex items-center gap-8 p-6 md:col-span-2">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border border-[#aec6ff]/20 bg-[#aec6ff]/10 transition-transform group-hover:scale-110">
                <Users className="h-10 w-10 text-[#aec6ff]" />
              </div>
              <div>
                <h3 className="mb-2 font-display text-2xl font-semibold text-[#aec6ff]">Startup Teams</h3>
                <p className="text-sm leading-6 text-[#c1c6d7]">Auto-match with developers whose skills perfectly complement your technical stack and timezone.</p>
              </div>
            </GlassCard>
            {[
              [Github, "GitHub Sync", "Two-way synchronization for repos, pull requests, and technical documentation.", "text-[#dbb8ff]"],
              [Brain, "AI Assistance", "LLM-powered architectural reviews and smart-contract auditing on demand.", "text-[#aec6ff]"]
            ].map(([Icon, title, body, color]) => (
              <GlassCard key={title} className="p-6 transition-all hover:border-[#aec6ff]/50">
                <Icon className={`mb-4 h-8 w-8 ${color}`} />
                <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-[#c1c6d7]">{body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1c1b1b] px-4 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-4xl font-semibold text-[#aec6ff]">Top Protocol Architects</h2>
              <p className="mt-2 text-[#c1c6d7]">Real-time ranking of builders shaping the future.</p>
            </div>
            <Link className="flex items-center gap-2 text-sm font-semibold text-[#aec6ff] hover:underline" href="/leaderboard">
              View All Rankings <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <GlassCard className="overflow-hidden">
            <div className="divide-y divide-white/5">
              {leaderboard.map((builder) => (
                <div key={builder.rank} className="group flex items-center justify-between gap-4 p-6 transition-colors hover:bg-white/5">
                  <div className="flex min-w-0 items-center gap-5">
                    <span className={`w-10 shrink-0 font-mono text-lg ${builder.rank === "#01" ? "text-[#aec6ff]" : "text-[#c1c6d7]"}`}>{builder.rank}</span>
                    <img alt={`${builder.handle} profile`} className="h-12 w-12 shrink-0 rounded-lg border border-white/10 object-cover transition-transform group-hover:scale-105" src={builder.avatar} />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white">{builder.handle}</h4>
                      <p className="truncate font-mono text-xs text-[#c1c6d7]">{builder.title}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="flex items-center justify-end gap-1 font-mono text-sm text-[#aec6ff]">
                      <Zap className="h-4 w-4" /> {builder.xp}
                    </div>
                    <span className={`font-mono text-[10px] ${builder.color}`}>{builder.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="overflow-hidden px-4 py-16 md:px-12">
        <div className="mx-auto mb-16 max-w-[1440px] text-center">
          <h2 className="font-display text-4xl font-semibold">
            The Path to <span className="wolvix-gradient-text">Unicorn Status</span>
          </h2>
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="absolute left-0 top-1/2 -z-0 hidden h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-[#aec6ff] via-[#dbb8ff] to-[#0070f3] opacity-20 md:block" />
          {steps.map(([Icon, title, body, classes]) => (
            <div key={title} className="group z-10 flex w-full flex-col items-center gap-4 text-center md:w-1/5">
              <div className={`grid h-16 w-16 place-items-center rounded-full border-2 bg-[#131313] transition-all group-hover:shadow-[0_0_20px_rgba(174,198,255,0.45)] ${classes}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h5 className={`text-sm font-semibold ${classes.split(" ")[1]}`}>{title}</h5>
                <p className="mt-1 text-sm leading-6 text-[#c1c6d7]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0e0e0e] px-4 py-16 md:px-12">
        <div className="mx-auto max-w-[1440px] overflow-hidden">
          <h2 className="mb-16 text-center font-display text-4xl font-semibold">Success Transmissions</h2>
          <div className="wolvix-marquee flex gap-6 whitespace-nowrap hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((item, index) => (
              <GlassCard key={`${item.name}-${index}`} className="min-w-[330px] p-8 whitespace-normal md:min-w-[350px]">
                <div className="mb-4 flex gap-1 text-[#aec6ff]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <p className="mb-6 leading-7 text-white italic">"{item.quote}"</p>
                <div className="flex items-center gap-4">
                  <img alt={`${item.name} portrait`} className="h-10 w-10 rounded-full object-cover" src={item.avatar} />
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="font-mono text-[10px] text-[#c1c6d7]">{item.role}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 md:px-12">
        <div className="absolute inset-0 bg-[#aec6ff]/5 blur-[120px]" />
        <div className="wolvix-glass relative mx-auto max-w-4xl overflow-hidden rounded-2xl border-[#aec6ff]/20 p-8 text-center md:p-16">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#aec6ff]/20 blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#dbb8ff]/20 blur-[80px]" />
          <h2 className="relative mb-4 font-display text-5xl font-bold">
            Ready to <span className="text-[#aec6ff]">Ship?</span>
          </h2>
          <p className="relative mx-auto mb-10 max-w-xl leading-7 text-[#c1c6d7]">
            Join the 10,000+ architects building the next generation of software. The terminal is open. Your team is waiting.
          </p>
          <div className="relative flex flex-col items-center justify-center gap-5 md:flex-row">
            <Link className="rounded-lg bg-white px-12 py-4 text-sm font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-transform hover:scale-105" href="/signup">
              Access Protocol
            </Link>
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80"
              ].map((avatar, index) => (
                <img key={avatar} alt={`Wolvix member ${index + 1}`} className="h-10 w-10 rounded-full border-2 border-[#131313] object-cover" src={avatar} />
              ))}
              <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#131313] bg-[#20201f] font-mono text-[10px] text-[#aec6ff]">+4k</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full border-t border-white/5 bg-[#0e0e0e] px-4 py-10 md:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="font-display text-2xl font-semibold text-white">Wolvix</span>
            <p className="mt-1 font-mono text-[13px] text-[#c1c6d7]">© 2026 Wolvix Protocol. Encrypted Transmission.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {["Documentation", "Changelog", "Privacy", "API"].map((link) => (
              <a key={link} className="font-mono text-[13px] text-[#c1c6d7] transition-colors hover:text-[#aec6ff]" href="#">
                {link}
              </a>
            ))}
          </div>
          <div className="flex gap-4 text-[#c1c6d7]">
            <Terminal className="h-5 w-5 transition-colors hover:text-[#aec6ff]" />
            <Network className="h-5 w-5 transition-colors hover:text-[#aec6ff]" />
          </div>
        </div>
      </footer>
    </main>
  );
}
