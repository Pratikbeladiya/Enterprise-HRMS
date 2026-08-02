import api from "./api";

// Jobs
export const getAllJobs = async (params = {}) => {
  const response = await api.get("/recruitment/jobs", { params });
  return response.data;
};

export const createJob = async (data) => {
  const response = await api.post("/recruitment/jobs", data);
  return response.data;
};

export const updateJob = async (id, data) => {
  const response = await api.put(`/recruitment/jobs/${id}`, data);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await api.delete(`/recruitment/jobs/${id}`);
  return response.data;
};

// Candidates
export const getAllCandidates = async (params = {}) => {
  const response = await api.get("/recruitment/candidates", { params });
  return response.data;
};

export const createCandidate = async (data) => {
  const response = await api.post("/recruitment/candidates", data);
  return response.data;
};

export const updateCandidate = async (id, data) => {
  const response = await api.put(`/recruitment/candidates/${id}`, data);
  return response.data;
};

export const deleteCandidate = async (id) => {
  const response = await api.delete(`/recruitment/candidates/${id}`);
  return response.data;
};
