import { CircleAlert, RotateCcw } from 'lucide-react';
import { type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

interface ErrorStateProps {
  title?: string;
  description?: ReactNode;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'No se pudo cargar la información',
  description,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      data-slot="error-state"
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-xl border border-danger/30 bg-danger-soft px-6 py-10 text-center',
        className,
      )}
    >
      <CircleAlert aria-hidden="true" className="size-8 text-danger" />
      <div className="grid max-w-md gap-1">
        <h3 className="text-base font-semibold">{title}</h3>
        {description && <p className="text-sm text-foreground/80">{description}</p>}
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-1">
          <RotateCcw aria-hidden="true" />
          Reintentar
        </Button>
      )}
    </div>
  );
}
