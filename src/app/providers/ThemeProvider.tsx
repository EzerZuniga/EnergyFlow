import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import {
  type ResolvedTheme,
  ThemeContext,
  type ThemeContextValue,
  type ThemePreference,
} from '@/hooks/useTheme';
import { PREFERENCE_KEYS } from '@/utils/constants';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function readStoredTheme(): ThemePreference {
  try {
    const value = localStorage.getItem(PREFERENCE_KEYS.theme);
    return value === 'light' || value === 'dark' || value === 'system' ? value : 'system';
  } catch {
    return 'system';
  }
}

function systemPrefersDark(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia(DARK_QUERY).matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>(readStoredTheme);
  const [systemDark, setSystemDark] = useState(systemPrefersDark);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;

    const media = window.matchMedia(DARK_QUERY);
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const resolvedTheme: ResolvedTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', resolvedTheme === 'dark');
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const setTheme = useCallback((next: ThemePreference) => {
    setThemeState(next);

    try {
      localStorage.setItem(PREFERENCE_KEYS.theme, next);
    } catch {
      // no-op
    }
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
