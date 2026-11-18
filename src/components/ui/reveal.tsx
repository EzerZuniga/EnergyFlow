import { type ComponentProps, useRef } from 'react';

import { useInView } from '@/hooks/useInView';
import { cn } from '@/utils/cn';

interface RevealProps extends ComponentProps<'div'> {
  delay?: number;
}

export function Reveal({ delay = 0, className, style, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      data-slot="reveal"
      data-visible={inView}
      style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
      className={cn(
        'transition-[opacity,translate] duration-500 ease-out',
        'data-[visible=false]:translate-y-3 data-[visible=false]:opacity-0',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
