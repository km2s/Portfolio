"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download, Github, Terminal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { StatusDot } from "@/components/ui/StatusDot"
import { GradientText } from "@/components/ui/GradientText"
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] } },
})

const codeLines = [
  { indent: 0, text: "const karine = {", color: "text-purple-300" },
  { indent: 1, text: 'role: "Full Stack Engineer",', color: "text-purple-200" },
  { indent: 1, text: 'company: "Globo",', color: "text-purple-200" },
  { indent: 1, text: "languages: [", color: "text-purple-200" },
  { indent: 2, text: '"TypeScript", "Python",', color: "text-emerald-300" },
  { indent: 2, text: '"JavaScript",', color: "text-emerald-300" },
  { indent: 1, text: "],", color: "text-purple-200" },
  { indent: 1, text: "stack: [", color: "text-purple-200" },
  { indent: 2, text: '"Vue.js", "Vuetify", "Next.js",', color: "text-purple-400" },
  { indent: 2, text: '"FastAPI", "PostgreSQL",', color: "text-purple-400" },
  { indent: 1, text: "],", color: "text-purple-200" },
  { indent: 1, text: 'ai: ["OpenAI", "Ollama"],', color: "text-purple-200" },
  { indent: 1, text: 'openTo: "Remote worldwide",', color: "text-amber-300" },
  { indent: 0, text: "}", color: "text-purple-300" },
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

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% -10%, rgba(107,33,168,0.35) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 0% 80%, rgba(76,0,130,0.25) 0%, transparent 50%)",
        }}
      />

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
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                <StatusDot status="available" />
                {t.hero.available}
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants(reduced)}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
                <GradientText>Karine</GradientText>
                <br />
                <span className="text-purple-100">Miranda</span>
              </h1>
            </motion.div>

            {/* Role + company */}
            <motion.div variants={itemVariants(reduced)} className="flex flex-col gap-1">
              <p className="text-xl sm:text-2xl text-purple-200 font-medium">{t.hero.role}</p>
              <p className="text-base text-purple-400 font-mono">
                @ Globo —{" "}
                <span className="text-purple-300">{t.hero.company}</span>
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p variants={itemVariants(reduced)} className="text-purple-300/90 text-base leading-relaxed max-w-md">
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
            <motion.div variants={itemVariants(reduced)} className="flex gap-6 pt-2 border-t border-purple-900/40">
              {[
                { label: t.hero.statProjects, value: "5+" },
                { label: t.hero.statYears, value: "3+" },
                { label: t.hero.statStack, value: "Full" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-2xl font-bold text-purple-200">{value}</span>
                  <span className="text-xs text-purple-500">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: terminal visual */}
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.0, 0.0, 0.2, 1] }}
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
                  className="text-purple-500 mt-2"
                >
                  <span className="text-purple-600">$ </span>
                  <span className="text-purple-300">{t.hero.terminalOpen}</span>
                  <span className="inline-block w-2 h-4 bg-purple-400 ml-0.5 align-middle animate-blink" />
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-purple-500"
        aria-hidden="true"
      >
        <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-purple-500/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-purple-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
