import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.SERVER_BASE_URI || 'http://localhost:8080',
    timeout: 10000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
// axiosInstance.interceptors.request.use(
//     async (config) => {
//
//             // For future auth token reference
//             // config.headers.Authorization = `Bearer ${token}`;
//
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// Add a response interceptor
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         // Handle errors globally
//         if (error.response && error.response.status === 401) {
//             // Optionally handle unauthorized access (e.g., logout user)
//             console.error('Unauthorized access, logging out.');
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

// Modular methods for API calls
const apiClient = {
    get: (url, params = {}) => axiosInstance.get(url, { params }),
    post: (url, data = {}) => axiosInstance.post(url, data),
    put: (url, data = {}) => axiosInstance.put(url, data),
    patch: (url, data = {}) => axiosInstance.patch(url, data),
    delete: (url, params = {}) => axiosInstance.delete(url, { params }),
};

export default apiClient;