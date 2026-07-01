"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, Download, Mail, Github, Briefcase, GraduationCap, Globe,
  CheckCircle2, ExternalLink, Sparkles, Linkedin, Phone, Zap,
} from "lucide-react"
import { Button } from "@/components/portfolio-ui/Button"
import { Badge } from "@/components/portfolio-ui/Badge"
import { Tag } from "@/components/portfolio-ui/Tag"
import { featuredProjects } from "@/data/projects"
import { useT } from "@/hooks/useT"
import { useLanguage } from "@/hooks/useLanguage"

interface RecruiterContextType {
  isOpen: boolean
  open: () => void
  close: () => void
}

const RecruiterContext = createContext<RecruiterContextType>({
  isOpen: false, open: () => {}, close: () => {},
})

export function RecruiterProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <RecruiterContext.Provider value={{ isOpen, open, close }}>
      {children}
      <RecruiterPanel isOpen={isOpen} close={close} />
      <RecruiterFloatingButton isOpen={isOpen} open={open} />
    </RecruiterContext.Provider>
  )
}

export function useRecruiterMode() {
  return useContext(RecruiterContext)
}

function RecruiterFloatingButton({ isOpen, open }: { isOpen: boolean; open: () => void }) {
  const t = useT()
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="fixed bottom-6 right-6 z-40"
        >
          <motion.button
            onClick={open}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full
              bg-void-900/90 backdrop-blur-xl border border-border-subtle
              hover:border-accent/60 hover:bg-void-800/90
              text-text-primary text-[11px] font-mono uppercase tracking-[0.16em] font-semibold
              shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_30px_-6px_rgba(244,63,114,0.35)]
              transition-all duration-200 cursor-pointer"
            aria-label="Open recruiter mode"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent/15 border border-accent/25 text-accent-soft group-hover:bg-accent/25 transition-colors">
              <Briefcase size={10} strokeWidth={2.5} />
            </span>
            <span>{t.recruiter.title}</span>
            <span className="relative flex items-center justify-center ml-0.5" aria-hidden="true">
              <span className="absolute w-2 h-2 rounded-full bg-emerald-400/40 animate-ping" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="flex items-center justify-center w-6 h-6 rounded-md bg-accent/15 border border-border-subtle text-accent">
        {icon}
      </span>
      <p className="text-[11px] font-mono text-accent tracking-[0.2em] uppercase">{label}</p>
      <div className="flex-1 h-px bg-linear-to-r from-border-subtle to-transparent" />
    </div>
  )
}

function ExperienceCard({ title, company, period, highlights }: { title: string; company: string; period: string; highlights: readonly string[] }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative rounded-xl p-[1px] overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(244,63,114,0.4), transparent 50%, rgba(245,158,11,0.3))" }}
    >
      <div className="rounded-xl bg-void-900/90 backdrop-blur-md p-4">
        <div className="flex items-start justify-between mb-2 gap-3">
          <div>
            <p className="text-sm font-semibold text-text-primary">{title}</p>
            <p className="text-xs text-text-secondary mt-0.5">{company}</p>
          </div>
          <span className="text-[10px] font-mono text-accent-gold shrink-0 px-2 py-1 rounded-md bg-accent-gold/10 border border-accent-gold/20">
            {period}
          </span>
        </div>
        <ul className="space-y-1.5 mt-3">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-text-primary/70 leading-relaxed">
              <CheckCircle2 size={12} className="text-accent mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1 rounded-xl border border-border-subtle bg-void-800/50 px-3 py-2.5 text-center">
      <div className="font-serif text-2xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#f59e0b,#fb7fa0,#f43f72)" }}>
        {value}
      </div>
      <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider mt-0.5">{label}</div>
    </div>
  )
}

