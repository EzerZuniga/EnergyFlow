import { ArrowLeft, Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { paths } from '@/app/paths';
import { Logo } from '@/components/brand/logo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { DemoNav } from './DemoNav';

/** Menú de módulos para pantallas pequeñas (< lg), en un panel lateral izquierdo. */
export function DemoMobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Abrir menú de módulos"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="gap-5">
        <div className="flex items-center gap-2 pr-8">
          <SheetTitle asChild>
            <span>
              <Logo size="sm" />
              <span className="sr-only"> — módulos de la demo</span>
            </span>
          </SheetTitle>
          <Badge variant="accent">Demo</Badge>
          <SheetDescription className="sr-only">Navegación entre los módulos</SheetDescription>
        </div>
        <div className="flex-1 overflow-y-auto">
          <DemoNav onNavigate={close} />
        </div>
        <Button asChild variant="outline" className="justify-start">
          <Link to={paths.home} onClick={close}>
            <ArrowLeft aria-hidden="true" />
            Volver al portal
          </Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
