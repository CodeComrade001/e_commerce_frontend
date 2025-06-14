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

export const addNewProduct = (
  data: {
    params: {
      price: string;
      title: string;
      quantity: string;
      discount: string;
      category: string;
      description: string;
      productImage?: File;
    }
  },
  config?: AxiosRequestConfig
) => {
  return api.post('/api/products/add-new', data, config);  // will hit http://localhost:3000/api/products
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

// ============================
// Admin Product APIs
// ============================

export const fetchAdminAllProducts = () => {
  return api.get('/api/admin/product/grouped');  // will hit http://localhost:3000/api/products
}

export const deleteProducts = (data: { id: number }) => {
  return api.delete(`/api/admin/product/:id${data}`);  // will hit http://localhost:3000/api/products
}

// ============================
// Admin Order APIs
// ============================

/**
 * Fetch all orders (sorted by orders_at desc)
 */
export const fetchAdminAllOrders = () => {
  return api.get('/api/admin/order/');
}

/**
 * Fetch orders in a date range: pass ?from=YYYY-MM-DD&to=YYYY-MM-DD
 */
export const fetchAdminOrdersByDateRange = (from: string, to: string) => {
  return api.get('/api/admin/order/range', { params: { from, to } });
}

/**
 * Fetch single order by ID
 */
export const fetchAdminOrderById = (id: number) => {
  return api.get(`/api/admin/order/${id}`);
}


/**
 * Mark order as complete
 */
export const completeAdminOrder = (id: number) => {
  return api.patch(`/api/admin/order/${id}/complete`);
}

/**
 * Mark order as canceled
 */
export const cancelAdminOrder = (id: number) => {
  return api.patch(`/api/admin/order/${id}/cancel`);
}

// ============================
// Admin Analytics APIs
// Base path: /api/admin/analytics
// ============================

/**
 * 1. Monthly bar‐chart data: total orders per calendar month.
 *    GET /api/admin/analytics/monthly
 *    Response: Array<{ month: string; count: number }>
 */
export const fetchAdminMonthlyOrders = () => {
  return api.get<{ month: string; count: number }[]>(
    '/api/admin/analytics/monthly'
  );
};

/**
 * 1b. Date‐range bar‐chart data: orders per day between start & end.
 *     GET /api/admin/analytics/range?start=YYYY-MM-DD&end=YYYY-MM-DD
 *     If `end` is omitted, backend uses current date.
 *     Response: Array<{ period: string; count: number }>
 */
export const fetchAdminOrdersInRange = (start: string, end?: string) => {
  return api.get<{ period: string; count: number }[]>(
    '/api/admin/analytics/range',
    { params: { start, end } }
  );
};

/**
 * 2. Weekly sales percentage change:
 *    GET /api/admin/analytics/weekly-change
 *    Response: {
 *      currentWeek: number;
 *      previousWeek: number;
 *      pctChange: number | null;
 *      discountUsed: number;
 *      noDiscount: number;
 *    }
 */
export const fetchAdminWeeklySalesChange = () => {
  return api.get<{
    currentWeek: number;
    previousWeek: number;
    pctChange: number | null;
    discountUsed: number;
    noDiscount: number;
  }>('/api/admin/analytics/weekly-change');
};

/**
 * 3. Line chart versions (same data as #1 & #2):
 *    GET /api/admin/analytics/monthly-line
 *    GET /api/admin/analytics/weekly-line
 */
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

/**
 * 4. Weekly completion stats (completed vs missed orders):
 *    GET /api/admin/analytics/weekly-completion
 *    Response: Array<{ week: string; completed: number; missed: number }>
 */
export const fetchAdminWeeklyCompletionStats = () => {
  return api.get<{ date: string; completed: number; active: number }[]>(
    '/api/admin/analytics/weekly-completion'
  );
};

/**
 * 5. Weekly coupon usage ratios (used vs unused):
 *    GET /api/admin/analytics/weekly-coupons
 *    Response: Array<{ week: string; usedRatio: number; unusedRatio: number }>
 */
export const fetchAdminWeeklyCouponRatios = () => {
  return api.get<{ date: string; completed: number; canceled: number }[]>(
    '/api/admin/analytics/weekly-sales-ratio'
  );
};

/**
 * 6. Customer purchase summary:
 *    GET /api/admin/analytics/customer-summary
 *    Response: Array<{
 *      email: string;
 *      avatar_url: string;
 *      totalSpent: number;
 *      totalDiscount: number;
 *    }>
 */
export const fetchAdminCustomerSummary = () => {
  return api.get('/api/admin/analytics/customer-summary');
};


// ============================
// Admin Blog APIs
// ============================

export const fetchAllBlogPost = () => {
  return api.get('/api/admin/blog/all');
};