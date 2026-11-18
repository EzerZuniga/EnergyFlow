import { cn } from '@/utils/cn';

export const overlayClasses =
  'fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-[2px] data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in';

export const overlayContentClasses = cn(
  'fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-5',
  'max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-xl border border-border bg-surface-raised p-6 text-foreground shadow-lg',
  'focus:outline-none data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in',
);
