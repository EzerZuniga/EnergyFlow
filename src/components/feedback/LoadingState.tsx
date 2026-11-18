import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/utils/cn';

interface LoadingStateProps {
  label?: string;
  className?: string;
}

export function LoadingState({ label = 'Cargando…', className }: LoadingStateProps) {
  return (
    <div
      data-slot="loading-state"
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-center justify-center gap-2.5 py-12 text-sm text-muted-foreground',
        className,
      )}
    >
      <Spinner label={null} className="size-5 text-primary" />
      <span>{label}</span>
    </div>
  );
}
