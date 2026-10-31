# SPEC 05 — Modal "Vincular padre" en `/kids/[id]`

> **Status:** Approved
> **Depends on:** specs/02-kids-and-profile.md, specs/04-add-kid-modal.md
> **Date:** 2026-10-31
> **Objective:** Convertir el enlace "Vincular otro padre" de `LinkedParentsCard` en un modal client-side que reproduce el diseño de `references/pantallas/vincular-padre.dc.html`, abierto desde la tarjeta de padres vinculados en el perfil del niño (`/kids/[id]`), con los campos nombre, email y parentesco obligatorios y sin persistencia.

## Scope

**In:**

- Crear `components/kids/LinkParentModal.tsx` como Client Component (`"use client"`) que renderiza:
  - El botón disparador "Vincular otro padre" (reemplaza el `<Link>` actual de `LinkedParentsCard`, con el mismo estilo: avatar punteado con ícono `+`, texto coral `#C5503A`).
  - El overlay modal (`position: fixed; inset: 0; background: rgba(63,54,46,.45); z-index: 50`) con la tarjeta del mockup (ancho máximo 480px, fondo `#FBF4EC`, borde `#ECE0D0`, radio 24px, sombra).
  - Encabezado: botón de cerrar (ícono X → solo cierra el modal), título "Vincular padre" en Fredoka y subtítulo "a {kidName}" en color `#A89A8B`.
  - Aviso informativo azul ("Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de {kidName}.") con ícono de información.
  - Campo NOMBRE DEL PADRE/MADRE (input texto, requerido, placeholder "Ej. Diego Fernández").
  - Campo EMAIL (input tipo email, requerido, placeholder "correo@ejemplo.com").
  - Campo PARENTESCO: 3 pills toggle single-select (Mamá, Papá, Tutor/a), requerido, default "Mamá" seleccionado.
  - Bloque de CÓDIGO DE INVITACIÓN: caja amarilla punteada con código estático "7K4P9", texto "VENCE EN 7 DÍAS" decorativo.
  - Botón "Enviar invitación" (gradiente coral `#F4977E → #EE8164`, ícono avión) deshabilitado hasta completar los 3 campos requeridos.
  - Cierre del modal al hacer click en el fondo atenuado y al presionar `Escape`.
  - Al enviar: `preventDefault`, cerrar modal y resetear formulario.
- Actualizar `components/kids/LinkedParentsCard.tsx`:
  - Eliminar la prop `linkHref` y el `<Link>` correspondiente a "Vincular otro padre".
  - Añadir la prop `kidName: string`.
  - Importar y renderizar `<LinkParentModal kidName={kidName} />` en lugar del enlace.
- Actualizar `app/kids/[id]/page.tsx`:
  - Eliminar `linkHref="/vincular-padre"` de la invocación de `<LinkedParentsCard />`.
  - Pasar `kidName={kid.name}` a `<LinkedParentsCard />`.

**Out of scope (for future specs):**

- Persistencia o vinculación real de padres (API, base de datos, estado compartido con la tarjeta).
- Generación real del código de invitaciones ni expiración.
- Envío real de correo electrónico.
- Validación avanzada de email más allá de `type="email"` + `required`.
- Ruta standalone `/vincular-padre` o intercepting routes.
- Accesibilidad completa (focus trap, aria-modal) más allá de cierre con Escape y click en backdrop.
- Mensaje de éxito tras enviar.
- Tests automatizados (no hay runner configurado).

## Data model

No introduce persistencia ni nuevas entidades persistentes. El estado del modal es local al Client Component:

```ts
// components/kids/LinkParentModal.tsx
"use client";

type Relation = "Mamá" | "Papá" | "Tutor/a";

type LinkParentFormState = {
  parentName: string;
  email: string;
  relation: Relation;
};

const RELATIONS: Relation[] = ["Mamá", "Papá", "Tutor/a"];

const INITIAL_FORM: LinkParentFormState = {
  parentName: "",
  email: "",
  relation: "Mamá",
};

const INVITATION_CODE = "7K4P9";
```

La prop `kidName` se recibe desde el componente padre y se usa únicamente para los textos del modal (subtítulo y aviso informativo). No se modifica el tipo `LinkedParent` ni los datos hardcodeados existentes en `app/kids/[id]/page.tsx`.

## Implementation plan

1. Crear `components/kids/LinkParentModal.tsx` como Client Component:
   - Estado `isOpen` (boolean) y estado del formulario (`LinkParentFormState`, default `relation: "Mamá"`).
   - Botón disparador con el estilo del mockup (avatar punteado + texto coral "Vincular otro padre") que abre el modal.
   - Overlay `position: fixed; inset: 0` con fondo `rgba(63,54,46,.45)`, `z-index: 50`, centrado, que cierra al click en el fondo.
   - Tarjeta con el markup del `vincular-padre.dc.html`: encabezado con título "Vincular padre" y subtítulo "a {kidName}", aviso azul, campos, pills de parentesco, bloque de código y botón de envío.
   - Pills de parentesco: 3 `<button type="button">` con estilo toggle (seleccionado: fondo `#CCD8F4`, borde `#9FB8EC`, texto `#4E72C8`; no seleccionado: fondo `#FFFDF9`, borde `#ECE0D0`, texto `#6E6359`), `flex: 1`, `borderRadius: 999`.
   - `canSubmit = parentName.trim() !== "" && email.trim() !== "" && relation !== ""`; botón "Enviar invitación" `disabled={!canSubmit}`.
   - Al submit: `preventDefault`, cerrar modal y resetear formulario.
   - Listener de `Escape` (solo cuando `isOpen`) para cerrar.
