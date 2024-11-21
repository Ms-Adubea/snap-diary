import React, { useState } from 'react';
import { FaImage, FaStar, FaTimes } from 'react-icons/fa';
import { apiUpdatePhoto } from '../services/photo';
import Swal from 'sweetalert2';

const EditEntry = ({ entry, onClose, onUpdate, theme }) => {
    const [title, setTitle] = useState(entry.title);
    const [description, setDescription] = useState(entry.description);
    const [selectedEvent, setSelectedEvent] = useState(entry.event || '');
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(entry.image ? `${import.meta.env.VITE_API_URL}/uploads/${entry.image}` : null);
    const [isFavorited, setIsFavorited] = useState(entry.isFavorited);
    const [loading, setLoading] = useState(false);

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

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            if (selectedEvent) {
                formData.append('event', selectedEvent);
            }
            if (image) {
                formData.append('image', image);
            }

            const response = await apiUpdatePhoto(entry.id, formData);
            
            if (response.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Entry Updated!',
                    text: 'Your memory has been updated successfully.',
                    showConfirmButton: false,
                    timer: 2000,
                });

                if (onUpdate) {
                    onUpdate(response.data);
                }
                onClose();
            }
        } catch (error) {
            console.error('Error updating entry:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to update entry. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`${theme.cardBg} w-full max-w-2xl rounded-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col`}>
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold">Edit Memory</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                {/* Scrollable Form Content */}
                <div className="overflow-y-auto flex-1 p-6">
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
                                {entry.availableEvents?.map(event => (
                                    <option key={event.id} value={event.id}>{event.title}</option>
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
                                    id="edit-image-upload"
                                />
                                <label
                                    htmlFor="edit-image-upload"
                                    className="cursor-pointer flex flex-col items-center"
                                >
                                    <FaImage className="text-4xl text-gray-400 mb-2" />
                                    <span>Click to upload new image</span>
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
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* Footer with Buttons - Fixed at bottom */}
                <div className="border-t p-6 bg-opacity-90 backdrop-blur-sm">
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`px-4 py-2 ${theme.buttonColor} text-white rounded-lg transition-colors`}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEntry; 