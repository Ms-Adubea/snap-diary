import React from 'react';
import { FaTimes, FaStar } from 'react-icons/fa';

const ViewEntry = ({ entry, onClose, onToggleFavorite, theme }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${theme.cardBg} max-w-3xl w-full mx-4 rounded-lg shadow-xl overflow-hidden`}>
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-2xl font-bold">{entry.title}</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onToggleFavorite(entry.id)}
                            className={`p-2 rounded-full transition-colors ${
                                entry.favorites ? 'text-yellow-500' : 'text-gray-400'
                            }`}
                        >
                            <FaStar />
                        </button>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>
                </div>
                
                <div className="p-4">
                    {entry.image && (
                        <div className="mb-4">
                            <img
                                src={`https://savefiles.org/${entry.image}?shareable_link=509`}
                                alt={entry.title}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>
                    )}
                    
                    <p className="text-gray-600 mt-4">{entry.description}</p>
                    
                    {entry.event && (
                        <div className="mt-4 p-2 bg-blue-50 rounded-lg">
                            <span className="text-sm text-blue-600">
                                Collection: {entry.event.eventName}
                            </span>
                        </div>
                    )}
                    
                    <div className="mt-4 text-sm text-gray-500">
                        Created on: {new Date(entry.createdAt).toLocaleDateString()}
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                        Updated on: {new Date(entry.updatedAt).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEntry; 