import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';
import { Button } from './button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './dialog';

describe('Dialog', () => {
  function renderDialog() {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Abrir</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Detalle del cálculo</DialogTitle>
          <DialogDescription>Resultado y procedimiento.</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
  }

  it('se abre con nombre y descripción accesibles', () => {
    renderDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Abrir' }));
    const dialog = screen.getByRole('dialog', { name: 'Detalle del cálculo' });
    expect(dialog).toHaveAccessibleDescription('Resultado y procedimiento.');
  });

  it('se cierra con el botón "Cerrar"', () => {
    renderDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Abrir' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('se cierra con Escape', () => {
    renderDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Abrir' }));
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('AlertDialog', () => {
  function renderConfirm(onConfirm: () => void) {
    render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Eliminar</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>¿Eliminar este equipo?</AlertDialogTitle>
          <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Sí, eliminar</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>,
    );
  }

  it('usa role="alertdialog" y confirma la acción', () => {
    const onConfirm = vi.fn();
    renderConfirm(onConfirm);
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
    expect(screen.getByRole('alertdialog', { name: '¿Eliminar este equipo?' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Sí, eliminar' }));
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('cancelar cierra sin ejecutar la acción', () => {
    const onConfirm = vi.fn();
    renderConfirm(onConfirm);
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });
});