2. Actualizar `components/kids/LinkedParentsCard.tsx`:
   - Eliminar la prop `linkHref` del tipo `LinkedParentsCardProps`.
   - Añadir la prop `kidName: string` al tipo.
   - Reemplazar el `<Link>` "Vincular otro padre" por `<LinkParentModal kidName={kidName} />`.
   - Eliminar el import de `next/link` si ya no se usa en el archivo.
3. Actualizar `app/kids/[id]/page.tsx`:
   - En la invocación de `<LinkedParentsCard />`, eliminar `linkHref="/vincular-padre"` y añadir `kidName={kid.name}`.
4. Verificar con `npm run build`, `npx tsc --noEmit` y `npx eslint app`.

## Acceptance criteria

- [ ] En `/kids/[id]`, el botón "Vincular otro padre" abre un modal (overlay) sin navegar a otra ruta.
- [ ] El modal reproduce el diseño de `references/pantallas/vincular-padre.dc.html` (encabezado con "Vincular padre" + "a {kidName}", aviso azul, campos, pills, código de invitación y botón de envío).
- [ ] Los campos NOMBRE DEL PADRE/MADRE y EMAIL están marcados con asterisco y tienen atributo `required`; el email usa `type="email"`.
- [ ] Las pills de parentesco son 3 opciones single-select (Mamá, Papá, Tutor/a) con "Mamá" seleccionado por defecto.
- [ ] El bloque de código de invitación muestra "7K4P9" y "VENCE EN 7 DÍAS" como texto decorativo estático.
- [ ] El botón "Enviar invitación" está deshabilitado hasta completar los 3 campos requeridos.
- [ ] El botón de cerrar (X), click en el fondo atenuado y `Escape` cierran el modal.
- [ ] "Enviar invitación" (con campos válidos) cierra el modal y resetea el formulario.
- [ ] Existe `components/kids/LinkParentModal.tsx` como Client Component.
- [ ] `LinkedParentsCard` ya no recibe `linkHref` y recibe `kidName` en su lugar.
- [ ] `app/kids/[id]/page.tsx` pasa `kidName={kid.name}` a `LinkedParentsCard`.
- [ ] `npm run build`, `npx tsc --noEmit` y `npx eslint app` pasan sin errores.

## Decisions

- **Yes:** modal client-side con estado local en `LinkParentModal`. Consistente con el patrón establecido en SPEC 04 (AddKidModal) y la ausencia de persistencia del proyecto.
- **Yes:** mover el disparador "Vincular otro padre" dentro de `LinkParentModal` y renderizarlo desde `LinkedParentsCard`. Evita pasar callbacks de servidor a cliente y mantiene `LinkedParentsCard` como Server Component.
- **Yes:** eliminar `linkHref` de `LinkedParentsCard` y reemplazar por `kidName`. Ya no hay ruta `/vincular-padre`; el enlace abre el modal, y el nombre del niño es necesario para los textos del modal.
- **Yes:** pills toggle para parentesco (single-select, 3 opciones) en lugar de `<select>`. Coincide con el diseño del mockup y ofrece mejor UX visual que un dropdown nativo.
- **Yes:** default "Mamá" seleccionado. Coincide con el estado visual del mockup donde "Mamá" aparece pre-seleccionado en azul.
- **Yes:** código de invitación estático "7K4P9". No hay backend ni generación de códigos; es un elemento visual/decoratorio.
- **No:** persistencia o vinculación real. Fuera de alcance; se difiere a una spec futura.
- **No:** generación dinámica del código. No hay lógica de negocio ni expiración real.
- **No:** mensaje de éxito post-envío. El modal simplemente se cierra y resetea, consistente con `AddKidModal`.

## Risks

| Risk | Mitigation |
| --- | --- |
| Convertir "Vincular otro padre" en Client Component podría afectar el Server Component `LinkedParentsCard` | `LinkedParentsCard` sigue siendo Server Component e importa `LinkParentModal` (client) como hijo; patrón soportado por App Router y ya usado con `AddKidModal` en SPEC 04. |
| Overlay con `z-index` por debajo de otros elementos | Usar `z-index: 50` y `position: fixed`, consistente con `AddKidModal`. |
| Listener de `Escape` filtrado si el modal está cerrado | Registrar el listener solo cuando `isOpen` sea true y limpiar en el cleanup, igual que `AddKidModal`. |
| Props mal tipadas en el nuevo componente | Tipos explícitos + `npx tsc --noEmit`. |

## What is **not** in this spec

- Persistencia o vinculación real de padres.
- Ruta standalone `/vincular-padre` o intercepting routes.
- Envío real de correo o generación de códigos dinámicos.
- Validación avanzada de email más allá del tipo nativo.
- Mensaje de éxito tras enviar.
- Accesibilidad completa (focus trap, aria-modal).
- Cambios en la lista de padres vinculados existente (no se añade el padre a `LINKED_PARENTS`).
- Tests automatizados.

Cada uno de esos, si llega, va en su propia spec.
