import { X } from 'lucide-react';
import { Dialog as SheetPrimitive } from 'radix-ui';
import { type ComponentProps } from 'react';

import { cn } from '@/utils/cn';

import { overlayClasses } from './overlay-classes';

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;

const sides = {
  right:
    'right-0 border-l data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in',
  left: 'left-0 border-r data-[state=closed]:animate-sheet-out-left data-[state=open]:animate-sheet-in-left',
} as const;

interface SheetContentProps extends ComponentProps<typeof SheetPrimitive.Content> {
  side?: keyof typeof sides;
}

export function SheetContent({ className, children, side = 'right', ...props }: SheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay data-slot="sheet-overlay" className={overlayClasses} />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          'fixed inset-y-0 z-50 flex w-[85%] max-w-sm flex-col gap-6 border-border bg-surface-raised p-6 text-foreground shadow-lg focus:outline-none',
          sides[side],
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          className="absolute top-5 right-5 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Cerrar"
        >
          <X aria-hidden="true" className="size-5" />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

export function SheetTitle({ className, ...props }: ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-base font-semibold', className)}
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}
