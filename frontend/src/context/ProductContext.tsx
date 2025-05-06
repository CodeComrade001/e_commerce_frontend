import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  ReactNode,
} from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
  qty?: number;
}

interface ProductContextType {
  cartProducts: Product[];
  addProduct: (prod: Product) => void;
  removeProduct: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
}

const ProductContext =
  createContext<ProductContextType | undefined>(undefined);

type ProviderProps = { children: ReactNode };
export const ProductProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const clearCart = useCallback(() => {
    setCartProducts([]);
  }, []);

  const addProduct = useCallback((prod: Product) => {
    setCartProducts(prev => {
      const exists = prev.find(p => p.id === prod.id);
      if (exists) return prev;
      return [...prev, { ...prod, qty: 1 }];
    });
  }, []);

  const removeProduct = useCallback((id: number) => {
    setCartProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, qty: number) => {
    setCartProducts(prev =>
      prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p)
    );
  }, []);

  return (
    <ProductContext.Provider value={{ cartProducts, addProduct, removeProduct, updateQuantity,clearCart }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProductContext must be used within <ProductProvider>");
  return context;
};