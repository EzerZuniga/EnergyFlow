import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';

import { notify } from '@/components/ui/notify';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PREFERENCE_KEYS } from '@/utils/constants';

import { DemoHeader } from './DemoHeader';
import { DemoSidebar } from './DemoSidebar';
import { useRouteCrumbs } from './useRouteCrumbs';

function useDemoWelcome() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(PREFERENCE_KEYS.demoWelcome)) return;
      sessionStorage.setItem(PREFERENCE_KEYS.demoWelcome, '1');
    } catch {
      return;
    }
    notify.info('Estás en la demostración de EnergyFlow', {
      description: 'Funciona por completo en tu navegador, sin servidor.',
    });
  }, []);
}

export function DashboardLayout() {
  const { items, title } = useRouteCrumbs();
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useDocumentTitle(`${title} · Demo`);
  useDemoWelcome();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className="flex min-h-dvh bg-background">
      <a
        href="#contenido-demo"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <DemoSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DemoHeader crumbs={items} />
        <main
          id="contenido-demo"
          ref={mainRef}
          tabIndex={-1}
          className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 content-start gap-8 px-4 py-6 focus:outline-none sm:px-6 lg:px-8 lg:py-8"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
