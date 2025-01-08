import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9090', // URL
});

// respuestas
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // Eliminar el token
            localStorage.removeItem('token');
            // Redirigir al login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
