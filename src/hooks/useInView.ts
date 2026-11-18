import { type RefObject, useEffect, useState } from 'react';

interface Options {
  rootMargin?: string;
  threshold?: number;
}

export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { rootMargin = '0px 0px -10% 0px', threshold = 0.1 }: Options = {},
): boolean {
  const supported = typeof IntersectionObserver !== 'undefined';
  const [inView, setInView] = useState(!supported);

  useEffect(() => {
    const element = ref.current;
    if (!supported || !element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin, threshold, supported]);

  return inView;
}
