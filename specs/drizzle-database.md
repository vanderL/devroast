# Database — Drizzle ORM + PostgreSQL

## Objetivo

Implementar a camada de persistência do DevRoast usando Drizzle ORM com PostgreSQL, rodando via Docker Compose para desenvolvimento local.

---

## Entidades extraídas do design

Baseado nas 3 telas do layout (.pen) e no README:

### Screen 1 — Code Input

- Usuário submete **código** com **linguagem** (auto-detect ou manual)
- Toggle de **roast mode** (boolean)
- Footer: "2,847 codes roasted · avg score: 4.2/10" → contadores agregados

### Screen 2 — Roast Results

- **Score** (3.5/10) com verdict ("needs_serious_help")
- **Roast message** (frase sarcástica)
- **Metadados**: linguagem, quantidade de linhas
- **Analysis issues**: lista de problemas, cada um com status (critical/warning/good), título e descrição
- **Diff/suggested fix**: código original vs código melhorado
- Botão **share_roast** → precisa de um identificador público (slug/id)

### Screen 3 — Shame Leaderboard

- Ranking de submissions por score (pior → melhor)
- Cada entry: rank, score, código (preview com syntax highlight), linguagem, quantidade de linhas
- Stats: total submissions, avg score

---

## Schema

### Enums

```typescript
// Severidade de um issue na análise
export const issueStatusEnum = pgEnum("issue_status", [
  "critical",
  "warning",
  "good",
]);

// Verdict geral do roast
export const verdictEnum = pgEnum("verdict", [
  "career_change_recommended", //score 0 - 0.5
  "needs_serious_help", // score 0.5 - 2
  "rough_around_edges", // score 2.1 - 4
  "not_bad", // score 4.1 - 6
  "actually_decent", // score 6.1 - 8
  "mass_respect", // score 8.1 - 10
]);
```

### Tabelas

#### `roasts`

Tabela principal — cada submission gera um roast.

| Coluna          | Tipo                            | Notas                                                   |
| --------------- | ------------------------------- | ------------------------------------------------------- |
| `id`            | `uuid` PK                       | default `gen_random_uuid()`                             |
| `code`          | `text` NOT NULL                 | código submetido pelo usuário                           |
| `language`      | `varchar(50)` NOT NULL          | linguagem detectada ou selecionada                      |
| `line_count`    | `integer` NOT NULL              | quantidade de linhas do código                          |
| `roast_mode`    | `boolean` NOT NULL DEFAULT true | se roast mode estava ativo                              |
| `score`         | `real` NOT NULL                 | nota 0.0–10.0                                           |
| `verdict`       | `verdict` NOT NULL              | enum do verdict                                         |
| `roast_message` | `text` NOT NULL                 | frase sarcástica principal                              |
| `suggested_fix` | `text`                          | código melhorado (pode ser null se não houver sugestão) |
| `created_at`    | `timestamp` NOT NULL            | default `now()`                                         |

#### `roast_issues`

Issues da análise detalhada, ligados a um roast.

| Coluna        | Tipo                             | Notas                                |
| ------------- | -------------------------------- | ------------------------------------ |
| `id`          | `uuid` PK                        | default `gen_random_uuid()`          |
| `roast_id`    | `uuid` FK → `roasts.id` NOT NULL | ON DELETE CASCADE                    |
| `status`      | `issue_status` NOT NULL          | critical, warning, good              |
| `title`       | `varchar(255)` NOT NULL          | ex: "using var instead of const/let" |
| `description` | `text` NOT NULL                  | explicação do problema               |
| `order`       | `integer` NOT NULL DEFAULT 0     | ordem de exibição                    |

### Índices

- `roasts.created_at` DESC — listagem cronológica
- `roasts.score` ASC — leaderboard (piores primeiro)
- `roast_issues.roast_id` — FK lookup

### Relacionamentos

```
roasts 1 ← N roast_issues
```

---

## Estrutura de arquivos

```
src/
└── db/
    ├── index.ts          # conexão (drizzle + postgres.js)
    ├── schema.ts         # enums + tabelas + relations
    └── migrations/       # gerado pelo drizzle-kit
drizzle.config.ts         # config do drizzle-kit
docker-compose.yml        # PostgreSQL
.env.local                # DATABASE_URL (gitignored)
```

---

## Docker Compose

```yaml
services:
  postgres:
    image: postgres:17-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: devroast
      POSTGRES_USER: devroast
      POSTGRES_PASSWORD: devroast
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

`DATABASE_URL=postgresql://devroast:devroast@localhost:5432/devroast`

---

## Dependências

```bash
# runtime
npm install drizzle-orm postgres

# dev
npm install -D drizzle-kit
```

- `postgres` (postgres.js) — driver leve, sem native bindings, funciona bem com Next.js
- `drizzle-orm` — ORM type-safe
- `drizzle-kit` — CLI para migrations e studio

---

## Decisões do produto

1. **Sharing**: URL usa UUID direto (`/roast/{uuid}`) — sem slug curto
2. **Rate limiting**: não implementar agora — fora do escopo do banco
3. **Permanência**: roasts são permanentes, sem soft delete

---

## To-dos

### Setup

- [ ] Criar `docker-compose.yml` na raiz com PostgreSQL 17
- [ ] Adicionar `DATABASE_URL` ao `.env.local` (e ao `.env.example`)
- [ ] Garantir `.env.local` está no `.gitignore`
- [ ] Instalar `drizzle-orm`, `postgres`, `drizzle-kit`

### Schema

- [ ] Criar `src/db/schema.ts` com enums, tabelas e relations
- [ ] Criar `src/db/index.ts` com conexão via postgres.js + drizzle
- [ ] Criar `drizzle.config.ts` apontando para schema e DATABASE_URL

### Migrations

- [ ] Gerar migration inicial com `npx drizzle-kit generate`
- [ ] Aplicar migration com `npx drizzle-kit migrate`
- [ ] Adicionar scripts ao `package.json`: `db:generate`, `db:migrate`, `db:studio`

### Validação

- [ ] Subir PostgreSQL via `docker compose up -d`
- [ ] Rodar migrations e verificar tabelas criadas
- [ ] Testar insert/select básico via drizzle studio (`npx drizzle-kit studio`)
