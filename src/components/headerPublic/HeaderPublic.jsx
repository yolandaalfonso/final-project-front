import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderPublic.css";
import Button from "../button/Button";
import RegistrationPage from "../../pages/registration/RegistrationPage";
import logo from "../../assets/logo/compass-logo.png";
import logo1 from "../../assets/logo/photos-logo.png";
import logo2 from "../../assets/logo/postal-logo.png";
import logo3 from "../../assets/logo/world-logo.png";
import logo4 from "../../assets/logo/stamp-logo.png";

export default function HeaderPublic() {

    const navigate = useNavigate();

    const handleRegisterClick = () => navigate("/register");
    const handleLoginClick = () => navigate("/login");

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          {/* Izquierda: logo */}
          <img src={logo4} alt="Triply Logo" className="logo-image" />
        </div>

        {/* <ul className="nav-links">
          <li><a href="#explorar">Explorar</a></li>
          <li><a href="#nosotros">Sobre Nosotros</a></li>
        </ul> */}

        <div className="auth-buttons">
          <Button text="Iniciar Sesión" type="tertiary" onClick={handleLoginClick}></Button>
          <Button text="Registrate" type="primary" onClick={handleRegisterClick} />
        </div>
      </nav>
    </header>
  );
}
