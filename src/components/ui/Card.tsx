import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-void-800/80 backdrop-blur-sm",
        "border-purple-900/40",
        hover && "transition-all duration-300 hover:border-purple-500/50 hover:-translate-y-0.5",
        hover && "hover:shadow-[0_0_40px_rgba(168,85,247,0.12)]",
        className
      )}
    >
      {children}
    </div>
  )
}
