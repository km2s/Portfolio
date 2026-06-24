# Phase 3 — Implementation Plan

## Milestones

| # | Milestone | Deliverable |
|---|---|---|
| M1 | Project Foundation | Working Next.js 15 app with design system |
| M2 | Data Layer | All typed data files complete |
| M3 | Core Sections | Hero, Projects, About |
| M4 | Interactive Sections | Architecture Explorer, Skills, Timeline |
| M5 | Signature Features | Recruiter Mode, AI Assistant |
| M6 | Layout & Polish | Navbar, Footer, SEO, animations, responsive |

---

## M1 — Project Foundation

### Dependencies
- Next.js 15 (App Router)
- TypeScript (strict mode)
- TailwindCSS v4
- Framer Motion v11
- `clsx` + `tailwind-merge` (for `cn()`)
- `next/font` with Geist (local)

### Tasks

**1.1 — Init project**
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-eslint --import-alias "@/*"
```

**1.2 — Install additional dependencies**
```bash
npm install framer-motion clsx tailwind-merge
```

**1.3 — Configure Tailwind**
- Extend colors with `void` palette
- Add `fontFamily` for Geist sans + mono
- Add custom `keyframes` and `animation`
- Add `backgroundImage` utilities

**1.4 — Configure TypeScript**
- Enable `strict: true`
- Set path aliases: `@/components`, `@/data`, `@/hooks`, `@/lib`, `@/types`

**1.5 — Set up globals.css**
- Import Tailwind directives
- Define CSS custom properties
- Add base styles (scrollbar, selection highlight, body bg)
- Add `@keyframes` for custom animations

**1.6 — Implement primitive UI components**
- `Badge` — colored status badge
- `Button` — primary/ghost/outline variants
- `Card` — glassmorphism card base
- `GlowBorder` — animated gradient border wrapper
- `GradientText` — text with purple gradient
- `StatusDot` — pulsing online/available indicator
- `Tag` — technology tag chip

**1.7 — Implement shared components**
- `AnimatedSection` — scroll-triggered reveal wrapper
- `GridBackground` — dot grid decorative layer
- `TerminalWindow` — terminal chrome (title bar + content area)

---

## M2 — Data Layer

**2.1 — Define all TypeScript types** (`src/types/index.ts`)

**2.2 — Write project data** (`src/data/projects.ts`)

Projects to include:
- Saga RPG
- Beauty Store
- revctl
- VOID Bot
- repoaudit

Each with: id, name, tagline, description, status, tech[], links, architecture layers, highlights, year

**2.3 — Write skills data** (`src/data/skills.ts`)

Categories: Frontend, Backend, Database, Cloud, AI
Skills with level (0–100) and years of experience

**2.4 — Write timeline data** (`src/data/timeline.ts`)

Entries: education start, Globo internship, each major project, open to opportunities

**2.5 — Write AI responses** (`src/data/ai-responses.ts`)

Static response map covering:
- "tell me about karine" / "who is karine"
- "what technologies" / "tech stack" / "skills"
- "explain saga rpg" / "saga"
- "beauty store" / "e-commerce"
- "revctl" / "code review"
- "experience" / "globo" / "work"
- "education" / "studying"
- "contact" / "hire" / "available"
- "architecture" / "system design"

---

## M3 — Core Sections

**3.1 — Hero Section**

Layout: Two-column (text left, visual right on desktop)

Elements:
- `StatusDot` + "Available for Opportunities" badge
- Name: `<h1>` with `GradientText`
- Role: "Full Stack Engineer"
- Company: "@ Globo" with subtle link
- Tagline: one punchy sentence
- 3 CTAs: View Projects (primary), Download Resume (secondary), Contact (ghost)
- Right side: animated terminal/code block showing a sample of her work
- Background: `GridBackground` with purple radial gradient

Animations:
- Staggered entry: badge → name → role → tagline → CTAs → visual
- Terminal text typewriter effect

**3.2 — Featured Projects Section**

Layout: Vertical stack of large cards (each full-width, asymmetric)

Per card:
- Left: project info (name, status badge, tagline, description, tech tags, links)
- Right: architecture preview or code/screenshot mockup
- Hover: subtle glow pulse, card elevation lift
- "View Architecture" button opens Architecture Explorer scrolled to that project

Animations:
- Cards slide in from alternating sides (left/right) on scroll

**3.3 — About Section**

Layout: Two-column
- Left: Profile block (text, role, company, education, interests)
- Right: Terminal window with `const karine = { ... }` style code block

Elements:
- Current position at Globo (highlighted)
- Education: Computer Science + Systems Analysis
- Interests as interactive tags (hover reveals description)
- "Open to Remote Worldwide" banner

---

## M4 — Interactive Sections

**4.1 — Architecture Explorer**

Layout: Full-width section with project selector + diagram area

Interactions:
- Click project tab → diagram animates in
- Each layer block is hoverable (shows description tooltip)
- Connection lines animate between layers

Architecture diagram per project:
- Vertical flow: Frontend → Backend → Database → External Services
- Each node: icon + tech name + brief description
- Color-coded by layer type

**4.2 — Skills Dashboard**

Layout: Category tabs + skill bars grid

Interactions:
- Click category tab → skill bars animate in with stagger
- Each bar fills from 0 to `level` on entry (via Framer Motion)
- Hover on skill shows years of experience tooltip

**4.3 — Timeline**

Layout: Vertical timeline with alternating left/right cards

Entries:
- 2022 → Started Computer Science
- 2024 → Joined Globo (Software Development Intern)
- 2024 → Built VOID Bot
- 2025 → Built Saga RPG
- 2025 → Built Beauty Store
- 2025 → Built revctl
- 2026 → Open to International Opportunities

Animations:
- Each entry slides in when scrolled into view
- Progress line draws downward as user scrolls

---

## M5 — Signature Features

**5.1 — Recruiter Mode**

Trigger: Floating button (bottom-right) + Navbar link

Layout: Full-height side panel (slide in from right)

Content:
- Header: "Recruiter Mode" with close button
- Summary card: 3-sentence professional summary
- Current Role block: title, company, period, responsibilities
- Education block
- Top 8 skills as badges
- Featured projects (compact cards with tech tags)
- Open to: Remote, Contract, Full-time (Brazil & International)
- CTA row: Download Resume + Contact Email + LinkedIn

**5.2 — AI Assistant**

Layout: Full-width section with terminal aesthetic

Elements:
- Section header: "Ask me anything"
- 4 suggestion prompt buttons
- Input area (read-only style, click a prompt to "send")
- Response area with typewriter animation
- "Powered by static responses" subtle disclaimer

Prompts:
1. "Tell me about Karine"
2. "What technologies does she know?"
3. "Explain Saga RPG"
4. "What's her experience level?"

Response behavior:
- Click prompt → clears previous → typewriter animates new response
- Response ends with follow-up suggestions

---

## M6 — Layout & Polish

**6.1 — Navbar**
- Logo/name left
- Section links center (hidden on mobile → hamburger)
- Recruiter Mode button right
- `useActiveSection` highlights current section
- Backdrop blur + border-bottom on scroll

**6.2 — Footer**
- Minimal: name + copyright + social links (GitHub, LinkedIn, Email)
- "Built with Next.js 15 & Framer Motion"

**6.3 — SEO**
- `metadata` export in layout.tsx: title, description, keywords, OG image
- Viewport, robots, canonical
- `robots.txt` and `sitemap.xml` via Next.js conventions

**6.4 — Responsive**
- All sections tested at 375px, 768px, 1024px, 1440px
- Mobile: stack all columns, simplify animations

**6.5 — Final Polish**
- Scroll progress indicator (thin purple line at top)
- Smooth page load entrance (body fade-in)
- Custom scrollbar (thin, purple)
- Focus ring styles for keyboard navigation

---

## Dependencies Map

```
M1 (Foundation) ─────────────────────────────────────────────┐
     │                                                        │
     ├─► M2 (Data Layer) ─────────────────────────────────┐  │
     │                                                     │  │
     ├─► M3 (Core Sections) ───────────────────────────┐  │  │
     │   depends on: M1 + M2                           │  │  │
     │                                                  │  │  │
     ├─► M4 (Interactive) ──────────────────────────┐  │  │  │
     │   depends on: M1 + M2 + M3                   │  │  │  │
     │                                              │  │  │  │
     ├─► M5 (Signature Features) ───────────────┐  │  │  │  │
     │   depends on: M1 + M2                    │  │  │  │  │
     │                                          │  │  │  │  │
     └─► M6 (Layout & Polish) ◄─────────────────┘──┘──┘──┘──┘
         depends on: all milestones
```

---

## Priorities

| Priority | Task |
|---|---|
| P0 | Project setup + Hero (first impression) |
| P0 | Projects section (most important content) |
| P1 | Recruiter Mode (unique differentiator) |
| P1 | Skills Dashboard + About |
| P2 | Architecture Explorer |
| P2 | AI Assistant |
| P3 | Timeline |
| P3 | Full responsive pass |
| P3 | SEO + performance audit |
