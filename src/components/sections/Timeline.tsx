"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, Code2, GraduationCap, Star } from "lucide-react"
import { timeline } from "@/data/timeline"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Tag } from "@/components/ui/Tag"
import { useT } from "@/hooks/useT"
import { useLanguage } from "@/hooks/useLanguage"
import type { TimelineType } from "@/types"

const typeConfig: Record<TimelineType, { icon: React.ElementType; color: string; bg: string }> = {
  work: { icon: Briefcase, color: "text-blue-400", bg: "bg-blue-500/20 border-blue-500/40" },
  project: { icon: Code2, color: "text-purple-400", bg: "bg-purple-500/20 border-purple-500/40" },
  education: { icon: GraduationCap, color: "text-emerald-400", bg: "bg-emerald-500/20 border-emerald-500/40" },
  milestone: { icon: Star, color: "text-amber-400", bg: "bg-amber-500/20 border-amber-500/40" },
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const MONTHS_PT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

type Entry = (typeof timeline)[0]

function EntryContent({ entry, color }: { entry: Entry; color: string }) {
  const { lang } = useLanguage()
  const title = lang === "pt" && entry.titlePt ? entry.titlePt : entry.title
  const description = lang === "pt" && entry.descriptionPt ? entry.descriptionPt : entry.description

  return (
    <div className="flex flex-col gap-1.5">
      <p className={`text-sm font-semibold ${color}`}>{title}</p>
      <p className="text-xs text-purple-400 leading-relaxed">{description}</p>
      {entry.tech && (
        <div className="flex flex-wrap gap-1 mt-1">
          {entry.tech.map((t) => (
            <Tag key={t} className="text-[10px] py-0">{t}</Tag>
          ))}
        </div>
      )}
    </div>
  )
}

function DateLabel({ entry }: { entry: Entry }) {
  const { lang } = useLanguage()
  const months = lang === "pt" ? MONTHS_PT : MONTHS
  return (
    <p className="text-xs font-mono text-purple-600">
      {entry.month ? `${months[entry.month - 1]} ` : ""}{entry.year}
    </p>
  )
}

function DesktopEntry({ entry, index }: { entry: Entry; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" })
  const { icon: Icon, color, bg } = typeConfig[entry.type]
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_40px_1fr] items-start gap-4">
      {/* Left slot */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-end text-right"
      >
        {isLeft ? (
          <div className="rounded-xl border p-4 bg-void-800/60 border-purple-900/40 hover:border-purple-500/40 transition-colors max-w-sm w-full text-left">
            <EntryContent entry={entry} color={color} />
          </div>
        ) : (
          <DateLabel entry={entry} />
        )}
      </motion.div>

      {/* Center dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.05 }}
          className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${bg}`}
        >
          <Icon size={15} className={color} />
        </motion.div>
      </div>

      {/* Right slot */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {!isLeft ? (
          <div className="rounded-xl border p-4 bg-void-800/60 border-purple-900/40 hover:border-purple-500/40 transition-colors max-w-sm">
            <EntryContent entry={entry} color={color} />
          </div>
        ) : (
          <DateLabel entry={entry} />
        )}
      </motion.div>
    </div>
  )
}

export function Timeline() {
  const t = useT()
  const { lang } = useLanguage()
  const months = lang === "pt" ? MONTHS_PT : MONTHS

  return (
    <section id="timeline" className="py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center">
          <SectionHeader
            label={t.timeline.label}
            title={t.timeline.title}
            highlight={t.timeline.highlight}
            description={t.timeline.description}
            center
          />
        </AnimatedSection>

        {/* Mobile: simple vertical stack */}
        <div className="sm:hidden flex flex-col gap-4">
          {timeline.map((entry, i) => {
            const { icon: Icon, color, bg } = typeConfig[entry.type]
            const title = lang === "pt" && entry.titlePt ? entry.titlePt : entry.title
            const description = lang === "pt" && entry.descriptionPt ? entry.descriptionPt : entry.description
            return (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="flex gap-4 items-start">
                  <div className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${bg}`}>
                    <Icon size={15} className={color} />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-semibold ${color}`}>{title}</p>
                      <span className="text-xs font-mono text-purple-600">
                        {entry.month ? `${months[entry.month - 1]} ` : ""}{entry.year}
                      </span>
                    </div>
                    <p className="text-xs text-purple-400 leading-relaxed">{description}</p>
                    {entry.tech && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {entry.tech.map((tech) => (
                          <Tag key={tech} className="text-[10px] py-0">{tech}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>

        {/* Desktop: two-column timeline */}
        <div className="hidden sm:block relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-purple-800/50 to-transparent" />
          <div className="flex flex-col gap-8">
            {timeline.map((entry, i) => (
              <DesktopEntry key={i} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
