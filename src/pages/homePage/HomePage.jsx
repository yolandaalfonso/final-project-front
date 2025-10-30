import React from 'react'
import Hero from '../../components/hero/Hero'
import HeroImg from '../../assets/images/heroImagen.jpg';
import Button from '../../components/button/Button';
import InicialCard from '../../components/inicalCard/InicialCard';


const HomePage = () => {
  return (
    <div>
        <Hero text="Gestiona y comparte"
        backgroundImage={HeroImg}></Hero>
        <Button text="Explora 🌍"></Button>
        <Button text="Comienza tu viaje 🛫" type='secondary'></Button>
    </div>
    <h2>Tu aventura te espera</h2>
    <p>Únete a una comunidad de exploradores y empieza a contruir tus recuerdos</p>
    <InicialCard img = {}></InicialCard>

  )
}

export default HomePage;