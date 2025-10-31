import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./HeaderPrivate.css";
import "./UserMenu.css"; 

export default function HeaderPrivate() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fallbacks
  const userId = user?.id_user || user?.userId || "";
  const avatarUrl = user?.avatar || "https://goo.su/XF9tCz";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="header-private">
      {/* Izquierda: logo */}
      <div className="header-left" onClick={() => navigate(`/feed/${userId}`)} style={{ cursor: "pointer" }}>
        <span className="logo-icon">🧭</span>
        <h1 className="logo-text">TravelLog</h1>
      </div>

      {/* Centro: navegación */}
      <nav className="header-nav">
        <NavLink to={`/feed/${userId}`} className="nav-link">
          Inicio
        </NavLink>
        <NavLink to="/explore" className="nav-link">
          Explora
        </NavLink>
        <NavLink to="/tripForm" className="nav-link">
          Crea un viaje
        </NavLink>
        <NavLink to={`/trips/user/${userId}`} className="nav-link">
          Mi perfil
        </NavLink>
      </nav>

      {/* Derecha: notificaciones + avatar con menú */}
      <div className="header-right">
        <button className="icon-button notification-btn">🔔</button>

        <div className="avatar-container">
          <img
            src={avatarUrl}
            alt="User avatar"
            className="user-avatar"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate(`/trips/user/${userId}`)}>
                👤 Mi perfil
              </button>
              <button onClick={() => navigate(`/settings`)}>⚙️ Configuración</button>
              <hr />
              <button onClick={handleLogout} className="logout-btn">
                🚪 Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

