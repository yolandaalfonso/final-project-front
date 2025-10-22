class TripService {
    constructor() {
        this.pacientsRepository = new TripRepository();
    }

    async createPatient(tripData) {
        try {
     
            if (!tripData.title?.trim()) {
                throw new Error('El título es obligatorio');
            }


            const result = await this.tripRepository.create(tripData);

            console.log('Viaje creado con éxito:', result);
            return result;
        } catch (error) {
            console.error('Error en TripService.createTrip:', error);
            throw error;
        }
    }
        async getTrips() {
        try {
            const result = await this.tripRepository.getAll();
            console.log('Viajes obtenidos con éxito:', result);
            return result;
        } catch (error) {
            console.error('Error en TripService.getTrips:', error);
            throw error;
        }
    }

    /* async getPatientsByUserId(userId) {
    try {
      if (!userId) {
        throw new Error("El ID del usuario es obligatorio");
      }

      const result = await this.pacientsRepository.getByUserId(userId);
      console.log(`Pacientes del usuario ${userId} obtenidos con éxito:`, result);
      return result;
    } catch (error) {
      console.error(`Error en PacientsService.getPatientsByUserId(${userId}):`, error);
      throw error;
    }
}

    async getPatientById(id) {
    try {
        if (!id) {
        throw new Error("El ID del paciente es obligatorio");
      }
      const result = await this.pacientsRepository.getById(id);
      console.log(`Paciente con ID ${id} obtenido con éxito:`, result);
      return result;
    } catch (error) {
      console.error(`Error en PacientsService.getPatientById(${id}):`, error);
      throw error;
    }
  } */

    async updateTrip(id, tripData) {
        try {
            if (!id) {
                throw new Error("El ID del viaje es obligatorio");
            }
            if (!tripData.title?.trim()) {
                throw new Error('El título del viaje es obligatorio');
            }

            const result = await this.tripRepository.update(id, tripData);

            console.log('Viaje actualizado con éxito:', result);
            return result;
        } catch (error) {
            console.error('Error en TripService.updateTrip:', error);
            throw error;
        }
    }

    async deleteTrip(id) {
        try {
            if (!id) {
            throw new Error("El ID del viaje es obligatorio para eliminarlo");
            }

            const result = await this.tripRepository.delete(id);
            console.log(`Viaje con ID ${id} eliminado con éxito`);
            return result;
        } catch (error) {
            console.error(`Error en TripService.deleteTrip(${id}):`, error);
            throw error;
        }
    }
  }

    
const tripService = new TripService();

export default tripService;
