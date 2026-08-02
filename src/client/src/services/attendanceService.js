import api from "./api";

export const getAllAttendance = async () => {
  const response = await api.get("/attendance");
  return response.data;
};

export const getAttendanceById = async (id) => {
  const response = await api.get(`/attendance/${id}`);
  return response.data;
};

export const createAttendance = async (attendanceData) => {
  const response = await api.post("/attendance", attendanceData);
  return response.data;
};

export const updateAttendance = async (id, attendanceData) => {
  const response = await api.put(`/attendance/${id}`, attendanceData);
  return response.data;
};

export const deleteAttendance = async (id) => {
  const response = await api.delete(`/attendance/${id}`);
  return response.data;
};

export const getEmployeeAttendanceHistory = async (employeeId) => {
  const response = await api.get(`/attendance/employee/${employeeId}`);
  return response.data;
};

export const getAttendanceSummary = async () => {
  const response = await api.get("/attendance/summary");
  return response.data;
};

export const getMonthlyAttendanceReport = async (params) => {
  const response = await api.get("/attendance/report", { params });
  return response.data;
};
