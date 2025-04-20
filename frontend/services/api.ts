import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || ''
});
console.log("🚀 ~ api:", api)

export const fetchProducts = () => api.get('/api/products');
