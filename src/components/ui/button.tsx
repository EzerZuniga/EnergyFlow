import { Slot } from 'radix-ui';
import { type ComponentProps } from 'react';

import { cn } from '@/utils/cn';

import { type ButtonVariantProps, buttonVariants } from './button-variants';
import { Spinner } from './spinner';

interface ButtonProps extends ComponentProps<'button'>, ButtonVariantProps {
  asChild?: boolean;
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (asChild) {
    return (
      <Slot.Root data-slot="button" className={classes} {...props}>
        {children}
      </Slot.Root>
    );
  }

  return (
    <button
      data-slot="button"
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Spinner label={null} />}
      {children}
    </button>
  );
}
