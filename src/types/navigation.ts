/** Metadatos que una ruta declara en `handle` (React Router). */
export interface RouteHandle {
  /** Texto de la miga de pan de esta ruta. */
  crumb: string;
  /** Título de la pestaña; por defecto, `crumb`. */
  title?: string;
}

export function isRouteHandle(handle: unknown): handle is RouteHandle {
  return (
    typeof handle === 'object' &&
    handle !== null &&
    typeof (handle as { crumb?: unknown }).crumb === 'string'
  );
}
