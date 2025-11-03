import React, { useState } from "react";
import apiClient from "../../services/apliClient";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/successModal/SuccessModal";
import "./TripForm.css";

export default function TripForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    country: [],
  });
  const [countryInput, setCountryInput] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado inicial: cerrado

  // Manejar campos de texto
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar imágenes
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...newFiles]);
  };

  // Añadir ciudades
  const handleAddCountry = () => {
    if (countryInput.trim() && !formData.country.includes(countryInput.trim())) {
      setFormData({
        ...formData,
        country: [...formData.country, countryInput.trim()],
      });
      setCountryInput("");
    }
  };

  const handleRemoveCountry = (country) => {
    setFormData({
      ...formData,
      country: formData.country.filter((c) => c !== country),
    });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error("❌ No hay usuario logueado en Firebase");
      return;
    }

    console.log("🔹 UID que voy a enviar al backend:", currentUser.uid);
    console.log("🔹 Email que voy a enviar al backend:", currentUser.email);

    const data = new FormData();
    const tripData = {
      title: formData.title,
      description: formData.description,
      country: formData.country.join(", "),
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    data.append("trip", new Blob([JSON.stringify(tripData)], { type: "application/json" }));
    images.forEach((img) => data.append("images", img));

    try {
      const response = await apiClient.post("/trips", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Viaje creado:", response.data);

      // ✅ Abrir modal al crear viaje con éxito
      setIsModalOpen(true);

      // Limpiar formulario
      setFormData({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        country: [],
      });
      setImages([]);

    } catch (err) {
      console.error("Error al crear el viaje:", err);
      if (err.response?.status === 403) {
        alert("No tienes permiso para crear el viaje (403)");
      } else {
        alert("Error al crear el viaje 😕");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Viaje</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Fotos (máx. 3)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          {images.length > 0 && (
            <p className="text-small">{images.length} imágenes seleccionadas</p>
          )}
        </div>

        <div className="date-group">
          <div>
            <label>Fecha inicio</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Fecha fin</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>Ciudades</label>
          <div className="country-input-group">
            <input
              type="text"
              value={countryInput}
              onChange={(e) => setCountryInput(e.target.value)}
              placeholder="Introduce una ciudad"
            />
            <button
              type="button"
              onClick={handleAddCountry}
              className="add-country-btn"
            >
              Añadir
            </button>
          </div>

          <div className="country-list">
            {formData.country.map((country) => (
              <span key={country} className="country-chip">
                {country}
                <button type="button" onClick={() => handleRemoveCountry(country)}>
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Guardar viaje
        </button>
      </form>

      {/* ✅ Modal solo aparece si isModalOpen es true */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          navigate("/trips/user/${id_user}");
        }}
        title="¡Viaje creado con éxito! ✈️"
      />
    </div>
  );
}



