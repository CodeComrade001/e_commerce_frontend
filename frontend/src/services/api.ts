// src/services/api.ts
import { OrderRequest } from '@/components/Home Component/CheckoutPage';
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

export const getLandingPageProduct = () => {
  return api.get('/api/products/root');  // will hit http://localhost:3000/api/products
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

export function placeNewOrder(data: OrderRequest) {
  return api.post<OrderRequest, /* response type */ any>(
    '/api/user/order',
    data
  );
}

export function fetchUserOrderHistory(data: { userId: number }, config?: AxiosRequestConfig) {
  console.log("🚀 ~ fetchUserOrderHistory ~ data:", data)
  return api.post(
    '/api/user/order/history',
    data,
    config
  );
}

export function fetchUserDetails(data: { userId: number }, config?: AxiosRequestConfig) {
  return api.post('/api/user/details', data, config)
}

export function fetchAllWishlistOrder(data: { userId: number }, config?: AxiosRequestConfig) {
  return api.post('/api/user/wishlist/all', data, config)
}

export function wishlistAddOrder(data: { userId: number, productId: number }, config?: AxiosRequestConfig) {
  return api.post('/api/user/wishlist/', data, config)
}

export function wishlistDeleteOrder(data: { userId: number; productId: number }) {
  return api.delete('/api/user/wishlist', {
    params: data
  });
}

export function updateUserDetails(data: { userId: number, name: string, email: string }, config?: AxiosRequestConfig) {
  return api.patch('/api/user', data, config)
}

