import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaUser, FaCog, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/auth';

const Header = ({ toggleSidebar, theme }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getCurrentUser();
    if (userData) {
      setUser(userData);
      console.log('User data:', userData); // Debug log to see user data structure
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`${theme.headerGradient} text-white p-4 flex items-center justify-between`}>
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden text-2xl"
        >
          <FaBars />
        </button>
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <FaHome className="text-2xl" />
          <span className="text-xl font-semibold" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Snap Diary
          </span>
        </Link>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 hover:bg-black/10 rounded-lg px-3 py-2 transition-colors"
        >
          {user?.avatar ? (
            <img 
              src={`https://savefiles.org/${user.avatar}?shareable_link=509`}
              alt={user.firstName} 
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border-2 border-white">
              <FaUser className="text-white" />
            </div>
          )}
          <span className="font-medium">{user?.firstName || 'User'}</span>
        </button>

        {showDropdown && (
          <div className={`absolute right-0 mt-2 w-48 ${theme.cardBg} rounded-lg shadow-lg py-2 z-50 border ${theme.borderColor}`}>
            <button 
              onClick={() => {
                setShowDropdown(false);
                navigate('/profile');
              }}
              className={`w-full text-left px-4 py-2 ${theme.textColor} hover:bg-black/10 flex items-center gap-2`}
            >
              <FaUser className="opacity-70" />
              Profile
            </button>
            <button 
              onClick={() => {
                setShowDropdown(false);
                navigate('/settings');
              }}
              className={`w-full text-left px-4 py-2 ${theme.textColor} hover:bg-black/10 flex items-center gap-2`}
            >
              <FaCog className="opacity-70" />
              Settings
            </button>
            <div className={`border-t ${theme.borderColor} my-2`}></div>
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-black/10 flex items-center gap-2"
            >
              <FaSignOutAlt className="opacity-70" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
