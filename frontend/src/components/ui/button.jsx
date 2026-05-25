import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-semibold tracking-normal transition disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-cyan text-slate-950 shadow-[0_0_28px_rgba(53,229,255,0.28)] hover:bg-white",
  secondary: "border border-white/12 bg-white/8 text-white hover:bg-white/14",
  ghost: "text-white/78 hover:bg-white/10 hover:text-white",
  danger: "bg-rose text-white hover:bg-rose/85"
};

const sizes = {
  sm: "h-8 rounded-md px-3 text-xs",
  md: "h-10 px-4",
  lg: "h-12 px-5"
};

export const Button = React.forwardRef(({ asChild = false, children, className, size, variant, ...props }, ref) => {
  const classes = cn(base, variants[variant || "primary"], sizes[size || "md"], className);

  if (asChild && React.isValidElement(children)) {
    const child = children;
    return React.cloneElement(child, {
      ...props,
      className: cn(classes, child.props.className)
    });
  }

  return (
    <button className={classes} ref={ref} type={props.type || "button"} {...props}>
      {children}
    </button>
  );
});
Button.displayName = "Button";

export function buttonVariants({ className, size = "md", variant = "primary" } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}
