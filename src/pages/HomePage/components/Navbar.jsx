import React from 'react';
import { Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 shadow-md z-10"
      style={{ fontFamily: "'Dancing Script', cursive" }}
    >
      <div className="flex items-center">
        <Camera className="h-8 w-8 mr-2 text-white" />
        <Link to="/" className="text-white font-bold text-xl">Snap Diary</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/about" className="text-white hover:text-gray-200 transition-colors">About Us</Link>
        <Link to="/signup" className="text-white hover:text-gray-200 transition-colors">Sign Up</Link>
        <Link to="/login" className="text-white hover:text-gray-200 transition-colors">Sign In</Link>
      </div>
    </nav>
  );
};

export default Navbar;
