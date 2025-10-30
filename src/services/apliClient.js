import axios from "axios";
import { auth} from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  async (config) => {
    const firebaseUser = await new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) resolve(user);
        else reject("Usuario no logueado");
      });
    });

    const freshToken = await firebaseUser.getIdToken(true);
    config.headers.Authorization = `Bearer ${freshToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
