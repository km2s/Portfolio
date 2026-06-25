import { cn } from "@/lib/utils"

type BadgeVariant = "live" | "dev" | "open-source" | "purple" | "green" | "amber"

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  live: "bg-accent/15 border-border-subtle text-accent-soft",
  dev: "bg-amber-500/15 border-amber-500/40 text-amber-300",
  "open-source": "bg-accent/10 border-border-subtle text-text-secondary",
  purple: "bg-accent/10 border-border-subtle text-text-secondary",
  green: "bg-accent/15 border-border-subtle text-accent-soft",
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
