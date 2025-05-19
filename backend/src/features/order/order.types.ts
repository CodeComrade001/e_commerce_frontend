// File: src/features/admin/order/order.types.ts
export interface ProductDetails {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user_id: number;
  complete_order: boolean;
  canceled_order: boolean;
  orders_at: Date;
  product_details: ProductDetails[];
}

export interface OrderProduct {
  id: number;
  qty: number;
  price: number;
  title: string;
  category: string;
  image_url: string;
  description: string;
}

// Groups products under a category label
export interface OrderCategoryGroup {
  id: number;
  user_id_gmail: string;
  user_id: string;
  ordered_at: string;
  products: OrderProduct[];
}
