import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaCalendar, FaStar } from 'react-icons/fa';
import { apiGetEvents, apiDeleteEvent, apiToggleEventFavorite } from '../services/event';
import EditEvent from './EditEvent';
import SearchBar from './SearchBar';
import Swal from 'sweetalert2';
import { sampleEvents } from '../data/sampleEvents'; // Import sample data

const ViewEvents = ({ theme }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      // For development, use sample data
      // const response = await apiGetEvents();
      // setEvents(response.data);
      setEvents(sampleEvents);
      setFilteredEvents(sampleEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load events',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = ({ searchTerm, startDate, endDate }) => {
    let filtered = events;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(event => 
        event.eventName.toLowerCase().includes(term) ||
        event.eventDescription?.toLowerCase().includes(term) ||
        event.location?.toLowerCase().includes(term)
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter(event => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        const searchStart = new Date(startDate);
        const searchEnd = new Date(endDate);
        return eventStart >= searchStart && eventEnd <= searchEnd;
      });
    }

    setFilteredEvents(filtered);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await apiDeleteEvent(id);
        setEvents(events.filter(event => event.id !== id));
        setFilteredEvents(filteredEvents.filter(event => event.id !== id));
        Swal.fire('Deleted!', 'Your event has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete event',
      });
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      await apiToggleEventFavorite(id);
      const updatedEvents = events.map(event => 
        event.id === id 
          ? { ...event, isFavorite: !event.isFavorite }
          : event
      );
      setEvents(updatedEvents);
      setFilteredEvents(
        filteredEvents.map(event => 
          event.id === id 
            ? { ...event, isFavorite: !event.isFavorite }
            : event
        )
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update favorite status',
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className={`p-6 ${theme.textColor}`}>
      <h2 className="text-2xl font-bold mb-6">My Collections</h2>
      
      <SearchBar 
        onSearch={handleSearch}
        onClear={() => setFilteredEvents(events)}
        theme={theme}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div 
            key={event.id} 
            className={`${theme.cardBg} rounded-lg shadow-md overflow-hidden`}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{event.eventName}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="text-blue-500 hover:text-blue-600"
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => setEditingEvent(event)}
                    className="text-green-500 hover:text-green-600"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleToggleFavorite(event.id)}
                    className={`${event.isFavorite ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
                    title={event.isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <FaStar />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <p className="text-sm opacity-75 mb-4">
                {event.eventDescription}
              </p>
              
              <div className="flex items-center gap-2 text-sm opacity-75">
                <FaCalendar />
                <span>
                  {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                </span>
              </div>

              {event.location && (
                <p className="text-sm mt-2 opacity-75">
                  📍 {event.location}
                </p>
              )}

              {event.entries && event.entries.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium mb-2">
                    {event.entries.length} {event.entries.length === 1 ? 'Memory' : 'Memories'}
                  </p>
                  <div className="flex -space-x-2 overflow-hidden">
                    {event.entries.slice(0, 3).map((entry) => (
                      <div
                        key={entry.id}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                      >
                        {entry.images && entry.images[0] ? (
                          <img
                            src={entry.images[0].url}
                            alt={entry.title}
                            className="h-full w-full object-cover rounded-full"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-300 rounded-full" />
                        )}
                      </div>
                    ))}
                    {event.entries.length > 3 && (
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 ring-2 ring-white">
                        <span className="text-xs font-medium">
                          +{event.entries.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${theme.cardBg} max-w-3xl w-full mx-4 rounded-lg shadow-xl overflow-hidden`}>
            {/* ... Modal content ... */}
          </div>
        </div>
      )}

      {editingEvent && (
        <EditEvent
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onUpdate={(updatedEvent) => {
            setEvents(events.map(event => 
              event.id === updatedEvent.id ? updatedEvent : event
            ));
            setFilteredEvents(filteredEvents.map(event => 
              event.id === updatedEvent.id ? updatedEvent : event
            ));
            setEditingEvent(null);
          }}
          theme={theme}
        />
      )}
    </div>
  );
};

export default ViewEvents;
