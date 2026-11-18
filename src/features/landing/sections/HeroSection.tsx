import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

import { paths } from '@/app/paths';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { academicInfo, project } from '@/content/project';

import { HeroIllustration } from '../components/HeroIllustration';

const facts = [
  { value: '3', label: 'métodos numéricos' },
  { value: '∫ P(t) dt', label: 'modelo de energía' },
  { value: 'Wh · kWh', label: 'resultados con unidades' },
];

export function HeroSection() {
  const words = project.slogan.split(' ');
  const lastWord = words.pop() ?? '';

  return (
    <section
      id="inicio"
      aria-labelledby="inicio-title"
      className="dark relative isolate overflow-hidden bg-background text-foreground"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-48 left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-28">
        <div className="grid gap-7">
          <Badge variant="accent" className="px-3 py-1">
            {academicInfo.type} · {academicInfo.course}
          </Badge>

          <h1
            id="inicio-title"
            className="text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl"
          >
            {words.join(' ')}{' '}
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              {lastWord}
            </span>
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground">{project.summary}</p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to={paths.demo.root}>
                Explorar la demo
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="#proyecto">
                Conocer el proyecto
                <ArrowDown aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <dl className="grid grid-cols-3 gap-4 border-t border-border pt-6">
            {facts.map((fact) => (
              <div key={fact.label} className="grid gap-1">
                <dt className="order-2 text-xs text-muted-foreground sm:text-sm">{fact.label}</dt>
                <dd className="order-1 font-mono text-base font-medium text-accent sm:text-lg">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroIllustration />
      </div>
    </section>
  );
}
