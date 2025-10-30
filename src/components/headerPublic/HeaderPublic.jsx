import React from "react";
import "./HeaderPublic.css";

export default function HeaderPublic() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.svg" alt="WanderLog" />
          <span>WanderLog</span>
        </div>

        <ul className="nav-links">
          <li><a href="#explorar">Explorar</a></li>
          <li><a href="#nosotros">Sobre Nosotros</a></li>
        </ul>

        <div className="auth-buttons">
          <button className="btn-outline">Iniciar Sesión</button>
          <button className="btn-primary">Registrarse</button>
        </div>
      </nav>
    </header>
  );
}
