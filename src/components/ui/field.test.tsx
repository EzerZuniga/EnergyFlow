import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Field } from './field';
import { Input } from './input';
import { NativeSelect } from './native-select';

describe('Field', () => {
  it('asocia la etiqueta al control', () => {
    render(
      <Field label="Nombre del equipo">
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText('Nombre del equipo')).toBeInstanceOf(HTMLInputElement);
  });

  it('conecta la descripción mediante aria-describedby', () => {
    render(
      <Field label="Potencia" description="En vatios (W).">
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText('Potencia')).toHaveAccessibleDescription('En vatios (W).');
  });

  it('marca el control como inválido y describe el error', () => {
    render(
      <Field label="Potencia" description="En vatios (W)." error="Debe ser mayor que 0.">
        <Input />
      </Field>,
    );
    const input = screen.getByLabelText('Potencia');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('En vatios (W). Debe ser mayor que 0.');
  });

  it('sin error no añade aria-invalid', () => {
    render(
      <Field label="Potencia">
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText('Potencia')).not.toHaveAttribute('aria-invalid');
  });

  it('marca los campos obligatorios', () => {
    render(
      <Field label="Nombre" required>
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText(/Nombre/)).toHaveAttribute('aria-required', 'true');
  });

  it('funciona con NativeSelect (los atributos llegan al <select>)', () => {
    render(
      <Field label="Unidad de tiempo" error="Selecciona una unidad.">
        <NativeSelect>
          <option value="h">Horas</option>
        </NativeSelect>
      </Field>,
    );
    const select = screen.getByLabelText('Unidad de tiempo');
    expect(select).toBeInstanceOf(HTMLSelectElement);
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });
});
