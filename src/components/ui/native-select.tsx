import { ChevronDown } from 'lucide-react';
import { type ComponentProps } from 'react';

import { cn } from '@/utils/cn';

import { controlClasses } from './control-classes';

export function NativeSelect({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <div className="relative" data-slot="native-select">
      <select
        className={cn(
          controlClasses,
          'h-10 cursor-pointer appearance-none py-2 pr-9 pl-3',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}
