import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080",
});

// add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("SchoolToolManagementToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standardize error reporting
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    console.error(
      `[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}:`,
      message,
    );

    // You could trigger a toast or notification here in a real app

    return Promise.reject({
      ...error,
      displayMessage: message,
    });
  },
);

export default api;
