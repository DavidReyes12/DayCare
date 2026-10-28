# SPEC 03 — Login y activación de cuenta (`/login`, `/active-account`)

> **Status:** Implemented
> **Depends on:** specs/01-feed-home.md
> **Date:** 2026-10-28
> **Objective:** Implementar las pantallas `references/pantallas/login.dc.html` y `references/pantallas/activar-cuenta.dc.html` como rutas `/login` y `/active-account` bajo el grupo `(auth)`, sin autenticación ni base de datos, replicando su estilo de forma idéntica y organizando la UI en componentes estructurados.

## Scope

**In:**
- Crear las páginas en el App Router:
  - `app/(auth)/login/page.tsx`
  - `app/(auth)/active-account/page.tsx`
- Crear componentes en `components/auth/` (1 archivo por componente, código y props en inglés, textos visibles en español):
  - `components/auth/LoginBrandPanel.tsx` — panel izquierdo del login (gradiente coral, logo, headline, subtítulo, pie "Guardería Sala Soles").
  - `components/auth/LoginForm.tsx` — formulario único de login (email, contraseña, enlace "¿Olvidaste tu contraseña?", botón "Iniciar sesión" que enlaza a `/`).
  - `components/auth/ActivateAccountCard.tsx` — tarjeta completa de activación (icono, título, subtítulo, datos de invitación, campos, consentimiento, botón).
- Eliminar del login el selector "Personal/Familia" y el estado de rol; usar un único formulario con email por defecto `caro@opendaycare.com`.
- Mantener los valores precargados en activar cuenta: código `7K4P9`, email `lucia.fernandez@gmail.com`, contraseña `contraseña`.
- Páginas como Server Components sin estado ni validación.
- Metadata por página coherente con OpenDayCare.
- Código interno (tipos, variables, funciones, props) en inglés; textos visibles de la UI en español.

**Out of scope (for future specs):**
- Autenticación, sesión y validación de credenciales.
- Base de datos, API o persistencia.
- Funcionalidad de enlaces/botones (submit, "¿Olvidaste tu contraseña?", familia-feed).
- Formularios secundarios y flujos de recuperación de contraseña.
- Sidebar o navegación principal en las páginas de auth (no aparece en el mockup).
- Tests automatizados (no hay runner configurado).

## Data model

This feature introduces no new data structures. Se reutiliza el patrón de las Specs 01 y 02: los literales del mockup (email por defecto, código de invitación, email y contraseña de activación, nombre del niño y sala) se hardcodean en las páginas/componentes y se pasan como props cuando corresponda. No hay persistencia ni estado. Todos los identificadores (tipos, props, variables) se escriben en inglés; los strings visibles permanecen en español.

## Implementation plan

1. Crear la carpeta `components/auth/`.
2. Crear `components/auth/LoginBrandPanel.tsx` con el panel izquierdo del mockup (`login.dc.html`): gradiente `#F6A98E → #EC7E62`, círculos decorativos, logo (sol), "OpenDayCare", headline "El día de cada niño, compartido con su familia.", párrafo y pie "🌿 Guardería Sala Soles".
3. Crear `components/auth/LoginForm.tsx`: label "EMAIL" con input `value="caro@opendaycare.com"`, label "CONTRASEÑA" con input password `placeholder="••••••••"`, enlace "¿Olvidaste tu contraseña?" y botón "Iniciar sesión" con `href="/"`.
4. Crear `app/(auth)/login/page.tsx`: Server Component con grid de 2 columnas (`1.05fr 1fr`, `min-height: 100vh`), `LoginBrandPanel` a la izquierda y contenedor centrado (`max-width: 392`) con título "Iniciar sesión", subtítulo y `LoginForm`. Incluir metadata de título/descripción.
5. Crear `components/auth/ActivateAccountCard.tsx`: icono de sol, título "Bienvenida a OpenDayCare", subtítulo, bloque de invitación (avatar "M" + "Mateo · Sala Soles"), campos "CÓDIGO DE INVITACIÓN" (`7K4P9`), "EMAIL" (`lucia.fernandez@gmail.com`), "CREAR CONTRASEÑA" (`contraseña`), checkbox visual de autorización de fotos y botón "Activar mi cuenta" con `href="familia-feed.dc.html"` (visual), más enlace "¿Ya tenés cuenta? Iniciar sesión" con `href="login.dc.html"` (visual).
6. Crear `app/(auth)/active-account/page.tsx`: Server Component con contenedor centrado (`max-width: 440`) y `ActivateAccountCard`. Incluir metadata de título/descripción.
7. Verificar con `npm run build`, `npx tsc --noEmit` y `npx eslint app`.

