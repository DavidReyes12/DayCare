# SPEC 07 — Tabla `daycares` (primera migración Supabase)

> **Status:** Approved
> **Depends on:** none (schema objetivo: `../07-DB-Schema/opendaycare-database-schema.md`, tabla 1)
> **Date:** 2026-11-14
> **Objective:** Crear la tabla raíz `daycares` en el proyecto Supabase `ructjmvrvoxvcnwqhvte` usando el patrón de migraciones versionadas: el SQL vive commiteado en `supabase/migrations/` del repo (fuente de verdad) y se aplica al proyecto remoto con `apply_migration` del MCP de Supabase. Incluye `ENABLE ROW LEVEL SECURITY` sin policies (deny-all hasta la spec de auth) y un seed de 4 guarderías donde la importante es "Guardería Sala Soles".

## Scope

**In:**

- Crear la carpeta `supabase/migrations/` en el repo con el archivo `create_daycares.sql` (nombre final: `<version>_create_daycares.sql`, donde `<version>` coincide con la versión que registre `apply_migration`, formato `YYYYMMDDHHMMSS`).
- Definir la tabla exactamente según el diccionario de datos:
  - `id uuid PK default gen_random_uuid()`
  - `name text NOT NULL`
  - `created_at timestamptz NOT NULL default now()`
  - Sin `updated_at` (el diccionario no lo lista para `daycares`).
- `alter table public.daycares enable row level security;` sin crear ninguna policy (no existe aún `users` ni auth; toda lectura/escritura por API queda denegada por defecto; las escrituras de la propia migración y future service_role no se ven afectadas).
- Seed dentro de la misma migración: `insert` de 4 filas, incluyendo `'Guardería Sala Soles'` (ver Open Questions por los otros 3 nombres).
- Aplicar la migración al proyecto remoto con la herramienta MCP `supabase.apply_migration({ name: 'create_daycares', query: <sql> })`.
- Verificar el estado remoto (ver Acceptance criteria) con `execute_sql`, `list_migrations` y una petición REST con la anon/publishable key.
- Actualizar la sección "Supabase → Estado actual" de `AGENTS.md` (ya no es "nada implementado": existe `supabase/migrations/` y la tabla `daycares`).
- Commitear spec + SQL + AGENTS.md.

**Out of scope (for future specs):**

- Tablas `users`, `rooms`, `children` y demás (especs 08+).
- Policies de RLS (dependen de `users.daycare_id` y auth; spec futura).
- Trigger de `updated_at`, índices adicionales, constraints extra (UNIQUE sobre `name`, etc.).
- Carpeta `supabase/config.toml`, CLI de Supabase, entorno local con Docker, `supabase gen types`.
- Consumo de la tabla desde la app Next.js (seguir hardcodeando datos hasta la spec de integración).
- Tests automatizados (no hay runner configurado; la verificación es por SQL + REST).

## Migration SQL

Contenido de `supabase/migrations/<version>_create_daycares.sql` (el único artefacto de código de esta spec):

```sql
-- Root entity: daycare centers.
create table public.daycares (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.daycares enable row level security;

-- Seed: demo daycares. "Guarderia Sala Soles" is the active one used by the UI mockups.
insert into public.daycares (name) values
  ('Guardería Sala Soles'),
  ('Guardería Pequeños Pasos'),
  ('Guardería Lunita'),
  ('Guardería Los Peques');
```

Notas de diseño:

- `gen_random_uuid()` es nativo de Postgres 13+; Supabase corre PG15+, no requiere `pgcrypto`.
- La columna `id` queda como PK clustered por defecto; sin índices adicionales (la tabla tendrá 4 filas; se agreguen índices cuando haya consultas reales).
- El SQL commiteado y el SQL enviado a `apply_migration` son byte-idénticos. Si `apply_migration` registra una versión distinta al `<version>` local, se renombra el archivo local para que coincidan (historial remoto = fuente de verdad para el ordering).

## Commands

No hay cambios de build en la app. Verificación (durante la implementación, vía MCP y shell):

```bash
# Estado del esquema remoto (columnas, defaults, nullabilidad)
# MCP execute_sql:
#   select column_name, data_type, is_nullable, column_default
#   from information_schema.columns where table_schema = 'public' and table_name = 'daycares';

# RLS activo y conteo de policies
#   select relrowsecurity from pg_class where oid = 'public.daycares'::regclass;
#   select count(*) from pg_policies where tablename = 'daycares';

# Seeds
#   select name from public.daycares order by created_at;

# Historial de migraciones remoto
#   MCP list_migrations  (debe incluir create_daycares)

# RLS deny-all desde el cliente (debe devolver [], no las 4 filas)
curl -s "$SUPABASE_URL/rest/v1/daycares?select=id,name" \
  -H "apikey: $SUPABASE_ANON_KEY" -H "Authorization: Bearer $SUPABASE_ANON_KEY"
```

## Project Structure

```
supabase/            → nuevo: artefactos de base de datos (sin config.toml, sin CLI)
  migrations/        → SQL versionado, un archivo por cambio, orden lexicográfico = orden de aplicación
specs/               → esta spec pasa a specs/07-daycares-table.md al aprobarse
AGENTS.md            → actualizar "Estado actual" de la sección Supabase
```

## Code Style

- Identificadores SQL en inglés, snake_case; tipos en notación Postgres corta (`uuid`, `text`, `timestamptz`).
- Keywords en minúscula, formato tipo `supabase migration new` (una columna por línea).
- Datos persistidos en inglés según convención del diccionario — excepción: `name` de guardería es un nombre propio de dominio (el propio diccionario usa "Guardería Sala Soles" como ejemplo), se seedea tal cual se mostrará en UI.
- Un comentario `--` por bloque no obvio (seed), nada decorativo.

