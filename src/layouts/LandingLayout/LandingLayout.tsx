import { Outlet } from 'react-router';

import { LandingFooter } from './LandingFooter';
import { LandingHeader } from './LandingHeader';

/** Marco del sitio público: header fijo, contenido y footer. */
export function LandingLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#contenido"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <LandingHeader />
      <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
}
