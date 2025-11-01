import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FeedCard from './FeedCard';

describe('FeedCard Component', () => {
  const mockTrip = {
    title: 'Aventura en los Alpes',
    description: 'Un viaje increíble por las montañas suizas',
    travelerUsername: 'JuanViajero',
    images: [
      { url: 'https://example.com/image1.jpg' },
      { url: 'https://example.com/image2.jpg' }
    ],
    country: ['Suiza', 'Francia', 'Italia', 'Alemania'],
    traveler: {
      avatar: 'https://example.com/avatar.jpg'
    }
  };

  it('debería renderizar correctamente con todos los datos', () => {
    render(<FeedCard trip={mockTrip} />);

    expect(screen.getByText('Aventura en los Alpes')).toBeInTheDocument();
    expect(screen.getByText('Un viaje increíble por las montañas suizas')).toBeInTheDocument();
    expect(screen.getByText(/JuanViajero/)).toBeInTheDocument();
  });

  it('debería mostrar la imagen principal correctamente', () => {
    render(<FeedCard trip={mockTrip} />);

    const mainImage = screen.getByAltText('Aventura en los Alpes');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', 'https://example.com/image1.jpg');
    expect(mainImage).toHaveClass('feed-card-main-image');
  });

  it('debería mostrar el avatar del autor', () => {
    render(<FeedCard trip={mockTrip} />);

    const avatar = screen.getByAltText('JuanViajero');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(avatar).toHaveClass('author-avatar-small');
  });

  it('debería mostrar puntos destacados (máximo 3)', () => {
    render(<FeedCard trip={mockTrip} />);

    expect(screen.getByText('Puntos Destacados')).toBeInTheDocument();
    expect(screen.getByText('Suiza')).toBeInTheDocument();
    expect(screen.getByText('Francia')).toBeInTheDocument();
    expect(screen.getByText('Italia')).toBeInTheDocument();
    // No debe mostrar el cuarto país
    expect(screen.queryByText('Alemania')).not.toBeInTheDocument();
  });

  it('debería manejar country como string separado por comas', () => {
    const tripWithStringCountry = {
      ...mockTrip,
      country: 'España, Portugal, Marruecos'
    };

    render(<FeedCard trip={tripWithStringCountry} />);

    expect(screen.getByText('España')).toBeInTheDocument();
    expect(screen.getByText('Portugal')).toBeInTheDocument();
    expect(screen.getByText('Marruecos')).toBeInTheDocument();
  });

  it('debería mostrar valores por defecto cuando faltan datos', () => {
    const emptyTrip = {};

    render(<FeedCard trip={emptyTrip} />);

    expect(screen.getByText('Viaje Sin Título')).toBeInTheDocument();
    expect(screen.getByText('Un viaje increíble explorando el mundo.')).toBeInTheDocument();
    expect(screen.getByText(/Viajero Anónimo/)).toBeInTheDocument();
  });

  it('debería usar imagen por defecto cuando no hay imágenes', () => {
    const tripWithoutImages = {
      ...mockTrip,
      images: []
    };

    render(<FeedCard trip={tripWithoutImages} />);

    const mainImage = screen.getByAltText('Aventura en los Alpes');
    expect(mainImage).toHaveAttribute('src', '/images/default-feed.jpg');
  });

  it('debería usar avatar por defecto cuando no hay traveler', () => {
    const tripWithoutTraveler = {
      ...mockTrip,
      traveler: null
    };

    render(<FeedCard trip={tripWithoutTraveler} />);

    const avatar = screen.getByAltText('JuanViajero');
    expect(avatar).toHaveAttribute('src', '/avatars/default-avatar.png');
  });

  it('debería mostrar las acciones del footer', () => {
    render(<FeedCard trip={mockTrip} />);

    expect(screen.getByText('1.2K Likes')).toBeInTheDocument();
    expect(screen.getByText('89 Comentarios')).toBeInTheDocument();
    expect(screen.getByText('Compartir')).toBeInTheDocument();
  });

  it('debería renderizar los emojis de acciones correctamente', () => {
    render(<FeedCard trip={mockTrip} />);

    const likesEmoji = screen.getByRole('img', { name: /likes/i });
    const commentsEmoji = screen.getByRole('img', { name: /comments/i });
    const shareEmoji = screen.getByRole('img', { name: /share/i });

    expect(likesEmoji).toBeInTheDocument();
    expect(commentsEmoji).toBeInTheDocument();
    expect(shareEmoji).toBeInTheDocument();
  });

  it('debería mostrar el timestamp', () => {
    render(<FeedCard trip={mockTrip} />);

    expect(screen.getByText(/Hace 2 horas/)).toBeInTheDocument();
  });

  it('debería tener la estructura CSS correcta', () => {
    render(<FeedCard trip={mockTrip} />);

    const container = document.querySelector('.feed-card-container');
    const imageBox = document.querySelector('.feed-card-image-box');
    const contentArea = document.querySelector('.feed-card-content-area');
    const footer = document.querySelector('.feed-card-footer-actions');
    const highlightsBox = document.querySelector('.feed-card-highlights-box');

    expect(container).toBeInTheDocument();
    expect(imageBox).toBeInTheDocument();
    expect(contentArea).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(highlightsBox).toBeInTheDocument();
  });

  it('debería mostrar los iconos de highlights', () => {
    render(<FeedCard trip={mockTrip} />);

    const highlightItems = document.querySelectorAll('.highlight-item');
    expect(highlightItems).toHaveLength(3);

    const icons = document.querySelectorAll('.highlight-icon');
    expect(icons).toHaveLength(3);
  });

  it('debería manejar array vacío de países sin errores', () => {
    const tripWithEmptyCountry = {
      ...mockTrip,
      country: []
    };

    render(<FeedCard trip={tripWithEmptyCountry} />);

    expect(screen.getByText('Puntos Destacados')).toBeInTheDocument();
    const highlightItems = document.querySelectorAll('.highlight-item');
    expect(highlightItems).toHaveLength(0);
  });

  it('debería renderizar correctamente con datos parciales', () => {
    const partialTrip = {
      title: 'Viaje Corto',
      images: [{ url: 'https://example.com/image.jpg' }]
    };

    render(<FeedCard trip={partialTrip} />);

    expect(screen.getByText('Viaje Corto')).toBeInTheDocument();
    expect(screen.getByText('Un viaje increíble explorando el mundo.')).toBeInTheDocument();
    expect(screen.getByText(/Viajero Anónimo/)).toBeInTheDocument();
  });
});