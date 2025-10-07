import React from 'react'
import Hero from '../../components/hero/Hero'
import HeroImg from '../../assets/images/heroImagen.jpg';


const HomePage = () => {
  return (
    <div>
        <Hero text="Gestiona y comparte"
        backgroundImage={HeroImg}></Hero>
    </div>
  )
}

export default HomePage;