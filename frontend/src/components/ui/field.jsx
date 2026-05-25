import { cn } from "@/lib/utils";

export function Field({ children, className, error, hint, htmlFor, label, ...props }) {
  return (
    <div className={cn("grid gap-2", className)} {...props}>
      {label && (
        <label className="text-sm font-semibold text-white/76" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {error ? <p className="text-sm text-rose">{error}</p> : hint ? <p className="text-sm text-white/48">{hint}</p> : null}
    </div>
  );
}
