// File Path: C:/HRMS/HRMSfrontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your Express backend port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach JWT token if it exists in localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;