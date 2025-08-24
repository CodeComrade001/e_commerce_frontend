import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useApp();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-rose flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <div className="mb-8">
            <ShoppingBag className="h-24 w-24 text-pink-300 mx-auto mb-4" />
            <h2 className="font-dancing text-3xl font-bold text-purple-800 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-purple-600 font-poppins mb-8">
              Looks like you haven't added anything to your cart yet. 
              Let's find you something beautiful!
            </p>
          </div>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-500 text-white px-8 py-3 rounded-full font-poppins font-semibold hover:bg-pink-600 transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Continue Shopping</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-rose py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/shop" className="inline-flex items-center space-x-2 text-purple-600 hover:text-pink-500 transition-colors duration-200 mb-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-poppins">Continue Shopping</span>
          </Link>
          <h1 className="font-dancing text-4xl md:text-5xl font-bold text-purple-800 mb-2">
            Shopping Cart
          </h1>
          <p className="text-purple-600 font-poppins">
            {state.cartCount} {state.cartCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {state.cart.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-quicksand font-semibold text-lg text-purple-800">
                          {item.product.name}
                        </h3>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </div>
                      
                      <p className="text-purple-600 text-sm font-poppins mb-4">
                        {item.product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors duration-200"
                          >
                            <Minus className="h-4 w-4" />
                          </motion.button>
                          <span className="font-poppins font-semibold text-purple-800 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors duration-200"
                          >
                            <Plus className="h-4 w-4" />
                          </motion.button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-bold text-pink-600 font-poppins text-lg">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-purple-500 font-poppins">
                            ${item.product.price} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
            >
              <h3 className="font-quicksand font-semibold text-xl text-purple-800 mb-6">
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between font-poppins">
                  <span className="text-purple-600">Subtotal</span>
                  <span className="font-semibold text-purple-800">
                    ${state.cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-poppins">
                  <span className="text-purple-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between font-poppins">
                  <span className="text-purple-600">Tax</span>
                  <span className="font-semibold text-purple-800">
                    ${(state.cartTotal * 0.08).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-purple-100 pt-4">
                  <div className="flex justify-between font-poppins text-lg">
                    <span className="font-semibold text-purple-800">Total</span>
                    <span className="font-bold text-pink-600">
                      ${(state.cartTotal * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Link to="/checkout" className="block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-pink-500 text-white py-3 rounded-full font-poppins font-semibold hover:bg-pink-600 transition-colors duration-200"
                  >
                    Proceed to Checkout
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-purple-100 text-purple-600 py-3 rounded-full font-poppins font-semibold hover:bg-purple-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Heart className="h-5 w-5" />
                  <span>Save for Later</span>
                </motion.button>
              </div>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t border-purple-100">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="w-full px-4 py-2 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-purple-500 text-white py-2 rounded-xl font-poppins font-medium text-sm hover:bg-purple-600 transition-colors duration-200"
                  >
                    Apply Code
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
