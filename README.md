# DevRoast

Paste your code. Get roasted.

DevRoast é uma plataforma onde desenvolvedores submetem trechos de código e recebem "roasts" — críticas bem-humoradas e sarcásticas sobre a qualidade do código, acompanhadas de um score de 0 a 10.

> Este projeto foi construído como estudo prático de **MCP (Model Context Protocol)**, explorando como agentes de IA podem colaborar no desenvolvimento de aplicações web completas.

## Funcionalidades

- **Code Input** — Cole seu código no editor com numeração de linhas e escolha o modo de roast
- **Análise com Score** — Receba uma nota de qualidade exibida em um ring visual
- **Críticas Detalhadas** — Cards de análise categorizados por severidade (critical, warning, good)
- **Shame Leaderboard** — Ranking dos piores códigos já submetidos, porque a vergonha motiva
- **Component Library** — Página dedicada com todos os componentes do design system

## Preview

A home apresenta um editor minimalista estilo terminal com o convite "paste your code. get roasted." — submit e veja o resultado.

O leaderboard mostra os top códigos mais roasted com score, preview do trecho e linguagem.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Sobre o estudo de MCP

Este app foi inteiramente desenvolvido com auxílio de agentes de IA via MCP, servindo como caso de estudo para entender:

- Como estruturar prompts e contexto para agentes criarem componentes consistentes
- O uso de arquivos `AGENTS.md` para guiar padrões de código
- Fluxo de trabalho colaborativo entre desenvolvedor e IA no desenvolvimento frontend
