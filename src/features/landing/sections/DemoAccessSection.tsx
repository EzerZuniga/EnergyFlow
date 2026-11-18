import { ArrowRight, FlaskConical } from 'lucide-react';
import { Link } from 'react-router';

import { demoModules } from '@/app/navigation';
import { paths } from '@/app/paths';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';

export function DemoAccessSection() {
  return (
    <section
      id="demo"
      aria-labelledby="demo-title"
      className="dark relative isolate overflow-hidden bg-background py-20 text-foreground sm:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_bottom,black_25%,transparent_70%)]"
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <Reveal className="grid content-start gap-5">
          <p className="font-mono text-xs font-medium tracking-widest text-accent uppercase">
            Demostración
          </p>
          <h2 id="demo-title" className="text-3xl font-semibold sm:text-4xl">
            Explora EnergyFlow en acción
          </h2>
          <p className="text-muted-foreground sm:text-lg">
            Una aplicación independiente para registrar equipos y mediciones, calcular la energía
            con los tres métodos y comparar los resultados.
          </p>
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <FlaskConical aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
            Funciona por completo en tu navegador, sin servidor, con datos de demostración
            claramente identificados.
          </p>
          <div>
            <Button asChild size="lg">
              <Link to={paths.demo.root}>
                Abrir la demo
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <ul className="grid gap-3 sm:grid-cols-2">
          {demoModules.map((module, index) => (
            <li key={module.id} className={index === demoModules.length - 1 ? 'sm:col-span-2' : ''}>
              <Reveal
                delay={(index % 2) * 70}
                className="flex h-full items-center gap-3 rounded-xl border border-border bg-surface/60 p-4"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <module.icon aria-hidden="true" className="size-5" />
                </span>
                <div className="grid">
                  <h3 className="font-sans text-sm font-semibold">{module.label}</h3>
                  <p className="text-xs text-muted-foreground">{module.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
