import { Link } from 'react-router';

import { paths } from '@/app/paths';
import { Logo } from '@/components/brand/logo';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';

import { ControlsSection } from './ControlsSection';
import { DataDisplaySection } from './DataDisplaySection';
import { FeedbackSection } from './FeedbackSection';
import { FoundationsSection } from './FoundationsSection';

/**
 * Catálogo del sistema de diseño. SOLO en desarrollo: la ruta no se registra
 * en el build de producción (ver router.tsx).
 */
export function DesignSystemPage() {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link to={paths.home} aria-label="EnergyFlow, ir al inicio">
              <Logo size="sm" />
            </Link>
            <Badge variant="outline" className="hidden sm:inline-flex">
              Sistema de diseño · dev
            </Badge>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-4 py-10">
        <h1 className="sr-only">Sistema de diseño de EnergyFlow</h1>
        <FoundationsSection />
        <ControlsSection />
        <DataDisplaySection />
        <FeedbackSection />
      </main>
    </div>
  );
}
