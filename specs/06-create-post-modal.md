# SPEC 06 — Modal "Nueva publicación" en `/`

> **Status:** Implemented
> **Depends on:** specs/01-feed-home.md
> **Date:** 2026-11-11
> **Objective:** Convertir el botón "Nueva publicación" del `Sidebar` en un modal client-side que reproduce el diseño de `references/pantallas/crear-publicacion.dc.html` (audiencia multi-select, tipo single-select, descripción y fotos con preview local), con "Publicar" deshabilitado hasta tener descripción y tipo, sin persistencia.

## Scope

**In:**

- Crear `components/feed/CreatePostModal.tsx` como Client Component (`"use client"`) que renderiza:
  - El botón disparador "Nueva publicación" con el estilo actual del Sidebar (gradiente coral `#F4977E → #EE8164`, ícono `+`, radio 14, sombra).
  - El overlay modal (`position: fixed; inset: 0; background: rgba(63,54,46,.45); z-index: 50`) con la tarjeta del mockup (ancho máximo 580px, fondo `#FBF4EC`, borde `#ECE0D0`, radio 24px, sombra `0 20px 50px -24px rgba(63,54,46,.35)`).
  - Encabezado: "Cancelar" (cierra), título "Nueva publicación" en Fredoka, "Publicar" (submit, color `#D9583C`).
  - Sección PARA: 4 chips (Mateo, Sofía, Benjamín, Toda la sala) con selección múltiple de niños; "Toda la sala" es excluyente; default "Toda la sala" seleccionado.
  - Sección TIPO: 7 pills single-select (Comida, Siesta, Actividad, Logro, Ánimo, Foto, Anuncio) con los colores del mockup; default "Comida"; la pill seleccionada muestra borde `#3F362E`, las no seleccionadas baja su opacidad.
  - Sección DESCRIPCIÓN: `<textarea>` con placeholder "Contá cómo le fue hoy…", default vacío.
  - Sección FOTOS: grilla de previews (miniaturas 96×96) más tile "Agregar" (borde punteado) que abre un `<input type="file" accept="image/*">` oculto; las imágenes elegidas se previsualizan con `URL.createObjectURL`, sin subida real ni persistencia.
  - Botón "Publicar" deshabilitado hasta que la descripción no esté vacía y haya un tipo seleccionado; al enviar hace `preventDefault`, cierra el modal, revoca las URLs de preview y resetea el formulario.
  - Cierre también al hacer click en el fondo atenuado y al presionar `Escape`.
- Actualizar `components/layout/Sidebar.tsx`:
  - Eliminar el `<Link href="/crear-publicacion">` del botón "Nueva publicación".
  - Importar y renderizar `<CreatePostModal />` en su lugar, conservando el mismo estilo visual del botón.

**Out of scope (for future specs):**

- Que la caja `Composer` y el enlace "Editar" de `PostCard` abran el modal (seguirán siendo enlaces a `/crear-publicacion`).
- Que la publicación creada aparezca en el feed (requiere lifting de estado a `app/page.tsx`).
- Persistencia o publicación real (API, base de datos, localStorage).
- Subida real de fotos a ningún destino.
- Ruta standalone `/crear-publicacion` o intercepting routes.
- Accesibilidad completa (focus trap, aria-modal) más allá de cierre con Escape y click en backdrop.
- Mensaje de éxito tras publicar.
- Tests automatizados (no hay runner configurado).

## Data model

No introduce persistencia ni nuevas entidades persistentes. El estado del modal es local al Client Component:

```ts
// components/feed/CreatePostModal.tsx
"use client";

type PostCategory =
  | "Comida" | "Siesta" | "Actividad" | "Logro" | "Ánimo" | "Foto" | "Anuncio";

type PhotoPreview = { name: string; url: string }; // url = URL.createObjectURL(file)

type CreatePostFormState = {
  selectedKids: string[]; // ids de AUDIENCE_KIDS seleccionados
  wholeRoom: boolean;     // "Toda la sala"; default true; excluyente con selectedKids
  category: PostCategory; // default "Comida"
  description: string;    // default ""
  photos: PhotoPreview[]; // default []
};
```

Constantes dentro del componente (datos del mockup, hardcodeados):

