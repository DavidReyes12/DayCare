# SPEC 01 — Feed como home `/`

> **Status:** Implemented
> **Depends on:** none
> **Date:** 2026-10-27
> **Objective:** Implementar la plantilla `references/pantallas/feed.dc.html` como la página home `/` del proyecto, sin autenticación ni base de datos, replicando su estilo de forma idéntica, organizando la UI en componentes estructurados por carpetas.

## Scope

**In:**

- Reemplazar el contenido de `app/page.tsx` para componer la home usando componentes estructurados.
- Crear componentes en `components/` organizados por dominio:
  - `components/layout/Sidebar.tsx` — sidebar completo (logo, botón nueva publicación, nav, usuario).
  - `components/feed/FeedHeader.tsx` — encabezado "Buenas, Caro" + subtítulo.
  - `components/feed/Composer.tsx` — caja "Compartí un momento…".
  - `components/feed/SectionDivider.tsx` — separador "PUBLICADO HOY".
  - `components/feed/PostCard.tsx` — tarjeta de publicación genérica (avatar, título, badge de tipo, texto, foto opcional, acciones).
  - `components/feed/PostActions.tsx` — fila de likes/comentarios/editar.
  - `components/ui/Badge.tsx` — badge de tipo (LOGRO/ACTIVIDAD/ANUNCIO) con color.
- Actualizar `app/layout.tsx` para usar las fuentes Fredoka + Nunito, metadata de OpenDayCare y `lang="es"`.
- Actualizar `app/globals.css` para incluir las fuentes de Google Fonts, el reset/base y el scrollbar del mockup, manteniendo `@import "tailwindcss"`.
- Mantener los enlaces del mockup tal cual (solo visuales, sin rutas funcionales).
- Hardcodear los datos de ejemplo del feed (usuario, publicaciones) tal como aparecen en el mockup, pasándolos como props a los componentes.
- Código interno (tipos, variables, funciones, props) en inglés; textos visibles de la UI en español (tal como en el mockup).

**Out of scope (for future specs):**

- Autenticación y sesión de usuario.
- Base de datos o persistencia de publicaciones.
- Otras pantallas (Niños, Avisos, Mi cuenta, detalle de publicación, crear publicación, etc.).
- Funcionalidad de los enlaces, botones y acciones (likes, comentarios, editar).
- Reutilización de estos componentes en otras rutas (se diseñan para la home; reuso posterior es opcional).
- Tests automatizados (no hay runner configurado).

## Data model

This feature introduces no new data structures. Reusa el modelo implícito del mockup: los datos del feed (nombre de usuario, sala, publicaciones con autor, tipo, texto, contadores) se hardcodean como literales en `app/page.tsx` y se pasan como props a los componentes. No hay persistencia ni estado. Todos los identificadores (tipos, props, variables) se escriben en inglés; los strings visibles permanecen en español.
Props mínimas sugeridas (ilustrativas):

```ts
// components/feed/PostCard.tsx
type PostCardProps = {
  author: string;
  avatarLetter: string;
  avatarBg: string;
  avatarColor: string;
  time: string;
  publishedBy: string;
  type: "LOGRO" | "ACTIVIDAD" | "ANUNCIO";
  typeColors: { bg: string; dot: string; text: string };
  audience: string;
  text: string;
  photoLabel?: string;
  likes: number;
  comments: number;
};
```

## Implementation plan

1. Crear la estructura de carpetas `components/layout/`, `components/feed/`, `components/ui/`.
2. Crear `components/ui/Badge.tsx` con los estilos del badge de tipo.
3. Crear `components/feed/PostActions.tsx` con la fila de likes/comentarios/editar.
4. Crear `components/feed/PostCard.tsx` componiendo avatar, header, badge, texto, foto opcional y `PostActions`.
5. Crear `components/feed/Composer.tsx`, `FeedHeader.tsx`, `SectionDivider.tsx`.
6. Crear `components/layout/Sidebar.tsx` con toda la barra lateral.
7. Editar `app/globals.css`: mantener `@import "tailwindcss"`; añadir `@import` de Google Fonts (Fredoka + Nunito); añadir reset/base/scrollbar del mockup; eliminar el bloque `@media (prefers-color-scheme: dark)`.
8. Editar `app/layout.tsx`: quitar las fuentes Geist; establecer `lang="es"`; actualizar `metadata`; dejar `body` con clase mínima.
9. Reescribir `app/page.tsx` como Server Component que compone `Sidebar` + `main` con los componentes de feed y los datos hardcodeados.
10. Verificar con `npm run build`, `npx tsc --noEmit` y `npx eslint app`.

## Acceptance criteria

- [x] La home `/` renderiza el sidebar + feed idéntico al mockup `feed.dc.html`.
- [x] Existen componentes estructurados en `components/layout`, `components/feed` y `components/ui`.
- [x] `app/page.tsx` compone la página usando esos componentes (no contiene todo el markup inline).
- [x] Las fuentes Fredoka y Nunito se cargan y se aplican como en el mockup.
- [x] El fondo es `#F6ECDF`, el sidebar `#FFFDF9` y las tarjetas `#FFFDF9` con bordes `#ECE0D0`.
- [x] El scrollbar personalizado se muestra.
- [x] No hay errores de consola en dev ni en build.
- [x] `npm run build` y `npx tsc --noEmit` pasan sin errores.
- [x] `npx eslint app` no reporta errores nuevos.

## Decisions

- **Yes:** organizar componentes en carpetas por dominio (`components/layout`, `components/feed`, `components/ui`). Claridad y escalabilidad.
- **Yes:** un archivo por componente (no carpeta por componente). Menos boilerplate; suficiente para esta spec.
- **Yes:** mantener `@import "tailwindcss"` en `globals.css`. El usuario prefirió conservarlo aunque no se use en esta pantalla; no rompe los estilos inline.
- **No:** reemplazar `globals.css` completo por el reset del mockup. Se descartó por preferencia del usuario; se mantienen ambos.
- **Yes:** `@import` de Google Fonts en CSS en lugar de `next/font/google`. Fidelidad 1:1 con el mockup y evita cambiar los `font-family` inline.
- **Yes:** conversión a JSX con estilos inline. Idiomático para Next/React y consistente con el proyecto.
- **No:** `dangerouslySetInnerHTML`. Se descartó por no ser idiomático, aunque garantizaba fidelidad exacta.
- **Yes:** enlaces solo visuales (`href` del mockup). No hay rutas ni auth/DB en esta spec.
- **Yes:** datos hardcodeados del mockup. No hay base de datos todavía.
- **Yes:** código interno en inglés (tipos, props, variables, funciones) y UI en español, según reglas de código limpio del proyecto.

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| Tailwind preflight altera resets del mockup | Los estilos inline tienen mayor especificidad; verificar visualmente con screenshot. |
| Diferencias por dark mode del SO | Se elimina el bloque `@media (prefers-color-scheme: dark)` para forzar tema claro. |
| Errores de conversión HTML→JSX (atributos, self-closing) | Verificar con `tsc` y build; comparar visualmente con `references/screenshots/feed.png`. |
| Props mal tipadas en componentes | Definir tipos explícitos y validar con `tsc --noEmit`. |

## What is **not** in this spec

- Autenticación y sesión.
- Base de datos o persistencia.
- Otras pantallas del mockup.
- Funcionalidad de enlaces/acciones.
- Componentes reutilizables compartidos con otras rutas.

Cada uno de esos, si llega, va en su propia spec.
