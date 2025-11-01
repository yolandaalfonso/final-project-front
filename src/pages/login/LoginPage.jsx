import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';



const LoginPage = () => {
    /* console.log("📢 LoginPage se está renderizando"); */
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    const { user, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Redirigir cuando el usuario se autentique
  useEffect(() => {
    if (isAuthenticated && user?.id_user &&
      location.pathname === "/login") {
      console.log('✅ Usuario autenticado, redirigiendo...', user);
      navigate(`/trips/user/${user.id_user}`);
    }
  }, [isAuthenticated, user, navigate, location.pathname]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitError('');

    try {
      await login(data.email, data.password);
      // El useEffect se encargará de la navegación
    } catch (error) {
      console.error('Error en el login:', error);
      setSubmitError(error.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="login-page">
      <Link to="/" className="login-form__back-link">🔙 Volver</Link>
      <h2 className="login-modal__title">Iniciar sesión</h2>

      <form className="login-modal__form" onSubmit={handleSubmit(onSubmit)}>
        {submitError && (
          <div className="login-modal__error login-modal__error--general">
            {submitError}
          </div>
        )}

        <div className="login-modal__field">
          <label className="login-modal__label">Correo electrónico</label>
          <input
            type="email"
            placeholder="tunombre@gmail.com"
            disabled={isLoading}
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email no válido',
              },
            })}
            className={`login-modal__input ${errors.email ? 'login-modal__input--error' : ''}`}
          />
          {errors.email && <p className="login-modal__error">{errors.email.message}</p>}
        </div>

        <div className="login-modal__field">
          <label className="login-modal__label">Contraseña</label>
          <input
            type="password"
            placeholder="**********"
            disabled={isLoading}
            {...register('password', {
              required: 'La contraseña es obligatoria',
            })}
            className={`login-modal__input ${errors.password ? 'login-modal__input--error' : ''}`}
          />
          {errors.password && <p className="login-modal__error">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`login-modal__button ${isLoading ? 'login-modal__button--loading' : ''}`}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>

        <div className="login-modal__footer">
          <span className="login-modal__footer-text">¿No tienes una cuenta?</span>
          <Link to="/register" className="login-modal__footer-link">
            ¡Registrate aquí!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;