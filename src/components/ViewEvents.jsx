import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaCalendar } from 'react-icons/fa';
import { apiGetEvents, apiDeleteEvent } from '../services/event';
import EditEvent from './EditEvent';
import SearchBar from './SearchBar';
import Swal from 'sweetalert2';

const ViewEvents = ({ theme }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await apiGetEvents();
      setEvents(response.data);
      setFilteredEvents(response.data);
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
        event.title.toLowerCase().includes(term) ||
        event.description?.toLowerCase().includes(term) ||
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

  const handleUpdate = async (updatedEvent) => {
    try {
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
      setFilteredEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
    } catch (error) {
      console.error('Error updating event:', error);
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
                <h3 className="text-xl font-semibold">{event.title}</h3>
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
                    onClick={() => handleDelete(event.id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <p className="text-sm opacity-75 mb-4">
                {event.description}
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
            </div>
          </div>
        ))}
      </div>

      {editingEvent && (
        <EditEvent
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onUpdate={handleUpdate}
          theme={theme}
        />
      )}
    </div>
  );
};

export default ViewEvents;