```ts
const AUDIENCE_KIDS: { name: string; bg: string; color: string }[] = [
  { name: "Mateo", bg: "#A9D9E8", color: "#1F7A93" },
  { name: "Sofía", bg: "#F4B8CC", color: "#C44A7A" },
  { name: "Benjamín", bg: "#B9DEC4", color: "#3E8B62" },
];

const CATEGORIES: { name: PostCategory; bg: string; color: string }[] = [
  { name: "Comida", bg: "#9A7B1E", color: "#fff" },
  { name: "Siesta", bg: "#E7DCF6", color: "#7B5FC0" },
  { name: "Actividad", bg: "#2E89A6", color: "#fff" },
  { name: "Logro", bg: "#CFEBD8", color: "#3E9B6C" },
  { name: "Ánimo", bg: "#F9D2DE", color: "#C56486" },
  { name: "Foto", bg: "#FBD8CC", color: "#D9684A" },
  { name: "Anuncio", bg: "#CCD8F4", color: "#4E72C8" },
];
```

Reglas de selección:

- Click en chip de niño: alterna en `selectedKids` y fuerza `wholeRoom = false`.
- Click en "Toda la sala": fuerza `wholeRoom = true` y vacía `selectedKids`.
- Chips con avatar circular 26px con la inicial del niño; "Toda la sala" sin avatar. Seleccionado: borde `#3F362E`, fondo `#3F362E`, texto blanco. No seleccionado: borde `#ECE0D0`, fondo `#FFFDF9`, texto `#6E6359`.

No se modifican los datos hardcodeados de `app/page.tsx` ni el tipo `PostType` de `components/ui/Badge.tsx`.

## Implementation plan

1. Crear `components/feed/CreatePostModal.tsx` como Client Component con esqueleto:
   - Estado `isOpen` y `CreatePostFormState` (default `wholeRoom: true`, `category: "Comida"`, resto vacío).
   - Botón disparador con el markup/estilo actual del botón del Sidebar (gradiente coral, ícono `+`, texto "Nueva publicación") que abre el modal.
   - Overlay `fixed; inset: 0` con `rgba(63,54,46,.45)`, `z-index: 50`, `display: flex; align-items: flex-start; justify-content: center; padding: 40px 24px; overflow: auto`, que cierra al click en el fondo.
   - Tarjeta vacía con el estilo del mockup; encabezado "Cancelar" / "Nueva publicación" / "Publicar".
2. Implementar sección PARA: 4 chips con las reglas de selección (multi + excluyente) y estilos seleccionado/no seleccionado.
3. Implementar sección TIPO: 7 pills desde `CATEGORIES`, single-select, default "Comida"; seleccionado con borde `#3F362E`, no seleccionado con opacidad reducida (p. ej. `.55`).
4. Implementar sección DESCRIPCIÓN: label + `<textarea>` controlado (`description`), `min-height: 120px`, placeholder "Contá cómo le fue hoy…".
5. Implementar sección FOTOS: hidden `<input type="file" accept="image/*">` referenciado por el tile "Agregar"; al seleccionar, agregar `URL.createObjectURL(file)` por imagen a `photos` y renderizar miniaturas 96×96.
6. Implementar envío y cierre:
   - `canPublish = description.trim() !== "" && category !== ""`; "Publicar" con `disabled={!canPublish}` (opacidad reducida cuando deshabilitado).
   - Al submit: `preventDefault`, `URL.revokeObjectURL` de cada preview, cerrar y resetear el formulario al estado inicial.
   - "Cancelar", click en fondo y listener de `Escape` (solo cuando `isOpen`) cierran el modal con la misma limpieza (revocar URLs y resetear).
7. Actualizar `components/layout/Sidebar.tsx`: quitar el `<Link href="/crear-publicacion">` del botón y renderizar `<CreatePostModal />`; quitar el import de `next/link` solo si ya no se usa en el archivo.
8. Verificar con `npm run build`, `npx tsc --noEmit` y `npx eslint app`.

## Acceptance criteria

- [x] En `/`, el botón "Nueva publicación" del Sidebar abre un modal (overlay) sin navegar a otra ruta.
- [x] El modal reproduce el diseño de `references/pantallas/crear-publicacion.dc.html` (tarjeta 580px `#FBF4EC`, encabezado Cancelar / "Nueva publicación" / Publicar, secciones PARA, TIPO, DESCRIPCIÓN, FOTOS).
- [x] En PARA, "Toda la sala" viene seleccionado por defecto; se pueden seleccionar varios niños a la vez; elegir un niño deselecciona "Toda la sala" y viceversa.
- [x] En TIPO, exactamente 1 de las 7 pills aparece seleccionada (default "Comida") y cambiar de pill actualiza el marcado visual (borde `#3F362E` en la activa, opacidad reducida en el resto).
- [x] El textarea muestra placeholder "Contá cómo le fue hoy…" y está vacío al abrir el modal.
- [x] Click en el tile "Agregar" abre el selector de archivos del sistema (acepta solo `image/*`) y cada imagen elegida aparece como miniatura 96×96 en FOTOS.
- [x] El botón "Publicar" está deshabilitado hasta escribir una descripción no vacía (con tipo siempre seleccionado por default).
- [x] "Publicar" (con campos válidos) cierra el modal y resetea el formulario (descripción vacía, "Toda la sala", "Comida", sin fotos).
- [x] "Cancelar", click en el fondo atenuado y `Escape` cierran el modal y resetean el formulario.
- [x] Las URLs de preview se revocan (`URL.revokeObjectURL`) al cerrar o publicar.
- [x] Existe `components/feed/CreatePostModal.tsx` como Client Component y `Sidebar.tsx` ya no enlaza a `/crear-publicacion` desde el botón.
- [x] `npm run build`, `npx tsc --noEmit` y `npx eslint app` pasan sin errores.

