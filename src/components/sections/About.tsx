"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap, MapPin, Sparkles } from "lucide-react"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { TerminalWindow } from "@/components/shared/TerminalWindow"
import { Tag } from "@/components/ui/Tag"
import { useT } from "@/hooks/useT"

const interests = [
  "AI & LLMs",
  "Software Architecture",
  "Developer Tools",
  "Full Stack Engineering",
  "Open Source",
  "System Design",
  "TypeScript",
  "Python",
]

const codeLines = [
  { text: "const karine = {", color: "text-accent" },
  { text: '  role: "Full Stack Engineer",', color: "text-accent-soft" },
  { text: '  company: "Globo",', color: "text-accent-soft" },
  { text: '  location: "Rio de Janeiro, BR 🇧🇷",', color: "text-accent-soft" },
  { text: "  education: [", color: "text-accent-soft" },
  { text: '    "Computer Science — IBMR",', color: "text-accent-gold" },
  { text: '    "Systems Analysis — Veiga de Almeida",', color: "text-accent-gold" },
  { text: "  ],",  color: "text-accent-soft" },
  { text: "  globoStack: [", color: "text-accent-soft" },
  { text: '    "Vue.js", "TypeScript", "Vuetify",', color: "text-text-secondary" },
  { text: "  ],", color: "text-accent-soft" },
  { text: "  personalStack: [", color: "text-accent-soft" },
  { text: '    "Next.js", "FastAPI", "PostgreSQL",', color: "text-text-secondary" },
  { text: "  ],", color: "text-accent-soft" },
  { text: '  openTo: "Remote worldwide",', color: "text-accent-gold" },
  { text: "}", color: "text-accent" },
]

export function About() {
  const t = useT()

  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16">
          <SectionHeader
            label={t.about.label}
            title={t.about.title}
            highlight={t.about.highlight}
            description={t.about.description}
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: text content */}
          <AnimatedSection className="flex flex-col gap-8">
            <p className="text-text-primary/70 leading-relaxed">{t.about.summary1}</p>
            <p className="text-text-primary/60 leading-relaxed">{t.about.summary2}</p>

            {/* Info blocks */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-void-800/60 border border-border-subtle">
                <Briefcase size={18} className="text-accent-soft mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.about.roleTitle}</p>
                  <p className="text-sm text-text-secondary">{t.about.company}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-void-800/60 border border-border-subtle">
                <GraduationCap size={18} className="text-accent-soft mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-text-primary/70">{t.about.educationLabel}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-void-800/60 border border-border-subtle">
                <MapPin size={18} className="text-accent-soft mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.about.locationLabel}</p>
                  <p className="text-sm text-text-secondary">{t.about.locationSub}</p>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-accent" />
                <p className="text-xs font-mono text-accent tracking-wider uppercase">{t.about.interests}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, i) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <Tag>{interest}</Tag>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right: glass code panel */}
          <AnimatedSection delay={0.2}>
            <TerminalWindow title={t.about.terminalTitle}>
              <div className="space-y-0.5">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className={`${line.color} leading-6 text-sm`}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle">
                <p className="text-xs font-mono text-text-muted mb-2 tracking-wider uppercase">
                  {t.about.studying}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["C/C++", "Flutter", "Data Science", "PyTorch", "Java"].map((s) => (
                    <span
                      key={s}
                      className="text-xs font-mono bg-accent/10 border border-border-subtle text-text-secondary px-2 py-0.5 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </TerminalWindow>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
