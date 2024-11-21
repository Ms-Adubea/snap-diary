import React from 'react';
import { FaTimes, FaStar } from 'react-icons/fa';

const ViewEventEntries = ({ event, onClose, theme }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${theme.cardBg} max-w-4xl w-full mx-4 rounded-lg shadow-xl overflow-hidden`}>
                {/* Header */}
                <div className="p-4 flex justify-between items-center border-b">
                    <div>
                        <h2 className="text-2xl font-bold">{event.title}</h2>
                        <p className="text-sm opacity-75">
                            {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                {/* Event Description */}
                <div className="p-4 border-b">
                    <p className="text-gray-600">{event.description}</p>
                    {event.location && (
                        <p className="mt-2 text-sm">
                            📍 {event.location}
                        </p>
                    )}
                </div>

                {/* Entries Grid */}
                <div className="p-4">
                    <h3 className="text-xl font-semibold mb-4">Entries in this Collection</h3>
                    {event.entries && event.entries.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {event.entries.map(entry => (
                                <div
                                    key={entry.id}
                                    className={`${theme.cardBg} rounded-lg shadow-md overflow-hidden`}
                                >
                                    {entry.image && (
                                        <img
                                            src={`https://savefiles.org/secure/uploads/${entry.image}?shareable_link=509`}
                                            alt={entry.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h4 className="font-semibold">{entry.title}</h4>
                                        <p className="text-sm opacity-75 mt-1">
                                            {entry.description?.substring(0, 100)}
                                            {entry.description?.length > 100 ? '...' : ''}
                                        </p>
                                        <div className="mt-2 text-sm opacity-75">
                                            {new Date(entry.createdAt).toLocaleDateString()}
                                        </div>
                                        {entry.favorites && (
                                            <div className="mt-2">
                                                <FaStar className="text-yellow-500" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">
                            No entries in this collection yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewEventEntries; 