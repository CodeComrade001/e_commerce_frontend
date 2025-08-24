import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Heart, Sparkles, Star, Mail, Lock, User, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { loginUser, registerUser } from '../context/AppContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.email) {
      newErrors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push('Please enter a valid email address');
    }

    if (!formData.password) {
      newErrors.push('Password is required');
    } else if (formData.password.length < 6) {
      newErrors.push('Password must be at least 6 characters long');
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.push('Name is required');
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.push('Passwords do not match');
      }
    }

    // Simulate security warnings for demo
    if (formData.email.includes('suspicious') || formData.email.includes('hacker')) {
      newErrors.push('⚠️ Suspicious activity detected from this email address');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      if (isLogin) {
        const user = loginUser(formData.email, formData.password);
        if (user) {
          dispatch({ type: 'LOGIN', payload: user });
          navigate(user.role === 'admin' ? '/admin' : '/dashboard');
        } else {
          setErrors(['Invalid email or password. Try admin@bellaboutique.com / admin123 or emma@example.com / user123']);
        }
      } else {
        const user = registerUser(formData.name, formData.email, formData.password);
        dispatch({ type: 'LOGIN', payload: user });
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors(['An error occurred. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-pink flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 text-pink-300 opacity-30">
          <Heart className="h-12 w-12 animate-float" fill="currentColor" />
        </div>
        <div className="absolute top-40 right-20 text-purple-300 opacity-30">
          <Sparkles className="h-8 w-8 animate-pulse" />
        </div>
        <div className="absolute bottom-32 left-1/4 text-pink-200 opacity-30">
          <Star className="h-16 w-16 animate-bounce-gentle" fill="currentColor" />
        </div>
        <div className="absolute bottom-20 right-10 text-purple-200 opacity-30">
          <Heart className="h-10 w-10 animate-heart-beat" fill="currentColor" />
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="h-10 w-10 text-pink-500 animate-heart-beat" fill="currentColor" />
            <span className="font-dancing text-3xl font-bold text-purple-800">
              Bella Boutique
            </span>
            <Sparkles className="h-8 w-8 text-pink-500 animate-pulse" />
          </div>
          <h2 className="font-quicksand text-2xl font-bold text-purple-800">
            {isLogin ? 'Welcome Back!' : 'Join Our Community'}
          </h2>
          <p className="mt-2 text-purple-600 font-poppins">
            {isLogin 
              ? 'Sign in to your account to continue shopping' 
              : 'Create an account to start your fashion journey'
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8"
        >
          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-purple-50 rounded-2xl">
            <h4 className="font-quicksand font-semibold text-purple-800 mb-2">Demo Credentials:</h4>
            <div className="text-sm font-poppins text-purple-600 space-y-1">
              <div><strong>Admin:</strong> admin@bellaboutique.com / admin123</div>
              <div><strong>User:</strong> emma@example.com / user123</div>
            </div>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl"
            >
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="font-quicksand font-semibold text-red-700">Security Alert</span>
              </div>
              <ul className="space-y-1 text-sm text-red-600 font-poppins">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins transition-colors duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins transition-colors duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-purple-700 font-poppins mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-xl focus:border-pink-300 focus:outline-none font-poppins transition-colors duration-200"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-poppins font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Please wait...</span>
                </>
              ) : (
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-purple-600 font-poppins">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors([]);
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                }}
                className="ml-2 text-pink-500 font-semibold hover:text-pink-600 transition-colors duration-200"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </motion.button>
            </p>
          </div>

          {isLogin && (
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-purple-500 hover:text-pink-500 font-poppins transition-colors duration-200">
                Forgot your password?
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
