import {
  Activity,
  BarChart3,
  Calculator,
  FileText,
  History,
  LayoutDashboard,
  type LucideIcon,
  Plug,
} from 'lucide-react';

import { paths } from './paths';

export interface DemoModule {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  description: string;
}

export interface DemoModuleGroup {
  label: string;
  modules: DemoModule[];
}

export const demoModuleGroups: DemoModuleGroup[] = [
  {
    label: 'General',
    modules: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        path: paths.demo.dashboard,
        icon: LayoutDashboard,
        description: 'Indicadores y resumen del consumo',
      },
    ],
  },
  {
    label: 'Datos',
    modules: [
      {
        id: 'equipos',
        label: 'Equipos',
        path: paths.demo.equipment,
        icon: Plug,
        description: 'Registro y gestión de equipos',
      },
      {
        id: 'mediciones',
        label: 'Mediciones',
        path: paths.demo.measurements,
        icon: Activity,
        description: 'Series P(t) manuales o desde CSV',
      },
    ],
  },
  {
    label: 'Cálculo',
    modules: [
      {
        id: 'calculadora',
        label: 'Calculadora',
        path: paths.demo.calculator,
        icon: Calculator,
        description: 'Integración numérica paso a paso',
      },
      {
        id: 'analisis',
        label: 'Análisis',
        path: paths.demo.analysis,
        icon: BarChart3,
        description: 'Comparación de métodos y errores',
      },
    ],
  },
  {
    label: 'Resultados',
    modules: [
      {
        id: 'historial',
        label: 'Historial',
        path: paths.demo.history,
        icon: History,
        description: 'Cálculos guardados',
      },
      {
        id: 'reportes',
        label: 'Reportes',
        path: paths.demo.reports,
        icon: FileText,
        description: 'Exportación a PDF',
      },
    ],
  },
];

export const demoModules: DemoModule[] = demoModuleGroups.flatMap((group) => group.modules);

export function getDemoModule(id: string): DemoModule {
  const module = demoModules.find((item) => item.id === id);
  if (!module) throw new Error(`Módulo de demo desconocido: "${id}"`);
  return module;
}
