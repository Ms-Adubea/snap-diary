import React from 'react';
import { FaCamera, FaHeart, FaCalendar, FaSearch } from 'react-icons/fa';

const AboutUs = () => {
  const features = [
    {
      icon: <FaCamera className="text-4xl text-orange-500" />,
      title: "Capture Memories",
      description: "Upload and organize your precious photos with detailed descriptions and stories."
    },
    {
      icon: <FaCalendar className="text-4xl text-orange-500" />,
      title: "Create Collections",
      description: "Group related memories into collections like vacations, celebrations, or special events."
    },
    {
      icon: <FaHeart className="text-4xl text-orange-500" />,
      title: "Mark Favorites",
      description: "Highlight your most cherished memories by marking them as favorites for quick access."
    },
    {
      icon: <FaSearch className="text-4xl text-orange-500" />,
      title: "Easy Search",
      description: "Quickly find specific memories using our powerful search and filter features."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
            About Snap Diary
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your personal space to capture, organize, and relive life's most precious moments through photos and stories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 