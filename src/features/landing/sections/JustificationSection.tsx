import { Cpu, GraduationCap, Lightbulb, type LucideIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { justification } from '@/content/project';

import { DraftBadge } from '../components/DraftBadge';
import { LandingSection } from '../components/LandingSection';

const icons: LucideIcon[] = [GraduationCap, Lightbulb, Cpu];

export function JustificationSection() {
  const isDraft = justification.some((item) => item.body.draft);

  return (
    <LandingSection
      id="justificacion"
      tone="muted"
      eyebrow="Justificación"
      title="Por qué es relevante"
      badge={isDraft ? <DraftBadge /> : undefined}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {justification.map((item, index) => {
          const Icon = icons[index] ?? Lightbulb;
          return (
            <Reveal
              key={item.title}
              delay={index * 90}
              className="grid content-start gap-3 rounded-xl border border-border bg-surface p-6"
            >
              <Icon aria-hidden="true" className="size-6 text-primary" />
              <h3 className="text-lg font-semibold">Relevancia {item.title.toLowerCase()}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.body.text}</p>
            </Reveal>
          );
        })}
      </div>
    </LandingSection>
  );
}
