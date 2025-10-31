import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderPublic from "../components/headerPublic/HeaderPublic";
import HeaderPrivate from "../components/headerPrivate/HeaderPrivate";
import Footer from "../components/footer/Footer";

export default function Layout() {
  const location = useLocation();
  const publicRoutes = ["/", "/login", "/register"];
  const isPublic = publicRoutes.includes(location.pathname);

  return (
    <>
      {isPublic ? <HeaderPublic /> : <HeaderPrivate />}
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
