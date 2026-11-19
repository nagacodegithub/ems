import axios from 'axios'
import { useAuth } from '../context/AuthContext'


const axioInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});
apiClient.interceptors.request.use((config) => {
    return config;
}
, (error) => {
    return Promise.reject(error)
    })

    apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
        async (error) => {
          
            const originalRequest = error.config;
       
          if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
              const response = await axioInstance.post("auth/refresh-token");
              localStorage.setItem("isAuthenticated", true);
             return apiClient(originalRequest);
            } catch (refreshError) {
              console.log(error)
              localStorage.removeItem("isAuthenticated");
             return Promise.reject(refreshError);
            }
          }
                
            return Promise.reject(error);
      },
    );
export default apiClient

