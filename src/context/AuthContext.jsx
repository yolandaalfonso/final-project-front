import React, { createContext, useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AuthService from "../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apliClient"; // 👈 importante: tu cliente axios configurado

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const authService = new AuthService();
  const auth = getAuth();

  useEffect(() => {
    // 👇 Se ejecuta cada vez que cambia el estado en Firebase (login/logout/refresh)
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // ✅ Obtén el UID del usuario autenticado en Firebase
          const uid = firebaseUser.uid;

          // 🔎 Llama a tu backend para obtener los datos completos del usuario
          const res = await apiClient.get(`/users/byUid/${uid}`);

          // 📦 Guarda el usuario completo (con avatar)
          setUser(res.data);
          setIsAuthenticated(true);

          // 🧠 Guarda su ID en localStorage para otros componentes
          localStorage.setItem("userId", res.data.id_user);
        } catch (error) {
          console.error("❌ Error obteniendo usuario del backend:", error);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        // Si no hay usuario autenticado en Firebase
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("userId");
      }

      setLoading(false);
    });

    // Limpieza al desmontar el componente
    return () => unsubscribe();
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    try {
      const userData = await authService.loginUser({ email, password });

      if (userData?.uid) {
        const res = await apiClient.get(`/users/byUid/${userData.uid}`);
        setUser(res.data);
        setIsAuthenticated(true);
        localStorage.setItem("userId", res.data.id_user);
      }
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      await authService.logout();
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

