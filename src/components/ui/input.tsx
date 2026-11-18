import { type ComponentProps } from 'react';

import { cn } from '@/utils/cn';

import { controlClasses } from './control-classes';

export function Input({ className, type = 'text', ...props }: ComponentProps<'input'>) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        controlClasses,
        'h-10 px-3 py-2',
        'file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        type === 'number' && 'font-mono tabular-nums',
        className,
      )}
      {...props}
    />
  );
}
