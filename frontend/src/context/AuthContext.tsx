// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCurrentUser } from '../services/api';

interface AuthContextType { userId: number | null; }
const AuthContext = createContext<AuthContextType>({ userId: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);
  console.log("🚀 ~ AuthProvider ~ userId:", userId)

  useEffect(() => {
    getCurrentUser()
      .then(res => setUserId(res.data.userId))
      .catch(() => setUserId(null));
  }, []);

  return (
    <AuthContext.Provider value={{ userId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
