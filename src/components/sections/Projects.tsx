"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ArrowUpRight, Layers } from "lucide-react"
import { featuredProjects } from "@/data/projects"
import { Badge } from "@/components/portfolio-ui/Badge"
import { Tag } from "@/components/portfolio-ui/Tag"
import { Button } from "@/components/portfolio-ui/Button"
import { Card } from "@/components/portfolio-ui/Card"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { TiltCard } from "@/components/shared/TiltCard"
import { useT } from "@/hooks/useT"
import { useLanguage } from "@/hooks/useLanguage"
import type { Project } from "@/types"

function StatusIndicator({ status, t }: { status: Project["status"]; t: ReturnType<typeof useT> }) {
  const map = {
    live: { label: t.projects.statusLive, variant: "live" as const },
    "in-development": { label: t.projects.statusDev, variant: "dev" as const },
    "open-source": { label: t.projects.statusOS, variant: "open-source" as const },
  }
  const { label, variant } = map[status]
  return (
    <Badge variant={variant}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          variant === "live" ? "bg-accent" : variant === "dev" ? "bg-amber-400" : "bg-text-muted"
        }`}
      />
      {label}
    </Badge>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useT()
  const { lang } = useLanguage()
  const isEven = index % 2 === 0
  const [livePreview, setLivePreview] = useState(false)

  const tagline = lang === "pt" && project.taglinePt ? project.taglinePt : project.tagline
  const description = lang === "pt" && project.descriptionPt ? project.descriptionPt : project.description
  const highlights = lang === "pt" && project.highlightsPt ? project.highlightsPt : project.highlights

  return (
    <AnimatedSection delay={index * 0.1}>
      <TiltCard max={5} className="rounded-2xl">
        <div
          className="group relative rounded-2xl p-[1px] overflow-hidden transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, rgba(244,63,114,0.35), rgba(245,158,11,0.18) 45%, rgba(244,63,114,0.05) 70%, rgba(251,127,160,0.3))`,
          }}
        >
          <Card hover className="overflow-hidden !border-transparent">
            {/* Index marker */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">
              <span className="text-accent-gold">{String(index + 1).padStart(2, "0")}</span>
              <span>/ {String(featuredProjects.length).padStart(2, "0")}</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-0">
              {/* Content side */}
              <div className={`p-4 sm:p-8 flex flex-col gap-5 ${!isEven ? "lg:order-2" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <StatusIndicator status={project.status} t={t} />
                    <h3 className="text-2xl font-serif font-bold text-text-primary group-hover:text-accent-soft transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-text-muted text-sm font-mono">{tagline}</p>
                  </div>
                  <span className="text-xs font-mono text-accent-gold shrink-0 mr-14">{project.year}</span>
                </div>

                <p className="text-text-primary/65 text-sm leading-relaxed">{description}</p>

                <ul className="space-y-1.5">
                  {highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-text-primary/60">
                      <span className="text-accent mt-0.5 text-[10px] shrink-0">●</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 7).map((tech) => (
                    <Tag key={tech.name}>{tech.name}</Tag>
                  ))}
                  {project.tech.length > 7 && (
                    <Tag className="text-text-muted/60">+{project.tech.length - 7}</Tag>
                  )}
                </div>

                <div className="flex gap-3 mt-auto pt-2">
                  {project.links.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.links.github, "_blank")}
                      aria-label={`GitHub for ${project.name}`}
                    >
                      <Github size={14} />
                      {t.projects.code}
                    </Button>
                  )}
                  {project.links.live && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => window.open(project.links.live, "_blank")}
                      aria-label={`Live demo for ${project.name}`}
                    >
                      <ExternalLink size={14} />
                      {t.projects.live}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => document.getElementById("architecture")?.scrollIntoView({ behavior: "smooth" })}
                    aria-label={`View architecture for ${project.name}`}
                  >
                    <Layers size={14} />
                    {t.projects.architecture}
                    <ArrowUpRight size={12} />
                  </Button>
                </div>
              </div>

              {/* Visual side */}
              <div
                className={`relative hidden lg:flex items-center justify-center p-8 border-l border-border-subtle bg-gradient-to-br from-void-950/60 via-void-900/40 to-void-950/80 ${
                  !isEven ? "lg:order-1 border-l-0 border-r border-border-subtle" : ""
                }`}
                onMouseEnter={() => project.links.live && setLivePreview(true)}
                onMouseLeave={() => setLivePreview(false)}
              >
                {/* corner accent */}
                <div aria-hidden className="absolute top-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-3xl" />
                <div aria-hidden className="absolute bottom-0 right-0 w-32 h-32 bg-accent-gold/8 rounded-full blur-3xl" />
                <div className="relative w-full max-w-sm">
                  <ArchitecturePreview project={project} highlightsLabel={t.architecture.highlights} />
                </div>

                {/* Live site preview on hover — a real screenshot (many live sites
                    block <iframe> embedding via X-Frame-Options, so we use an image). */}
                {project.links.live && (
                  <AnimatePresence>
                    {livePreview && (
                      <motion.a
                        key="live-preview"
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.name} live site`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute inset-3 rounded-xl overflow-hidden border border-border-glow shadow-[0_0_40px_rgba(244,63,114,0.25)] bg-void-950 group/live"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/projects/${project.id}.png`}
                          alt={`${project.name} live site preview`}
                          loading="lazy"
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-void-950/80 via-transparent to-void-950/30 pointer-events-none" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-text-primary">
                          <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                            {t.projects.statusLive}
                          </span>
                          <span className="flex items-center gap-1 text-accent-soft group-hover/live:text-accent transition-colors">
                            {t.projects.live}
                            <ArrowUpRight size={12} />
                          </span>
                        </div>
                      </motion.a>
                    )}
                  </AnimatePresence>
                )}
              </div>

            </div>
          </Card>
        </div>
      </TiltCard>
    </AnimatedSection>
  )
}

function ArchitecturePreview({ project, highlightsLabel }: { project: Project; highlightsLabel: string }) {
  const layers = project.architecture.slice(0, 4)

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-mono text-accent mb-2 tracking-[0.25em] uppercase flex items-center gap-2">
        <span className="h-px w-6 bg-accent/60" />
        {highlightsLabel}
      </p>
      {layers.map((layer, i) => (
        <motion.div
          key={layer.layer}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
          className="group/layer relative flex items-start gap-3 p-3 rounded-lg bg-void-900/60 border border-border-subtle hover:border-border-glow hover:bg-accent/8 transition-all duration-200"
        >
          <span className="font-mono text-[10px] text-accent-gold/80 mt-0.5 w-5 shrink-0">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <span className="text-xs font-mono font-medium text-accent-soft group-hover/layer:text-accent transition-colors">{layer.layer}</span>
            <div className="flex flex-wrap gap-1">
              {layer.tech.slice(0, 3).map((tech, idx) => (
                <span key={tech} className="text-xs text-text-primary/50 font-mono">
                  {tech}{idx < Math.min(layer.tech.length, 3) - 1 ? " ·" : ""}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function Projects() {
  const t = useT()

  return (
    <section id="projects" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16">
          <SectionHeader
            label={t.projects.label}
            title={t.projects.title}
            highlight={t.projects.highlight}
            description={t.projects.description}
          />
        </AnimatedSection>

        <div className="flex flex-col gap-8">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <p className="text-text-muted text-sm font-mono">
            {t.projects.more}{" "}
            <a
              href="https://github.com/km2s"
              target="_blank"
              rel="noreferrer"
              className="text-text-secondary hover:text-accent underline underline-offset-2 transition-colors"
            >
              github.com/km2s
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
