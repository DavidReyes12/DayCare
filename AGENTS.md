<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## MCPs
- Playwright Screenshots y cualquier cosa relacionada a playwright tienen que estar en la carpeta .playwright-mcp.
- Context7 usaremos este MCP para traer la documentación actualizada del framework.
- Supabase MCP está habilitado en la config global (`~/.config/opencode/opencode.jsonc`), tipo remote, project ref `ructjmvrvoxvcnwqhvte` y features `docs,account,database,debugging,development,functions,branching,feedback,notebooks`. Usarlo para inspeccionar schema, correr SQL, leer logs, gestionar edge functions/migraciones y generar tipos TypeScript.

## Spec Driven Development - Skills
- /spec usaremos esta habilidad para crear las especificaciones.
- /spec-impl usaremos esta skill para hacer las implementaciones, recuerda ir paso por paso.

## Skills instaladas
- Viven en `.agents/skills/` y quedan fijadas (hash) en `skills-lock.json`. Fuente: `supabase/agent-skills` (GitHub). Reinstalar/actualizar con `npx skills add supabase/agent-skills`.
- `supabase`: cargar antes de cualquier tarea de Supabase (Database, Auth, Edge Functions, Realtime, Storage, RLS, `@supabase/ssr`, CLI, MCP, debugging de errores/permisos). Supabase cambia seguido: revisar `https://supabase.com/changelog.md` y docs actuales antes de implementar, no confiar en memoria del modelo.
- `supabase-postgres-best-practices`: cargar antes de escribir o cambiar cualquier cosa en Postgres (tablas, columnas, tipos, migraciones, RLS y sus tests, índices, triggers, funciones, pg_cron, pgmq, pgvector, `pg_restore`) y al diagnosticar queries lentas, timeouts, locks, conexiones o filas visibles para el usuario incorrecto.

## Supabase
- Estado actual: **nada implementado**. No hay dependencias `@supabase/*` en `package.json`, ni carpeta `supabase/`, ni `config.toml`. El schema objetivo está en el reference `DB-Schema` (`../07-DB-Schema/opendaycare-database-schema.md`); crearlo vía migraciones versionadas (CLI o MCP), nunca a mano en el dashboard sin migración.
- Env: `.env.template` solo declara `SUPABASE_DB_PASSWORD`. Los `.env*` están gitignoreados. Claves publishable en el cliente; `service_role`/secret key solo server-side (en Next.js todo `NEXT_PUBLIC_*` termina en el browser).
- Seguridad obligatoria: RLS activo en toda tabla de schema expuesto (`public`), policies con `TO authenticated` + predicado de dueño (`(select auth.uid()) = user_id`), nunca `user_metadata` para autorización (usar `app_metadata`), `SECURITY DEFINER` solo si es imprescindible y fuera de schema expuesto.
- Cliente: cuando se integre, usar `@supabase/ssr` para App Router (cookies server-side), con versiones pinneadas y lockfile commiteado.

## Reglas de código
- Usar código limpio, nombres, funciones, variables, etc. en inglés.

## Commands
- Dev/build/start/lint: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.
- Typecheck: `npx tsc --noEmit`. No test script or test runner is configured.
- App-only lint: `npx eslint app` (full `npm run lint` also scans `references/pantallas/support.js`, a vendored design runtime, and reports 2 pre-existing errors there).

## Structure
- Next.js 16 App Router. App code in `app/` (`layout.tsx`, `page.tsx`, `globals.css`). Path alias `@/*` -> repo root.
- `references/pantallas/*.dc.html` are standalone design mockups rendered by the vendored `references/pantallas/support.js` runtime; `references/screenshots/` has PNG targets. Not app code — don't import or edit as source. Covers two roles (staff/educator and family/parent) plus auth/account flows.
- Design palette: warm cream `#F6ECDF`, ink `#3F362E`, coral `#D9583C`/`#F2937A`; fonts Fredoka + Nunito.
- `public/` static assets.

## Next.js 16 quirks
- Experimental flags enabled in `next.config.ts`: `cacheComponents`, `partialPrefetching`, `agentFeedback`.
- Tailwind v4 is wired via a Turbopack rule (`*.css` -> `@tailwindcss/turbopack`); `globals.css` uses `@import "tailwindcss"`. No PostCSS config.
- Typed route helpers `LayoutProps`/`PageProps` are globally available; root layout uses `LayoutProps<"/">`.
- `next-env.d.ts` is generated — don't edit.

## Gotchas
- Gitignored: `.next/`, `node_modules/`, `.playwright-mcp/*`, env files (`.env*`).
- Verify changes with `npm run build` + `npx tsc --noEmit` + `npx eslint app`.

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
