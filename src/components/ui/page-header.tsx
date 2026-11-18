import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface PageHeaderProps {
  title: string;
  description?: ReactNode;
  icon?: LucideIcon;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn('flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between', className)}
    >
      <div className="flex min-w-0 items-start gap-4">
        {Icon && (
          <span className="hidden size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent sm:flex">
            <Icon aria-hidden="true" className="size-5" />
          </span>
        )}
        <div className="grid min-w-0 gap-1">
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground sm:text-base">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  );
}
