import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaUser, FaCog } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';

const Header = ({ toggleSidebar, user, theme }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`${theme.headerGradient} text-white p-4 flex items-center justify-between`}>
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden text-2xl"
        >
          <FaBars />
        </button>
        <a href="/" className="text-xl font-semibold flex items-center">
          <AiFillHome className="mr-2" />
          Snap Diary
        </a>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 hover:bg-red-700 rounded-lg px-3 py-2 transition-colors"
        >
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.firstName} 
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center">
              <FaUser />
            </div>
          )}
          <span>{user?.firstName || 'User'}</span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <button 
              onClick={() => {/* Handle profile click */}}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <FaUser className="text-gray-400" />
              Profile
            </button>
            <button 
              onClick={() => {/* Handle settings click */}}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <FaCog className="text-gray-400" />
              Settings
            </button>
            <div className="border-t border-gray-100 my-2"></div>
            <button 
              onClick={() => {/* Handle logout */}}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
