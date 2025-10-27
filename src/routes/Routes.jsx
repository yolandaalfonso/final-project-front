import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "../pages/homePage/HomePage"
import RegistrationPage from "../pages/registration/RegistrationPage";
import LoginPage from "../pages/login/LoginPage";
import AddTripForm from "../pages/tripForm/TripForm";
import TripForm from "../pages/tripForm/TripForm";
import TripPage from "../pages/tripPage/tripPage";

export default function AppRoutes () {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tripForm" element={<TripForm />} />
          <Route path="/trips/:id" element={<TripPage />} />
         {/*  <Route path="/" element={<Home />} /> */}
          
          </Routes>  
    )
  
}