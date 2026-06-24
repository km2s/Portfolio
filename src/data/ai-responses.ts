import type { AIResponse } from "@/types"

export const aiResponsesEn: AIResponse[] = [
  {
    triggers: ["who is karine", "tell me about karine", "about karine", "karine miranda"],
    response:
      "Karine Miranda is a Full Stack Engineer based in Rio de Janeiro, Brazil, currently working as a Software Development Intern at Globo. At Globo she builds reusable frontend components with Vue.js, TypeScript and Vuetify. Outside of work, she ships complete products: a full-featured TTRPG platform, an AI-powered e-commerce, and local developer tools. Previous experience at Equinix. Open to remote opportunities worldwide.",
    followUp: ["What technologies does she know?", "What's her experience level?", "Explain Saga RPG"],
  },
  {
    triggers: ["technologies", "tech stack", "skills", "what does she know", "languages"],
    response:
      "At Globo her daily stack is Vue.js, TypeScript and Vuetify. For personal projects she uses Next.js/React on the frontend, Python/FastAPI or Node.js/NestJS on the backend, and PostgreSQL via Supabase with Prisma. For AI: OpenAI API, local models via Ollama, and prompt engineering. Tools: Docker, Git, Prisma, Vercel, Railway. Also has experience with Angular and is studying C/C++, Flutter, and Data Science.",
    followUp: ["Tell me about Karine", "What's her experience level?", "Explain Beauty Store"],
  },
  {
    triggers: ["saga", "saga rpg", "rpg", "ttrpg"],
    response:
      "Saga RPG is Karine's most ambitious project — a complete web platform for tabletop RPG campaigns. It supports character sheets for 5 game systems (D&D 5e, Vampire the Masquerade, Call of Cthulhu, Sci-Fi, Generic), a real-time virtual table with drag-and-drop tokens and fog of war, initiative tracker, handout sharing, and a Discord bot for in-server dice rolls. Built as a pnpm monorepo with Next.js 14, Supabase/PostgreSQL, and Discord.js. Live on Vercel.",
    followUp: ["Explain Beauty Store", "Tell me about revctl", "What technologies does she know?"],
  },
  {
    triggers: ["beauty store", "e-commerce", "beauty", "store"],
    response:
      "Beauty Store is a production-grade e-commerce for a beauty brand. The highlight is an OpenAI-powered product recommendation quiz that analyzes skin type and preferences. It also has MercadoPago payment processing, a loyalty points program, an affiliate system, transactional emails via Resend, and full SEO. Architecture: Next.js 16 + React 19 frontend with Zustand, separate FastAPI backend in Python, PostgreSQL via Supabase.",
    followUp: ["Tell me about revctl", "What's her experience level?", "What technologies does she know?"],
  },
  {
    triggers: ["revctl", "code review", "local ai", "ollama"],
    response:
      "revctl is a developer tool Karine built and open-sourced. It runs AI code reviews on git changes using a local model via Ollama — no API keys, no subscriptions, no data ever leaves your machine. Three modes: staged diff, specific commit, or branch comparison. You can focus with --focus security | performance | style flags. Built with Python, Typer, and Rich for terminal output. Default model: qwen2.5-coder:7b.",
    followUp: ["Tell me about repoaudit", "What technologies does she know?", "Explain Saga RPG"],
  },
  {
    triggers: ["experience", "globo", "work", "job", "internship", "seniority", "level", "equinix"],
    response:
      "Karine is currently a Software Development Intern at Globo — working on production systems. Before Globo she was an Administrative Apprentice at Equinix (2022–2024), a global data center company. She operates as a capable mid-level full-stack engineer: architectural decisions, monorepo management, third-party integrations, AI tooling. Open to remote roles worldwide.",
    followUp: ["Tell me about Karine", "What technologies does she know?", "How can I contact her?"],
  },
  {
    triggers: ["education", "studying", "university", "college", "degree"],
    response:
      "Karine is simultaneously pursuing Computer Science at IBMR (2023–2027) and Systems Analysis and Development at Universidade Veiga de Almeida (2023–2026). Outside of formal education, she learns by building — every project on this portfolio was a learning exercise that became a real product. Currently also studying C/C++, Flutter, Data Science (PyTorch, Pandas), and Java.",
    followUp: ["Tell me about Karine", "What technologies does she know?"],
  },
  {
    triggers: ["contact", "hire", "available", "reach", "email", "linkedin"],
    response:
      "Karine is open to remote opportunities worldwide — full-time, contract, or freelance. Email: karinemsilva245@gmail.com. GitHub: @km2s. LinkedIn: linkedin.com/in/karinems. She's particularly interested in Full Stack and AI-focused roles at product-driven companies. Response time is usually within 24 hours.",
    followUp: ["Tell me about Karine", "What's her experience level?"],
  },
  {
    triggers: ["architecture", "system design", "design", "how does"],
    response:
      "Karine thinks in systems. Her projects show deliberate choices: separate Next.js frontends from FastAPI backends when the domain warrants it, pnpm monorepos to share types across apps, PostgreSQL for relational correctness, and privacy-first design (revctl's local-only model). The Architecture Explorer on this page shows the layer breakdown for each project.",
    followUp: ["Explain Saga RPG", "Explain Beauty Store", "Tell me about revctl"],
  },
]

