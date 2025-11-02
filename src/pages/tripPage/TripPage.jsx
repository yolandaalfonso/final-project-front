import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../services/apliClient";
import "./TripPage.css";
import Button from "../../components/button/Button";

import calendarIcon from "../../assets/icons/dates-calendar.png"

export default function TripPage() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await apiClient.get(`/trips/${id}`);
        setTrip(response.data);
      } catch (err) {
        console.error("Error al cargar el viaje:", err);
        setError("No se pudo cargar la información del viaje.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  if (loading) return <div className="trip-loading">Cargando viaje...</div>;
  if (error) return <div className="trip-error">{error}</div>;
  if (!trip) return <div>No se encontró el viaje.</div>;

  const handleEditTrip = () => {
    navigate(`/trips/${id}/edit`);
  };

  return (
    <div className="trip-page">
      {/* ---------- ENCABEZADO DEL VIAJE ---------- */}
      <div className="trip-header">
        {trip.images && trip.images.length > 0 && (
          <img 
            src={trip.images[0].url} 
            alt={trip.title} 
            className="trip-main-image" 
          />

        )}
        <h1 className="trip-title">{trip.title}</h1>
      </div>

      {/* ---------- INFORMACIÓN DEL VIAJERO ---------- */}
      <section className="trip-author">
        <div className="author-info">
          <img
            src={trip.traveler?.avatar || "https://via.placeholder.com/50"}
            alt={trip.traveler?.name || "Viajero"}
            className="author-avatar"
          />
          <div>
            {/* <h4>{trip.traveler?.name || "Viajero anónimo"}</h4> */}
            <h4>{trip.travelerUsername}</h4>
            <p>Creador del viaje</p>
          </div>
        </div>
        <div className="trip-actions">
          <Button text="Editar viaje ✏️" type="primary" onClick={handleEditTrip}></Button>
          <Button text="📤 Compartir" type="secondary"></Button>
          {/* <button className="btn-edit">✏️ Editar Viaje</button> */}
          {/* <button className="btn-share">📤 Compartir</button> */}
        </div>
      </section>

      {/* ---------- DESCRIPCIÓN ---------- */}
      <section className="trip-description">
        <p>{trip.description}</p>
        {/** 👉 Función para formatear fechas */}
        {(() => {
          const formatDate = (isoDate) => {
            if (!isoDate) return "";
            return new Date(isoDate).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
          };

          return(
          <p className="trip-dates">
            <img 
              src={calendarIcon} 
              alt="Calendario" 
              className="calendar-icon"
            />{" "}
            <strong>Inicio:</strong> {formatDate(trip.startDate)} –{" "}
            <strong>Fin:</strong> {formatDate(trip.endDate)}
            {/* <strong>Inicio:</strong> {trip.startDate} –{" "}
            <strong>Fin:</strong> {trip.endDate} */}
          </p>
          );
        })()}
      </section>

      {/* ---------- GALERÍA ---------- */}
      <section className="trip-gallery">
        <h3>Momentos Destacados</h3>
        <div className="gallery-grid">
          {trip.images &&
            trip.images.slice(1, 4).map((img, index) => (
                <img 
                  key={index}
                  src={img.url} 
                  alt={`Momento ${index + 1}`} 
                  className="gallery-image" 
                />
              ))
          }
        </div>
      </section>

      {/* ---------- LUGARES VISITADOS ---------- */}
      <section className="trip-locations">
      <h3>Lugares Visitados</h3>
      <ul>
        {Array.isArray(trip.country)
          ? trip.country.map((place, index) => (
              <li key={index}>
                <span className="location-icon">📍</span> {place}
              </li>
            ))
          : trip.country
              ?.split(",") // separa el string en caso de venir así
              .map((place, index) => (
                <li key={index}>
                  <span className="location-icon">📍</span> {place.trim()}
                </li>
              ))}
      </ul>
    </section>

    </div>
  );
}


