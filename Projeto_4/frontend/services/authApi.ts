// services/authApi.ts

import axios from 'axios';

export const registerUser = async (userData: any) => {
  // Lógica para chamar a API de registro
  const response = await axios.post('http://localhost:3000/users/register', userData);
  return response;
};

export const loginUser = async (userData: any) => {
  // Lógica para chamar a API de login
  const response = await axios.post('http://localhost:3000/users/login', userData);
  return response;
};
