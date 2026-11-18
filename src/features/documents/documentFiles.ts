import { type AcademicDocument } from '@/types/content';

export function downloadName(document: AcademicDocument): string {
  return `EnergyFlow-${document.slug}.pdf`;
}
