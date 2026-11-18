import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { routes } from '@/app/router';
import { TooltipProvider } from '@/components/ui/tooltip';

/**
 * Monta la aplicación real (rutas + providers) en una URL y espera al h1 de la página.
 * Las rutas son lazy: la primera carga en Vitest compila varios módulos, de ahí el timeout amplio.
 */
export async function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <ThemeProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>,
  );
  await screen.findByRole('heading', { level: 1 }, { timeout: 8000 });
  return router;
}
