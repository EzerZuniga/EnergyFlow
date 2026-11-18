export const paths = {
  home: '/',
  document: '/documentos/:slug',
  designSystem: '/design-system',
  demo: {
    root: '/demo',
    dashboard: '/demo/dashboard',
    equipment: '/demo/equipos',
    measurements: '/demo/mediciones',
    calculator: '/demo/calculadora',
    analysis: '/demo/analisis',
    history: '/demo/historial',
    reports: '/demo/reportes',
  },
} as const;

export function documentPath(slug: string): string {
  return `/documentos/${encodeURIComponent(slug)}`;
}
