import { cn } from "@/lib/utils";

export function Select({ className, invalid = false, children, ...props }) {
  return (
    <select
      aria-invalid={invalid || undefined}
      className={cn("focus-ring h-11 w-full rounded-lg border border-white/12 bg-black/24 px-3 text-sm text-white", className)}
      {...props}
    >
      {children}
    </select>
  );
}
