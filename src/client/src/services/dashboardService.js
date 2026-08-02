import api from "./api";

export const getDashboardSummary = async () => {
  const response = await api.get("/dashboard/summary");
  return response.data;
};

export const getEmployeeStats = async () => {
  const response = await api.get("/dashboard/employee-stats");
  return response.data;
};

export const getSalaryStats = async () => {
  const response = await api.get("/dashboard/salary-stats");
  return response.data;
};

export const getDepartmentStats = async () => {
  const response = await api.get("/dashboard/department-stats");
  return response.data;
};
