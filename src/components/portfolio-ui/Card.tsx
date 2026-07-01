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
        "border-border-subtle",
        hover && "transition-all duration-300 hover:border-border-glow hover:-translate-y-0.5",
        hover && "hover:shadow-[0_0_40px_rgba(244,63,114,0.12)]",
        className
      )}
    >
      {children}
    </div>
  )
}
