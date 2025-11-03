import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apliClient';
import { uploadImageToFirebase } from "../../utils/uploadImage";
import { useAuth } from "../../context/AuthContext";
import './EditProfilePage.css';

export default function EditProfileForm() {
  const { id: userId } = useParams();
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    name: '',
    firstSurname: '',
    bio: '',
  });
  const [avatar, setAvatar] = useState(null); // nueva imagen
  const [existingAvatar, setExistingAvatar] = useState(null); // avatar actual
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 🔹 Cargar datos del usuario
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get(`/users/${userId}`);
        console.log("res.data =", res.data);
        const user = res.data;
        setFormData({
          userName: user.userName || '',
          email: user.email || '',
          name: user.name || '',
          firstSurname: user.firstSurname || '',
          bio: user.bio || '',
        });
        setExistingAvatar(user.avatar || null);
      } catch (err) {
        console.error('Error al cargar usuario:', err);
        alert('No se pudo cargar la información del usuario.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  // 🔹 Preview de avatar
  useEffect(() => {
    if (avatar) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewAvatar(reader.result);
      reader.readAsDataURL(avatar);
    } else {
      setPreviewAvatar(null);
    }
  }, [avatar]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setAvatar(e.target.files[0]);
  };

  // 🔹 Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      let avatarUrl = existingAvatar;
      if (avatar) {
        avatarUrl = await uploadImageToFirebase(avatar, formData.userName);
      }

      const payload = {
        ...formData,
        avatar: avatarUrl,
      };

      await apiClient.put(`/users/${userId}`, payload);
      setSubmitSuccess(true);
      await refreshUser();
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      setSubmitError('Error al actualizar perfil 😕');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div className="form-container">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        {submitError && <p className="error-message">{submitError}</p>}
        {submitSuccess && <p className="success-message">Perfil actualizado con éxito ✅</p>}

        <div className="form-field">
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            disabled
          />
        </div>

        <div className="form-field">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Primer apellido</label>
          <input
            type="text"
            name="firstSurname"
            value={formData.firstSurname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Biografía</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Cuéntanos algo sobre ti..."
          />
        </div>

        <div className="form-field">
          <label>Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {(previewAvatar || existingAvatar) && (
            <div className="avatar-preview">
              <img
                src={previewAvatar || existingAvatar}
                alt="Avatar"
                className="preview-thumb"
              />
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  );
}
