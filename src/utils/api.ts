import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://playeer-api.onrender.com/api",
  // You can add default headers here if needed
});

// Optional: Add interceptors for auth, error handling, etc.
api.interceptors.request.use(
  (config) => {
    // Example: Add token from localStorage or cookies
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling (optional)
    if (
      error?.response?.data?.name === 'TokenExpiredError' ||
      error?.response?.data?.error === 'TokenExpiredError' ||
      error?.response?.data?.message === 'TokenExpiredError'
    ) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api; 