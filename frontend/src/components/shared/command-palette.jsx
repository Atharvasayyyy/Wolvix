"use client";

import { Link } from "@/lib/router";
import { Search } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUiStore } from "@/store/ui-store";

const commands = [
  ["/ideas", "Explore ideas"],
  ["/ideas/create", "Create idea"],
  ["/projects", "Joined projects"],
  ["/teams", "Community teams"],
  ["/notifications", "Notifications"],
  ["/leaderboard", "Leaderboard"],
  ["/launches", "Product launches"],
  ["/hiring", "Hiring"],
  ["/ai-tools", "AI tools"]
];

export function CommandPalette() {
  const open = useUiStore((state) => state.commandOpen);
  const setOpen = useUiStore((state) => state.setCommandOpen);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} title="Command center">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-white/38" />
        <Input className="pl-9" placeholder="Search Wolvix routes, builders, ideas..." />
      </div>
      <div className="mt-4 grid gap-2">
        {commands.map(([href, label]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/72 hover:bg-white/10 hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </Dialog>
  );
}
