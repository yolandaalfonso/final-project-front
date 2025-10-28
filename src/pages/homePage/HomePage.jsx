import React from 'react'
import Hero from '../../components/hero/Hero'
import HeroImg from '../../assets/images/heroImagen.jpg';
import Button from '../../components/button/Button';


const HomePage = () => {
  return (
    <div>
        <Hero text="Gestiona y comparte"
        backgroundImage={HeroImg}></Hero>
        <Button text="Explora 🌍"></Button>
        <Button text="Comienza tu viaje 🛫" type='secondary'></Button>
    </div>
  )
}

export default HomePage;