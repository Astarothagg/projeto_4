// userApi.ts

import axios from 'axios';

const API_URL = 'http://localhost:3000/users/cadastrar-usuario'; // Substitua pelo URL real da sua API

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};
