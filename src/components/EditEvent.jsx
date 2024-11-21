import React, { useState } from 'react';
import { FaCalendar } from 'react-icons/fa';
import { apiUpdateEvent } from '../services/event';
import Swal from 'sweetalert2';

const EditEvent = ({ event, onClose, onUpdate, theme }) => {
    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [date, setDate] = useState(event.date ? new Date(event.date).toISOString().split('T')[0] : '');
    const [location, setLocation] = useState(event.location || '');
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

            const response = await apiUpdateEvent(event.id, eventData);
            
            if (response.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Event Updated!',
                    text: 'Your event has been updated successfully.',
                    showConfirmButton: false,
                    timer: 2000,
                });

                if (onUpdate) {
                    onUpdate(response.data);
                }
                onClose();
            }
        } catch (error) {
            console.error('Error updating event:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to update event. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${theme.cardBg} max-w-2xl w-full mx-4 rounded-lg shadow-xl p-6`}>
                <div className="flex items-center gap-3 mb-6">
                    <FaCalendar className={theme.buttonColor} />
                    <h2 className="text-2xl font-bold">Edit Event</h2>
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

                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 ${theme.buttonColor} text-white rounded-lg`}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEvent; 