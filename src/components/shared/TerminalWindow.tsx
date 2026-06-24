import { cn } from "@/lib/utils"

interface TerminalWindowProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function TerminalWindow({ title = "terminal", children, className }: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-purple-900/50 overflow-hidden",
        "bg-void-950/90 backdrop-blur-sm",
        "shadow-[0_0_60px_rgba(107,33,168,0.15)]",
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-purple-900/40 bg-void-900/60">
        <span className="h-3 w-3 rounded-full bg-red-500/70" />
        <span className="h-3 w-3 rounded-full bg-amber-500/70" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs font-mono text-purple-400/70">{title}</span>
      </div>
      {/* Content */}
      <div className="p-4 font-mono text-sm leading-relaxed">{children}</div>
    </div>
  )
}
