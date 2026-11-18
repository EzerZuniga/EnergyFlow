/**
 * Tipos del contenido académico editable (src/content).
 * Convención: `null` significa "información aún no proporcionada por el equipo";
 * la interfaz lo muestra como pendiente, nunca inventa un valor.
 */

/** Texto redactado a partir de la definición del proyecto que el equipo debe validar. */
export interface DraftText {
  text: string;
  /** true = borrador pendiente de validar con el informe; se marca visualmente. */
  draft: boolean;
}

export interface LandingSection {
  id: string;
  label: string;
  /** Si aparece en la navegación principal del header (el footer las muestra todas). */
  inHeader: boolean;
}

export interface AcademicInfo {
  type: string;
  course: string;
  institution: string | null;
  instructor: string | null;
  period: string | null;
}

export interface Objectives {
  general: DraftText;
  specific: DraftText[];
}

export interface TeamMember {
  id: string;
  name: string | null;
  role: string | null;
  /** Ruta dentro de /public (p. ej. "/images/team/ana.webp"). */
  photo: string | null;
}

export type DocumentKind = 'report' | 'slides';

export interface AcademicDocument {
  slug: string;
  kind: DocumentKind;
  title: string;
  description: string;
  /** Ruta del PDF dentro de /public (p. ej. "/documents/informe.pdf"). */
  file: string;
  /** false hasta que el equipo entregue el PDF real. */
  available: boolean;
  pages: number | null;
  sizeKb: number | null;
  /** Fecha ISO 8601 de la última versión. */
  updatedAt: string | null;
}
