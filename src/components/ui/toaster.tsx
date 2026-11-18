import { Toaster as Sonner } from 'sonner';

import { useTheme } from '@/hooks/useTheme';

export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme}
      position="top-right"
      closeButton
      duration={4500}
      containerAriaLabel="Notificaciones"
      toastOptions={{
        classNames: {
          toast:
            'rounded-lg! border! border-border! bg-surface-raised! text-foreground! shadow-lg! font-sans!',
          title: 'font-semibold!',
          description: 'text-muted-foreground!',
          success: '[&_[data-icon]]:text-success!',
          error: '[&_[data-icon]]:text-danger!',
          warning: '[&_[data-icon]]:text-warning!',
          info: '[&_[data-icon]]:text-info!',
          closeButton: 'border-border! bg-surface-raised! text-muted-foreground!',
        },
      }}
    />
  );
}
