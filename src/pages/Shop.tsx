import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, List, Search, X } from 'lucide-react';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/UI/ProductCard';

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All Items') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedCategory, searchTerm, sortBy, priceRange]);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className="min-h-screen bg-gradient-rose">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-dancing text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Shop Collection
          </h1>
          <p className="text-purple-600 font-poppins">
            Discover your perfect style from our curated collection
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-8">
            <h3 className="font-quicksand font-semibold text-lg text-purple-800 mb-4">
              Categories
            </h3>
            <nav className="space-y-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ x: 5 }}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between ${selectedCategory === category.name
                    ? 'bg-pink-100 text-pink-600 border-l-4 border-pink-500'
                    : 'text-purple-600 hover:bg-purple-50 hover:text-purple-800'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-poppins font-medium">{category.name}</span>
                  </div>
                  <span className="text-sm bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Price Range Filter */}
            <div className="mt-8">
              <h4 className="font-quicksand font-semibold text-purple-800 mb-4">
                Price Range
              </h4>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  placeholder="1"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-purple-600 font-poppins">
                  <span>$0</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Filters Toggle */}
            <div className="lg:hidden mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(true)}
                className="bg-white px-4 py-2 rounded-xl shadow-md flex items-center space-x-2 text-purple-600 font-poppins font-medium"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </motion.button>
            </div>

            {/* Search and Controls */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                  />
                </div>

                {/* Sort */}
                <select
                  title="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>

                {/* View Mode */}
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid'
                      ? 'bg-pink-500 text-white'
                      : 'bg-purple-100 text-purple-600'
                      }`}
                  >
                    <Grid className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list'
                      ? 'bg-pink-500 text-white'
                      : 'bg-purple-100 text-purple-600'
                      }`}
                  >
                    <List className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <motion.div
              layout
              className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
                }`}
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-purple-600 font-poppins text-lg">
                  No products found matching your criteria.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory('All Items');
                    setSearchTerm('');
                    setPriceRange([0, 500]);
                  }}
                  className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full font-poppins font-medium hover:bg-pink-600 transition-colors duration-200"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 lg:hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-quicksand font-semibold text-lg text-purple-800">
                    Filters
                  </h3>
                  <button
                    title="Show filter"
                    onClick={() => setShowFilters(false)}
                    className="p-2 text-purple-600 hover:text-pink-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h4 className="font-quicksand font-semibold text-purple-800 mb-4">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          handleCategorySelect(category.name);
                          setShowFilters(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between ${selectedCategory === category.name
                          ? 'bg-pink-100 text-pink-600'
                          : 'text-purple-600 hover:bg-purple-50'
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{category.icon}</span>
                          <span className="font-poppins font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-quicksand font-semibold text-purple-800 mb-4">
                    Price Range
                  </h4>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-purple-600 font-poppins">
                      <span>$0</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
