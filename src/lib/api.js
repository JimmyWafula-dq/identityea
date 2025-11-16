// src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://server.identityea.com/api", // Change in production
  // baseURL: "http://localhost:5000/api", // Change in production
  headers: {
    "Content-Type": "application/json",
  },
});

export const baseUrl = "https://server.identityea.com/uploads";
// export const baseUrl = "http://localhost:5000/uploads";

// Add JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 → logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
      // window.dispatchEvent(new Event("unauthorized"));
    }
    return Promise.reject(error);
  }
);

export default api;
