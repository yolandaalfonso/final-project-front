import React, { createContext, useState, useEffect, useContext } from "react";
import AuthService from "../services/auth/AuthService"; // 👈 CAMBIO: Importa la clase, no la instancia
import { getAuth } from "firebase/auth";

import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 👇 Crea una instancia de la clase AuthService
  const authService = new AuthService();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await authService.getToken();
        if (token) {
          // Si tienes un endpoint para obtener el usuario actual
          const currentUser = await authService.authRepository.getCurrentUser(token);
          if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
            localStorage.setItem("userId", currentUser.id_user || currentUser.userId);
          }
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

    const interval = setInterval(async () => {
      const newToken = await authService.refreshToken();
      if (newToken) {
        console.log("🔁 Token Firebase renovado automáticamente");
      }
    }, 50 * 60 * 1000); // cada 50 minutos
    
  
    return () => clearInterval(interval);

    
  }, []);

  const login = async (email, password) => {
    try {
      // ✅ Llama a la función de AuthService correctamente
      const userData = await authService.loginUser({ email, password });
      setUser(userData);
      setIsAuthenticated(true);
      if (userData.id_user || userData.userId) {
        localStorage.setItem("userId", userData.id_user || userData.userId);
      }
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout(); // 👈 importante el await
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("userId");
      navigate("/login");
    }
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
