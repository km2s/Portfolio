"use client"


import { motion } from "framer-motion"
import { Briefcase, GraduationCap, MapPin, Sparkles } from "lucide-react"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { TerminalWindow } from "@/components/shared/TerminalWindow"
import { Tag } from "@/components/portfolio-ui/Tag"
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

        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 items-start">
          {/* Left: text content */}
          <AnimatedSection className="flex flex-col gap-8">
            {/* Signature card */}
            <div className="relative rounded-2xl p-[1px] overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(244,63,114,0.35), transparent 45%, rgba(245,158,11,0.25))" }}>
              <div className="relative rounded-[15px] bg-void-900/80 backdrop-blur-md p-6">
                <div aria-hidden className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
                <div className="relative flex items-start gap-4">
                  <div className="relative shrink-0 flex items-center justify-center w-14 h-14 rounded-full border border-border-glow"
                    style={{ background: "radial-gradient(circle at 30% 30%, rgba(251,127,160,0.45), rgba(138,26,53,0.7))" }}>
                    <span className="font-serif italic font-bold text-text-primary text-lg">KM</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-accent tracking-[0.2em] uppercase">// signature</p>
                    <p className="mt-1 font-serif italic text-text-primary text-lg leading-snug">
                      "Software is a craft. I ship products, not tickets."
                    </p>
                    <p className="text-xs text-text-muted font-mono mt-2">— Karine Miranda</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-text-primary/75 leading-relaxed">{t.about.summary1}</p>
            <p className="text-text-primary/60 leading-relaxed">{t.about.summary2}</p>

            {/* Info blocks */}
            <div className="flex flex-col gap-3">
              {[
                { icon: Briefcase, title: t.about.roleTitle, sub: t.about.company },
                { icon: GraduationCap, title: t.about.educationLabel, sub: null },
                { icon: MapPin, title: t.about.locationLabel, sub: t.about.locationSub },
              ].map(({ icon: Icon, title, sub }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group relative flex items-center gap-4 p-4 rounded-xl bg-void-900/60 border border-border-subtle hover:border-border-glow transition-all duration-300 overflow-hidden"
                >
                  <div aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent via-accent-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-border-subtle group-hover:bg-accent/20 group-hover:border-border-glow transition-all">
                    <Icon size={16} className="text-accent-soft" />
                  </div>
                  <div className="relative flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary">{title}</p>
                    {sub && <p className="text-sm text-text-secondary truncate">{sub}</p>}
                  </div>
                  <span aria-hidden className="relative text-[10px] font-mono text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    0{i + 1}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Interests */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-accent" />
                <p className="text-xs font-mono text-accent tracking-wider uppercase">{t.about.interests}</p>
                <div className="flex-1 h-px bg-gradient-to-r from-border-subtle to-transparent" />
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
