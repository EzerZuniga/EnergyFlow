import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/hooks/useTheme';

import { Button } from './button';
import { Tooltip } from './tooltip';

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const label = isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';

  return (
    <Tooltip content={label}>
      <Button
        variant="ghost"
        size="icon"
        className={className}
        aria-label={label}
        onClick={() => {
          setTheme(isDark ? 'light' : 'dark');
        }}
      >
        {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      </Button>
    </Tooltip>
  );
}
