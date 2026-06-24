import { cn } from "@/lib/utils"
import { GradientText } from "@/components/ui/GradientText"

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
        <p className="text-xs font-mono font-medium tracking-widest uppercase text-purple-500 mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-purple-50 leading-tight">
        {titleParts[0]}
        {highlight && <GradientText>{highlight}</GradientText>}
        {titleParts[1]}
      </h2>
      {description && (
        <p className="mt-4 text-purple-300/80 text-base leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}