## Testing Strategy

Sin runner de tests en el repo. La migración se valida contra el proyecto remoto con las queries de "Commands" como checks de aceptación:

1. Schema check (información de `information_schema.columns` coincide columna por columna con el Migration SQL).
2. RLS check (`relrowsecurity = true`, 0 policies).
3. Behavior check (REST con anon key devuelve `[]`; demuestra que la app aún no puede leer la tabla, que es lo querid).
4. History check (`list_migrations` contiene `create_daycares` y el archivo local tiene esa versión en el nombre).

Rollback: el patrón del proyecto es una migración adelante que revierte (como `drop_test_table` tras `create_test_table`), no editar migraciones ya aplicadas.

## Boundaries

- **Always:**
  - El SQL commiteado en `supabase/migrations/` existe ANTES (o en el mismo commit) de aplicar con `apply_migration`.
  - Nombres de migración en snake_case, versión `YYYYMMDDHHMMSS` mayor que la última registrada (`20261114173126`).
  - Verificar con `list_migrations` + `execute_sql` después de aplicar.
- **Ask first:**
  - Cualquier columna, constraint, índice o policy adicional a lo especificado aquí.
  - Cualquier migración que toque tablas ajenas a `daycares`.
- **Never:**
  - Crear/alterar tablas a mano desde el dashboard sin su migración versionada.
  - Commitear `.env*`, service_role keys o la anon key en código de la app.
  - Auth/autorización basada en `user_metadata` (para specs futuras).
  - Borrar o editar las 2 migraciones de prueba ya aplicadas (`create_test_table`, `drop_test_table`).

## Acceptance criteria

- [ ] `supabase/migrations/<version>_create_daycares.sql` existe en el repo y está commiteado.
- [ ] `list_migrations` remoto incluye la migración `create_daycares` con la misma versión que el nombre del archivo local.
- [ ] `public.daycares` tiene exactamente 3 columnas: `id` (uuid, PK, default `gen_random_uuid()`), `name` (text, NOT NULL), `created_at` (timestamptz, NOT NULL, default `now()`); sin columnas extra.
- [ ] RLS está habilitado en `daycares` y `pg_policies` no tiene policies para la tabla.
- [ ] `select count(*) from public.daycares` = 4 y existe la fila con `name = 'Guardería Sala Soles'`.
- [ ] `GET $SUPABASE_URL/rest/v1/daycares` con la anon key devuelve `[]` (deny por RLS).
- [ ] `AGENTS.md` refleja el nuevo estado (existe `supabase/migrations/` con la migración de `daycares` aplicada).
- [ ] `npm run build` y `npx tsc --noEmit` siguen pasando (no se toca código de la app, pero se confirma).

## Decisions

- **Yes:** patrón MCP `apply_migration` + SQL commiteado (decisión del usuario). No instalar la CLI: cubre el 100% del flujo para una tabla, y el historial remoto ya se construyó así (`create_test_table`). La CLI se puede añadir después sin reescribir nada: los archivos ya siguen su convención de nombre.
- **Yes:** RLS habilitado sin policies. `daycares` es raíz de multi-tenant; no hay `users.daycare_id` todavía, así que cualquier policy sería un placeholder. No-RLS violaría la regla de `AGENTS.md`.
- **Yes:** seed en la misma migración (decisión del usuario): la tabla vacía no es demostrable; 4 filas con "Guardería Sala Soles" como la relevante.
- **No:** UNIQUE en `name`. El diccionario no lo pide; dos guarderías pueden llamarse igual.
- **No:** trigger `set_updated_at`. `daycares` no tiene `updated_at`.
- **No:** `supabase/config.toml` / `supabase init`. Sin CLI, no se lee; se crea cuando se adopte la CLI o el dev server local.
- **Yes:** spec vive en `specs/07-daycares-table.md` (convención numérica del repo), migración vive en el repo de la app (`06-open-daycare/supabase/`), no en `07-DB-Schema` que queda como diccionario de referencia.

## Risks

| Risk | Mitigation |
| --- | --- |
| Versión local y versión remota difieren (apply_migration genera su propio timestamp) | Leer la versión con `list_migrations` tras aplicar y renombrar el archivo local para que coincida. |
| Seed con nombres de guardería que el usuario no quería | Nombres extra marcados en Open Questions; cambiarlos es un `update` en la siguiente migración o ajustar el SQL antes de aplicar. |
| RLS deny-all sorprenda a quien pruebe la app contra la API | Es intencional y está en Success Criteria; la spec de auth definirá las policies. Se documenta en AGENTS.md. |
| Las 2 migraciones remotas de prueba no tienen archivo local | No se editan (Boundaries). El historial remoto arranca en `20261114173126`; la nueva versión es mayor. |
| DDL contra producción sin entorno local | Una sola tabla aditiva, sin destructivos; verificación inmediata post-aplicación; rollback = migración adelante `drop_daycares` si hiciera falta. |

## What is **not** in this spec

- Policies de RLS, `users`, `rooms` y el resto del diccionario.
- Integración de la app Next.js con Supabase (`@supabase/ssr`, queries, tipos generados).
- CLI de Supabase, rama de desarrollo, entorno local.

Cada uno de esos, si llega, va en su propia spec.

## Open Questions

1. Nombres de las 3 guarderías adicionales del seed (propuestos: "Guardería Pequeños Pasos", "Guardería Lunita", "Guardería Los Peques"). ¿OK o los tienes definidos?
2. ¿El seed debe quedar marcado de alguna forma (comentario `-- demo`) o da igual? (Asumo: da igual, es producción-demo.)
