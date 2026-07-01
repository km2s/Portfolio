"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Briefcase, Code2, GraduationCap, Star, type LucideIcon } from "lucide-react"
import { timeline } from "@/data/timeline"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Tag } from "@/components/portfolio-ui/Tag"
import { useT } from "@/hooks/useT"
import { useLanguage } from "@/hooks/useLanguage"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { TimelineType } from "@/types"

const typeConfig: Record<TimelineType, { icon: LucideIcon; color: string; ring: string; glow: string }> = {
  work:      { icon: Briefcase,     color: "text-accent-soft", ring: "border-accent/40",      glow: "rgba(244,63,114,0.55)" },
  project:   { icon: Code2,         color: "text-accent",      ring: "border-accent/60",      glow: "rgba(244,63,114,0.75)" },
  education: { icon: GraduationCap, color: "text-accent-gold", ring: "border-accent-gold/50", glow: "rgba(245,158,11,0.55)" },
  milestone: { icon: Star,          color: "text-accent-soft", ring: "border-accent/40",      glow: "rgba(251,127,160,0.55)" },
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const MONTHS_PT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

type Entry = (typeof timeline)[0]

function NodeIcon({ Icon, color, ring, glow }: { Icon: LucideIcon; color: string; ring: string; glow: string }) {
  return (
    <div className="relative">
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: `0 0 24px ${glow}` }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.1, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className={`relative w-11 h-11 rounded-full border-2 ${ring} flex items-center justify-center bg-void-950 backdrop-blur-md`}>
        <Icon size={16} className={color} />
      </div>
    </div>
  )
}

function EntryCard({ entry, color, glow }: { entry: Entry; color: string; glow: string }) {
  const { lang } = useLanguage()
  const title = lang === "pt" && entry.titlePt ? entry.titlePt : entry.title
  const description = lang === "pt" && entry.descriptionPt ? entry.descriptionPt : entry.description

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative rounded-2xl p-[1px] overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${glow}, transparent 55%, ${glow} 110%)` }}
    >
      <div className="relative rounded-2xl bg-void-900/85 backdrop-blur-md border border-border-subtle p-4 shadow-[0_18px_40px_-22px_rgba(244,63,114,0.55)]">
        <p className={`text-sm font-semibold ${color}`}>{title}</p>
        <p className="mt-1.5 text-xs text-text-primary/65 leading-relaxed">{description}</p>
        {entry.tech && (
          <div className="mt-2 flex flex-wrap gap-1">
            {entry.tech.map((t) => (
              <Tag key={t} className="text-[10px] py-0">{t}</Tag>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function DateLabel({ entry, color }: { entry: Entry; color: string }) {
  const { lang } = useLanguage()
  const months = lang === "pt" ? MONTHS_PT : MONTHS
  return (
    <div className="inline-flex items-baseline gap-2">
      <span className={`font-serif text-3xl font-bold ${color}`}>{entry.year}</span>
      {entry.month && (
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-text-muted">
          {months[entry.month - 1]}
        </span>
      )}
    </div>
  )
}

function DesktopEntry({ entry, index }: { entry: Entry; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" })
  const { icon: Icon, color, ring, glow } = typeConfig[entry.type]
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_56px_1fr] items-center gap-6">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="flex justify-end"
      >
        {isLeft ? (
          <div className="max-w-sm w-full"><EntryCard entry={entry} color={color} glow={glow} /></div>
        ) : (
          <DateLabel entry={entry} color={color} />
        )}
      </motion.div>

      <div className="flex justify-center">
        <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 240 }}>
          <NodeIcon Icon={Icon} color={color} ring={ring} glow={glow} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        {!isLeft ? (
          <div className="max-w-sm"><EntryCard entry={entry} color={color} glow={glow} /></div>
        ) : (
          <DateLabel entry={entry} color={color} />
        )}
      </motion.div>
    </div>
  )
}

export function Timeline() {
  const t = useT()
  const { lang } = useLanguage()
  const reduced = useReducedMotion()
  const months = lang === "pt" ? MONTHS_PT : MONTHS

  const railRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 75%", "end 25%"] })
  const railFill = useTransform(scrollYProgress, [0, 1], reduced ? ["100%", "100%"] : ["0%", "100%"])

  return (
    <section id="timeline" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Ambient gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-[420px] h-[420px] rounded-full blur-[140px]" style={{ background: "rgba(244,63,114,0.08)" }} />
        <div className="absolute bottom-1/4 -right-32 w-[420px] h-[420px] rounded-full blur-[140px]" style={{ background: "rgba(245,158,11,0.06)" }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center">
          <SectionHeader
            label={t.timeline.label}
            title={t.timeline.title}
            highlight={t.timeline.highlight}
            description={t.timeline.description}
            center
          />
        </AnimatedSection>

        {/* Mobile */}
        <div className="sm:hidden flex flex-col gap-5">
          {timeline.map((entry, i) => {
            const { icon: Icon, color, ring, glow } = typeConfig[entry.type]
            const title = lang === "pt" && entry.titlePt ? entry.titlePt : entry.title
            const description = lang === "pt" && entry.descriptionPt ? entry.descriptionPt : entry.description
            return (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="flex gap-4 items-start">
                  <NodeIcon Icon={Icon} color={color} ring={ring} glow={glow} />
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm font-semibold ${color} truncate`}>{title}</p>
                      <span className="text-[10px] font-mono text-accent-gold shrink-0">
                        {entry.month ? `${months[entry.month - 1]} ` : ""}{entry.year}
                      </span>
                    </div>
                    <p className="text-xs text-text-primary/60 leading-relaxed">{description}</p>
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

        {/* Desktop */}
        <div ref={railRef} className="hidden sm:block relative">
          {/* Background rail */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border-subtle/50" />
          {/* Animated fill rail */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full"
            style={{
              height: railFill,
              background: "linear-gradient(to bottom, var(--accent), #f59e0b 60%, transparent)",
              boxShadow: "0 0 20px rgba(244,63,114,0.6)",
            }}
          />
          <div className="flex flex-col gap-12 relative">
            {timeline.map((entry, i) => (
              <DesktopEntry key={i} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
