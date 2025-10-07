import React from 'react';
import './Hero.css';

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
        </div>
    </div>
  )
}

export default Hero