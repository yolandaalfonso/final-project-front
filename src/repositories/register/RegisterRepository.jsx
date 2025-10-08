class RegisterRepository {
    constructor() {
      this.baseUrl = import.meta.env.VITE_API_BASE_URL;
    }
  
    async register(userData) {
      try {
        const response = await fetch(`${this.baseUrl}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
    
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.message || 
            `Error ${response.status}: ${response.statusText}`
          );
        }
  
  
        const data = await response.json();
        return {
          success: true,
          status: response.status,
          data: data,
        };
      } catch (error) {
  
        throw new Error(
          error.message || 'Error de conexión con el servidor'
        );
      }
    }
  }
  
  export default RegisterRepository;