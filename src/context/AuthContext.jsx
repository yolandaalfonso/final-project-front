import React, { createContext, useState, useEffect, useContext } from "react";
import authService from "../services/auth/AuthService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
          localStorage.setItem("userId", currentUser.id_user);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem("userId");
        }
      } catch (error) {
        console.error("Error comprobando sesión:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);


  const login = async (email, password) => {
    const userData = await authService.loginUser({ email, password });
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("userId", userData.id_user);
  };


  const logout = async () => {
    await authService.logoutUser();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("userId");
  };


  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };


  if (loading) {
    return <div>Cargando sesión...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};