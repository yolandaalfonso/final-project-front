import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderPublic.css";
import Button from "../button/Button";
import RegistrationPage from "../../pages/registration/RegistrationPage";

export default function HeaderPublic() {

    const navigate = useNavigate();

    const handleRegisterClick = () => navigate("/register");
    const handleLoginClick = () => navigate("/login");

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.svg" alt="WanderLog logo" />
          <span>WanderLog</span>
        </div>

        <ul className="nav-links">
          <li><a href="#explorar">Explorar</a></li>
          <li><a href="#nosotros">Sobre Nosotros</a></li>
        </ul>

        <div className="auth-buttons">
          <Button text="Iniciar Sesión" type="tertiary" onClick={handleLoginClick}></Button>
          <Button text="Registrate" type="primary" onClick={handleRegisterClick} />
        </div>
      </nav>
    </header>
  );
}
