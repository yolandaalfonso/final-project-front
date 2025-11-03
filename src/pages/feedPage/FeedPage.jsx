import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/apliClient";
import FeedCard from "../../components/feedCard/FeedCard";
import "./FeedPage.css";

// 🧩 Helper: obtener userId del localStorage si no viene por params
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
  const { id } = useParams(); // viene de /feed/:id
  const paramUserId = id ? Number(id) : null;
  const [feedTrips, setFeedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // id prioritario: el del param; si no, el guardado
  const currentUserId = paramUserId || getLoggedInUserIdFromStorage();

  useEffect(() => {
    const fetchFeedTrips = async () => {
      try {
        const response = await apiClient.get("/trips"); // 🔹 sin /feed
        const allTrips = response.data || [];

        console.log("📦 Viajes totales recibidos:", allTrips.length);

        // 🔹 Filtrar los viajes que no son del usuario actual
        const filteredFeed = allTrips
          .filter((trip) => {
            const travelerId = trip?.traveler?.id_user ?? trip?.traveler?.id;
            if (!currentUserId) return true;
            return travelerId !== currentUserId;
          })
          // 🔹 Solo los que tienen imágenes
          .filter(
            (trip) =>
              Array.isArray(trip.images) &&
              trip.images.some((img) => img.url && img.url.trim() !== "")
          )
          // 🔹 Agregar fallback de avatar si falta
          .map((trip) => ({
            ...trip,
            traveler: {
              ...trip.traveler,
              avatar:
                trip?.traveler?.avatar ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png",
            },
          }));

        console.log("🌍 Feed visible:", filteredFeed.length);
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
    <div className="page-container">
        <div className="feed-page-container">
            <h1 className="feed-title">Explora e inspírate 🌍✈️📸</h1>
            <div className="feed-grid">
                {feedTrips.length > 0 ? (
                feedTrips.map((trip) => (
                    <FeedCard key={trip.id_trip || trip.id} trip={trip} />
                ))
                ) : (
                <p className="no-feed">No hay viajes nuevos para mostrar.</p>
                )}
            </div>
        </div>
    </div>
  );
}


