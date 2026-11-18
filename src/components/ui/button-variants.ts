import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap',
    'transition-[background-color,border-color,color,box-shadow] duration-150',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:pointer-events-none disabled:opacity-50 aria-busy:cursor-progress',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover',
        secondary: 'bg-muted text-foreground hover:bg-muted/70',
        outline:
          'border border-border bg-surface text-foreground shadow-xs hover:border-input hover:bg-muted',
        ghost: 'text-foreground hover:bg-muted',
        destructive: 'bg-danger text-danger-foreground shadow-xs hover:bg-danger-hover',
        link: 'h-auto px-0 text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'size-10',
        'icon-sm': 'size-8',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
