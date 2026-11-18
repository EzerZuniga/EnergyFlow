import { cn } from '@/utils/cn';

interface PendingTextProps {
  value: string | null;
  fallback?: string;
  className?: string;
}

export function PendingText({ value, fallback = 'Pendiente', className }: PendingTextProps) {
  if (value !== null) return <span className={className}>{value}</span>;

  return (
    <span
      className={cn('text-muted-foreground italic', className)}
      title="Información pendiente de proporcionar por el equipo"
    >
      {fallback}
    </span>
  );
}
