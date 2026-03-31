# React Dashboard Template

A template repository for bootstrapping React SPAs with a production-ready stack and [Feature-Sliced Design](https://feature-sliced.design/) architecture.

## Using this template

Click **"Use this template"** on GitHub to create a new repository, then:

```sh
git clone <your-new-repo-url>
cd <your-new-repo>
pnpm install
pnpm dev
```

## Stack

| Category      | Tool                           |
| ------------- | ------------------------------ |
| Framework     | React 19, TypeScript, Vite     |
| Routing       | TanStack Router                |
| Server state  | TanStack Query                 |
| Forms         | TanStack React Form + Zod      |
| HTTP          | ky                             |
| i18n          | i18next + react-i18next        |
| Lint / Format | oxlint + oxfmt (Oxc toolchain) |
| Unit tests    | Vitest + Testing Library       |
| E2E tests     | Playwright                     |
| Compiler      | React Compiler (via Babel)     |
| Architecture  | Feature-Sliced Design          |

## Scripts

| Script           | Description                         |
| ---------------- | ----------------------------------- |
| `pnpm dev`       | Start dev server                    |
| `pnpm build`     | Type-check and build for production |
| `pnpm start`     | Preview production build            |
| `pnpm lint`      | Run oxlint                          |
| `pnpm format`    | Format with oxfmt                   |
| `pnpm test`      | Run unit + E2E tests                |
| `pnpm test:unit` | Run unit tests only                 |
| `pnpm test:e2e`  | Run E2E tests only                  |

## Project structure

```
src/
├── app/          # Providers, layouts, routing, i18n config
├── pages/        # Route-level components
├── widgets/      # Composite UI blocks
├── features/     # User-facing interactions
├── entities/     # Business entities and domain models
└── shared/       # Utilities, API client, UI kit
```

See [AGENTS.md](./AGENTS.md) for detailed architecture rules, conventions, and contributor guidelines.

## License

<!-- TODO: choose a license -->
