# Phase 2 — Architecture

## 1. Folder Structure

```
Karine/
├── docs/                        # Phase documents (this folder)
├── public/
│   ├── fonts/                   # Self-hosted fonts (Geist)
│   ├── resume/
│   │   └── karine-miranda-cv.pdf
│   └── og-image.png             # Open Graph image
├── src/
│   ├── app/                     # Next.js 15 App Router
│   │   ├── layout.tsx           # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx             # Home page (section orchestration)
│   │   └── globals.css          # Tailwind base + custom properties
│   ├── components/
│   │   ├── ui/                  # Primitive design system components
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── GlowBorder.tsx
│   │   │   ├── GradientText.tsx
│   │   │   ├── StatusDot.tsx
│   │   │   └── Tag.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/            # One component per page section
│   │   │   ├── Hero.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── ArchitectureExplorer.tsx
│   │   │   ├── About.tsx
│   │   │   ├── SkillsDashboard.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── RecruiterMode.tsx
│   │   │   └── AIAssistant.tsx
│   │   └── shared/
│   │       ├── AnimatedSection.tsx   # Scroll-triggered reveal wrapper
│   │       ├── GridBackground.tsx    # Dot/grid decorative background
│   │       ├── NoiseMask.tsx         # SVG noise overlay
│   │       └── TerminalWindow.tsx    # Terminal UI chrome
│   ├── data/
│   │   ├── projects.ts          # Project data (typed)
│   │   ├── skills.ts            # Skills data (typed)
│   │   ├── timeline.ts          # Timeline data (typed)
│   │   └── ai-responses.ts      # Mock AI assistant responses
│   ├── hooks/
│   │   ├── useReducedMotion.ts  # Respects prefers-reduced-motion
│   │   ├── useActiveSection.ts  # IntersectionObserver for nav highlight
│   │   └── useRecruiterMode.ts  # Recruiter mode panel state
│   ├── lib/
│   │   └── utils.ts             # cn() and shared utilities
│   └── types/
│       └── index.ts             # All shared TypeScript types
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 2. Component Hierarchy

```
app/page.tsx
├── Navbar
│   └── RecruiterModeButton (floating)
├── Hero
│   ├── GradientText
│   ├── StatusDot (Available)
│   └── Button × 3
├── Projects
│   └── ProjectCard × N
│       ├── Badge (status)
│       ├── Tag[] (tech stack)
│       ├── GlowBorder
│       └── ArchitecturePreview (collapsed)
├── ArchitectureExplorer
│   ├── ProjectSelector
│   └── ArchitectureDiagram
│       └── ArchNode × N (Frontend/Backend/DB/Services)
├── About
│   ├── ProfileBlock
│   └── TerminalWindow (fun code block)
├── SkillsDashboard
│   ├── CategoryTab × 5
│   └── SkillBar × N
├── Timeline
│   └── TimelineEntry × N
├── RecruiterMode (overlay panel)
│   ├── ResumeSnapshot
│   ├── ExperienceBlock
│   └── FeaturedProjects (compact)
├── AIAssistant
│   ├── TerminalWindow
│   ├── PromptSuggestion × 4
│   └── ResponseStream (animated typewriter)
└── Footer
```

---

## 3. State Management

State is **minimal and local**. No global state library needed.

| State | Location | Why |
|---|---|---|
| `activeSection` | `useActiveSection` hook | IntersectionObserver, read-only in Navbar |
| `recruiterMode open/closed` | `useRecruiterMode` hook + Context | Shared between Navbar button and panel |
| `selectedProject` (Architecture) | `useState` in `ArchitectureExplorer` | Local to the section |
| `activeSkillCategory` | `useState` in `SkillsDashboard` | Local to the section |
| `aiMessages` | `useState` in `AIAssistant` | Local to the component |
| `isReducedMotion` | `useReducedMotion` hook | Read-only, from media query |

**No Zustand, no Redux.** React Context only for Recruiter Mode open state (needs to be triggered from the Navbar).

---

## 4. Routing Strategy

Single-page application with anchor-based navigation. No page routes needed beyond the root.

```
/                    → page.tsx (full portfolio)
/#hero               → Hero section
/#projects           → Projects section
/#architecture       → Architecture Explorer
/#about              → About section
/#skills             → Skills Dashboard
/#timeline           → Timeline
/#contact            → Footer / contact
```

**Recruiter Mode** opens as an overlay panel (not a route). Deep-linking to `/?recruiter=1` could be a future enhancement.

---

## 5. Design System

### Tailwind Configuration

Extended theme tokens:

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      void: {
        950: '#06030F',   // deepest background
        900: '#0D0D1A',   // primary background
        800: '#12102A',   // card background
        700: '#1A173D',   // elevated card
        600: '#251F52',   // border/subtle
      },
      purple: {
        // Keep Tailwind defaults, extend:
        glow: '#A855F7',  // alias for purple-500 (primary accent)
      }
    },
    fontFamily: {
      sans: ['Geist', 'system-ui', 'sans-serif'],
      mono: ['Geist Mono', 'monospace'],
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
    animation: {
      'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      'float': 'float 6s ease-in-out infinite',
      'scan': 'scan 8s linear infinite',
    }
  }
}
```

