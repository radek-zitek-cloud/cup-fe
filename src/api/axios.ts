import axios from "axios";

declare global {
  interface Window {
    _env_?: {
      VITE_API_URL?: string;
    };
  }
}

const API_BASE_URL =
  (window._env_?.VITE_API_URL ||
    import.meta.env.VITE_API_URL ||
    "http://localhost:8000") + "/api/v1";

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
