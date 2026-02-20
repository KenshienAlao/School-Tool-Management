import api from "../api";

export const attendanceService = {
  getAttendance: async () => {
    try {
      const response = await api.get("/api/attendance");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
