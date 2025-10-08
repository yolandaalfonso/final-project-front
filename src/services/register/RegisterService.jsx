import RegisterRepository from "../../repositories/register/RegisterRepository";

class RegisterService {
    constructor() {
      this.registerRepository = new RegisterRepository();
    }
  
    async registerUser(formData) {
      try {
  
        const userDataForValidation = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };
  
       
        this.validateUserData(userDataForValidation);
  
    
        const userDataForAPI = {
          username: formData.username,
          email: btoa(formData.email),
          password: btoa(formData.password),
        };
  
        const result = await this.registerRepository.register(userDataForAPI);
  
        
        console.log('Usuario registrado exitosamente:', { 
          ...result, 
  
          data: { ...result.data, email: '[ENCRYPTED]', password: '[ENCRYPTED]' }
        });
  
        return result;
      } catch (error) {
      
        console.error('Error en el servicio de registro:', error);
        throw error;
      }
    }
  
    validateUserData(userData) {
      
      if (!userData.username?.trim()) {
        throw new Error('El nombre es obligatorio');
      }
    
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('El formato del email no es válido');
      }
  
      if (!userData.password || userData.password.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres');
      }
    }
  }
  
  
  const registerService = new RegisterService();
  
  export default registerService;