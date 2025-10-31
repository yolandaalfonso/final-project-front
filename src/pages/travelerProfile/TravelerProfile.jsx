import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/apliClient"; // tu cliente axios
import "./TravelerProfile.css";

import TripCard from "../../components/tripCard/TripCard";
import Button from "../../components/button/Button";
import TripForm from "../tripForm/TripForm";

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
        console.log("🔎 TravelerProfile: id param =", id, " -> userId =", userId);
  
        // Petición de viajes
        const tripsRes = await apiClient.get(`/trips/user/${userId}`);
        console.log("🔁 tripsRes.status =", tripsRes.status, "tripsRes.data =", tripsRes.data);
  
        // Asegurarnos de trabajar siempre con un array
        const tripsData = Array.isArray(tripsRes.data) ? tripsRes.data : [];
  
        // Filtrar viajes con imágenes
        const tripsWithImages = tripsData.filter(
          (trip) => trip.images && trip.images.length > 0
        );
        setTrips(tripsWithImages);
  
        // Intentamos obtener userName de distintas fuentes (orden de preferencia)
        let resolvedUserName = null;
  
        // 1) Si hay viajes, tomamos travelerUsername del primero (si existe)
        if (tripsData.length > 0) {
          resolvedUserName = tripsData[0].travelerUsername || null;
        }
  
        // 2) Si no lo hemos resuelto, buscamos en localStorage (varias claves comunes)
        if (!resolvedUserName) {
          try {
            const candidateKeys = ["loginUser", "user", "currentUser", "authUser"];
            for (const key of candidateKeys) {
              const raw = localStorage.getItem(key);
              if (!raw) continue;
              try {
                const parsed = JSON.parse(raw);
                // buscamos varias propiedades posibles
                const candidate = parsed?.userName || parsed?.username || parsed?.name || parsed?.user?.userName;
                if (candidate) {
                  resolvedUserName = candidate;
                  console.log(`📦 nombre encontrado en localStorage key='${key}':`, resolvedUserName);
                  break;
                }
              } catch (e) {
                // si no es JSON, usar raw string
                if (typeof raw === "string" && raw.trim()) {
                  resolvedUserName = raw;
                  console.log(`📦 nombre raw en localStorage key='${key}':`, resolvedUserName);
                  break;
                }
              }
            }
          } catch (errLS) {
            console.warn("⚠️ Error leyendo localStorage:", errLS);
          }
        }
  
        // 3) Si aún no lo tenemos, intentar pedir al backend el usuario por id (si existe endpoint)
        if (!resolvedUserName) {
          try {
            // Intenta este endpoint: /users/{id} — si no existe devolverá 404 y entra al catch
            const userResById = await apiClient.get(`trips/user/${userId}`);
            console.log("🔁 userResById.status =", userResById.status, "data =", userResById.data);
            // Adaptar la propiedad según tu DTO (userName, name, username...)
            resolvedUserName = userResById.data?.userName || userResById.data?.username || userResById.data?.name || null;
          } catch (errUserById) {
            console.log("ℹ️ No existe /users/{id} o fallo obteniendo usuario por id:", errUserById?.response?.status);
            // Si no existe /users/{id}, intentar por uid si lo tienes en localStorage
            try {
              const stored = JSON.parse(localStorage.getItem("loginUser") || "null");
              const maybeUid = stored?.uid || stored?.user?.uid;
              if (maybeUid) {
                const userResByUid = await apiClient.get(`/auth/user/${maybeUid}`);
                console.log("🔁 userResByUid.status =", userResByUid.status, "data =", userResByUid.data);
                resolvedUserName = userResByUid.data?.userName || userResByUid.data?.username || userResByUid.data?.name || null;
              }
            } catch (errUidLookup) {
              console.log("ℹ️ No se pudo obtener usuario por UID o no hay UID en localStorage:", errUidLookup?.response?.status || errUidLookup);
            }
          }
        }
  
        // 4) Fallback final
        if (!resolvedUserName) {
          resolvedUserName = "Usuario sin viajes";
        }
  
        // Finalmente setear profile (si no había datos, se pone nombre resuelto)
        setProfile({
          userName: resolvedUserName,
          bio: "Sin biografía aún...",
          avatar: "/avatars/default-avatar.png",
        });
  
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