function RecruiterPanel({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const t = useT()
  const r = t.recruiter
  const { lang } = useLanguage()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
            onClick={close} aria-hidden="true"
          />

          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed right-0 top-0 h-full z-50 w-full sm:w-[28rem] overflow-y-auto
              bg-void-950 border-l border-border-glow
              shadow-[-30px_0_80px_rgba(244,63,114,0.18)]"
            role="dialog" aria-label={r.title} aria-modal="true"
          >
            {/* Hero header with animated gradient */}
            <div className="relative overflow-hidden border-b border-border-subtle">
              <div aria-hidden className="absolute inset-0 opacity-60"
                style={{ background: "radial-gradient(120% 80% at 0% 0%, rgba(244,63,114,0.35), transparent 60%), radial-gradient(120% 80% at 100% 100%, rgba(245,158,11,0.18), transparent 60%)" }} />
              <motion.div
                aria-hidden
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl"
                style={{ background: "rgba(244,63,114,0.35)" }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative sticky top-0 z-10 flex items-center justify-between p-5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full flex items-center justify-center border border-border-glow"
                    style={{ background: "radial-gradient(circle at 30% 30%, rgba(251,127,160,0.5), rgba(138,26,53,0.7))" }}>
                    <Sparkles size={16} className="text-accent-gold" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-text-primary">{r.title}</h2>
                    <p className="text-[11px] text-text-muted font-mono">{r.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={close}
                  className="p-2 rounded-lg text-text-muted hover:text-accent-soft hover:bg-accent/10 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Stats row */}
              <div className="relative px-5 pb-5 flex gap-2">
                <StatTile value="3+" label={lang === "pt" ? "Anos" : "Years"} />
                <StatTile value="5+" label={lang === "pt" ? "Projetos" : "Projects"} />
                <StatTile value="Full" label="Stack" />
              </div>
            </div>

            <div className="p-5 flex flex-col gap-8">
              {/* Summary */}
              <p className="text-sm text-text-primary/80 leading-relaxed">{r.summary}</p>

              {/* Experience */}
              <section>
                <SectionLabel icon={<Briefcase size={12} />} label={r.experience} />
                <div className="flex flex-col gap-3">
                  <ExperienceCard title={r.globoTitle} company={r.globoCompany} period={r.globoPeriod} highlights={r.globoHighlights} />
                  <ExperienceCard title={r.equinixTitle} company={r.equinixCompany} period={r.equinixPeriod} highlights={r.equinixHighlights} />
                </div>
              </section>

              {/* Education */}
              <section>
                <SectionLabel icon={<GraduationCap size={12} />} label={r.education} />
                <div className="flex flex-col gap-2">
                  {r.educationItems.map(({ degree, status, period }) => (
                    <div key={degree} className="flex items-center justify-between p-3 rounded-lg bg-void-800/60 border border-border-subtle hover:border-border-glow transition-colors">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-text-primary truncate">{degree}</p>
                        <p className="text-[10px] text-accent-gold font-mono mt-0.5">{period}</p>
                      </div>
                      <Badge variant="amber">
                        {status === "in-progress" ? (lang === "pt" ? "Em Andamento" : "In Progress") : "Done"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </section>

              {/* Top skills */}
              <section>
                <SectionLabel icon={<Zap size={12} />} label={r.topSkills} />
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Vue.js", "Vuetify", "TypeScript", "React", "Next.js",
                    "Python", "FastAPI", "PostgreSQL", "Supabase", "Node.js",
                    "TailwindCSS", "Docker",
                  ].map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </section>

              {/* Featured projects */}
              <section>
                <SectionLabel icon={<ExternalLink size={12} />} label={r.featuredProjects} />
                <div className="flex flex-col gap-2.5">
                  {featuredProjects.map((project) => (
                    <motion.a
                      key={project.id}
                      href={project.links.github ?? project.links.live ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ x: 3 }}
                      className="group flex items-start justify-between gap-3 p-3.5 rounded-xl bg-void-800/60 border border-border-subtle hover:border-border-glow transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-text-primary group-hover:text-accent-soft transition-colors">{project.name}</p>
                        <p className="text-xs text-text-primary/60 leading-relaxed mt-1">
                          {lang === "pt" && project.taglinePt ? project.taglinePt : project.tagline}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tech.slice(0, 4).map((tech) => (
                            <Tag key={tech.name} className="text-[10px]">{tech.name}</Tag>
                          ))}
                        </div>
                      </div>
                      <ExternalLink size={14} className="text-text-muted shrink-0 mt-1 group-hover:text-accent transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </section>

              {/* Open to */}
              <section>
                <SectionLabel icon={<Globe size={12} />} label={r.openTo} />
                <div className="flex flex-wrap gap-2">
                  {r.openToItems.map((item) => (
                    <Badge key={item} variant="green">
                      <CheckCircle2 size={10} />
                      {item}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* CTAs */}
              <section className="flex flex-col gap-3 pt-4 border-t border-border-subtle">
                <Button
                  variant="primary" size="lg" className="w-full magnetic"
                  onClick={() => {
                    const a = document.createElement("a")
                    a.href = lang === "pt" ? "/resume/Karine_Miranda_CV.pdf" : "/resume/Karine_Miranda_Silva_CV.pdf"
                    a.download = lang === "pt" ? "Karine_Miranda_CV.pdf" : "Karine_Miranda_Silva_CV.pdf"
                    a.click()
                  }}
                >
                  <Download size={16} />
                  {r.downloadResume}
                </Button>
                <Button
                  variant="outline" size="lg" className="w-full magnetic"
                  onClick={() => window.open("mailto:karinemsilva245@gmail.com")}
                >
                  <Mail size={16} />
                  <span className="truncate">karinemsilva245@gmail.com</span>
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="ghost" size="lg" className="w-full magnetic" onClick={() => window.open("https://linkedin.com/in/karinems", "_blank")}>
                    <Linkedin size={16} />
                    karinems
                  </Button>
                  <Button variant="ghost" size="lg" className="w-full magnetic" onClick={() => window.open("https://github.com/km2s", "_blank")}>
                    <Github size={16} />
                    km2s
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="w-full" onClick={() => window.open("tel:+5521990617617")}>
                  <Phone size={14} />
                  +55 (21) 99061-7617
                </Button>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
