import { type ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function Section({ id, title, description, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid scroll-mt-24 grid-cols-1 gap-5"
    >
      <div className="grid gap-1">
        <h2 id={`${id}-title`} className="text-xl font-semibold">
          {title}
        </h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function Subsection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {title}
      </h3>
      {children}
    </div>
  );
}
