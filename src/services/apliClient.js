// src/services/apiClient.js
import axios from "axios";
import { auth } from "./firebase"; // usa el que ya tienes

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    if (user) {
      // 🔁 Fuerza obtener un token nuevo cada vez
      const freshToken = await user.getIdToken(true);
      localStorage.setItem("token", freshToken);
      config.headers.Authorization = `Bearer ${freshToken}`;
      console.log("✅ Token renovado y enviado");
    } else {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;

