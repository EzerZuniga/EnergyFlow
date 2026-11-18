import {
  Activity,
  BarChart3,
  Calculator,
  FileText,
  Gauge,
  History,
  LayoutDashboard,
  type LucideIcon,
  Plug,
  Sigma,
  Zap,
} from 'lucide-react';

import { Logo, LogoMark } from '@/components/brand/logo';

import { Section, Subsection } from './Section';

const brandColors = [
  { name: 'Navy', token: 'brand-navy', hex: '#071426', className: 'bg-brand-navy' },
  { name: 'Dark Blue', token: 'brand-deep', hex: '#0B2342', className: 'bg-brand-deep' },
  { name: 'Electric Blue', token: 'brand-blue', hex: '#1677FF', className: 'bg-brand-blue' },
  { name: 'Cyan', token: 'brand-cyan', hex: '#16C8E8', className: 'bg-brand-cyan' },
  { name: 'White', token: 'brand-white', hex: '#F5F8FC', className: 'bg-brand-white' },
];

const semanticColors = [
  ['background', 'bg-background'],
  ['surface', 'bg-surface'],
  ['muted', 'bg-muted'],
  ['border', 'bg-border'],
  ['primary', 'bg-primary'],
  ['accent', 'bg-accent'],
  ['success', 'bg-success'],
  ['warning', 'bg-warning'],
  ['danger', 'bg-danger'],
  ['info', 'bg-info'],
] as const;

const icons: [LucideIcon, string][] = [
  [LayoutDashboard, 'Dashboard'],
  [Plug, 'Equipos'],
  [Activity, 'Mediciones'],
  [Calculator, 'Calculadora'],
  [BarChart3, 'Análisis'],
  [History, 'Historial'],
  [FileText, 'Reportes'],
  [Sigma, 'Integral'],
  [Zap, 'Energía'],
  [Gauge, 'Potencia'],
];

export function FoundationsSection() {
  return (
    <Section
      id="fundamentos"
      title="Fundamentos"
      description="Identidad, color, tipografía e iconografía."
    >
      <Subsection title="Logotipo">
        <div className="flex flex-wrap items-center gap-6">
          <Logo size="lg" />
          <Logo size="md" />
          <Logo size="sm" />
          <LogoMark className="size-16" />
          <div className="dark rounded-lg bg-background p-4">
            <Logo size="md" />
          </div>
        </div>
      </Subsection>

      <Subsection title="Paleta de marca">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {brandColors.map((color) => (
            <div key={color.token} className="overflow-hidden rounded-lg border border-border">
              <div className={`h-16 ${color.className}`} />
              <div className="bg-surface px-3 py-2 text-xs">
                <p className="font-medium">{color.name}</p>
                <p className="font-mono text-muted-foreground">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="Tokens semánticos (cambian con el tema)">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {semanticColors.map(([name, className]) => (
            <div key={name} className="flex items-center gap-2 text-xs">
              <span className={`size-8 shrink-0 rounded-md border border-border ${className}`} />
              <span className="font-mono">{name}</span>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="Tipografía">
        <div className="grid gap-3 rounded-xl border border-border bg-surface p-5">
          <p className="font-display text-4xl font-semibold tracking-tight">
            La energía también se puede calcular
          </p>
          <p className="font-display text-2xl font-semibold">Space Grotesk — títulos</p>
          <p className="max-w-prose text-base">
            Inter — texto de interfaz y lectura. EnergyFlow integra la potencia medida en el tiempo
            para obtener la energía consumida mediante métodos numéricos.
          </p>
          <p className="font-mono text-sm tabular-nums">
            JetBrains Mono — cifras y fórmulas: E = ∫ P(t) dt = 240.000 Wh
          </p>
        </div>
      </Subsection>

      <Subsection title="Iconografía (Lucide)">
        <ul className="flex flex-wrap gap-4">
          {icons.map(([Icon, label]) => (
            <li
              key={label}
              className="flex w-24 flex-col items-center gap-2 rounded-lg border border-border bg-surface p-3 text-xs"
            >
              <Icon aria-hidden="true" className="size-5 text-primary" />
              {label}
            </li>
          ))}
        </ul>
      </Subsection>
    </Section>
  );
}
