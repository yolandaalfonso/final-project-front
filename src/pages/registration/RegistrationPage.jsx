import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../components/successModal/SuccessModal';
import registerService from '../../services/register/RegisterService';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();

  const watchPassword = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitError('');

    try {
      const result = await registerService.registerUser(data);
      if (result.success && result.status === 201) {
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setSubmitError(error.message || 'Error al procesar el registro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-page">
     {/*  <Hero text="Crea tu cuenta" /> */}

      <div className="registration-page__container">
        <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Error general */}
          {submitError && (
            <div className="registration-form__error registration-form__error--general">
              {submitError}
            </div>
          )}

          {/* Datos de registro */}
          <section className="registration-form__section">
            <h2 className="registration-form__section-title">Registro</h2>

            {/* Username */}
            <div className="registration-form__field">
              <label className="registration-form__label">
                Nombre de usuario <span className="registration-form__required">*</span>
              </label>
              <input
                type="text"
                disabled={isLoading}
                {...register('username', { required: 'El nombre de usuario es obligatorio' })}
                className={`registration-form__input ${
                  errors.username ? 'registration-form__input--error' : ''
                }`}
              />
              {errors.username && (
                <p className="registration-form__error">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="registration-form__field">
              <label className="registration-form__label">
                Email <span className="registration-form__required">*</span>
              </label>
              <input
                type="email"
                disabled={isLoading}
                {...register('email', {
                  required: 'El email es obligatorio',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Email no válido' }
                })}
                className={`registration-form__input ${
                  errors.email ? 'registration-form__input--error' : ''
                }`}
              />
              {errors.email && (
                <p className="registration-form__error">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="registration-form__field">
              <label className="registration-form__label">
                Contraseña <span className="registration-form__required">*</span>
              </label>
              <input
                type="password"
                disabled={isLoading}
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                  minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                  validate: {
                    hasUpperCase: v => /[A-Z]/.test(v) || 'Falta mayúscula',
                    hasLowerCase: v => /[a-z]/.test(v) || 'Falta minúscula',
                    hasNumber: v => /\d/.test(v) || 'Falta número',
                    hasSymbol: v => /[!@#$%^&*(),.?":{}|<>]/.test(v) || 'Falta símbolo'
                  }
                })}
                className={`registration-form__input ${
                  errors.password ? 'registration-form__input--error' : ''
                }`}
              />
              {errors.password && (
                <p className="registration-form__error">{errors.password.message}</p>
              )}
            </div>

            {/* Repeat password */}
            <div className="registration-form__field">
              <label className="registration-form__label">
                Repite tu contraseña <span className="registration-form__required">*</span>
              </label>
              <input
                type="password"
                disabled={isLoading}
                {...register('repeatPassword', {
                  required: 'Repetir contraseña es obligatorio',
                  validate: v => v === watchPassword || 'Las contraseñas no coinciden'
                })}
                className={`registration-form__input ${
                  errors.repeatPassword ? 'registration-form__input--error' : ''
                }`}
              />
              {errors.repeatPassword && (
                <p className="registration-form__error">{errors.repeatPassword.message}</p>
              )}
            </div>
          </section>

          {/* Modal de éxito */}
          {isSuccessModalOpen && (
            <SuccessModal
              title="✅ Registro realizado con éxito"
              message="Tu cuenta se ha creado correctamente."
              buttonText="Ir a inicio"
              onClose={() => {
                setIsSuccessModalOpen(false);
                navigate('/');
              }}
            />
          )}

          {/* Botón */}
          <div className="registration-form__submit">
            <button
              type="submit"
              disabled={isLoading}
              className={`registration-form__button ${
                isLoading ? 'registration-form__button--loading' : ''
              }`}
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
