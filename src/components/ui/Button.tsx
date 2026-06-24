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
          "bg-gradient-to-r from-purple-700 to-purple-500 text-white",
          "hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
          "shadow-lg shadow-purple-900/40",
        ],
        variant === "ghost" && [
          "text-purple-300 hover:text-purple-200",
          "hover:bg-purple-500/10",
        ],
        variant === "outline" && [
          "border border-purple-500/50 text-purple-300",
          "hover:border-purple-400/70 hover:bg-purple-500/10 hover:text-purple-200",
        ],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
