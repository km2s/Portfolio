import { cn } from "@/lib/utils"

interface StatusDotProps {
  status?: "available" | "busy" | "away"
  className?: string
}

const colors = {
  available: "bg-emerald-400",
  busy: "bg-amber-400",
  away: "bg-slate-400",
}

const rings = {
  available: "bg-emerald-400/40",
  busy: "bg-amber-400/40",
  away: "bg-slate-400/40",
}

export function StatusDot({ status = "available", className }: StatusDotProps) {
  return (
    <span className={cn("relative inline-flex h-2.5 w-2.5", className)}>
      <span
        className={cn(
          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
          rings[status]
        )}
      />
      <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", colors[status])} />
    </span>
  )
}
