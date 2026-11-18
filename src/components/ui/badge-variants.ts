import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  [
    'inline-flex w-fit shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3",
  ],
  {
    variants: {
      variant: {
        neutral: 'bg-muted text-muted-foreground',
        info: 'bg-info-soft text-info',
        accent: 'bg-accent-soft text-accent',
        success: 'bg-success-soft text-success',
        warning: 'bg-warning-soft text-warning',
        danger: 'bg-danger-soft text-danger',
        outline: 'border border-border text-foreground',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
