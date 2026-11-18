import { useEffect, useState } from 'react';

interface ActiveState {
  scope: string;
  id: string | null;
}

export function useActiveSection(ids: readonly string[], scope = ''): string | null {
  const [state, setState] = useState<ActiveState>({ scope, id: null });
  const key = ids.join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setState({ scope, id: entry.target.id });
        }
      },

      { rootMargin: '-35% 0px -60% 0px' },
    );
    for (const element of elements) observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [key, scope]);

  return state.scope === scope ? state.id : null;
}
