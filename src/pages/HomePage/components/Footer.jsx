import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebook, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Snap Diary
            </h3>
            <p className="text-white mb-4">
              Capture and preserve your precious memories in a beautiful digital journal.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <FaFacebook size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white hover:text-gray-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-gray-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-white hover:text-gray-300 transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-white">
              <li>Email: support@snapdiary.com</li>
              <li>Phone: + (233) 123-4567</li>
              <li>Address: 123 Memory Lane</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-white">
          <p className="flex items-center justify-center gap-1">
            Made with <FaHeart className="text-red-500" /> by Snap Diary Team
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Snap Diary. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 