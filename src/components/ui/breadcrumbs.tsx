import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react';
import { Link } from 'react-router';

import { cn } from '@/utils/cn';

export interface BreadcrumbItem {
  label: string;
  /** Sin `to`, el elemento es la página actual. */
  to?: string;
}

/** Ruta de navegación jerárquica. El último elemento se marca como página actual. */
export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Ruta de navegación" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${String(index)}`}>
              <li className="inline-flex min-w-0 items-center">
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    className="truncate rounded-sm transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={cn('truncate', isLast && 'font-medium text-foreground')}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="inline-flex">
                  <ChevronRight className="size-3.5" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
