import React from 'react';

const featuresData = [
  {
    title: 'Personalized Dashboard',
    description: 'Easily access your journal entries and events from a single dashboard.',
    icon: '📊',
  },
  {
    title: 'Collage Layout',
    description: 'Create beautiful entries with multiple images arranged in a grid.',
    icon: '🖼️',
  },
  {
    title: 'Event Organization',
    description: 'Group your entries into themed events for easy navigation.',
    icon: '📅',
  },
  {
    title: 'Favorites & Privacy',
    description: 'Mark entries as favorites and control their visibility with privacy settings.',
    icon: '⭐',
  },
  {
    title: 'Search & Filter',
    description: 'Quickly find entries by keyword or date with our search tool.',
    icon: '🔍',
  },
  {
    title: 'Unlimited Entries',
    description: 'Unlike other journaling platforms, you can write as much and as often as you like, all for free.',
    icon: '🆓',
  },
];

const Features = ({ isDarkTheme }) => {
  return (
    <div className={`py-10 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <h2 className={`text-3xl font-bold text-center mb-8 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>Key Features</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <div
            className={`rounded-lg shadow-md p-6 relative overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            key={index}
          >
            <div className="text-4xl mb-4 text-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-center">{feature.title}</h3>
            <p className="text-center">{feature.description}</p>
            <div className={`absolute bottom-0 left-0 w-full h-full ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} opacity-20 transform scale-y-[-1] translate-y-full transition-opacity duration-300 ease-in-out pointer-events-none hover:opacity-50`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;