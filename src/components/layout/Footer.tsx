"use client"

import { Github, Mail, Linkedin } from "lucide-react"
import { GradientText } from "@/components/ui/GradientText"
import { useT } from "@/hooks/useT"

export function Footer() {
  const t = useT()
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="border-t border-purple-900/40 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold font-mono">
              <GradientText>Karine Miranda</GradientText>
            </p>
            <p className="text-xs text-purple-600 mt-0.5">{t.footer.role}</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/km2s"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-purple-500 hover:text-purple-300 transition-colors"
              aria-label="GitHub"
            >
              <Github size={14} />
              km2s
            </a>
            <a
              href="https://linkedin.com/in/karinems"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-purple-500 hover:text-purple-300 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
              karinems
            </a>
            <a
              href="mailto:karinemsilva245@gmail.com"
              className="flex items-center gap-1.5 text-xs text-purple-500 hover:text-purple-300 transition-colors"
              aria-label="Email"
            >
              <Mail size={14} />
              karinemsilva245@gmail.com
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-purple-700 font-mono text-center">
            © {currentYear} · {t.footer.built}
          </p>
        </div>
      </div>
    </footer>
  )
}
