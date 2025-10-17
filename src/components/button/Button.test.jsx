import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button component', () => {
  it('renders default text if none is provided', () => {
    render(<Button />);
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
  });

  it('renders custom text when provided', () => {
    const text = 'Enviar';
    render(<Button text={text} />);
    expect(screen.getByRole('button', { name: text })).toBeInTheDocument();
  });

  it('applies the correct type class', () => {
    const type = 'secondary';
    const { container } = render(<Button type={type} />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('button', type);
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} />);
    const button = screen.getByRole('button', { name: 'Buscar' });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
