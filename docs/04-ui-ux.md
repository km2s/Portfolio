# Phase 4 — UI/UX Plan

## 1. Color Palette

### Primary Palette (from existing brand)

| Token | Hex | Usage |
|---|---|---|
| `void-950` | `#06030F` | Deepest background (behind hero) |
| `void-900` | `#0D0D1A` | Primary page background |
| `void-800` | `#12102A` | Card backgrounds |
| `void-700` | `#1A173D` | Elevated card / hover state |
| `void-600` | `#251F52` | Borders (subtle) |
| `purple-500` | `#A855F7` | Primary accent (CTAs, highlights) |
| `purple-400` | `#C084FC` | Soft accent (tags, secondary text) |
| `purple-700` | `#7B2FBE` | Deep accent (gradients) |
| `purple-900` | `#3B0764` | Gradient start (dark) |
| `purple-100` | `#F3E8FF` | Headings (light text) |
| `purple-200` | `#E9D5FF` | Body text |
| `purple-300` | `#D8B4FE` | Secondary text |
| `purple-400` | `#C084FC` | Muted text / captions |

### Semantic Colors

| Role | Value |
|---|---|
| Background primary | `#0D0D1A` |
| Background card | `#12102A` |
| Background elevated | `#1A173D` |
| Text primary | `#F3E8FF` |
| Text secondary | `#C4B5FD` |
| Text muted | `#7C6FAF` |
| Border subtle | `rgba(107, 83, 188, 0.3)` |
| Border glow | `rgba(168, 85, 247, 0.5)` |
| Accent | `#A855F7` |
| Accent hover | `#C084FC` |
| Success | `#34D399` (emerald-400) |
| Warning | `#FBBF24` (amber-400) |

### Gradient Recipes

```css
/* Hero gradient (background) */
background: radial-gradient(ellipse at 60% 0%, rgba(107, 33, 168, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse at 0% 80%, rgba(76, 0, 130, 0.3) 0%, transparent 50%),
            #0D0D1A;

/* Gradient text */
background: linear-gradient(135deg, #C084FC 0%, #A855F7 50%, #7B2FBE 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* Card glow border */
background: linear-gradient(135deg, rgba(168,85,247,0.6) 0%, rgba(107,33,168,0.2) 50%, rgba(168,85,247,0.6) 100%);

/* Skill bar fill */
background: linear-gradient(90deg, #7B2FBE 0%, #A855F7 60%, #C084FC 100%);
```

---

## 2. Typography

### Font Stack

