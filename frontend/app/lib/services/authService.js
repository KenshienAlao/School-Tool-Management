import api from "@/app/lib/api";

// Service for authentication-related API calls.
export const authService = {
  // registers a new user
  register: async (newUser) => {
    try {
      const response = await api.post("/api/auth/register", newUser);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // logs in a user
  login: async (loginUser) => {
    try {
      const response = await api.post("/api/auth/login", loginUser);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
