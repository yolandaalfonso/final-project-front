import React from 'react'
import Hero from '../../components/hero/Hero'
import HeroImg from '../../assets/images/heroImagen.jpg';
import Button from '../../components/button/Button';
import InicialCard from '../../components/inicalCard/InicialCard';

import mapIcon from '../../assets/icons/map.png'
import friendsIcon from '../../assets/icons/friends.png'
import compassIcon from '../../assets/icons/compass.png'


const HomePage = () => {
  return (
    <div>
        <Hero text="Gestiona y comparte"
        backgroundImage={HeroImg}></Hero>
        <Button text="Explora 🌍"></Button>
        <Button text="Comienza tu viaje 🛫" type='secondary'></Button>
    
      <h2>Tu aventura te espera</h2>
      <p>Únete a una comunidad de exploradores y empieza a contruir tus recuerdos</p>
      <div className='card-home-container'>
        <InicialCard img = {mapIcon}></InicialCard>
        <InicialCard img = {friendsIcon} title='Conecta con amigos' text='Sigue a amigos y otros viajeros para ver donde han estado y planear tu próxima escapada'></InicialCard>
        <InicialCard img = {compassIcon} title='Explora nuevos destinos' text='Encuentra inspiración para tu próximo viaje'></InicialCard>
      </div>
    </div>

  )
}

export default HomePage;