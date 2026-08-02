import api from "./api";

export const getAllPayrolls = async (params = {}) => {
  const response = await api.get("/payroll", { params });
  return response.data;
};

export const getPayrollById = async (id) => {
  const response = await api.get(`/payroll/${id}`);
  return response.data;
};

export const createPayroll = async (payrollData) => {
  const response = await api.post("/payroll", payrollData);
  return response.data;
};

export const updatePayroll = async (id, payrollData) => {
  const response = await api.put(`/payroll/${id}`, payrollData);
  return response.data;
};

export const deletePayroll = async (id) => {
  const response = await api.delete(`/payroll/${id}`);
  return response.data;
};

export const getEmployeePayrollHistory = async (employeeId) => {
  const response = await api.get(`/payroll/employee/${employeeId}`);
  return response.data;
};

export const getMonthlyPayrollSummary = async (params = {}) => {
  const response = await api.get("/payroll/summary", { params });
  return response.data;
};

export const getPayrollDashboard = async () => {
  const response = await api.get("/payroll/dashboard");
  return response.data;
};
