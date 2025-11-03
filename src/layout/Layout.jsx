import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderPublic from "../components/headerPublic/HeaderPublic";
import HeaderPrivate from "../components/headerPrivate/HeaderPrivate";
import Footer from "../components/footer/Footer";
import "./Layout.css";

export default function Layout() {
  const location = useLocation();

  const hideLayoutRoutes = ["/login", "/register"];
  const publicRoutes = ["/"];
  const isHidden = hideLayoutRoutes.includes(location.pathname);
  const isPublic = publicRoutes.includes(location.pathname);

  return (
    <>
      {!isHidden && (
        <header className="layout-header">
          {isPublic ? <HeaderPublic /> : <HeaderPrivate />}
        </header>
      )}

      <main className="layout-main">
        <Outlet />
      </main>

      {!isHidden && (
        <footer className="layout-footer">
          <Footer />
        </footer>
      )}
    </>
  );
}

