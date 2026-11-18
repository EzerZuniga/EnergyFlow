import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { type ComponentProps, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export const TooltipProvider = TooltipPrimitive.Provider;

interface TooltipProps {
  content: ReactNode;
  side?: ComponentProps<typeof TooltipPrimitive.Content>['side'];
  className?: string;
  children: ReactNode;
}

export function Tooltip({ content, side = 'top', className, children }: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          data-slot="tooltip-content"
          side={side}
          sideOffset={6}
          className={cn(
            'z-50 max-w-xs rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background shadow-md',
            'data-[state=closed]:animate-fade-out data-[state=delayed-open]:animate-pop-in',
            className,
          )}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
