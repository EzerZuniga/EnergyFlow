import { Link } from 'react-router';

import { Logo } from '@/components/brand/logo';
import { PendingText } from '@/components/feedback/PendingText';
import { academicInfo, project } from '@/content/project';
import { landingSections } from '@/content/site';

import { sectionHref } from './sectionHref';

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="dark border-t border-border bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="grid content-start gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">{project.slogan}</p>
        </div>

        <nav aria-label="Secciones del sitio" className="grid content-start gap-3">
          <h2 className="font-sans text-sm font-semibold">Secciones</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {landingSections.map((section) => (
              <li key={section.id}>
                <Link
                  to={sectionHref(section.id)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid content-start gap-3">
          <h2 className="font-sans text-sm font-semibold">Información académica</h2>
          <dl className="grid gap-2 text-sm">
            <div>
              <dt className="text-muted-foreground">Curso</dt>
              <dd>{academicInfo.course}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Institución</dt>
              <dd>
                <PendingText value={academicInfo.institution} />
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Periodo</dt>
              <dd>
                <PendingText value={academicInfo.period} />
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {year} {project.name} · {academicInfo.type} del curso de {academicInfo.course}.
          </p>
          <p>Código abierto bajo licencia MIT.</p>
        </div>
      </div>
    </footer>
  );
}
