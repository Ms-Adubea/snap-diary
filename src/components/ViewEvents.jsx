import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';


const ViewEvents = ({ events, onViewEvent, onEditEvent, onDeleteEvent, onViewEntry, onEditEntry, onDeleteEntry }) => {
  return (
    <div className="event-list p-6">
      <h2 className="text-2xl font-bold mb-4">All Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <div key={event.id} className="event-card p-4 border rounded shadow-md bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{event.eventName}</h3>
              <div className="flex space-x-2">
                <button onClick={() => onViewEvent(event)}><FaEye title="View Event" className="text-blue-500 hover:text-blue-600" /></button>
                <button onClick={() => onEditEvent(event)}><FaEdit title="Edit Event" className="text-green-500 hover:text-green-600" /></button>
                <button onClick={() => onDeleteEvent(event)}><FaTrash title="Delete Event" className="text-red-500 hover:text-red-600" /></button>
              </div>
            </div>
            <p className="text-gray-600">{event.eventDescription}</p>
            <p className="text-gray-500">Start Date: {event.startDate}</p>
            <p className="text-gray-500">End Date: {event.endDate}</p>

            {event.entries.length > 0 && (
              <ul className="mt-4">
                <h4 className="font-semibold">Entries:</h4>
                {event.entries.map(entry => (
                  <li key={entry.id} className="flex justify-between items-center text-gray-700">
                    {entry.title}
                    <div className="flex space-x-2">
                      <button onClick={() => onViewEntry(entry)}><FaEye title="View Entry" className="text-blue-500 hover:text-blue-600" /></button>
                      <button onClick={() => onEditEntry(entry)}><FaEdit title="Edit Entry" className="text-green-500 hover:text-green-600" /></button>
                      <button onClick={() => onDeleteEntry(entry)}><FaTrash title="Delete Entry" className="text-red-500 hover:text-red-600" /></button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewEvents;
