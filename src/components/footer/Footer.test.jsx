import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer Component', () => {
  it('debería renderizar correctamente', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('debería mostrar todos los enlaces de navegación', () => {
    render(<Footer />);
    
    expect(screen.getByText('Sobre Nosotros')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
    expect(screen.getByText('Política de Privacidad')).toBeInTheDocument();
    expect(screen.getByText('Términos de Servicio')).toBeInTheDocument();
  });

  it('debería tener los enlaces con los href correctos', () => {
    render(<Footer />);
    
    const sobreLink = screen.getByText('Sobre Nosotros').closest('a');
    const contactoLink = screen.getByText('Contacto').closest('a');
    const privacidadLink = screen.getByText('Política de Privacidad').closest('a');
    const terminosLink = screen.getByText('Términos de Servicio').closest('a');
    
    expect(sobreLink).toHaveAttribute('href', '#sobre');
    expect(contactoLink).toHaveAttribute('href', '#contacto');
    expect(privacidadLink).toHaveAttribute('href', '#privacidad');
    expect(terminosLink).toHaveAttribute('href', '#terminos');
  });

  it('debería mostrar los iconos de redes sociales', () => {
    render(<Footer />);
    
    const instagramIcon = document.querySelector('.fab.fa-instagram');
    const twitterIcon = document.querySelector('.fab.fa-twitter');
    const facebookIcon = document.querySelector('.fab.fa-facebook');
    
    expect(instagramIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(facebookIcon).toBeInTheDocument();
  });

  it('debería mostrar el texto de copyright', () => {
    render(<Footer />);
    
    const copyright = screen.getByText(/© 2025 XXXXXX. Todos los derechos reservados./i);
    expect(copyright).toBeInTheDocument();
  });

  it('debería tener la clase CSS correcta', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('footer');
  });
});