import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#sobre">Sobre Nosotros</a>
        <a href="#contacto">Contacto</a>
        <a href="#privacidad">Política de Privacidad</a>
        <a href="#terminos">Términos de Servicio</a>
      </div>

      <div className="footer-icons">
        <i className="fab fa-instagram"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-facebook"></i>
      </div>

      <p className="footer-copy">© 2025 XXXXXX. Todos los derechos reservados.</p>
    </footer>
  );
}
