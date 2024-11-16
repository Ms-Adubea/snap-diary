import React, { useState } from 'react';
import { FaSearch, FaCalendar, FaTimes } from 'react-icons/fa';

const SearchBar = ({ onSearch, onClear, theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ searchTerm, startDate, endDate });
  };

  const handleClear = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or description..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Date Range */}
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
            />
            <FaCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <span className="self-center">to</span>
          <div className="relative">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
            />
            <FaCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className={`px-4 py-2 ${theme.buttonColor} text-white rounded-lg transition-colors`}
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;