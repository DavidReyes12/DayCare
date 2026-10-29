# SPEC 04 — Modal "Agregar niño" en `/kids`

> **Status:** Implemented
> **Depends on:** specs/02-kids-and-profile.md
> **Date:** 2026-10-28
> **Objective:** Integrar el formulario de `references/pantallas/agregar-nino.dc.html` como modal client-side sobre `/kids`, abierto por el botón "Agregar niño", con los campos nombre completo, fecha de nacimiento y sala marcados como requeridos, y el selector SALA ampliado a 3 salas (Soles, Lunas, Estrellas), sin persistencia.

## Scope

**In:**

- Crear `components/kids/AddKidModal.tsx` como Client Component (`"use client"`) que renderiza:
  - El botón disparador con el estilo actual de "Agregar niño" (gradiente coral, ícono `+`).
  - El overlay modal con la tarjeta del mockup (ancho máximo 520px, fondo `#FBF4EC`, borde `#ECE0D0`, radio 24px, sombra).
  - Encabezado del modal: "Cancelar" (cierra), título "Agregar niño", "Guardar" (submit).
  - Campos: NOMBRE COMPLETO (input, requerido), FECHA DE NACIMIENTO (input, requerido, placeholder `dd/mm/aaaa`), SALA (selector, requerido, opciones `Soles`, `Lunas`, `Estrellas`, default `Soles`), ALERGIAS (ETIQUETAS) (input opcional), NOTAS MÉDICAS (textarea opcional).
  - Marcado visual de requeridos con asterisco (`*`) en las etiquetas y atributo `required` en los inputs/select.
  - Botón "Guardar" deshabilitado hasta que nombre completo, fecha de nacimiento y sala estén completos; al enviar cierra el modal y resetea el formulario.
  - Cierre también al hacer click en el fondo atenuado y al presionar `Escape`.
- Actualizar `components/kids/KidsHeader.tsx`:
  - Eliminar la prop `addHref` y el uso de `next/link` para el botón de agregar.
  - Renderizar `<AddKidModal />` en lugar del enlace, manteniendo el resto del encabezado ("GESTIÓN", "Niños").
- Actualizar `app/kids/page.tsx` para invocar `<KidsHeader />` sin props.
- Añadir las salas `Lunas` y `Estrellas` al selector (además de `Soles`).

**Out of scope (for future specs):**

- Persistencia o alta real de niños (API, base de datos, localStorage o estado compartido con la grilla).
- Validación avanzada de fecha (formato `dd/mm/aaaa`) o mensajes de error inline más allá de la validación nativa del navegador.
- Ruta standalone `/agregar-nino` o intercepting routes.
- Accesibilidad completa (focus trap, aria-modal) más allá de cierre con Escape y click en backdrop.
- Tests automatizados (no hay runner configurado).

## Data model

No introduce persistencia ni nuevas entidades persistentes. El estado del modal es local al Client Component:

```ts
// components/kids/AddKidModal.tsx
"use client";

type RoomName = "Soles" | "Lunas" | "Estrellas";

type AddKidFormState = {
  fullName: string;
  birthDate: string;
  room: RoomName;
  allergies: string;
  medicalNotes: string;
};
```

Las 3 salas disponibles se definen como constante en el componente:

```ts
const ROOMS: RoomName[] = ["Soles", "Lunas", "Estrellas"];
```

No se modifican los datos hardcodeados de `app/kids/page.tsx` (los 8 niños existentes).

## Implementation plan

1. Crear `components/kids/AddKidModal.tsx` como Client Component:
   - Estado `isOpen` (boolean) y estado del formulario (`AddKidFormState`, default `room: "Soles"`).
   - Botón disparador con el estilo del mockup (gradiente `#F4977E → #EE8164`, radio 14, sombra) que abre el modal.
   - Overlay `position: fixed; inset: 0` con fondo `rgba(63,54,46,.45)`, `z-index` alto, centrado, que cierra al click en el fondo.
   - Tarjeta con el markup del mockup `agregar-nino.dc.html` (padding, inputs, textarea) y encabezado Cancelar / "Agregar niño" / Guardar.
   - Inputs con `required` para nombre, fecha y sala; etiquetas con asterisco.
   - Selector SALA como `<select required>` con opciones `Soles`, `Lunas`, `Estrellas`.
   - `canSave = fullName.trim() !== "" && birthDate.trim() !== "" && room !== ""`; botón "Guardar" `disabled={!canSave}`.
   - Al submit: `preventDefault`, cerrar modal y resetear formulario.
   - Listener de `Escape` (solo cuando `isOpen`) para cerrar.
