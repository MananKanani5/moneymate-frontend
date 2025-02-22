import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/budget`;

export const setBudget = (budgetData, token) =>
  axios.post(API_URL, budgetData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateBudget = (id, budgetData, token) =>
  axios.patch(`${API_URL}/${id}`, budgetData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getCurrentBudget = (token) =>
  axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });

export const getBudgetHistory = (token) =>
  axios.get(`${API_URL}/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
