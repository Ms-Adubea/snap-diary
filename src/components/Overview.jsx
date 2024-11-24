import React, { useState, useEffect } from 'react';
import { FaPlus, FaCalendarPlus, FaImage } from 'react-icons/fa';
import { getCurrentUser } from '../services/auth';
import { apiGetUserPhotos } from '../services/photo';
import Stats from './Stats';

const Overview = ({ onSelect, theme }) => {
    const [user, setUser] = useState(null);
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = getCurrentUser();
        if (userData) {
            setUser(userData);
        }
    }, []);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await apiGetUserPhotos();
                // Sort entries by creation date, newest first
                const sortedEntries = response.data.sort((a, b) => 
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                setEntries(sortedEntries);
            } catch (error) {
                console.error('Error fetching entries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
    }, []);

    // Get recent entries (first 5)
    const recentEntries = entries.slice(0, 5);

    // Get favorite entries (first 5)
    const favoriteEntries = entries
        .filter(entry => entry.favorites)
        .slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className={`${theme.cardBg} p-8 rounded-lg shadow-md text-center`}>
                <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Welcome, {user?.firstName || 'User'}! 👋
                </h1>
                <p className="text-lg mb-6 text-gray-600 italic">
                    What would you like to capture today?
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => onSelect("addEntry")}
                        className={`flex items-center gap-2 ${theme.buttonColor} text-white px-6 py-3 rounded-lg transition-colors hover:opacity-90`}
                    >
                        <FaPlus /> Add New Memory
                    </button>
                    <button
                        onClick={() => onSelect("createEvent")}
                        className={`flex items-center gap-2 ${theme.buttonColor} text-white px-6 py-3 rounded-lg transition-colors hover:opacity-90`}
                    >
                        <FaCalendarPlus /> Create New Collection
                    </button>
                </div>
            </div>

            {/* Stats Section */}
            <Stats theme={theme} />

            {/* Recent and Favorite Entries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Entries */}
                {/* <div className={`${theme.cardBg} p-6 rounded-lg shadow-md`}>
                    <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
                    <div className="space-y-4">
                        {recentEntries.length > 0 ? (
                            recentEntries.map(entry => (
                                <div
                                    key={entry.id}
                                    onClick={() => onSelect("viewEntries", entry.id)}
                                    className={`p-4 ${theme.borderColor} rounded-lg hover:shadow-md transition-shadow cursor-pointer`}
                                >
                                    <div className="flex gap-4">
                                        {entry.image ? (
                                            <img
                                                src={`https://savefiles.org/secure/uploads/${entry.image}?shareable_link=509`}
                                                alt={entry.title}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-lg">
                                                <FaImage className="text-gray-400 text-2xl" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-medium">{entry.title}</h3>
                                            <p className="text-sm opacity-75">
                                                {new Date(entry.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No entries yet. Start by creating one!</p>
                        )}
                    </div>
                </div> */}

                {/* Favorite Entries */}
                {/* <div className={`${theme.cardBg} p-6 rounded-lg shadow-md`}>
                    <h2 className="text-xl font-semibold mb-4">Favorite Entries</h2>
                    <div className="space-y-4">
                        {favoriteEntries.length > 0 ? (
                            favoriteEntries.map(entry => (
                                <div
                                    key={entry.id}
                                    onClick={() => onSelect("viewEntries", entry.id)}
                                    className={`p-4 ${theme.borderColor} rounded-lg hover:shadow-md transition-shadow cursor-pointer`}
                                >
                                    <div className="flex gap-4">
                                        {entry.image ? (
                                            <img
                                                src={`https://savefiles.org/secure/uploads/${entry.image}?shareable_link=509`}
                                                alt={entry.title}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-lg">
                                                <FaImage className="text-gray-400 text-2xl" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-medium">{entry.title}</h3>
                                            <p className="text-sm opacity-75">
                                                {new Date(entry.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No favorite entries yet. Mark entries as favorite to see them here!</p>
                        )}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Overview;
