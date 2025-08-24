import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Monitor,
  CheckCircle,
  Clock,
  Truck,
  Package
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockOrders } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { state } = useApp();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (location.state?.orderSuccess) {
      setShowOrderSuccess(true);
      setOrderId(location.state.orderId);
      setActiveTab('orders');
    }
  }, [location.state]);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: ShoppingBag },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <Package className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'unverified':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-rose py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {showOrderSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="font-quicksand font-semibold text-green-800">Order Placed Successfully!</h3>
                <p className="text-green-600 font-poppins">
                  Your order #{orderId} has been placed and will be processed soon.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-dancing text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Welcome back, {state.user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-purple-600 font-poppins">
            Manage your profile, orders, and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              {/* User Info */}
              <div className="text-center mb-8">
                <img
                  src={state.user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'}
                  alt={state.user?.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-pink-200"
                />
                <h3 className="font-quicksand font-semibold text-purple-800">{state.user?.name}</h3>
                <p className="text-purple-600 text-sm font-poppins">{state.user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      whileHover={{ x: 5 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 ${
                        activeTab === tab.id
                          ? 'bg-pink-100 text-pink-600 border-l-4 border-pink-500'
                          : 'text-purple-600 hover:bg-purple-50 hover:text-purple-800'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-poppins font-medium">{tab.name}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="font-quicksand font-semibold text-2xl text-purple-800 mb-6">
                    Profile Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                          Full Name
                        </label>
                        <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                          <User className="h-5 w-5 text-purple-400" />
                          <span className="font-poppins text-purple-800">{state.user?.name}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                          Email Address
                        </label>
                        <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                          <Mail className="h-5 w-5 text-purple-400" />
                          <span className="font-poppins text-purple-800">{state.user?.email}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                          Phone Number
                        </label>
                        <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                          <Phone className="h-5 w-5 text-purple-400" />
                          <span className="font-poppins text-purple-800">+1 (555) 123-4567</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                          Address
                        </label>
                        <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-xl">
                          <MapPin className="h-5 w-5 text-purple-400 mt-0.5" />
                          <div className="font-poppins text-purple-800">
                            <p>123 Fashion Avenue</p>
                            <p>New York, NY 10001</p>
                            <p>United States</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                          Last Login
                        </label>
                        <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                          <Calendar className="h-5 w-5 text-purple-400" />
                          <span className="font-poppins text-purple-800">
                            {state.user?.lastLogin?.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                          Device
                        </label>
                        <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                          <Monitor className="h-5 w-5 text-purple-400" />
                          <span className="font-poppins text-purple-800">{state.user?.device}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-pink-500 text-white px-6 py-3 rounded-xl font-poppins font-semibold hover:bg-pink-600 transition-colors duration-200"
                    >
                      Edit Profile
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-quicksand font-semibold text-2xl text-purple-800">
                      Order History
                    </h2>
                    <Link to="/shop">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-pink-500 text-white px-4 py-2 rounded-xl font-poppins font-medium hover:bg-pink-600 transition-colors duration-200"
                      >
                        Shop Again
                      </motion.button>
                    </Link>
                  </div>
                  
                  <div className="space-y-6">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border border-purple-100 rounded-2xl p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(order.status)}
                              <span className="font-poppins font-semibold text-purple-800">
                                Order #{order.id}
                              </span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-poppins font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                              {order.paymentStatus === 'unverified' && '⚠️ '}{order.paymentStatus}
                            </span>
                          </div>
                          <div className="text-right mt-2 md:mt-0">
                            <p className="font-poppins font-semibold text-purple-800">
                              ${order.total.toFixed(2)}
                            </p>
                            <p className="text-purple-600 text-sm font-poppins">
                              {order.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {order.items.map((item) => (
                            <div key={item.product.id} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="font-poppins font-medium text-purple-800 text-sm">
                                  {item.product.name}
                                </p>
                                <p className="text-purple-600 text-xs">
                                  Qty: {item.quantity} × ${item.product.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-purple-100 text-purple-600 rounded-xl font-poppins font-medium hover:bg-purple-200 transition-colors duration-200 text-sm"
                          >
                            View Details
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-purple-100 text-purple-600 rounded-xl font-poppins font-medium hover:bg-purple-200 transition-colors duration-200 text-sm"
                          >
                            Track Package
                          </motion.button>
                          {order.paymentStatus === 'unverified' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-orange-100 text-orange-600 rounded-xl font-poppins font-medium hover:bg-orange-200 transition-colors duration-200 text-sm"
                            >
                              Report Issue
                            </motion.button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="font-quicksand font-semibold text-2xl text-purple-800 mb-6">
                    Your Wishlist
                  </h2>
                  <div className="text-center py-16">
                    <Heart className="h-16 w-16 text-pink-300 mx-auto mb-4" />
                    <h3 className="font-quicksand font-semibold text-xl text-purple-800 mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="text-purple-600 font-poppins mb-6">
                      Start adding items you love to keep track of them
                    </p>
                    <Link to="/shop">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-pink-500 text-white px-6 py-3 rounded-xl font-poppins font-semibold hover:bg-pink-600 transition-colors duration-200"
                      >
                        Browse Products
                      </motion.button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="font-quicksand font-semibold text-2xl text-purple-800 mb-6">
                    Account Settings
                  </h2>
                  <div className="space-y-6">
                    <div className="p-6 border border-purple-100 rounded-2xl">
                      <h3 className="font-quicksand font-semibold text-lg text-purple-800 mb-4">
                        Email Preferences
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-purple-200 text-pink-500 focus:ring-pink-500" defaultChecked />
                          <span className="font-poppins text-purple-700">Marketing emails</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-purple-200 text-pink-500 focus:ring-pink-500" defaultChecked />
                          <span className="font-poppins text-purple-700">Order updates</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-purple-200 text-pink-500 focus:ring-pink-500" />
                          <span className="font-poppins text-purple-700">SMS notifications</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="p-6 border border-purple-100 rounded-2xl">
                      <h3 className="font-quicksand font-semibold text-lg text-purple-800 mb-4">
                        Privacy Settings
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-purple-200 text-pink-500 focus:ring-pink-500" defaultChecked />
                          <span className="font-poppins text-purple-700">Allow personalized recommendations</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-purple-200 text-pink-500 focus:ring-pink-500" />
                          <span className="font-poppins text-purple-700">Share data with partners</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-pink-500 text-white px-6 py-3 rounded-xl font-poppins font-semibold hover:bg-pink-600 transition-colors duration-200"
                      >
                        Save Changes
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-500 text-white px-6 py-3 rounded-xl font-poppins font-semibold hover:bg-red-600 transition-colors duration-200"
                      >
                        Delete Account
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
