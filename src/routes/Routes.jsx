import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "../pages/homePage/HomePage"
import RegistrationPage from "../pages/registration/RegistrationPage";
import LoginPage from "../pages/login/LoginPage";
import AddTripForm from "../pages/tripForm/TripForm";
import TripForm from "../pages/tripForm/TripForm";
import TripPage from "../pages/tripPage/tripPage";
import EditTripForm from "../pages/editTripForm/EditTripForm";
import TravelerProfile from "../pages/travelerProfile/TravelerProfile";
import ExplorePage from "../pages/explorePage/ExplorePage";

import Layout from "../layout/Layout";
import FeedPage from "../pages/feedPage/FeedPage";

export default function AppRoutes () {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/tripForm" element={<TripForm />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/feed/:id" element={<FeedPage/>}></Route>
                <Route path="/trips/:id" element={<TripPage />} />
                <Route path="/trips/:id/edit" element={<EditTripForm />} />
                <Route path="/trips/user/:id" element={<TravelerProfile />} />

            </Route>
        </Routes>  
    );
  
}