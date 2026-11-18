import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { beforeEach, describe, expect, it } from 'vitest';

import { demoModules } from '@/app/navigation';
import { paths } from '@/app/paths';
import { RouteErrorPage } from '@/pages/system/RouteErrorPage';
import { useUiStore } from '@/stores/uiStore';
import { renderRoute } from '@/tests/helpers/renderRoute';
import { PREFERENCE_KEYS } from '@/utils/constants';

beforeEach(() => {
  act(() => {
    useUiStore.setState({ sidebarCollapsed: false });
  });
  // La bienvenida se marca como mostrada para no interferir con las aserciones.
  sessionStorage.setItem(PREFERENCE_KEYS.demoWelcome, '1');
});

const sidebar = () => screen.getByRole('complementary', { name: 'Barra lateral' });

describe('estructura de la demo', () => {
  it('/demo redirige al dashboard', async () => {
    const router = await renderRoute(paths.demo.root);
    expect(router.state.location.pathname).toBe(paths.demo.dashboard);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Dashboard');
  });

  it.each(demoModules.map((module) => [module.label, module] as const))(
    'módulo "%s": h1, título de pestaña, migas de pan y enlace activo',
    async (_label, module) => {
      await renderRoute(module.path);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(module.label);
      expect(document.title).toBe(`${module.label} · Demo · EnergyFlow`);

      const crumbs = screen.getByRole('navigation', { name: 'Ruta de navegación' });
      expect(within(crumbs).getByText(module.label)).toHaveAttribute('aria-current', 'page');

      const active = within(sidebar()).getByRole('link', { current: 'page' });
      expect(active).toHaveAttribute('href', module.path);
    },
  );

  it('el sidebar enlaza a los siete módulos', async () => {
    await renderRoute(paths.demo.dashboard);
    const nav = within(sidebar()).getByRole('navigation', { name: 'Módulos de la demo' });
    const hrefs = within(nav)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(demoModules.map((module) => module.path));
  });

  it('los indicadores no muestran cifras inventadas sin datos', async () => {
    await renderRoute(paths.demo.dashboard);
    const kpis = screen.getByRole('region', { name: 'Indicadores' });
    expect(within(kpis).getAllByText('—')).toHaveLength(4);
  });

  it('una ruta desconocida dentro de /demo muestra el 404 sin salir del layout', async () => {
    await renderRoute('/demo/no-existe');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Módulo no encontrado');
    expect(sidebar()).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ir al dashboard/ })).toHaveAttribute(
      'href',
      paths.demo.dashboard,
    );
  });

  it('identifica los datos de demostración en el header', async () => {
    await renderRoute(paths.demo.dashboard);
    expect(screen.getByText('Datos de demostración')).toBeInTheDocument();
  });

  it('contraer el sidebar oculta las etiquetas y se recuerda en localStorage', async () => {
    await renderRoute(paths.demo.dashboard);
    fireEvent.click(within(sidebar()).getByRole('button', { name: 'Contraer barra lateral' }));

    expect(useUiStore.getState().sidebarCollapsed).toBe(true);
    expect(within(sidebar()).getByRole('button', { name: 'Expandir barra lateral' })).toBeVisible();
    // La etiqueta sigue disponible para lectores de pantalla.
    expect(within(sidebar()).getByRole('link', { name: 'Equipos' })).toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem(PREFERENCE_KEYS.ui) ?? '{}') as {
      state?: { sidebarCollapsed?: boolean };
    };
    expect(stored.state?.sidebarCollapsed).toBe(true);
  });

  it('el menú móvil navega a un módulo y se cierra', async () => {
    const router = await renderRoute(paths.demo.dashboard);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menú de módulos' }));
    const dialog = await screen.findByRole('dialog');
    fireEvent.click(within(dialog).getByRole('link', { name: 'Calculadora' }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(paths.demo.calculator);
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Calculadora' }, { timeout: 8000 }),
    ).toBeInTheDocument();
  });
});

describe('RouteErrorPage', () => {
  it('muestra el error con reintento y salida segura', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/demo/falla',
          ErrorBoundary: RouteErrorPage,
          Component: () => {
            throw new Error('Fallo simulado');
          },
        },
      ],
      { initialEntries: ['/demo/falla'] },
    );
    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Algo salió mal');
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ir al dashboard' })).toHaveAttribute(
      'href',
      paths.demo.dashboard,
    );
    expect(screen.getByText('Fallo simulado')).toBeInTheDocument();
  });
});
