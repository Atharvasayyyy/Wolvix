import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }) {
  return <span className={cn("inline-flex items-center rounded-full border border-white/12 bg-white/8 px-2.5 py-1 text-xs font-semibold text-white/74", className)} {...props} />;
}
