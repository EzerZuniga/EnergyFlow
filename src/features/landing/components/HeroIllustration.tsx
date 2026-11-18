import { Badge } from '@/components/ui/badge';
import { Integral } from '@/components/math/notation';

const VIEW = { width: 480, height: 280 };
const PLOT = { left: 40, right: 456, top: 28, bottom: 240 };
const SLICES = 8;

function profile(u: number): number {
  return (
    0.4 + 0.16 * Math.sin(2 * Math.PI * 1.1 * u - 1.2) + 0.3 * Math.exp(-(((u - 0.62) / 0.13) ** 2))
  );
}

const toX = (u: number) => PLOT.left + u * (PLOT.right - PLOT.left);
const toY = (p: number) => PLOT.bottom - p * (PLOT.bottom - PLOT.top);

const curvePath = Array.from({ length: 121 }, (_, i) => {
  const u = i / 120;
  return `${i === 0 ? 'M' : 'L'}${toX(u).toFixed(1)} ${toY(profile(u)).toFixed(1)}`;
}).join(' ');

const nodes = Array.from({ length: SLICES + 1 }, (_, i) => {
  const u = i / SLICES;
  return { x: toX(u), y: toY(profile(u)) };
});

const slices = nodes.slice(0, -1).map((start, i) => {
  const end = nodes[i + 1] ?? start;
  return `M${start.x} ${PLOT.bottom} L${start.x} ${start.y} L${end.x} ${end.y} L${end.x} ${PLOT.bottom} Z`;
});

export function HeroIllustration() {
  return (
    <figure className="relative rounded-2xl border border-border bg-surface/70 p-4 shadow-lg backdrop-blur sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <figcaption className="text-sm font-medium">Área bajo la curva de potencia</figcaption>
        <Badge variant="outline">Ilustración</Badge>
      </div>

      <svg
        viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
        role="img"
        aria-label="Curva de potencia P(t) cuya área, aproximada con ocho trapecios, representa la energía consumida."
        className="w-full"
      >
        <defs>
          <linearGradient id="hero-slice" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="var(--color-brand-blue)" stopOpacity="0.05" />
            <stop offset="1" stopColor="var(--color-brand-cyan)" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="hero-curve" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--color-brand-blue)" />
            <stop offset="1" stopColor="var(--color-brand-cyan)" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((p) => (
          <line
            key={p}
            x1={PLOT.left}
            x2={PLOT.right}
            y1={toY(p)}
            y2={toY(p)}
            stroke="var(--color-border)"
            strokeDasharray="3 5"
          />
        ))}

        {slices.map((d, i) => (
          <path
            key={d}
            d={d}
            fill="url(#hero-slice)"
            stroke="var(--color-brand-cyan)"
            strokeOpacity="0.35"
            className="origin-bottom animate-bar-rise [transform-box:fill-box]"
            style={{ animationDelay: `${200 + i * 70}ms` }}
          />
        ))}

        <path
          d={curvePath}
          fill="none"
          stroke="url(#hero-curve)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          className="animate-draw"
        />

        {nodes.map((node) => (
          <circle
            key={node.x}
            cx={node.x}
            cy={node.y}
            r="3.5"
            fill="var(--color-background)"
            stroke="var(--color-brand-cyan)"
            strokeWidth="2"
          />
        ))}

        <line
          x1={PLOT.left}
          x2={PLOT.right}
          y1={PLOT.bottom}
          y2={PLOT.bottom}
          stroke="var(--color-muted-foreground)"
        />
        <line
          x1={PLOT.left}
          x2={PLOT.left}
          y1={PLOT.top - 8}
          y2={PLOT.bottom}
          stroke="var(--color-muted-foreground)"
        />
        <text
          x={PLOT.right}
          y={PLOT.bottom + 22}
          textAnchor="end"
          className="fill-muted-foreground font-mono text-[12px]"
        >
          t
        </text>
        <text
          x={PLOT.left - 8}
          y={PLOT.top - 12}
          className="fill-muted-foreground font-mono text-[12px]"
        >
          P(t)
        </text>
      </svg>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
        <p className="font-mono text-sm">
          E = <Integral from="a" to="b" /> P(t) dt
        </p>
        <p className="text-xs text-muted-foreground">≈ suma de las áreas de {SLICES} trapecios</p>
      </div>
    </figure>
  );
}
