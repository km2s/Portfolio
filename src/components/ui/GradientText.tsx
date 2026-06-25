import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  as?: "span" | "h1" | "h2" | "h3" | "p"
}

export function GradientText({ children, className, as: Tag = "span" }: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r from-accent via-accent-soft to-accent",
        "bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </Tag>
  )
}
