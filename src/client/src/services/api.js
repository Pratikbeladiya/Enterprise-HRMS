import axios from "axios";

let rawUrl = import.meta.env.VITE_API_URL || "/api";
if (rawUrl.endsWith("/")) rawUrl = rawUrl.slice(0, -1);
if (!rawUrl.endsWith("/api") && !rawUrl.startsWith("/")) rawUrl += "/api";

const API_BASE_URL = rawUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("hrms_token");
    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Unauthenticated
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("hrms_token");
      localStorage.removeItem("hrms_user");
    }
    return Promise.reject(error);
  }
);

export default api;