import React, { useState } from 'react';
import ExploreTripCard from '../../components/exploreTripCard/ExploreTripCard';
import searchIcon from '../../assets/icons/search.png';
import './ExplorePage.css';
import Button from '../../components/button/Button';

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

  // Función para filtrar los viajes
  const filteredTrips = trips.filter(trip => {
    if (!searchQuery.trim()) return true; // Si no hay búsqueda, mostrar todos
    
    const query = searchQuery.toLowerCase();
    const titleMatch = trip.title.toLowerCase().includes(query);
    const locationMatch = trip.location.toLowerCase().includes(query);
    
    return titleMatch || locationMatch;
  });

  return (
    <div className="explore-page">
      {/* Hero Section */}
      <div className="explore-hero">
        <h1 className="explore-title">Encuentra tu próxima aventura</h1>
        <p className="explore-subtitle">Busca viajes por ciudad, país o duración...</p>
        
        <div className="search-container">
          <div className="search-input-wrapper">
            <img src={searchIcon} alt="Search" className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por ciudad, país o región..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button text='Buscar' type='primary'></Button>
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
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="recommendations-section">
        <h2 className="recommendations-title">Recomendaciones para ti</h2>
        
        {/* Mensaje si no hay resultados */}
        {filteredTrips.length === 0 ? (
          <div className="no-results">
            <p>No se encontraron viajes que coincidan con "{searchQuery}"</p>
          </div>
        ) : (
          <div className="trips-grid">
            {filteredTrips.map(trip => (
              <ExploreTripCard key={trip.id} {...trip} />
            ))}
          </div>
        )}

        {filteredTrips.length > 0 && (
          <div className="load-more-container">
            <Button text='Cargar más' type='secondary'></Button>
            {/* <button className="load-more-button">Cargar más</button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;