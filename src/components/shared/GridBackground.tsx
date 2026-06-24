import { cn } from "@/lib/utils"

interface GridBackgroundProps {
  className?: string
}

export function GridBackground({ className }: GridBackgroundProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, #a855f7 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Radial fade mask */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, #0d0d1a 80%)",
        }}
      />
    </div>
  )
}
