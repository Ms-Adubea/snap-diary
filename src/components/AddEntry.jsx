import React, { useState } from 'react';
import { FaImage, FaStar, FaTimes } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const AddEntry = ({ events, onSave, theme }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [images, setImages] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    
    setImages(prevImages => [...prevImages, ...files]);
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(images);
    const previews = Array.from(previewUrls);
    const [reorderedItem] = items.splice(result.source.index, 1);
    const [reorderedPreview] = previews.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    previews.splice(result.destination.index, 0, reorderedPreview);

    setImages(items);
    setPreviewUrls(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('eventId', selectedEvent);
      formData.append('isFavorite', isFavorite);
      images.forEach((image, index) => {
        formData.append('images', image);
      });

      await onSave(formData);
      // Reset form
      setTitle('');
      setDescription('');
      setSelectedEvent('');
      setImages([]);
      setPreviewUrls([]);
      setIsFavorite(false);
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 bg-red-200 ${theme.textColor}`}>
      <h2 className="text-2xl font-bold mb-6">Create New Entry</h2>
      
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
            onChange={(e) => setSelectedEvent(e.target.value)}
            className={`w-full p-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
          >
            <option value="">Select an event (optional)</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.eventName}</option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Photos</label>
          <div className={`border-2 border-dashed ${theme.borderColor} rounded-lg p-6 text-center ${theme.cardBg}`}>
            <input
              type="file"
              multiple
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
              <span>Click to upload images</span>
            </label>
          </div>

          {/* Image Preview */}
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {previewUrls.map((url, index) => (
                <div key={url} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Favorite Toggle */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full transition-colors ${
              isFavorite ? 'text-yellow-500' : 'text-gray-400'
            }`}
          >
            <FaStar className="text-xl" />
          </button>
          <span className="ml-2 text-sm">
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </span>
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
