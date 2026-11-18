import { Reveal } from '@/components/ui/reveal';
import { documents } from '@/content/documents';
import { DocumentCard } from '@/features/documents';

import { LandingSection } from '../components/LandingSection';

export function DocumentsSection() {
  return (
    <LandingSection
      id="documentos"
      tone="muted"
      eyebrow="Documentación"
      title="Documentos académicos"
      description={<p>El informe y la presentación del proyecto, en formato PDF.</p>}
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {documents.map((document, index) => (
          <li key={document.slug}>
            <Reveal delay={index * 90} className="h-full">
              <DocumentCard document={document} />
            </Reveal>
          </li>
        ))}
      </ul>
    </LandingSection>
  );
}
