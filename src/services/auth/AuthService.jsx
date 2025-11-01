import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
/* import { app } from "../../firebase/config"; */
import { auth } from "../firebase";
import AuthRepository from "../../repositories/auth/AuthRepository";
import apiClient from "../apliClient";

class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
    /* this.auth = getAuth(app); */ 
    this.auth = auth;
  }

  // 🔹 LOGIN → autentica con Firebase y guarda el ID token
  async loginUser({ email, password }) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // 🔹 Aquí imprime UID y email de Firebase
      console.log("🔹 Firebase UID (loginUser):", user.uid);
      console.log("🔹 Firebase email (loginUser):", user.email);

      const idToken = await userCredential.user.getIdToken();

      localStorage.setItem("authToken", idToken);
      console.log("✅ Token Firebase guardado en localStorage");

      // 🔹 Llamada al backend para obtener id_user
      const res = await apiClient.get(`/auth/user/${user.uid}`);

      if (!res?.data?.id_user) {
        throw new Error("⚠️ No se encontró un usuario con ese UID en la base de datos");
      }
      // se espera que res.data tenga { id_user, uid, email, ... }
      const backendUser = res.data;
      console.log("🧩 Usuario backend encontrado:", backendUser);

      // Puedes guardar info del usuario si la necesitas
      return {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        token: idToken,
        id_user: backendUser.id_user,
      };
    } catch (error) {
      console.error("❌ Error en AuthService.loginUser:", error);
      throw error;
    }
  }

  // 🔹 OBTENER TOKEN ACTUAL
  async getToken() {
    const user = this.auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  }

  // 🔹 RENOVAR TOKEN (cuando expira)
  async refreshToken() {
    const user = this.auth.currentUser;
    if (!user) return null;

    const newToken = await user.getIdToken(true); // fuerza renovación
    localStorage.setItem("authToken", newToken);
    console.log("🔁 Token Firebase renovado y actualizado en localStorage");
    return newToken;
  }

  // 🔹 CERRAR SESIÓN
  async logout() {
    await this.auth.signOut();
    localStorage.removeItem("authToken");
    console.log("🚪 Sesión cerrada y token eliminado");
  }
}

export default AuthService;


