import axios from 'axios';

class AuthRepository {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        'Accept': 'application/json',
      },
    });
  }

  // 🔹 LOGIN usando token Firebase
  async login(authToken) {
    try {
      const response = await this.api.post(
        '/login',
        {}, // sin body
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );

      const user = response.data;

      if (user.id_user) {
        localStorage.setItem('userId', user.id_user);
      }

      console.log('✅ Login correcto:', user);
      return user;

    } catch (error) {
      console.error('❌ Error en AuthRepository.login:', error);
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  }

  // 🔹 OBTENER usuario actual
  async getCurrentUser(authToken) {
    try {
      const response = await this.api.get('/users/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('❌ Error en AuthRepository.getCurrentUser:', error);
      throw new Error(error.response?.data?.message || 'Error al obtener usuario');
    }
  }

  // 🔹 LOGOUT
  async logout() {
    try {
      await this.api.post('/logout');
      localStorage.removeItem('userId');
      console.log('✅ Logout correcto');
    } catch (error) {
      console.error('❌ Error en AuthRepository.logout:', error);
      throw new Error('Error al cerrar sesión');
    }
  }
}

export default AuthRepository;
