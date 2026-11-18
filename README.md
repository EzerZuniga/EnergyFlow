# EnergyFlow

Plataforma web interactiva para el monitoreo y análisis del consumo energético mediante cálculo integral y métodos numéricos (Trapecio, Simpson 1/3 y Simpson 3/8). Desarrollada con React, TypeScript y Tailwind CSS.

> "La energía también se puede calcular."

## Requisitos

- Node.js 22.22.2 o superior (probado con 24.16)
- npm 11

## Desarrollo

```bash
npm install
npm run dev          # servidor de desarrollo en http://localhost:5173
```

| Script                  | Descripción                                          |
| ----------------------- | ---------------------------------------------------- |
| `npm run dev`           | Servidor de desarrollo con recarga en caliente       |
| `npm run build`         | Comprobación de tipos y build de producción          |
| `npm run preview`       | Sirve el build de producción localmente              |
| `npm run typecheck`     | Comprobación de tipos con TypeScript                 |
| `npm run lint`          | ESLint (incluye reglas de fronteras de arquitectura) |
| `npm run format`        | Formatea el código con Prettier                      |
| `npm run test`          | Ejecuta las pruebas con Vitest                       |
| `npm run test:coverage` | Pruebas con informe de cobertura                     |
| `npm run check`         | typecheck + lint + formato + pruebas                 |

La arquitectura del proyecto está documentada en [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Contenido académico

Todo el texto editable está en [`src/content/`](src/content/). Lo que aún no se ha
proporcionado vale `null` y la web lo muestra como **"Pendiente"**. Los textos base marcados
con `draft: true` se muestran como **"Borrador"**.

| Archivo        | Qué contiene                                                                          |
| -------------- | ------------------------------------------------------------------------------------- |
| `project.ts`   | Datos académicos (institución, docente, periodo), problema, objetivos y justificación |
| `team.ts`      | Los seis integrantes (nombre, rol y foto opcional en `public/images/team/`)           |
| `documents.ts` | Manifiesto del informe y las diapositivas                                             |

### Publicar un documento PDF

1. Copia el archivo en `public/documents/` con el nombre indicado en `documents.ts`
   (`informe.pdf` o `diapositivas.pdf`).
2. En `src/content/documents.ts`, cambia `available` a `true` y completa `pages`,
   `sizeKb` (tamaño en KB) y `updatedAt` (`"AAAA-MM-DD"`).
3. Ejecuta `npm run test`. Las pruebas comprueban que el archivo existe, que es un PDF
   real y que el tamaño declarado coincide con el archivo.
