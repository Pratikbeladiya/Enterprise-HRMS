import api from "./api";

export const loginUser = async (credentials) => {
  const response = await api.post("/user/login", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/user/register", userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

export const getAdminDashboard = async () => {
  const response = await api.get("/user/admin/dashboard");
  return response.data;
};
