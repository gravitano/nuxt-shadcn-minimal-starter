# Repository Guidelines

## Project Structure & Module Organization
The Nuxt 4 application lives in `app/`. Use `app/pages` for routed views, `app/components` for shared UI, and `app/lib` for composables or shared logic. Global styles and Tailwind tokens live at `app/assets/css/tailwind.css`. Static files belong in `public/`. Nitro server handlers live under `server/api`, while Drizzle schema and connection helpers sit in `server/database/` (see `drizzle.config.ts` for CLI settings). The TypeScript alias `@/*` resolves to `app/*`; prefer it over long relative paths. Shadcn component registry config is tracked at `components.json`—update it whenever you scaffold new UI pieces.

## Build, Test, and Development Commands
Install dependencies with `pnpm install`. Run `pnpm dev` for local development on http://localhost:3000. Create production bundles via `pnpm build`, pre-render static output with `pnpm generate`, and validate the production build locally using `pnpm preview`. Database utilities: `pnpm db:generate` for SQL, `pnpm db:push` or `pnpm db:migrate` to apply changes, `pnpm db:studio` for inspection, and `pnpm db:seed` to load demo Slack data. Copy `.env.example` to `.env` (or export the vars inline) before running any Drizzle command. After dependency updates, re-run `pnpm postinstall` to refresh Nuxt-generated types.

## Coding Style & Naming Conventions
This project uses Vue 3 `<script setup>` with TypeScript. Follow the Nuxt ESLint preset shipped through `@nuxt/eslint`; execute `pnpm dlx eslint .` before opening a pull request. Prefer two-space indentation, single quotes in scripts, and kebab-case for Vue component filenames (`app/components/message-item.vue`). Name composables with a `use` prefix (`app/lib/useChannel.ts`). Tailwind utility classes drive styling—centralize design tokens in `app/assets/css/tailwind.css`.

## Testing Guidelines
Adopt `@nuxt/test-utils` for component and integration tests. Place unit tests alongside the feature in directories such as `app/components/__tests__` or `app/lib/__tests__`. Snapshot-heavy fixtures can live under `app/tests/fixtures`. Run suites with `pnpm dlx nuxi test` (add a `test` script mirroring this command once tests exist). Prioritize coverage for interactive flows like forms, dialogs, and data tables.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commits (`feat:`, `chore:`, etc.); continue that style. Keep commits focused and descriptive (`feat: add channel topic editor`). Pull requests should include: a concise behaviour summary, linked issues or tasks, screenshots for UI updates, and the test or lint commands you ran. Request review only after checks pass locally.

## Agent Workflow Notes
Log any automated code-generation decisions in the PR description. Ensure required env vars like `DATABASE_URL` and `CURRENT_USER_ID` are documented when your change depends on them. When adding dependencies, update `pnpm-lock.yaml` in the same commit and briefly justify the addition to help reviewers.
