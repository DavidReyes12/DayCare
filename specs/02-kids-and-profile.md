# SPEC 02 — Listado de Niños (`/kids`) y Perfil de Niño (`/kids/[id]`)

> **Status:** Approved
> **Depends on:** specs/01-feed-home.md
> **Date:** 2026-10-28
> **Objective:** Implementar las pantallas de referencia `references/pantallas/ninos.dc.html` en la ruta `/kids` y `references/pantallas/perfil-nino.dc.html` en la ruta `/kids/[id]`, únicamente a nivel de interfaz y componentes estructurados en inglés, conectando la navegación entre `/`, `/kids` y `/kids/[id]`.

## Scope

**In:**

- Crear las páginas en el App Router con nombres en inglés:
  - `app/kids/page.tsx` — vista de gestión y listado de niños (`ninos.dc.html`).
  - `app/kids/[id]/page.tsx` — vista de detalle/perfil del niño (`perfil-nino.dc.html`), mostrando el diseño fijo de Mateo Fernández (con `generateStaticParams` para compatibilidad con `cacheComponents: true`).
- Crear componentes en `components/kids/` (1 archivo por componente, código y props en inglés, textos visibles en español):
  - `components/kids/KidsHeader.tsx` — encabezado "GESTIÓN" + título "Niños" + botón "Agregar niño".
  - `components/kids/KidsSearchBar.tsx` — barra de búsqueda visual "Buscar niño…" con ícono de lupa.
  - `components/kids/KidsRoomDivider.tsx` — separador "SALA SOLES" + contador "8 niños" + línea divisoria.
  - `components/kids/KidCard.tsx` — tarjeta de niño en la grilla (avatar circular, nombre, subtítulo de edad/padres, y badge de alerta/estado o ícono chevron) enlazando a `/kids/[id]`.
  - `components/kids/KidProfileHeader.tsx` — encabezado del perfil (avatar de 84px, nombre, edad/sala y botón "Editar").
  - `components/kids/KidAllergyAlert.tsx` — bloque de alerta coral "Alergias y notas" con ícono de advertencia.
  - `components/kids/KidInfoCard.tsx` — tarjeta de datos del niño (Fecha de nacimiento, Sala, Ingreso).
  - `components/kids/LinkedParentsCard.tsx` — columna derecha con botón "Resumen del día", tarjeta "PADRES VINCULADOS" (lista de padres con badges "ACTIVA" / "PENDIENTE") y enlace "Vincular otro padre".
- Actualizar `components/layout/Sidebar.tsx`:
  - Añadir prop opcional `activeItem?: "feed" | "kids" | "notices" | "account"` (por defecto `"feed"` para no romper `app/page.tsx`).
  - Conectar los enlaces reales: "Feed" → `/` y "Niños" → `/kids` (manteniendo los demás items con sus `href` visuales del mockup).
- Actualizar `app/globals.css`:
  - Añadir las reglas base de `ninos.dc.html` para inputs y hover de tarjetas (`input`, `input:focus`, `::placeholder`, `.kid`, `.kid:hover`).
- Datos hardcodeados en las páginas y pasados como props a los componentes.
- Código interno (tipos, variables, funciones, props) en inglés; textos visibles de la UI en español (tal como en el mockup).

**Out of scope (for future specs):**

- Filtrado interactivo o búsqueda funcional en el input "Buscar niño…".
- Base de datos, API o persistencia de niños/padres.
- Pantallas de formularios o flujos secundarios (`agregar-nino.dc.html`, `vincular-padre.dc.html`, `resumen-dia.dc.html`).
- Autenticación y sesión de usuario.
- Tests automatizados (no hay runner configurado).

## Data model

No introduce persistencia ni estado. Los datos se definen como constantes tipadas en inglés en `app/kids/page.tsx` y `app/kids/[id]/page.tsx`, y se pasan como props a los componentes, siguiendo el patrón de la Spec 01.

