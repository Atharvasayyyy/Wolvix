"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Command, Menu, Moon, Sun } from "lucide-react";
import { Brand } from "@/components/shared/brand";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useLogout } from "@/features/auth/hooks";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

const nav = [
  ["/ideas", "Explore Ideas"],
  ["/projects", "Projects"],
  ["/launches", "Launches"],
  ["/hiring", "Hiring"],
  ["/teams", "Community"],
  ["/leaderboard", "Leaderboard"],
  ["/ai-tools", "AI Tools"],
  ["/notifications", "Notifications"]
];

export function TopNav() {
  const pathname = usePathname();
  const currentPath = pathname || "/";
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();
  const { theme, setTheme, setCommandOpen, setSidebarOpen } = useUiStore();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/78 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Button variant="ghost" size="sm" className="lg:hidden" aria-label="Open menu" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-4 w-4" />
        </Button>
        <Brand />
        <nav className="ml-4 hidden items-center gap-1 xl:flex">
          {nav.map(([href, label]) => (
            <Link key={href} href={href} className={cn("rounded-md px-3 py-2 text-sm text-white/58 hover:bg-white/8 hover:text-white", currentPath.startsWith(href) && "bg-white/10 text-white")}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setCommandOpen(true)}>
            <Command className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild aria-label="Notifications">
                <Link href="/notifications"><Bell className="h-4 w-4" /></Link>
              </Button>
              <Link href={`/profile/${user.username}`} aria-label="Profile"><Avatar name={user.name} className="h-9 w-9" /></Link>
              <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild><Link href="/login">Login</Link></Button>
              <Button size="sm" asChild><Link href="/signup">Join</Link></Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
