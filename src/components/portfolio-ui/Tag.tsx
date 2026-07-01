import { cn } from "@/lib/utils"

interface TagProps {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-0.5 rounded-md text-xs font-mono font-medium",
        "bg-accent/10 border border-border-subtle text-text-secondary",
        "hover:border-border-glow hover:bg-accent/15 transition-colors duration-150",
        className
      )}
    >
      {children}
    </span>
  )
}
