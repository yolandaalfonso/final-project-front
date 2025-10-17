import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero component', () => {
  it('renders the text', () => {
    const text = 'Bienvenido a mi sitio';
    render(<Hero text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('applies backgroundImage style when provided', () => {
    const bgUrl = 'https://example.com/image.jpg';
    const { container } = render(<Hero text="Test" backgroundImage={bgUrl} />);
    
    const heroDiv = container.querySelector('.hero');
    expect(heroDiv).toHaveStyle(`--hero-bg: url(${bgUrl})`);
  });

  it('defaults to no background when backgroundImage is not provided', () => {
    const { container } = render(<Hero text="Test" />);
    
    const heroDiv = container.querySelector('.hero');
    expect(heroDiv).toHaveStyle(`--hero-bg: none`);
  });
});
