"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Database, Globe, Server, Zap, Layers, Box } from "lucide-react"
import { projects } from "@/data/projects"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Card } from "@/components/ui/Card"
import { useT } from "@/hooks/useT"
import { useLanguage } from "@/hooks/useLanguage"
import type { ArchitectureLayer } from "@/types"

const layerIcons: Record<string, React.ElementType> = {
  Frontend: Globe,
  Backend: Server,
  Database: Database,
  "External Services": Zap,
  Infrastructure: Box,
}

const layerColors: Record<string, string> = {
  Frontend: "text-accent-soft border-border-glow bg-accent/10",
  Backend: "text-accent border-border-subtle bg-accent/5",
  Database: "text-accent-gold border-accent-gold/30 bg-accent-gold/10",
  "External Services": "text-amber-300 border-amber-400/30 bg-amber-500/10",
  Infrastructure: "text-accent-soft border-border-subtle bg-void-700/40",
}

function ArchNode({ layer, index }: { layer: ArchitectureLayer; index: number }) {
  const [hovered, setHovered] = useState(false)
  const { lang } = useLanguage()
  const Icon = layerIcons[layer.layer] ?? Layers
  const colorClass = layerColors[layer.layer] ?? "text-accent-soft border-border-subtle bg-accent/10"
  const description = lang === "pt" && layer.descriptionPt ? layer.descriptionPt : layer.description

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      {index > 0 && (
        <div className="flex justify-center mb-2">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: index * 0.1 + 0.05, duration: 0.3 }}
            style={{ transformOrigin: "top" }}
            className="w-px h-6 bg-linear-to-b from-accent/60 to-accent/20"
          />
        </div>
      )}

      <div
        className={`rounded-xl border p-4 transition-all duration-200 cursor-default ${colorClass}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-start gap-3">
          <Icon size={18} className="mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold font-mono">{layer.layer}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {layer.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-black/20 px-1.5 py-0.5 rounded text-current opacity-80 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
            <AnimatePresence>
              {hovered && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs mt-2 opacity-70 leading-relaxed"
                >
                  {description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ArchitectureExplorer() {
  const [selectedId, setSelectedId] = useState(projects[0].id)
  const selected = projects.find((p) => p.id === selectedId)!
  const t = useT()
  const { lang } = useLanguage()

  return (
    <section id="architecture" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12">
          <SectionHeader
            label={t.architecture.label}
            title={t.architecture.title}
            highlight={t.architecture.highlight}
            description={t.architecture.description}
          />
        </AnimatedSection>

        {/* Mobile: horizontal scrollable selector */}
        <AnimatedSection delay={0.1} className="lg:hidden mb-4">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-2 px-1">
            {t.architecture.selectProject}
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedId === project.id
                    ? "bg-accent/15 border border-border-glow text-text-primary"
                    : "border border-border-subtle text-text-muted hover:bg-accent/10 hover:text-text-secondary"
                }`}
              >
                {project.name}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Desktop: vertical project selector */}
          <AnimatedSection delay={0.1} className="hidden lg:block">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-mono text-accent tracking-wider uppercase mb-2 px-1">
                {t.architecture.selectProject}
              </p>
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedId(project.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    selectedId === project.id
                      ? "bg-accent/15 border border-border-glow text-text-primary"
                      : "border border-transparent text-text-muted hover:bg-accent/10 hover:text-text-secondary"
                  }`}
                >
                  <span className="block font-semibold">{project.name}</span>
                  <span className="text-xs opacity-60 font-mono mt-0.5 block truncate">
                    {lang === "pt" && project.taglinePt ? project.taglinePt : project.tagline}
                  </span>
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Diagram */}
          <AnimatedSection delay={0.2}>
            <Card className="p-4 sm:p-8 min-h-125">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{selected.name}</h3>
                  <p className="text-sm text-text-secondary font-mono mt-0.5">
                    {lang === "pt" && selected.taglinePt ? selected.taglinePt : selected.tagline}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 max-w-xs justify-end">
                  {selected.tech.slice(0, 5).map((tech) => (
                    <span
                      key={tech.name}
                      className="text-xs font-mono bg-accent/10 border border-border-subtle text-text-secondary px-2 py-0.5 rounded"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {selected.architecture.map((layer, i) => (
                    <ArchNode key={layer.layer} layer={layer} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 pt-6 border-t border-border-subtle">
                <p className="text-xs font-mono text-accent mb-3 tracking-wider uppercase">
                  {t.architecture.highlights}
                </p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {(lang === "pt" && selected.highlightsPt ? selected.highlightsPt : selected.highlights).map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="text-accent mt-0.5">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
