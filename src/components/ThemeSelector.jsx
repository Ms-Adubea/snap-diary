import React from 'react';
import { FaSun, FaMoon, FaLeaf, FaHome } from 'react-icons/fa';

const themes = [
  {
    id: 'light',
    name: 'Light',
    icon: FaSun,
    gradient: 'bg-gradient-to-r from-pink-200 via-orange-200 to-yellow-200',
    headerGradient: 'bg-pink-400',
    textColor: 'text-gray-800',
    bgColor: 'bg-gray-50',
    cardBg: 'bg-white',
    buttonColor: 'bg-pink-600 hover:bg-pink-700',
    borderColor: 'border-gray-200',
    formBg: 'bg-red-200'
  },
  {
    id: 'dark',
    name: 'Dark',
    icon: FaMoon,
    gradient: 'bg-gradient-to-r from-gray-800 via-gray-900 to-black',
    headerGradient: 'bg-gray-800',
    textColor: 'text-white',
    bgColor: 'bg-gray-900',
    cardBg: 'bg-gray-600',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    borderColor: 'border-gray-700',
    formBg: 'bg-gray-200'
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: FaLeaf,
    gradient: 'bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400',
    headerGradient: 'bg-green-600',
    textColor: 'text-gray-800',
    bgColor: 'bg-green-50',
    cardBg: 'bg-white',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    borderColor: 'border-green-200',
    formBg: 'bg-green-200'
  },
  {
    id: 'cozy',
    name: 'Cozy',
    icon: FaHome,
    gradient: 'bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500',
    headerGradient: 'bg-blue-600',
    textColor: 'text-gray-800',
    bgColor: 'bg-blue-50',
    cardBg: 'bg-white',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    borderColor: 'border-blue-200',
    formBg: 'bg-blue-200'
  }
];

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="p-6 rounded-lg shadow-md bg-opacity-50">
      <h2 className="text-xl font-semibold mb-4">Choose Theme</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {themes.map(theme => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme)}
            className={`
              p-4 rounded-lg flex flex-col items-center gap-2 transition-all
              ${currentTheme.id === theme.id 
                ? `${theme.gradient} shadow-lg scale-105 text-white` 
                : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700'
              }
            `}
          >
            <theme.icon className={`text-2xl ${currentTheme.id === theme.id ? 'text-white' : theme.buttonColor}`} />
            <span className={`font-medium ${currentTheme.id === theme.id ? 'text-white' : ''}`}>
              {theme.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector; 