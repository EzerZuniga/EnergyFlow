import { DemoModulePage } from './DemoModulePage';

export function AnalysisPage() {
  return (
    <DemoModulePage
      moduleId="analisis"
      description="Comparación de los métodos numéricos sobre una misma serie."
      emptyTitle="No hay cálculos para comparar"
      emptyDescription="El análisis aplica los tres métodos a una misma serie y muestra sus diferencias; cuando la función tiene integral exacta conocida, también su error."
    />
  );
}
