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
  { text: "const karine = {", color: "text-purple-300" },
  { text: '  role: "Full Stack Engineer",', color: "text-purple-200" },
  { text: '  company: "Globo",', color: "text-purple-200" },
  { text: '  location: "Rio de Janeiro, BR 🇧🇷",', color: "text-purple-200" },
  { text: "  education: [", color: "text-purple-200" },
  { text: '    "Computer Science — IBMR",', color: "text-emerald-300" },
  { text: '    "Systems Analysis — Veiga de Almeida",', color: "text-emerald-300" },
  { text: "  ],",  color: "text-purple-200" },
  { text: "  globoStack: [", color: "text-purple-200" },
  { text: '    "Vue.js", "TypeScript", "Vuetify",', color: "text-purple-400" },
  { text: "  ],", color: "text-purple-200" },
  { text: "  personalStack: [", color: "text-purple-200" },
  { text: '    "Next.js", "FastAPI", "PostgreSQL",', color: "text-purple-400" },
  { text: "  ],", color: "text-purple-200" },
  { text: '  openTo: "Remote worldwide",', color: "text-amber-300" },
  { text: "}", color: "text-purple-300" },
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
            <p className="text-purple-300/90 leading-relaxed">{t.about.summary1}</p>
            <p className="text-purple-300/80 leading-relaxed">{t.about.summary2}</p>

            {/* Info blocks */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-void-800/60 border border-purple-900/40">
                <Briefcase size={18} className="text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-purple-200">{t.about.roleTitle}</p>
                  <p className="text-sm text-purple-400">{t.about.company}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-void-800/60 border border-purple-900/40">
                <GraduationCap size={18} className="text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-purple-300">{t.about.educationLabel}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-void-800/60 border border-purple-900/40">
                <MapPin size={18} className="text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-purple-200">{t.about.locationLabel}</p>
                  <p className="text-sm text-purple-400">{t.about.locationSub}</p>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-purple-500" />
                <p className="text-xs font-mono text-purple-500 tracking-wider uppercase">{t.about.interests}</p>
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

          {/* Right: terminal */}
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

              <div className="mt-6 pt-4 border-t border-purple-900/40">
                <p className="text-xs font-mono text-purple-600 mb-2 tracking-wider uppercase">
                  {t.about.studying}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["C/C++", "Flutter", "Data Science", "PyTorch", "Java"].map((s) => (
                    <span
                      key={s}
                      className="text-xs font-mono bg-purple-500/10 border border-purple-500/25 text-purple-400 px-2 py-0.5 rounded"
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
