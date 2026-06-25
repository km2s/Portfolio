import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  label?: string
  title: string
  highlight?: string
  description?: string
  className?: string
  center?: boolean
}

export function SectionHeader({ label, title, highlight, description, className, center = false }: SectionHeaderProps) {
  const titleParts = highlight ? title.split(highlight) : [title]

  return (
    <div className={cn(center && "text-center", className)}>
      {label && (
        <p className="text-xs font-mono font-medium tracking-widest uppercase text-accent mb-3">
          {label}
        </p>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
        {titleParts[0]}
        {highlight && (
          <span className="italic font-normal text-accent-soft">{highlight}</span>
        )}
        {titleParts[1]}
      </h2>
      {description && (
        <p className="mt-4 text-text-primary/60 text-base leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}
