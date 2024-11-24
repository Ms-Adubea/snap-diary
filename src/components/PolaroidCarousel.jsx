import React from 'react';
import { motion } from 'framer-motion';

// Add sample images array
const sampleImages = [
    "https://americanbehavioralclinics.com/wp-content/uploads/2023/06/Depositphotos_252922046_L.jpg",
    "https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg",
    "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg",
    "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg",
    "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg",
    "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg",
    "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg",
    "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg",
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
];

const PolaroidCarousel = ({ entries, theme }) => {
    return (
        <div className={`${theme.cardBg} p-6 rounded-lg shadow-md`}>
            <h2 className="text-xl font-semibold mb-4">Featured Memories</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
                {entries.map((entry, index) => (
                    <motion.div
                        key={entry.id}
                        className="flex-shrink-0 w-64 bg-white p-4 rounded-lg shadow-lg"
                        whileHover={{ 
                            scale: 1.05,
                            rotate: [-1, 1][index % 2], // Alternate tilt
                            transition: { duration: 0.3 }
                        }}
                    >
                        <div className="w-full h-48 overflow-hidden rounded-lg mb-3">
                            <img
                                src={sampleImages[index % sampleImages.length]}
                                alt={entry.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="font-semibold mb-1">{entry.title}</h3>
                        <p className="text-sm text-gray-600">
                            {new Date(entry.createdAt).toLocaleDateString()}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PolaroidCarousel;
