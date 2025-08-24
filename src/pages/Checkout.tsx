import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User, Phone, Mail, Lock, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Checkout: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    // Payment Info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = () => {
    // Simulate order processing
    dispatch({ type: 'CLEAR_CART' });
    navigate('/dashboard', {
      state: {
        orderSuccess: true,
        orderId: 'ORD-' + Date.now().toString().slice(-6)
      }
    });
  };

  const steps = [
    { number: 1, title: 'Shipping', icon: MapPin },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Review', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-rose py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-dancing text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Checkout
          </h1>
          <p className="text-purple-600 font-poppins">
            Complete your order in just a few steps
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`flex items-center justify-center w-12 h-12 rounded-full ${currentStep >= step.number
                        ? 'bg-pink-500 text-white'
                        : 'bg-white text-purple-400 border-2 border-purple-200'
                      }`}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <span className={`ml-2 font-poppins font-medium ${currentStep >= step.number ? 'text-pink-600' : 'text-purple-400'
                    }`}>
                    {step.title}
                  </span>
                  {step.number < steps.length && (
                    <div className={`ml-4 h-0.5 w-16 ${currentStep > step.number ? 'bg-pink-500' : 'bg-purple-200'
                      }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div>
                  <h3 className="font-quicksand font-semibold text-xl text-purple-800 mb-6 flex items-center">
                    <MapPin className="h-6 w-6 mr-2 text-pink-500" />
                    Shipping Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                        placeholder="Enter your street address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                        placeholder="Enter your city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                        placeholder="Enter your state"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                        placeholder="Enter your ZIP code"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                        Country
                      </label>
                      <select
                        title="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                      >
                        <option value="USA">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div>
                  <h3 className="font-quicksand font-semibold text-xl text-purple-800 mb-6 flex items-center">
                    <CreditCard className="h-6 w-6 mr-2 text-pink-500" />
                    Payment Information
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                        Cardholder Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                          placeholder="Name on card"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                          CVV
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <div>
                  <h3 className="font-quicksand font-semibold text-xl text-purple-800 mb-6 flex items-center">
                    <CheckCircle className="h-6 w-6 mr-2 text-pink-500" />
                    Review Your Order
                  </h3>
                  <div className="space-y-6">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-poppins font-semibold text-purple-700 mb-4">Order Items</h4>
                      <div className="space-y-4">
                        {state.cart.map((item) => (
                          <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h5 className="font-poppins font-medium text-purple-800">{item.product.name}</h5>
                              <p className="text-purple-600 text-sm">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-pink-600 font-poppins font-semibold">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h4 className="font-poppins font-semibold text-purple-700 mb-4">Shipping Address</h4>
                      <div className="p-4 bg-purple-50 rounded-xl">
                        <p className="font-poppins text-purple-800">
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p className="text-purple-600">{formData.address}</p>
                        <p className="text-purple-600">
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                        <p className="text-purple-600">{formData.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-purple-100">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 bg-purple-100 text-purple-600 rounded-xl font-poppins font-medium hover:bg-purple-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </motion.button>

                {currentStep < 3 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-pink-500 text-white rounded-xl font-poppins font-medium hover:bg-pink-600 transition-colors duration-200"
                  >
                    Continue
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlaceOrder}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-poppins font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
                  >
                    Place Order
                  </motion.button>
                )}
              </div>
            </motion.div>
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

              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-poppins font-medium">Secure Checkout</span>
                </div>
                <p className="text-green-600 text-sm font-poppins mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
