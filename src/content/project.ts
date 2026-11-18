import { type AcademicInfo, type DraftText, type Objectives } from '@/types/content';

export const project = {
  name: 'EnergyFlow',
  slogan: 'La energía también se puede calcular.',
  summary:
    'EnergyFlow estima la energía que consumen los equipos eléctricos integrando su potencia en el tiempo con la regla del trapecio y las reglas de Simpson.',
} as const;

export const academicInfo: AcademicInfo = {
  type: 'Proyecto académico ABR',
  course: 'Cálculo Integral',
  institution: null,
  instructor: null,
  period: null,
};

export const about = {
  intro:
    'EnergyFlow es un proyecto del curso de Cálculo Integral que muestra cómo la integral definida permite pasar de la potencia que consume un equipo —medida en distintos instantes— a la energía total que consumió en un intervalo de tiempo.',
  pillars: [
    {
      title: 'Mediciones de potencia',
      description:
        'Registro de pares (t, P) por equipo, de forma manual o importados desde un archivo CSV.',
    },
    {
      title: 'Integración numérica',
      description:
        'Cálculo de la energía con la regla del trapecio, Simpson 1/3 y Simpson 3/8, mostrando el procedimiento completo.',
    },
    {
      title: 'Análisis y reportes',
      description:
        'Comparación entre métodos, gráficas de potencia y energía acumulada, historial y reportes en PDF.',
    },
  ],
} as const;

export const problem: { context: DraftText[]; question: DraftText } = {
  context: [
    {
      text: 'El consumo de energía eléctrica suele conocerse solo como un total en la factura, sin detalle de qué equipos consumen ni de cómo varía su potencia a lo largo del tiempo.',
      draft: true,
    },
    {
      text: 'La potencia de un equipo rara vez es constante, por lo que multiplicar su potencia nominal por las horas de uso puede producir una estimación imprecisa.',
      draft: true,
    },
    {
      text: 'Cuando solo se dispone de mediciones discretas de potencia, sin una función que describa su comportamiento, la integral no puede resolverse de forma analítica.',
      draft: true,
    },
  ],
  question: {
    text: '¿Cómo estimar con precisión la energía consumida por un equipo a partir de mediciones discretas de su potencia?',
    draft: true,
  },
};

export const objectives: Objectives = {
  general: {
    text: 'Desarrollar una aplicación web que estime la energía consumida por equipos eléctricos a partir de mediciones de potencia, aplicando la integral definida mediante métodos numéricos.',
    draft: true,
  },
  specific: [
    {
      text: 'Modelar el consumo energético como la integral de la potencia respecto del tiempo, E = ∫ P(t) dt.',
      draft: true,
    },
    {
      text: 'Implementar la regla del trapecio y las reglas de Simpson 1/3 y 3/8, validando sus condiciones de aplicación.',
      draft: true,
    },
    {
      text: 'Comparar los resultados de los métodos y, cuando exista una función con integral conocida, cuantificar su error.',
      draft: true,
    },
    {
      text: 'Presentar los resultados con tablas, gráficas, procedimiento paso a paso y reportes descargables.',
      draft: true,
    },
  ],
};

export const justification: { title: string; body: DraftText }[] = [
  {
    title: 'Académica',
    body: {
      text: 'Aplica la integral definida y los métodos numéricos del curso a un problema concreto, conectando la teoría con datos medidos.',
      draft: true,
    },
  },
  {
    title: 'Práctica',
    body: {
      text: 'Conocer cuánta energía consume cada equipo permite identificar los de mayor consumo y orientar decisiones de uso y ahorro.',
      draft: true,
    },
  },
  {
    title: 'Tecnológica',
    body: {
      text: 'Automatiza cálculos repetitivos, valida las condiciones de cada método y presenta los resultados de forma visual y verificable.',
      draft: true,
    },
  },
];
