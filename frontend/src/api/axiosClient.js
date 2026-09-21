import axios from 'axios';

let rawBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // If running in browser over HTTPS or on Vercel / production domain, always use relative /api
    if (window.location.protocol === 'https:' || window.location.hostname.endsWith('vercel.app') || !rawBaseUrl) {
      return '/api';
    }

    // If on mobile/LAN IP (e.g. 192.168.x.x or 10.x.x.x)
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      if (/^\d+\.\d+\.\d+\.\d+$/.test(window.location.hostname)) {
        return `http://${window.location.hostname}:5000/api`;
      }
      return '/api';
    }
  }

  if (rawBaseUrl && (rawBaseUrl.startsWith('http://') || rawBaseUrl.startsWith('https://'))) {
    return rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl.replace(/\/+$/, '')}/api`;
  }

  return '/api';
}

const baseURL = getBaseUrl();

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
