"use client"


import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { skills } from "@/data/skills"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Card } from "@/components/portfolio-ui/Card"
import { useT } from "@/hooks/useT"
import { useLanguage } from "@/hooks/useLanguage"
import type { SkillCategory } from "@/types"

const categories: SkillCategory[] = ["Frontend", "Backend", "Database", "Cloud", "AI"]

const categoryColors: Record<SkillCategory, string> = {
  Frontend: "from-accent to-accent-soft",
  Backend: "from-accent-dim to-accent",
  Database: "from-accent-gold to-amber-300",
  Cloud: "from-accent to-accent-soft",
  AI: "from-accent-soft to-accent-gold",
}

// Active category styles handled via shared motion pill below.

function levelLabel(level: number, lang: "en" | "pt") {
  if (level >= 90) return lang === "pt" ? "Especialista" : "Expert"
  if (level >= 75) return lang === "pt" ? "Avançado" : "Advanced"
  if (level >= 60) return lang === "pt" ? "Proficiente" : "Proficient"
  return lang === "pt" ? "Aprendendo" : "Learning"
}

function SkillBar({
  name, level, yearsOfExperience, gradient, index, lang,
}: {
  name: string
  level: number
  yearsOfExperience?: number
  gradient: string
  index: number
  lang: "en" | "pt"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="group flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-text-primary truncate">{name}</span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted group-hover:text-accent-soft transition-colors">
            · {levelLabel(level, lang)}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {yearsOfExperience && (
            <span className="text-[10px] font-mono text-text-muted px-1.5 py-0.5 rounded bg-void-800/60 border border-border-subtle">
              {lang === "pt"
                ? `${yearsOfExperience}ano${yearsOfExperience > 1 ? "s" : ""}`
                : `${yearsOfExperience}yr${yearsOfExperience > 1 ? "s" : ""}`}
            </span>
          )}
          <span className="text-xs font-mono text-accent-gold tabular-nums">{level}%</span>
        </div>
      </div>
      <div className="relative h-1.5 rounded-full bg-void-800 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.07, duration: 0.8, ease: [0.0, 0.0, 0.2, 1] as [number, number, number, number] }}
          style={{ transformOrigin: "left", width: `${level}%` }}
          className={`h-full rounded-full bg-gradient-to-r ${gradient} shadow-[0_0_10px_rgba(244,63,114,0.35)]`}
        />
      </div>
    </div>
  )
}


export function SkillsDashboard() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("Frontend")
  const t = useT()
  const { lang } = useLanguage()
  const filtered = skills.filter((s) => s.category === activeCategory)
  const gradient = categoryColors[activeCategory]

  const summaryStats = [
    { label: t.skills.languages, value: "5+", sub: t.skills.langSub },
    { label: t.skills.frameworks, value: "8+", sub: t.skills.frameworksSub },
    { label: t.skills.databases, value: "5+", sub: t.skills.databasesSub },
    { label: t.skills.cloud, value: "4+", sub: t.skills.cloudSub },
  ]

  return (
    <section id="skills" className="py-20 lg:py-32 border-y border-border-subtle bg-void-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12">
          <SectionHeader
            label={t.skills.label}
            title={t.skills.title}
            highlight={t.skills.highlight}
            description={t.skills.description}
          />
        </AnimatedSection>

        {/* Category tabs */}
        <AnimatedSection delay={0.1} className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-2xl bg-void-900/60 border border-border-subtle backdrop-blur-md w-fit">
          {categories.map((cat) => {
            const count = skills.filter((s) => s.category === cat).length
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  active
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="skill-tab-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/30 via-accent-dim/30 to-accent-gold/20 border border-border-glow shadow-[0_0_24px_rgba(244,63,114,0.25)]"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                )}
                <span className="relative">{cat}</span>
                <span className={`relative text-[10px] font-mono px-1.5 py-0.5 rounded-md ${active ? "bg-void-950/60 text-accent-gold" : "bg-void-800 text-text-muted"}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </AnimatedSection>

        {/* Skills grid */}
        <AnimatedSection delay={0.15}>
          <Card className="p-4 sm:p-8 relative overflow-hidden">
            <div aria-hidden className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl" />

            {/* Card header */}
            <div className="relative flex items-center justify-between mb-6 pb-4 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-accent tracking-[0.2em] uppercase">// stack</span>
                <span className="text-sm font-semibold text-text-primary">{activeCategory}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                {filtered.length} {lang === "pt" ? "tecnologias" : "technologies"}
              </div>
            </div>

            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative grid sm:grid-cols-2 gap-x-12 gap-y-5"
            >
              {filtered.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  yearsOfExperience={skill.yearsOfExperience}
                  gradient={gradient}
                  index={i}
                  lang={lang}
                />
              ))}
            </motion.div>
          </Card>

        </AnimatedSection>

        {/* Summary stats */}
        <AnimatedSection delay={0.2} className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {summaryStats.map(({ label, value, sub }) => (
            <Card
              key={label}
              className="relative p-4 text-center overflow-hidden group hover:border-border-glow transition-all duration-300"
            >
              <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-accent-gold/0 group-hover:from-accent/8 group-hover:to-accent-gold/8 transition-all duration-500" />
              <p className="relative text-2xl font-bold text-accent-gold font-mono">{value}</p>
              <p className="relative text-xs font-semibold text-text-secondary mt-0.5">{label}</p>
              <p className="relative text-xs text-text-muted mt-1">{sub}</p>
            </Card>
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}
