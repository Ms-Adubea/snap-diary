import React, { useState } from 'react';
import { FaCalendar } from 'react-icons/fa';
import { apiCreateEvent } from '../services/event';
import Swal from 'sweetalert2';

const CreateEvent = ({ onSave, theme }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Event Name Required',
        text: 'Please enter a name for your event',
      });
      return;
    }

    if (!date) {
      Swal.fire({
        icon: 'error',
        title: 'Date Required',
        text: 'Please select a date',
      });
      return;
    }

    try {
      setLoading(true);
      const eventData = {
        title,
        description,
        date,
        location,
      };

      console.log('Submitting event data:', eventData); // Debug log

      const response = await apiCreateEvent(eventData);
      console.log('Event creation response:', response); // Debug log
      
      if (response.data) {
        Swal.fire({
          icon: 'success',
          title: 'Event Created!',
          text: 'Your event has been created successfully.',
          showConfirmButton: false,
          timer: 2000,
        });

        // Reset form
        setTitle('');
        setDescription('');
        setDate('');
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
    <div className={`max-w-2xl mx-auto p-6 ${theme.formBg} rounded-lg ${theme.textColor}`}>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
            placeholder="e.g., Summer Vacation 2024"
            required
          />
        </div>

        {/* Event Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-2 rounded-lg h-32 ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
            placeholder="Describe your event..."
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`w-full p-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
            required
          />
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
