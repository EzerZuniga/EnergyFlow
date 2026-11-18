import { Activity, BarChart3, type LucideIcon, Sigma } from 'lucide-react';

import { PendingText } from '@/components/feedback/PendingText';
import { Integral } from '@/components/math/notation';
import { Reveal } from '@/components/ui/reveal';
import { about, academicInfo } from '@/content/project';

import { LandingSection } from '../components/LandingSection';

const pillarIcons: LucideIcon[] = [Activity, Sigma, BarChart3];

export function AboutSection() {
  const academicRows = [
    { label: 'Tipo', value: academicInfo.type },
    { label: 'Curso', value: academicInfo.course },
    { label: 'Institución', value: academicInfo.institution },
    { label: 'Docente', value: academicInfo.instructor },
    { label: 'Periodo', value: academicInfo.period },
  ];

  return (
    <LandingSection
      id="proyecto"
      eyebrow="El proyecto"
      title="Del dato medido a la energía consumida"
      description={<p>{about.intro}</p>}
    >
      <Reveal className="grid items-center gap-6 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8 lg:grid-cols-[auto_1fr]">
        <p className="text-center font-mono text-3xl sm:text-4xl lg:pr-8">
          E = <Integral from="a" to="b" /> P(t) dt
        </p>
        <div className="grid gap-2 border-border lg:border-l lg:pl-8">
          <p className="font-medium">La energía es el área bajo la curva de potencia.</p>
          <p className="text-sm text-muted-foreground">
            Con la potencia P en vatios (W) y el tiempo t en horas (h), la integral da la energía E
            en vatios-hora (Wh). Como las mediciones son puntos aislados, el área se aproxima con
            métodos numéricos.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {about.pillars.map((pillar, index) => {
          const Icon = pillarIcons[index] ?? Activity;
          return (
            <Reveal
              key={pillar.title}
              delay={index * 90}
              className="grid content-start gap-3 rounded-xl border border-border bg-surface p-6"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground">{pillar.description}</p>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-dashed border-border p-6 sm:grid-cols-3 lg:grid-cols-5">
          {academicRows.map((row) => (
            <div key={row.label} className="grid gap-1">
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {row.label}
              </dt>
              <dd className="text-sm font-medium">
                <PendingText value={row.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </LandingSection>
  );
}
