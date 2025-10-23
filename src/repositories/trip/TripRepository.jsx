import apiClient from '../../services/apliClient';

class TripRepository {
    /* constructor() {
        this.baseUrl = import.meta.env.VITE_API_BASE_URL;
        this.client = axios.create({
            baseURL: this.baseUrl,
            withCredentials: true, // para enviar cookies
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } */

    async create(tripData) {
        try {
            const response = await apiClient.post('/trips', tripData);
            console.log(response)
            return response.data;
        } catch (error) {
            console.error('Error en TripRepository.create:', error.response?.data || error.message);
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await apiClient.get('/trips');
            return response.data;
        } catch (error) {
            console.error('Error en TripRepository.getAll:', error.response?.data || error.message);
            throw error;
        }
    }

    async update(id, tripData) {
        try {
            const response = await apiClient.put(`/trips/${id}`, tripData);
            return response.data;
        } catch (error) {
            console.error('Error en TripRepository.update:', error.response?.data || error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            await apiClient.delete(`/trips/${id}`);
            return true;
        } catch (error) {
            console.error('Error en TripRepository.delete:', error.response?.data || error.message);
            throw error;
        }
    }
}

export default TripRepository;
