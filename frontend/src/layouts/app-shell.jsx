"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Award, Bell, Bot, Briefcase, Flame, Home, Lightbulb, Rocket, Settings, Users, X } from "lucide-react";
import { TopNav } from "@/components/shared/nav";
import { CommandPalette } from "@/components/shared/command-palette";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

const items = [
  ["/dashboard", "Dashboard", Home],
  ["/ideas", "Ideas", Lightbulb],
  ["/projects", "Projects", Users],
  ["/launches", "Launches", Rocket],
  ["/hiring", "Hiring", Briefcase],
  ["/leaderboard", "Leaderboard", Flame],
  ["/achievements", "Achievements", Award],
  ["/notifications", "Notifications", Bell],
  ["/ai-tools", "AI Tools", Bot],
  ["/settings/profile", "Settings", Settings]
];

export function AppShell({ children }) {
  const pathname = usePathname();
  const currentPath = pathname ?? "";
  const open = useUiStore((state) => state.sidebarOpen);
  const setOpen = useUiStore((state) => state.setSidebarOpen);

  return (
    <div className="min-h-screen">
      <TopNav />
      <CommandPalette />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className={cn("glass fixed inset-y-0 left-0 z-50 w-72 translate-x-[-105%] rounded-none p-4 transition lg:sticky lg:top-20 lg:z-0 lg:h-[calc(100vh-6.5rem)] lg:w-auto lg:translate-x-0 lg:rounded-lg", open && "translate-x-0")}>
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <strong>Navigate</strong>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-4 w-4" /></Button>
          </div>
          <nav className="grid gap-1">
            {items.map(([href, label, Icon]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/58 hover:bg-white/8 hover:text-white", currentPath.startsWith(href) && "bg-cyan/12 text-cyan")}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
