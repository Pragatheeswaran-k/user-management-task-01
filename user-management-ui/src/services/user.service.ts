import api from './api'; // Your axios instance
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust if your backend runs on a different port

export const createUser = async (user: { username: string; email: string; password: string }) => {
  const response = await axios.post('/users', user); // Adjust base URL if needed
  return response.data;
};

export const getAllUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  return response.json();
};

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export async function editUser(id: number, data: { username?: string; email?: string; password?: string }) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  return response.json();
}
