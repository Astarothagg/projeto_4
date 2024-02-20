// protectedApi.ts

import axios from 'axios';

const API_URL = 'http://your-api-base-url'; // Substitua pelo URL real da sua API

export const getProtectedData = async () => {
  const response = await axios.get(`${API_URL}/protected`);
  return response.data;
};
