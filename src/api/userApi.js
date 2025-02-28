import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}/user`;

export const registerUser = (userData) =>
  axios.post(`${API_URL}/register`, userData);

export const loginUser = (credentials) =>
  axios.post(`${API_URL}/login`, credentials);

export const forgotPassword = (email) =>
  axios.post(`${API_URL}/forgot-password`, { email });

export const resetPassword = ({ email, otp, newPassword }) =>
  axios.post(`${API_URL}/reset-password`, { email, otp, newPassword });

export const getUserById = (id, token) =>
  axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateUser = ({ id, userData, token }) =>
  axios.patch(`${API_URL}/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteUser = (id, token) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
