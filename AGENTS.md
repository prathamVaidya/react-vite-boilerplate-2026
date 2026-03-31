# AGENTS.md

## Project overview

<!-- TODO: add business logic here -->

This is a single-package React SPA built with Vite, TypeScript, and the [Feature-Sliced Design](https://feature-sliced.design/) architecture. It uses TanStack Router for routing, TanStack Query for async server state, TanStack React Form + Zod for form handling and validation, ky for HTTP requests, and i18next for internationalization. Linting and formatting are handled by the Oxc toolchain (oxlint + oxfmt). The React Compiler is enabled via Babel.

## Dev environment

- **Package manager:** pnpm (no workspace — single package).
- **Dev server:** `pnpm dev` starts Vite on `http://localhost:5173` by default.
- **Build:** `pnpm build` runs `tsc -b && vite build`.
- **Preview:** `pnpm start` serves the production build via `vite preview`.
- **Node target:** ES2023. TypeScript strict mode is on.
- **Path aliases:** Use `@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared` — they map to `src/<layer>`. These are configured in both `tsconfig.app.json` and `vite.config.ts`.
- **Environment variables:** Use Vite's `import.meta.env` with the `VITE_` prefix for client-exposed values. Never commit `.env` files.

## Architecture — Feature-Sliced Design (strict)

This project strictly follows FSD v2. Layer boundaries are enforced by oxlint via `no-restricted-imports` overrides in `.oxlintrc.json`.

### Layers (top → bottom)

| Layer | Alias | Purpose |
|-------|-------|---------|
| `src/app/` | `@app/*` | App-wide setup: providers, layouts, routing, i18n config |
| `src/pages/` | `@pages/*` | Route-level components composed from widgets/features |
| `src/widgets/` | `@widgets/*` | Composite UI blocks combining features/entities |
| `src/features/` | `@features/*` | User-facing interactions (forms, actions, queries) |
| `src/entities/` | `@entities/*` | Business entities (models, types, base UI for a domain object) |
| `src/shared/` | `@shared/*` | Reusable utilities, UI kit, API client, configs — no business logic |

### Import rules

- A layer may only import from layers **below** it: `app → pages → widgets → features → entities → shared`.
- **Features must not import other features.** Move shared logic to `entities` or `shared`.
- Every slice (folder inside a layer) must expose a **public API** via `index.ts`. External consumers import from `@features/<slice>`, never deeper (e.g. `@features/<slice>/model/queries` is forbidden).
- Run `pnpm lint` to verify boundaries — violations produce errors.

### Slice internal structure

Within a slice, use these segments as needed:

```
<slice>/
├── index.ts          # Public API — re-exports only
├── ui/               # React components
├── model/            # Business logic, hooks, queries, stores
├── api/              # API calls specific to this slice (rare — prefer @shared/api)
├── lib/              # Pure helpers scoped to the slice
└── __tests__/        # Unit/component tests
```

### Adding a new slice

1. Create the folder under the correct layer: `src/<layer>/<slice-name>/`.
2. Add an `index.ts` that re-exports the public API.
3. Use the `@<layer>/<slice>` alias to import from other layers.
4. Verify import boundaries pass: `pnpm lint`.

## Naming conventions

- **Files and folders:** `kebab-case` always. Enforced by `unicorn/filename-case` in oxlint.
- **React components:** `PascalCase` for the export, `kebab-case` for the file (e.g. `todo-list.tsx` exports `TodoList`).
- **Hooks:** `useCamelCase` (e.g. `useTodosQuery`).
- **Zod schemas:** `camelCaseSchema` (e.g. `exampleFormSchema`). Derive the type with `z.infer<typeof schema>`.
- **TypeScript:** Use `type` imports (`import type { ... }`) for type-only imports. Enforced by `typescript/consistent-type-imports`.

## Styling

<!-- TODO: add styling approach here -->

## API calls

- The shared HTTP client lives at `@shared/api/client.ts` and uses **ky** with a configurable `prefixUrl`.
- All data-fetching for UI should go through **TanStack Query** hooks. Place query hooks in the slice's `model/` segment (e.g. `model/queries.ts`).
- Pattern to follow:

```typescript
import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/api/client";

async function fetchItems(): Promise<Item[]> {
  return api.get("items").json<Item[]>();
}

export function useItemsQuery() {
  return useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });
}
```

<!-- TODO: add business logic here — document API base URLs, auth interceptors, error handling conventions -->

## Forms and validation

- Use **TanStack React Form** for form state and **Zod** for schema validation.
- Place schemas in the slice's `model/schema.ts` and export them from `index.ts`.
- Keep validation rules in Zod schemas, not in component code.

## Internationalization (i18n)

- Managed by **i18next** + **react-i18next**. Config lives at `src/app/i18n/config.ts`.
- Locale files: `locales/en.json`, `locales/es.json`.
- When adding user-facing text, **always** add the translation key to **all** locale JSON files. Use nested keys matching the structure: `"section.subsection.key"`.
- Use the `useTranslation` hook in components:

```typescript
const { t } = useTranslation();
return <h1>{t("pages.home.title")}</h1>;
```

## Linting and formatting

- **Linter:** oxlint with React, jsx-a11y, TypeScript, import, unicorn, and promise plugins.
- **Formatter:** oxfmt.
- **Lint:** `pnpm lint` (check) / `pnpm lint:fix` (auto-fix).
- **Format:** `pnpm format` (write) / `pnpm format:check` (check).
- Always run both before committing: `pnpm lint && pnpm format:check`.
- Config files: `.oxlintrc.json`, `.oxfmtrc.json`.

## Testing

- **Unit / component tests:** Vitest + Testing Library.
  - Place tests in `src/<layer>/<slice>/__tests__/<name>.test.ts(x)`.
  - Run all: `pnpm test:unit`.
  - Run in watch mode: `pnpm test:unit:watch`.
  - Run a specific test: `pnpm vitest run -t "<test name>"`.
- **E2E tests:** Playwright (Chromium).
  - Tests live in `__tests__/e2e/`.
  - Run all: `pnpm test:e2e` (auto-starts dev server on `127.0.0.1:4173`).
  - Run headed: `pnpm test:e2e:headed`.
  - Run with UI: `pnpm test:e2e:ui`.
- **Full suite:** `pnpm test` runs unit then E2E.
- Ask before writing tests unless the user explicitly requests them.

## Git conventions

### Branch naming

```
<type>/<short-description>
```

Types: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`.

Examples: `feat/add-user-profile`, `fix/broken-navigation`, `refactor/extract-auth-hook`.

### Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short summary>
```

Types: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`, `style`, `perf`, `ci`, `build`.

Examples:
- `feat: add user profile page`
- `fix: resolve broken navigation on mobile`
- `refactor: extract auth hook to shared layer`

### PR title format

Same as commit messages:

```
<type>: <short summary>
```

### Before committing

1. `pnpm lint` — all lint rules must pass.
2. `pnpm format:check` — formatting must be clean.
3. `pnpm test:unit` — unit tests must pass.
4. `tsc -b` — no type errors.

## Business logic

<!-- TODO: add business logic here — document domain concepts, key user flows, data models, and important behavioral rules -->
