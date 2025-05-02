// src/services/api.ts
import axios, { AxiosRequestConfig } from 'axios';

// Read the VITE_API_URL at build/dev time
const baseURL = import.meta.env.VITE_API_URL || '';
console.log("🚀 ~ baseURL:", baseURL)

console.log('🚀 API Base URL:', baseURL);  // Logs in browser DevTools

// Create an Axios instance
const api = axios.create({
  baseURL,
  withCredentials: true,       // enable sending/receiving cookies :contentReference[oaicite:3]{index=3}
});
// Export a fetch function
export const fetchAllProducts = () => {
  return api.get('/api/products');  // will hit http://localhost:3000/api/products
}

export const fetchHomeProducts = () => {
  return api.get('/api/products/admin/uploaded');  // will hit http://localhost:3000/api/products
};

export function LoginExistingAccount(
  data: { params: { email: string; password: string } },
  config?: AxiosRequestConfig
) {
  console.log('🚀 ~ LoginExistingAccount ~ data:', data);
  return api.post('/api/user-auth/login', data, config);
}

export function CreateNewAccount(
  data: { params: { name: string; email: string; password: string } },
  config?: AxiosRequestConfig
) {
  console.log('🚀 ~ CreateNewAccount ~ data:', data);
  return api.post('/api/user-auth/sign-up', data, config);
}

export function getCurrentUser() {
  return api.get<{ userId: number }>('/api/user-auth/me');
}

export function fetchUserDetails(data: { userId: number }, config?: AxiosRequestConfig) {
  return api.post('/api/user/', data, config)
}