## Decisions

- **Yes:** modal client-side con estado local en `CreatePostModal`. Consistente con el patrón de SPEC 04 (`AddKidModal`) y SPEC 05 (`LinkParentModal`) y con la ausencia de persistencia del proyecto.
- **Yes:** mover el botón disparador dentro de `CreatePostModal` y renderizarlo desde `Sidebar`. Evita pasar callbacks de servidor a cliente y mantiene `Sidebar` como Server Component (patrón ya usado en SPEC 04/05).
- **Yes:** solo el botón del Sidebar abre el modal (decisión del usuario). `Composer` y "Editar" de `PostCard` quedan como enlaces; sus 404 contra `/crear-publicacion` se atacan en una spec futura si se decide unificar.
- **Yes:** PARA multi-select con "Toda la sala" excluyente y default "Toda la sala". El botón de audiencia nunca queda vacío, así que "Publicar" no depende de esta sección.
- **No:** default "Mateo" como muestra el mockup. El estado preseleccionado del mockup es ilustrativo; "Toda la sala" es el default más seguro para el disparador del feed completo.
- **Yes:** TIPO single-select, default "Comida" (primera pill, coincide con el mockup). La pill activa se marca con borde `#3F362E` y las inactivas con opacidad reducida, porque las 7 ya tienen fondo de color propio y no admiten el estilo oscuro de los chips PARA.
- **Yes:** `<input type="file" accept="image/*">` oculto con preview local vía `URL.createObjectURL`. Interacción demostrable sin backend; sin subida real.
- **No:** tile "Agregar" decorativo. Un botón visible que no hace nada queda a medio camino entre maqueta y producto.
- **Yes:** `canPublish = description.trim() !== "" && category !== ""`. Tipo y PARA siempre tienen default, por lo que en la práctica el gate es la descripción.
- **Yes:** submit solo cierra y resetea (con revocado de URLs). Sin agregar la publicación al feed.
- **No:** la publicación aparece en el feed. Requiere lifting de estado a `app/page.tsx` y compartir modelo `Post`; merece su propia spec.
- **No:** ruta `/crear-publicacion` o intercepting routes. Mismo criterio que SPEC 04/05.
- **Yes:** el texto precargado del textarea del mockup ("Pintamos con témperas…") se descarta; es contenido ilustrativo. Default vacío.

## Risks

| Risk | Mitigation |
| --- | --- |
| Fuga de memoria por `URL.createObjectURL` si se cierra sin revocar | Centralizar el cleanup en una función `resetForm()` invocada por submit, "Cancelar", backdrop y `Escape`. |
| Tarjeta más alta que la viewport (580px + secciones) | Overlay con `overflow: auto` y `align-items: flex-start`, como permite el mockup (`padding: 40px 24px`). |
| Convertir el botón del Sidebar en Client Component podría afectar el Server Component `Sidebar` | `Sidebar` sigue siendo Server Component e importa `CreatePostModal` (client) como hijo; patrón soportado por App Router y ya usado en SPEC 04/05. |
| Quedar referencias muertas a `/crear-publicacion` tras editar `Sidebar` | `Composer` y `PostCard` conservan sus hrefs a propósito (fuera de alcance); el paso 7 elimina solo el del botón. |
| Props o tipos mal declarados (7 categorías con colores) | Tipos explícitos (`PostCategory`, `CreatePostFormState`) + `npx tsc --noEmit`. |

## What is **not** in this spec

- Que `Composer` o "Editar" de `PostCard` abran el modal.
- Que la publicación creada aparezca en el feed.
- Persistencia, API o publicación real de posts.
- Subida real de fotos.
- Ruta standalone `/crear-publicacion` o intercepting routes.
- Mensaje de éxito tras publicar.
- Accesibilidad completa (focus trap, aria-modal).
- Tests automatizados.

Cada uno de esos, si llega, va en su propia spec.
