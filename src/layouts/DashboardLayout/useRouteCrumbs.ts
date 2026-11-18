import { useMatches } from 'react-router';

import { paths } from '@/app/paths';
import { type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { isRouteHandle } from '@/types/navigation';

/**
 * Migas de pan de la demo a partir del `handle.crumb` de las rutas activas.
 * Devuelve también el título de la página actual (para la pestaña del navegador).
 */
export function useRouteCrumbs(): { items: BreadcrumbItem[]; title: string } {
  const handles = useMatches()
    .map((match) => ({ pathname: match.pathname, handle: match.handle }))
    .filter((match): match is { pathname: string; handle: { crumb: string; title?: string } } =>
      isRouteHandle(match.handle),
    );

  const items: BreadcrumbItem[] = [
    { label: 'Demo', to: paths.demo.dashboard },
    ...handles.map((match) => ({ label: match.handle.crumb, to: match.pathname })),
  ];
  const last = handles.at(-1)?.handle;

  return { items, title: last ? (last.title ?? last.crumb) : 'Demo' };
}
