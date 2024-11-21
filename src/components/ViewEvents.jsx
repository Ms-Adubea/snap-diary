import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaCalendar, FaImage } from 'react-icons/fa';
import { apiGetEvents, apiDeleteEvent } from '../services/event';
import EditEvent from './EditEvent';
import ViewEventEntries from './ViewEventEntries';
import SearchBar from './SearchBar';
import ViewToggle from './ViewToggle';
import Pagination from './Pagination';
import Swal from 'sweetalert2';

const ViewEvents = ({ theme }) => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null);
    const [isGridView, setIsGridView] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Calculate pagination indices
    const indexOfLastEvent = currentPage * itemsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const fetchEvents = async () => {
        try {
            const response = await apiGetEvents();
            console.log('Events response:', response);
            if (response.data && response.data.data) {
                const sortedEvents = response.data.data.sort((a, b) => 
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                setEvents(sortedEvents);
                setFilteredEvents(sortedEvents);
            }
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
                event.title?.toLowerCase().includes(term) ||
                event.description?.toLowerCase().includes(term) ||
                event.location?.toLowerCase().includes(term)
            );
        }

        if (startDate && endDate) {
            filtered = filtered.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
            });
        }

        setFilteredEvents(filtered);
        setCurrentPage(1);
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

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    return (
        <div className={`p-6 ${theme.textColor}`}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Collections</h2>
                <ViewToggle 
                    isGridView={isGridView} 
                    onToggle={setIsGridView}
                    theme={theme}
                />
            </div>
            
            <SearchBar 
                onSearch={handleSearch}
                onClear={() => {
                    setFilteredEvents(events);
                    setCurrentPage(1);
                }}
                theme={theme}
            />

            <div className={isGridView 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }>
                {currentEvents.map((event) => (
                    <div 
                        key={event.id} 
                        className={`${theme.cardBg} rounded-lg shadow-md overflow-hidden
                            ${!isGridView && 'flex'}`}
                    >
                        <div className={!isGridView ? 'w-48 h-48 flex-shrink-0' : ''}>
                            {event.entries && event.entries[0]?.image ? (
                                <img
                                    src={`https://savefiles.org/${event.entries[0].image}`}
                                    alt={event.title}
                                    className={`${isGridView ? 'w-full h-48' : 'w-48 h-48'} object-cover`}
                                />
                            ) : (
                                <div className={`${isGridView ? 'w-full h-48' : 'w-48 h-48'} bg-gray-200 flex items-center justify-center`}>
                                    <FaImage className="text-4xl text-gray-400" />
                                </div>
                            )}
                        </div>
                        
                        <div className="p-4 flex-1">
                            <h3 className="text-xl font-semibold">{event.title}</h3>
                            <p className="text-sm opacity-75 mb-4">
                                {event.description}
                            </p>
                            
                            <div className="flex items-center gap-2 text-sm opacity-75">
                                <FaCalendar />
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>

                            {event.location && (
                                <p className="text-sm mt-2 opacity-75">
                                    📍 {event.location}
                                </p>
                            )}

                            <div className="mt-4 flex justify-between items-center">
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
                                </div>
                                
                                <button
                                    onClick={() => handleDelete(event.id)}
                                    className="text-red-500 hover:text-red-600"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredEvents.length > itemsPerPage && (
                <Pagination 
                    currentPage={currentPage}
                    totalItems={filteredEvents.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    theme={theme}
                />
            )}

            {selectedEvent && (
                <ViewEventEntries
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    theme={theme}
                />
            )}

            {editingEvent && (
                <EditEvent
                    event={editingEvent}
                    onClose={() => setEditingEvent(null)}
                    theme={theme}
                />
            )}
        </div>
    );
};

export default ViewEvents;