```ts
// components/kids/KidCard.tsx
export type KidBadgeVariant = "allergy" | "action";

export type KidCardBadge = {
  label: string;
  variant: KidBadgeVariant;
};

export type KidCardProps = {
  id: string;
  name: string;
  avatarLetter: string;
  avatarBg: string;
  avatarColor: string;
  meta: string;
  badge?: KidCardBadge;
};

// components/kids/KidInfoCard.tsx
export type KidInfoRow = {
  label: string;
  value: string;
};

// components/kids/LinkedParentsCard.tsx
export type ParentStatus = "ACTIVA" | "PENDIENTE";

export type LinkedParent = {
  name: string;
  relationInfo: string;
  avatarLetter: string;
  avatarBg: string;
  status: ParentStatus;
};
```

Los 8 niños hardcodeados en `app/kids/page.tsx` (id en slug, usado por `generateStaticParams` y por el `href` de cada tarjeta):

| id | Nombre | Avatar (bg/color) | Meta | Badge |
| --- | --- | --- | --- | --- |
| `mateo-fernandez` | Mateo Fernández | `#A9D9E8` / `#1F7A93` | 3 años · 2 padres vinculados | `MANÍ` (allergy) |
| `sofia-mendez` | Sofía Méndez | `#F4B8CC` / `#C44A7A` | 2 años · 1 padre vinculado | — (chevron) |
| `benjamin-ruiz` | Benjamín Ruiz | `#B9DEC4` / `#3E8B62` | 3 años · 2 padres vinculados | — (chevron) |
| `valentina-soto` | Valentina Soto | `#F4DC8E` / `#9A7B1E` | 2 años · sin padres vinculados | `VINCULAR` (action) |
| `tomas-diaz` | Tomás Díaz | `#C9B6E8` / `#7B5FC0` | 3 años · 1 padre vinculado | `LACTOSA` (allergy) |
| `emma-castro` | Emma Castro | `#F4B8CC` / `#C44A7A` | 2 años · 1 padre vinculado | — (chevron) |
| `lucas-romero` | Lucas Romero | `#A9D9E8` / `#1F7A93` | 3 años · 1 padre vinculado | — (chevron) |
| `olivia-vega` | Olivia Vega | `#B9DEC4` / `#3E8B62` | 2 años · 1 padre vinculado | — (chevron) |

`app/kids/[id]/page.tsx` renderiza el diseño fijo del mockup (Mateo Fernández) para cualquier `[id]`, con fallback a esos datos cuando el id no coincide.

## Implementation plan

1. Actualizar `app/globals.css`: añadir las reglas de `input`, `input:focus`, `::placeholder`, `.kid` y `.kid:hover` tal como están en `ninos.dc.html`.
2. Actualizar `components/layout/Sidebar.tsx`:
   - Soportar prop `activeItem?: "feed" | "kids" | "notices" | "account"` (default `"feed"`).
   - Cambiar el `href` de "Feed" a `/` y de "Niños" a `/kids`.
3. Crear componentes de listado en `components/kids/`: `KidsHeader.tsx`, `KidsSearchBar.tsx`, `KidsRoomDivider.tsx`, `KidCard.tsx` (con `className="kid"` y enlace a `/kids/${id}`).
4. Crear `app/kids/page.tsx`: Server Component con contenedor `maxWidth: 880`, `Sidebar` con `activeItem="kids"`, `KidsHeader`, `KidsSearchBar`, `KidsRoomDivider` y grilla de 2 columnas (`repeat(2, 1fr)`, `gap: 14`) renderizando los 8 `KidCard` con datos hardcodeados.
5. Crear componentes de perfil en `components/kids/`: `KidProfileHeader.tsx`, `KidAllergyAlert.tsx`, `KidInfoCard.tsx`, `LinkedParentsCard.tsx`.
6. Crear `app/kids/[id]/page.tsx`:
   - Exportar `generateStaticParams` con los ids de los 8 niños (prerenderizado compatible con `cacheComponents: true`).
   - Server Component con contenedor `maxWidth: 820`, `Sidebar` con `activeItem="kids"`, enlace "Volver a Niños" hacia `/kids`, columna izquierda (`KidProfileHeader`, `KidAllergyAlert`, `KidInfoCard`) y columna derecha (`LinkedParentsCard`).
