// src/services/api.ts
import axios, { AxiosRequestConfig } from 'axios';

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

export function LoginExistingAccount(data: { email: string; password: string }, config?: AxiosRequestConfig) {
  return api.post('/api/user-auth/login', data, config);
}

export function CreateNewAccount(data: { name: string; email: string; password: string }, config?: AxiosRequestConfig) {
  return api.post('/api/user-auth/sign-up', data, config);
}