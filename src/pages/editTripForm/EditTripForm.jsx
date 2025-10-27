import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/apliClient";
import "./EditTripForm.css";

export default function EditTripForm() {
    const { id: tripId } = useParams(); 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    country: [],
  });
  const [countryInput, setCountryInput] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]); // 🔸 IDs de imágenes marcadas para eliminar
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar datos del viaje
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await apiClient.get(`/trips/${tripId}`);
        const trip = response.data;

        setFormData({
          title: trip.title || "",
          description: trip.description || "",
          startDate: trip.startDate || "",
          endDate: trip.endDate || "",
          country: Array.isArray(trip.country)
            ? trip.country
            : trip.country?.split(",").map((c) => c.trim()) || [],
        });

        setExistingImages(trip.images || []);
      } catch (error) {
        console.error("Error al cargar el viaje:", error);
        alert("No se pudo cargar la información del viaje.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [tripId]);

  // 🔹 Cambios en campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Añadir imágenes nuevas
  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  // 🔹 Añadir ciudades
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

  // 🔹 Marcar imagen para eliminar
  const handleDeleteExistingImage = (imageId) => {
    setImagesToDelete((prev) =>
      prev.includes(imageId) ? prev.filter((id) => id !== imageId) : [...prev, imageId]
    );
  };

  // 🔹 Enviar formulario (actualizar viaje)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    const updatedTrip = {
      title: formData.title,
      description: formData.description,
      country: formData.country.join(", "),
      startDate: formData.startDate,
      endDate: formData.endDate,
      imagesToDelete, // 🔸 IDs de imágenes a eliminar
    };

    data.append(
      "trip",
      new Blob([JSON.stringify(updatedTrip)], { type: "application/json" })
    );

    // Añadir nuevas imágenes
    images.forEach((img) => data.append("images", img));

    try {
      const response = await apiClient.put(`/trips/${tripId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Viaje actualizado con éxito ✈️");
      console.log("Respuesta del servidor:", response.data);
    } catch (err) {
      console.error("Error al actualizar el viaje:", err);
      alert("Error al actualizar el viaje 😕");
    }
  };

  if (loading) return <p>Cargando datos del viaje...</p>;

  return (
    <div className="form-container">
      <h2>Editar Viaje</h2>
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

        {/* 🔹 Muestra imágenes existentes */}
        {existingImages.length > 0 && (
          <div className="existing-images">
            <p>Fotos actuales:</p>
            <div className="image-preview">
              {existingImages.map((img) => {
                const marked = imagesToDelete.includes(img.id);
                return (
                  <div key={img.id} className={`preview-item ${marked ? "marked-delete" : ""}`}>
                    <img
                      src={img.url}
                      alt="Imagen del viaje"
                      className="preview-thumb"
                    />
                    <button
                      type="button"
                      className="delete-image-btn"
                      onClick={() => handleDeleteExistingImage(img.id)}
                    >
                      {marked ? "Deshacer" : "Eliminar"}
                    </button>
                  </div>
                );
              })}
            </div>
            {imagesToDelete.length > 0 && (
              <p className="text-warning">
                {imagesToDelete.length} imagen(es) marcada(s) para eliminar
              </p>
            )}
          </div>
        )}

        {/* 🔹 Subir imágenes nuevas */}
        <div>
          <label>Nuevas fotos (opcional)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          {images.length > 0 && (
            <p className="text-small">{images.length} nuevas imágenes seleccionadas</p>
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
                <button
                  type="button"
                  onClick={() => handleRemoveCountry(country)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

