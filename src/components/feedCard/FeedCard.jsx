import React from 'react';
import './FeedCard.css';

const FeedCard = ({ trip }) => {
  
  // Desestructuración y asignación de fallbacks
  const { 
    title = "Viaje Sin Título", 
    description = "Un viaje increíble explorando el mundo.", 
    travelerUsername = "Viajero Anónimo",
    // Asumimos que el array de imágenes existe, si no, fallback
    images = [],
    // Asumimos que el array de países/puntos visitados es 'country'
    country = []
  } = trip;

  // Extracción de datos complejos
  const mainImage = images[0]?.url || "/images/default-feed.jpg";
  const authorAvatar = trip.traveler?.avatar || "/avatars/default-avatar.png";
  
  // Puntos destacados (los 3 primeros, si es un array)
  const highlights = Array.isArray(country) ? country.slice(0, 3) : [];

  // Datos de interacción (ejemplo simple, usa los datos reales si los recibes en 'trip')
  const likes = "1.2K Likes";
  const comments = "89 Comentarios";
  const timeAgo = "Hace 2 horas"; // Simulado

  return (
    <div className="feed-card-container">
      
      {/* ---------- IMAGEN PRINCIPAL ---------- */}
      <div className="feed-card-image-box">
        <img src={mainImage} alt={title} className="feed-card-main-image" />
      </div>

      {/* ---------- CONTENIDO Y TEXTOS ---------- */}
      <div className="feed-card-content-area">
        
        <h2 className="feed-card-title">{title}</h2>
        
        {/* Metadatos del autor */}
        <div className="feed-card-meta">
          <img src={authorAvatar} alt={travelerUsername} className="author-avatar-small" />
          <span className="author-info">Por **{travelerUsername}** • {timeAgo}</span>
          <span className="more-options">...</span>
        </div>

        {/* Descripción corta */}
        <p className="feed-card-description-snippet">{description}</p>

        {/* ---------- PUNTOS DESTACADOS (Highlights) ---------- */}
        <div className="feed-card-highlights-box">
          <h4 className="highlights-title">Puntos Destacados</h4>
          <div className="highlights-body">
            
            {/* Avatar para el highlight (usando placeholder/imagen local) */}
            {/*  */}
            <div className="highlight-visual-placeholder">
                {/* Puedes poner aquí una imagen que hayas guardado localmente */}
            </div>
            
            <ul className="highlights-list">
              {highlights.map((point, index) => (
                <li key={index} className="highlight-item">
                  {/* Íconos simples */}
                  <span className="highlight-icon">
                    {index === 0 ? '📍' : index === 1 ? '⛰️' : '🛶'} 
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- PIE DE PÁGINA / ACCIONES ---------- */}
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