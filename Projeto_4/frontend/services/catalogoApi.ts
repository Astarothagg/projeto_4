// catalogoApi.ts

import axios from 'axios';

const API_URL = 'http://localhost:3000/catalogo/catalogo-veiculos'; // Substitua pelo URL real da sua API

export const getCatalogoItems = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};
