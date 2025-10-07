import React from "react";
import './Button.css'

const Button = ({ text = "Buscar", type = "primary", onClick }) => {

  
    return (
      <button
        className={`button ${type}`} onClick={onClick}
      >
        {text}
      </button>
    )
  }
  
  export default Button