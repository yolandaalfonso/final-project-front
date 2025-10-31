import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./HeaderPrivate.css";

export default function HeaderPrivate() {

const { user } = useAuth();

//fallback para evitar errores si user es null
  const userId = user?.id_user || user?.userId || ""; 
  const avatarUrl = user?.avatar || "https://goo.su/XF9tCz";


  return (
    <header className="header-private">
      <div className="header-left">
        <span className="logo-icon">🧭</span>
        <h1 className="logo-text">TravelLog</h1>
      </div>

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
        <NavLink to={`/trips/user/${user.id_user}`} className="nav-link">
          Mi perfil
        </NavLink>
      </nav>

      <div className="header-right">
        <button className="icon-button notification-btn">
          🔔
        </button>
        <img
           src={avatarUrl}// puedes cambiar por tu imagen de perfil real
          alt="User avatar"
          className="avatar"
        />
      </div>
    </header>
  );
}
