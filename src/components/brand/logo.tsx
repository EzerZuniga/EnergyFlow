import { type ComponentProps, useId } from 'react';

import { cn } from '@/utils/cn';

export function LogoMark({ className, ...props }: ComponentProps<'svg'>) {
  const gradientId = `ef-gradient-${useId()}`;
  const fill = `url(#${gradientId})`;

  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn('size-8 shrink-0', className)}
      data-slot="logo-mark"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="6"
          y1="25"
          x2="26"
          y2="7"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="var(--color-brand-blue)" />
          <stop offset="1" stopColor="var(--color-brand-cyan)" />
        </linearGradient>
      </defs>
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="7.5"
        fill="var(--color-brand-navy)"
        stroke="var(--color-brand-cyan)"
        strokeOpacity={0.22}
      />
      <path d="M6.5 25V19.8L10.5 17.8V25Z" fill={fill} fillOpacity={0.3} />
      <path d="M11.5 25V17.3L15.5 15.3V25Z" fill={fill} fillOpacity={0.42} />
      <path d="M16.5 25V14.6L20.5 11.2V25Z" fill={fill} fillOpacity={0.54} />
      <path d="M21.5 25V10.4L25.5 7.4V25Z" fill={fill} fillOpacity={0.66} />
      <path
        d="M6 20C9 18.5 13 16.5 16 15S23 9 26 7"
        fill="none"
        stroke={fill}
        strokeWidth={2.25}
        strokeLinecap="round"
      />
    </svg>
  );
}

interface LogoProps extends ComponentProps<'span'> {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { mark: 'size-6', text: 'text-base' },
  md: { mark: 'size-8', text: 'text-lg' },
  lg: { mark: 'size-11', text: 'text-2xl' },
} as const;

export function Logo({ size = 'md', className, ...props }: LogoProps) {
  return (
    <span data-slot="logo" className={cn('inline-flex items-center gap-2.5', className)} {...props}>
      <LogoMark className={sizes[size].mark} />
      <span
        className={cn(
          'font-display font-semibold tracking-tight text-foreground',
          sizes[size].text,
        )}
      >
        Energy<span className="text-primary dark:text-accent">Flow</span>
      </span>
    </span>
  );
}
