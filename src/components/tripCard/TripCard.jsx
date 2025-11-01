import React from "react";
import { useNavigate } from "react-router-dom";
import "./TripCard.css";

export default function TripCard({ trip }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/trips/${trip.id_trip}`);
  };

  return (
    <div className="trip-card" onClick={handleClick}>
      <div className="trip-image-container">
        <img
          src={trip.images?.[0]?.url || "/images/default-trip.jpg"}
          alt={trip.title}
          className="trip-image"
        />
        <div className="trip-title-overlay">
          <h3>{trip.title}</h3>
        </div>
      </div>
    </div>
  );
}
