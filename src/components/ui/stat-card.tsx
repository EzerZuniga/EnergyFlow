import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface StatCardProps {
  label: string;
  value: ReactNode | null;
  unit?: string;
  hint?: ReactNode;
  icon: LucideIcon;
  className?: string;
}

export function StatCard({ label, value, unit, hint, icon: Icon, className }: StatCardProps) {
  const empty = value === null;

  return (
    <article
      data-slot="stat-card"
      className={cn(
        'grid gap-3 rounded-xl border border-border bg-surface p-5 shadow-xs',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-sans text-sm font-medium text-muted-foreground">{label}</h3>
        <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon aria-hidden="true" className="size-4" />
        </span>
      </div>
      <p className="flex items-baseline gap-1.5">
        <span
          className={cn(
            'font-mono text-3xl font-semibold tabular-nums',
            empty && 'text-muted-foreground',
          )}
        >
          {empty ? '—' : value}
        </span>
        {!empty && unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        {empty && <span className="sr-only">Sin datos</span>}
      </p>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </article>
  );
}
