"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download, Github, Terminal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { StatusDot } from "@/components/ui/StatusDot"
import { GridBackground } from "@/components/shared/GridBackground"
import { TerminalWindow } from "@/components/shared/TerminalWindow"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useT } from "@/hooks/useT"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = (reduced: boolean) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
})

const codeLines = [
  { indent: 0, text: "const karine = {", color: "text-accent" },
  { indent: 1, text: 'role: "Full Stack Engineer",', color: "text-accent-soft" },
  { indent: 1, text: 'company: "Globo",', color: "text-accent-soft" },
  { indent: 1, text: "languages: [", color: "text-accent-soft" },
  { indent: 2, text: '"TypeScript", "Python",', color: "text-accent-gold" },
  { indent: 2, text: '"JavaScript",', color: "text-accent-gold" },
  { indent: 1, text: "],", color: "text-accent-soft" },
  { indent: 1, text: "stack: [", color: "text-accent-soft" },
  { indent: 2, text: '"Vue.js", "Vuetify", "Next.js",', color: "text-text-secondary" },
  { indent: 2, text: '"FastAPI", "PostgreSQL",', color: "text-text-secondary" },
  { indent: 1, text: "],", color: "text-accent-soft" },
  { indent: 1, text: 'ai: ["OpenAI", "Ollama"],', color: "text-accent-soft" },
  { indent: 1, text: 'openTo: "Remote worldwide",', color: "text-accent-gold" },
  { indent: 0, text: "}", color: "text-accent" },
]

export function Hero() {
  const reduced = useReducedMotion()
  const t = useT()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      <GridBackground />

      {/* Ambient bloom globs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full blur-[140px]"
          style={{
            background: "rgba(244, 63, 114, 0.08)",
            animation: reduced ? undefined : "bloom 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{
            background: "rgba(138, 26, 53, 0.18)",
            animation: reduced ? undefined : "bloom 10s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Available badge */}
            <motion.div variants={itemVariants(reduced)}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-accent/30 bg-accent/10 text-accent-soft">
                <StatusDot status="available" />
                {t.hero.available}
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants(reduced)}>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-[-0.01em]">
                <span className="text-text-primary">Karine</span>
                <br />
                <i className="font-normal text-accent-soft">Miranda</i>
              </h1>
            </motion.div>

            {/* Role + company */}
            <motion.div variants={itemVariants(reduced)} className="flex flex-col gap-1">
              <p className="text-xl sm:text-2xl text-text-primary/80 font-medium">{t.hero.role}</p>
              <p className="text-base text-text-muted font-mono">
                @ Globo —{" "}
                <span className="text-text-secondary">{t.hero.company}</span>
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p variants={itemVariants(reduced)} className="text-text-primary/60 text-base leading-relaxed max-w-md">
              {t.hero.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants(reduced)} className="flex flex-wrap gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Terminal size={18} />
                {t.hero.viewProjects}
                <ArrowRight size={16} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const a = document.createElement("a")
                  a.href = "/resume/karine-miranda-cv.pdf"
                  a.download = "Karine-Miranda-Resume.pdf"
                  a.click()
                }}
              >
                <Download size={16} />
                {t.hero.resume}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => window.open("https://github.com/km2s", "_blank")}
                aria-label="GitHub profile"
              >
                <Github size={18} />
                GitHub
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants(reduced)} className="flex gap-6 pt-2 border-t border-border-subtle">
              <dl className="flex gap-6">
                {[
                  { label: t.hero.statProjects, value: "5+" },
                  { label: t.hero.statYears, value: "3+" },
                  { label: t.hero.statStack, value: "Full" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <dt className="sr-only">{label}</dt>
                    <dd className="text-2xl font-bold font-mono text-accent-gold">{value}</dd>
                    <span className="text-xs text-text-muted">{label}</span>
                  </div>
                ))}
              </dl>
            </motion.div>
          </motion.div>

          {/* Right: glass code panel */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
            style={{ animation: reduced ? undefined : "float 6s ease-in-out infinite" }}
          >
            <TerminalWindow title="~/karine/profile.ts">
              <div className="space-y-0.5">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.06, duration: 0.3 }}
                    className={`${line.color} leading-6`}
                    style={{ paddingLeft: `${line.indent * 1.5}rem` }}
                  >
                    {line.text}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + codeLines.length * 0.06 }}
                  className="text-text-muted mt-2"
                >
                  <span className="text-text-muted">$ </span>
                  <span className="text-text-secondary">{t.hero.terminalOpen}</span>
                  <span className="inline-block w-2 h-4 bg-accent ml-0.5 align-middle animate-blink" />
                </motion.div>
              </div>
            </TerminalWindow>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-text-muted">scroll</span>
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
        />
      </motion.div>
    </section>
  )
}
