import { BarChart3, ClipboardList, type LucideIcon, ShieldCheck, Sigma } from 'lucide-react';
import { type ReactNode } from 'react';

import { Frac, Integral, Var } from '@/components/math/notation';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/reveal';

import { LandingSection } from '../components/LandingSection';

const steps: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: ClipboardList,
    title: 'Registrar mediciones',
    description:
      'Pares (t, P) por equipo, ingresados manualmente o importados desde CSV, con sus unidades.',
  },
  {
    icon: ShieldCheck,
    title: 'Validar los datos',
    description:
      'Tiempos en orden creciente, potencias no negativas y, para Simpson, paso h uniforme y número de subintervalos válido.',
  },
  {
    icon: Sigma,
    title: 'Integrar',
    description:
      'Se aplica el método elegido mostrando la fórmula, la sustitución y el resultado en Wh y kWh.',
  },
  {
    icon: BarChart3,
    title: 'Analizar y reportar',
    description:
      'Comparación entre métodos, gráficas de potencia y energía acumulada, historial y reporte PDF.',
  },
];

const dots = <span aria-label="etcétera">⋯</span>;

const methods: {
  name: string;
  formula: ReactNode;
  condition: string;
  precision: string;
}[] = [
  {
    name: 'Regla del trapecio',
    formula: (
      <>
        E ≈ <Frac num="h" den="2" label="h sobre 2" />[<Var name="P" sub="0" /> + 2(
        <Var name="P" sub="1" /> + {dots} + <Var name="P" sub="n−1" />) + <Var name="P" sub="n" />]
      </>
    ),
    condition: 'n ≥ 1 subintervalos. Admite pasos no uniformes (suma de trapecios individuales).',
    precision: 'Une los puntos con segmentos rectos; es exacta para funciones lineales.',
  },
  {
    name: 'Simpson 1/3',
    formula: (
      <>
        E ≈ <Frac num="h" den="3" label="h sobre 3" />[<Var name="P" sub="0" /> + 4(
        <Var name="P" sub="1" /> + <Var name="P" sub="3" /> + {dots}) + 2(
        <Var name="P" sub="2" /> + <Var name="P" sub="4" /> + {dots}) + <Var name="P" sub="n" />]
      </>
    ),
    condition: 'Número par de subintervalos y paso h uniforme.',
    precision: 'Ajusta parábolas cada dos subintervalos; es exacta hasta polinomios de grado 3.',
  },
  {
    name: 'Simpson 3/8',
    formula: (
      <>
        E ≈ <Frac num="3h" den="8" label="3 h sobre 8" />[<Var name="P" sub="0" /> + 3(
        <Var name="P" sub="1" /> + <Var name="P" sub="2" /> + <Var name="P" sub="4" /> + {dots}) +
        2(
        <Var name="P" sub="3" /> + <Var name="P" sub="6" /> + {dots}) + <Var name="P" sub="n" />]
      </>
    ),
    condition: 'Número de subintervalos múltiplo de 3 y paso h uniforme.',
    precision: 'Ajusta cúbicas cada tres subintervalos; es exacta hasta polinomios de grado 3.',
  },
];

export function MethodologySection() {
  return (
    <LandingSection
      id="metodologia"
      eyebrow="Metodología y solución"
      title="Cómo calcula EnergyFlow la energía"
      description={
        <p>
          Del registro de mediciones al reporte final, cada cálculo verifica primero las condiciones
          matemáticas del método. Si no se cumplen, el sistema lo explica en lugar de mostrar un
          resultado incorrecto.
        </p>
      }
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title}>
            <Reveal
              delay={index * 80}
              className="relative grid h-full content-start gap-3 rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <step.icon aria-hidden="true" className="size-5" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">Paso {index + 1}</span>
              </div>
              <h3 className="text-base font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="grid gap-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-xl font-semibold">Métodos numéricos</h3>
          <p className="font-mono text-sm text-muted-foreground">
            h = (b − a) / n · n = número de subintervalos
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {methods.map((method, index) => (
            <Reveal
              key={method.name}
              delay={index * 90}
              className="grid content-start gap-4 rounded-xl border border-border bg-surface p-6"
            >
              <h4 className="font-display text-lg font-semibold">{method.name}</h4>
              <div className="overflow-x-auto rounded-lg bg-muted px-4 py-4">
                <p className="font-mono text-[13px] leading-loose">{method.formula}</p>
              </div>
              <dl className="grid gap-3 text-sm">
                <div className="grid gap-1">
                  <dt>
                    <Badge variant="info">Condición</Badge>
                  </dt>
                  <dd className="text-muted-foreground">{method.condition}</dd>
                </div>
                <div className="grid gap-1">
                  <dt>
                    <Badge variant="success">Precisión</Badge>
                  </dt>
                  <dd className="text-muted-foreground">{method.precision}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Reveal className="grid content-start gap-3 rounded-xl border border-border bg-surface p-6">
          <h3 className="text-base font-semibold">Unidades</h3>
          <ul className="grid gap-3 text-sm">
            <li className="grid gap-1">
              <span className="text-muted-foreground">Tiempo en horas (h):</span>
              <span className="font-mono">
                E = <Integral /> P(t) dt → Wh
              </span>
            </li>
            <li className="grid gap-1">
              <span className="text-muted-foreground">Tiempo en segundos (s):</span>
              <span className="font-mono">
                E = <Frac num="1" den="3600" label="1 sobre 3600" /> <Integral /> P(t) dt → Wh
              </span>
            </li>
            <li className="text-muted-foreground">1 kWh = 1000 Wh.</li>
          </ul>
        </Reveal>

        <Reveal
          delay={90}
          className="grid content-start gap-3 rounded-xl border border-border bg-surface p-6"
        >
          <h3 className="text-base font-semibold">Ejemplo de verificación</h3>
          <p className="font-mono text-sm">P(t) = 100 + 20t &nbsp;·&nbsp; t ∈ [0, 2] h</p>
          <p className="font-mono text-sm">
            E = <Integral from="0" to="2" /> (100 + 20t) dt = [100t + 10t²]₀² ={' '}
            <strong className="text-accent">240 Wh</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Como P(t) es lineal, los tres métodos reproducen el valor exacto. Las funciones con
            integral conocida sirven para medir el error de cada método.
          </p>
        </Reveal>
      </div>
    </LandingSection>
  );
}
