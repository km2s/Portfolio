"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { skills } from "@/data/skills"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Card } from "@/components/ui/Card"
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

const categoryTabColors: Record<SkillCategory, string> = {
  Frontend: "bg-accent/15 border-border-glow text-accent-soft",
  Backend: "bg-accent-dim/20 border-accent-dim/50 text-accent",
  Database: "bg-accent-gold/20 border-accent-gold/40 text-amber-300",
  Cloud: "bg-accent/15 border-border-subtle text-text-secondary",
  AI: "bg-accent-soft/15 border-accent-soft/40 text-accent-soft",
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
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary">{name}</span>
        <div className="flex items-center gap-2">
          {yearsOfExperience && (
            <span className="text-xs font-mono text-text-muted">
              {lang === "pt"
                ? `${yearsOfExperience}ano${yearsOfExperience > 1 ? "s" : ""}`
                : `${yearsOfExperience}yr${yearsOfExperience > 1 ? "s" : ""}`}
            </span>
          )}
          <span className="text-xs font-mono text-text-secondary">{level}%</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-void-800 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.07, duration: 0.8, ease: [0.0, 0.0, 0.2, 1] }}
          style={{ transformOrigin: "left", width: `${level}%` }}
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
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
        <AnimatedSection delay={0.1} className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? categoryTabColors[cat]
                  : "border-transparent text-text-muted hover:bg-accent/10 hover:text-text-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </AnimatedSection>

        {/* Skills grid */}
        <AnimatedSection delay={0.15}>
          <Card className="p-4 sm:p-8">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 gap-x-12 gap-y-4"
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
            <Card key={label} className="p-4 text-center">
              <p className="text-2xl font-bold text-accent-gold font-mono">{value}</p>
              <p className="text-xs font-semibold text-text-secondary mt-0.5">{label}</p>
              <p className="text-xs text-text-muted mt-1">{sub}</p>
            </Card>
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}
