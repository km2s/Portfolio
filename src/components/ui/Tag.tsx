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
        "bg-purple-500/10 border border-purple-500/25 text-purple-300",
        "hover:border-purple-400/50 hover:bg-purple-500/15 transition-colors duration-150",
        className
      )}
    >
      {children}
    </span>
  )
}
