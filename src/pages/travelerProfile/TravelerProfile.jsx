import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/apliClient"; // tu cliente axios
import "./TravelerProfile.css";

import TripCard from "../../components/tripCard/TripCard";

export default function TravelerProfile() {
  const { id } = useParams(); // /profile/:id
  const [profile, setProfile] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = Number(id);
        const tripsRes = await apiClient.get(`/trips/user/${userId}`);
        const tripsData = tripsRes.data;
        /* setTrips(tripsData); */
        // 🔹 Filtra solo los viajes que tengan al menos una imagen
        const tripsWithImages = tripsData.filter(trip => trip.images && trip.images.length > 0);
        setTrips(tripsWithImages);


        if (tripsData.length > 0) {
        setProfile({
            userName: tripsData[0].travelerUsername,
            bio: "Sin biografía aún...",
            avatar: "/avatars/default-avatar.png",
        });
        } else {
        setProfile({
            userName: "Usuario sin viajes",
            bio: "",
            avatar: "/avatars/default-avatar.png",
        });
        }
      } catch (err) {
        console.error("❌ Error al cargar perfil:", err);
        setError("No se pudo cargar la información del perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

  if (loading) return <div className="profile-loading">Cargando perfil...</div>;
  if (error) return <div className="profile-error">{error}</div>;
  if (!profile) return <div>No se encontró el perfil.</div>;

  // --- Cálculos ---
  const totalTrips = trips.length;
  const uniqueCountries = new Set(trips.map((t) => t.country)).size;

  return (
    <div className="traveler-profile">
      {/* ---------- CABECERA DEL PERFIL ---------- */}
      <div className="profile-header">
        <img
          src={profile.avatar || "/avatars/default-avatar.png"}
          alt={profile.userName}
          className="profile-avatar"
        />
        <h2>@{profile.userName}</h2>
        <p className="profile-bio">{profile.bio || "Sin biografía aún..."}</p>
        <button className="edit-btn">Editar Perfil</button>
      </div>

      {/* ---------- ESTADÍSTICAS ---------- */}
      <div className="profile-stats">
        <div className="stat">
          <span className="stat-number">{uniqueCountries}</span>
          <span className="stat-label">Países Visitados</span>
        </div>
        <div className="stat">
          <span className="stat-number">{totalTrips}</span>
          <span className="stat-label">Viajes Realizados</span>
        </div>
        <div className="stat">
          <span className="stat-number">1.2k</span>
          <span className="stat-label">Seguidores</span>
        </div>
        <div className="stat">
          <span className="stat-number">340</span>
          <span className="stat-label">Seguidos</span>
        </div>
      </div>

      {/* ---------- SECCIÓN DE VIAJES ---------- */}
      <div className="profile-trips">
        <h3>Mis Viajes</h3>
        <div className="trips-grid">
            {trips.length > 0 ? (
                trips.map((trip) => <TripCard key={trip.id_trip} trip={trip} />)
            ) : (
                <p className="no-trips">Aún no has publicado viajes.</p>
            )}
        </div>

        {/* <div className="trips-grid">
          {trips.length > 0 ? (
            trips.map((trip) => (
              <div key={trip.id_trip} className="trip-card">
                <img
                  src={trip.images?.[0]?.url || "/images/default-trip.jpg"}
                  alt={trip.title}
                  className="trip-image"
                />
                <p className="trip-title">{trip.title}</p>
              </div>
            ))
          ) : (
            <p className="no-trips">Aún no has publicado viajes.</p>
          )}
        </div> */}
      </div>
    </div>
  );
}


