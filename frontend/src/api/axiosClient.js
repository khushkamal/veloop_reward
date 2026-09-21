import axios from 'axios';

let rawBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '/api';

// Dynamically handle mobile / LAN testing (e.g. opening via 192.168.x.x on mobile browser)
if (typeof window !== 'undefined' && window.location?.hostname && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  if (rawBaseUrl.includes('localhost') || rawBaseUrl.includes('127.0.0.1')) {
    rawBaseUrl = rawBaseUrl.replace(/localhost|127\.0\.0\.1/, window.location.hostname);
  }
}

const baseURL = rawBaseUrl.endsWith('/api') || rawBaseUrl === '/api' ? rawBaseUrl : `${rawBaseUrl.replace(/\/+$/, '')}/api`;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT Bearer token if present in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('veloop_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token if unauthorized
      localStorage.removeItem('veloop_auth_token');
    }
    return Promise.reject(error);
  }
);

export default api;
