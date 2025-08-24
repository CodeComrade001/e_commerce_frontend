import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, CartItem, Product } from '../types';
import { mockUser, mockAdmin } from '../data/mockData';

interface AppState {
  user: User | null;
  cart: CartItem[];
  isAuthenticated: boolean;
  cartTotal: number;
  cartCount: number;
}

type AppAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const initialState: AppState = {
  user: null,
  cart: [],
  isAuthenticated: false,
  cartTotal: 0,
  cartCount: 0,
};

const calculateCartTotals = (cart: CartItem[]) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  return { total, count };
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      return {
        ...initialState,
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      let newCart;
      if (existingItem) {
        newCart = state.cart.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { product: action.payload, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      const { total: addTotal, count: addCount } = calculateCartTotals(newCart);
      return {
        ...state,
        cart: newCart,
        cartTotal: addTotal,
        cartCount: addCount,
      };
    case 'REMOVE_FROM_CART':
      const filteredCart = state.cart.filter(item => item.product.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(filteredCart));
      const { total: removeTotal, count: removeCount } = calculateCartTotals(filteredCart);
      return {
        ...state,
        cart: filteredCart,
        cartTotal: removeTotal,
        cartCount: removeCount,
      };
    case 'UPDATE_CART_QUANTITY':
      const updatedCart = state.cart.map(item =>
        item.product.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      const { total: updateTotal, count: updateCount } = calculateCartTotals(updatedCart);
      return {
        ...state,
        cart: updatedCart,
        cartTotal: updateTotal,
        cartCount: updateCount,
      };
    case 'CLEAR_CART':
      localStorage.removeItem('cart');
      return {
        ...state,
        cart: [],
        cartTotal: 0,
        cartCount: 0,
      };
    case 'LOAD_CART':
      const { total: loadTotal, count: loadCount } = calculateCartTotals(action.payload);
      return {
        ...state,
        cart: action.payload,
        cartTotal: loadTotal,
        cartCount: loadCount,
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({ state: initialState, dispatch: () => {} });

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(savedUser) });
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Helper functions for authentication
export const loginUser = (email: string, password: string) => {
  // Mock login logic
  if (email === 'admin@bellaboutique.com' && password === 'admin123') {
    return mockAdmin;
  } else if (email === 'emma@example.com' && password === 'user123') {
    return mockUser;
  }
  return null;
};

export const registerUser = (name: string, email: string, password: string) => {
  // Mock registration logic
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    role: 'user',
    lastLogin: new Date(),
    device: 'Chrome on ' + navigator.platform,
    location: 'Unknown',
  };
  return newUser;
};
