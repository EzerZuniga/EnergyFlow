import { Download, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';

import { Section, Subsection } from './Section';

export function ControlsSection() {
  const [loading, setLoading] = useState(false);

  return (
    <Section id="controles" title="Controles" description="Botones y campos de formulario.">
      <Subsection title="Botones — variantes">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primario</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="outline">Contorno</Button>
          <Button variant="ghost">Fantasma</Button>
          <Button variant="destructive">
            <Trash2 aria-hidden="true" />
            Eliminar
          </Button>
          <Button variant="link">Enlace</Button>
        </div>
      </Subsection>

      <Subsection title="Botones — tamaños y estados">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Pequeño</Button>
          <Button size="md">Mediano</Button>
          <Button size="lg">
            <Plus aria-hidden="true" />
            Grande
          </Button>
          <Button size="icon" variant="outline" aria-label="Descargar">
            <Download aria-hidden="true" />
          </Button>
          <Button disabled>Deshabilitado</Button>
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true);
              window.setTimeout(() => {
                setLoading(false);
              }, 1500);
            }}
          >
            {loading ? 'Calculando…' : 'Probar estado de carga'}
          </Button>
        </div>
      </Subsection>

      <Subsection title="Campos de formulario">
        <div className="grid gap-5 rounded-xl border border-border bg-surface p-5 sm:grid-cols-2">
          <Field
            label="Nombre del equipo"
            description="Ej.: Aire acondicionado del aula 3."
            required
          >
            <Input placeholder="Nombre del equipo" />
          </Field>
          <Field label="Potencia nominal (W)" required error="La potencia debe ser mayor que 0.">
            <Input type="number" defaultValue={-5} />
          </Field>
          <Field label="Unidad de tiempo">
            <NativeSelect defaultValue="h">
              <option value="s">Segundos (s)</option>
              <option value="min">Minutos (min)</option>
              <option value="h">Horas (h)</option>
            </NativeSelect>
          </Field>
          <Field label="Campo deshabilitado">
            <Input disabled defaultValue="No editable" />
          </Field>
          <Field label="Descripción" className="sm:col-span-2">
            <Textarea placeholder="Notas opcionales sobre el equipo" />
          </Field>
        </div>
      </Subsection>
    </Section>
  );
}
