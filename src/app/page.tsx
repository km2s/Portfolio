import { Hero } from "@/components/sections/Hero"
import { Projects } from "@/components/sections/Projects"
import { ArchitectureExplorer } from "@/components/sections/ArchitectureExplorer"
import { About } from "@/components/sections/About"
import { SkillsDashboard } from "@/components/sections/SkillsDashboard"
import { Timeline } from "@/components/sections/Timeline"
import { AIAssistant } from "@/components/sections/AIAssistant"

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <ArchitectureExplorer />
      <About />
      <SkillsDashboard />
      <Timeline />
      <AIAssistant />
    </>
  )
}
