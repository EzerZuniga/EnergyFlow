import { DemoModulePage } from './DemoModulePage';

export function MeasurementsPage() {
  return (
    <DemoModulePage
      moduleId="mediciones"
      description="Series de mediciones de potencia en el tiempo, P(t), de cada equipo."
      emptyTitle="Aún no hay series de mediciones"
      emptyDescription="Una serie es un conjunto ordenado de pares (t, P): el instante y la potencia medida en él. Es la unidad que se integra para obtener la energía."
    />
  );
}
