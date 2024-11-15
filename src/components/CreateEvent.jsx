import React, { useState } from 'react';
import { FaCalendar } from 'react-icons/fa';
import { apiCreateEvent } from '../services/event';
import Swal from 'sweetalert2';

const CreateEvent = ({ onSave, theme }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!eventName.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Event Name Required',
        text: 'Please enter a name for your event',
      });
      return;
    }

    if (!startDate || !endDate) {
      Swal.fire({
        icon: 'error',
        title: 'Dates Required',
        text: 'Please select both start and end dates',
      });
      return;
    }

    try {
      setLoading(true);
      const eventData = {
        eventName,
        eventDescription,
        startDate,
        endDate,
        location,
      };

      const response = await apiCreateEvent(eventData);
      
      if (response.data) {
        Swal.fire({
          icon: 'success',
          title: 'Event Created!',
          text: 'Your event has been created successfully.',
          showConfirmButton: false,
          timer: 2000,
        });

        // Reset form
        setEventName('');
        setEventDescription('');
        setStartDate('');
        setEndDate('');
        setLocation('');

        // Call onSave if provided
        if (onSave) {
          onSave(response.data);
        }
      }
    } catch (error) {
      console.error('Error creating event:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to create event. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 bg-red-200 ${theme.textColor}`}>
      <div className="flex items-center gap-3 mb-6">
        <FaCalendar className={theme.buttonColor} />
        <h2 className="text-2xl font-bold">Create New Event</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Event Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className={`w-full p-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
            placeholder="e.g., Summer Vacation 2024"
            required
          />
        </div>

        {/* Event Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className={`w-full p-2 rounded-lg h-32 ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
            placeholder="Describe your event..."
          />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`w-full p-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`w-full p-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
              required
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Location (Optional)</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`w-full p-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
            placeholder="e.g., Paris, France"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-5/12 py-2 px-4 rounded-lg ${theme.buttonColor} text-white transition-colors disabled:bg-gray-400`}
        >
          {loading ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
