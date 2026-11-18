import { NavLink } from 'react-router';

import { demoModuleGroups, type DemoModule } from '@/app/navigation';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/utils/cn';

interface DemoNavProps {
  /** Solo iconos (sidebar contraída): las etiquetas pasan a tooltip y texto para lectores. */
  collapsed?: boolean;
  /** Se ejecuta al elegir un enlace (el menú móvil lo usa para cerrarse). */
  onNavigate?: () => void;
}

function NavItem({ module, collapsed, onNavigate }: { module: DemoModule } & DemoNavProps) {
  const link = (
    <NavLink
      to={module.path}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'group flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors',
          collapsed && 'justify-center px-0',
          isActive
            ? 'bg-primary text-primary-foreground shadow-xs'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )
      }
    >
      <module.icon aria-hidden="true" className="size-[18px] shrink-0" />
      <span className={cn('truncate', collapsed && 'sr-only')}>{module.label}</span>
    </NavLink>
  );

  return collapsed ? (
    <Tooltip content={module.label} side="right">
      {link}
    </Tooltip>
  ) : (
    link
  );
}

/** Navegación de los módulos de la demo, agrupada. Compartida por el sidebar y el menú móvil. */
export function DemoNav({ collapsed = false, onNavigate }: DemoNavProps) {
  return (
    <nav aria-label="Módulos de la demo" className="grid gap-5">
      {demoModuleGroups.map((group) => (
        <div key={group.label} className="grid gap-1">
          <p
            className={cn(
              'px-3 pb-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase',
              collapsed && 'sr-only',
            )}
          >
            {group.label}
          </p>
          <ul className="grid gap-1">
            {group.modules.map((module) => (
              <li key={module.id}>
                <NavItem module={module} collapsed={collapsed} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
