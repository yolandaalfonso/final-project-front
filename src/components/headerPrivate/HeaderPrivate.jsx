import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./HeaderPrivate.css";
import "./UserMenu.css"; 
import logo from "../../assets/logo/compass-logo.png";
import logo1 from "../../assets/logo/photos-logo.png";
import logo2 from "../../assets/logo/postal-logo.png";
import logo3 from "../../assets/logo/world-logo.png";
import logo4 from "../../assets/logo/stamp-logo.png";

export default function HeaderPrivate() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
  
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
      <div className="header-container">
        {/* Izquierda: logo */}
        <div
          className="header-left"
          onClick={() => navigate(`/feed/${userId}`)}
          style={{ cursor: "pointer" }}
        >
          <img src={logo3} alt="Triply Logo" className="logo-image" />
        </div>

        {/* Centro: navegación */}
        <nav className="header-nav">
          <NavLink to={`/feed/${userId}`} className="nav-link">Inicio</NavLink>
          <NavLink to="/explore" className="nav-link">Explora</NavLink>
          <NavLink to="/tripForm" className="nav-link">Crea un viaje</NavLink>
          <NavLink to={`/trips/user/${userId}`} className="nav-link">Mi perfil</NavLink>
        </nav>

        {/* Derecha: notificaciones + avatar */}
        <div className="header-right">
          <div className="avatar-container">
            <img
              src={avatarUrl}
              alt="User avatar"
              className="user-avatar"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="dropdown-menu">
                <button onClick={() => navigate(`/trips/user/${userId}`)}>👤 Mi perfil</button>
                <button onClick={() => navigate(`/explore`)}>🌍 Explora</button>
                <button onClick={() => navigate(`/settings`)}>⚙️ Configuración</button>
                <hr />
                <button onClick={handleLogout} className="logout-btn">🚪 Cerrar sesión</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
      
}

