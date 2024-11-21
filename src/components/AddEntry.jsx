import React, { useState, useEffect } from 'react';
import { FaImage, FaStar, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { apiPostPhotos } from '../services/photo';
import { apiGetEvents } from '../services/event';

const AddEntry = ({ onSave, theme }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  // Fetch events when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiGetEvents();
        console.log('Available events:', response.data); // Debug log
        if (response.data && response.data.data) {
          setEvents(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Title Required',
        text: 'Please enter a title for your entry',
      });
      return;
    }

    if (!image) {
      Swal.fire({
        icon: 'error',
        title: 'Image Required',
        text: 'Please upload an image',
      });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (selectedEvent) {
        formData.append('event', selectedEvent);
      }
      formData.append('image', image);

      console.log('Submitting entry with event ID:', selectedEvent); // Debug log

      const response = await apiPostPhotos(formData);
      
      if (response.data) {
        Swal.fire({
          icon: 'success',
          title: 'Entry Created!',
          text: 'Your memory has been saved successfully.',
          showConfirmButton: false,
          timer: 2000,
        });

        // Reset form
        setTitle('');
        setDescription('');
        setSelectedEvent('');
        setImage(null);
        setPreviewUrl(null);
        setIsFavorited(false);

        if (onSave) {
          onSave(response.data);
        }
      }
    } catch (error) {
      console.error('Error creating entry:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to create entry. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 ${theme.formBg} rounded-lg ${theme.textColor}`}>
      <h2 className="text-2xl font-bold mb-6">Create New Memory</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-2 rounded-lg h-32 ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
          />
        </div>

        {/* Event Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Event</label>
          <select
            value={selectedEvent}
            onChange={(e) => {
              console.log('Selected event ID:', e.target.value); // Debug log
              setSelectedEvent(e.target.value);
            }}
            className={`w-full p-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
          >
            <option value="">Select an event (optional)</option>
            {Array.isArray(events) && events.map(event => (
              <option key={event._id} value={event._id}>{event.title}</option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Photo</label>
          <div className={`border-2 border-dashed ${theme.borderColor} rounded-lg p-6 text-center`}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <FaImage className="text-4xl text-gray-400 mb-2" />
              <span>Click to upload image</span>
            </label>
          </div>

          {/* Image Preview */}
          {previewUrl && (
            <div className="mt-4 relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <FaTimes />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-5/12 py-2 px-4 rounded-lg ${theme.buttonColor} text-white transition-colors disabled:bg-gray-400`}
        >
          {loading ? 'Saving...' : 'Save Entry'}
        </button>
      </form>
    </div>
  );
};

export default AddEntry;
