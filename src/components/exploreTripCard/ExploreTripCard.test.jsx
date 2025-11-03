import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ExploreTripCard from './ExploreTripCard';

describe('ExploreTripCard Component', () => {
  const mockProps = {
    image: 'https://example.com/trip-image.jpg',
    title: 'Viaje a París',
    location: 'París, Francia',
    creator: 'Juan Pérez',
    creatorAvatar: 'https://example.com/avatar.jpg',
  };

  it('debería renderizar correctamente con todas las props', () => {
    render(<ExploreTripCard {...mockProps} />);

    expect(screen.getByText('Viaje a París')).toBeInTheDocument();
    expect(screen.getByText('París, Francia')).toBeInTheDocument();
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
  });

  it('debería mostrar la imagen del viaje con el alt correcto', () => {
    render(<ExploreTripCard {...mockProps} />);

    const tripImage = screen.getByAltText('Viaje a París');
    expect(tripImage).toBeInTheDocument();
    expect(tripImage).toHaveAttribute('src', mockProps.image);
    expect(tripImage).toHaveClass('trip-card-image');
  });

  it('debería mostrar el avatar del creador con el alt correcto', () => {
    render(<ExploreTripCard {...mockProps} />);

    const avatarImage = screen.getByAltText('Juan Pérez');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', mockProps.creatorAvatar);
    expect(avatarImage).toHaveClass('creator-avatar');
  });

  it('debería renderizar los botones de acción', () => {
    render(<ExploreTripCard {...mockProps} />);

    const likeButton = screen.getByRole('button', { name: /me gusta/i });
    const saveButton = screen.getByRole('button', { name: /guardar/i });

    expect(likeButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  it('debería alternar el estado de "like" al hacer clic', async () => {
    const user = userEvent.setup();
    render(<ExploreTripCard {...mockProps} />);

    const likeButton = screen.getByRole('button', { name: /me gusta/i });

    // Inicialmente no está activo
    expect(likeButton).not.toHaveClass('active');

    // Click para activar
    await user.click(likeButton);
    expect(likeButton).toHaveClass('active');

    // Click para desactivar
    await user.click(likeButton);
    expect(likeButton).not.toHaveClass('active');
  });

  it('debería alternar el estado de "guardar" al hacer clic', async () => {
    const user = userEvent.setup();
    render(<ExploreTripCard {...mockProps} />);

    const saveButton = screen.getByRole('button', { name: /guardar/i });

    // Inicialmente no está activo
    expect(saveButton).not.toHaveClass('active');

    // Click para activar
    await user.click(saveButton);
    expect(saveButton).toHaveClass('active');

    // Click para desactivar
    await user.click(saveButton);
    expect(saveButton).not.toHaveClass('active');
  });

  it('debería mantener estados independientes para like y save', async () => {
    const user = userEvent.setup();
    render(<ExploreTripCard {...mockProps} />);

    const likeButton = screen.getByRole('button', { name: /me gusta/i });
    const saveButton = screen.getByRole('button', { name: /guardar/i });

    // Activar like
    await user.click(likeButton);
    expect(likeButton).toHaveClass('active');
    expect(saveButton).not.toHaveClass('active');

    // Activar save
    await user.click(saveButton);
    expect(likeButton).toHaveClass('active');
    expect(saveButton).toHaveClass('active');

    // Desactivar like, save debe permanecer activo
    await user.click(likeButton);
    expect(likeButton).not.toHaveClass('active');
    expect(saveButton).toHaveClass('active');
  });

  it('debería tener la estructura CSS correcta', () => {
    render(<ExploreTripCard {...mockProps} />);

    const card = document.querySelector('.trip-card');
    const imageContainer = document.querySelector('.trip-card-image-container');
    const content = document.querySelector('.trip-card-content');
    const actions = document.querySelector('.trip-card-actions');

    expect(card).toBeInTheDocument();
    expect(imageContainer).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(actions).toBeInTheDocument();
  });

  it('debería renderizar los iconos de acción', () => {
    render(<ExploreTripCard {...mockProps} />);

    const likeIcon = screen.getByAltText('Like');
    const bookmarkIcon = screen.getByAltText('Bookmark');

    expect(likeIcon).toBeInTheDocument();
    expect(likeIcon).toHaveClass('action-icon');
    expect(bookmarkIcon).toBeInTheDocument();
    expect(bookmarkIcon).toHaveClass('action-icon');
  });

  it('debería mostrar información del creador correctamente', () => {
    render(<ExploreTripCard {...mockProps} />);

    const creatorSection = document.querySelector('.trip-card-creator');
    expect(creatorSection).toBeInTheDocument();

    const creatorName = document.querySelector('.creator-name');
    expect(creatorName).toHaveTextContent('Juan Pérez');
  });
});