## Acceptance criteria

- [x] La ruta `/login` renderiza el panel izquierdo + formulario idéntico a `references/pantallas/login.dc.html`, sin el selector "Personal/Familia".
- [x] La ruta `/active-account` renderiza la tarjeta idéntica a `references/pantallas/activar-cuenta.dc.html`.
- [x] Existen `components/auth/LoginBrandPanel.tsx`, `components/auth/LoginForm.tsx` y `components/auth/ActivateAccountCard.tsx`.
- [x] `app/(auth)/login/page.tsx` y `app/(auth)/active-account/page.tsx` componen la UI usando esos componentes (no todo el markup inline).
- [x] Las fuentes Fredoka y Nunito se aplican (heredadas del root layout) y el fondo es `#FBF4EC`.
- [x] El email por defecto en login es `caro@opendaycare.com` y el botón "Iniciar sesión" enlaza a `/`.
- [x] En activar cuenta se mantienen los valores `7K4P9`, `lucia.fernandez@gmail.com` y `contraseña`.
- [x] `npm run build`, `npx tsc --noEmit` y `npx eslint app` pasan sin errores.

## Decisions

- **Yes:** grupo de rutas `(auth)` para agrupar sin afectar la URL (`/login`, `/active-account`). Claridad y aislamiento de las páginas de autenticación.
- **Yes:** rutas en inglés `/login` y `/active-account`. Consistente con la convención del proyecto (`/kids`).
- **Yes:** eliminar el selector "Personal/Familia" y el estado de rol; un único formulario con email por defecto de staff y botón → `/`. El usuario indicó no usar la opción personal/familia.
- **Yes:** mantener los valores precargados en activar cuenta. Fidelidad 1:1 con el mockup.
- **Yes:** páginas como Server Components sin estado ni validación. Consistente con Specs 01 y 02.
- **Yes:** enlaces visuales del mockup (`login.dc.html`, `activar-cuenta.dc.html`, `familia-feed.dc.html`) sin rutas funcionales para pantallas fuera de alcance.
- **Yes:** componentes en `components/auth/` (un archivo por componente). Consistente con el patrón del proyecto.
- **No:** Sidebar en las páginas de auth. No aparece en el mockup; son pantallas standalone.
- **No:** validación o submit funcional. Fuera de alcance de esta spec.

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| El grupo `(auth)` podría requerir un layout propio y romper estilos | No crear layout propio; heredar el root layout y replicar los estilos inline del mockup. |
| Enlaces visuales no funcionales pueden confundir | Documentado en Scope y Decisions; se conectarán cuando existan las pantallas destino. |
| Diferencias visuales por conversión HTML→JSX | Verificar con build/tsc y comparar visualmente contra `references/pantallas/login.dc.html` y `activar-cuenta.dc.html`. |
| Props mal tipadas en los nuevos componentes | Tipos explícitos + `npx tsc --noEmit`. |

## What is **not** in this spec

- Autenticación y sesión de usuario.
- Base de datos, API o persistencia.
- Funcionalidad de enlaces y acciones.
- Pantalla `familia-feed` y flujos posteriores.
- Sidebar o navegación principal en auth.
- Tests automatizados.

Cada uno de esos, si llega, va en su propia spec.
