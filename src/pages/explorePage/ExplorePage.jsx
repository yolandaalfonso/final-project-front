
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ExploreTripCard from './ExploreTripCard';
import './ExplorePage.css';

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const trips = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
      title: 'Aventura Romántica en París',
      location: 'París, Francia',
      creator: 'Ana García',
      creatorAvatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      title: 'Trekking en los Alpes',
      location: 'Interlaken, Suiza',
      creator: 'Carlos Ruiz',
      creatorAvatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      title: 'Relax y Yoga en Bali',
      location: 'Ubud, Indonesia',
      creator: 'Sofía Chen',
      creatorAvatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
      title: 'Neón y Tradición en Tokio',
      location: 'Tokio, Japón',
      creator: 'David Kim',
      creatorAvatar: 'https://i.pravatar.cc/150?img=4'
    }
  ];

  return (
    <div className="explore-page">
      {/* Hero Section */}
      <div className="explore-hero">
        <h1 className="explore-title">Encuentra tu Próxima Aventura</h1>
        <p className="explore-subtitle">Busca viajes por ciudad, país o región...</p>
        
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por ciudad, país o región..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="search-button">Buscar</button>
        </div>

        {/* Filters */}
        <div className="filters-container">
          <select className="filter-select">
            <option>Duración</option>
            <option>1-3 días</option>
            <option>4-7 días</option>
            <option>Más de 7 días</option>
          </select>
          
          <select className="filter-select">
            <option>Tipo de Viaje</option>
            <option>Aventura</option>
            <option>Relax</option>
            <option>Cultural</option>
            <option>Naturaleza</option>
          </select>
          
          <select className="filter-select">
            <option>Presupuesto</option>
            <option>Económico</option>
            <option>Medio</option>
            <option>Premium</option>
          </select>
          
          <select className="filter-select">
            <option>Puntuación</option>
            <option>5 estrellas</option>
            <option>4+ estrellas</option>
            <option>3+ estrellas</option>
          </select>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="recommendations-section">
        <h2 className="recommendations-title">Recomendaciones para ti</h2>
        
        <div className="trips-grid">
          {trips.map(trip => (
            <ExploreTripCard key={trip.id} {...trip} />
          ))}
        </div>

        <div className="load-more-container">
          <button className="load-more-button">Cargar más</button>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;