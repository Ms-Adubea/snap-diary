import React from 'react';
import { FaTimes, FaImage } from 'react-icons/fa';

const ViewEventEntries = ({ event, onClose, theme }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`${theme.cardBg} max-w-4xl w-full rounded-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col`}>
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">{event.title}</h2>
                        <p className="text-sm opacity-75">
                            {new Date(event.date).toLocaleDateString()}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 p-6">
                    {/* Event Description */}
                    {event.description && (
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-gray-600">{event.description}</p>
                        </div>
                    )}

                    {/* Location */}
                    {event.location && (
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Location</h3>
                            <p className="text-gray-600">📍 {event.location}</p>
                        </div>
                    )}

                    {/* Entries Grid */}
                    <div className="mt-6">
                        <h3 className="font-semibold mb-4">Memories in this Collection</h3>
                        {event.entries && event.entries.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {event.entries.map(entry => (
                                    <div
                                        key={entry._id}
                                        className={`${theme.cardBg} rounded-lg shadow-md overflow-hidden`}
                                    >
                                        {/* Entry Image */}
                                        <div className="aspect-w-16 aspect-h-9">
                                            {entry.image ? (
                                                <img
                                                    src={`https://savefiles.org/${entry.image}?shareable_link=509`}
                                                    alt={entry.title}
                                                    className="w-full h-48 object-cover"
                                                    onError={(e) => {
                                                        e.target.src = "https://americanbehavioralclinics.com/wp-content/uploads/2023/06/Depositphotos_252922046_L.jpg";
                                                        console.error("Image failed to load:", e.target.src);
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                                    <FaImage className="text-4xl text-gray-400" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Entry Details */}
                                        <div className="p-4">
                                            <h4 className="font-semibold mb-2">{entry.title}</h4>
                                            {entry.description && (
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {entry.description.substring(0, 100)}
                                                    {entry.description.length > 100 ? '...' : ''}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-500">
                                                {new Date(entry.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">
                                No memories added to this collection yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEventEntries; 