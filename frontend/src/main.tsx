import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import ShoppingPageHome from './components/pages/Home';
import AdminHome from './components/pages/Admin';
import ProtectedRoute from './components/Admin Component/security/ProtectedRoute';
import { ProductProvider } from './context/ProductContext';
import LandingHomePage from './components/pages/LandingPage';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>                             {/* ← Move here, not inside <Routes> */}
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingHomePage />} />
            <Route path="/home" element={<ShoppingPageHome />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAuthenticated={true} >
                  <AdminHome />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);
