import RegisterRepository from "../../repositories/register/RegisterRepository";

class RegisterService {
    constructor() {
      this.registerRepository = new RegisterRepository();
    }
  
    async registerUser(formData) {
      try {

        console.log("Password:", `[${formData.password}]`);
        console.log("Confirm:", `[${formData.confirmPassword}]`);

  
        const userDataForValidation = {
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          name: formData.name,
          firstSurname: formData.firstSurname,
          bio: formData.bio,
          avatar: formData.avatar,
        };
  
       
        this.validateUserData(userDataForValidation);
  
    
        const userDataForAPI = {
          /* username: formData.username, */
          email: btoa(formData.email),
          password: btoa(formData.password),
          name: formData.name,
          firstSurname: formData.firstSurname,
          userName: formData.userName,
          bio: formData.bio || "",
          avatar: formData.avatar || ""
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
      
      if (!userData.name?.trim()) {
        throw new Error('El nombre es obligatorio');
      }

      if (!userData.firstSurname?.trim()) {
        throw new Error("El primer apellido es obligatorio");
      }

      if (!userData.userName?.trim()) {
        throw new Error("El nombre de usuario es obligatorio");
      }
    
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('El formato del email no es válido');
      }
  
      if (!userData.password || userData.password.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres');
      }

      if (userData.password !== userData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
    }
  }
  
  
  const registerService = new RegisterService();
  
  export default registerService;