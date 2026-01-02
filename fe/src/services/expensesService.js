import api from './api';

export const getMonthlyExpenses = (month, year) => {
  return api.get(`/expenses/${month}/${year}`);
};

export const getAllExpenses = () => {
  return api.get('/expenses');
};

export const createExpense = (data) => {
  return api.post('/expenses', data);
};

export const updateExpense = (id, data) => {
  return api.put(`/expenses/${id}`, data);
};

export const deleteExpense = (id) => {
  return api.delete(`/expenses/${id}`);
};

export const getCategories = () => {
  return api.get('/categories');
};