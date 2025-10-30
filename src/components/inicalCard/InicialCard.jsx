import React from "react";
import './InicialCard.css'

const InicialCard = ({ img, title = "Registra tus aventuras", text = "Crea un diario digital de tus viajes con fotos, notas y mapas" }) => {

  
    return (
      <div
        className="card-container"
      >
        <div className="card-inicio-logo">
            <img src={img} alt="" />
        </div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    )
  }
  
  export default InicialCard