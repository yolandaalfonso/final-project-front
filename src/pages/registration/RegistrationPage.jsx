import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../components/successModal/SuccessModal';
import registerService from '../../services/register/RegisterService';
import { uploadImageToFirebase } from "../../utils/uploadImage";
import { Link } from 'react-router-dom';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);

  const navigate = useNavigate();

  const watchPassword = watch('password');
  const watchAvatar = watch('avatar');


  useEffect(() => {
    if (watchAvatar && watchAvatar[0]) {
      const file = watchAvatar[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreviewAvatar(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewAvatar(null);
    }
  }, [watchAvatar]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitError('');
    

    try {

      // Avatar por defecto
      const defaultAvatar =
      "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // puedes cambiarla por una tuya subida a Firebase Storage

      let avatarUrl = defaultAvatar

      // Si el usuario subió una imagen, súbela a Firebase Storage
      if (data.avatar && data.avatar[0]) {
        avatarUrl = await uploadImageToFirebase(data.avatar[0], data.userName);
      }
      const payload = {
        userName: data.userName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        name: data.name,
        firstSurname: data.firstSurname,
        bio: data.bio || '', // opcional, si el campo viene vacío
        avatar: avatarUrl,
      };

      console.log('Payload enviado:', payload);
      console.log("Primer apellido:", payload.firstSurname);



      const result = await registerService.registerUser(payload);
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
            <Link to="/" className="registration-form__back-link">🔙 Volver</Link>
            <h2 className="registration-form__section-title">Registro</h2>

            {/* Username */}
            <div className="registration-form__field">
              <label className="registration-form__label">
                Nombre de usuario <span className="registration-form__required">*</span>
              </label>
              <input
                type="text"
                disabled={isLoading}
                {...register('userName', { required: 'El nombre de usuario es obligatorio' })}
                className={`registration-form__input ${
                  errors.username ? 'registration-form__input--error' : ''
                }`}
              />
              {errors.username && (
                <p className="registration-form__error">{errors.username.message}</p>
              )}
            </div>

            {/* Bio */}
            <div className="registration-form__field">
              <label className="registration-form__label">Biografía</label>
              <textarea
                disabled={isLoading}
                {...register('bio')}
                className="registration-form__input registration-form__textarea"
                placeholder="Cuéntanos algo sobre ti..."
              ></textarea>
            </div>

            {/* Avatar */}
            <div className="registration-form__field">
              <label className="registration-form__label">Avatar</label>
              <input
                type="file"
                accept="image/*"
                disabled={isLoading}
                {...register('avatar')}
                className="registration-form__input"
              />
            </div>

            {previewAvatar && (
              <div className="registration-form__avatar-preview">
                <img
                  src={previewAvatar}
                  alt="Vista previa del avatar"
                  style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginTop: "10px" }}
                />
              </div>
            )}


            {/* Name */}
            <div className="registration-form__field">
              <label className="registration-form__label">
                Nombre <span className="registration-form__required">*</span>
              </label>
              <input
                type="text"
                disabled={isLoading}
                {...register('name', { required: 'El nombre es obligatorio' })}
                className={`registration-form__input ${errors.name ? 'registration-form__input--error' : ''}`}
              />
              {errors.name && <p className="registration-form__error">{errors.name.message}</p>}
            </div>

            {/* First Surname */}
            <div className="registration-form__field">
              <label className="registration-form__label">
                Primer apellido <span className="registration-form__required">*</span>
              </label>
              <input
                type="text"
                disabled={isLoading}
                {...register('firstSurname', { required: 'El primer apellido es obligatorio' })}
                className={`registration-form__input ${errors.firstSurname ? 'registration-form__input--error' : ''}`}
              />
              {errors.firstSurname && <p className="registration-form__error">{errors.firstSurname.message}</p>}
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
                {...register('confirmPassword', {
                  required: 'Repetir contraseña es obligatorio',
                  validate: v => v === watchPassword || 'Las contraseñas no coinciden'
                })}
                className={`registration-form__input ${
                  errors.confirmPassword ? 'registration-form__input--error' : ''
                }`}
              />
              {errors.confirmPassword && (
                <p className="registration-form__error">{errors.confirmPassword.message}</p>
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
