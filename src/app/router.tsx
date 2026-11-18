import { createBrowserRouter, redirect, type RouteObject } from 'react-router';

import { RouteErrorPage } from '@/pages/system/RouteErrorPage';
import { type RouteHandle } from '@/types/navigation';

import { getDemoModule } from './navigation';
import { paths } from './paths';
import { RootLayout } from './RootLayout';
import { RouteLoading } from './RouteLoading';

const moduleHandle = (id: string): RouteHandle => ({ crumb: getDemoModule(id).label });

const devRoutes: RouteObject[] = import.meta.env.DEV
  ? [
      {
        path: paths.designSystem,
        lazy: async () => {
          const { DesignSystemPage } =
            await import('@/pages/system/design-system/DesignSystemPage');
          return { Component: DesignSystemPage };
        },
      },
    ]
  : [];

const landingRoutes: RouteObject = {
  lazy: async () => {
    const { LandingLayout } = await import('@/layouts/LandingLayout/LandingLayout');
    return { Component: LandingLayout };
  },
  children: [
    {
      ErrorBoundary: RouteErrorPage,
      children: [
        {
          path: paths.home,
          lazy: async () => {
            const { HomePage } = await import('@/pages/landing/HomePage');
            return { Component: HomePage };
          },
        },
        {
          path: paths.document,
          lazy: async () => {
            const { DocumentViewerPage } = await import('@/pages/landing/DocumentViewerPage');
            return { Component: DocumentViewerPage };
          },
        },
      ],
    },
  ],
};

const demoRoutes: RouteObject = {
  path: paths.demo.root,
  lazy: async () => {
    const { DashboardLayout } = await import('@/layouts/DashboardLayout/DashboardLayout');
    return { Component: DashboardLayout };
  },
  children: [
    {
      ErrorBoundary: RouteErrorPage,
      children: [
        {
          index: true,
          loader: () => redirect(paths.demo.dashboard),
          Component: RouteLoading,
        },
        {
          path: paths.demo.dashboard,
          handle: moduleHandle('dashboard'),
          lazy: async () => {
            const { DashboardPage } = await import('@/pages/demo/DashboardPage');
            return { Component: DashboardPage };
          },
        },
        {
          path: paths.demo.equipment,
          handle: moduleHandle('equipos'),
          lazy: async () => {
            const { EquipmentPage } = await import('@/pages/demo/EquipmentPage');
            return { Component: EquipmentPage };
          },
        },
        {
          path: paths.demo.measurements,
          handle: moduleHandle('mediciones'),
          lazy: async () => {
            const { MeasurementsPage } = await import('@/pages/demo/MeasurementsPage');
            return { Component: MeasurementsPage };
          },
        },
        {
          path: paths.demo.calculator,
          handle: moduleHandle('calculadora'),
          lazy: async () => {
            const { CalculatorPage } = await import('@/pages/demo/CalculatorPage');
            return { Component: CalculatorPage };
          },
        },
        {
          path: paths.demo.analysis,
          handle: moduleHandle('analisis'),
          lazy: async () => {
            const { AnalysisPage } = await import('@/pages/demo/AnalysisPage');
            return { Component: AnalysisPage };
          },
        },
        {
          path: paths.demo.history,
          handle: moduleHandle('historial'),
          lazy: async () => {
            const { HistoryPage } = await import('@/pages/demo/HistoryPage');
            return { Component: HistoryPage };
          },
        },
        {
          path: paths.demo.reports,
          handle: moduleHandle('reportes'),
          lazy: async () => {
            const { ReportsPage } = await import('@/pages/demo/ReportsPage');
            return { Component: ReportsPage };
          },
        },
        {
          path: '*',
          handle: { crumb: 'No encontrado' } satisfies RouteHandle,
          lazy: async () => {
            const { DemoNotFoundPage } = await import('@/pages/demo/DemoNotFoundPage');
            return { Component: DemoNotFoundPage };
          },
        },
      ],
    },
  ],
};

export const routes: RouteObject[] = [
  {
    Component: RootLayout,
    HydrateFallback: RouteLoading,
    children: [
      landingRoutes,
      demoRoutes,
      ...devRoutes,
      {
        path: '*',
        lazy: async () => {
          const { NotFoundPage } = await import('@/pages/system/NotFoundPage');
          return { Component: NotFoundPage };
        },
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
