import axios from 'axios';

class AuthRepository {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL, // por ejemplo: "http://localhost:8080/api"
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  // 🔹 LOGIN → pide el token al backed
  async login(credentials) {
    try {
      const response = await this.api.post("/auth/login", credentials);
  
      // Validar que la respuesta tenga los datos esperados
      if (!response.data || !response.data.idToken) {
        console.error("❌ Respuesta inesperada del backend:", response.data);
        throw new Error("No se recibió un token válido del servidor");
      }
  
      // 🔹 Normalizamos la respuesta para el resto del front
      const token = response.data.idToken;
      const refreshToken = response.data.refreshToken;

      return {
        token,
        refreshToken,
        user: { email: credentials.email },
      };
    } catch (error) {
      // Captura el mensaje de error del backend si existe
      const message = error.response?.data?.error || error.message || "Error al iniciar sesión";
      console.error("❌ Error en AuthRepository.login:", message);
      throw new Error(message);
    }
  }
  

  /* // 🔹 REGISTER → crear nuevo usuario
  async register(data) {
    try {
      const response = await this.api.post("/auth/register", data);
      return response.data;
    } catch (error) {
      console.error("❌ Error en AuthRepository.register:", error);
      throw new Error(error.response?.data?.message || "Error al registrar usuario");
    }
  } */

  // 🔹 GET CURRENT USER → usando el token JWT guardado
  async getCurrentUser(token) {
    try {
      const response = await this.api.get("/auth/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("❌ Error en AuthRepository.getCurrentUser:", error);
      return null;
    }
  }

  // 🔹 LOGOUT → opcional (dependiendo de si tu backend invalida tokens)
  async logout() {
    try {
      await this.api.post("/auth/logout");
      console.log("✅ Logout correcto");
    } catch (error) {
      console.error("❌ Error en AuthRepository.logout:", error);
      throw new Error("Error al cerrar sesión");
    }
  }
}

export default AuthRepository;
