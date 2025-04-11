// index.tsx (or main.tsx)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/Index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShoppingPageHome from './Component/pages/Home';
import AdminHome from './Component/pages/Admin';
import ProtectedRoute from './Component/Admin Component/security/ProtectedRoute';

// This is just for demo purposes. Replace with your actual authentication logic.
const userIsAuthenticated = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<ShoppingPageHome />} />

        {/* Admin Route wrapped in a ProtectedRoute */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={userIsAuthenticated}>
              <AdminHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
