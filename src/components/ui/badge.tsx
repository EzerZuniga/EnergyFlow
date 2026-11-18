import { type ComponentProps } from 'react';

import { cn } from '@/utils/cn';

import { type BadgeVariantProps, badgeVariants } from './badge-variants';

export function Badge({
  className,
  variant,
  ...props
}: ComponentProps<'span'> & BadgeVariantProps) {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
