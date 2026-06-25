"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sparkles } from "lucide-react"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useRecruiterMode } from "@/components/sections/RecruiterMode"
import { useLanguage } from "@/hooks/useLanguage"
import { useT } from "@/hooks/useT"

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

function LanguageToggle() {
  const { lang, toggle } = useLanguage()

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-mono font-semibold
        border border-border-subtle hover:border-border-glow transition-all duration-150 cursor-pointer"
      aria-label={`Switch to ${lang === "en" ? "Portuguese" : "English"}`}
    >
      <span className={lang === "en" ? "text-text-secondary" : "text-text-muted"}>EN</span>
      <span className="text-text-muted mx-0.5">/</span>
      <span className={lang === "pt" ? "text-text-secondary" : "text-text-muted"}>PT</span>
    </button>
  )
}

export function Navbar() {
  const active = useActiveSection()
  const { open } = useRecruiterMode()
  const t = useT()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { id: "projects", label: t.nav.projects },
    { id: "architecture", label: t.nav.architecture },
    { id: "about", label: t.nav.about },
    { id: "skills", label: t.nav.skills },
    { id: "timeline", label: t.nav.timeline },
    { id: "ai-assistant", label: t.nav.ai },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop floating pill */}
      <div className="hidden md:flex justify-center pt-6 px-4">
        <nav
          className={`flex items-center gap-1 rounded-full border px-5 h-12 transition-all duration-300 ${
            scrolled
              ? "border-border-subtle bg-void-900/80 backdrop-blur-xl shadow-[0_0_30px_rgba(244,63,114,0.15)]"
              : "border-border-subtle/50 bg-void-900/40 backdrop-blur-xl"
          }`}
        >
          <button
            onClick={() => scrollTo("hero")}
            className="font-serif italic text-accent-soft text-sm font-bold mr-3 cursor-pointer hover:text-accent transition-colors"
            aria-label="Go to top"
          >
            KM
          </button>

          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                active === id
                  ? "text-accent-soft bg-accent/15"
                  : "text-text-muted hover:text-text-secondary hover:bg-accent/10"
              }`}
            >
              {label}
            </button>
          ))}

          <div className="w-px h-4 bg-border-subtle mx-2" aria-hidden="true" />

          <LanguageToggle />

          <button
            onClick={open}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
              bg-accent text-white hover:bg-accent-dim transition-all duration-150 cursor-pointer ml-1
              shadow-[0_0_16px_rgba(244,63,114,0.3)]"
            aria-label="Open recruiter mode"
          >
            <Sparkles size={11} />
            {t.nav.recruiterMode}
          </button>
        </nav>
      </div>

      {/* Mobile bar */}
      <div
        className={`md:hidden transition-all duration-300 ${
          scrolled || mobileOpen
            ? "border-b border-border-subtle bg-void-900/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-serif italic text-accent-soft text-sm font-bold cursor-pointer"
            aria-label="Go to top"
          >
            KM
          </button>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-lg text-text-muted hover:bg-accent/10 transition-colors cursor-pointer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border-subtle bg-void-900/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => { scrollTo(id); setMobileOpen(false) }}
                  className={`px-3 py-2.5 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                    active === id
                      ? "text-accent-soft bg-accent/15"
                      : "text-text-muted hover:text-text-secondary hover:bg-accent/10"
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => { open(); setMobileOpen(false) }}
                className="mt-2 flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold
                  bg-accent text-white cursor-pointer"
              >
                <Sparkles size={14} />
                {t.nav.recruiterMode}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
