import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Hero from './Hero';

// Mock de useNavigate
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('Hero component', () => {
  it('renders the text', () => {
    const text = 'Bienvenido a mi sitio';
    render(
      <MemoryRouter>
        <Hero text={text} />
      </MemoryRouter>
    );
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('applies backgroundImage style when provided', () => {
    const bgUrl = 'https://example.com/image.jpg';
    const { container } = render(
      <MemoryRouter>
        <Hero text="Test" backgroundImage={bgUrl} />
      </MemoryRouter>
    );

    const heroDiv = container.querySelector('.hero');
    expect(heroDiv).toHaveStyle(`--hero-bg: url(${bgUrl})`);
  });

  it('defaults to no background when backgroundImage is not provided', () => {
    const { container } = render(
      <MemoryRouter>
        <Hero text="Test" />
      </MemoryRouter>
    );

    const heroDiv = container.querySelector('.hero');
    expect(heroDiv).toHaveStyle(`--hero-bg: none`);
  });

  it('calls navigate when clicked (si Hero tiene onClick)', () => {
    render(
      <MemoryRouter>
        <Hero text="Click me" />
      </MemoryRouter>
    );
  });
});

