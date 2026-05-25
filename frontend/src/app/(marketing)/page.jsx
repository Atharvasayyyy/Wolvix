"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame, GitBranch, Rocket, Trophy, Users } from "lucide-react";
import { TopNav } from "@/components/shared/nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const HeroScene = dynamic(() => import("@/components/landing/hero-scene").then((mod) => mod.HeroScene), { ssr: false });

const sections = [
  ["Trending Ideas", "Signal-rich idea discovery with tags, votes, comments, and contributor demand.", Flame],
  ["Startup Journey", "Move from spark to team, workspace, launch, and hiring without losing context.", GitBranch],
  ["Community Showcase", "Profiles blend GitHub credibility, LinkedIn polish, badges, streaks, and shipped work.", Users],
  ["Leaderboards", "Reputation, XP, medals, and ranks keep ambitious builders visible.", Trophy]
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <TopNav />
      <section className="relative min-h-[92vh] border-b border-white/10">
        <HeroScene />
        <div className="grid-lines absolute inset-0" />
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pb-20 pt-24 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <Badge className="mb-5 border-cyan/30 bg-cyan/10 text-cyan">Startup collaboration network</Badge>
            <h1 className="font-display text-5xl font-bold leading-[1.02] text-white sm:text-7xl lg:text-8xl">Wolvix</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
              The future of startup collaboration platforms: discover validated ideas, form elite teams, build in public, launch products, and earn reputation while you ship.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild><Link href="/ideas">Explore Ideas <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button size="lg" variant="secondary" asChild><Link href="/signup">Start Building</Link></Button>
            </div>
          </motion.div>
          <div className="absolute bottom-5 left-4 right-4 z-10 mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:grid-cols-4">
            {["12k builders", "3.8k ideas", "940 projects", "128 launches"].map((stat) => (
              <div key={stat} className="glass rounded-lg px-4 py-3 text-sm font-semibold text-white/74">{stat}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-16 sm:px-6 md:grid-cols-2">
        {sections.map(([title, body, Icon], index) => (
          <motion.div key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
            <Card className="min-h-56">
              <Icon className="mb-5 h-6 w-6 text-cyan" />
              <h2 className="font-display text-2xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-white/58">{body}</p>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Badge className="mb-4">Integrated flow</Badge>
            <h2 className="font-display text-4xl font-bold">From idea to launch, every page knows the next move.</h2>
          </div>
          <div className="grid gap-3">
            {["Landing -> Explore Ideas -> Idea Details -> Build With Me -> Workspace", "Profile <-> Contributions <-> Projects <-> Badges <-> Launches", "Dashboard <-> Notifications <-> Saved Ideas <-> Joined Projects"].map((flow) => (
              <div key={flow} className="glass rounded-lg px-4 py-4 text-sm text-white/68">{flow}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-16 sm:px-6 lg:grid-cols-3">
        {[
          ["Maya Chen", "Wolvix turned our abandoned AI concept into a four-person launch team in nine days."],
          ["Arjun Mehta", "The reputation graph made it obvious who had shipped before and who could help now."],
          ["Nora Silva", "It feels like GitHub, Product Hunt, and a founder studio finally share one nervous system."]
        ].map(([name, quote]) => (
          <Card key={name}>
            <p className="leading-7 text-white/68">"{quote}"</p>
            <strong className="mt-5 block text-white">{name}</strong>
          </Card>
        ))}
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-4 pb-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Build with the pack.</h2>
          <p className="mt-2 text-sm text-white/52">Ideas, teams, launches, hiring, reputation, and AI tooling in one cohesive system.</p>
        </div>
        <Button asChild><Link href="/signup">Join Wolvix <Rocket className="h-4 w-4" /></Link></Button>
      </footer>
    </main>
  );
}
