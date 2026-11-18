import { type ReactNode } from 'react';

import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/utils/cn';

type Tone = 'default' | 'muted' | 'dark';

const tones: Record<Tone, string> = {
  default: 'bg-background',
  muted: 'bg-muted/50',
  dark: 'dark bg-background text-foreground',
};

interface LandingSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: ReactNode;
  badge?: ReactNode;
  tone?: Tone;
  children: ReactNode;
}

export function LandingSection({
  id,
  eyebrow,
  title,
  description,
  badge,
  tone = 'default',
  children,
}: LandingSectionProps) {
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={cn('py-20 sm:py-24', tones[tone])}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6">
        <Reveal className="grid max-w-3xl gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-xs font-medium tracking-widest text-accent uppercase">
              {eyebrow}
            </p>
            {badge}
          </div>
          <h2 id={titleId} className="text-3xl font-semibold sm:text-4xl">
            {title}
          </h2>
          {description && (
            <div className="text-base text-muted-foreground sm:text-lg">{description}</div>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
