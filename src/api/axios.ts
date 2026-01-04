import axios from "axios";

declare global {
  interface Window {
    _env_?: {
      VITE_API_URL?: string;
    };
  }
}

let rawBaseUrl =
  window._env_?.VITE_API_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";

// Ensure it starts with a protocol, otherwise it's treated as relative by the browser
if (
  rawBaseUrl &&
  !rawBaseUrl.startsWith("http://") &&
  !rawBaseUrl.startsWith("https://")
) {
  rawBaseUrl = `https://${rawBaseUrl}`;
}

// Remove trailing slash if present to avoid double slashes when appending /api/v1
const normalizedBaseUrl = rawBaseUrl.endsWith("/")
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl;

const API_BASE_URL = normalizedBaseUrl + "/api/v1";

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
