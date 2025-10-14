import { auth } from '../../firebase'; // tu inicialización de Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import AuthRepository from '../../repositories/auth/AuthRepository';

class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
  }

  // 🔹 REGISTRO con Firebase
  async registerUser(formData) {
    try {
      const { email, password } = formData;
      if (!email?.trim()) throw new Error('El email es obligatorio');
      if (!password?.trim()) throw new Error('La contraseña es obligatoria');

      // 👉 Crear usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // 👉 Enviar token al backend si quieres crear también un registro local
      const response = await fetch(`${this.baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error registrando usuario en backend');
      const data = await response.json();

      console.log('✅ Usuario registrado en backend y Firebase:', data);
      return data;
    } catch (error) {
      console.error('❌ Error en AuthService.registerUser:', error);
      throw error;
    }
  }

  // 🔹 LOGIN con Firebase
  async loginUser(formData) {
    try {
      const { email, password } = formData;
      if (!email?.trim()) throw new Error('El email es obligatorio');
      if (!password?.trim()) throw new Error('La contraseña es obligatoria');

      // 👉 Login con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // 👉 Enviar token a tu backend para obtener datos de usuario, si aplica
      const response = await fetch(`${this.baseUrl}/users/me`, {
        headers: { 'Authorization': `Bearer ${idToken}` },
      });

      if (!response.ok) throw new Error('Error obteniendo usuario del backend');
      const user = await response.json();

      localStorage.setItem('userId', user.id_user);
      console.log('✅ Login con éxito:', user);
      return user;
    } catch (error) {
      console.error('❌ Error en AuthService.loginUser:', error);
      throw error;
    }
  }

  async logoutUser() {
    try {
      await auth.signOut();
      localStorage.removeItem('userId');
      console.log('✅ Logout con éxito');
    } catch (error) {
      console.error('❌ Error en AuthService.logoutUser:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = auth.currentUser;
      if (!user) return null;
      const idToken = await user.getIdToken();
      const response = await fetch(`${this.baseUrl}/users/me`, {
        headers: { 'Authorization': `Bearer ${idToken}` },
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('❌ Error en AuthService.getCurrentUser:', error);
      return null;
    }
  }
}

const authService = new AuthService();
export default authService;
