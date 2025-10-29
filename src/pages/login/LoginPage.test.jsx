import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import LoginPage from './LoginPage';
import { useAuth } from '../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock del hook useAuth
vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

describe('LoginPage', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useAuth.mockReturnValue({ login: mockLogin });
  });

  it('renders email and password inputs', () => {
    render(<LoginPage />, { wrapper: Wrapper });
    expect(screen.getByPlaceholderText('tunombre@gmail.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('**********')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<LoginPage />, { wrapper: Wrapper });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(await screen.findByText('El email es obligatorio')).toBeInTheDocument();
    expect(await screen.findByText('La contraseña es obligatoria')).toBeInTheDocument();
  });

  it('calls login with correct data', async () => {
    render(<LoginPage />, { wrapper: Wrapper });
    fireEvent.change(screen.getByPlaceholderText('tunombre@gmail.com'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('**********'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('shows error message if login fails', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Credenciales incorrectas'));
    render(<LoginPage />, { wrapper: Wrapper });

    fireEvent.change(screen.getByPlaceholderText('tunombre@gmail.com'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('**********'), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(await screen.findByText('Credenciales incorrectas')).toBeInTheDocument();
  });

  it('disables button and shows loading text while submitting', async () => {
    let resolvePromise;
    mockLogin.mockImplementation(() => new Promise((resolve) => { resolvePromise = resolve; }));
  
    render(<LoginPage />, { wrapper: Wrapper });
  
    fireEvent.change(screen.getByPlaceholderText('tunombre@gmail.com'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('**********'), { target: { value: 'password123' } });
  
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
  
    // Esperamos a que el texto cambie a "Iniciando sesión..."
    const button = await screen.findByRole('button', { name: /Iniciando sesión.../i });
    expect(button).toBeDisabled();
  
    // Resolver la promesa para simular que la carga terminó
    resolvePromise();
    await waitFor(() => expect(screen.getByRole('button', { name: /Iniciar sesión/i })).not.toBeDisabled());
  });
  
  
});
