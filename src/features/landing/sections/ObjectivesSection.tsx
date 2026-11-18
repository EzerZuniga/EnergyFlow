import { Target } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { objectives } from '@/content/project';

import { DraftBadge } from '../components/DraftBadge';
import { LandingSection } from '../components/LandingSection';

export function ObjectivesSection() {
  const isDraft = objectives.general.draft || objectives.specific.some((item) => item.draft);

  return (
    <LandingSection
      id="objetivos"
      eyebrow="Objetivos"
      title="Qué busca el proyecto"
      badge={isDraft ? <DraftBadge /> : undefined}
    >
      <Reveal className="grid gap-3 rounded-2xl border border-primary/30 bg-info-soft p-6 sm:p-8">
        <h3 className="flex items-center gap-2 font-sans text-sm font-semibold text-primary">
          <Target aria-hidden="true" className="size-4" />
          Objetivo general
        </h3>
        <p className="font-display text-xl leading-snug font-medium sm:text-2xl">
          {objectives.general.text}
        </p>
      </Reveal>

      <div className="grid gap-3">
        <h3 className="font-sans text-sm font-semibold text-muted-foreground">
          Objetivos específicos
        </h3>
        <ol className="grid gap-4 md:grid-cols-2">
          {objectives.specific.map((item, index) => (
            <li key={item.text}>
              <Reveal
                delay={(index % 2) * 90}
                className="flex h-full gap-4 rounded-xl border border-border bg-surface p-5"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-sm font-semibold text-accent tabular-nums"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-sm leading-relaxed sm:text-base">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </LandingSection>
  );
}
