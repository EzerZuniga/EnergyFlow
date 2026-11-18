import { type LandingSection } from '@/types/content';

export const landingSections = [
  { id: 'proyecto', label: 'Proyecto', inHeader: true },
  { id: 'problema', label: 'Problema', inHeader: true },
  { id: 'objetivos', label: 'Objetivos', inHeader: true },
  { id: 'justificacion', label: 'Justificación', inHeader: false },
  { id: 'metodologia', label: 'Metodología', inHeader: true },
  { id: 'documentos', label: 'Documentos', inHeader: true },
  { id: 'equipo', label: 'Equipo', inHeader: true },
  { id: 'demo', label: 'Demo', inHeader: false },
] as const satisfies readonly LandingSection[];

export type LandingSectionId = (typeof landingSections)[number]['id'];
