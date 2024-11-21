import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange, theme }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center mt-6 gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${theme.buttonColor} text-white px-3 py-2 rounded-lg disabled:opacity-50`}
            >
                <FaChevronLeft />
            </button>
            
            <span className="mx-4">
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${theme.buttonColor} text-white px-3 py-2 rounded-lg disabled:opacity-50`}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination; 