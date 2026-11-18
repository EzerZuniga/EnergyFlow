import { Menu } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { landingSections } from '@/content/site';
import { cn } from '@/utils/cn';

import { sectionHref } from './sectionHref';

interface MobileNavProps {
  activeId: string | null;
  className?: string;
}

export function MobileNav({ activeId, className }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // Mientras el panel está abierto, el scroll de la página está bloqueado. Por eso la
  // navegación se aplaza hasta que el panel termina de cerrarse.
  const pendingHref = useRef<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={className} aria-label="Abrir menú">
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        onCloseAutoFocus={(event) => {
          const href = pendingHref.current;
          if (href === null) return;
          event.preventDefault();
          pendingHref.current = null;
          window.setTimeout(() => {
            void navigate(href);
          }, 0);
        }}
      >
        <div className="grid gap-1">
          <SheetTitle asChild>
            <span>
              <Logo size="sm" />
              <span className="sr-only"> — menú de navegación</span>
            </span>
          </SheetTitle>
          <SheetDescription className="sr-only">Secciones de la página</SheetDescription>
        </div>
        <nav aria-label="Secciones">
          <ul className="grid gap-1">
            {landingSections.map((section) => {
              const href = sectionHref(section.id);
              return (
                <li key={section.id}>
                  <Link
                    to={href}
                    aria-current={activeId === section.id ? 'true' : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      pendingHref.current = href;
                      setOpen(false);
                    }}
                    className={cn(
                      'flex h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                      'aria-current:bg-muted aria-current:text-foreground',
                    )}
                  >
                    {section.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
