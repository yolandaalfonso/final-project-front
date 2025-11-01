import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderPublic from "../components/headerPublic/HeaderPublic";
import HeaderPrivate from "../components/headerPrivate/HeaderPrivate";
import Footer from "../components/footer/Footer";

export default function Layout() {
  const location = useLocation();

  // Rutas donde NO queremos mostrar header ni footer
  const hideLayoutRoutes = ["/login", "/register"];

  const publicRoutes = ["/"];

  const isHidden = hideLayoutRoutes.includes(location.pathname);
  const isPublic = publicRoutes.includes(location.pathname);

  return (
    <>
      {!isHidden && (isPublic ? <HeaderPublic /> : <HeaderPrivate />)}
      <main className="main-content">
        <Outlet />
      </main>
      {!isHidden && <Footer />}
    </>
  );
}
