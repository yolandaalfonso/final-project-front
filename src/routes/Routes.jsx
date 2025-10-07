import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "../pages/homePage/HomePage"

export default function AppRoutes () {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
         {/*  <Route path="/" element={<Home />} /> */}
          
          </Routes>  
    )
  
}