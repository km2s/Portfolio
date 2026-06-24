"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sparkles } from "lucide-react"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useRecruiterMode } from "@/components/sections/RecruiterMode"
import { useLanguage } from "@/hooks/useLanguage"
import { useT } from "@/hooks/useT"
import { GradientText } from "@/components/ui/GradientText"

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

function LanguageToggle() {
  const { lang, toggle } = useLanguage()

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-mono font-semibold
        border border-purple-900/50 hover:border-purple-500/40 transition-all duration-150 cursor-pointer"
      aria-label={`Switch to ${lang === "en" ? "Portuguese" : "English"}`}
    >
      <span className={lang === "en" ? "text-purple-200" : "text-purple-600"}>EN</span>
      <span className="text-purple-800 mx-0.5">/</span>
      <span className={lang === "pt" ? "text-purple-200" : "text-purple-600"}>PT</span>
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
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? "border-b border-purple-900/40 bg-void-900/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="text-sm font-bold font-mono tracking-tight cursor-pointer"
          aria-label="Go to top"
        >
          <GradientText>km2s</GradientText>
          <span className="text-purple-500 ml-0.5 animate-blink">_</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                active === id
                  ? "text-purple-300 bg-purple-500/15"
                  : "text-purple-500 hover:text-purple-300 hover:bg-purple-500/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right: language toggle + recruiter button */}
        <div className="flex items-center gap-2">
          <LanguageToggle />

          <button
            onClick={open}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
              bg-purple-500/15 border border-purple-500/30 text-purple-300
              hover:bg-purple-500/25 hover:border-purple-400/50 transition-all duration-150 cursor-pointer"
            aria-label="Open recruiter mode"
          >
            <Sparkles size={13} />
            {t.nav.recruiterMode}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-purple-400 hover:bg-purple-500/10 transition-colors cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-purple-900/40 bg-void-900/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => { scrollTo(id); setMobileOpen(false) }}
                  className={`px-3 py-2.5 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                    active === id
                      ? "text-purple-200 bg-purple-500/15"
                      : "text-purple-400 hover:text-purple-200 hover:bg-purple-500/10"
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => { open(); setMobileOpen(false) }}
                className="mt-2 flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold
                  bg-purple-500/15 border border-purple-500/30 text-purple-300 cursor-pointer"
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
