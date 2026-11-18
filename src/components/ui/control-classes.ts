import { cn } from '@/utils/cn';

export const controlClasses = cn(
  'w-full min-w-0 rounded-md border border-input bg-surface text-sm text-foreground shadow-xs',
  'transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground',
  'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25 focus-visible:outline-none',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'aria-invalid:border-danger aria-invalid:focus-visible:ring-danger/25',
);
