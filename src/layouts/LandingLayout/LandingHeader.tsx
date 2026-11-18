import { ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router';

import { documentPath, paths } from '@/app/paths';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { landingSections } from '@/content/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/utils/cn';

import { MobileNav } from './MobileNav';
import { sectionHref } from './sectionHref';

const headerSections = landingSections.filter((section) => section.inHeader);
// Incluye el hero (#inicio): al volver arriba ningún enlace debe quedar marcado como activo.
const observedIds = ['inicio', ...landingSections.map((section) => section.id)];

export function LandingHeader() {
  const { pathname } = useLocation();
  const visibleSection = useActiveSection(observedIds, pathname);
  // En la landing manda la sección visible; en el visor de documentos, "Documentos".
  const activeId =
    pathname === paths.home
      ? visibleSection
      : pathname.startsWith(documentPath(''))
        ? 'documentos'
        : null;

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to={sectionHref('inicio')}
          className="rounded-md"
          aria-label="EnergyFlow, ir al inicio"
        >
          <Logo size="sm" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {headerSections.map((section) => (
              <li key={section.id}>
                <Link
                  to={sectionHref(section.id)}
                  aria-current={activeId === section.id ? 'true' : undefined}
                  className={cn(
                    'relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                    'after:absolute after:inset-x-3 after:-bottom-3.25 after:h-0.5 after:rounded-full after:bg-primary after:opacity-0 after:transition-opacity',
                    'aria-current:text-foreground aria-current:after:opacity-100',
                  )}
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild size="sm" className="ml-1 hidden sm:inline-flex">
            <Link to={paths.demo.root}>
              Ver demo
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <MobileNav activeId={activeId} className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}
