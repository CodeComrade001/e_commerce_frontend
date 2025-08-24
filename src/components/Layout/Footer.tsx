import React from 'react';
import { Heart, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-purple text-purple-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-pink-500 animate-heart-beat" fill="currentColor" />
              <span className="font-dancing text-2xl font-bold">Divineyah Boutique</span>
            </div>
            <p className="text-purple-600 mb-4 font-poppins">
              Your destination for elegant, feminine fashion. We curate the most beautiful pieces
              to make every woman feel confident and radiant.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-pink-100 rounded-full text-pink-500 hover:bg-pink-200 transition-colors duration-200"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-quicksand font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 font-poppins">
              {['About Us', 'Contact', 'Size Guide', 'Shipping Info', 'Returns'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-purple-600 hover:text-pink-500 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-quicksand font-semibold text-lg mb-4">Get in Touch</h3>
            <div className="space-y-3 font-poppins">
              <div className="flex items-center space-x-2 text-purple-600">
                <MapPin className="h-4 w-4 text-pink-500" />
                <span className="text-sm">123 Fashion Ave, NG 10001</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <Phone className="h-4 w-4 text-pink-500" />
                <span className="text-sm">+1 (555) 123-Divineyah Boutique</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <Mail className="h-4 w-4 text-pink-500" />
                <span className="text-sm">hello@divineyahboutique.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-600 text-sm font-poppins">
              © 2025 Divineyah Boutique. Made with <Heart className="inline h-4 w-4 text-pink-500" fill="currentColor" /> for fashion lovers.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-purple-600 hover:text-pink-500 text-sm font-poppins transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-purple-600 hover:text-pink-500 text-sm font-poppins transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
