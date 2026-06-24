import { cn } from "@/lib/utils"

type BadgeVariant = "live" | "dev" | "open-source" | "purple" | "green" | "amber"

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  live: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300",
  dev: "bg-amber-500/15 border-amber-500/40 text-amber-300",
  "open-source": "bg-purple-500/15 border-purple-500/40 text-purple-300",
  purple: "bg-purple-500/15 border-purple-500/40 text-purple-300",
  green: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300",
  amber: "bg-amber-500/15 border-amber-500/40 text-amber-300",
}

export function Badge({ variant = "purple", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
