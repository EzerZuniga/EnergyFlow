import { isRouteErrorResponse, Link, useLocation, useRouteError } from 'react-router';

import { paths } from '@/app/paths';
import { ErrorState } from '@/components/feedback/ErrorState';
import { Button } from '@/components/ui/button';

function describeError(error: unknown): string {
  if (isRouteErrorResponse(error)) return `${String(error.status)} ${error.statusText}`;
  if (error instanceof Error) return error.message;
  return 'Error desconocido';
}

/**
 * Error inesperado al mostrar una ruta. Se usa como ErrorBoundary de cada área, de modo
 * que el header y la navegación siguen disponibles para salir del error.
 */
export function RouteErrorPage() {
  const error = useRouteError();
  const { pathname } = useLocation();
  const inDemo = pathname.startsWith(paths.demo.root);

  return (
    <div className="mx-auto grid w-full max-w-2xl gap-4 px-4 py-12">
      <h1 className="sr-only">Error</h1>
      <ErrorState
        title="Algo salió mal al mostrar esta página"
        description="Puedes reintentar o volver a una sección segura. Si el problema continúa, reinicia los datos de la demostración."
        onRetry={() => {
          window.location.reload();
        }}
      />
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="link">
          <Link to={inDemo ? paths.demo.dashboard : paths.home}>
            {inDemo ? 'Ir al dashboard' : 'Ir al inicio'}
          </Link>
        </Button>
      </div>
      <details className="rounded-lg border border-border bg-surface px-4 py-3 text-sm">
        <summary className="cursor-pointer text-muted-foreground">Detalle técnico</summary>
        <p className="mt-2 font-mono text-xs break-words">{describeError(error)}</p>
      </details>
    </div>
  );
}
