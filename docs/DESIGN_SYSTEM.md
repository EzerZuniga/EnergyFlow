# EnergyFlow — Sistema de diseño

Guía de uso de la identidad visual y los componentes base (Fase 3).
Catálogo interactivo en desarrollo: `npm run dev` → <http://localhost:5173/design-system>
(la ruta no existe en producción).

## Identidad

- **Isotipo:** curva de potencia P(t) con el área bajo ella dividida en trapecios: la energía
  obtenida por integración numérica. Fuente única: `src/components/brand/logo.tsx`
  (`LogoMark`, `Logo`). Copias estáticas: `public/favicon.svg` y
  `public/logos/energyflow-mark.svg` (mantener sincronizadas).
- **Logotipo:** "Energy" + "Flow" en Space Grotesk; "Flow" en `primary` (claro) o `accent`
  (oscuro). El texto es real, así que se lee como "EnergyFlow".

## Color

Los tokens viven en `src/styles/globals.css`.

| Capa                                                                                                        | Uso                                                           |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Marca (`brand-navy`, `brand-deep`, `brand-blue`, `brand-cyan`, `brand-white`)                               | Valores fijos. Solo para identidad (logo, fondos destacados). |
| Semánticos (`background`, `surface`, `muted`, `primary`, `accent`, `success`, `warning`, `danger`, `info`…) | **Lo que usan los componentes.** Cambian con el tema.         |

Reglas:

1. Nunca escribir hexadecimales en componentes; usar las utilidades `bg-surface`,
   `text-muted-foreground`, etc.
2. Para fondos suaves con texto de color, usar los pares `*-soft` + color
   (`bg-success-soft text-success`); sus contrastes están verificados.
3. El Electric Blue de marca (#1677FF) no alcanza 4.5:1 con texto blanco; por eso
   `primary` es #0F66E0 en claro y #4A92FF (con texto navy) en oscuro. El cian de marca no es
   legible sobre blanco; en claro, `accent` es #077086.

**Accesibilidad verificada:** 56 combinaciones texto/fondo (28 por tema) cumplen WCAG 2.1 AA.
El texto alcanza al menos 4.5:1. El foco y los bordes de los controles alcanzan al menos 3:1.

## Tipografía

| Familia        | Token                        | Uso                                          |
| -------------- | ---------------------------- | -------------------------------------------- |
| Space Grotesk  | `font-display`               | Títulos (`h1`–`h4` la usan por defecto)      |
| Inter          | `font-sans`                  | Interfaz y lectura (predeterminada)          |
| JetBrains Mono | `font-mono` + `tabular-nums` | Cifras, unidades, fórmulas, tablas numéricas |

Las fuentes se sirven desde el propio sitio (`@fontsource-variable`); el navegador descarga
solo los subconjuntos de caracteres que usa la página.

**Unidades:** no aplicar `uppercase` a textos con unidades; `h` (hora) ≠ `H` (henrio).

## Tema claro y oscuro

- `ThemeProvider` (`src/app/providers`) aplica `.dark` en `<html>`, sigue al sistema
  mientras el usuario no elija y guarda la elección en `localStorage` (`energyflow:theme`).
- Un script en `index.html` aplica el tema antes del primer pintado, para que la página no
  parpadee entre tema claro y oscuro al cargar.
- Cualquier contenedor con la clase `dark` fuerza el tema oscuro dentro de él (la landing lo
  usará en las secciones navy).

## Componentes

| Grupo                   | Componentes (`src/components/…`)                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Acciones                | `ui/button` (variantes: primary, secondary, outline, ghost, destructive, link; tamaños sm, md, lg, icon, icon-sm; `loading`, `asChild`)                                                                 |
| Formularios             | `ui/field` (etiqueta + ayuda + error con ARIA), `ui/input`, `ui/textarea`, `ui/native-select`, `ui/label`                                                                                               |
| Datos                   | `ui/card`, `ui/badge`, `ui/table` (`numeric` alinea cifras a la derecha)                                                                                                                                |
| Superposiciones         | `ui/dialog`, `ui/alert-dialog` (confirmaciones destructivas), `ui/tooltip`                                                                                                                              |
| Retroalimentación       | `ui/alert`, `ui/spinner`, `ui/skeleton`, `ui/toaster` + `ui/notify`, `feedback/EmptyState`, `feedback/ErrorState`, `feedback/LoadingState`, `feedback/DataBadges` (`DemoDataBadge`, `PlaceholderBadge`) |
| Marca                   | `brand/logo` (`Logo`, `LogoMark`), `ui/theme-toggle`                                                                                                                                                    |
| Navegación y movimiento | `ui/sheet` (panel lateral accesible), `ui/reveal` (aparición al entrar en pantalla)                                                                                                                     |
| Notación matemática     | `math/notation` (`Frac`, `Integral`, `Var`) con lectura accesible para lectores de pantalla                                                                                                             |
| Contenido pendiente     | `feedback/PendingText` (muestra el dato o "Pendiente"), `DemoDataBadge`, `PlaceholderBadge`                                                                                                             |

### Patrones

```tsx
// Campo de formulario accesible
<Field
  label="Potencia nominal (W)"
  description="Valor de placa."
  error={errors.power?.message}
  required
>
  <Input type="number" />
</Field>;

// Notificación
notify.success('Equipo registrado', { description: 'Aire acondicionado' });

// Confirmación de una acción destructiva
<AlertDialog>
  …<AlertDialogAction onClick={remove}>Eliminar</AlertDialogAction>
</AlertDialog>;
```

- **Iconos:** Lucide React; `aria-hidden="true"` cuando acompañan texto. Los botones de solo
  icono deben llevar `aria-label`. Tamaño por defecto dentro de botones: 16 px.
- **Diseño responsive:** en contenedores `grid`, usar `grid-cols-1` (equivale a
  `minmax(0, 1fr)`) para que el contenido ancho, como las tablas, no desborde en móvil.
- **Movimiento:** animaciones de 120–180 ms. Si el sistema pide movimiento reducido
  (`prefers-reduced-motion`), se desactivan.
