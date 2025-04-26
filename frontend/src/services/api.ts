// src/services/api.ts
import axios from 'axios';

// Read the VITE_API_URL at build/dev time
const baseURL = import.meta.env.VITE_API_URL || '';
console.log("🚀 ~ baseURL:", baseURL)

console.log('🚀 API Base URL:', baseURL);  // Logs in browser DevTools

// Create an Axios instance
const api = axios.create({ baseURL });

// Export a fetch function
export const fetchAllProducts = () => {
  return api.get('/api/products');  // will hit http://localhost:3000/api/products
}

export const fetchHomeProducts = () => {
  return api.get('/api/products/admin/uploaded');  // will hit http://localhost:3000/api/products
};
