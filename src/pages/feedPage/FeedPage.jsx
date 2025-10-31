import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/apliClient";
import FeedCard from "../../components/feedCard/FeedCard";
import "./FeedPage.css";

// Fallback para obtener userId desde localStorage si no viene por params
const getLoggedInUserIdFromStorage = () => {
  try {
    const stored = localStorage.getItem("loginUser");
    if (stored) {
      const user = JSON.parse(stored);
      return user?.id_user || user?.userId || user?.user?.id_user || null;
    }
  } catch (e) {
    console.warn("Error leyendo loginUser del localStorage:", e);
  }
  return null;
};

export default function FeedPage() {
  const { id } = useParams(); // id viene de /feed/:id
  const paramUserId = id ? Number(id) : null;
  const [feedTrips, setFeedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Prioriza el id de params; si no existe usa localStorage
  const currentUserId = paramUserId || getLoggedInUserIdFromStorage();

  useEffect(() => {
    const fetchFeedTrips = async () => {
      try {
        const response = await apiClient.get("/trips"); 
        const allTrips = response.data || [];
        
        console.log("Viajes totales recibidos:", allTrips.length);
  
        const filteredFeed = allTrips
          // 🔹 Filtrar para excluir los viajes del usuario logueado
          .filter((trip) => {
            const travelerId = trip?.traveler?.id_user ?? trip?.traveler?.id;
            if (!currentUserId) return true;
            return travelerId !== currentUserId;
          })
          // 🔹 Mostrar solo los viajes que tienen imágenes
          .filter((trip) => Array.isArray(trip.images) && trip.images.length > 0)
          // 🔹 (Opcional) Filtrar también por si alguna imagen no tiene url nula
          .filter((trip) => trip.images.some(img => img.url && img.url.trim() !== ""));
  
        console.log("Viajes en el feed (con imágenes):", filteredFeed.length);
        setFeedTrips(filteredFeed);
  
      } catch (err) {
        console.error("❌ Error al cargar el feed:", err);
        setError("No se pudo cargar el feed de viajes.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchFeedTrips();
  }, [currentUserId]);

  if (loading) return <div className="feed-loading">Cargando feed...</div>;
  if (error) return <div className="feed-error">{error}</div>;

  return (
    <div className="feed-page-container">
      <h1 className="feed-title">Explora e inspírate 🚀</h1>
      <div className="feed-grid">
        {feedTrips.length > 0 ? (
          feedTrips.map((trip) => <FeedCard key={trip.id_trip || trip.id} trip={trip} />)
        ) : (
          <p className="no-feed">No hay viajes nuevos para mostrar.</p>
        )}
      </div>
    </div>
  );
}

