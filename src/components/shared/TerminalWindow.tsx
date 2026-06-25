import { cn } from "@/lib/utils"

interface TerminalWindowProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function TerminalWindow({ title = "terminal", children, className }: TerminalWindowProps) {
  return (
    <div className={cn("relative group", className)}>
      {/* Rose→gold halo */}
      <div
        className="absolute inset-1 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 blur-xl pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(244,63,114,0.6) 0%, rgba(245,158,11,0.3) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Glass card */}
      <div className="relative rounded-2xl border border-border-subtle overflow-hidden bg-void-900/80 backdrop-blur-xl shadow-[0_0_60px_rgba(244,63,114,0.08)]">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-void-800/40">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-accent-dim" />
            <span className="h-3 w-3 rounded-full bg-void-700" />
            <span className="h-3 w-3 rounded-full bg-void-700" />
          </div>
          <span className="text-xs font-mono text-text-muted">{title}</span>
        </div>
        {/* Content */}
        <div className="p-4 font-mono text-sm leading-relaxed">{children}</div>
        {/* Footer gradient line */}
        <div
          className="h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(244,63,114,0.4), transparent)" }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
