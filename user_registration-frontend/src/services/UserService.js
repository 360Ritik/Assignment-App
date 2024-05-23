import axios from 'axios';

const API_URL = 'http://localhost:3001/api/registration';

export const addUser = async (user) => {
  const response = await axios.post(`${API_URL}/AddUser`, user);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/getUsers`);
  return response.data;
};

export const getUser = async (id) => {
  const response = await axios.get(`${API_URL}/getUser/${id}`);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axios.put(`${API_URL}/update/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
};
