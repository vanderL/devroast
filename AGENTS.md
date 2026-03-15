# DevRoast — Padrões Globais

## Sobre

DevRoast é uma plataforma de code roasting onde devs submetem código e recebem críticas sarcásticas com score de qualidade. Construído como projeto de estudo de MCP (Model Context Protocol).

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5
- **Styling:** Tailwind CSS v4 + tailwind-variants
- **Syntax highlight:** Shiki
- **Linting/Formatting:** Biome
- **UI base:** @base-ui/react (headless)

## Estrutura

```
src/
├── app/              # Pages e layouts (App Router)
│   ├── page.tsx      # Home — input de código + leaderboard preview
│   └── components/   # Showcase da component library
└── components/ui/    # Primitivos UI (ver AGENTS.md local)
```

## Convenções

- **Named exports only** — nunca `export default` em componentes UI
- **forwardRef + tv()** em todo componente UI
- **Composição > props monolíticas** — sub-componentes nomeados com exports individuais
- **Design tokens** definidos em `globals.css` via `@theme inline`
- **font-mono** (JetBrains Mono) como fonte principal
- **Português** para documentação e comentários de contexto
- **Biome** para lint e format — respeitar config existente (`biome.json`)
