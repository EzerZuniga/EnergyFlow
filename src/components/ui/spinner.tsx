import { LoaderCircle } from 'lucide-react';
import { type ComponentProps } from 'react';

import { cn } from '@/utils/cn';

interface SpinnerProps extends ComponentProps<'svg'> {
  label?: string | null;
}

export function Spinner({ className, label = 'Cargando', ...props }: SpinnerProps) {
  return (
    <>
      <LoaderCircle
        aria-hidden="true"
        className={cn('size-4 animate-spin', className)}
        data-slot="spinner"
        {...props}
      />
      {label !== null && <span className="sr-only">{label}</span>}
    </>
  );
}
