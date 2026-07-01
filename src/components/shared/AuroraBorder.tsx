import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Animated rose→gold conic gradient border with deep glassmorphism.
 * Uses CSS background-image on the outer container to draw the aurora,
 * masked off the inner card via padding, avoiding any sibling overlay.
 */
export function AuroraBorder({
  children,
  className,
  innerClassName,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-[1px] aurora-border-shell",
        className
      )}
      style={{ overflow: "clip" }}
    >
      <div
        className={cn(
          "relative rounded-[15px] bg-void-950/95",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
