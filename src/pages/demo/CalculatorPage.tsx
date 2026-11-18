import { DemoModulePage } from './DemoModulePage';

export function CalculatorPage() {
  return (
    <DemoModulePage
      moduleId="calculadora"
      description="Energía consumida, E = ∫ P(t) dt, calculada con métodos numéricos."
      emptyTitle="No hay mediciones para calcular"
      emptyDescription="El cálculo parte de una serie de mediciones: se elige el método (trapecio, Simpson 1/3 o Simpson 3/8) y se obtiene la energía con su procedimiento paso a paso."
    />
  );
}
