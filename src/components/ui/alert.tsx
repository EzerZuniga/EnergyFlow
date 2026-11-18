import { CircleAlert, CircleCheck, Info, type LucideIcon, TriangleAlert } from 'lucide-react';
import { type ComponentProps } from 'react';

import { cn } from '@/utils/cn';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

const variants: Record<AlertVariant, { icon: LucideIcon; classes: string }> = {
  info: { icon: Info, classes: 'border-info/30 bg-info-soft [&>svg]:text-info' },
  success: { icon: CircleCheck, classes: 'border-success/30 bg-success-soft [&>svg]:text-success' },
  warning: {
    icon: TriangleAlert,
    classes: 'border-warning/30 bg-warning-soft [&>svg]:text-warning',
  },
  danger: { icon: CircleAlert, classes: 'border-danger/30 bg-danger-soft [&>svg]:text-danger' },
};

interface AlertProps extends ComponentProps<'div'> {
  variant?: AlertVariant;
}

export function Alert({ className, variant = 'info', children, ...props }: AlertProps) {
  const { icon: Icon, classes } = variants[variant];

  return (
    <div
      data-slot="alert"
      role={variant === 'danger' ? 'alert' : 'status'}
      className={cn(
        'grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1 rounded-lg border px-4 py-3 text-sm text-foreground',
        classes,
        className,
      )}
      {...props}
    >
      <Icon aria-hidden="true" className="mt-0.5 size-4" />
      <div className="grid gap-1">{children}</div>
    </div>
  );
}

export function AlertTitle({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p data-slot="alert-title" className={cn('leading-snug font-semibold', className)} {...props} />
  );
}

export function AlertDescription({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn('text-foreground/80 [&_p]:leading-relaxed', className)}
      {...props}
    />
  );
}