7. Verificar con `npm run build`, `npx tsc --noEmit` y `npx eslint app`.

## Acceptance criteria

- [x] La ruta `/kids` renderiza el sidebar (con "Niños" activo) y el listado de 8 niños en 2 columnas idéntico a `references/pantallas/ninos.dc.html` y `references/screenshots/ninos2.png`.
- [x] Las tarjetas `.kid` tienen el efecto hover (`border-color: #F2A78E; transform: translateY(-2px); transition: .15s`) y enlazan a `/kids/[id]`.
- [x] La ruta `/kids/[id]` (p. ej. `/kids/mateo-fernandez`) renderiza el perfil del niño idéntico a `references/pantallas/perfil-nino.dc.html`.
- [x] El enlace "Volver a Niños" en `/kids/[id]` navega a `/kids`, y el `Sidebar` permite navegar entre `/` (Feed) y `/kids` (Niños).
- [x] Todos los componentes nuevos existen bajo `components/kids/` y usan identificadores, tipos y props en inglés.
- [x] `npm run build`, `npx tsc --noEmit` y `npx eslint app` pasan sin errores.

## Decisions

- **Yes:** rutas `/kids` y `/kids/[id]` con nombres en inglés. El usuario pidió explícitamente no usar nombres de páginas en español.
- **Yes:** datos dinámicos de listado (`/kids`) pero diseño fijo de Mateo en `/kids/[id]`. El usuario eligió el fallback fijo; los ids de las 8 tarjetas navegan, pero el mockup del perfil es único.
- **Yes:** `generateStaticParams` con los 8 ids. Requerido por `cacheComponents: true` para prerenderizar rutas dinámicas con params conocidos a build time.
- **Yes:** conectar rutas reales en Sidebar, tarjetas y "Volver a Niños" (`/`, `/kids`, `/kids/[id]`). El usuario eligió navegación funcional entre las pantallas ya creadas; el resto de los enlaces mantiene el `href` visual del mockup.
- **Yes:** un archivo por componente en `components/kids/` (sin carpeta por componente). Consistente con la Spec 01.
- **Yes:** estilos inline convertidos del mockup a JSX. Consistente con el patrón establecido en la Spec 01 (feed).
- **Yes:** añadir reglas de `.kid` hover e inputs al `globals.css` en vez de estilos inline. El hover/transition y los placeholders no se pueden expresar como estilos inline.
- **Yes:** código interno en inglés, UI en español, según reglas del proyecto.

## Risks

| Risk | Mitigation |
| --- | --- |
| `cacheComponents: true` exige manejo especial de `params` en rutas dinámicas | Exportar `generateStaticParams` con los 8 ids; verificar con `npm run build`. |
| Comparación visual poco confiable con PNG de referencia | Usar `ninos2.png` y el HTML de referencia como fuente de verdad. |
| Clases globales `.kid` pisadas por Tailwind preflight | Ordenar las reglas después de `@import "tailwindcss"` y verificar hover con screenshot. |
| Props mal tipadas en los nuevos componentes | Tipos explícitos + `npx tsc --noEmit`. |
| Cambios en `Sidebar` rompen la home existente | Hacer `activeItem` opcional con default `"feed"` y no alterar el resto del markup. |

## What is **not** in this spec

- Autenticación y sesión.
- Base de datos o persistencia.
- Búsqueda funcional en el listado.
- Formularios y flujos secundarios (agregar niño, vincular padre, resumen del día).
- Componentes reutilizables compartidos con otras rutas futuras.

Cada uno de esos, si llega, va en su propia spec.
