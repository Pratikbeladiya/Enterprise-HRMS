import api from "./api";

export const getAllLeaves = async (params = {}) => {
  const response = await api.get("/leave", { params });
  return response.data;
};

export const getLeaveById = async (id) => {
  const response = await api.get(`/leave/${id}`);
  return response.data;
};

export const createLeave = async (leaveData) => {
  const response = await api.post("/leave", leaveData);
  return response.data;
};

export const applyLeave = async (leaveData) => {
  const response = await api.post("/leave/apply", leaveData);
  return response.data;
};

export const updateLeave = async (id, leaveData) => {
  const response = await api.put(`/leave/${id}`, leaveData);
  return response.data;
};

export const deleteLeave = async (id) => {
  const response = await api.delete(`/leave/${id}`);
  return response.data;
};

export const approveLeave = async (id, data = {}) => {
  const response = await api.put(`/leave/${id}/approve`, data);
  return response.data;
};

export const rejectLeave = async (id, data = {}) => {
  const response = await api.put(`/leave/${id}/reject`, data);
  return response.data;
};

export const getEmployeeLeaveHistory = async (employeeId) => {
  const response = await api.get(`/leave/employee/${employeeId}`);
  return response.data;
};

export const getLeaveSummary = async () => {
  const response = await api.get("/leave/summary");
  return response.data;
};
