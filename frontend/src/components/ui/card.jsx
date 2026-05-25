import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }) {
  return <div className={cn("glass rounded-lg p-5", className)} {...props} />;
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("mb-4 flex items-start justify-between gap-4", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("grid gap-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return <div className={cn("mt-5 flex flex-wrap items-center justify-end gap-3 border-t border-white/10 pt-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("font-display text-lg font-semibold text-white", className)} {...props} />;
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm leading-6 text-white/58", className)} {...props} />;
}
