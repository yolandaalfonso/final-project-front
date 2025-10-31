import React from "react";
import "./TripCard.css";

export default function TripCard({ trip }) {
  return (
    <div className="trip-card">
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
