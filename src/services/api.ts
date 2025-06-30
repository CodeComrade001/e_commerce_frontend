// ===================================
// Imports and Base Setup
// ===================================
import { OrderRequest } from '@/components/Home Component/CheckoutPage';
import axios, { AxiosRequestConfig } from 'axios';

// Read the VITE_API_URL at build/dev time
const baseURL = import.meta.env.VITE_API_URL || '';
console.log("🚀 ~ baseURL:", baseURL);
console.log('🚀 API Base URL:', baseURL);  // Logs in browser DevTools

// Create an Axios instance
const api = axios.create({
  baseURL,
  withCredentials: true,
});

// ===================================
// Public Product APIs
// ===================================

export const fetchAllProducts = () => {
  return api.get('/api/products');
};

export const fetchHomeProducts = () => {
  return api.get('/api/products/admin/uploaded');
};

export const getLandingPageProduct = () => {
  return api.get('/api/products/root');
};

// ===================================
// User Auth APIs
// ===================================

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

// ===================================
// User Order & Profile APIs
// ===================================

export function placeNewOrder(data: OrderRequest) {
  return api.post<OrderRequest, any>('/api/user/order', data);
}

export function fetchUserOrderHistory(data: { userId: number }, config?: AxiosRequestConfig) {
  console.log("🚀 ~ fetchUserOrderHistory ~ data:", data);
  return api.post('/api/user/order/history', data, config);
}

export function fetchUserDetails(data: { userId: number }, config?: AxiosRequestConfig) {
  return api.post('/api/user/details', data, config);
}

export function updateUserDetails(data: { userId: number, name: string, email: string }, config?: AxiosRequestConfig) {
  return api.patch('/api/user', data, config);
}

// ===================================
// User Wishlist APIs
// ===================================

export function fetchAllWishlistOrder(data: { userId: number }, config?: AxiosRequestConfig) {
  return api.post('/api/user/wishlist/all', data, config);
}

export function wishlistAddOrder(data: { userId: number, productId: number }, config?: AxiosRequestConfig) {
  return api.post('/api/user/wishlist/', data, config);
}

export function wishlistDeleteOrder(data: { userId: number; productId: number }) {
  return api.delete('/api/user/wishlist', {
    params: data,
  });
}

// ===================================
// Admin Product APIs
// ===================================

export const fetchAdminAllProducts = () => {
  return api.get('/api/admin/product/grouped');
};

export const deleteProducts = (data: { id: number }) => {
  return api.delete(`/api/admin/product/:id${data}`);
};

export const UpdateExistingProduct = (data: {
  id: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image_url?: string;
  quantity?: string;
  discount?: number;
}) => {
  return api.patch(`/api/admin/product/:id${data}`);
};

export const addNewProduct = (
  data: {
    price: string;
    title: string;
    quantity: string;
    discount: string;
    category: string;
    description: string;
    productImage?: File;
  },
  config?: AxiosRequestConfig
) => {
  return api.post('/api/products/add-new', data, config);
};

// ===================================
// Admin Order APIs
// ===================================

export const fetchAdminAllOrders = () => {
  return api.get('/api/admin/order/');
};

export const fetchAdminOrdersByDateRange = (from: string, to: string) => {
  return api.get('/api/admin/order/range', { params: { from, to } });
};

export const fetchAdminOrderById = (id: number) => {
  return api.get(`/api/admin/order/${id}`);
};

export const completeAdminOrder = (id: number) => {
  return api.patch(`/api/admin/order/${id}/complete`);
};

export const cancelAdminOrder = (id: number) => {
  return api.patch(`/api/admin/order/${id}/cancel`);
};

// ===================================
// Admin Analytics APIs
// ===================================

export const fetchAdminMonthlyOrders = () => {
  return api.get<{ month: string; count: number }[]>(
    '/api/admin/analytics/monthly'
  );
};

export const fetchAdminOrdersInRange = (start: string, end?: string) => {
  return api.get<{ period: string; count: number }[]>(
    '/api/admin/analytics/range',
    { params: { start, end } }
  );
};

export const fetchAdminWeeklySalesChange = () => {
  return api.get<{
    currentWeek: number;
    previousWeek: number;
    pctChange: number | null;
    discountUsed: number;
    noDiscount: number;
  }>('/api/admin/analytics/weekly-change');
};

export const fetchAdminMonthlyOrdersLine = () => {
  return api.get<{ month: string; count: number }[]>(
    '/api/admin/analytics/monthly-line'
  );
};

export const fetchAdminWeeklySalesChangeLine = () => {
  return api.get<{
    currentWeek: number;
    previousWeek: number;
    pctChange: number | null;
    discountUsed: number;
    noDiscount: number;
  }>('/api/admin/analytics/weekly-line');
};

export const fetchAdminWeeklyCompletionStats = () => {
  return api.get<{ date: string; completed: number; active: number }[]>(
    '/api/admin/analytics/weekly-completion'
  );
};

export const fetchAdminWeeklyCouponRatios = () => {
  return api.get<{ date: string; completed: number; canceled: number }[]>(
    '/api/admin/analytics/weekly-sales-ratio'
  );
};

export const fetchAdminCustomerSummary = () => {
  return api.get('/api/admin/analytics/customer-summary');
};

// ===================================
// Admin Blog APIs
// ===================================

export const fetchAllBlogPost = () => {
  return api.get('/api/admin/blog/all');
};

// ===================================
// Admin Blog APIs
// ===================================

export function createPayment(
  data:{ amount: number; tx_ref: string; customer: Record<string, any> }
) {
  return api.post('/api/payments/create', data);
}

// Verify payment and place order: returns receipt
export function verifyAndPlace(
  data: { transaction_id: string; order: OrderRequest }
) {
  return api.post<
    { transaction_id: string; order: OrderRequest },
    any
  >('/api/payments/verify', data);
}
