# Phase 1 — Analysis

## 1. Product Analysis

### Concept: Developer Command Center

The portfolio is not a traditional résumé-as-a-website. It is a **product experience** — a command center that lets visitors explore Karine's work the way they would explore a SaaS product: interactively, with real detail, and with a strong visual identity.

**Core experience pillars:**
- Immediate clarity — within 3 seconds a recruiter knows who Karine is and what she does
- Exploration over scrolling — the interface rewards curiosity rather than passive reading
- Product quality — every interaction should feel like it shipped from a top-tier engineering team

**Differentiation from standard portfolios:**
| Standard Portfolio | This Portfolio |
|---|---|
| White/light background | Deep dark purple command center |
| Static text blocks | Interactive project cards with architecture views |
| Skills as text lists | Skills as an interactive dashboard |
| Contact form | Recruiter Mode + AI assistant |
| Minimal animation | Framer Motion orchestration throughout |

---

## 2. User Analysis

### Primary User: Technical Recruiter (Brazilian & International)

**Goals:**
- Quickly assess technical level
- Identify relevant experience for a role
- Find contact information effortlessly
- Download resume in one click

**Behavior:**
- Spends 15–30 seconds on the initial view
- Looks for signal words: TypeScript, React, Node, Python, AI, Full Stack
- May not be deeply technical — visual credibility matters
- Wants to see shipped products, not just GitHub repos

**Pain points with typical developer portfolios:**
- Too much text, not enough substance
- Can't tell seniority level from the design alone
- No quick-access to the resume

---

### Secondary User: Senior Engineer / Tech Lead

**Goals:**
- Evaluate architecture decisions
- Understand problem-solving approach
- Assess code quality and breadth

**Behavior:**
- Will dive into the Architecture Explorer
- Will look at the stack choices and why
- Will read project descriptions for technical depth

---

### Tertiary User: Karine herself

**Goals:**
- Present herself confidently to the world
- Have something she's proud to send to anyone
- A foundation to update as she grows

---

## 3. Recruiter Analysis

### What Brazilian Recruiters Look For
- Clear seniority indicator (júnior, pleno, sênior)
- Stack alignment with the open position
- Real projects in production (not just toy apps)
- Globo as a recognizable company signals credibility
- Portuguese-friendly but internationally accessible

### What International Recruiters Look For
- English language support
- GitHub presence and active commits
- Remote-work readiness signal
- Modern stack (Next.js, TypeScript, Python, AI)
- Confidence in communication

### Key Recruiter CTA Hierarchy
1. Download Resume (immediate action)
2. View Projects (product exploration)
3. Contact / LinkedIn (relationship building)
4. Recruiter Mode (one-click summary panel)

---

## 4. Competitor / Inspiration Analysis

### Reference Sites (Aesthetic + UX)

| Site | What to take |
|---|---|
| **vercel.com** | Dark mode, grid layouts, subtle glow effects, clean typography |
| **linear.app** | Premium SaaS feel, smooth transitions, icon-driven UI |
| **supabase.com** | Dark with green accent (adapt to purple), product cards |
| **stripe.com** | Section composition, bold headlines, trust-building copy |
| **runpod.io** | Neon accents on dark, terminal aesthetic, GPU/tech vibe |
| **leerob.io** | Developer portfolio done well — but still too minimal |
| **brittanychiang.com** | Well-known dev portfolio — we surpass it visually |

### Key Takeaways
- Glassmorphism for cards (dark glass effect with purple border glow)
- Noise texture overlays on hero backgrounds
- Gradient text headings
- Animated grid/dot backgrounds
- Command-palette style UI for the AI assistant
- Badge-style technology tags
- Monospace font for code-adjacent elements

---

## 5. UX Considerations

### Navigation
- Sticky top navbar with current-section highlighting
- Keyboard-accessible (Tab, Enter, Escape on modal)
- Mobile-first but desktop-primary (recruiters are on desktop)
- Single-page with smooth scroll + section anchors

### Performance
- Framer Motion `LazyMotion` to reduce bundle
- Images: Next.js `<Image>` with WebP + blur placeholder
- Code split per section with dynamic imports
- Lighthouse target: 90+ across all metrics

### Accessibility
- WCAG AA minimum
- Sufficient contrast ratios (purple on dark bg — needs careful checking)
- `aria-label` on all icon-only buttons
- `prefers-reduced-motion` respected in animations
- Semantic HTML structure

### Responsive Strategy
- Mobile: single column, simplified animations
- Tablet: 2-column project grid
- Desktop: full command-center layout with sidebars/panels

### Language
- Default: English (international reach)
- Key content already translated

---

## 6. Risks

| Risk | Mitigation |
|---|---|
| Animations hurting performance | `LazyMotion`, `will-change`, `reduced-motion` media query |
| Purple-on-dark failing contrast | Use purple-300/400 on dark bg, not purple-700 |
| Too clever UI hiding the content | Every section has a clear information hierarchy first |
| Recruiter Mode not being found | Persistent floating button + navbar link |
| AI Assistant feeling gimmicky | Good static responses + polished terminal UI |
| Page feeling slow on mobile | Disable heavy effects on `sm` breakpoint |

---

## 7. Opportunities

- **Recruiter Mode** is a genuine differentiator — almost no portfolio has this
- **Architecture Explorer** shows senior-level thinking visually
- **AI Assistant** with mock responses is creative and memorable
- **VOID Bot** and **repoaudit** as bonus projects increase breadth
- **Globo** as current employer adds immediate credibility signal
- The purple brand is already strong from GitHub — carry it through
- Developer Tool projects (revctl, repoaudit) signal deep technical curiosity
