import React from 'react';
import { FaSun, FaMoon, FaLeaf } from 'react-icons/fa';

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
    buttonColor: 'bg-orange-600 hover:bg-orange-700',
    borderColor: 'border-gray-200'
  },
  {
    id: 'dark',
    name: 'Dark',
    icon: FaMoon,
    gradient: 'bg-gradient-to-r from-gray-800 via-gray-900 to-black',
    headerGradient: 'bg-gray-800',
    textColor: 'text-white',
    bgColor: 'bg-gray-900',
    cardBg: 'bg-gray-800',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    borderColor: 'border-gray-700'
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
    borderColor: 'border-green-200'
  }
];

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="p-6 rounded-lg shadow-md bg-opacity-50">
      <h2 className="text-xl font-semibold mb-4">Choose Theme</h2>
      <div className="grid grid-cols-3 gap-4">
        {themes.map(theme => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme)}
            className={`
              p-4 rounded-lg flex flex-col items-center gap-2 transition-all
              ${currentTheme.id === theme.id ? 
                `${theme.gradient} shadow-lg scale-105` : 
                'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
              }
            `}
          >
            <theme.icon className="text-2xl" />
            <span className="font-medium">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector; 