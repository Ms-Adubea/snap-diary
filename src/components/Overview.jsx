import React from 'react';
import { FaPlus, FaCalendarPlus } from 'react-icons/fa';

const Overview = ({ firstName, entries, onSelect, theme }) => {
    const recentEntries = entries
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    const favoriteEntries = entries.filter(entry => entry.isFavorite).slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className={`${theme.cardBg} p-6 rounded-lg shadow-md`}>
                <h1 className="text-2xl font-bold mb-4">Welcome back, {firstName}! 👋</h1>
                <div className="flex gap-4">
                    <button 
                        onClick={() => onSelect("addEntry")}
                        className={`flex items-center gap-2 ${theme.buttonColor} text-white px-4 py-2 rounded-lg transition-colors`}
                    >
                        <FaPlus /> Add New Entry
                    </button>
                    <button 
                        onClick={() => onSelect("createEvent")}
                        className={`flex items-center gap-2 ${theme.buttonColor} text-white px-4 py-2 rounded-lg transition-colors`}
                    >
                        <FaCalendarPlus /> Create New Event
                    </button>
                </div>
            </div>

            {/* Recent Entries Section */}
            <div className={`${theme.cardBg} p-6 rounded-lg shadow-md`}>
                <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
                {recentEntries.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            <div className={`${theme.cardBg} p-6 rounded-lg shadow-md`}>
                <h2 className="text-xl font-semibold mb-4">Favorite Entries</h2>
                {favoriteEntries.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
    );
};

export default Overview;