- **Display / Body**: Geist Sans (Next.js native, Vercel's typeface — reinforces premium feel)
- **Code / Terminal**: Geist Mono (for terminal windows, code blocks, monospace elements)
- **Fallbacks**: `system-ui`, `sans-serif`

### Scale

| Role | Size | Weight | Line Height |
|---|---|---|---|
| `h1` (Hero name) | `clamp(3rem, 8vw, 6rem)` | 700 | 1.0 |
| `h2` (Section title) | `clamp(1.75rem, 4vw, 3rem)` | 700 | 1.1 |
| `h3` (Card title) | `1.25rem – 1.5rem` | 600 | 1.2 |
| `p` (Body) | `1rem` | 400 | 1.6 |
| `small` (Caption) | `0.875rem` | 400 | 1.5 |
| `code` (Inline) | `0.875rem` | 400 | — |
| `label` (Tags/Badges) | `0.75rem` | 500 | — |

### Type Rules
- Hero name uses `GradientText` component (purple gradient)
- Section subtitles use `text-purple-400` (muted purple)
- Code elements always use `font-mono`
- Letter-spacing: `-0.02em` on large headings for tightening
- No font sizes below `0.75rem` in body content

---

## 3. Layout Decisions

### Grid System
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Main content: 12-column CSS grid where needed
- Section padding: `py-20 lg:py-32`
- Card gap: `gap-6`

### Breakpoints (Tailwind defaults)
- `sm`: 640px (small tablets, large phones)
- `md`: 768px (tablets)
- `lg`: 1024px (laptops)
- `xl`: 1280px (desktops)
- `2xl`: 1536px (large monitors)

### Section Layouts

**Hero**: `grid lg:grid-cols-2` — text left, terminal visual right
**Projects**: `flex flex-col gap-8` — full-width vertical stack
**Architecture Explorer**: `grid lg:grid-cols-[280px_1fr]` — selector sidebar + diagram
**About**: `grid lg:grid-cols-2` — text left, terminal right
**Skills**: `flex flex-col` — tabs top, skill bars below
**Timeline**: centered vertical line with alternating cards
**Recruiter Mode**: fixed right panel, `w-full sm:w-[480px]`
**AI Assistant**: `max-w-3xl mx-auto` — centered terminal

### Spacing Philosophy
- Generous whitespace between sections (visual breathing room)
- Dense information within cards (SaaS density)
- 8px base unit: all spacing in multiples of 4 or 8

---

## 4. Component Design

### Cards (Glassmorphism)
```
background: rgba(18, 16, 42, 0.8)
border: 1px solid rgba(107, 83, 188, 0.3)
border-radius: 16px
backdrop-filter: blur(12px)
box-shadow: 0 0 40px rgba(107, 33, 168, 0.15)
```

On hover:
```
border-color: rgba(168, 85, 247, 0.5)
box-shadow: 0 0 60px rgba(168, 85, 247, 0.2)
transform: translateY(-2px)
transition: all 300ms ease
```

### Buttons

**Primary** (View Projects, Download Resume):
```
background: linear-gradient(135deg, #7B2FBE, #A855F7)
color: white
padding: 12px 24px
border-radius: 8px
font-weight: 600
hover: brightness-110 + scale(1.02)
```

**Ghost** (Contact, secondary actions):
```
background: transparent
border: 1px solid rgba(168, 85, 247, 0.5)
color: #C084FC
hover: background rgba(168, 85, 247, 0.1)
```

### Tags / Tech Badges
```
background: rgba(107, 33, 168, 0.2)
border: 1px solid rgba(168, 85, 247, 0.3)
color: #C084FC
border-radius: 6px
padding: 2px 10px
font-size: 0.75rem
font-weight: 500
font-family: mono
```

### Status Dot (Available)
```
width: 8px, height: 8px
background: #34D399 (green)
border-radius: 50%
animation: pulse 2s infinite (with green glow ring)
```

---

## 5. Motion Design

### Philosophy
- **Purposeful**: every animation communicates meaning (entry = new content, hover = interactive, transition = navigation)
- **Subtle**: never distracting — reinforces the premium feel, doesn't compete with content
- **Consistent**: same easing curves throughout

### Easing Curves
```typescript
const ease = {
  out:   [0.0, 0.0, 0.2, 1],   // fast start, slow end (entries)
  inOut: [0.4, 0, 0.2, 1],     // smooth both ways (hover/exit)
  spring: { type: 'spring', stiffness: 300, damping: 30 }
}
```

### Animation Catalogue

| Animation | Component | Duration | Description |
|---|---|---|---|
| Page entrance | `body` | 400ms | Fade-in from opacity 0 |
| Section reveal | `AnimatedSection` | 600ms | `y: 24 → 0` + `opacity: 0 → 1` |
| Stagger children | Lists | 100ms delay per item | Cascading entry |
| Card hover lift | All cards | 200ms | `y: -2px` + glow pulse |
| Skill bar fill | `SkillBar` | 1000ms | `scaleX: 0 → 1` with spring |
| Timeline draw | Line | 1500ms | `scaleY: 0 → 1` as scroll |
| Recruiter panel | Overlay | 350ms | Slide in from right |
| Typewriter | AI responses | ~40ms/char | Character-by-character reveal |
| Terminal cursor | Terminal | ∞ | Blinking cursor (`opacity: 0/1`) |
| Status dot | Hero badge | ∞ | Pulse ring scale + fade |
| Gradient border | GlowBorder | ∞ | Rotating gradient angle |
| Floating visual | Hero right | 6s ∞ | `y: -8 → 8` gentle float |

### Scroll-Triggered Behavior
- `IntersectionObserver` at `threshold: 0.15` — trigger when 15% is visible
- Sections only animate once (not on scroll-out)
- `root margin: "0px 0px -50px 0px"` — slight pre-trigger

### Reduced Motion
```typescript
const shouldAnimate = !prefersReducedMotion
const variants = shouldAnimate
  ? { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
  : { hidden: { opacity: 0 }, visible: { opacity: 1 } }
```

---

## 6. Iconography

- **Icon library**: `lucide-react` (consistent, modern, tree-shakeable)
- **Custom icons**: SVG inline for brand logos (GitHub, LinkedIn, Discord)
- **Tech stack icons**: Use `devicons` SVG set or letter abbreviations in `Tag` components
- **Icon sizes**: `16px` inline, `20px` buttons, `24px` section headers

---

## 7. Micro-interactions

| Trigger | Response |
|---|---|
| Hover any link | Underline slides in from left |
| Hover tech tag | Slight scale + brighter border |
| Click "Copy email" | "Copied!" tooltip flash |
| Hover project card | Architecture layer fades in overlay |
| Scroll past 50% | Progress bar fills at top |
| Open Recruiter Mode | Backdrop blur overlay appears |
| AI prompt click | Input "types" the prompt, then response arrives |

---

## 8. Dark Mode

The design is **dark mode by default**. There is **no light mode toggle** — the brand is built on darkness. This is a deliberate product decision: the command center aesthetic requires dark mode.

`<html class="dark">` is set statically. No `prefers-color-scheme` toggle needed.
