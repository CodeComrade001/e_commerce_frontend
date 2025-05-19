export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image_url: string | null;
  discount: number;
  created_at: string;
}

export type NewProduct = Omit<Product, 'id' | 'created_at'>;
export type UpdateProduct = Partial<NewProduct>;
