import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import SuccessModal from './SuccessModal';

describe('SuccessModal', () => {
  const mockOnClose = vi.fn();
  const props = {
    title: 'Éxito',
    message: 'La operación se realizó correctamente.',
    onClose: mockOnClose,
    buttonText: 'Cerrar',
  };

  it('renders title and message', () => {
    render(<SuccessModal {...props} />);
    
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.message)).toBeInTheDocument();
  });

  it('renders button with correct text', () => {
    render(<SuccessModal {...props} />);
    
    const button = screen.getByRole('button', { name: props.buttonText });
    expect(button).toBeInTheDocument();
  });

  it('calls onClose when button is clicked', () => {
    render(<SuccessModal {...props} />);
    
    const button = screen.getByRole('button', { name: props.buttonText });
    fireEvent.click(button);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