2. Actualizar `components/kids/KidsHeader.tsx`:
   - Eliminar la prop `addHref` y el import de `Link` (si ya no se usa).
   - Importar y renderizar `<AddKidModal />` en el lugar del enlace "Agregar niño".
3. Actualizar `app/kids/page.tsx`: cambiar `<KidsHeader addHref="/agregar-nino" />` por `<KidsHeader />`.
4. Verificar con `npm run build`, `npx tsc --noEmit` y `npx eslint app`.

## Acceptance criteria

- [x] En `/kids`, el botón "Agregar niño" abre un modal (overlay) sin navegar a otra ruta.
- [x] El modal reproduce el diseño de `references/pantallas/agregar-nino.dc.html` (encabezado Cancelar / "Agregar niño" / Guardar, campos y estilos).
- [x] Los campos NOMBRE COMPLETO, FECHA DE NACIMIENTO y SALA están marcados con asterisco y tienen atributo `required`.
- [x] El selector SALA ofrece exactamente 3 opciones: `Soles`, `Lunas`, `Estrellas` (default `Soles`).
- [x] El botón "Guardar" está deshabilitado hasta completar los 3 campos requeridos.
- [x] "Cancelar", click en el fondo y `Escape` cierran el modal.
- [x] "Guardar" (con campos válidos) cierra el modal y resetea el formulario.
- [x] Existe `components/kids/AddKidModal.tsx` como Client Component y `KidsHeader` ya no recibe `addHref`.
- [x] `npm run build`, `npx tsc --noEmit` y `npx eslint app` pasan sin errores.

## Decisions

- **Yes:** modal client-side con estado local en `AddKidModal`. Consistente con la ausencia de persistencia de las Specs 01–03 y evita rutas/intercepting routes.
- **Yes:** mover el botón disparador dentro de `AddKidModal` y renderizarlo desde `KidsHeader`. Evita pasar callbacks de servidor a cliente y mantiene el encabezado como Server Component.
- **Yes:** eliminar `addHref` de `KidsHeader`. Ya no hay ruta `/agregar-nino`; el botón abre el modal.
- **Yes:** selector SALA como `<select>` nativo con `required`. Garantiza validación nativa y accesibilidad básica, manteniendo las 3 opciones.
- **Yes:** deshabilitar "Guardar" hasta completar los requeridos, además de `required`. Mejor UX que depender solo del tooltip del navegador.
- **Yes:** salas `Soles`, `Lunas`, `Estrellas`. Las 2 adicionales siguen la temática infantil del proyecto.
- **No:** persistencia o alta real. Fuera de alcance; se difiere a una spec futura.
- **No:** validación de formato de fecha. Se mantiene input de texto con placeholder `dd/mm/aaaa` y `required`.

## Risks

| Risk | Mitigation |
| --- | --- |
| Convertir el disparador a Client Component podría afectar el Server Component `KidsHeader` | `KidsHeader` sigue siendo Server Component e importa `AddKidModal` (client) como hijo; patrón soportado por App Router. |
| Overlay con `z-index` por debajo de otros elementos | Usar `z-index` alto (p. ej. 50) y `position: fixed`. |
| Listener de `Escape` filtrado si el modal está cerrado | Registrar el listener solo cuando `isOpen` sea true y limpiar en el cleanup. |
| Props mal tipadas en el nuevo componente | Tipos explícitos + `npx tsc --noEmit`. |

## What is **not** in this spec

- Persistencia o alta real de niños.
- Ruta standalone `/agregar-nino`.
- Validación avanzada de fecha o mensajes de error inline.
- Accesibilidad completa (focus trap, aria-modal).
- Cambios en la grilla de niños existente.
- Tests automatizados.

Cada uno de esos, si llega, va en su propia spec.