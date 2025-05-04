export interface ProductDetail {
  id: number;
  qty: number;
  price: number;
  title: string;
  category: string;
  image_url: string;
  description: string;
}

export interface OrderHistoryItem {
  order_id: number;
  product_details: ProductDetail[];
  ordered_at: string; // ISO timestamp; you can parse to Date if you like
}

export interface GetUserDetailsType {
  nameProp: string,
  emailProp: string,
  avatar_urlProp: string,
  addressProp: string,
  phoneProp: string
}

// src/types/wishlist.ts
export interface WishlistItem {
  wishlist_id: number;
  wishlistProductId: number;
  created_at: string;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
}
