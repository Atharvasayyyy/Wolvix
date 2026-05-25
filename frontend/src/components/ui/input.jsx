import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input ref={ref} className={cn("focus-ring h-11 w-full rounded-lg border border-white/12 bg-black/24 px-3 text-sm text-white placeholder:text-white/35", className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn("focus-ring min-h-28 w-full resize-y rounded-lg border border-white/12 bg-black/24 px-3 py-3 text-sm text-white placeholder:text-white/35", className)} {...props} />
));
Textarea.displayName = "Textarea";
