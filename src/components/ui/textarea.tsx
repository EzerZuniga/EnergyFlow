import { type ComponentProps } from 'react';

import { cn } from '@/utils/cn';

import { controlClasses } from './control-classes';

export function Textarea({ className, rows = 3, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      rows={rows}
      className={cn(controlClasses, 'min-h-20 resize-y px-3 py-2', className)}
      {...props}
    />
  );
}
