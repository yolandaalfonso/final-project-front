import React from "react";
import { NavLink } from "react-router-dom";
import "./HeaderPrivate.css";

export default function HeaderPrivate() {
  return (
    <header className="header-private">
      <div className="header-left">
        <span className="logo-icon">🧭</span>
        <h1 className="logo-text">TravelLog</h1>
      </div>

      <nav className="header-nav">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/explore" className="nav-link">
          Explore
        </NavLink>
        <NavLink to="/tripForm" className="nav-link">
          Create Trip
        </NavLink>
        <NavLink to="/profile" className="nav-link">
          My Profile
        </NavLink>
      </nav>

      <div className="header-right">
        <button className="icon-button notification-btn">
          🔔
        </button>
        <img
          src="https://i.pravatar.cc/40" // puedes cambiar por tu imagen de perfil real
          alt="User avatar"
          className="avatar"
        />
      </div>
    </header>
  );
}
