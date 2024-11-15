import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const PolaroidCarousel = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleClick = (event) => {
    setSelectedEvent(event);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="carousel-container flex overflow-x-scroll space-x-6 p-6">
      {events.map(event => (
        <div
          key={event.id}
          className="polaroid relative bg-white p-4 shadow-lg transform transition hover:scale-105 hover:shadow-2xl cursor-pointer"
          style={{
            width: '200px',
            height: '240px',
            border: '8px solid white',
            borderBottomWidth: '30px',
            position: 'relative',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
          onClick={() => handleClick(event)}
        >
          <img
            src={event.coverPhoto} // Ensure event objects have a coverPhoto property
            alt={event.eventName}
            className="object-cover w-full h-full rounded-t"
          />
          <div
            className="title absolute bottom-0 w-full text-center font-handwritten text-lg text-gray-700"
            style={{ fontFamily: 'Cursive, sans-serif' }}
          >
            {event.eventName}
          </div>
        </div>
      ))}

      {selectedEvent && (
        <div className="expanded-view fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full relative">
            <button onClick={handleClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">
              <FaTimes size={24} />
            </button>
            <img
              src={selectedEvent.coverPhoto}
              alt={selectedEvent.eventName}
              className="w-full rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedEvent.eventName}</h2>
            <p>{selectedEvent.eventDescription}</p>
            <p className="text-gray-500">Start Date: {selectedEvent.startDate}</p>
            <p className="text-gray-500">End Date: {selectedEvent.endDate}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolaroidCarousel;
