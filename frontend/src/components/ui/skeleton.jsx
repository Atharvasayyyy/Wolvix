import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }) {
  return <div className={cn("animate-pulse rounded-lg bg-white/10", className)} {...props} />;
}

export function Loader({ label = "Loading", className, ...props }) {
  return (
    <div className={cn("flex items-center gap-3 text-sm text-white/58", className)} role="status" {...props}>
      <span className="h-2.5 w-2.5 animate-ping rounded-full bg-cyan" aria-hidden="true" />
      {label}
    </div>
  );
}
