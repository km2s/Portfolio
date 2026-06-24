import type { Skill } from "@/types"

export const skills: Skill[] = [
  // Frontend — Vue.js and Vuetify are primary (Globo stack)
  { name: "Vue.js / Nuxt", category: "Frontend", level: 85, yearsOfExperience: 2 },
  { name: "Vuetify", category: "Frontend", level: 82, yearsOfExperience: 2 },
  { name: "TypeScript", category: "Frontend", level: 90, yearsOfExperience: 3 },
  { name: "React", category: "Frontend", level: 85, yearsOfExperience: 3 },
  { name: "Next.js", category: "Frontend", level: 83, yearsOfExperience: 2 },
  { name: "TailwindCSS", category: "Frontend", level: 90, yearsOfExperience: 2 },
  { name: "Framer Motion", category: "Frontend", level: 75, yearsOfExperience: 1 },
  { name: "Angular", category: "Frontend", level: 62, yearsOfExperience: 1 },

  // Backend
  { name: "Node.js", category: "Backend", level: 82, yearsOfExperience: 3 },
  { name: "Python", category: "Backend", level: 80, yearsOfExperience: 2 },
  { name: "FastAPI", category: "Backend", level: 78, yearsOfExperience: 1 },
  { name: "NestJS", category: "Backend", level: 68, yearsOfExperience: 1 },
  { name: "REST APIs", category: "Backend", level: 88, yearsOfExperience: 3 },

  // Database
  { name: "PostgreSQL", category: "Database", level: 80, yearsOfExperience: 2 },
  { name: "Supabase", category: "Database", level: 82, yearsOfExperience: 2 },
  { name: "Prisma ORM", category: "Database", level: 78, yearsOfExperience: 2 },
  { name: "MongoDB", category: "Database", level: 68, yearsOfExperience: 1 },
  { name: "MySQL", category: "Database", level: 65, yearsOfExperience: 1 },

  // Cloud
  { name: "Vercel", category: "Cloud", level: 85, yearsOfExperience: 2 },
  { name: "Docker", category: "Cloud", level: 70, yearsOfExperience: 1 },
  { name: "Railway", category: "Cloud", level: 72, yearsOfExperience: 1 },
  { name: "AWS", category: "Cloud", level: 52, yearsOfExperience: 1 },
  { name: "Azure", category: "Cloud", level: 48, yearsOfExperience: 1 },

  // AI
  { name: "OpenAI API", category: "AI", level: 78, yearsOfExperience: 1 },
  { name: "Ollama / Local LLMs", category: "AI", level: 75, yearsOfExperience: 1 },
  { name: "Prompt Engineering", category: "AI", level: 72, yearsOfExperience: 1 },
  { name: "LLM Integration", category: "AI", level: 70, yearsOfExperience: 1 },
]
