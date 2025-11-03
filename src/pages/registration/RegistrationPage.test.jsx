import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';
import registerService from '../../services/register/RegisterService';
import { uploadImageToFirebase } from '../../utils/uploadImage';

// Mocks
vi.mock('../../services/register/RegisterService');
vi.mock('../../utils/uploadImage');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Wrapper con Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('RegistrationPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería renderizar el formulario correctamente', () => {
    renderWithRouter(<RegistrationPage />);

    expect(screen.getByText('Registro')).toBeInTheDocument();
    expect(screen.getByText('🔙 Volver')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Cuéntanos algo sobre ti/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  it('debería mostrar el link de volver', () => {
    renderWithRouter(<RegistrationPage />);

    const backLink = screen.getByText('🔙 Volver');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('debería mostrar errores de validación cuando se envía el formulario vacío', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegistrationPage />);

    const submitButton = screen.getByRole('button', { name: /Registrarse/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('El primer apellido es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('El email es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument();
    });
  });

  it('debería tener un input de email con el tipo correcto', () => {
    renderWithRouter(<RegistrationPage />);

    const emailInput = document.querySelector('input[name="email"]');
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('debería validar la longitud mínima de la contraseña', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegistrationPage />);

    const passwordInputs = document.querySelectorAll('input[type="password"]');

    await user.type(passwordInputs[0], '123');

    const submitButton = screen.getByRole('button', { name: /Registrarse/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Mínimo 8 caracteres')).toBeInTheDocument();
    });
  });

  it('debería validar que las contraseñas coincidan', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegistrationPage />);

    const passwordInputs = document.querySelectorAll('input[type="password"]');

    await user.type(passwordInputs[0], 'Password123!');
    await user.type(passwordInputs[1], 'Password456!');

    const submitButton = screen.getByRole('button', { name: /Registrarse/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
    });
  });

  it('debería mostrar vista previa del avatar cuando se selecciona una imagen', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegistrationPage />);

    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });
    const avatarInput = document.querySelector('input[type="file"]');

    await user.upload(avatarInput, file);

    await waitFor(() => {
      const preview = screen.getByAltText('Vista previa del avatar');
      expect(preview).toBeInTheDocument();
    });
  });

  it('debería enviar el formulario con datos válidos y avatar por defecto', async () => {
    const user = userEvent.setup();
    const mockResponse = { success: true, status: 201 };
    registerService.registerUser.mockResolvedValue(mockResponse);

    renderWithRouter(<RegistrationPage />);

    const userNameInput = document.querySelector('input[name="userName"]');
    const nameInput = document.querySelector('input[name="name"]');
    const firstSurnameInput = document.querySelector('input[name="firstSurname"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInputs = document.querySelectorAll('input[type="password"]');

    await user.type(userNameInput, 'testuser');
    await user.type(nameInput, 'Test');
    await user.type(firstSurnameInput, 'User');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInputs[0], 'Password123!');
    await user.type(passwordInputs[1], 'Password123!');

    const submitButton = screen.getByRole('button', { name: /Registrarse/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(registerService.registerUser).toHaveBeenCalledWith(
        expect.objectContaining({
          userName: 'testuser',
          email: 'test@example.com',
          name: 'Test',
          firstSurname: 'User',
          bio: '',
          avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        })
      );
    });
  });

  it('debería mostrar el modal de éxito después de un registro exitoso', async () => {
    const user = userEvent.setup();
    const mockResponse = { success: true, status: 201 };
    registerService.registerUser.mockResolvedValue(mockResponse);

    renderWithRouter(<RegistrationPage />);

    const userNameInput = document.querySelector('input[name="userName"]');
    const nameInput = document.querySelector('input[name="name"]');
    const firstSurnameInput = document.querySelector('input[name="firstSurname"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInputs = document.querySelectorAll('input[type="password"]');

    await user.type(userNameInput, 'testuser');
    await user.type(nameInput, 'Test');
    await user.type(firstSurnameInput, 'User');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInputs[0], 'Password123!');
    await user.type(passwordInputs[1], 'Password123!');

    await user.click(screen.getByRole('button', { name: /Registrarse/i }));

    await waitFor(() => {
      expect(screen.getByText('✅ Registro realizado con éxito')).toBeInTheDocument();
      expect(screen.getByText('Tu cuenta se ha creado correctamente.')).toBeInTheDocument();
    });
  });

  it('debería mostrar error cuando falla el registro', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Error al crear la cuenta';
    registerService.registerUser.mockRejectedValue(new Error(errorMessage));

    renderWithRouter(<RegistrationPage />);

    const userNameInput = document.querySelector('input[name="userName"]');
    const nameInput = document.querySelector('input[name="name"]');
    const firstSurnameInput = document.querySelector('input[name="firstSurname"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInputs = document.querySelectorAll('input[type="password"]');

    await user.type(userNameInput, 'testuser');
    await user.type(nameInput, 'Test');
    await user.type(firstSurnameInput, 'User');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInputs[0], 'Password123!');
    await user.type(passwordInputs[1], 'Password123!');

    await user.click(screen.getByRole('button', { name: /Registrarse/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('debería deshabilitar campos y botón mientras está cargando', async () => {
    const user = userEvent.setup();
    registerService.registerUser.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 1000))
    );

    renderWithRouter(<RegistrationPage />);

    const userNameInput = document.querySelector('input[name="userName"]');
    const nameInput = document.querySelector('input[name="name"]');
    const firstSurnameInput = document.querySelector('input[name="firstSurname"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInputs = document.querySelectorAll('input[type="password"]');

    await user.type(userNameInput, 'testuser');
    await user.type(nameInput, 'Test');
    await user.type(firstSurnameInput, 'User');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInputs[0], 'Password123!');
    await user.type(passwordInputs[1], 'Password123!');

    await user.click(screen.getByRole('button', { name: /Registrarse/i }));

    // Verificar que el botón muestra "Registrando..."
    expect(screen.getByRole('button', { name: /Registrando.../i })).toBeDisabled();
  });
});