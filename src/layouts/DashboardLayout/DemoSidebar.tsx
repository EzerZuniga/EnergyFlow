import { ArrowLeft, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Link } from 'react-router';

import { paths } from '@/app/paths';
import { Logo, LogoMark } from '@/components/brand/logo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { useUiStore } from '@/stores/uiStore';
import { cn } from '@/utils/cn';

import { DemoNav } from './DemoNav';

/** Barra lateral de escritorio (≥ lg). Contraíble a solo iconos; la preferencia se recuerda. */
export function DemoSidebar() {
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const toggleLabel = collapsed ? 'Expandir barra lateral' : 'Contraer barra lateral';

  return (
    <aside
      aria-label="Barra lateral"
      className={cn(
        'sticky top-0 hidden h-dvh flex-col border-r border-border bg-surface transition-[width] duration-200 lg:flex',
        collapsed ? 'w-[4.5rem]' : 'w-64',
      )}
    >
      <div
        className={cn(
          'flex h-16 shrink-0 items-center gap-2 border-b border-border',
          collapsed ? 'justify-center px-2' : 'px-4',
        )}
      >
        <Link
          to={paths.demo.dashboard}
          aria-label="EnergyFlow, ir al dashboard"
          className="rounded-md"
        >
          {collapsed ? <LogoMark /> : <Logo size="sm" />}
        </Link>
        {!collapsed && (
          <Badge variant="accent" className="ml-auto">
            Demo
          </Badge>
        )}
      </div>

      <div className={cn('flex-1 overflow-y-auto py-5', collapsed ? 'px-2' : 'px-3')}>
        <DemoNav collapsed={collapsed} />
      </div>

      <div className={cn('grid gap-1 border-t border-border py-3', collapsed ? 'px-2' : 'px-3')}>
        <Tooltip content="Volver al portal" side="right">
          <Button
            asChild
            variant="ghost"
            className={cn(
              'justify-start text-muted-foreground',
              collapsed && 'justify-center px-0',
            )}
          >
            <Link to={paths.home}>
              <ArrowLeft aria-hidden="true" />
              <span className={cn(collapsed && 'sr-only')}>Volver al portal</span>
            </Link>
          </Button>
        </Tooltip>
        <Tooltip content={toggleLabel} side="right">
          <Button
            variant="ghost"
            onClick={toggleSidebar}
            aria-label={toggleLabel}
            className={cn(
              'justify-start text-muted-foreground',
              collapsed && 'justify-center px-0',
            )}
          >
            {collapsed ? (
              <PanelLeftOpen aria-hidden="true" />
            ) : (
              <PanelLeftClose aria-hidden="true" />
            )}
            {!collapsed && <span>Contraer</span>}
          </Button>
        </Tooltip>
      </div>
    </aside>
  );
}
