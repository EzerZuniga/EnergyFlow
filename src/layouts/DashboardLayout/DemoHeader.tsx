import { useNavigation } from 'react-router';

import { DemoDataBadge } from '@/components/feedback/DataBadges';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { ThemeToggle } from '@/components/ui/theme-toggle';

import { DemoMobileNav } from './DemoMobileNav';

export function DemoHeader({ crumbs }: { crumbs: BreadcrumbItem[] }) {
  const navigation = useNavigation();
  const loading = navigation.state !== 'idle';

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex h-16 items-center gap-2 px-4 sm:px-6 lg:px-8">
        <DemoMobileNav />
        <Breadcrumbs items={crumbs} className="min-w-0 flex-1" />
        <DemoDataBadge className="hidden sm:inline-flex" />
        <ThemeToggle />
      </div>
      <div
        role="progressbar"
        aria-label="Cargando módulo"
        aria-hidden={!loading}
        className="absolute inset-x-0 -bottom-px h-0.5 overflow-hidden"
      >
        {loading && <div className="h-full w-2/5 animate-progress rounded-full bg-primary" />}
      </div>
    </header>
  );
}
