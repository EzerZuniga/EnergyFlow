import { fireEvent, render, screen } from '@testing-library/react';
import { Plug } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import { Logo } from '@/components/brand/logo';
import { Alert, AlertTitle } from '@/components/ui/alert';

import { DemoDataBadge, PlaceholderBadge } from './DataBadges';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import { LoadingState } from './LoadingState';

describe('estados de retroalimentación', () => {
  it('EmptyState muestra título, descripción y acción', () => {
    render(
      <EmptyState
        icon={Plug}
        title="Aún no hay equipos"
        description="Registra un equipo."
        action={<button type="button">Registrar</button>}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Aún no hay equipos' })).toBeInTheDocument();
    expect(screen.getByText('Registra un equipo.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Registrar' })).toBeInTheDocument();
  });

  it('ErrorState se anuncia como alerta y permite reintentar', () => {
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />);
    expect(screen.getByRole('alert')).toHaveTextContent('No se pudo cargar la información');
    fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('ErrorState sin onRetry no muestra botón', () => {
    render(<ErrorState />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('LoadingState se anuncia como estado', () => {
    render(<LoadingState label="Cargando mediciones…" />);
    expect(screen.getByRole('status')).toHaveTextContent('Cargando mediciones…');
  });

  it('Alert usa role="alert" solo para errores', () => {
    render(
      <>
        <Alert variant="danger">
          <AlertTitle>Error</AlertTitle>
        </Alert>
        <Alert variant="info">
          <AlertTitle>Info</AlertTitle>
        </Alert>
      </>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Error');
    expect(screen.getByRole('status')).toHaveTextContent('Info');
  });

  it('las insignias identifican datos de demostración y contenido pendiente', () => {
    render(
      <>
        <DemoDataBadge />
        <PlaceholderBadge />
      </>,
    );
    expect(screen.getByText('Datos de demostración')).toBeInTheDocument();
    expect(screen.getByText('Información pendiente')).toBeInTheDocument();
  });
});

describe('Logo', () => {
  it('se lee como "EnergyFlow" y el isotipo es decorativo', () => {
    const { container } = render(<Logo />);
    expect(container).toHaveTextContent('EnergyFlow');
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('cada instancia usa un degradado con id único', () => {
    const { container } = render(
      <>
        <Logo />
        <Logo />
      </>,
    );
    const ids = [...container.querySelectorAll('linearGradient')].map((node) => node.id);
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });
});
