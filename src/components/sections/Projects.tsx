"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowUpRight, Layers } from "lucide-react"
import { featuredProjects } from "@/data/projects"
import { Badge } from "@/components/ui/Badge"
import { Tag } from "@/components/ui/Tag"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
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

  const tagline = lang === "pt" && project.taglinePt ? project.taglinePt : project.tagline
  const description = lang === "pt" && project.descriptionPt ? project.descriptionPt : project.description
  const highlights = lang === "pt" && project.highlightsPt ? project.highlightsPt : project.highlights

  return (
    <AnimatedSection delay={index * 0.1}>
      <Card hover className="overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Content side */}
          <div className={`p-4 sm:p-8 flex flex-col gap-5 ${!isEven ? "lg:order-2" : ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <StatusIndicator status={project.status} t={t} />
                <h3 className="text-2xl font-serif font-bold text-text-primary">{project.name}</h3>
                <p className="text-text-muted text-sm font-mono">{tagline}</p>
              </div>
              <span className="text-xs font-mono text-accent-gold shrink-0">{project.year}</span>
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
            className={`relative hidden lg:flex items-center justify-center p-8 border-l border-border-subtle bg-void-950/40 ${
              !isEven ? "lg:order-1 border-l-0 border-r border-border-subtle" : ""
            }`}
          >
            <div className="w-full max-w-sm">
              <ArchitecturePreview project={project} highlightsLabel={t.architecture.highlights} />
            </div>
          </div>
        </div>
      </Card>
    </AnimatedSection>
  )
}

function ArchitecturePreview({ project, highlightsLabel }: { project: Project; highlightsLabel: string }) {
  const layers = project.architecture.slice(0, 4)

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-mono text-accent mb-2 tracking-wider uppercase">
        {highlightsLabel}
      </p>
      {layers.map((layer, i) => (
        <motion.div
          key={layer.layer}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
          className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-border-subtle hover:border-border-glow transition-colors"
        >
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-xs font-mono font-medium text-accent-soft">{layer.layer}</span>
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
    <section id="projects" className="py-20 lg:py-32 relative">
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
