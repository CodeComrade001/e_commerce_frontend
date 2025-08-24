import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Package, 
  Settings, 
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { products, mockOrders, mockSecurityLogs } from '../data/mockData';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'orders', name: 'Orders', icon: ShoppingBag },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'security', name: 'Security', icon: AlertTriangle },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const stats = [
    { name: 'Total Revenue', value: '$24,532', change: '+12%', icon: DollarSign, color: 'text-green-600' },
    { name: 'Orders', value: '342', change: '+8%', icon: ShoppingBag, color: 'text-blue-600' },
    { name: 'Products', value: '48', change: '+3%', icon: Package, color: 'text-purple-600' },
    { name: 'Users', value: '1,234', change: '+15%', icon: Users, color: 'text-pink-600' },
  ];

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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const verifyPayment = (orderId: string) => {
    // Mock payment verification
    console.log(`Verifying payment for order ${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-rose py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-dancing text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-purple-600 font-poppins">
            Manage your boutique with ease
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
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="font-quicksand font-semibold text-2xl text-purple-800 mb-6">
                    Business Overview
                  </h2>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <motion.div
                          key={stat.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gradient-purple p-6 rounded-2xl"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <Icon className={`h-8 w-8 ${stat.color}`} />
                            <span className="text-green-600 font-poppins font-semibold text-sm">
                              {stat.change}
                            </span>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-purple-800 mb-1">
                              {stat.value}
                            </p>
                            <p className="text-purple-600 font-poppins text-sm">
                              {stat.name}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Recent Activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-quicksand font-semibold text-lg text-purple-800 mb-4">
                        Recent Orders
                      </h3>
                      <div className="space-y-4">
                        {mockOrders.slice(0, 3).map((order) => (
                          <div key={order.id} className="p-4 bg-purple-50 rounded-xl">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-poppins font-semibold text-purple-800">
                                  Order #{order.id}
                                </p>
                                <p className="text-purple-600 text-sm">
                                  {order.userDetails.name}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-poppins font-semibold text-purple-800">
                                  ${order.total.toFixed(2)}
                                </p>
                                <span className={`px-2 py-1 rounded-full text-xs font-poppins font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                                  {order.paymentStatus}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-quicksand font-semibold text-lg text-purple-800 mb-4">
                        Top Products
                      </h3>
                      <div className="space-y-4">
                        {products.slice(0, 3).map((product) => (
                          <div key={product.id} className="p-4 bg-purple-50 rounded-xl">
                            <div className="flex items-center space-x-4">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="font-poppins font-semibold text-purple-800">
                                  {product.name}
                                </p>
                                <p className="text-purple-600 text-sm">
                                  ${product.price} • {product.stock} in stock
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Products Tab */}
              {activeTab === 'products' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-quicksand font-semibold text-2xl text-purple-800">
                      Product Management
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-pink-500 text-white px-4 py-2 rounded-xl font-poppins font-medium hover:bg-pink-600 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Add Product</span>
                    </motion.button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-purple-100">
                          <th className="text-left py-4 px-4 font-poppins font-semibold text-purple-800">Product</th>
                          <th className="text-left py-4 px-4 font-poppins font-semibold text-purple-800">Category</th>
                          <th className="text-left py-4 px-4 font-poppins font-semibold text-purple-800">Price</th>
                          <th className="text-left py-4 px-4 font-poppins font-semibold text-purple-800">Stock</th>
                          <th className="text-left py-4 px-4 font-poppins font-semibold text-purple-800">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b border-purple-50 hover:bg-purple-25">
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded-lg"
                                />
                                <div>
                                  <p className="font-poppins font-medium text-purple-800">
                                    {product.name}
                                  </p>
                                  <p className="text-purple-600 text-sm">
                                    ⭐ {product.rating} ({product.reviews})
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 font-poppins text-purple-600">
                              {product.category}
                            </td>
                            <td className="py-4 px-4 font-poppins font-semibold text-purple-800">
                              ${product.price}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-1 rounded-full text-sm font-poppins font-medium ${
                                product.stock > 10 
                                  ? 'text-green-600 bg-green-100' 
                                  : product.stock > 5 
                                  ? 'text-yellow-600 bg-yellow-100'
                                  : 'text-red-600 bg-red-100'
                              }`}>
                                {product.stock}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors duration-200"
                                >
                                  <Eye className="h-4 w-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                                >
                                  <Edit className="h-4 w-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </motion.button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="font-quicksand font-semibold text-2xl text-purple-800 mb-6">
                    Order Management
                  </h2>

                  <div className="space-y-6">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border border-purple-100 rounded-2xl p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="font-poppins font-semibold text-purple-800">
                              Order #{order.id}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-poppins font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                              {order.paymentStatus === 'unverified' && '⚠️ '}{order.paymentStatus}
                            </span>
                            <span className="text-purple-600 font-poppins text-sm">
                              {order.createdAt.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-right mt-2 lg:mt-0">
                            <p className="font-poppins font-semibold text-purple-800">
                              ${order.total.toFixed(2)}
                            </p>
                            <p className="text-purple-600 text-sm font-poppins">
                              {order.userDetails.name}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-poppins font-semibold text-purple-700 mb-3">Items</h4>
                            <div className="space-y-2">
                              {order.items.map((item) => (
                                <div key={item.product.id} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                                  <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-10 h-10 object-cover rounded-lg"
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
                          </div>

                          <div>
                            <h4 className="font-poppins font-semibold text-purple-700 mb-3">Shipping Address</h4>
                            <div className="p-3 bg-purple-50 rounded-xl">
                              <p className="font-poppins text-purple-800 text-sm">
                                {order.userDetails.name}
                              </p>
                              <p className="text-purple-600 text-sm">{order.shippingAddress.street}</p>
                              <p className="text-purple-600 text-sm">
                                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                              </p>
                              <p className="text-purple-600 text-sm">{order.shippingAddress.country}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-purple-100 text-purple-600 rounded-xl font-poppins font-medium hover:bg-purple-200 transition-colors duration-200 text-sm"
                          >
                            Update Status
                          </motion.button>
                          {order.paymentStatus === 'unverified' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => verifyPayment(order.id)}
                              className="px-4 py-2 bg-green-100 text-green-600 rounded-xl font-poppins font-medium hover:bg-green-200 transition-colors duration-200 text-sm flex items-center space-x-2"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Verify Payment</span>
                            </motion.button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl font-poppins font-medium hover:bg-blue-200 transition-colors duration-200 text-sm"
                          >
                            Contact Customer
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="font-quicksand font-semibold text-2xl text-purple-800 mb-6">
                    Security Monitoring
                  </h2>

                  <div className="space-y-6">
                    {mockSecurityLogs.map((log) => (
                      <div key={log.id} className="border border-purple-100 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <AlertTriangle className="h-6 w-6 text-red-500" />
                            <div>
                              <p className="font-poppins font-semibold text-purple-800">
                                {log.type.replace('_', ' ').toUpperCase()}
                              </p>
                              <p className="text-purple-600 text-sm">
                                {log.timestamp.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-poppins font-medium ${getSeverityColor(log.severity)}`}>
                            {log.severity.toUpperCase()}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-poppins">
                          <div>
                            <span className="text-purple-600">Email: </span>
                            <span className="text-purple-800">{log.email}</span>
                          </div>
                          <div>
                            <span className="text-purple-600">IP Address: </span>
                            <span className="text-purple-800">{log.ip}</span>
                          </div>
                          <div>
                            <span className="text-purple-600">Location: </span>
                            <span className="text-purple-800">{log.location}</span>
                          </div>
                          <div>
                            <span className="text-purple-600">Device: </span>
                            <span className="text-purple-800">{log.device}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-xl font-poppins font-medium hover:bg-red-200 transition-colors duration-200 text-sm"
                          >
                            Block IP
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-yellow-100 text-yellow-600 rounded-xl font-poppins font-medium hover:bg-yellow-200 transition-colors duration-200 text-sm"
                          >
                            Investigate
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-poppins font-medium hover:bg-gray-200 transition-colors duration-200 text-sm"
                          >
                            Mark as Safe
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other tabs would be implemented similarly */}
              {(activeTab === 'users' || activeTab === 'settings') && (
                <div className="text-center py-16">
                  <Package className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                  <h3 className="font-quicksand font-semibold text-xl text-purple-800 mb-2">
                    Coming Soon
                  </h3>
                  <p className="text-purple-600 font-poppins">
                    This section is under development
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
