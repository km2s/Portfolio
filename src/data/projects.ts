import type { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "saga-rpg",
    name: "Saga RPG",
    tagline: "Full-featured TTRPG campaign manager with real-time virtual table.",
    taglinePt: "Gerenciador completo de campanhas TTRPG com mesa virtual em tempo real.",
    description:
      "A complete platform for tabletop RPG masters and players. Covers character sheets for 5+ systems, a drag-and-drop virtual table with fog of war, real-time session sync, initiative tracking, ambient music, handouts, and a Discord bot — all in a pnpm monorepo.",
    descriptionPt:
      "Uma plataforma completa para mestres e jogadores de RPG de mesa. Inclui fichas de personagem para 5+ sistemas, mesa virtual drag-and-drop com névoa de guerra, sincronização de sessão em tempo real, rastreamento de iniciativa, música ambiente, handouts e bot do Discord — tudo em um monorepo pnpm.",
    highlights: [
      "Multi-system character sheets (D&D 5e, VtM, CoC, Sci-Fi, Generic)",
      "Real-time virtual table with token drag-and-drop and fog of war",
      "Discord bot integration with slash commands",
      "Session recording, NPC management, and handout sharing",
      "pnpm monorepo: Next.js web app + Discord bot + shared Prisma schema",
    ],
    highlightsPt: [
      "Fichas multi-sistema (D&D 5e, VtM, CoC, Sci-Fi, Genérico)",
      "Mesa virtual em tempo real com arrastar tokens e névoa de guerra",
      "Integração com bot do Discord via slash commands",
      "Gravação de sessão, gerenciamento de NPCs e compartilhamento de handouts",
      "Monorepo pnpm: app Next.js + bot Discord + schema Prisma compartilhado",
    ],
    status: "live",
    featured: true,
    year: 2026,
    tech: [
      { name: "Next.js 14", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "TailwindCSS", category: "frontend" },
      { name: "PostgreSQL", category: "database" },
      { name: "Supabase", category: "database" },
      { name: "Prisma", category: "backend" },
      { name: "NextAuth.js", category: "backend" },
      { name: "Discord.js", category: "tool" },
      { name: "Vercel", category: "cloud" },
    ],
    links: {
      github: "https://github.com/km2s/rpg-bot",
      live: "https://saga-ruddy.vercel.app/characters",
    },
    architecture: [
      {
        layer: "Frontend",
        tech: ["Next.js 14 App Router", "TailwindCSS", "React"],
        description: "Server-side rendered pages with App Router, interactive virtual table via client components",
        descriptionPt: "Páginas renderizadas no servidor com App Router, mesa virtual interativa via client components",
      },
      {
        layer: "Backend",
        tech: ["Next.js API Routes", "NextAuth.js", "Prisma ORM"],
        description: "REST API routes co-located with the frontend, auth via Discord OAuth, type-safe DB access",
        descriptionPt: "Rotas de API co-localizadas com o frontend, auth via Discord OAuth, acesso type-safe ao banco",
      },
      {
        layer: "Database",
        tech: ["PostgreSQL", "Supabase"],
        description: "Relational schema: campaigns, characters, sessions, NPCs, tokens, handouts",
        descriptionPt: "Schema relacional: campanhas, personagens, sessões, NPCs, tokens, handouts",
      },
      {
        layer: "External Services",
        tech: ["Discord.js Bot", "Discord OAuth"],
        description: "Slash command bot for in-Discord dice rolls and character lookups; OAuth for login",
        descriptionPt: "Bot de slash commands para rolagens e consultas de personagem no Discord; OAuth para login",
      },
      {
        layer: "Infrastructure",
        tech: ["Vercel", "pnpm workspaces"],
        description: "Monorepo: apps/web + apps/bot + packages/database. Vercel for web deploy.",
        descriptionPt: "Monorepo: apps/web + apps/bot + packages/database. Vercel para deploy do web.",
      },
    ],
  },
  {
    id: "beauty-store",
    name: "Beauty Store",
    tagline: "Full-stack e-commerce with AI product recommendations and loyalty system.",
    taglinePt: "E-commerce full-stack com recomendações de produtos por IA e sistema de fidelidade.",
    description:
      "A production-ready beauty e-commerce platform. Features an OpenAI-powered product quiz, MercadoPago payment processing, a loyalty points program, affiliate system, and transactional emails via Resend — all on a Next.js + FastAPI stack.",
    descriptionPt:
      "Uma plataforma de e-commerce de beleza pronta para produção. Inclui quiz de produtos com OpenAI, processamento de pagamentos via MercadoPago, programa de pontos de fidelidade, sistema de afiliados e e-mails transacionais via Resend — tudo em um stack Next.js + FastAPI.",
    highlights: [
      "AI-powered product recommendation quiz via OpenAI",
      "MercadoPago payment processing with webhook handling",
      "Loyalty points & affiliate program",
      "SEO-optimized: sitemap, robots.txt, JSON-LD, OG meta",
      "Separated Next.js frontend + FastAPI backend architecture",
    ],
    highlightsPt: [
      "Quiz de recomendação de produtos com IA via OpenAI",
      "Processamento de pagamentos via MercadoPago com webhooks",
      "Programa de pontos de fidelidade e afiliados",
      "SEO otimizado: sitemap, robots.txt, JSON-LD, OG meta",
      "Arquitetura separada: frontend Next.js + backend FastAPI",
    ],
    status: "in-development",
    featured: true,
    year: 2026,
    tech: [
      { name: "Next.js 16", category: "frontend" },
      { name: "React 19", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "TailwindCSS", category: "frontend" },
      { name: "Framer Motion", category: "frontend" },
      { name: "FastAPI", category: "backend" },
      { name: "Python", category: "backend" },
      { name: "Supabase", category: "database" },
      { name: "PostgreSQL", category: "database" },
      { name: "OpenAI", category: "ai" },
      { name: "MercadoPago", category: "tool" },
      { name: "Resend", category: "tool" },
    ],
    links: {
      github: "https://github.com/km2s/beauty-store",
      live: "https://beauty-store-rose.vercel.app/",
    },
    architecture: [
      {
        layer: "Frontend",
        tech: ["Next.js 16 App Router", "React 19", "TailwindCSS 4", "Zustand", "Framer Motion"],
        description: "Static + dynamic pages, Zustand for cart state, Framer Motion for product transitions",
        descriptionPt: "Páginas estáticas + dinâmicas, Zustand para estado do carrinho, Framer Motion para transições",
      },
      {
        layer: "Backend",
        tech: ["FastAPI", "Python 3.12", "JWT Auth", "Pydantic"],
        description: "REST API with JWT authentication, Pydantic models, routers per domain (cart, orders, quiz, affiliates)",
        descriptionPt: "REST API com autenticação JWT, modelos Pydantic, routers por domínio (carrinho, pedidos, quiz, afiliados)",
      },
      {
        layer: "Database",
        tech: ["PostgreSQL", "Supabase"],
        description: "Products, collections, orders, users, points, affiliates — relational schema via Supabase",
        descriptionPt: "Produtos, coleções, pedidos, usuários, pontos, afiliados — schema relacional via Supabase",
      },
      {
        layer: "External Services",
        tech: ["OpenAI API", "MercadoPago", "Resend"],
        description: "GPT-powered quiz recommendations, payment processing, transactional email delivery",
        descriptionPt: "Recomendações do quiz via GPT, processamento de pagamentos, entrega de e-mails transacionais",
      },
      {
        layer: "Infrastructure",
        tech: ["Vercel (frontend)", "ASGI/Uvicorn (backend)"],
        description: "Frontend on Vercel, FastAPI on ASGI-compatible hosting with CORS configured",
        descriptionPt: "Frontend na Vercel, FastAPI em hospedagem ASGI-compatível com CORS configurado",
      },
    ],
  },
  {
    id: "revctl",
    name: "revctl",
    tagline: "Local AI code reviewer — zero data leaves your machine.",
    taglinePt: "Revisor de código com IA local — nenhum dado sai da sua máquina.",
    description:
      "A terminal tool that runs full code reviews on git changes using a local AI model via Ollama. Three modes: staged diff, specific commit, or branch comparison. No API keys, no subscriptions, no cloud.",
    descriptionPt:
      "Uma ferramenta de terminal que executa revisões completas de código em mudanças git usando um modelo de IA local via Ollama. Três modos: diff staged, commit específico ou comparação de branch. Sem chaves de API, sem assinaturas, sem cloud.",
    highlights: [
      "Fully local — no data sent to external servers ever",
      "Three review modes: diff, commit, branch (local PR)",
      "Focus flags: --focus security | performance | style",
      "Model-agnostic: swap any Ollama-compatible model",
      "Streaming responses with Rich terminal formatting",
    ],
    highlightsPt: [
      "Totalmente local — nenhum dado enviado para servidores externos",
      "Três modos de revisão: diff, commit, branch (PR local)",
      "Flags de foco: --focus security | performance | style",
      "Agnóstico de modelo: troque qualquer modelo compatível com Ollama",
      "Respostas em streaming com formatação Rich no terminal",
    ],
    status: "open-source",
    featured: true,
    year: 2026,
    tech: [
      { name: "Python", category: "backend" },
      { name: "Typer", category: "tool" },
      { name: "Ollama", category: "ai" },
      { name: "Rich", category: "tool" },
      { name: "qwen2.5-coder", category: "ai" },
    ],
    links: {
      github: "https://github.com/km2s/revctl",
    },
    architecture: [
      {
        layer: "Frontend",
        tech: ["Rich (terminal UI)", "Typer (CLI)"],
        description: "Terminal interface with styled panels, progress indicators, and streaming output",
        descriptionPt: "Interface de terminal com painéis estilizados, indicadores de progresso e saída em streaming",
      },
      {
        layer: "Backend",
        tech: ["Python 3.10+", "Ollama HTTP client", "Git subprocess"],
        description: "Git diff/commit/branch parsing, prompt construction, streaming Ollama API calls",
        descriptionPt: "Parsing de git diff/commit/branch, construção de prompts, chamadas streaming à API do Ollama",
      },
      {
        layer: "External Services",
        tech: ["Ollama (local)", "qwen2.5-coder:7b"],
        description: "Local inference via Ollama — model runs entirely on the user's CPU/GPU, no internet required",
        descriptionPt: "Inferência local via Ollama — o modelo roda inteiramente na CPU/GPU do usuário, sem internet",
      },
    ],
  },
  {
    id: "void-bot",
    name: "VOID Bot",
    tagline: "Modular Discord bot with AI persona, music, gacha, and community tools.",
    taglinePt: "Bot do Discord modular com persona de IA, música, gacha e ferramentas de comunidade.",
    description:
      "A full-featured Discord bot with a modular architecture covering security, community events, music playback, an AI character powered by OpenRouter, a news module, and a gacha card system.",
    descriptionPt:
      "Um bot do Discord completo com arquitetura modular cobrindo segurança, eventos de comunidade, reprodução de música, um personagem de IA via OpenRouter, módulo de notícias e sistema de cartas gacha.",
    highlights: [
      "AI character module via OpenRouter (free tier)",
      "Music playback with queue management",
      "Gacha/card collection system (Mudae-style)",
      "Community events, birthday tracking, ticket system",
      "Deployed on Railway with nixpacks",
    ],
    highlightsPt: [
      "Módulo de personagem IA via OpenRouter (plano gratuito)",
      "Reprodução de música com gerenciamento de fila",
      "Sistema gacha/coleção de cartas (estilo Mudae)",
      "Eventos de comunidade, rastreamento de aniversários, sistema de tickets",
      "Deploy no Railway com nixpacks",
    ],
    status: "live",
    featured: false,
    year: 2026,
    tech: [
      { name: "Node.js", category: "backend" },
      { name: "Discord.js", category: "tool" },
      { name: "OpenRouter AI", category: "ai" },
      { name: "Railway", category: "cloud" },
    ],
    links: {
      github: "https://github.com/km2s/void-bot",
    },
    architecture: [
      {
        layer: "Backend",
        tech: ["Node.js", "Discord.js v14"],
        description: "Event-driven bot with modular command handlers and slash command support",
        descriptionPt: "Bot orientado a eventos com handlers de comandos modulares e suporte a slash commands",
      },
      {
        layer: "External Services",
        tech: ["Discord API", "OpenRouter", "YouTube"],
        description: "Discord gateway, AI inference via OpenRouter, music streaming via ytdl",
        descriptionPt: "Gateway do Discord, inferência IA via OpenRouter, streaming de música via ytdl",
      },
      {
        layer: "Infrastructure",
        tech: ["Railway", "nixpacks"],
        description: "Always-on Railway deployment with nixpacks build detection",
        descriptionPt: "Deploy contínuo no Railway com detecção de build por nixpacks",
      },
    ],
  },
  {
    id: "repoaudit",
    name: "repoaudit",
    tagline: "CLI health audit tool for Node.js and TypeScript repositories.",
    taglinePt: "Ferramenta CLI de auditoria de saúde para repositórios Node.js e TypeScript.",
    description:
      "A static analysis CLI that audits repository health across 5 checks: outdated deps, circular imports, unused deps, env-var sync, and unused exports via TypeScript AST. Outputs to terminal, JSON, or HTML dashboard.",
    descriptionPt:
      "Uma CLI de análise estática que audita a saúde do repositório em 5 verificações: deps desatualizadas, imports circulares, deps não usadas, sincronização de env vars e exports não usados via TypeScript AST. Saída para terminal, JSON ou dashboard HTML.",
    highlights: [
      "5 static analysis checks including TypeScript AST analysis",
      "3 output formats: terminal, JSON (for CI), HTML dashboard",
      "Exits with code 1 on errors — CI-friendly",
      "Plugin architecture: implement Check interface to add checks",
      "Zero-config: auto-detects package manager from lockfile",
    ],
    highlightsPt: [
      "5 verificações de análise estática incluindo análise de AST TypeScript",
      "3 formatos de saída: terminal, JSON (para CI), dashboard HTML",
      "Sai com código 1 em erros — amigável para CI",
      "Arquitetura de plugins: implemente a interface Check para adicionar verificações",
      "Zero-config: detecta automaticamente o gerenciador de pacotes pelo lockfile",
    ],
    status: "open-source",
    featured: false,
    year: 2026,
    tech: [
      { name: "TypeScript", category: "backend" },
      { name: "Node.js", category: "backend" },
      { name: "ts-morph", category: "tool" },
      { name: "Commander.js", category: "tool" },
      { name: "madge", category: "tool" },
    ],
    links: {
      github: "https://github.com/km2s/repoaudit",
    },
    architecture: [
      {
        layer: "Frontend",
        tech: ["Terminal (picocolors + cli-table3)", "HTML (standalone)"],
        description: "Rich terminal output or self-contained HTML report with no external dependencies",
        descriptionPt: "Saída rica no terminal ou relatório HTML autocontido sem dependências externas",
      },
      {
        layer: "Backend",
        tech: ["TypeScript", "ts-morph (AST)", "madge (graph)", "Commander.js"],
        description: "Check runner orchestrates 5 analyzers in parallel, each implementing the Check interface",
        descriptionPt: "O check runner orquestra 5 analisadores em paralelo, cada um implementando a interface Check",
      },
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
