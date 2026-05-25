import { cn } from "@/lib/utils";

export function Avatar({ src, name, className }) {
  const initials = (name || "W").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className={cn("grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-white/12 bg-white/10 text-sm font-bold text-cyan", className)}>
      {src ? <img src={src} alt={name || "Avatar"} className="h-full w-full object-cover" /> : initials}
    </div>
  );
}
