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
  Frontend: "from-purple-600 to-purple-400",
  Backend: "from-blue-700 to-blue-400",
  Database: "from-emerald-700 to-emerald-400",
  Cloud: "from-amber-700 to-amber-400",
  AI: "from-pink-700 to-pink-400",
}

const categoryTabColors: Record<SkillCategory, string> = {
  Frontend: "bg-purple-500/20 border-purple-500/60 text-purple-200",
  Backend: "bg-blue-500/20 border-blue-500/60 text-blue-200",
  Database: "bg-emerald-500/20 border-emerald-500/60 text-emerald-200",
  Cloud: "bg-amber-500/20 border-amber-500/60 text-amber-200",
  AI: "bg-pink-500/20 border-pink-500/60 text-pink-200",
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
        <span className="text-sm font-medium text-purple-200">{name}</span>
        <div className="flex items-center gap-2">
          {yearsOfExperience && (
            <span className="text-xs font-mono text-purple-500">
              {lang === "pt"
                ? `${yearsOfExperience}ano${yearsOfExperience > 1 ? "s" : ""}`
                : `${yearsOfExperience}yr${yearsOfExperience > 1 ? "s" : ""}`}
            </span>
          )}
          <span className="text-xs font-mono text-purple-400">{level}%</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-purple-900/40 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.07, duration: 0.8, ease: [0.0, 0.0, 0.2, 1] }}
          style={{ transformOrigin: "left", width: `${level}%` }}
          className={`h-full rounded-full bg-linear-to-r ${gradient}`}
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
    <section id="skills" className="py-20 lg:py-32">
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
                  : "border-transparent text-purple-500 hover:bg-purple-500/10 hover:text-purple-400"
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
              <p className="text-2xl font-bold text-purple-300 font-mono">{value}</p>
              <p className="text-xs font-semibold text-purple-400 mt-0.5">{label}</p>
              <p className="text-xs text-purple-600 mt-1">{sub}</p>
            </Card>
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}
