import axios from 'axios';

class RegisterRepository {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 segundos
    });
  }

  async register(userData) {
    try {
      const response = await this.api.post('/register', userData);
      
      return {
        success: true,
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      // Si el servidor respondió con un error (4xx, 5xx)
      if (error.response) {
        throw new Error(
          error.response.data?.message || 
          `Error ${error.response.status}: ${error.response.statusText}`
        );
      }
      
      // Si hubo un error de red o timeout
      if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      }
      
      // Otro tipo de error
      throw new Error(error.message || 'Error desconocido');
    }
  }
}

export default RegisterRepository;