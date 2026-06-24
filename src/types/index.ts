export interface TechTag {
  name: string
  category: "frontend" | "backend" | "database" | "cloud" | "ai" | "tool"
}

export interface ArchitectureLayer {
  layer: "Frontend" | "Backend" | "Database" | "External Services" | "Infrastructure"
  tech: string[]
  description: string
  descriptionPt?: string
}

export interface Project {
  id: string
  name: string
  tagline: string
  taglinePt?: string
  description: string
  descriptionPt?: string
  highlights: string[]
  highlightsPt?: string[]
  status: "live" | "in-development" | "open-source"
  featured: boolean
  tech: TechTag[]
  links: {
    github?: string
    live?: string
    demo?: string
  }
  architecture: ArchitectureLayer[]
  year: number
}

export type SkillCategory = "Frontend" | "Backend" | "Database" | "Cloud" | "AI"

export interface Skill {
  name: string
  category: SkillCategory
  level: number
  yearsOfExperience?: number
}

export type TimelineType = "work" | "project" | "education" | "milestone"

export interface TimelineEntry {
  year: number
  month?: number
  title: string
  titlePt?: string
  description: string
  descriptionPt?: string
  type: TimelineType
  tech?: string[]
}

export interface AIResponse {
  triggers: string[]
  response: string
  followUp?: string[]
}

export interface Education {
  degree: string
  institution: string
  period: string
  status: "completed" | "in-progress"
}
