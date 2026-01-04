import axios from 'axios';

// @ts-expect-error window._env_ is defined in env-config.js at runtime
const API_BASE_URL =
  window._env_?.VITE_API_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
