import React, { useState } from 'react';
import { FaCalendar, FaTimes } from 'react-icons/fa';
import { apiUpdateEvent } from '../services/event';
import Swal from 'sweetalert2';

const EditEvent = ({ event, onClose, onUpdate, theme }) => {
    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [startDate, setStartDate] = useState(event.startDate);
    const [endDate, setEndDate] = useState(event.endDate);
    const [location, setLocation] = useState(event.location);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const eventData = {
                title,
                description,
                startDate,
                endDate,
                location,
            };

            const response = await apiUpdateEvent(event.id, eventData);
            
            Swal.fire({
                icon: 'success',
                title: 'Event Updated!',
                showConfirmButton: false,
                timer: 1500
            });

            onUpdate(response.data);
            onClose();
        } catch (error) {
            console.error('Error updating event:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update event'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${theme.cardBg} max-w-2xl w-full mx-4 rounded-lg shadow-xl p-6`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Edit Event</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Event Name</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`w-full p-2 rounded-lg ${theme.borderColor} focus:ring-2`}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`w-full p-2 rounded-lg h-32 ${theme.borderColor} focus:ring-2`}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className={`w-full p-2 rounded-lg ${theme.borderColor} focus:ring-2`}
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
                                className={`w-full p-2 rounded-lg ${theme.borderColor} focus:ring-2`}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Location (Optional)</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className={`w-full p-2 rounded-lg ${theme.borderColor} focus:ring-2`}
                            placeholder="e.g., Paris, France"
                        />
                    </div>

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