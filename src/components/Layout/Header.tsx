import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, User, Menu, X, Search, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-gradient-pink shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center space-x-2"
            >
              <Heart className="h-8 w-8 text-pink-500 animate-heart-beat" fill="currentColor" />
              <span className="font-dancing text-2xl font-bold text-purple-700">
                Bella Boutique
              </span>
              <Sparkles className="h-5 w-5 text-pink-500 animate-pulse" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-purple-700 hover:text-pink-500 transition-colors duration-200 font-poppins font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-purple-700 hover:text-pink-500 transition-colors duration-200"
            >
              <Search className="h-5 w-5" />
            </motion.button>

            {/* Cart */}
            <Link to="/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 text-purple-700 hover:text-pink-500 transition-colors duration-200"
              >
                <ShoppingBag className="h-5 w-5" />
                {state.cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-poppins font-medium"
                  >
                    {state.cartCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* User Menu */}
            <div className="relative">
              {state.isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Link to={state.user?.role === 'admin' ? '/admin' : '/dashboard'}>
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={state.user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'}
                      alt={state.user?.name}
                      className="h-8 w-8 rounded-full object-cover border-2 border-pink-300"
                    />
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="hidden sm:block text-xs px-3 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-200 font-poppins"
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <Link to="/auth">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-purple-700 hover:text-pink-500 transition-colors duration-200"
                  >
                    <User className="h-5 w-5" />
                  </motion.div>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-purple-700 hover:text-pink-500 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pb-4"
            >
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 rounded-full border-2 border-pink-200 focus:border-pink-400 focus:outline-none font-poppins"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-64 bg-gradient-pink shadow-xl z-50 md:hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="font-dancing text-xl font-bold text-purple-700">Menu</span>
                <button
                  title="Open menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-purple-700 hover:text-pink-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-purple-700 hover:text-pink-500 transition-colors duration-200 font-poppins font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                {state.isAuthenticated && (
                  <>
                    <Link
                      to={state.user?.role === 'admin' ? '/admin' : '/dashboard'}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 text-purple-700 hover:text-pink-500 transition-colors duration-200 font-poppins font-medium"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-purple-700 hover:text-pink-500 transition-colors duration-200 font-poppins font-medium"
                    >
                      Logout
                    </button>
                  </>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
