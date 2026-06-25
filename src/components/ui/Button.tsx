import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  children: ReactNode
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer",
        size === "sm" && "text-sm px-4 py-2",
        size === "md" && "text-sm px-5 py-2.5",
        size === "lg" && "text-base px-6 py-3",
        variant === "primary" && [
          "bg-accent text-white",
          "hover:bg-accent-dim hover:scale-[1.02] active:scale-[0.98]",
          "shadow-[0_0_20px_rgba(244,63,114,0.3)] hover:shadow-[0_0_28px_rgba(244,63,114,0.45)]",
        ],
        variant === "ghost" && [
          "text-text-secondary hover:text-text-primary",
          "hover:bg-accent/10",
        ],
        variant === "outline" && [
          "border border-border-subtle text-text-secondary",
          "hover:border-border-glow hover:bg-accent/10 hover:text-text-primary",
        ],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
