"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, Download, Mail, Github, Briefcase, GraduationCap, Globe,
  CheckCircle2, ExternalLink, Sparkles, Linkedin, Phone,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Tag } from "@/components/ui/Tag"
import { featuredProjects } from "@/data/projects"
import { useT } from "@/hooks/useT"
import { useLanguage } from "@/hooks/useLanguage"

interface RecruiterContextType {
  isOpen: boolean
  open: () => void
  close: () => void
}

const RecruiterContext = createContext<RecruiterContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
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
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={open}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full
            bg-accent text-white text-sm font-semibold
            shadow-lg shadow-[0_0_20px_rgba(244,63,114,0.35)] hover:brightness-110 hover:scale-105 active:scale-95
            transition-all duration-200 cursor-pointer"
          aria-label="Open recruiter mode"
        >
          <Sparkles size={16} />
          {t.recruiter.title}
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-accent">{icon}</span>
      <p className="text-xs font-mono text-accent tracking-wider uppercase">{label}</p>
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.0, 0.0, 0.2, 1] }}
            className="fixed right-0 top-0 h-full z-50 w-full sm:w-120
              bg-void-900 border-l border-border-subtle overflow-y-auto
              shadow-[-20px_0_60px_rgba(244,63,114,0.12)]"
            role="dialog"
            aria-label={r.title}
            aria-modal="true"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6
              border-b border-border-subtle bg-void-900/95 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-accent" />
                <div>
                  <h2 className="text-base font-bold text-text-primary">{r.title}</h2>
                  <p className="text-xs text-text-muted font-mono">{r.subtitle}</p>
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

            <div className="p-6 flex flex-col gap-8">
              {/* Summary */}
              <p className="text-sm text-text-secondary leading-relaxed">{r.summary}</p>

              {/* Experience */}
              <section>
                <SectionLabel icon={<Briefcase size={14} />} label={r.experience} />
                <div className="mt-3 flex flex-col gap-3">
                  {/* Globo */}
                  <div className="p-4 rounded-xl bg-void-800/60 border border-border-subtle">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{r.globoTitle}</p>
                        <p className="text-xs text-text-secondary">{r.globoCompany}</p>
                      </div>
                      <span className="text-xs font-mono text-accent-gold shrink-0">{r.globoPeriod}</span>
                    </div>
                    <ul className="space-y-1">
                      {r.globoHighlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-text-secondary">
                          <CheckCircle2 size={12} className="text-accent mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Equinix */}
                  <div className="p-4 rounded-xl bg-void-800/60 border border-border-subtle">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{r.equinixTitle}</p>
                        <p className="text-xs text-text-secondary">{r.equinixCompany}</p>
                      </div>
                      <span className="text-xs font-mono text-accent-gold shrink-0">{r.equinixPeriod}</span>
                    </div>
                    <ul className="space-y-1">
                      {r.equinixHighlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-text-secondary">
                          <CheckCircle2 size={12} className="text-accent mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section>
                <SectionLabel icon={<GraduationCap size={14} />} label={r.education} />
                <div className="mt-3 flex flex-col gap-2">
                  {r.educationItems.map(({ degree, status, period }) => (
                    <div key={degree} className="flex items-center justify-between p-3 rounded-lg bg-void-800/60 border border-border-subtle">
                      <div>
                        <p className="text-xs font-medium text-text-secondary">{degree}</p>
                        <p className="text-xs text-accent-gold font-mono">{period}</p>
                      </div>
                      <Badge variant="amber">
                        {status === "in-progress" ? (t.recruiter.title === "Recruiter Mode" ? "In Progress" : "Em Andamento") : "Done"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </section>

              {/* Top skills */}
              <section>
                <SectionLabel icon={<CheckCircle2 size={14} />} label={r.topSkills} />
                <div className="mt-3 flex flex-wrap gap-2">
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
                <SectionLabel icon={<ExternalLink size={14} />} label={r.featuredProjects} />
                <div className="mt-3 flex flex-col gap-3">
                  {featuredProjects.map((project) => (
                    <div key={project.id} className="p-4 rounded-xl bg-void-800/60 border border-border-subtle">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-semibold text-text-primary">{project.name}</p>
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-accent/60 hover:text-accent-soft transition-colors"
                            aria-label={`GitHub for ${project.name}`}
                          >
                            <Github size={14} />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed mb-2">
                        {lang === "pt" && project.taglinePt ? project.taglinePt : project.tagline}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 4).map((tech) => (
                          <Tag key={tech.name} className="text-[10px]">{tech.name}</Tag>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Open to */}
              <section>
                <SectionLabel icon={<Globe size={14} />} label={r.openTo} />
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.openToItems.map((item) => (
                    <Badge key={item} variant="green">
                      <CheckCircle2 size={10} />
                      {item}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* CTAs */}
              <section className="flex flex-col gap-3 pt-2 border-t border-border-subtle">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    const a = document.createElement("a")
                    a.href = lang === "pt"
                      ? "/resume/Karine_Miranda_CV.pdf"
                      : "/resume/Karine_Miranda_Silva_CV.pdf"
                    a.download = lang === "pt"
                      ? "Karine_Miranda_CV.pdf"
                      : "Karine_Miranda_Silva_CV.pdf"
                    a.click()
                  }}
                >
                  <Download size={16} />
                  {r.downloadResume}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => window.open("mailto:karinemsilva245@gmail.com")}
                >
                  <Mail size={16} />
                  <span className="truncate">karinemsilva245@gmail.com</span>
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full"
                    onClick={() => window.open("https://linkedin.com/in/karinems", "_blank")}
                  >
                    <Linkedin size={16} />
                    karinems
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full"
                    onClick={() => window.open("https://github.com/km2s", "_blank")}
                  >
                    <Github size={16} />
                    km2s
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => window.open("tel:+5521990617617")}
                >
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
