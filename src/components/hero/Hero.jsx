import React from 'react';
import './Hero.css';
import Button from '../button/Button';

const Hero = ({ text = "", backgroundImage }) => {
  return (
    <div className='hero' 
    style={{
        '--hero-bg': backgroundImage ? `url(${backgroundImage})` : 'none'
      }}>
        <div className="hero-container">
          <h1 className="hero-title">
            {text}
          </h1>
          <p>La red social definitiva para que los viajeros registren, compartan y descubran nuevos viajes.</p>
        </div>
        <Button text="Comienza tu aventura 🛫" type='primary'></Button>
    </div>
  )
}

export default Hero