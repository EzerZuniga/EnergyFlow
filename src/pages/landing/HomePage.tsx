import {
  AboutSection,
  DemoAccessSection,
  DocumentsSection,
  HeroSection,
  JustificationSection,
  MethodologySection,
  ObjectivesSection,
  ProblemSection,
  TeamSection,
} from '@/features/landing';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

/** Landing académica: compone las secciones en el orden de la navegación. */
export function HomePage() {
  useDocumentTitle();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProblemSection />
      <ObjectivesSection />
      <JustificationSection />
      <MethodologySection />
      <DocumentsSection />
      <TeamSection />
      <DemoAccessSection />
    </>
  );
}
