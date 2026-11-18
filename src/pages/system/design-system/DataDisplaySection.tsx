import { Zap } from 'lucide-react';

import { DemoDataBadge, PlaceholderBadge } from '@/components/feedback/DataBadges';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Section, Subsection } from './Section';

/** Valores de la función de referencia P(t) = 100 + 20t (no son mediciones). */
const referenceRows = [0, 0.5, 1, 1.5, 2].map((t) => ({ t, p: 100 + 20 * t }));

export function DataDisplaySection() {
  return (
    <Section id="datos" title="Presentación de datos" description="Insignias, tarjetas y tablas.">
      <Subsection title="Insignias">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Neutral</Badge>
          <Badge variant="info">Trapecio</Badge>
          <Badge variant="accent">Simpson 1/3</Badge>
          <Badge variant="success">Válido</Badge>
          <Badge variant="warning">Pendiente</Badge>
          <Badge variant="danger">Inválido</Badge>
          <Badge variant="outline">Contorno</Badge>
          <DemoDataBadge />
          <PlaceholderBadge />
        </div>
      </Subsection>

      <Subsection title="Tarjetas">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>Energía de ejemplo</CardDescription>
              <CardTitle className="font-mono text-3xl tabular-nums">240.00 Wh</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">∫₀² (100 + 20t) dt</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tarjeta con acciones</CardTitle>
              <CardDescription>Encabezado, contenido y pie.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">Contenido de la tarjeta.</CardContent>
            <CardFooter>
              <Button size="sm">Acción</Button>
              <Button size="sm" variant="ghost">
                Cancelar
              </Button>
            </CardFooter>
          </Card>
          <Card className="dark bg-surface">
            <CardHeader>
              <div className="flex items-center gap-2 text-accent">
                <Zap aria-hidden="true" className="size-4" />
                <CardDescription>Sobre fondo oscuro</CardDescription>
              </div>
              <CardTitle>Superficie forzada a oscuro</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Útil para bloques destacados de la landing.
            </CardContent>
          </Card>
        </div>
      </Subsection>

      <Subsection title="Tabla">
        <Table>
          <TableCaption>Ejemplo con la función de referencia P(t) = 100 + 20t.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>i</TableHead>
              <TableHead numeric>t (h)</TableHead>
              <TableHead numeric>P(t) (W)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referenceRows.map((row, index) => (
              <TableRow key={row.t}>
                <TableCell>{index}</TableCell>
                <TableCell numeric>{row.t.toFixed(2)}</TableCell>
                <TableCell numeric>{row.p.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Subsection>
    </Section>
  );
}
