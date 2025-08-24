import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Sparkles, Star, ShoppingBag } from 'lucide-react';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/UI/ProductCard';

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 4);
  const featuredCategories = categories.slice(1, 5); // Exclude "All Items"

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-pink py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 text-pink-300 opacity-50">
            <Heart className="h-8 w-8 animate-float" fill="currentColor" />
          </div>
          <div className="absolute top-32 right-20 text-purple-300 opacity-50">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </div>
          <div className="absolute bottom-20 left-1/4 text-pink-200 opacity-50">
            <Star className="h-10 w-10 animate-bounce-gentle" fill="currentColor" />
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-dancing text-4xl md:text-6xl font-bold text-purple-800 mb-6">
                Fashion That 
                <span className="text-pink-600"> Sparkles</span>
              </h1>
              <p className="text-lg text-purple-600 mb-8 font-poppins">
                Discover our curated collection of elegant, feminine pieces that make 
                every moment feel special. From everyday essentials to statement pieces, 
                find your perfect style.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-pink-500 text-white px-8 py-3 rounded-full font-poppins font-semibold hover:bg-pink-600 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Shop Now</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-pink-500 px-8 py-3 rounded-full font-poppins font-semibold border-2 border-pink-200 hover:border-pink-300 transition-colors duration-200"
                >
                  View Lookbook
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Fashion Model"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -top-4 -left-4 bg-pink-400 text-white px-4 py-2 rounded-full text-sm font-poppins font-semibold animate-bounce-gentle">
                  New Collection ✨
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-dancing text-3xl md:text-4xl font-bold text-purple-800 mb-4">
              Shop by Category
            </h2>
            <p className="text-purple-600 font-poppins max-w-2xl mx-auto">
              Explore our carefully curated categories to find exactly what you're looking for
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-rose rounded-2xl p-6 text-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-quicksand font-semibold text-purple-800 mb-2">
                  {category.name}
                </h3>
                <p className="text-purple-600 text-sm font-poppins">
                  {category.count} items
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-dancing text-3xl md:text-4xl font-bold text-purple-800 mb-4">
              Featured Products
            </h2>
            <p className="text-purple-600 font-poppins max-w-2xl mx-auto">
              Handpicked favorites that our customers absolutely love
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-500 text-white px-8 py-3 rounded-full font-poppins font-semibold hover:bg-pink-600 transition-colors duration-200"
              >
                View All Products
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-pink rounded-3xl p-8 md:p-12"
          >
            <h2 className="font-dancing text-3xl md:text-4xl font-bold text-purple-800 mb-4">
              Stay in the Loop
            </h2>
            <p className="text-purple-600 font-poppins mb-8 max-w-2xl mx-auto">
              Be the first to know about new arrivals, exclusive offers, and styling tips. 
              Join our community of fashion lovers!
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border-2 border-pink-200 focus:border-pink-400 focus:outline-none font-poppins"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-500 text-white px-8 py-3 rounded-full font-poppins font-semibold hover:bg-pink-600 transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
