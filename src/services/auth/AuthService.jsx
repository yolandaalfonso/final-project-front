// src/services/auth/AuthService.jsx
import AuthRepository from "../../repositories/auth/AuthRepository";

class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  // 🔹 Login de usuario
  async loginUser(credentials) {
    try {
      const response = await this.authRepository.login(credentials);

      // response debe incluir el token y datos del usuario
      const { token, user } = response;

      // Guarda el token en localStorage
      localStorage.setItem("token", token);

      return user;
    } catch (error) {
      console.error("Error en AuthService.loginUser:", error);
      throw error;
    }
  }

  // 🔹 Registro de usuario
  async registerUser(data) {
    try {
      const response = await this.authRepository.register(data);
      return response;
    } catch (error) {
      console.error("Error en AuthService.registerUser:", error);
      throw error;
    }
  }

  // 🔹 Obtener usuario actual (si el token sigue siendo válido)
  async getCurrentUser() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const user = await this.authRepository.getCurrentUser(token);
      return user;
    } catch (error) {
      console.error("Error en AuthService.getCurrentUser:", error);
      return null;
    }
  }

  // 🔹 Cerrar sesión
  async logoutUser() {
    try {
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error en AuthService.logoutUser:", error);
    }
  }
}

const authService = new AuthService();
export default authService;