export const aiResponsesPt: AIResponse[] = [
  {
    triggers: ["quem é karine", "sobre karine", "karine miranda", "me fale", "fale sobre"],
    response:
      "Karine Miranda é Engenheira Full Stack do Rio de Janeiro, Brasil, atualmente Estagiária de Desenvolvimento na Globo. Na Globo desenvolve componentes reutilizáveis com Vue.js, TypeScript e Vuetify. Fora do trabalho, entrega produtos completos: plataforma de RPG, e-commerce com IA, ferramentas de código para devs. Experiência anterior na Equinix. Disponível para oportunidades remotas no mundo todo.",
    followUp: ["Quais tecnologias ela usa?", "Qual o nível de experiência?", "Explica o Saga RPG"],
  },
  {
    triggers: ["tecnologias", "tech stack", "skills", "o que ela sabe", "linguagens", "o que ela usa"],
    response:
      "Na Globo o stack diário é Vue.js, TypeScript e Vuetify. Nos projetos pessoais usa Next.js/React no frontend, Python/FastAPI ou Node.js/NestJS no backend, e PostgreSQL via Supabase com Prisma. Para IA: OpenAI API, modelos locais via Ollama, prompt engineering. Ferramentas: Docker, Git, Prisma, Vercel, Railway. Também tem experiência com Angular e está estudando C/C++, Flutter e Data Science.",
    followUp: ["Fale sobre Karine", "Qual o nível de experiência?", "Explica o Beauty Store"],
  },
  {
    triggers: ["saga", "saga rpg", "rpg", "ttrpg"],
    response:
      "Saga RPG é o projeto mais ambicioso da Karine — uma plataforma completa para campanhas de RPG de mesa. Suporta fichas de personagem para 5 sistemas (D&D 5e, Vampiro, CoC, Sci-Fi, Genérico), mesa virtual com tokens drag-and-drop e névoa de guerra, tracker de iniciativa, compartilhamento de handouts e bot Discord para rolagens no servidor. Monorepo pnpm com Next.js 14, Supabase/PostgreSQL e Discord.js. No ar na Vercel.",
    followUp: ["Explica o Beauty Store", "Fale sobre o revctl", "Quais tecnologias ela usa?"],
  },
  {
    triggers: ["beauty store", "e-commerce", "beauty", "loja"],
    response:
      "Beauty Store é um e-commerce completo para uma marca de beleza. O destaque é um quiz de recomendação de produtos por IA (OpenAI), que analisa tipo de pele e preferências. Também tem processamento de pagamentos via MercadoPago, programa de fidelidade por pontos, sistema de afiliados, e-mails transacionais via Resend e SEO completo. Arquitetura: Next.js 16 + React 19 com Zustand no frontend, FastAPI separado em Python, PostgreSQL via Supabase.",
    followUp: ["Fale sobre o revctl", "Qual o nível de experiência?", "Quais tecnologias ela usa?"],
  },
  {
    triggers: ["revctl", "revisão de código", "code review", "ollama", "ia local"],
    response:
      "revctl é uma ferramenta para devs que a Karine desenvolveu e tornou open source. Roda revisões de código em mudanças do git usando um modelo local via Ollama — sem API keys, sem assinaturas, sem nenhum dado sendo enviado para fora da sua máquina. Três modos: diff de staged, commit específico ou comparação de branch. Flag --focus security | performance | style. Feito com Python, Typer e Rich para o terminal. Modelo padrão: qwen2.5-coder:7b.",
    followUp: ["Fale sobre o repoaudit", "Quais tecnologias ela usa?", "Explica o Saga RPG"],
  },
  {
    triggers: ["experiência", "globo", "trabalho", "emprego", "estágio", "nível", "equinix", "sênior", "júnior"],
    response:
      "Karine é atualmente Estagiária de Desenvolvimento na Globo, trabalhando em sistemas de produção que servem milhões de usuários. Antes da Globo, foi Jovem Aprendiz na Equinix (2022–2024), empresa global de data centers. Funciona como engenheira full-stack de nível médio capaz: decisões de arquitetura, gestão de monorepo, integrações com terceiros, ferramentas de IA. Disponível para vagas remotas no mundo todo.",
    followUp: ["Fale sobre Karine", "Quais tecnologias ela usa?", "Como entrar em contato?"],
  },
  {
    triggers: ["educação", "faculdade", "universidade", "estudando", "formação"],
    response:
      "Karine está cursando simultaneamente Ciências da Computação no IBMR (2023–2027) e Análise e Desenvolvimento de Sistemas na Universidade Veiga de Almeida (2023–2026). Fora da educação formal, aprende construindo — cada projeto deste portfólio foi um exercício de aprendizado que virou produto real. Estudando também C/C++, Flutter, Data Science (PyTorch, Pandas) e Java.",
    followUp: ["Fale sobre Karine", "Quais tecnologias ela usa?"],
  },
  {
    triggers: ["contato", "contratar", "disponível", "email", "linkedin", "como falar"],
    response:
      "Karine está disponível para oportunidades remotas no mundo todo — CLT, PJ ou freelance. E-mail: karinemsilva245@gmail.com. GitHub: @km2s. LinkedIn: linkedin.com/in/karinems. Telefone: +55 (21) 99061-7617. Tem especial interesse em vagas full-stack e com foco em IA. Resposta geralmente em até 24h.",
    followUp: ["Fale sobre Karine", "Qual o nível de experiência?"],
  },
  {
    triggers: ["arquitetura", "design de sistemas", "como funciona", "sistema"],
    response:
      "Karine pensa em sistemas. Seus projetos mostram escolhas deliberadas: separa frontends Next.js de backends FastAPI quando faz sentido, usa monorepos pnpm para compartilhar tipos, PostgreSQL para correção relacional, e design privacy-first (modelo local do revctl). O Explorador de Arquitetura nesta página mostra o detalhamento de camadas de cada projeto.",
    followUp: ["Explica o Saga RPG", "Explica o Beauty Store", "Fale sobre o revctl"],
  },
]

export const aiResponses = aiResponsesEn

export const defaultPromptsEn = [
  "Tell me about Karine",
  "What technologies does she know?",
  "Explain Saga RPG",
  "What's her experience level?",
]

export const defaultPromptsPt = [
  "Quem é Karine?",
  "Quais tecnologias ela usa?",
  "Explica o Saga RPG",
  "Qual o nível de experiência?",
]
