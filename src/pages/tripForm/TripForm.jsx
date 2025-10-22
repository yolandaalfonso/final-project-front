import React, { useState } from "react";
import './TripForm.css'

export default function TripForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    cities: [],
  });
  const [cityInput, setCityInput] = useState("");
  const [images, setImages] = useState([]);

  // Manejar campos de texto
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar imágenes
  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  // Añadir ciudades
  const handleAddCity = () => {
    if (cityInput.trim() && !formData.cities.includes(cityInput.trim())) {
      setFormData({
        ...formData,
        cities: [...formData.cities, cityInput.trim()],
      });
      setCityInput("");
    }
  };

  const handleRemoveCity = (city) => {
    setFormData({
      ...formData,
      cities: formData.cities.filter((c) => c !== city),
    });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("startDate", formData.startDate);
    data.append("endDate", formData.endDate);
    data.append("cities", JSON.stringify(formData.cities));
    images.forEach((img) => data.append("images", img));

    try {
      const response = await fetch("http://localhost:8080/api/trips", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        alert("Viaje creado con éxito ✈️");
        setFormData({
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          cities: [],
        });
        setImages([]);
      } else {
        alert("Error al crear el viaje 😕");
      }
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="form-container">
  <h2>Agregar Viaje</h2>
  <form onSubmit={handleSubmit}>
    <div>
      <label>Título</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />
    </div>

    <div>
      <label>Descripción</label>
      <textarea name="description" value={formData.description} onChange={handleChange} />
    </div>

    <div>
      <label>Fotos (máx. 3)</label>
      <input type="file" multiple accept="image/*" onChange={handleFileChange} className="file-input" />
      {images.length > 0 && (
        <p className="text-small">{images.length} imágenes seleccionadas</p>
      )}
    </div>

    <div className="date-group">
      <div>
        <label>Fecha inicio</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
      </div>
      <div>
        <label>Fecha fin</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
      </div>
    </div>

    <div>
      <label>Ciudades</label>
      <div className="city-input-group">
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Introduce una ciudad"
        />
        <button type="button" onClick={handleAddCity} className="add-city-btn">
          Añadir
        </button>
      </div>
      <div className="cities-list">
        {formData.cities.map((city) => (
          <span key={city} className="city-chip">
            {city}
            <button type="button" onClick={() => handleRemoveCity(city)}>×</button>
          </span>
        ))}
      </div>
    </div>

    <button type="submit" className="submit-btn">
      Guardar viaje
    </button>
  </form>
</div>

  )
}
