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

  // 🔹 LOGIN → el backend genera el token JWT
  async login(credentials) {
    try {
      const response = await this.api.post("/auth/login", credentials);
      // el backend debe devolver { token, user }
      return response.data;
    } catch (error) {
      console.error("❌ Error en AuthRepository.login:", error);
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  }

  // 🔹 REGISTER → crear nuevo usuario
  async register(data) {
    try {
      const response = await this.api.post("/auth/register", data);
      return response.data;
    } catch (error) {
      console.error("❌ Error en AuthRepository.register:", error);
      throw new Error(error.response?.data?.message || "Error al registrar usuario");
    }
  }

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
