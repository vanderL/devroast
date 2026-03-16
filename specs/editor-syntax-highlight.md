# Editor com Syntax Highlight

## Objetivo

Transformar o `CodeInput` atual (textarea puro) em um editor que aplica syntax highlight em tempo real conforme o usuário cola/digita código. A linguagem deve ser detectada automaticamente, com opção de seleção manual.

---

## Estado atual

- **`CodeInput`** — textarea com line numbers, sem highlight, client component
- **`CodeBlock`** — server component com Shiki (tema "vesper"), read-only, usa `codeToHtml`
- **Shiki v4** já está no projeto como dependência

---

## Pesquisa: como o ray-so faz

O ray-so (Raycast) usa uma abordagem simples e eficaz:

| Camada | Solução |
|---|---|
| **Input** | `<textarea>` nativo transparente |
| **Highlight** | Shiki — `codeToHtml()` renderizado via `dangerouslySetInnerHTML` sob o textarea |
| **Auto-detect** | highlight.js (`highlightAuto()`) — usado **apenas** para detecção, não para renderização |
| **Estado** | Jotai atoms (code, language, highlighter) |

**Padrão "textarea overlay"**: textarea com `color: transparent` + `caret-color: white` empilhado sobre um `<pre>` com o HTML do Shiki. O usuário digita no textarea mas vê o output do Shiki. Font, padding, line-height precisam ser idênticos entre os dois.

---

## Opções avaliadas

### 1. Textarea overlay + Shiki (abordagem ray-so) ✅ Recomendado

- **Bundle extra**: ~0 KB (Shiki já existe)
- **Como funciona**: textarea transparente + `<pre>` com output do Shiki sincronizados
- **Prós**: zero dependência nova para highlight, controle total do visual, se encaixa no design terminal
- **Contras**: precisa sincronizar scroll, font-metrics, e lidar com highlight async (debounce)
- **Complexidade**: média

### 2. react-simple-code-editor + Shiki

- **Bundle extra**: ~3.4 KB
- **Como funciona**: lib que abstrai o pattern textarea overlay internamente
- **Prós**: menos código manual, API simples (`highlight` callback)
- **Contras**: não tem releases recentes, highlight callback espera retorno síncrono (Shiki é async — precisa wrapper com useEffect/cache)
- **Complexidade**: baixa

### 3. CodeMirror 6

- **Bundle extra**: ~135 KB gzipped (editor + 1 linguagem)
- **Como funciona**: editor completo com extensões modulares
- **Prós**: undo/redo robusto, bracket matching, acessibilidade, usado pelo Replit/Sourcegraph
- **Contras**: pesado para um use case de "cole e veja", theming exige adaptar nosso design system
- **Complexidade**: média-alta

### 4. Monaco Editor

- **Bundle extra**: 2.4-5 MB
- **Descartado**: overkill total, péssimo para SSR/Next.js, visual VS Code incompatível com nosso design

---

## Opções de auto-detecção de linguagem

| Lib | Tamanho | Precisão | Notas |
|---|---|---|---|
| **highlight.js `highlightAuto()`** | ~20-80 KB (core + langs) | ~70-80% | Mesmo approach do ray-so. Usa apenas para detectar, não renderiza |
| **@vscode/vscode-languagedetection** | ~4 MB (modelo ML) | ~93% | Pesado demais para client. Viável como server action no Next.js |
| **Heurística custom** | ~0 KB | ~60-70% para top 15 langs | 30 linhas de regex patterns (`def ` → Python, `fn ` → Rust, `func ` → Go, etc) |
| **Híbrido: heurística + hljs** | ~20-80 KB | ~85% | Heurística pega casos óbvios, hljs cobre o resto |

---

## Decisão recomendada

**Textarea overlay + Shiki + highlight.js para auto-detect** (espelho do ray-so)

Motivos:
- Shiki já está no projeto — zero KB extra para highlight
- highlight.js é battle-tested para detecção e leve o suficiente
- Controle total do CSS/layout para manter o design terminal
- Padrão comprovado pelo ray-so em produção

---

## Decisões do produto

1. **Escopo de edição**: apenas colar e ver highlight — sem tab indent, bracket matching ou features de escrita
2. **Seletor de linguagem**: dropdown no header do window (ao lado dos dots) + auto-detect no paste/blur
3. **Linguagens**: web + backend popular (ver lista abaixo)
4. **Trigger do highlight**: no paste e no blur — não a cada keystroke
5. **Placeholder**: código placeholder atual continua, renderizado com highlight

### Linguagens suportadas

Web: `html`, `css`, `javascript`, `typescript`, `jsx`, `tsx`
Backend: `python`, `java`, `go`, `rust`, `ruby`, `php`, `c`, `cpp`, `csharp`
Infra/outros: `sql`, `bash`, `json`, `yaml`, `markdown`

Total: ~20 linguagens

---

## To-dos

### Setup
- [ ] Instalar `highlight.js` para auto-detecção de linguagem
- [ ] Definir mapa de linguagens (`LANGUAGES`) — chave hljs → grammar Shiki + label pro dropdown

### Hooks
- [ ] Criar hook `useShikiHighlighter` — inicializa Shiki client-side, lazy load de grammars por linguagem
- [ ] Criar hook `useLanguageDetection` — wrappa `hljs.highlightAuto()` limitado ao subset de ~20 langs

### Componente CodeInput (refactor)
- [ ] Aplicar pattern textarea overlay: textarea `color: transparent` + `caret-color` visível sobre `<pre>` com HTML do Shiki
- [ ] Garantir font-metrics idênticos entre textarea e pre (font-family, font-size, line-height, padding, tab-size, letter-spacing)
- [ ] Sincronizar scroll entre textarea e pre (onScroll → scrollTop/scrollLeft no pre)
- [ ] Highlight dispara no `onPaste` e no `onBlur` (não a cada keystroke)
- [ ] Line numbers sincronizados com o código real
- [ ] Placeholder com highlight (código fixo atual renderizado via Shiki ao montar)

### Dropdown de linguagem
- [ ] Criar componente dropdown no header do window (posição: direita, ao lado dos dots ou no canto oposto)
- [ ] Estado: `detectedLanguage` (auto) vs `selectedLanguage` (manual) — manual tem prioridade
- [ ] Ao trocar linguagem manual, re-highlight com a grammar selecionada
- [ ] Label "auto" quando usando detecção automática

### Integração
- [ ] Integrar com fluxo de "roast" — submit envia código + linguagem (detectada ou manual)
- [ ] Testar com pastes grandes (~200 linhas) — verificar performance do Shiki client-side
