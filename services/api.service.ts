import axios from 'axios';

const API_BASE_URL = 'https://8392-14-254-175-215.ngrok-free.app';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Define TypeScript interfaces for data models
export interface User {
  id: number;
  username: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface Exercise {
  id: number;
  name: string;
}

export interface DailyChallenge {
  id: number;
  name: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  role?: string; // Add role to the response type
}

// Update API functions to use these types
export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const fetchRoles = async (): Promise<Role[]> => {
  const response = await api.get('/roles');
  return response.data;
};

export const fetchExercises = async (): Promise<Exercise[]> => {
  const response = await api.get('/exercises');
  return response.data;
};

export const fetchDailyChallenges = async (): Promise<DailyChallenge[]> => {
  const response = await api.get('/daily-challenges');
  return response.data;
};

// Add a new function to fetch tables
export const fetchTables = async (): Promise<any[]> => {
  const response = await api.get('/tables');
  return response.data;
};

// Add a new function to delete a table
export const deleteTable = async (tableId: number): Promise<void> => {
  await api.delete(`/tables/${tableId}`);
};

// Add a new function to check login
export const checkLogin = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const registerUser = async (data: { username: string; email: string; password: string }): Promise<{ success: boolean; message: string }> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};