### CSS Custom Properties (globals.css)

```css
:root {
  --bg-primary:    #0D0D1A;
  --bg-card:       #12102A;
  --bg-elevated:   #1A173D;
  --border-subtle: #251F52;
  --border-glow:   rgba(168, 85, 247, 0.4);
  --accent:        #A855F7;
  --accent-soft:   #C084FC;
  --accent-dim:    #7B2FBE;
  --text-primary:  #F3F0FF;
  --text-secondary:#C4B5FD;
  --text-muted:    #6B6B99;
}
```

---

## 6. Data Models

```typescript
// src/types/index.ts

export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  status: 'live' | 'in-development' | 'open-source'
  featured: boolean
  tech: TechTag[]
  links: {
    github?: string
    live?: string
    demo?: string
  }
  architecture: ArchitectureLayer[]
  highlights: string[]
  year: number
}

export interface TechTag {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'ai' | 'tool'
}

export interface ArchitectureLayer {
  layer: 'Frontend' | 'Backend' | 'Database' | 'External Services' | 'Infrastructure'
  tech: string[]
  description: string
  connections?: string[]   // IDs of layers this connects to
}

export interface Skill {
  name: string
  category: SkillCategory
  level: number           // 0–100
  yearsOfExperience?: number
  icon?: string
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Cloud' | 'AI'

export interface TimelineEntry {
  year: number
  month?: number
  title: string
  description: string
  type: 'work' | 'project' | 'education' | 'milestone'
  tech?: string[]
}

export interface AIResponse {
  trigger: string[]       // keywords that match this response
  response: string
  followUp?: string[]     // suggested follow-up prompts
}

export interface RecruiterSnapshot {
  summary: string
  currentRole: string
  company: string
  education: Education[]
  topSkills: string[]
  featuredProjects: string[]  // project IDs
  openTo: string[]
  contact: {
    email: string
    github: string
    linkedin?: string
  }
}

export interface Education {
  degree: string
  institution: string
  period: string
  status: 'completed' | 'in-progress'
}
```

---

## 7. Animation Architecture

All animations via **Framer Motion** with a consistent pattern:

```typescript
// AnimatedSection.tsx — reusable scroll reveal
const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}
// useInView triggers visible when section enters viewport
```

**Stagger pattern** for lists (project cards, skill bars, timeline entries):
```typescript
const containerVariants = {
  visible: { transition: { staggerChildren: 0.1 } }
}
```

**Reduced motion**: All animations check `useReducedMotion()` and fall back to instant opacity transitions.

**Performance rules:**
- Never animate `width`/`height` — use `scaleX`/`scaleY` transforms
- Use `layout` prop only on elements that need smooth layout shifts
- `LazyMotion` with `domAnimation` feature bundle (tree-shakes unused features)
