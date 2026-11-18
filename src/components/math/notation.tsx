import { type ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface FracProps {
  num: ReactNode;
  den: ReactNode;
  label: string;
  className?: string;
}

export function Frac({ num, den, label, className }: FracProps) {
  return (
    <span className={cn('inline-flex align-middle', className)}>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="inline-flex flex-col items-center px-0.5 leading-none">
        <span className="border-b border-current px-0.5 pb-0.5">{num}</span>
        <span className="px-0.5 pt-0.5">{den}</span>
      </span>
    </span>
  );
}

interface IntegralProps {
  from?: ReactNode;
  to?: ReactNode;
  className?: string;
}

export function Integral({ from, to, className }: IntegralProps) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <span className="sr-only">
        integral{from !== undefined && to !== undefined ? ' definida' : ''}
      </span>
      <span aria-hidden="true" className="inline-flex items-center">
        <span className="font-serif text-[1.6em] leading-none italic">∫</span>
        {(from !== undefined || to !== undefined) && (
          <span className="-ml-0.5 inline-flex flex-col justify-between self-stretch text-[0.6em] leading-none">
            <span>{to}</span>
            <span>{from}</span>
          </span>
        )}
      </span>
    </span>
  );
}

export function Var({ name, sub }: { name: string; sub?: ReactNode }) {
  return (
    <span className="italic">
      {name}
      {sub !== undefined && <sub className="text-[0.7em] not-italic">{sub}</sub>}
    </span>
  );
}
