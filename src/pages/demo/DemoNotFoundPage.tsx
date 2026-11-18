import { LayoutDashboard, SearchX } from 'lucide-react';
import { Link } from 'react-router';

import { paths } from '@/app/paths';
import { EmptyState } from '@/components/feedback/EmptyState';
import { Button } from '@/components/ui/button';

/** Ruta desconocida dentro de /demo: se muestra sin salir del layout de la demo. */
export function DemoNotFoundPage() {
  return (
    <>
      <h1 className="sr-only">Módulo no encontrado</h1>
      <EmptyState
        icon={SearchX}
        title="Módulo no encontrado"
        description="La dirección no corresponde a ningún módulo de la demo."
        action={
          <Button asChild>
            <Link to={paths.demo.dashboard}>
              <LayoutDashboard aria-hidden="true" />
              Ir al dashboard
            </Link>
          </Button>
        }
      />
    </>
  );
}
