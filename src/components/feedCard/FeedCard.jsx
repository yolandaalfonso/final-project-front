import React from "react";
import "./FeedCard.css";

const FeedCard = ({ trip }) => {
  // protección por si trip es undefined
  if (!trip) {
    console.warn("FeedCard: trip is falsy", trip);
    return null;
  }

  const {
    title = "Viaje Sin Título",
    description = "Un viaje increíble explorando el mundo.",
    travelerUsername = "Viajero Anónimo",
    images = [],
    country = [],
  } = trip;

  const mainImage = images[0]?.url || "/images/default-feed.jpg";

  // Construcción segura de la URL del avatar
  const rawAvatar = trip?.traveler?.avatar;
  let authorAvatar = "/avatars/default-avatar.png"; // fallback local por defecto

  if (rawAvatar && typeof rawAvatar === "string" && rawAvatar.trim() !== "") {
    // si ya es URL absoluta la usamos tal cual
    if (rawAvatar.startsWith("http") || rawAvatar.startsWith("data:")) {
      authorAvatar = rawAvatar;
    } else {
      // completamos con BACKEND (si tienes VITE_BACKEND_URL)
      const backendBase = import.meta.env.VITE_BACKEND_URL || "";
      // elimina slashes redundantes
      const base = backendBase.replace(/\/$/, "");
      const path = rawAvatar.replace(/^\/+/, "");
      authorAvatar = base ? `${base}/${path}` : `/${path}`;
    }
  } else {
    // si no hay avatar en trip.traveler, intenta usar el usuario autenticado (si lo tienes globalmente)
    // authorAvatar = user?.avatar || authorAvatar;
  }

  // para debug: muestra qué URL está intentando usar
  console.debug("FeedCard: rawAvatar=", rawAvatar, "authorAvatar=", authorAvatar, "trip:", trip);

  const highlights = Array.isArray(country)
    ? country.slice(0, 3)
    : typeof country === "string"
    ? country.split(",").map((c) => c.trim()).slice(0, 3)
    : [];

  const likes = "1.2K Likes";
  const comments = "89 Comentarios";
  const timeAgo = "Hace 2 horas";

  // handler onError: si falla la carga de la imagen, caemos al fallback local
  const handleAvatarError = (e) => {
    e.currentTarget.onerror = null; // evita bucle
    e.currentTarget.src = "/avatars/default-avatar.png";
  };

  return (
    <div className="feed-card-container">
      <div className="feed-card-image-box">
        <img src={mainImage} alt={title} className="feed-card-main-image" />
      </div>

      <div className="feed-card-content-area">
        <h2 className="feed-card-title">{title}</h2>

        <div className="feed-card-meta">
          <img
            src={authorAvatar}
            alt={travelerUsername}
            className="author-avatar-small"
            onError={handleAvatarError}
          />
          <span className="author-info">Por {travelerUsername} • {timeAgo}</span>
          <span className="more-options">...</span>
        </div>

        <p className="feed-card-description-snippet">{description}</p>

        <div className="feed-card-highlights-box">
          <h4 className="highlights-title">Puntos Destacados</h4>
          <div className="highlights-body">
            <div className="highlight-visual-placeholder">
              {/* <img
                src={authorAvatar}
                alt="Avatar del viajero"
                className="profile-avatar"
                onError={handleAvatarError} 
              /> */}
              <img
                    src={trip.traveler.avatar}
                    alt={trip.traveler.username || "Viajero"}
                    className="feed-avatar"
                />
            </div>

            <ul className="highlights-list">
              {highlights.map((point, index) => (
                <li key={index} className="highlight-item">
                  <span className="highlight-icon">
                    {index === 0 ? "📍" : index === 1 ? "⛰️" : "🛶"}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="feed-card-footer-actions">
        <div className="action-item likes">
          <span role="img" aria-label="likes">❤️</span> {likes}
        </div>
        <div className="action-item comments">
          <span role="img" aria-label="comments">💬</span> {comments}
        </div>
        <div className="action-item share">
          <span role="img" aria-label="share">📤</span> Compartir
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
