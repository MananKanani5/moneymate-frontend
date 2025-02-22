import axios from "axios";
import dayjs from "dayjs";
const API_URL = `${import.meta.env.VITE_API_URL}/expense`;
export const getAllExpenses = async (
  token,
  page = 1,
  pageSize = 10,
  startDate = dayjs().startOf("month").format("YYYY-MM-DD"),
  endDate = dayjs().format("YYYY-MM-DD")
) => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      pageSize,
      startDate,
      endDate,
    },
  });
};

export const getExpenseById = (id, token) =>
  axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createExpense = ({ expenseData, token }) =>
  axios.post(API_URL, expenseData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateExpense = (id, expenseData, token) =>
  axios.patch(`${API_URL}/${id}`, expenseData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteExpense = (id, token) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Dashboard Data
export const getDashboardData = (token) =>
  axios.get(`${API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getCategoryWiseExpenses = (token) =>
  axios.get(`${API_URL}/category-wise`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getWeeklySummary = (token) =>
  axios.get(`${API_URL}/weekly-summary`, {
    headers: { Authorization: `Bearer ${token}` },
  });
