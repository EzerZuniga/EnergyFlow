import { CircleHelp, Gauge, Receipt, Spline } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { problem } from '@/content/project';

import { DraftBadge } from '../components/DraftBadge';
import { LandingSection } from '../components/LandingSection';

const contextIcons = [Receipt, Gauge, Spline];

export function ProblemSection() {
  const isDraft = problem.question.draft || problem.context.some((item) => item.draft);

  return (
    <LandingSection
      id="problema"
      tone="muted"
      eyebrow="Problema identificado"
      title="Una potencia que cambia en el tiempo"
      badge={isDraft ? <DraftBadge /> : undefined}
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <ul className="grid gap-4">
          {problem.context.map((item, index) => {
            const Icon = contextIcons[index] ?? Gauge;
            return (
              <li key={item.text}>
                <Reveal
                  delay={index * 80}
                  className="flex h-full gap-4 rounded-xl border border-border bg-surface p-5"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <p className="text-sm leading-relaxed sm:text-base">{item.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={150}>
          <figure className="dark relative overflow-hidden rounded-2xl border border-border bg-background p-7 text-foreground shadow-lg">
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-20 size-56 rounded-full bg-brand-cyan/15 blur-3xl"
            />
            <figcaption className="mb-4 flex items-center gap-2 text-sm font-medium text-accent">
              <CircleHelp aria-hidden="true" className="size-4" />
              Pregunta central
            </figcaption>
            <blockquote className="font-display text-xl leading-snug font-medium sm:text-2xl">
              {problem.question.text}
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </LandingSection>
  );
}
