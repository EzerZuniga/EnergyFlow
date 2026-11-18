import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

import { demoModules } from '@/app/navigation';

export function ModuleShortcuts() {
  const modules = demoModules.filter((module) => module.id !== 'dashboard');

  return (
    <section aria-labelledby="modulos-title" className="grid gap-4">
      <h2 id="modulos-title" className="text-lg font-semibold">
        Módulos
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <li key={module.id}>
            <Link
              to={module.path}
              className="group flex h-full items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/40 hover:bg-muted/40"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <module.icon aria-hidden="true" className="size-5" />
              </span>
              <span className="grid min-w-0 flex-1">
                <span className="font-medium">{module.label}</span>
                <span className="truncate text-sm text-muted-foreground">{module.description}</span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
