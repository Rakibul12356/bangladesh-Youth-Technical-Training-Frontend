/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import axios from "axios";

// Normalize VITE_API_BASE_URL: ensure it points to the backend API root
const rawBase = import.meta.env.VITE_API_BASE_URL || "";
let baseURL = "http://localhost:5000/api";
if (rawBase) {
  // strip trailing slashes
  const trimmed = rawBase.replace(/\/+$/g, "");
  // ensure it ends with /api
  baseURL = trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
}

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token from localStorage (if any) to each request
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (e) {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Basic response interceptor: on 401, clear token and redirect to login
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        localStorage.removeItem("token");
      } catch (e) {}
      // redirect to login route
      if (typeof window !== "undefined") window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);

export function setAuthToken(token) {
  try {
    localStorage.setItem("token", token);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } catch (e) {}
}

export function clearAuthToken() {
  try {
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common.Authorization;
  } catch (e) {}
}

export default axiosInstance;
