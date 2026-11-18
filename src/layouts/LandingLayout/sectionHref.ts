import { paths } from '@/app/paths';

/** URL de una sección de la landing. Funciona desde cualquier página (navega y desplaza). */
export function sectionHref(id: string): string {
  return `${paths.home}#${id}`;
}
