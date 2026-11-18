import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

import { paths } from '@/app/paths';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
      <Logo size="sm" />
      <div className="grid gap-2">
        <p className="font-mono text-sm font-medium text-muted-foreground">Error 404</p>
        <h1 className="text-3xl font-semibold">Página no encontrada</h1>
        <p className="max-w-sm text-muted-foreground">
          La dirección no existe o fue movida. Revisa el enlace o vuelve al inicio.
        </p>
      </div>
      <Button asChild variant="outline">
        <Link to={paths.home}>
          <ArrowLeft aria-hidden="true" />
          Volver al inicio
        </Link>
      </Button>
    </main>
  );
}
