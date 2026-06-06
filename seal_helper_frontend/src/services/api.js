import axios from 'axios';

export const BASE_URL = 'http://localhost:8000';

const api_instance = axios.create({
    baseURL: BASE_URL,
});

api_instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    const isAuthEndpoint = config.url.includes('/login') || config.url.includes('/register');

    if (token && !isAuthEndpoint) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api_instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized request or invalid token. Clearing local storage.");

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api_instance;