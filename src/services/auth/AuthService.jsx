import AuthRepository from "../../repositories/auth/AuthRepository";

class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async loginUser(credentials) {
    try {
      const response = await this.authRepository.login(credentials);

      // 👇 Supongamos que el backend devuelve { token: "xxxx", userId: "..." }
      if (response && response.token) {
        localStorage.setItem("authToken", response.token);
        console.log("✅ Token guardado en localStorage");
      }

      return response;
    } catch (error) {
      console.error("❌ Error en AuthService.loginUser:", error);
      throw error;
    }
  }
  

  /* // 🔹 Registro de usuario
  async registerUser(data) {
    try {
      const response = await this.authRepository.register(data);
      return response;
    } catch (error) {
      console.error("Error en AuthService.registerUser:", error);
      throw error;
    }
  } */

  // 🔹 Para cerrar sesión
  logout() {
    localStorage.removeItem("authToken");
    console.log("🚪 Sesión cerrada");
  }

  // 🔹 Para obtener el token cuando lo necesites
  getToken() {
    return localStorage.getItem("authToken");
  }

}

export default AuthService;

