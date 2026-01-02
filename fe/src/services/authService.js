import api from './api';

export const loginAPI = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const registerAPI = async (name, email, password) => {
  const res = await api.post('/auth/register', { name, email, password });
  return res.data;
};