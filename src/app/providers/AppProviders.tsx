import { type ReactNode } from 'react';

import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import { ThemeProvider } from './ThemeProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={300}>
        {children}
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}
