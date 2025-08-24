import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Auth from './pages/Auth';

// Lazy load pages for better performance
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <React.Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </React.Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
