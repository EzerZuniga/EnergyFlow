import { CircleAlert } from 'lucide-react';
import { Slot } from 'radix-ui';
import { type ReactElement, type ReactNode, useId } from 'react';

import { cn } from '@/utils/cn';

import { Label } from './label';

interface FieldProps {
  label: ReactNode;
  description?: ReactNode;
  error?: string | undefined;
  required?: boolean;
  id?: string;
  className?: string;
  children: ReactElement;
}

export function Field({
  label,
  description,
  error,
  required = false,
  id: idProp,
  className,
  children,
}: FieldProps) {
  const autoId = useId();
  const id = idProp ?? `field-${autoId}`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const describedBy =
    [description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(' ') ||
    undefined;

  return (
    <div data-slot="field" className={cn('grid gap-2', className)}>
      <Label htmlFor={id}>
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-danger">
            *
          </span>
        )}
      </Label>
      <Slot.Root
        id={id}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
      >
        {children}
      </Slot.Root>
      {description && (
        <p id={descriptionId} className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} className="flex items-start gap-1.5 text-xs font-medium text-danger">
          <CircleAlert aria-hidden="true" className="mt-px size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
