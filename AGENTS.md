# AGENTS.md

Guidance for AI coding agents working in this repository. `CLAUDE.md` imports this file, so this is the single source of truth.

## Project

**BayWashCare** is a new business that manages car services, primarily car cleaning/washing.

This repo is the company website. Current phase: a simple **"Coming Soon" landing page** (hero section only) announcing that the application is on the way. The backend will be built after the frontend.

## Status

- Phase 1: Landing page with hero section ("coming soon") — **in progress**
- Phase 2: Backend — not started
- Phase 3: Full application (booking, services, accounts) — not started

## Tech stack

| Area | Choice |
|------|--------|
| Frontend framework | Next.js (App Router) + React + TypeScript |
| Styling | Tailwind CSS v4 |
| UI components | shadcn/ui (Base UI), added via `npx shadcn@latest add <component>` |
| Icons / theming | lucide-react, next-themes |
| Package manager | npm |
| Formatting / linting | Prettier (with Tailwind plugin), ESLint |
| Hosting | TBD |
| Backend | TBD (after frontend) |

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server
npm run build        # production build
npm run start        # serve production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run format       # Prettier
```

## Conventions

- Keep it simple. This is a landing page; do not add features, pages, or dependencies that were not asked for.
- Brand name is written **BayWashCare** in user-facing copy (repo/package names use `baywashcare`).
- Mobile-first and responsive; most visitors will be on phones.
- Accessible by default: semantic HTML, alt text, sufficient color contrast, keyboard-friendly.
- Fast by default: optimized images, minimal JS, good Lighthouse scores.
- Keep SEO basics in place: title, meta description, Open Graph tags, favicon.
- Never commit secrets. Use `.env` files (git-ignored) and keep a `.env.example` with placeholder values.

## Workflow

- Work on feature branches off `main`; keep commits small and focused with clear messages.
- Do not commit or push unless asked.
- Ask before adding a new dependency or making an architectural decision not covered here.
- When a decision is made (stack, hosting, tooling), update this file.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
