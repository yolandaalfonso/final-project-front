import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './TripPage.css';

function TripPage() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchTripData = async () => {
        try {
          setLoading(true);
          
          // Simulación de datos de base de datos
          const data = {
            title: "Aventura en los Alpes Suizos",
            description: "Un viaje espectacular recorriendo los majestuosos Alpes suizos. Experiencia única visitando pueblos alpinos, disfrutando de las montañas nevadas y degustando la exquisita gastronomía local. Incluye senderismo, esquí y tours por los lugares más emblemáticos de Suiza.",
            country: "Suiza",
            startDate: "2024-12-15",
            endDate: "2024-12-28",
            images: [
              "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200",
              "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800",
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
              "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800",
              "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800",
              "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800"
            ]
          };
          
          setTrip(data);
          setError(null);
        } catch (err) {
          setError('Error al cargar los datos del viaje');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchTripData();
    }, []); // Array vacío = solo se ejecuta una vez
    
    if (loading) {
      return (
        <div className="app-container">
          <div className="loading">Cargando viaje...</div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="app-container">
          <div className="error">{error}</div>
        </div>
      );
    }
  
    if (!trip) {
      return (
        <div className="app-container">
          <div className="no-data">No se encontró información del viaje</div>
        </div>
      );
    }
  
    return (
      <div className="app-container">
        <TripDetail trip={trip} /> {/* Cambiado de TripPage a TripDetail */}
      </div>
    );
}

export default TripPage;

