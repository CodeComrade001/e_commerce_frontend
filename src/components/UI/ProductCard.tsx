import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
  onWishlist?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onWishlist }) => {
  const { dispatch } = useApp();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-poppins font-medium">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full font-poppins font-medium">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onWishlist?.(product)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full text-pink-500 hover:bg-pink-500 hover:text-white transition-colors duration-200"
        >
          <Heart className="h-4 w-4" />
        </motion.button>

        {/* Quick Add to Cart */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          onClick={handleAddToCart}
          className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-pink-500 text-white px-4 py-2 rounded-full font-poppins font-medium text-sm flex items-center space-x-2 hover:bg-pink-600"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Add to Cart</span>
        </motion.button>
      </div>

      <div className="p-4">
        <h3 className="font-quicksand font-semibold text-gray-800 mb-1 group-hover:text-pink-500 transition-colors duration-200">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-2 font-poppins line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center space-x-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-3 w-3 ${
                star <= product.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1 font-poppins">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-pink-600 font-poppins">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through font-poppins">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <span className="text-xs text-gray-500 font-poppins">
            {product.stock} in stock
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
