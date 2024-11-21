import React from 'react';
import { FaThLarge, FaList } from 'react-icons/fa';

const ViewToggle = ({ isGridView, onToggle, theme }) => {
    return (
        <div className="flex gap-2">
            <button
                onClick={() => onToggle(true)}
                className={`p-2 rounded-lg transition-colors ${
                    isGridView 
                        ? `${theme.buttonColor} text-white` 
                        : 'text-gray-500 hover:bg-gray-100'
                }`}
                title="Grid View"
            >
                <FaThLarge />
            </button>
            <button
                onClick={() => onToggle(false)}
                className={`p-2 rounded-lg transition-colors ${
                    !isGridView 
                        ? `${theme.buttonColor} text-white` 
                        : 'text-gray-500 hover:bg-gray-100'
                }`}
                title="List View"
            >
                <FaList />
            </button>
        </div>
    );
};

export default ViewToggle; 