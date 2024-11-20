import React, { useState, useEffect } from 'react';
import { FaPlus, FaCalendarPlus } from 'react-icons/fa';
import { apiGetProfile, getCurrentUser } from '../services/auth';
import Stats from './Stats';

const Overview = ({ entries, onSelect, theme }) => {
    const [user, setUser] = useState(null);
    const recentEntries = entries
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    const favoriteEntries = entries.filter(entry => entry.isFavorite).slice(0, 5);
    const getUserData = async () => {
        const userData = await apiGetProfile();
        console.log(userData.data);
        if (userData) {
            setUser(userData.data);
        }
    };

    useEffect(() => {
        getUserData()
    }, []);

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

            {/* Entries Sections Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Entries Section */}
                <div className={`${theme.cardBg} p-6 rounded-lg shadow-md h-full`}>
                    <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
                    {recentEntries.length > 0 ? (
                        <div className="space-y-4">
                            {recentEntries.map(entry => (
                                <div
                                    key={entry.id}
                                    className={`p-4 ${theme.borderColor} rounded-lg hover:shadow-md transition-shadow cursor-pointer`}
                                    onClick={() => onSelect("viewEntries", entry.id)}
                                >
                                    <h3 className="font-medium">{entry.title}</h3>
                                    <p className="text-sm opacity-75">
                                        {new Date(entry.date).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="opacity-75">No entries yet. Start by creating one!</p>
                    )}
                </div>

                {/* Favorite Entries Section */}
                <div className={`${theme.cardBg} p-6 rounded-lg shadow-md h-full`}>
                    <h2 className="text-xl font-semibold mb-4">Favorite Entries</h2>
                    {favoriteEntries.length > 0 ? (
                        <div className="space-y-4">
                            {favoriteEntries.map(entry => (
                                <div
                                    key={entry.id}
                                    className={`p-4 ${theme.borderColor} rounded-lg hover:shadow-md transition-shadow cursor-pointer`}
                                    onClick={() => onSelect("viewEntries", entry.id)}
                                >
                                    <h3 className="font-medium">{entry.title}</h3>
                                    <p className="text-sm opacity-75">
                                        {new Date(entry.date).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="opacity-75">
                            No favorite entries yet. Mark entries as favorite to see them here!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Overview;
