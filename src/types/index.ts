export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  stock: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  lastLogin?: Date;
  device?: string;
  location?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'unverified';
  createdAt: Date;
  shippingAddress: Address;
  userDetails: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface SecurityLog {
  id: string;
  type: 'failed_login' | 'suspicious_location' | 'unauthorized_access';
  userId?: string;
  email: string;
  ip: string;
  location: string;
  device: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}
